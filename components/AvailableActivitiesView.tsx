
import React, { useMemo, useState } from 'react';
import { GlobalState, Region, GameHistory, Quest, MasterTimelineEvent, Character } from '../types';
import { QuestDetailModal } from './QuestDetailModal';
import { characters as defaultCharacters } from '../data'; // Import for type, though we try to use props

interface AvailableActivitiesViewProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  setSelectedRegion: (region: string) => void;
  selectedRegion: string;
  onToggleStep?: (questId: string, stepId: string) => void;
  onCharacterClick?: (charId: string) => void;
  onNavigate?: (view: any, id?: string) => void;
  addNotification: (msg: string, type: 'shop' | 'timeline' | 'info', action?: () => void) => void;
  onOpenPdf: (page: string | number) => void;
  gameHistory?: GameHistory;
  allQuests: Quest[];
  timelineEvents?: MasterTimelineEvent[];
  // New prop to support custom chars
  allCharacters?: Character[];
}

export const AvailableActivitiesView: React.FC<AvailableActivitiesViewProps> = ({ 
  globalState, 
  setGlobalState,
  setSelectedRegion, 
  selectedRegion,
  onToggleStep,
  onCharacterClick,
  onNavigate,
  addNotification,
  onOpenPdf,
  gameHistory,
  allQuests,
  timelineEvents = [],
  allCharacters
}) => {
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const displayCharacters = allCharacters || defaultCharacters;

  const selectedQuest = useMemo(() => {
    return selectedQuestId ? allQuests.find(q => q.id === selectedQuestId) || null : null;
  }, [selectedQuestId, allQuests]);

  const currentDay = globalState.currentDay;
  const currentTimeMins = globalState.timeOfDayMinutes;

  const getMinutesFromTimeStr = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    let adjustedHour = h;
    if (h < 6) {
      adjustedHour = h + 24;
    }
    return ((adjustedHour - 6) * 60) + m;
  };

  const formatTime12h = (time24: string) => {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'pm' : 'am';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')}${ampm}`;
  };

  // 1. Active Locations (Shops, World Events only) - No NPCs, No Quests
  const activeLocations = useMemo(() => {
    return timelineEvents.filter(event => {
      if (event.category !== 'Business' && event.category !== 'World Event') return false;
      if (selectedRegion !== 'All' && event.region !== selectedRegion) return false;
      if (event.day !== currentDay) return false;
      if (globalState.totalMinutes < event.sortTime) return false;
      if (event.endTime && globalState.totalMinutes > event.endTime) return false;

      return true;
    });
  }, [globalState.totalMinutes, selectedRegion, currentDay, timelineEvents]);

  // 2. NPC Tracker Logic
  const npcStatuses = useMemo(() => {
    const relevantCharacters = displayCharacters.filter(c => 
      selectedRegion === 'All' || c.locationRegion === selectedRegion
    );

    return relevantCharacters.map(char => {
      const currentEvent = timelineEvents.find(e => 
        e.relatedId === char.id &&
        e.category === 'NPC Schedule' &&
        e.day === currentDay &&
        globalState.totalMinutes >= e.sortTime &&
        (e.endTime ? globalState.totalMinutes < e.endTime : true)
      );

      const isSleeping = currentEvent?.title.toLowerCase().includes('sleep') || 
                         currentEvent?.description.toLowerCase().includes('sleep') ||
                         currentEvent?.description.toLowerCase().includes('bed');

      return {
        id: char.id,
        name: char.name,
        location: currentEvent ? currentEvent.location : "Unknown",
        activity: currentEvent ? currentEvent.title : "Inactive",
        isSleeping: !!isSleeping,
        hasEvent: !!currentEvent
      };
    }).sort((a, b) => {
      if (a.hasEvent && !b.hasEvent) return -1;
      if (!a.hasEvent && b.hasEvent) return 1;
      if (!a.isSleeping && b.isSleeping) return -1;
      if (a.isSleeping && !b.isSleeping) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [globalState.totalMinutes, selectedRegion, currentDay, timelineEvents, displayCharacters]);

  // 3. Available Quest Steps (Sub-Quests)
  const availableQuestSteps = useMemo(() => {
    const stepsToShow: { 
      questId: string, 
      stepId: string, 
      questTitle: string, 
      stepTitle: string, 
      location: string, 
      region: string, 
      description: string, 
      day?: number, 
      days?: number[], 
      time?: string, 
      endTime?: string 
    }[] = [];

    allQuests.forEach(quest => {
      if (selectedRegion !== 'All' && quest.region !== selectedRegion) return;

      const firstIncompleteStep = quest.steps.find(step => !globalState.completedSteps.includes(step.id));

      if (firstIncompleteStep) {
        // Check Quest Prereq
        if (quest.prerequisiteQuestId) {
             const prereqQ = allQuests.find(q => q.id === quest.prerequisiteQuestId);
             if (prereqQ && !prereqQ.steps.every(s => globalState.completedSteps.includes(s.id))) {
                 return; // Quest locked
             }
        }

        if (firstIncompleteStep.prerequisiteStepId) {
          const prereqCompleted = globalState.completedSteps.includes(firstIncompleteStep.prerequisiteStepId);
          if (!prereqCompleted) return;
        }

        let isDayValid = true;
        if (firstIncompleteStep.days && firstIncompleteStep.days.length > 0) {
          if (!firstIncompleteStep.days.includes(currentDay)) isDayValid = false;
        } else if (firstIncompleteStep.day) {
          if (firstIncompleteStep.day !== currentDay) isDayValid = false;
        }

        if (!isDayValid) return;

        if (firstIncompleteStep.time) {
           const stepStartMins = getMinutesFromTimeStr(firstIncompleteStep.time);
           let stepEndMins = stepStartMins + 180; 

           if (firstIncompleteStep.endTime) {
             stepEndMins = getMinutesFromTimeStr(firstIncompleteStep.endTime);
           }

           if (currentTimeMins < stepStartMins) return;
           if (currentTimeMins > stepEndMins) return;
        }

        stepsToShow.push({
          questId: quest.id,
          stepId: firstIncompleteStep.id,
          questTitle: quest.title,
          stepTitle: firstIncompleteStep.title,
          location: firstIncompleteStep.location,
          region: quest.region,
          description: firstIncompleteStep.description,
          day: firstIncompleteStep.day,
          days: firstIncompleteStep.days,
          time: firstIncompleteStep.time,
          endTime: firstIncompleteStep.endTime
        });
      }
    });

    return stepsToShow;
  }, [globalState.completedSteps, globalState.currentDay, globalState.timeOfDayMinutes, selectedRegion, allQuests]);

  const regions = ['All', ...Object.values(Region)];

  const handleActiveLocationClick = (eventId: string) => {
    if (onNavigate) {
      onNavigate('timeline', eventId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      
      <QuestDetailModal 
        quest={selectedQuest}
        onClose={() => setSelectedQuestId(null)}
        globalState={globalState}
        setGlobalState={setGlobalState}
        onToggleStep={onToggleStep}
        onCharacterClick={onCharacterClick}
        addNotification={addNotification}
        onOpenPdf={onOpenPdf}
        gameHistory={gameHistory}
        allQuests={allQuests}
      />

      <div className="flex flex-wrap gap-2 justify-center md:justify-start bg-slate-900/50 p-4 rounded-lg border border-slate-800">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              selectedRegion === region 
                ? 'bg-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="space-y-8">
          {/* Active Locations */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-termina-gold flex items-center gap-2 border-b border-slate-700 pb-2">
              <span>🏪</span> Active Locations
            </h3>
            
            {activeLocations.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeLocations.map(event => (
                  <div 
                    key={event.id} 
                    onClick={() => handleActiveLocationClick(event.id)}
                    className="bg-slate-800 border border-slate-700 p-3 rounded-lg flex flex-col justify-between items-start hover:border-green-500/50 transition-colors shadow-sm aspect-square cursor-pointer group"
                    title="Click for details"
                  >
                    <div className="w-full">
                      <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border font-bold mb-2 inline-block ${
                        event.category === 'Business' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800' : 'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                      }`}>
                        {event.category === 'Business' ? 'SHOP' : 'ACTIVITY'}
                      </span>
                      <h4 className="font-bold text-white text-xs leading-tight mb-1 group-hover:text-green-400 transition-colors">{event.title}</h4>
                    </div>
                    <div className="w-full pt-2 border-t border-slate-700/50">
                      <p className="text-[10px] text-slate-400 truncate">📍 {event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-6 text-center">
                <p className="text-slate-500 text-sm italic">No shops or world events active.</p>
              </div>
            )}
          </div>

          {/* NPC Tracker */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-termina-gold flex items-center gap-2 border-b border-slate-700 pb-2">
              <span>👥</span> NPC Tracker
            </h3>
            
            <div className="grid gap-2">
              {npcStatuses.map(npc => (
                <div 
                  key={npc.id} 
                  onClick={() => onCharacterClick && onCharacterClick(npc.id)}
                  className={`
                    p-3 rounded border flex items-center justify-between transition-all cursor-pointer group
                    ${!npc.hasEvent 
                      ? 'bg-slate-900/30 border-slate-800 text-slate-600 hover:bg-slate-800' 
                      : npc.isSleeping 
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500 grayscale hover:grayscale-0' 
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-termina-accent/50 hover:bg-slate-700'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border ${
                      npc.isSleeping ? 'bg-slate-800 border-slate-700 text-slate-600' : 'bg-purple-900/30 border-purple-700 text-purple-200 group-hover:bg-termina-accent group-hover:text-black'
                    }`}>
                      {npc.isSleeping ? '💤' : '👤'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm group-hover:text-termina-accent transition-colors">{npc.name}</span>
                        {npc.isSleeping && <span className="text-[9px] uppercase border border-slate-700 px-1 rounded">Sleeping</span>}
                      </div>
                      <div className="text-xs opacity-70 flex gap-2">
                        <span>{npc.activity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono bg-black/20 px-2 py-1 rounded border border-white/5">
                    📍 {npc.location}
                  </div>
                </div>
              ))}
              
              {npcStatuses.length === 0 && (
                <p className="text-slate-500 text-sm italic p-4">No NPCs found in this region.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-serif text-termina-gold flex items-center gap-2 border-b border-slate-700 pb-2">
            <span>📜</span> Available Quest Steps
          </h3>
          
          <div className="grid gap-3">
            {availableQuestSteps.length > 0 ? (
              availableQuestSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedQuestId(step.questId)}
                  className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg group hover:bg-slate-750 hover:border-termina-accent/50 cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between"
                  title="Click to view full Quest details"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 group-hover:bg-termina-accent transition-colors"></div>
                  <div className="pl-3 mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-white text-lg flex items-center gap-2 group-hover:text-termina-accent transition-colors">
                        {step.stepTitle}
                        {(step.time) && <span className="text-[10px] bg-red-900/50 text-red-200 px-1.5 py-0.5 rounded border border-red-800">{formatTime12h(step.time)}</span>}
                      </h4>
                      {onToggleStep && (
                         <button 
                           onClick={(e) => { e.stopPropagation(); onToggleStep(step.questId, step.stepId); }}
                           className="bg-green-700 hover:bg-green-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg transition-transform hover:scale-105 uppercase tracking-wider border border-green-500"
                         >
                           Complete
                         </button>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">in {step.questTitle}</span>
                      <span className="text-[10px] text-slate-500">{step.region}</span>
                    </div>
                    
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{step.description}</p>
                  </div>
                  
                  <div className="pl-3 mt-auto text-xs text-termina-gold flex items-center gap-1 pt-2 border-t border-slate-700/50">
                    <span>📍</span> {step.location} 
                    {step.time && (
                      <span className="ml-2 text-slate-400 font-mono">
                        {step.days ? `Day ${step.days.join(',')}` : ''} {formatTime12h(step.time)}
                        {step.endTime ? ` - ${formatTime12h(step.endTime)}` : ''}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-8 text-center">
                <p className="text-slate-500 text-sm italic">No quest steps available at this specific time.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
