
import React, { useState, useEffect } from 'react';
import { Quest, QuestStep, Region, Character } from '../types';

interface QuestEditorModalProps {
  quest?: Quest;
  isOpen: boolean;
  onClose: () => void;
  onSave: (quest: Quest) => void;
  allCharacters: Character[];
  allQuests: Quest[];
}

export const QuestEditorModal: React.FC<QuestEditorModalProps> = ({ quest, isOpen, onClose, onSave, allCharacters, allQuests }) => {
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState<Region>(Region.ClockTown);
  const [desc, setDesc] = useState('');
  const [prereqQuestId, setPrereqQuestId] = useState('');
  const [steps, setSteps] = useState<QuestStep[]>([]);

  // Step Editor State
  const [editingStepIdx, setEditingStepIdx] = useState<number | null>(null);
  const [stepTitle, setStepTitle] = useState('');
  const [stepDesc, setStepDesc] = useState('');
  const [stepLoc, setStepLoc] = useState('');
  const [stepChar, setStepChar] = useState('');
  const [stepSecondChars, setStepSecondChars] = useState<string[]>([]);
  const [stepDay, setStepDay] = useState<1|2|3|'All'>('All');
  const [stepTime, setStepTime] = useState('');
  const [stepEndTime, setStepEndTime] = useState('');
  const [stepPrereq, setStepPrereq] = useState('');
  const [stepXp, setStepXp] = useState(100);
  const [stepRewardName, setStepRewardName] = useState('');

  useEffect(() => {
    if (quest) {
      setTitle(quest.title);
      setRegion(quest.region);
      setDesc(quest.description);
      setPrereqQuestId(quest.prerequisiteQuestId || '');
      setSteps(quest.steps);
    } else {
      setTitle('');
      setRegion(Region.ClockTown);
      setDesc('');
      setPrereqQuestId('');
      setSteps([]);
    }
    clearStepForm();
  }, [quest, isOpen]);

  const clearStepForm = () => {
    setEditingStepIdx(null);
    setStepTitle(''); setStepDesc(''); setStepLoc(''); setStepChar(''); setStepSecondChars([]);
    setStepDay('All'); setStepTime(''); setStepEndTime(''); setStepPrereq(''); 
    setStepXp(100); setStepRewardName('');
  };

  const loadStepForEditing = (idx: number) => {
    const s = steps[idx];
    setEditingStepIdx(idx);
    setStepTitle(s.title);
    setStepDesc(s.description);
    setStepLoc(s.location);
    setStepChar(s.characterId || '');
    setStepSecondChars(s.secondaryCharacterIds || []);
    setStepDay(s.days ? 'All' : (s.day || 'All'));
    setStepTime(s.time || '');
    setStepEndTime(s.endTime || '');
    setStepPrereq(s.prerequisiteStepId || '');
    setStepXp(s.xpReward);
    setStepRewardName(s.itemRewards?.[0]?.name || '');
  };

  const handleSaveStep = () => {
    if (!stepTitle) return;

    const newStep: QuestStep = {
      id: editingStepIdx !== null ? steps[editingStepIdx].id : `custom-step-${Date.now()}-${steps.length}`,
      title: stepTitle,
      description: stepDesc,
      location: stepLoc,
      characterId: stepChar || undefined,
      secondaryCharacterIds: stepSecondChars.length > 0 ? stepSecondChars : undefined,
      xpReward: stepXp,
      day: stepDay === 'All' ? undefined : stepDay,
      days: stepDay === 'All' ? [1, 2, 3] : undefined,
      time: stepTime || undefined,
      endTime: stepEndTime || undefined,
      prerequisiteStepId: stepPrereq || undefined,
      itemRewards: stepRewardName ? [{ name: stepRewardName, type: 'Item' }] : undefined
    };

    if (editingStepIdx !== null) {
      const updatedSteps = [...steps];
      updatedSteps[editingStepIdx] = newStep;
      setSteps(updatedSteps);
    } else {
      setSteps([...steps, newStep]);
    }
    clearStepForm();
  };

  const handleSaveQuest = () => {
    if (!title) return;

    let qNum = quest ? quest.questNumber : 67;
    if (!quest) {
       const customQuests = allQuests.filter(q => q.isCustom);
       if (customQuests.length > 0) {
         const maxNum = Math.max(...customQuests.map(q => q.questNumber));
         qNum = maxNum + 1;
       }
    }

    const newQuest: Quest = {
      id: quest ? quest.id : `custom-quest-${Date.now()}`,
      questNumber: qNum,
      isCustom: true,
      title,
      region,
      description: desc,
      steps,
      rewards: [],
      prerequisiteQuestId: prereqQuestId || undefined
    };
    onSave(newQuest);
    onClose();
  };
  
  const toggleSecondaryChar = (charId: string) => {
    if (stepSecondChars.includes(charId)) {
      setStepSecondChars(stepSecondChars.filter(id => id !== charId));
    } else {
      if (stepSecondChars.length >= 1) { // Limit to 1 secondary + 1 primary = 2 total (as per requirement for row view)
         // Actually, let's allow more but warn? No, prompt says "if > 2 it stays in Area".
         // So if I add many, it just goes to Area. That's fine.
         setStepSecondChars([...stepSecondChars, charId]);
      } else {
         setStepSecondChars([...stepSecondChars, charId]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-slate-900 border border-blue-500/50 rounded-xl w-full max-w-5xl max-h-[95vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
           <h3 className="text-xl font-bold text-blue-300">{quest ? 'Edit Quest' : 'Create New Quest'}</h3>
           <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-5">
              <h4 className="font-bold text-white uppercase text-sm border-b border-slate-700 pb-2">General Info</h4>
              <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none" placeholder="Quest Title" value={title} onChange={e => setTitle(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                 <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={region} onChange={e => setRegion(e.target.value as Region)}>
                    {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
                 </select>
                 <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs" value={prereqQuestId} onChange={e => setPrereqQuestId(e.target.value)}>
                    <option value="">-- No Prereq Quest --</option>
                    {allQuests.filter(q => q.id !== (quest?.id)).map(q => <option key={q.id} value={q.id}>Q{q.questNumber}: {q.title}</option>)}
                 </select>
              </div>
              <textarea className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white h-32 resize-none" placeholder="Quest Description / Overview..." value={desc} onChange={e => setDesc(e.target.value)} />

              <div className="bg-slate-800 p-4 rounded border border-slate-700 min-h-[200px]">
                 <h4 className="font-bold text-slate-400 uppercase text-xs mb-3">Steps ({steps.length})</h4>
                 <div className="space-y-2">
                    {steps.map((s, i) => (
                      <div key={i} className="flex justify-between items-center bg-slate-700 p-2 rounded cursor-pointer hover:bg-slate-600 transition-colors border border-transparent hover:border-blue-400" onClick={() => loadStepForEditing(i)}>
                         <div className="text-sm text-white font-medium truncate pr-2">{i+1}. {s.title}</div>
                         <button onClick={(e) => { e.stopPropagation(); setSteps(steps.filter((_, idx) => idx !== i)); if(editingStepIdx===i) clearStepForm(); }} className="text-red-400 hover:text-red-200 px-2">
                           &times;
                         </button>
                      </div>
                    ))}
                    {steps.length === 0 && <p className="text-slate-500 text-sm italic">No steps added yet.</p>}
                 </div>
                 <button onClick={clearStepForm} className="mt-4 text-xs text-blue-400 hover:text-blue-300 underline">+ Add New Step</button>
              </div>
           </div>

           <div className="bg-slate-950/50 p-5 rounded-lg border border-slate-700 flex flex-col">
              <h4 className="font-bold text-blue-400 uppercase text-sm mb-4 border-b border-slate-700 pb-2">
                 {editingStepIdx !== null ? `Editing Step ${editingStepIdx + 1}` : 'Add New Step'}
              </h4>
              
              <div className="space-y-4 flex-1">
                 <input className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Step Title" value={stepTitle} onChange={e => setStepTitle(e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                   <input className="bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Location" value={stepLoc} onChange={e => setStepLoc(e.target.value)} />
                   <input className="bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Reward Item (Optional)" value={stepRewardName} onChange={e => setStepRewardName(e.target.value)} />
                 </div>
                 <textarea className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white h-24 resize-none" placeholder="Step Details..." value={stepDesc} onChange={e => setStepDesc(e.target.value)} />
                 
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Primary NPC</label>
                        <select className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs text-white" value={stepChar} onChange={e => setStepChar(e.target.value)}>
                           <option value="">-- Related NPC --</option>
                           {allCharacters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Prereq Step</label>
                        <select className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs text-white" value={stepPrereq} onChange={e => setStepPrereq(e.target.value)}>
                           <option value="">-- Prereq Step --</option>
                           {steps.map((s, i) => <option key={s.id} value={s.id}>Current Step {i+1}</option>)}
                        </select>
                    </div>
                 </div>

                 {/* Secondary Character Selection */}
                 <div className="bg-slate-900 border border-slate-600 rounded p-2">
                    <label className="text-[10px] text-slate-400 block mb-1">Additional NPCs (If step involves multiple)</label>
                    <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                        {allCharacters.map(c => {
                             if (c.id === stepChar) return null;
                             const isSelected = stepSecondChars.includes(c.id);
                             return (
                                 <button 
                                    key={c.id} 
                                    onClick={() => toggleSecondaryChar(c.id)}
                                    className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${isSelected ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
                                 >
                                    {c.name}
                                 </button>
                             )
                        })}
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2 p-3 bg-slate-900 rounded border border-slate-700">
                    <select className="bg-slate-800 border border-slate-600 rounded p-1 text-xs text-white col-span-3 mb-2" value={stepDay} onChange={e => setStepDay(e.target.value as any)}>
                        <option value="All">Any Day / Multi-day</option>
                        <option value="1">Day 1 Only</option>
                        <option value="2">Day 2 Only</option>
                        <option value="3">Day 3 Only</option>
                    </select>
                    <div className="col-span-3 flex gap-2">
                       <div className="flex-1">
                         <label className="text-[9px] text-slate-400 block">Start Time</label>
                         <input type="time" className="w-full bg-slate-800 border border-slate-600 rounded p-1 text-xs text-white" value={stepTime} onChange={e => setStepTime(e.target.value)} />
                       </div>
                       <div className="flex-1">
                         <label className="text-[9px] text-slate-400 block">End Time</label>
                         <input type="time" className="w-full bg-slate-800 border border-slate-600 rounded p-1 text-xs text-white" value={stepEndTime} onChange={e => setStepEndTime(e.target.value)} />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                 {editingStepIdx !== null && <button onClick={clearStepForm} className="text-xs text-slate-400 underline">Cancel Edit</button>}
                 <button onClick={handleSaveStep} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm transition-colors">
                   {editingStepIdx !== null ? 'Update Step' : 'Add Step'}
                 </button>
              </div>
           </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
          <button onClick={handleSaveQuest} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-lg">Save Quest</button>
        </div>
      </div>
    </div>
  );
};
