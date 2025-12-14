
import React, { useState, useMemo } from 'react';
import { shopItems } from '../data';
import { GlobalState, ShopItem, GameHistory } from '../types';

interface CuriosityShopViewProps {
  globalState: GlobalState;
  gameHistory: GameHistory;
  setGameHistory: React.Dispatch<React.SetStateAction<GameHistory>>;
  addNotification: (msg: string, type: 'shop' | 'timeline' | 'info', action?: () => void) => void;
  onOpenWiki: (url: string, title?: string) => void;
}

// Helper to parse the raw text block into structured data
const parseItemStats = (rawStats: string) => {
  if (!rawStats) return { meta: "Unknown", body: "No stats available.", attributes: [] };

  const lines = rawStats.split('\n').map(l => l.trim()).filter(Boolean);
  const meta = lines[0]; // First line is always Type/Rarity
  
  const attributes: { label: string; value: string }[] = [];
  const bodyLines: string[] = [];

  // Regexers for specific D&D stat lines
  const attrRegex = /^(Damage|Damage Type|Weight|Properties|Range|Capacity|Speed):(.*)/i;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(attrRegex);
    
    if (match) {
      attributes.push({ label: match[1], value: match[2].trim() });
    } else {
      bodyLines.push(line);
    }
  }

  return {
    meta,
    body: bodyLines.join('\n\n'),
    attributes
  };
};

export const CuriosityShopView: React.FC<CuriosityShopViewProps> = ({ 
  globalState, 
  gameHistory, 
  setGameHistory, 
  addNotification,
  onOpenWiki
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [justPurchased, setJustPurchased] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'available' | 'collection'>('available');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const sortedItems = useMemo(() => {
    const enriched = shopItems.map(item => ({
      ...item,
      isUnlocked: globalState.completedSteps.includes(item.requiredStepId) || gameHistory.purchasedItems.includes(item.id),
      isPurchased: gameHistory.purchasedItems.includes(item.id)
    }));

    const searchFiltered = enriched.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return searchFiltered.filter(item => {
      if (activeTab === 'available') {
        return !item.isPurchased; 
      } else {
        return item.isPurchased;
      }
    }).sort((a, b) => {
      if (activeTab === 'available') {
        if (a.isUnlocked && !b.isUnlocked) return -1;
        if (!a.isUnlocked && b.isUnlocked) return 1;
      }
      return a.name.localeCompare(b.name);
    });
  }, [globalState.completedSteps, searchQuery, gameHistory.purchasedItems, activeTab]);

  const unlockedCount = shopItems.filter(i => (globalState.completedSteps.includes(i.requiredStepId) || gameHistory.purchasedItems.includes(i.id)) && !gameHistory.purchasedItems.includes(i.id)).length;
  const purchasedCount = gameHistory.purchasedItems.length;

  const handlePurchase = (e: React.MouseEvent, item: ShopItem) => {
    e.stopPropagation();
    setGameHistory(prev => ({
      ...prev,
      purchasedItems: [...prev.purchasedItems, item.id]
    }));
    setJustPurchased(prev => [...prev, item.id]);
    addNotification(`Purchased ${item.name}! Added to Collection.`, 'shop');
  };

  const handleItemClick = (item: ShopItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="space-y-6 relative pb-20">
      
      {/* Detailed Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedItem(null)}>
           <div 
             className="bg-[#1a1025] w-full max-w-lg shadow-[0_0_50px_rgba(216,180,254,0.1)] relative overflow-hidden flex flex-col max-h-[90vh]" 
             onClick={e => e.stopPropagation()}
           >
              {/* Decorative Borders */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-termina-gold to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-termina-gold to-transparent opacity-50"></div>

              {/* Header */}
              <div className="p-6 pb-4 bg-slate-900/50 border-b border-termina-gold/30">
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-black/40 rounded-full p-1.5 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-3xl font-serif font-bold text-termina-gold tracking-wide uppercase">{selectedItem.name}</h3>
                <div className="flex justify-between items-end mt-2">
                   <div className="text-slate-400 text-sm italic font-serif">{selectedItem.description}</div>
                   <div className="text-sm font-bold text-amber-400 bg-amber-900/20 px-3 py-1 rounded border border-amber-800/50 whitespace-nowrap ml-4">
                      {selectedItem.price} Rupees
                   </div>
                </div>
              </div>
              
              {/* Content Scroll Area */}
              <div className="overflow-y-auto p-6 custom-scrollbar space-y-6">
                 
                 {/* D&D 5e Stat Block Design */}
                 <div className="bg-[#e3dac9] text-black p-1 shadow-inner">
                    <div className="border-2 border-[#922610] p-4">
                        {/* Stat Header */}
                        <h4 className="font-serif font-bold text-2xl text-[#922610] uppercase border-b-2 border-[#922610] pb-1 mb-1">
                          {selectedItem.name}
                        </h4>
                        
                        {(() => {
                          const { meta, body, attributes } = parseItemStats(selectedItem.stats);
                          return (
                            <>
                              <div className="text-sm italic font-serif mb-4 text-black">{meta}</div>
                              
                              <div className="text-sm font-serif leading-relaxed space-y-2 text-black whitespace-pre-wrap">
                                {body}
                              </div>

                              {attributes.length > 0 && (
                                <div className="mt-4 pt-2 border-t border-[#922610]">
                                  {attributes.map((attr, idx) => (
                                    <div key={idx} className="flex text-sm font-serif">
                                      <span className="font-bold text-[#922610] mr-1">{attr.label}:</span>
                                      <span className="text-black">{attr.value}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          );
                        })()}
                    </div>
                 </div>

                 {/* Footer Metadata */}
                 <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 justify-between items-center text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="uppercase tracking-wider font-bold">Unlock Requirement:</span>
                      <span className="text-slate-300">{selectedItem.questName}</span>
                    </div>
                    {selectedItem.wikidotUrl && (
                       <button 
                         onClick={() => onOpenWiki(selectedItem.wikidotUrl!, selectedItem.name)}
                         className="text-termina-accent hover:text-white underline decoration-dotted flex items-center gap-1"
                       >
                         <span>External Wiki</span>
                         <span>↗</span>
                       </button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Shop Header */}
      <div className="bg-slate-900/80 p-6 rounded-lg border border-amber-700/50 shadow-lg bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-amber-500 mb-2 flex items-center gap-3">
              <span>🗝️</span> Curiosity Shop
            </h2>
            <p className="text-amber-200/80 text-sm italic">
              "We deal in the strange, the lost, and the stolen."
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
             <div className="text-xs text-slate-400 font-mono flex gap-3">
                <span>AVAILABLE: <span className="text-green-400 font-bold">{unlockedCount}</span></span>
                <span>OWNED: <span className="text-amber-400 font-bold">{purchasedCount}</span></span>
            </div>
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800/80 border border-slate-600 rounded px-3 py-2 text-sm text-amber-100 focus:border-amber-500 outline-none w-full md:w-64 placeholder-slate-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 border-b border-amber-900/30">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-t-lg transition-colors ${
              activeTab === 'available' 
                ? 'bg-amber-900/20 text-amber-400 border-t border-x border-amber-700/50' 
                : 'text-slate-500 hover:text-amber-200 hover:bg-slate-800/30'
            }`}
          >
            For Sale
          </button>
          <button
            onClick={() => setActiveTab('collection')}
            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-t-lg transition-colors ${
              activeTab === 'collection' 
                ? 'bg-amber-900/20 text-amber-400 border-t border-x border-amber-700/50' 
                : 'text-slate-500 hover:text-amber-200 hover:bg-slate-800/30'
            }`}
          >
            Purchased
          </button>
        </div>
      </div>

      {/* Item List */}
      <div className="space-y-3 min-h-[300px]">
        {sortedItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => handleItemClick(item)}
            className={`
              relative rounded-lg p-4 border transition-all flex flex-col sm:flex-row sm:items-center gap-4 group cursor-pointer
              ${item.isPurchased 
                ? 'bg-slate-900 border-amber-900/30 opacity-80 hover:opacity-100' 
                : item.isUnlocked 
                  ? 'bg-slate-800 border-slate-700 hover:border-amber-500/50 hover:bg-slate-700/50 shadow-lg' 
                  : 'bg-slate-900/50 border-slate-800 opacity-80 grayscale'}
            `}
            title="Click to view Item Stats"
          >
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h3 className={`text-lg font-bold ${item.isPurchased ? 'text-amber-500' : item.isUnlocked ? 'text-amber-100 group-hover:text-amber-400' : 'text-slate-500'} transition-colors`}>
                    {item.name}
                  </h3>
                  {item.isPurchased && <span className="text-[10px] font-bold text-slate-500 uppercase border border-slate-700 px-2 rounded bg-black/20">In Inventory</span>}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`text-xs font-bold px-2 py-1 rounded ${item.isPurchased ? 'text-slate-500' : item.isUnlocked ? 'bg-amber-900/80 text-amber-200' : 'bg-slate-800 text-slate-600'}`}>
                    {item.price} Rupees
                  </div>
                  {item.isUnlocked && !item.isPurchased && (
                    <button 
                      onClick={(e) => handlePurchase(e, item)}
                      className={`text-white text-xs font-bold px-3 py-1 rounded shadow-lg transition-transform hover:scale-105 z-10 relative ${
                         justPurchased.includes(item.id) 
                           ? 'bg-amber-600 cursor-default'
                           : 'bg-green-600 hover:bg-green-500'
                      }`}
                    >
                      {justPurchased.includes(item.id) ? 'BOUGHT!' : 'BUY'}
                    </button>
                  )}
                  {/* Details Icon Indicator */}
                  <span className="text-slate-600 group-hover:text-termina-accent transition-colors ml-2" title="View Details">
                    📜
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-slate-400 mt-1">{item.description}</p>
              
              {!item.isPurchased && (
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-slate-600 uppercase tracking-wider font-bold">Unlock Requirement:</span>
                  <span className={`${item.isUnlocked ? 'text-green-400' : 'text-red-400/70'}`}>
                    {item.questName}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {sortedItems.length === 0 && (
          <div className="text-center py-12 text-slate-500 italic border border-dashed border-slate-800 rounded-lg">
            {activeTab === 'available' 
               ? "No available items found. Complete more quests to unlock stock!"
               : "No items purchased yet. Visit the shop to buy equipment."}
          </div>
        )}
      </div>
    </div>
  );
};
