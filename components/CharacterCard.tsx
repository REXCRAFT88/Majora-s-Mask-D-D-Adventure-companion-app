
import React from 'react';
import { Character, Quest } from '../types';
import { timelineEvents, quests } from '../data';
import { formatDisplayTime } from '../data/helpers';

interface CharacterCardProps {
  character: Character;
  onClick: (char: Character) => void;
  allQuests?: Quest[]; // Optional for backward compatibility, but recommended
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick, allQuests }) => {
  // Use passed allQuests if available, else fallback to default static data
  const availableQuests = allQuests || quests;

  const hasTimelineChange = timelineEvents.some(e => e.relatedId === character.id && e.condition);
  
  // Map quest IDs to actual quest objects
  const characterQuests = character.quests
    .map(qid => availableQuests.find(q => q.id === qid || q.steps.some(s => s.id === qid))) 
    .filter(Boolean);

  const getScheduleString = (char: Character) => {
      if (char.scheduleEvents && char.scheduleEvents.length > 0) {
          return char.scheduleEvents.map(e => {
             const dayStr = e.day === 'All' ? 'Daily' : `Day ${e.day}`;
             const timeStr = `${formatDisplayTime(e.start)} - ${formatDisplayTime(e.end)}`;
             return `${dayStr} ${timeStr}: ${e.location} (${e.title})`;
          }).join('\n');
      }
      return char.schedule;
  };

  return (
    <div 
      onClick={() => onClick(character)}
      className={`bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-termina-accent cursor-pointer transition-all shadow-lg hover:shadow-termina-accent/20 relative flex flex-col h-full ${character.isCustom ? 'border-blue-500/30 bg-blue-900/10' : character.isEdited ? 'border-amber-500/30 bg-amber-900/10' : ''}`}
    >
      {hasTimelineChange && (
        <div className="absolute top-4 right-4 group">
          <span className="text-xl cursor-help text-purple-400">⇄</span>
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-black text-xs text-slate-300 p-2 rounded border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            This character's schedule changes based on quest actions.
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
           <h3 className="text-xl font-bold text-termina-accent truncate max-w-[180px]">{character.name}</h3>
           {character.isCustom && <span title="Custom Character" className="text-xs">✨</span>}
           {character.isEdited && !character.isCustom && <span title="Schedule Modified" className="text-xs">✏️</span>}
        </div>
        {character.icon && (
          <img 
            src={character.icon} 
            alt={`${character.name} icon`} 
            className={`w-12 h-12 rounded-full border-2 border-termina-accent object-cover ${
              ['kafei', 'jim', 'pamela', 'beavers', 'goron-child'].includes(character.id) ? 'scale-125' : ''
            }`}
          />
        )}
      </div>
      <p className="text-sm text-termina-gold mb-2">{character.locationRegion}</p>
      <p className="text-slate-400 text-sm line-clamp-2 mb-4">{character.description}</p>
      
      {character.defaultActivity && (
         <div className="mb-3 bg-slate-900/30 p-2 rounded border border-slate-700/50">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Downtime</p>
            <p className="text-slate-300 text-xs">
               <span className="font-bold text-blue-200">{character.defaultActivity}</span> 
               <span className="text-slate-500 mx-1">@</span> 
               <span className="text-slate-400">{character.defaultLocation || character.locationSpecific}</span>
            </p>
         </div>
      )}

      <div className="mb-4">
         <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Active Schedule</p>
         <p className="text-slate-300 text-xs whitespace-pre-line line-clamp-3">{getScheduleString(character)}</p>
      </div>
      
      <div className="mt-auto pt-3 border-t border-slate-700/50">
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 block">Involved In:</span>
        {characterQuests.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {characterQuests.map((q, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-900/50 text-purple-300 rounded border border-slate-700/50 truncate max-w-full">
                Q{q!.questNumber}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-[10px] text-slate-600 italic">No major quests</span>
        )}
      </div>
    </div>
  );
};
