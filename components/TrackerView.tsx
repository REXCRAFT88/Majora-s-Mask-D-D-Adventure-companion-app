
import React, { useRef, useMemo, useState } from 'react';
import { GlobalState, GameHistory, Quest, QuestCompletionLog } from '../types';
import { shopItems } from '../data';

interface TrackerViewProps {
  globalState: GlobalState;
  gameHistory: GameHistory;
  onSave: () => void;
  onLoad: (file: File) => void;
  onNewGame: () => void;
  allQuests: Quest[]; // New prop
}

type Tab = 'Campaign' | 'Cycle' | 'Day';

export const TrackerView: React.FC<TrackerViewProps> = ({ globalState, gameHistory, onSave, onLoad, onNewGame, allQuests }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('Campaign');

  // --- HELPERS ---
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const formatDistance = (miles: number) => {
    return miles.toFixed(1);
  };

  // --- CAMPAIGN STATS (Lifetime) ---
  const campaignStats = useMemo(() => {
    // XP Calculation
    let xp = 0;
    // From History
    Object.entries(gameHistory.stepCompletionCounts).forEach(([stepId, count]) => {
      for (const q of allQuests) {
        const step = q.steps.find(s => s.id === stepId);
        if (step) { xp += (step.xpReward * (count as number)); break; }
      }
    });
    // From Current (not yet in history)
    globalState.completedSteps.forEach(stepId => {
      for (const q of allQuests) {
        const step = q.steps.find(s => s.id === stepId);
        if (step) { xp += step.xpReward; break; }
      }
    });

    // Item Count (Shop History + Quest Rewards)
    const items = new Set<string>();
    gameHistory.purchasedItems.forEach(id => items.add(id));
    
    Object.keys(gameHistory.stepCompletionCounts).forEach(stepId => {
       allQuests.forEach(q => {
         const step = q.steps.find(s => s.id === stepId);
         if (step && step.itemRewards) step.itemRewards.forEach(r => items.add(r.name));
       });
    });
    globalState.completedSteps.forEach(stepId => {
       allQuests.forEach(q => {
         const step = q.steps.find(s => s.id === stepId);
         if (step && step.itemRewards) step.itemRewards.forEach(r => items.add(r.name));
       });
    });

    // Quests Completed (From log + current if complete)
    const completedQuestsCount = gameHistory.questLog.length + 
      allQuests.filter(q => q.steps.every(s => globalState.completedSteps.includes(s.id)) && !gameHistory.questLog.some(l => l.questId === q.id && l.cycle === gameHistory.cyclesCompleted + 1)).length;

    return {
      xp,
      distance: gameHistory.totalDistanceTravelled,
      items: items.size,
      questCount: completedQuestsCount,
      time: gameHistory.totalPlayTimeSeconds,
      cycles: gameHistory.cyclesCompleted
    };
  }, [gameHistory, globalState.completedSteps, allQuests]);

  // --- CYCLE STATS (Current 3-Day Loop) ---
  const cycleStats = useMemo(() => {
    // XP
    let xp = 0;
    globalState.completedSteps.forEach(stepId => {
      for (const q of allQuests) {
        const step = q.steps.find(s => s.id === stepId);
        if (step) { xp += step.xpReward; break; }
      }
    });

    // Quests
    const completedQuests = allQuests.filter(q => q.steps.every(s => globalState.completedSteps.includes(s.id)));

    // Items (Just new ones this cycle?)
    let items = 0;
    globalState.completedSteps.forEach(stepId => {
       allQuests.forEach(q => {
         const step = q.steps.find(s => s.id === stepId);
         if (step && step.itemRewards) items += step.itemRewards.length;
       });
    });

    return {
      xp,
      distance: globalState.cycleDistance,
      items,
      questCount: completedQuests.length,
      quests: completedQuests
    };
  }, [globalState, allQuests]);

  // --- DAY STATS (Since 6am today) ---
  const dayStats = useMemo(() => {
    // XP (Tracked in globalState.dayXp)
    
    // Quests/Steps completed Today
    const stepsToday = globalState.dayCompletedSteps || [];
    const completedStepObjects = stepsToday.map(id => {
      for (const q of allQuests) {
        const s = q.steps.find(st => st.id === id);
        if (s) return { ...s, questTitle: q.title };
      }
      return null;
    }).filter(Boolean);

    return {
      xp: globalState.dayXp,
      distance: globalState.dayDistance,
      steps: completedStepObjects
    };
  }, [globalState, allQuests]);

  const renderStatCard = (label: string, value: string | number, colorClass: string = "text-white") => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col items-center justify-center text-center">
      <p className="text-xs uppercase text-slate-400 font-bold mb-1">{label}</p>
      <p className={`text-2xl font-mono ${colorClass}`}>{value}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* File Management Header */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button 
          onClick={onSave}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-termina-accent text-white py-3 rounded-lg transition-all flex flex-col items-center justify-center gap-1 group"
        >
          <span className="text-xl">💾</span>
          <span className="text-xs font-bold">Save</span>
        </button>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-termina-accent text-white py-3 rounded-lg transition-all flex flex-col items-center justify-center gap-1 group"
        >
          <span className="text-xl">📂</span>
          <span className="text-xs font-bold">Load</span>
          <input type="file" ref={fileInputRef} onChange={(e) => { if(e.target.files?.[0]) { onLoad(e.target.files[0]); e.target.value=''; }}} className="hidden" accept=".json" />
        </button>

        <button 
          onClick={onNewGame}
          className="bg-slate-800 hover:bg-red-900/30 border border-slate-600 hover:border-red-500 text-white py-3 rounded-lg transition-all flex flex-col items-center justify-center gap-1 group"
        >
          <span className="text-xl">⚠️</span>
          <span className="text-xs font-bold group-hover:text-red-400">Reset</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        {(['Campaign', 'Cycle', 'Day'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 font-serif font-bold text-lg transition-colors border-b-2 ${
              activeTab === tab 
                ? 'border-termina-accent text-termina-accent bg-slate-800/30 rounded-t-lg' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CAMPAIGN VIEW */}
      {activeTab === 'Campaign' && (
        <div className="space-y-6 animate-slide-in-right">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {renderStatCard("Total Play Time", formatTime(campaignStats.time))}
            {renderStatCard("Cycles Endured", campaignStats.cycles)}
            {renderStatCard("Total XP Earned", campaignStats.xp.toLocaleString(), "text-termina-accent")}
            {renderStatCard("Distance Travelled", `${formatDistance(campaignStats.distance)} mi`)}
            {renderStatCard("Quests Completed", campaignStats.questCount)}
            {renderStatCard("Items Collected", campaignStats.items)}
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-serif text-termina-gold border-b border-slate-700 pb-2 mb-4">Quest Log</h3>
            {gameHistory.questLog.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                {[...gameHistory.questLog].reverse().map((log, i) => {
                  const quest = allQuests.find(q => q.id === log.questId);
                  return (
                    <div key={i} className="flex justify-between items-center bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <div>
                        <span className="text-xs font-bold bg-slate-700 px-2 py-0.5 rounded mr-2 text-slate-300">Cycle {log.cycle}</span>
                        <span className="font-bold text-slate-200">{quest?.title || "Unknown Quest"}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{log.timeString}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500 italic text-center py-8">No quests recorded in history.</p>
            )}
          </div>
        </div>
      )}

      {/* CYCLE VIEW */}
      {activeTab === 'Cycle' && (
        <div className="space-y-6 animate-slide-in-right">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderStatCard("Cycle Distance", `${formatDistance(cycleStats.distance)} mi`)}
            {renderStatCard("Cycle XP", cycleStats.xp.toLocaleString(), "text-termina-accent")}
            {renderStatCard("Items Found", cycleStats.items)}
            {renderStatCard("Quests Done", cycleStats.questCount)}
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-serif text-termina-gold border-b border-slate-700 pb-2 mb-4">Current Cycle Progress</h3>
            {cycleStats.quests.length > 0 ? (
              <div className="grid gap-3">
                {cycleStats.quests.map(q => (
                  <div key={q.id} className="bg-slate-800/80 p-4 rounded border border-green-900/50 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase mr-2">Quest {q.questNumber}</span>
                      <span className="font-bold text-green-400">{q.title}</span>
                    </div>
                    <span className="text-xl">✓</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-center py-8">No quests fully completed in this cycle yet.</p>
            )}
          </div>
        </div>
      )}

      {/* DAY VIEW */}
      {activeTab === 'Day' && (
        <div className="space-y-6 animate-slide-in-right">
          <div className="grid grid-cols-2 gap-4">
            {renderStatCard("Distance Today", `${formatDistance(dayStats.distance)} mi`)}
            {renderStatCard("XP Earned Today", dayStats.xp.toLocaleString(), "text-termina-accent")}
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-serif text-termina-gold border-b border-slate-700 pb-2 mb-4">Steps Completed Today</h3>
            {dayStats.steps.length > 0 ? (
              <div className="space-y-2">
                {dayStats.steps.map((step: any, i: number) => (
                  <div key={i} className="flex justify-between items-center bg-slate-800/30 p-3 rounded border border-slate-700/50">
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">{step.questTitle}</div>
                      <div className="font-medium text-slate-200">{step.title}</div>
                    </div>
                    <span className="text-xs font-bold bg-slate-900 text-termina-gold px-2 py-1 rounded">+{step.xpReward} XP</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-center py-8">No steps completed since dawn.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
