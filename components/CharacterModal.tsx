
import React from 'react';
import { Character } from '../types';
import { quests } from '../data';
import { formatDisplayTime } from '../data/helpers';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
  onOpenPdf: (page: string | number) => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose, onOpenPdf }) => {
  if (!character) return null;

  // Find quest steps specifically involving this character
  const characterSteps = quests.flatMap(q => 
    q.steps
      .filter(step => step.characterId === character.id)
      .map(step => ({ ...step, questTitle: q.title, questNumber: q.questNumber }))
  );

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
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border-2 border-termina-accent rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col relative shadow-[0_0_30px_rgba(216,180,254,0.15)] animate-fade-in"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 rounded-full p-2 z-20 transition-colors"
          title="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="overflow-y-auto flex-1 p-8 custom-scrollbar">
          <h2 className="text-3xl font-serif font-bold text-termina-accent mb-2 pr-10">{character.name}</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-xs font-bold border border-purple-700 uppercase tracking-wider">
              {character.locationRegion}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 uppercase tracking-wider">
              {character.locationSpecific}
            </span>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-termina-gold font-bold uppercase tracking-widest text-xs mb-3 border-b border-slate-800 pb-1">Description</h3>
              <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-line">{character.description}</p>
            </section>

            <section>
              <h3 className="text-termina-gold font-bold uppercase tracking-widest text-xs mb-3 border-b border-slate-800 pb-1">Schedule & Behavior</h3>
              <p className="text-slate-300 text-sm whitespace-pre-line">{getScheduleString(character)}</p>
            </section>

            {characterSteps.length > 0 && (
              <section>
                <h3 className="text-termina-gold font-bold uppercase tracking-widest text-xs mb-3 border-b border-slate-800 pb-1">Quest Involvement</h3>
                <div className="space-y-3">
                  {characterSteps.map((step, i) => (
                    <div key={i} className="bg-slate-800/50 p-3 rounded border border-slate-700">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-purple-300 font-bold uppercase">Quest {step.questNumber}: {step.questTitle}</span>
                        {(step.day || step.time) && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {step.day ? `Day ${step.day}` : ''} {step.time}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-200 text-sm font-medium">{step.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-slate-500 text-xs">📍 {step.location}</p>
                        {step.pageReference && (
                           <button 
                             onClick={() => onOpenPdf(step.pageReference!)}
                             className="text-[10px] text-termina-accent hover:underline decoration-dotted"
                           >
                             (Ref: p.{step.pageReference})
                           </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {character.connections.length > 0 && (
              <section>
                <h3 className="text-termina-gold font-bold uppercase tracking-widest text-xs mb-3 border-b border-slate-800 pb-1">Connections</h3>
                <div className="flex flex-wrap gap-2">
                  {character.connections.map((c, i) => (
                    <span key={i} className="bg-slate-800 px-3 py-1 rounded text-xs text-slate-400 border border-slate-700">{c}</span>
                  ))}
                </div>
              </section>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-slate-800 mt-6">
              <span className="text-slate-600 text-xs flex items-center gap-1">
                Source: 
                <button 
                  onClick={() => onOpenPdf(character.pages)}
                  className="text-termina-accent hover:underline ml-1"
                >
                  PDF Page {character.pages}
                </button>
              </span>
              <a 
                href={character.wikiLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-termina-accent hover:text-white text-sm underline decoration-dotted"
              >
                View on Zelda Wiki &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
