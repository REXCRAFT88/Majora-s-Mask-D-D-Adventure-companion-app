
import React from 'react';
import { MasterTimelineEvent, GlobalState, Character, CustomShop } from '../types';
import { characters, quests } from '../data';
import { QuestCard } from './QuestCard';

interface TimelineDetailPanelProps {
  event: MasterTimelineEvent;
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  onToggleStep?: (questId: string, stepId: string) => void;
  onCharacterClick: (charId: string) => void;
  onClose: () => void;
  addNotification: (msg: string, type: 'shop' | 'timeline' | 'info', action?: () => void) => void;
  onOpenPdf: (page: string | number) => void;
  allCharacters?: Character[];
  customShops?: CustomShop[];
  // Need all quests to resolve custom quests
  allQuests?: any[]; 
}

export const TimelineDetailPanel: React.FC<TimelineDetailPanelProps> = ({ 
  event, globalState, setGlobalState, onToggleStep, onCharacterClick, onClose, addNotification, onOpenPdf, allCharacters, customShops, allQuests
}) => {
  
  const displayCharacters = allCharacters || characters;
  const displayShops = customShops || [];
  
  // Resolve quest from ALL quests (including custom), falling back to default static list if not provided
  const availableQuests = allQuests || quests;

  // Find related quest
  const relatedQuest = event.category.includes('Quest') && event.relatedId 
    ? availableQuests.find(q => q.id === event.relatedId) 
    : null;

  // Find specific character if NPC Schedule
  const primaryCharacter = event.category === 'NPC Schedule' && event.relatedId
    ? displayCharacters.find(c => c.id === event.relatedId)
    : null;

  // Custom Shop Logic
  const customShopMatch = event.id.match(/^shop-(.+)-d\d+$/);
  const isCustomShop = !!customShopMatch;
  let customShopData: CustomShop | undefined;
  
  if (isCustomShop && customShopMatch) {
     const shopId = customShopMatch[1];
     customShopData = displayShops.find(s => s.id === shopId);
  }

  // Standard logic for location characters
  let locationCharacters: Character[] = [];
  if (customShopData) {
     if (customShopData.relatedCharacters) {
        locationCharacters = customShopData.relatedCharacters.map(rc => 
           displayCharacters.find(c => c.id === rc.characterId)
        ).filter(Boolean) as Character[];
     }
  } else if (event.category === 'Business') {
      locationCharacters = displayCharacters.filter(c => c.locationSpecific.includes(event.location));
  }

  // IMPROVED "Also at Location" Logic
  const charactersAtLocation = event.category !== 'Business' 
    ? displayCharacters.filter(c => {
        if (c.id === primaryCharacter?.id) return false;
        
        // Check dynamic schedule events
        if (c.scheduleEvents && c.scheduleEvents.length > 0) {
           return c.scheduleEvents.some(e => {
              // Check Day
              if (e.day !== 'All' && e.day !== event.day) return false;
              
              // Check Time Overlap
              const [sH, sM] = e.start.split(':').map(Number);
              const [eH, eM] = e.end.split(':').map(Number);
              
              const evtStartMins = (event.sortTime % 1440); 
              
              const parseToRelMins = (h: number, m: number) => {
                 let adjH = h < 6 ? h + 24 : h;
                 return ((adjH - 6) * 60) + m;
              };

              const schedStart = parseToRelMins(sH, sM);
              const schedEnd = parseToRelMins(eH, eM);

              if (evtStartMins >= schedStart && evtStartMins < schedEnd) {
                 return e.location === event.location || e.location.includes(event.location) || event.location.includes(e.location);
              }
              return false;
           });
        }

        return c.locationSpecific.includes(event.location) || (event.location.includes(c.locationSpecific));
    })
    : [];

  const isBusiness = event.category === 'Business';

  const characterQuests = primaryCharacter 
    ? availableQuests.filter(q => q.steps.some(s => s.characterId === primaryCharacter.id))
    : [];

  return (
    <div className="bg-slate-900/95 flex flex-col h-full overflow-hidden border-r border-slate-700">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-start shrink-0">
        <div className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${
              event.category === 'Main Quest' ? 'bg-red-900/30 text-red-200 border-red-800' :
              event.category === 'Side Quest' ? 'bg-purple-900/30 text-purple-200 border-purple-800' :
              event.category === 'Business' ? 'bg-emerald-900/30 text-emerald-200 border-emerald-800' :
              'bg-blue-900/30 text-blue-200 border-blue-800'
            }`}>
              {event.category}
            </span>
            <span className="text-termina-gold font-mono text-xs whitespace-nowrap">Day {event.day} • {event.timeDisplay}</span>
          </div>
          <h2 className="text-lg font-bold text-white truncate pr-2">{event.title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
             <span className="truncate">📍 {event.location}</span>
             {event.pageReference && (
                <button 
                  onClick={() => onOpenPdf(event.pageReference!)}
                  className="text-termina-accent hover:underline decoration-dotted"
                >
                  (Ref: p.{event.pageReference})
                </button>
             )}
          </div>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white p-1 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-slate-600 pl-4 italic">
            {event.description}
          </p>
        </div>

        {isBusiness && (
          <div className="bg-slate-800/50 rounded border border-slate-700 p-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Related People</h3>
            {locationCharacters.length > 0 ? (
              <div className="grid gap-3">
                {locationCharacters.map(char => {
                   let role = char.description;
                   if (customShopData && customShopData.relatedCharacters) {
                      const rel = customShopData.relatedCharacters.find(r => r.characterId === char.id);
                      if (rel) role = rel.role;
                   }

                   return (
                    <div 
                        key={char.id}
                        onClick={() => onCharacterClick(char.id)}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center text-sm border border-emerald-500/30 group-hover:border-termina-accent">👤</div>
                        <div>
                        <p className="text-sm font-bold text-emerald-200 group-hover:text-termina-accent transition-colors">{char.name}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{role}</p>
                        </div>
                    </div>
                   );
                })}
              </div>
            ) : (
              <p className="text-slate-500 text-xs italic">No specific characters mapped to this location.</p>
            )}
          </div>
        )}

        {primaryCharacter && (
          <div className="bg-slate-800/50 rounded border border-slate-700 p-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Key Character</h3>
            <div 
              onClick={() => onCharacterClick(primaryCharacter.id)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-lg border border-purple-500/30 group-hover:border-termina-accent">👤</div>
              <div>
                <p className="text-sm font-bold text-purple-200 group-hover:text-termina-accent transition-colors">{primaryCharacter.name}</p>
                <p className="text-xs text-slate-500 line-clamp-1">{primaryCharacter.description}</p>
              </div>
            </div>

            {characterQuests.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-700/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Related Quests</p>
                <div className="flex flex-col gap-2">
                  {characterQuests.map(q => (
                    <div key={q.id} className="text-xs text-slate-300 bg-slate-900/50 px-2 py-1 rounded border border-slate-700/50">
                      <span className="text-termina-gold mr-1">Q{q.questNumber}</span>
                      {q.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {charactersAtLocation.length > 0 && !isBusiness && (
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Also at Location</h3>
            <div className="grid grid-cols-1 gap-2">
              {charactersAtLocation.map(char => (
                <div 
                  key={char.id}
                  onClick={() => onCharacterClick(char.id)}
                  className="flex items-center gap-3 p-2 bg-slate-800/30 border border-slate-700 rounded cursor-pointer hover:border-termina-accent transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-slate-400">?</div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{char.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedQuest && (
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Quest Details</h3>
            <QuestCard 
              quest={relatedQuest}
              globalState={globalState}
              setGlobalState={setGlobalState}
              onToggleStep={onToggleStep}
              onCharacterClick={onCharacterClick}
              defaultExpanded={true}
              addNotification={addNotification}
              onOpenPdf={onOpenPdf}
              allQuests={availableQuests}
            />
          </div>
        )}
      </div>
    </div>
  );
};
