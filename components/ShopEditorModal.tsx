
import React, { useState } from 'react';
import { CustomShop, Region, Character } from '../types';

interface ShopEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (shop: CustomShop) => void;
  allCharacters: Character[];
}

export const ShopEditorModal: React.FC<ShopEditorModalProps> = ({ isOpen, onClose, onSave, allCharacters }) => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState<Region>(Region.ClockTown);
  const [location, setLocation] = useState('');
  const [openTime, setOpenTime] = useState('08:00');
  const [closeTime, setCloseTime] = useState('20:00');
  const [desc, setDesc] = useState('');
  const [relatedPeople, setRelatedPeople] = useState<{characterId: string, role: string}[]>([]);
  const [newRelCharId, setNewRelCharId] = useState('');
  const [newRelRole, setNewRelRole] = useState('');

  if (!isOpen) return null;

  const handleAddPerson = () => {
    if (newRelCharId && newRelRole) {
      setRelatedPeople([...relatedPeople, { characterId: newRelCharId, role: newRelRole }]);
      setNewRelCharId(''); 
      setNewRelRole('');
    }
  };

  const handleSave = () => {
    if (!name) return;
    const newShop: CustomShop = {
      id: `custom-shop-${Date.now()}`,
      name,
      region,
      location,
      openingTime: openTime,
      closingTime: closeTime,
      description: desc,
      relatedCharacters: relatedPeople
    };
    onSave(newShop);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-slate-900 border border-emerald-500/50 rounded-xl w-full max-w-2xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
         <h3 className="text-xl font-bold text-emerald-400 mb-4">Open New Business</h3>
         
         <div className="space-y-4">
            <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-emerald-500 outline-none" placeholder="Business Name" value={name} onChange={e => setName(e.target.value)} />
            
            <div className="grid grid-cols-2 gap-4">
               <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={region} onChange={e => setRegion(e.target.value as Region)}>
                  {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
               </select>
               <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-xs text-slate-500 uppercase font-bold">Opens</label>
                 <input type="time" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={openTime} onChange={e => setOpenTime(e.target.value)} />
               </div>
               <div>
                 <label className="text-xs text-slate-500 uppercase font-bold">Closes</label>
                 <input type="time" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={closeTime} onChange={e => setCloseTime(e.target.value)} />
               </div>
            </div>

            <textarea className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white h-24 resize-none" placeholder="Description..." value={desc} onChange={e => setDesc(e.target.value)} />

            <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
               <label className="text-xs text-slate-400 font-bold uppercase">Staff & Associations</label>
               <div className="flex gap-2 mt-2 mb-2">
                  <select className="bg-slate-900 text-white text-xs p-2 rounded border border-slate-600 flex-1" value={newRelCharId} onChange={e => setNewRelCharId(e.target.value)}>
                    <option value="">Select Character...</option>
                    {allCharacters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <input className="bg-slate-900 text-white text-xs p-2 rounded border border-slate-600 w-1/3" placeholder="Role" value={newRelRole} onChange={e => setNewRelRole(e.target.value)} />
                  <button onClick={handleAddPerson} className="bg-emerald-700 text-white px-3 rounded font-bold hover:bg-emerald-600">+</button>
               </div>
               <div className="space-y-1">
                  {relatedPeople.map((rp, i) => {
                    const char = allCharacters.find(c => c.id === rp.characterId);
                    return (
                      <div key={i} className="flex justify-between bg-slate-800 px-2 py-1 rounded text-xs border border-slate-700">
                         <span className="text-white">{char?.name} <span className="text-slate-400">({rp.role})</span></span>
                         <button onClick={() => setRelatedPeople(prev => prev.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-200">&times;</button>
                      </div>
                    );
                  })}
               </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
               <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
               <button onClick={handleSave} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded shadow-lg">Create Shop</button>
            </div>
         </div>
      </div>
    </div>
  );
};
