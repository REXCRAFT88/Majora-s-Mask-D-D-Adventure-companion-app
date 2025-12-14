import React from 'react';
import { Quest, GlobalState, GameHistory } from '../types';
import { QuestCard } from './QuestCard';
import { quests } from '../data';

interface QuestDetailModalProps {
  quest: Quest | null;
  onClose: () => void;
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  onToggleStep?: (questId: string, stepId: string) => void;
  onCharacterClick?: (charId: string) => void;
  addNotification: (msg: string, type: 'shop' | 'timeline' | 'info', action?: () => void) => void;
  onOpenPdf: (page: string | number) => void;
  gameHistory?: GameHistory;
  allQuests?: Quest[];
}

export const QuestDetailModal: React.FC<QuestDetailModalProps> = ({
  quest, onClose, globalState, setGlobalState, onToggleStep, onCharacterClick, addNotification, onOpenPdf, gameHistory, allQuests
}) => {
  if (!quest) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-xl shadow-2xl relative border border-termina-accent" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-white/20"
        >
          &times;
        </button>
        <div className="p-1">
          <QuestCard
            quest={quest}
            globalState={globalState}
            setGlobalState={setGlobalState}
            onToggleStep={onToggleStep}
            onCharacterClick={(id) => { onClose(); if(onCharacterClick) onCharacterClick(id); }}
            addNotification={addNotification}
            onOpenPdf={onOpenPdf}
            gameHistory={gameHistory}
            defaultExpanded={true}
            allQuests={allQuests || quests}
          />
        </div>
      </div>
    </div>
  );
};