
import React, { useState, useEffect } from 'react';
import { Quest, GlobalState, Reward, GameHistory } from '../types';
import { characters } from '../data';

interface QuestCardProps {
  quest: Quest;
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  onToggleStep?: (questId: string, stepId: string) => void;
  onCharacterClick: (charId: string) => void;
  defaultExpanded?: boolean;
  addNotification: (msg: string, type: 'shop' | 'timeline' | 'info', action?: () => void) => void;
  onOpenPdf: (page: string | number) => void;
  onNavigate?: (view: any, id?: string) => void;
  gameHistory?: GameHistory;
  allQuests: Quest[];
  onEdit?: (quest: Quest) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ 
  quest, 
  globalState, 
  setGlobalState, 
  onToggleStep, 
  onCharacterClick, 
  defaultExpanded = false, 
  addNotification, 
  onOpenPdf, 
  onNavigate, 
  gameHistory,
  allQuests,
  onEdit
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  // Track open state for specific steps
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (defaultExpanded) setIsExpanded(true);
  }, [defaultExpanded]);

  const handleStepClick = (stepId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleStep) {
      onToggleStep(quest.id, stepId);
    }
  };

  const toggleStepOpen = (stepId: string) => {
    setOpenSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  // Helper to parse "HH:MM" to minutes from 6am (0-1440 range)
  const getMinutesFromTimeStr = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    // Adjust for 24h format where hours < 6 are considered "late night" (next calendar day but same game cycle day)
    let adjustedHour = h;
    if (h < 6) {
      adjustedHour = h + 24;
    }
    return ((adjustedHour - 6) * 60) + m;
  };

  const formatTime12h = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 && h < 24 ? 'pm' : 'am';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')}${ampm}`;
  };

  // Helper to find any step in the entire database
  const findGlobalStep = (stepId: string) => {
    for (const q of allQuests) {
      const step = q.steps.find(s => s.id === stepId);
      if (step) return { step, quest: q };
    }
    return null;
  };

  const completedCount = quest.steps.filter(s => globalState.completedSteps.includes(s.id)).length;
  const progress = Math.round((completedCount / quest.steps.length) * 100);
  const isMain = quest.isMainQuest;
  const isComplete = completedCount === quest.steps.length;
  
  // Calculate historical completions
  const historicalCompletions = gameHistory ? Math.min(...quest.steps.map(s => gameHistory.stepCompletionCounts[s.id] || 0)) : 0;
  const hasHistory = historicalCompletions > 0;

  // Check Availability Logic
  const firstIncompleteStep = quest.steps.find(s => !globalState.completedSteps.includes(s.id));
  
  let statusBadge = null;

  if (isComplete) {
    statusBadge = {
      label: "Completed",
      color: "bg-green-900/50 text-green-200 border-green-700 border",
      icon: "✓"
    };
  } else if (firstIncompleteStep) {
    // 0. Check Quest Prerequisite
    if (quest.prerequisiteQuestId) {
       const prereqQuest = allQuests.find(q => q.id === quest.prerequisiteQuestId);
       if (prereqQuest) {
         const isPrereqComplete = prereqQuest.steps.every(s => globalState.completedSteps.includes(s.id));
         if (!isPrereqComplete) {
            statusBadge = {
              label: `Requires Quest ${prereqQuest.questNumber}`,
              color: "bg-slate-700 text-slate-400 border-slate-600 border",
              icon: "🔒"
            };
         }
       }
    }

    // Only continue if not already blocked by Quest Prereq
    if (!statusBadge) {
        // 1. Check Step Prerequisite
        if (firstIncompleteStep.prerequisiteStepId && !globalState.completedSteps.includes(firstIncompleteStep.prerequisiteStepId)) {
          const prereqInfo = findGlobalStep(firstIncompleteStep.prerequisiteStepId);
          const label = prereqInfo 
            ? `Requires: ${prereqInfo.step.title} ${prereqInfo.quest.id !== quest.id ? `(Q${prereqInfo.quest.questNumber})` : ''}` 
            : "Locked";
          
          statusBadge = {
            label: label,
            color: "bg-slate-700 text-slate-400 border-slate-600 border",
            icon: "🔒"
          };
        } 
        // 2. Check Day
        else if (firstIncompleteStep.days && firstIncompleteStep.days.length > 0 && !firstIncompleteStep.days.includes(globalState.currentDay)) {
          statusBadge = {
            label: `Available Day ${firstIncompleteStep.days.join(', ')}`,
            color: "bg-amber-900/40 text-amber-200 border-amber-800 border",
            icon: "📅"
          };
        } else if (firstIncompleteStep.day && firstIncompleteStep.day !== globalState.currentDay) {
          statusBadge = {
            label: `Available Day ${firstIncompleteStep.day}`,
            color: "bg-amber-900/40 text-amber-200 border-amber-800 border",
            icon: "📅"
          };
        }
        // 3. Check Time Window
        else if (firstIncompleteStep.time) {
          const startTime = getMinutesFromTimeStr(firstIncompleteStep.time);
          // Default duration 2 hours if not specified, or parse endTime
          let endTime = startTime + 120; 
          if (firstIncompleteStep.endTime) {
            endTime = getMinutesFromTimeStr(firstIncompleteStep.endTime);
          }

          const currentTime = globalState.timeOfDayMinutes;
          if (currentTime < startTime || currentTime > endTime) {
            const timeRange = `${formatTime12h(firstIncompleteStep.time)} - ${firstIncompleteStep.endTime ? formatTime12h(firstIncompleteStep.endTime) : 'Later'}`;
            statusBadge = {
              label: `Available ${timeRange}`,
              color: "bg-blue-900/40 text-blue-200 border-blue-800 border",
              icon: "⏰"
            };
          }
        }
    }

    // If no other conditions blocked it, it's available
    if (!statusBadge) {
      statusBadge = {
        label: "Available Now",
        color: "bg-green-900 text-green-200 border-green-700 border",
        icon: "!"
      };
    }
  }

  // Get Related Characters (Primary and Secondary)
  const relatedCharIds = new Set<string>();
  quest.steps.forEach(s => {
    if (s.characterId) relatedCharIds.add(s.characterId);
    if (s.secondaryCharacterIds) s.secondaryCharacterIds.forEach(id => relatedCharIds.add(id));
  });
  const relatedChars = Array.from(relatedCharIds).map(id => characters.find(c => c.id === id)).filter(Boolean);

  return (
    <div id={`quest-card-${quest.id}`} className={`bg-slate-800 border rounded-lg shadow-lg transition-all ${isMain ? 'border-red-900/60 shadow-red-900/10' : 'border-slate-700'}`}>
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-4 border-b flex flex-col gap-3 cursor-pointer hover:bg-slate-700/50 transition-colors rounded-t-lg ${isMain ? 'bg-red-950/30 border-red-900/30' : 'bg-slate-900 border-slate-700'}`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-2 h-12 rounded-full flex-shrink-0 ${progress === 100 ? 'bg-green-500' : isMain ? 'bg-termina-danger' : 'bg-termina-accent'}`}></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${isMain ? 'bg-red-900 text-red-200' : 'bg-slate-700 text-slate-300'}`}>
                  Quest {quest.questNumber}
                </span>
                
                {statusBadge && (
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 ${statusBadge.color}`}>
                    <span>{statusBadge.icon}</span> {statusBadge.label}
                  </span>
                )}

                {hasHistory && (
                   <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-900/30 text-purple-300 border border-purple-800/50" title={`Completed ${historicalCompletions} times in previous cycles`}>
                     Completed: {historicalCompletions}
                   </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-bold truncate pr-4 ${isMain ? 'text-red-200' : 'text-white'}`}>{quest.title}</h3>
                {quest.isCustom && onEdit && (
                  <button onClick={(e) => { e.stopPropagation(); onEdit(quest); }} className="text-xs bg-slate-700 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors" title="Edit Quest">
                     ✏️
                  </button>
                )}
              </div>
              
              <div className="text-xs text-slate-400 flex flex-wrap gap-x-3 gap-y-1 mt-1">
                <span className="uppercase tracking-wider text-termina-gold">{quest.region}</span>
                {quest.pageReference && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onOpenPdf(quest.pageReference!); }}
                    className="hover:text-termina-accent underline decoration-dotted transition-colors"
                  >
                    Ref: p.{quest.pageReference}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400 mb-1">{completedCount}/{quest.steps.length} Steps</div>
              <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <span className="text-slate-500 transform transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </div>
        </div>

        {/* Related Characters Header Strip */}
        {relatedChars.length > 0 && (
          <div className="flex items-center gap-2 pl-6 text-xs overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-slate-500 uppercase tracking-wider font-bold text-[10px] shrink-0">Involved:</span>
            {relatedChars.map(char => (
              <button
                key={char!.id}
                onClick={(e) => { e.stopPropagation(); onCharacterClick(char!.id); }}
                className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-600 hover:border-termina-accent hover:text-termina-accent transition-colors whitespace-nowrap"
              >
                <span className="text-[10px]">👤</span> {char!.name}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Quest Details */}
      {isExpanded && (
        <div className="p-4 bg-slate-800/50 rounded-b-lg">
          <div className="mb-6 text-sm text-slate-300 leading-relaxed border-l-2 border-slate-600 pl-4">
            {quest.description}
          </div>
          
          <div className="space-y-3 mb-6">
            {quest.steps.map((step, idx) => {
              const char = step.characterId ? characters.find(c => c.id === step.characterId) : null;
              const isChecked = globalState.completedSteps.includes(step.id);
              const historicalCount = gameHistory?.stepCompletionCounts[step.id] || 0;
              const isOpen = openSteps[step.id];
              const stepNumber = `${quest.questNumber}-${idx + 1}`;
              
              let isPrereqMet = true;
              // Check step prereq
              if (step.prerequisiteStepId && !globalState.completedSteps.includes(step.prerequisiteStepId)) {
                isPrereqMet = false;
              }
              // Check Quest prereq (if applied to whole quest, it applies to all steps)
              if (quest.prerequisiteQuestId) {
                  const prereqQ = allQuests.find(q => q.id === quest.prerequisiteQuestId);
                  if (prereqQ && !prereqQ.steps.every(s => globalState.completedSteps.includes(s.id))) {
                      isPrereqMet = false;
                  }
              }

              return (
                <div key={step.id} className={`rounded border transition-all ${isChecked ? 'bg-green-900/10 border-green-800/50' : !isPrereqMet ? 'bg-slate-900/80 border-slate-800 opacity-60' : 'bg-slate-900/50 border-slate-700'}`}>
                  {/* Step Header - Click to expand */}
                  <div 
                    onClick={() => toggleStepOpen(step.id)}
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div onClick={(e) => handleStepClick(step.id, e)}>
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          readOnly // Controlled by parent via handleStepClick
                          disabled={!isPrereqMet}
                          className={`w-5 h-5 rounded border-slate-500 text-termina-accent focus:ring-0 focus:ring-offset-0 cursor-pointer accent-purple-500 ${!isPrereqMet ? 'cursor-not-allowed opacity-50' : ''}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-500">{stepNumber}</span>
                          <span className={`font-bold text-sm ${isChecked ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                            {step.title}
                          </span>
                          {historicalCount > 0 && !isChecked && (
                            <span className="text-[9px] bg-slate-700 text-slate-400 px-1 rounded" title="Done in previous cycle">Done before</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 flex gap-3">
                          <span>📍 {step.location}</span>
                          {(step.day || step.days || step.time) && (
                            <span>
                              {step.days ? `Day ${step.days.join(',')}` : step.day ? `Day ${step.day}` : ''} {step.time}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-termina-gold bg-black/20 px-2 py-1 rounded border border-yellow-900/30">
                        {step.xpReward} XP
                      </span>
                      <span className="text-slate-500 transform transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Step Body - Expanded */}
                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-slate-700/50 text-sm bg-black/20 animate-fade-in">
                       {!isPrereqMet && (
                         <div className="mt-2 mb-2 px-3 py-2 bg-slate-800 rounded border border-slate-600 text-xs text-slate-400 flex items-center gap-2">
                           <span>🔒 Locked:</span> 
                           <span>
                              {quest.prerequisiteQuestId && !allQuests.find(q => q.id === quest.prerequisiteQuestId)?.steps.every(s => globalState.completedSteps.includes(s.id))
                                ? "Requires Quest Completion." 
                                : "Requires previous step completion."
                              }
                           </span>
                         </div>
                      )}
                      
                      <div className="mt-3 text-slate-300 whitespace-pre-line leading-relaxed">
                        {step.description}
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-4 pt-3 border-t border-slate-800">
                        {step.pageReference && (
                           <div className="text-xs flex items-center gap-1.5 text-slate-500">
                             <span>📖</span>
                             <button 
                               onClick={() => onOpenPdf(step.pageReference!)}
                               className="hover:text-termina-accent underline decoration-dotted transition-colors"
                             >
                               Page {step.pageReference}
                             </button>
                           </div>
                        )}

                        {step.curiosityShopUnlock && (
                          <div className="text-xs flex items-center gap-1.5 text-amber-400">
                            <span>🗝️ Unlocks in Shop:</span>
                            <span className="font-bold underline decoration-dotted cursor-help" title="Visit Curiosity Shop to buy">{step.curiosityShopUnlock.itemName}</span>
                          </div>
                        )}
                        
                        {step.itemRewards && step.itemRewards.length > 0 && (
                          <div className="text-xs flex items-center gap-2">
                            <span className="text-purple-400">🎁 Rewards:</span>
                            {step.itemRewards.map((reward, rIdx) => (
                              <RewardTooltip key={rIdx} reward={reward} />
                            ))}
                          </div>
                        )}

                        {/* List both Primary and Secondary Chars */}
                        {(char || (step.secondaryCharacterIds && step.secondaryCharacterIds.length > 0)) && (
                          <div className="text-xs flex flex-wrap items-center gap-2 text-slate-400 ml-auto">
                            <span>👤 NPCs:</span>
                            {char && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); onCharacterClick(char.id); }}
                                className="text-blue-400 hover:underline"
                              >
                                {char.name}
                              </button>
                            )}
                            {step.secondaryCharacterIds?.map(id => {
                               const c2 = characters.find(ch => ch.id === id);
                               if (!c2) return null;
                               return (
                                  <button 
                                    key={id}
                                    onClick={(e) => { e.stopPropagation(); onCharacterClick(id); }}
                                    className="text-blue-400 hover:underline"
                                  >
                                    {c2.name}
                                  </button>
                               )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quest Footer: Rewards & Failure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
            <div>
              <h4 className="text-xs font-bold text-green-400 uppercase mb-2">Completion Rewards</h4>
              {quest.rewards.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {quest.rewards.map((reward, i) => (
                    <RewardTooltip key={i} reward={reward} />
                  ))}
                </div>
              ) : <span className="text-xs text-slate-500">None</span>}
            </div>
            
            {quest.failureConsequence && (
              <div>
                <h4 className="text-xs font-bold text-red-400 uppercase mb-2">On Failure</h4>
                <div className="group relative inline-block">
                  <span className="text-sm text-red-300/80 border-b border-dotted border-red-500/50 cursor-help">
                    View Consequences
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-red-950/90 text-red-100 text-xs p-3 rounded border border-red-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {quest.failureConsequence}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const RewardTooltip: React.FC<{ reward: Reward }> = ({ reward }) => {
  return (
    <div className="group relative inline-block">
      <span className={`
        text-xs px-2 py-1 rounded border flex items-center gap-1 cursor-help transition-colors
        ${reward.type === 'Spell' ? 'bg-blue-900/30 border-blue-700 text-blue-200 hover:bg-blue-900/50' : 
          reward.type === 'Mask' ? 'bg-purple-900/30 border-purple-700 text-purple-200 hover:bg-purple-900/50' : 
          'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'}
      `}>
        {reward.type === 'Spell' ? '✨' : reward.type === 'Mask' ? '🎭' : '📦'} {reward.name}
      </span>
      
      {reward.description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-slate-900 text-slate-200 text-xs p-3 rounded-lg border border-slate-500 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-pre-wrap">
          <div className="font-bold text-termina-gold mb-1 border-b border-slate-700 pb-1">{reward.name}</div>
          {reward.description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
        </div>
      )}
    </div>
  );
};
