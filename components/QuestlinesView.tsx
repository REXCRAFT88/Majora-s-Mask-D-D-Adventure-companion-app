
import React, { useState, useMemo, useEffect } from 'react';
import { characters } from '../data';
import { GlobalState, Region, GameHistory, Quest } from '../types';
import { QuestCard } from './QuestCard';

interface QuestlinesViewProps {
  onCharacterClick: (charId: string) => void;
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  onToggleStep?: (questId: string, stepId: string) => void;
  addNotification: (msg: string, type: 'shop' | 'timeline' | 'info', action?: () => void) => void;
  onOpenPdf: (page: string | number) => void;
  onNavigate: (view: any, id?: string) => void;
  gameHistory?: GameHistory;
  highlightedQuestId?: string | null;
  allQuests: Quest[];
  onCreateQuest?: () => void;
  onEditQuest?: (quest: Quest) => void;
}

export const QuestlinesView: React.FC<QuestlinesViewProps> = ({ 
  onCharacterClick, 
  globalState, 
  setGlobalState, 
  onToggleStep, 
  addNotification, 
  onOpenPdf, 
  onNavigate, 
  gameHistory,
  highlightedQuestId,
  allQuests,
  onCreateQuest,
  onEditQuest
}) => {
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [filterCharacter, setFilterCharacter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-scroll to highlighted quest
  useEffect(() => {
    if (highlightedQuestId) {
      // Small delay to allow render
      setTimeout(() => {
        const el = document.getElementById(`quest-card-${highlightedQuestId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-termina-accent');
          setTimeout(() => el.classList.remove('ring-2', 'ring-termina-accent'), 2000);
        }
      }, 100);
    }
  }, [highlightedQuestId]);

  const regions = ['All', ...Object.values(Region)];
  // Get unique characters involved in quests for the dropdown
  const questCharacters = useMemo(() => {
    const charIds = new Set<string>();
    allQuests.forEach(q => q.steps.forEach(s => {
      if (s.characterId) charIds.add(s.characterId);
    }));
    return characters.filter(c => charIds.has(c.id)).sort((a,b) => a.name.localeCompare(b.name));
  }, [allQuests]);

  const filteredQuests = useMemo(() => {
    return allQuests.filter(quest => {
      // If highlighted, ignore filters initially? No, standard behavior usually respects filters.
      // But if user clicks "View Quest" from elsewhere, they expect to see it.
      if (highlightedQuestId && quest.id === highlightedQuestId) return true;

      const matchesRegion = filterRegion === 'All' || quest.region === filterRegion;
      
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch = quest.title.toLowerCase().includes(lowerQuery) || 
                            quest.description.toLowerCase().includes(lowerQuery) ||
                            // Search by Quest Number (e.g. "1", "10", "1-1")
                            quest.questNumber.toString() === lowerQuery ||
                            quest.steps.some(s => s.id.toLowerCase().includes(lowerQuery));
      
      let matchesCharacter = filterCharacter === 'All';
      if (filterCharacter !== 'All') {
        matchesCharacter = quest.steps.some(s => s.characterId === filterCharacter);
      }

      return matchesRegion && matchesSearch && matchesCharacter;
    }).sort((a, b) => a.questNumber - b.questNumber);
  }, [filterRegion, filterCharacter, searchQuery, highlightedQuestId, allQuests]);

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/50 p-6 rounded-lg border border-purple-900/50 mb-6">
        <div className="flex justify-between items-center mb-2">
           <h2 className="text-2xl font-bold text-termina-gold">Questlines</h2>
           {onCreateQuest && (
              <button 
                onClick={onCreateQuest}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm shadow-lg transition-colors flex items-center gap-2"
              >
                <span>+</span> Create Quest
              </button>
           )}
        </div>
        <p className="text-slate-400 text-sm mb-4">
          Track your progress. Checked items may alter the timeline.
          <br />
          <span className="text-termina-danger font-bold">Red items</span> are Main Quests essential to saving Termina.
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Search quests (e.g. 'Gold', '1-1')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-termina-accent outline-none"
          />
          
          <select 
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-termina-accent outline-none"
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <select 
            value={filterCharacter}
            onChange={(e) => setFilterCharacter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-termina-accent outline-none"
          >
            <option value="All">All Characters</option>
            {questCharacters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredQuests.length > 0 ? (
          filteredQuests.map(quest => (
            <QuestCard 
              key={quest.id}
              quest={quest}
              globalState={globalState}
              setGlobalState={setGlobalState}
              onToggleStep={onToggleStep}
              onCharacterClick={onCharacterClick}
              addNotification={addNotification}
              onOpenPdf={onOpenPdf}
              onNavigate={onNavigate}
              gameHistory={gameHistory}
              defaultExpanded={quest.id === highlightedQuestId}
              allQuests={allQuests}
              onEdit={onEditQuest}
            />
          ))
        ) : (
          <div className="text-center py-12 text-slate-500 italic">No quests found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};
