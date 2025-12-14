
import React, { useState, useMemo } from 'react';
import { Character, Quest, ShopItem, Region, CustomContent, ScheduleEvent, QuestStep, CustomShop } from '../types';

interface EditorViewProps {
  allCharacters: Character[];
  customContent: CustomContent;
  setCustomContent: React.Dispatch<React.SetStateAction<CustomContent>>;
  addNotification: (msg: string, type: 'info' | 'shop' | 'timeline', action?: () => void) => void;
  allQuests: Quest[];
}

export const EditorView: React.FC<EditorViewProps> = ({
  allCharacters,
  customContent,
  setCustomContent,
  addNotification,
  allQuests
}) => {
  const [activeTab, setActiveTab] = useState<'characters' | 'quests' | 'shops'>('characters');

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className="bg-slate-900/80 p-6 rounded-lg border border-blue-500/50 shadow-lg">
        <h2 className="text-3xl font-serif font-bold text-blue-400 mb-2 flex items-center gap-3">
          <span>🛠️</span> World Editor
        </h2>
        <p className="text-slate-400 text-sm italic mb-6">
          "You've met with a terrible fate, haven't you? Perhaps you wish to change it."
        </p>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-700 mb-6">
          {['characters', 'quests', 'shops'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-t-lg transition-colors ${
                activeTab === tab 
                  ? 'bg-slate-800 text-white border-t border-x border-slate-600' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'characters' && <CharacterEditor allCharacters={allCharacters} customContent={customContent} setCustomContent={setCustomContent} addNotification={addNotification} allQuests={allQuests} />}
        {activeTab === 'quests' && <QuestEditor allCharacters={allCharacters} customContent={customContent} setCustomContent={setCustomContent} addNotification={addNotification} allQuests={allQuests} />}
        {activeTab === 'shops' && <ShopEditor customContent={customContent} setCustomContent={setCustomContent} addNotification={addNotification} allCharacters={allCharacters} allQuests={allQuests} />}
      </div>
    </div>
  );
};

const CharacterEditor: React.FC<EditorViewProps> = ({ allCharacters, customContent, setCustomContent, addNotification, allQuests }) => {
  const [selectedCharId, setSelectedCharId] = useState<string>('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  // New Character State
  const [newCharName, setNewCharName] = useState('');
  const [newCharRegion, setNewCharRegion] = useState<Region>(Region.ClockTown);
  const [newCharDesc, setNewCharDesc] = useState('');
  const [newCharLoc, setNewCharLoc] = useState('');

  // Schedule Editing State
  const [newEventDay, setNewEventDay] = useState<1|2|3|'All'>('All');
  const [newEventStart, setNewEventStart] = useState('06:00');
  const [newEventEnd, setNewEventEnd] = useState('18:00');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [newEventLoc, setNewEventLoc] = useState('');
  
  // Condition State
  const [condType, setCondType] = useState<'none' | 'requires_step' | 'requires_step_not'>('none');
  const [condStep, setCondStep] = useState('');

  const selectedChar = useMemo(() => allCharacters.find(c => c.id === selectedCharId), [allCharacters, selectedCharId]);

  const handleCreateChar = () => {
    if (!newCharName) return;
    const id = `custom-char-${Date.now()}`;
    const newChar: Character = {
      id,
      name: newCharName,
      locationRegion: newCharRegion,
      locationSpecific: newCharLoc,
      description: newCharDesc,
      schedule: "Custom Schedule",
      scheduleEvents: [],
      pages: "",
      quests: [],
      connections: [],
      wikiLink: "",
      icon: "/icons/Mask of Truth.png",
      isCustom: true
    };

    setCustomContent(prev => ({
      ...prev,
      characters: [...prev.characters, newChar]
    }));
    
    setIsCreatingNew(false);
    setSelectedCharId(id);
    setNewCharName('');
    setNewCharDesc('');
    addNotification("Character Created!", "info");
  };

  const handleResetCharacter = () => {
    if (!selectedChar || selectedChar.isCustom) return;
    setCustomContent(prev => {
      const newEdits = { ...prev.editedSchedules };
      delete newEdits[selectedChar.id];
      return { ...prev, editedSchedules: newEdits };
    });
    addNotification("Character Schedule Reset to Default.", "info");
  };

  const handleAddEvent = () => {
    if (!selectedChar || !newEventTitle) return;
    
    const event: ScheduleEvent = {
      day: newEventDay,
      start: newEventStart,
      end: newEventEnd,
      title: newEventTitle,
      description: newEventDesc,
      location: newEventLoc || selectedChar.locationSpecific
    };

    if (condType !== 'none' && condStep) {
      event.condition = { type: condType, stepId: condStep };
    }

    // If modifying an existing standard character, we need to copy their current events first if not already edited
    let currentEvents = [...selectedChar.scheduleEvents];
    
    const updatedEvents = [...currentEvents, event].sort((a,b) => a.start.localeCompare(b.start));

    if (selectedChar.isCustom) {
      // Update custom char directly
      setCustomContent(prev => ({
        ...prev,
        characters: prev.characters.map(c => c.id === selectedChar.id ? { ...c, scheduleEvents: updatedEvents } : c)
      }));
    } else {
      // Update editedSchedules map
      setCustomContent(prev => ({
        ...prev,
        editedSchedules: {
          ...prev.editedSchedules,
          [selectedChar.id]: updatedEvents
        }
      }));
    }

    setNewEventTitle('');
    setNewEventDesc('');
    setCondType('none');
    setCondStep('');
    addNotification("Schedule Updated!", "timeline");
  };

  const handleRemoveEvent = (index: number) => {
    if (!selectedChar) return;
    const updatedEvents = selectedChar.scheduleEvents.filter((_, i) => i !== index);

    if (selectedChar.isCustom) {
      setCustomContent(prev => ({
        ...prev,
        characters: prev.characters.map(c => c.id === selectedChar.id ? { ...c, scheduleEvents: updatedEvents } : c)
      }));
    } else {
      setCustomContent(prev => ({
        ...prev,
        editedSchedules: {
          ...prev.editedSchedules,
          [selectedChar.id]: updatedEvents
        }
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sidebar: Character List */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 h-[600px] flex flex-col">
        <button 
          onClick={() => { setIsCreatingNew(true); setSelectedCharId(''); }}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded mb-4 transition-colors"
        >
          + Create New Character
        </button>
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {allCharacters.map(char => (
            <div 
              key={char.id}
              onClick={() => { setSelectedCharId(char.id); setIsCreatingNew(false); }}
              className={`p-2 rounded cursor-pointer flex items-center gap-2 transition-colors ${
                selectedCharId === char.id ? 'bg-slate-700 border border-slate-500' : 'bg-slate-800 hover:bg-slate-700/50'
              }`}
            >
              <div className="text-lg">{char.isCustom ? '✨' : char.isEdited ? '✏️' : '👤'}</div>
              <div className="truncate text-sm font-medium text-slate-200">{char.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main: Editor */}
      <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-6 overflow-y-auto h-[600px] custom-scrollbar">
        {isCreatingNew ? (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Create New Character</h3>
            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Name</label>
              <input className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={newCharName} onChange={e => setNewCharName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Region</label>
              <select className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={newCharRegion} onChange={e => setNewCharRegion(e.target.value as Region)}>
                {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Location (Specific)</label>
              <input className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={newCharLoc} onChange={e => setNewCharLoc(e.target.value)} placeholder="e.g. Stock Pot Inn" />
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Description</label>
              <textarea className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white h-24" value={newCharDesc} onChange={e => setNewCharDesc(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsCreatingNew(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
              <button onClick={handleCreateChar} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold">Create</button>
            </div>
          </div>
        ) : selectedChar ? (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                   {selectedChar.name}
                   {selectedChar.isCustom && <span className="text-xs bg-blue-900 text-blue-200 px-2 py-0.5 rounded">Custom</span>}
                   {selectedChar.isEdited && <span className="text-xs bg-amber-900 text-amber-200 px-2 py-0.5 rounded">Edited</span>}
                </h3>
                <p className="text-slate-400 text-sm">{selectedChar.locationRegion} - {selectedChar.locationSpecific}</p>
              </div>
              {selectedChar.isEdited && !selectedChar.isCustom && (
                 <button onClick={handleResetCharacter} className="bg-red-900/50 text-red-200 hover:bg-red-800 px-3 py-1 rounded text-xs font-bold border border-red-700">
                   Reset Schedule
                 </button>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-blue-400 uppercase text-sm">Schedule Management</h4>
              
              {/* Add Event Form */}
              <div className="bg-slate-900/50 p-4 rounded border border-slate-600 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <select 
                    className="bg-slate-800 border border-slate-600 rounded p-1 text-sm text-white" 
                    value={newEventDay} 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewEventDay(e.target.value === 'All' ? 'All' : (Number(e.target.value) as 1|2|3))}
                  >
                    <option value="All">All Days</option>
                    <option value="1">Day 1</option>
                    <option value="2">Day 2</option>
                    <option value="3">Day 3</option>
                  </select>
                  <input type="time" className="bg-slate-800 border border-slate-600 rounded p-1 text-sm text-white" value={newEventStart} onChange={e => setNewEventStart(e.target.value)} />
                  <input type="time" className="bg-slate-800 border border-slate-600 rounded p-1 text-sm text-white" value={newEventEnd} onChange={e => setNewEventEnd(e.target.value)} />
                </div>
                <input className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Event Title (e.g. Eating Lunch)" value={newEventTitle} onChange={e => setNewEventTitle(e.target.value)} />
                <input className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Location (Optional override)" value={newEventLoc} onChange={e => setNewEventLoc(e.target.value)} />
                <textarea className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white h-16" placeholder="Description..." value={newEventDesc} onChange={e => setNewEventDesc(e.target.value)} />
                
                {/* Condition */}
                <div className="grid grid-cols-2 gap-2 bg-slate-800 p-2 rounded border border-slate-700">
                  <select className="bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white" value={condType} onChange={e => setCondType(e.target.value as any)}>
                    <option value="none">No Condition</option>
                    <option value="requires_step">Requires Step</option>
                    <option value="requires_step_not">Requires NOT Step</option>
                  </select>
                  {condType !== 'none' && (
                    <select className="bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white" value={condStep} onChange={e => setCondStep(e.target.value)}>
                      <option value="">Select Step...</option>
                      {allQuests.flatMap(q => q.steps.map((s, idx) => <option key={s.id} value={s.id}>Q{q.questNumber}-{idx+1}: {s.title}</option>))}
                    </select>
                  )}
                </div>

                <button onClick={handleAddEvent} className="w-full bg-green-700 hover:bg-green-600 text-white text-sm font-bold py-2 rounded">Add Schedule Event</button>
              </div>

              {/* Existing Events List */}
              <div className="space-y-2">
                {selectedChar.scheduleEvents.map((evt, idx) => (
                  <div key={idx} className="bg-slate-800 p-3 rounded border border-slate-700 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold bg-blue-900/50 text-blue-200 px-1.5 rounded">{evt.day === 'All' ? 'Days 1-3' : `Day ${evt.day}`}</span>
                        <span className="text-xs font-mono text-slate-400">{evt.start} - {evt.end}</span>
                      </div>
                      <div className="font-bold text-slate-200 text-sm">{evt.title}</div>
                      <div className="text-xs text-slate-500">{evt.location}</div>
                      {evt.condition && (
                         <div className="text-[10px] text-amber-400 mt-1 font-mono">
                           {evt.condition.type === 'requires_step' ? 'Req: ' : 'Not: '} {evt.condition.stepId}
                         </div>
                      )}
                    </div>
                    <button onClick={() => handleRemoveEvent(idx)} className="text-slate-500 hover:text-red-400 p-1">
                      &times;
                    </button>
                  </div>
                ))}
                 {selectedChar.scheduleEvents.length === 0 && <p className="text-slate-500 italic text-sm">No schedule events defined.</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 italic">
            Select a character to edit or create a new one.
          </div>
        )}
      </div>
    </div>
  );
};

const QuestEditor: React.FC<EditorViewProps> = ({ allCharacters, customContent, setCustomContent, addNotification, allQuests }) => {
  const [editModeId, setEditModeId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [region, setRegion] = useState<Region>(Region.ClockTown);
  const [desc, setDesc] = useState('');
  const [prereqQuestId, setPrereqQuestId] = useState('');
  
  // Step Builder State
  const [steps, setSteps] = useState<QuestStep[]>([]);
  const [stepTitle, setStepTitle] = useState('');
  const [stepDesc, setStepDesc] = useState('');
  const [stepLoc, setStepLoc] = useState('');
  const [stepChar, setStepChar] = useState('');
  const [stepDay, setStepDay] = useState<1|2|3|'All'>('All');
  const [stepTime, setStepTime] = useState('');
  const [stepEndTime, setStepEndTime] = useState('');
  const [stepPrereq, setStepPrereq] = useState<string>('');
  const [stepXp, setStepXp] = useState(100);
  const [stepRewardName, setStepRewardName] = useState('');
  
  const handleAddStep = () => {
    if (!stepTitle) return;
    
    const newStep: QuestStep = {
      id: `custom-step-${Date.now()}-${steps.length}`,
      title: stepTitle,
      description: stepDesc,
      location: stepLoc,
      characterId: stepChar || undefined,
      xpReward: stepXp,
      day: stepDay === 'All' ? undefined : stepDay,
      days: stepDay === 'All' ? [1, 2, 3] : undefined,
      time: stepTime || undefined,
      endTime: stepEndTime || undefined,
      prerequisiteStepId: stepPrereq || undefined,
      itemRewards: stepRewardName ? [{ name: stepRewardName, type: 'Item' }] : undefined
    };

    setSteps([...steps, newStep]);
    
    // Reset step inputs
    setStepTitle(''); setStepDesc(''); setStepLoc(''); setStepRewardName('');
  };

  const handleCreateOrUpdateQuest = () => {
    if (!title || steps.length === 0) return;
    
    if (editModeId) {
       // Update existing
       setCustomContent(prev => ({
         ...prev,
         quests: prev.quests.map(q => q.id === editModeId ? {
           ...q,
           title,
           region,
           description: desc,
           steps: steps,
           prerequisiteQuestId: prereqQuestId || undefined
         } : q)
       }));
       addNotification("Quest Updated!", "info");
       setEditModeId(null);
    } else {
       // Create new
       const nextQuestNum = 67 + customContent.quests.length;
       const newQuest: Quest = {
        id: `custom-quest-${Date.now()}`,
        questNumber: nextQuestNum,
        isCustom: true,
        title,
        region,
        description: desc,
        steps: steps,
        rewards: [],
        prerequisiteQuestId: prereqQuestId || undefined
      };
  
      setCustomContent(prev => ({
        ...prev,
        quests: [...prev.quests, newQuest]
      }));
      addNotification("Custom Quest Created!", "info");
    }

    resetForm();
  };

  const handleEditClick = (quest: Quest) => {
    setEditModeId(quest.id);
    setTitle(quest.title);
    setRegion(quest.region);
    setDesc(quest.description);
    setSteps(quest.steps);
    setPrereqQuestId(quest.prerequisiteQuestId || '');
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Delete this quest?")) {
      setCustomContent(prev => ({
        ...prev,
        quests: prev.quests.filter(q => q.id !== id)
      }));
      if (editModeId === id) resetForm();
    }
  };

  const resetForm = () => {
    setEditModeId(null);
    setTitle(''); setDesc(''); setSteps([]); setPrereqQuestId('');
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{editModeId ? 'Edit Quest' : 'Create Complex Quest'}</h3>
          {editModeId && <button onClick={resetForm} className="text-sm text-slate-400 hover:text-white">Cancel Edit</button>}
        </div>
        
        {/* Main Quest Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
           <div>
              <label className="block text-xs text-slate-400 uppercase font-bold mb-1">Quest Title</label>
              <input className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={title} onChange={e => setTitle(e.target.value)} />
           </div>
           <div>
              <label className="block text-xs text-slate-400 uppercase font-bold mb-1">Region</label>
              <select className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={region} onChange={e => setRegion(e.target.value as Region)}>
                  {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
               </select>
           </div>
           <div className="col-span-2">
              <label className="block text-xs text-slate-400 uppercase font-bold mb-1">Quest Overview</label>
              <textarea className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white h-20" value={desc} onChange={e => setDesc(e.target.value)} />
           </div>
           <div className="col-span-2">
             <label className="block text-xs text-slate-400 uppercase font-bold mb-1">Prerequisite Quest (Entire Quest must be complete)</label>
             <select className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={prereqQuestId} onChange={e => setPrereqQuestId(e.target.value)}>
                <option value="">-- None --</option>
                {allQuests.filter(q => q.id !== editModeId).map(q => <option key={q.id} value={q.id}>Quest {q.questNumber}: {q.title}</option>)}
             </select>
           </div>
        </div>

        {/* Step Builder */}
        <div className="bg-slate-900/50 p-4 rounded border border-slate-600 mb-6">
          <h4 className="font-bold text-blue-400 uppercase text-sm mb-4">Add Step</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input className="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Step Title" value={stepTitle} onChange={e => setStepTitle(e.target.value)} />
             <input className="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Location" value={stepLoc} onChange={e => setStepLoc(e.target.value)} />
             
             <div className="col-span-2">
               <textarea className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white h-16" placeholder="Step Description" value={stepDesc} onChange={e => setStepDesc(e.target.value)} />
             </div>

             <select className="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" value={stepChar} onChange={e => setStepChar(e.target.value)}>
                <option value="">-- Related Character --</option>
                {allCharacters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
             </select>
             
             <select className="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" value={stepPrereq} onChange={e => setStepPrereq(e.target.value)}>
                <option value="">-- Prerequisite Step --</option>
                {steps.map((s, i) => <option key={s.id} value={s.id}>Step {i+1}: {s.title}</option>)}
                {allQuests.flatMap(q => q.steps.map((s, i) => <option key={s.id} value={s.id}>Q{q.questNumber}-{i+1}: {s.title}</option>))}
             </select>

             <div className="flex gap-2">
               <select className="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" value={stepDay} onChange={e => setStepDay(e.target.value as any)}>
                  <option value="All">Any Day</option>
                  <option value="1">Day 1</option>
                  <option value="2">Day 2</option>
                  <option value="3">Day 3</option>
               </select>
               <input type="time" className="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" value={stepTime} onChange={e => setStepTime(e.target.value)} />
               <input type="time" className="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" value={stepEndTime} onChange={e => setStepEndTime(e.target.value)} />
             </div>

             <input className="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Reward Item Name (Optional)" value={stepRewardName} onChange={e => setStepRewardName(e.target.value)} />

             <button onClick={handleAddStep} className="col-span-2 bg-green-700 hover:bg-green-600 text-white font-bold py-2 rounded">Add Step to Quest</button>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-2 mb-6">
           {steps.map((s, i) => (
             <div key={s.id} className="bg-slate-700 p-3 rounded flex justify-between items-center">
                <div>
                   <span className="font-bold text-white mr-2">{i+1}. {s.title}</span>
                   <span className="text-xs text-slate-400">({s.days ? 'Days 1-3' : `Day ${s.day}`} {s.time || ''})</span>
                </div>
                <button onClick={() => setSteps(steps.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-white">&times;</button>
             </div>
           ))}
        </div>

        <button onClick={handleCreateOrUpdateQuest} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded text-lg">
          {editModeId ? 'Update Quest' : 'Finish & Create Quest'}
        </button>
      </div>

      {/* List of existing custom quests */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
         <h3 className="text-xl font-bold text-white mb-4">Existing Custom Quests</h3>
         {customContent.quests.map((q, i) => (
           <div key={q.id} className="p-3 bg-slate-900 border border-slate-600 rounded mb-2 flex justify-between items-center">
             <div>
                <div className="font-bold text-white">✨ Quest {q.questNumber}: {q.title}</div>
                <div className="text-xs text-slate-400">{q.region} • {q.steps.length} Steps</div>
             </div>
             <div className="flex gap-2">
                <button onClick={() => handleEditClick(q)} className="text-xs bg-blue-700 px-2 py-1 rounded hover:bg-blue-600 text-white">Edit</button>
                <button onClick={() => handleDeleteClick(q.id)} className="text-xs bg-red-700 px-2 py-1 rounded hover:bg-red-600 text-white">Delete</button>
             </div>
           </div>
         ))}
         {customContent.quests.length === 0 && <p className="text-slate-500 italic">No custom quests yet.</p>}
      </div>
    </div>
  );
};

const ShopEditor: React.FC<EditorViewProps> = ({ customContent, setCustomContent, addNotification, allCharacters }) => {
  const [editModeId, setEditModeId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [region, setRegion] = useState<Region>(Region.ClockTown);
  const [location, setLocation] = useState('');
  const [openTime, setOpenTime] = useState('08:00');
  const [closeTime, setCloseTime] = useState('20:00');
  const [desc, setDesc] = useState('');
  
  // Related People
  const [relatedPeople, setRelatedPeople] = useState<{characterId: string, role: string}[]>([]);
  const [newRelCharId, setNewRelCharId] = useState('');
  const [newRelRole, setNewRelRole] = useState('');

  const handleAddPerson = () => {
    if (newRelCharId && newRelRole) {
      setRelatedPeople([...relatedPeople, { characterId: newRelCharId, role: newRelRole }]);
      setNewRelCharId(''); setNewRelRole('');
    }
  };

  const handleRemovePerson = (idx: number) => {
    setRelatedPeople(relatedPeople.filter((_, i) => i !== idx));
  };

  const handleCreateOrUpdateShop = () => {
    if (!name) return;
    
    if (editModeId) {
       setCustomContent(prev => ({
         ...prev,
         customShops: prev.customShops.map(s => s.id === editModeId ? {
           ...s, name, region, location, openingTime: openTime, closingTime: closeTime, description: desc, relatedCharacters: relatedPeople
         } : s)
       }));
       addNotification("Shop Updated", "shop");
       setEditModeId(null);
    } else {
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
      setCustomContent(prev => ({ ...prev, customShops: [...prev.customShops, newShop] }));
      addNotification("Custom Shop Added", "shop");
    }
    resetForm();
  };

  const resetForm = () => {
    setName(''); setDesc(''); setLocation(''); setRelatedPeople([]); setEditModeId(null);
  };

  const handleEdit = (shop: CustomShop) => {
    setEditModeId(shop.id);
    setName(shop.name);
    setRegion(shop.region);
    setLocation(shop.location);
    setOpenTime(shop.openingTime);
    setCloseTime(shop.closingTime);
    setDesc(shop.description);
    setRelatedPeople(shop.relatedCharacters || []);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this shop?")) {
      setCustomContent(prev => ({ ...prev, customShops: prev.customShops.filter(s => s.id !== id) }));
      if (editModeId === id) resetForm();
    }
  };

  return (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xl font-bold text-white">{editModeId ? 'Edit Business' : 'Create Business Location'}</h3>
           {editModeId && <button onClick={resetForm} className="text-sm text-slate-400">Cancel</button>}
        </div>
        <div className="space-y-4">
           <input className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" placeholder="Business Name (e.g. Anju's Cafe)" value={name} onChange={e => setName(e.target.value)} />
           <select className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={region} onChange={e => setRegion(e.target.value as Region)}>
              {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
           </select>
           <input className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" placeholder="Location (e.g. East Clock Town)" value={location} onChange={e => setLocation(e.target.value)} />
           <div className="grid grid-cols-2 gap-2">
              <div>
                 <label className="text-xs text-slate-400">Opens</label>
                 <input type="time" className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={openTime} onChange={e => setOpenTime(e.target.value)} />
              </div>
              <div>
                 <label className="text-xs text-slate-400">Closes</label>
                 <input type="time" className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" value={closeTime} onChange={e => setCloseTime(e.target.value)} />
              </div>
           </div>
           <textarea className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white h-24" placeholder="Description..." value={desc} onChange={e => setDesc(e.target.value)} />
           
           {/* Related People */}
           <div className="bg-slate-900/50 p-2 rounded border border-slate-600">
             <label className="text-xs text-slate-400 font-bold">Related NPCs & Roles</label>
             <div className="flex gap-2 mt-2 mb-2">
                <select className="bg-slate-800 text-white text-xs p-1 rounded flex-1" value={newRelCharId} onChange={e => setNewRelCharId(e.target.value)}>
                  <option value="">Select Character...</option>
                  {allCharacters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input className="bg-slate-800 text-white text-xs p-1 rounded w-1/3" placeholder="Role (e.g. Owner)" value={newRelRole} onChange={e => setNewRelRole(e.target.value)} />
                <button onClick={handleAddPerson} className="bg-green-700 text-white px-2 rounded">+</button>
             </div>
             <div className="space-y-1">
                {relatedPeople.map((rp, i) => {
                  const char = allCharacters.find(c => c.id === rp.characterId);
                  return (
                    <div key={i} className="flex justify-between bg-slate-800 px-2 py-1 rounded text-xs">
                       <span className="text-white">{char?.name} <span className="text-slate-400">({rp.role})</span></span>
                       <button onClick={() => handleRemovePerson(i)} className="text-red-400">&times;</button>
                    </div>
                  );
                })}
             </div>
           </div>

           <button onClick={handleCreateOrUpdateShop} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded">
             {editModeId ? 'Update Business' : 'Add Business to Timeline'}
           </button>
        </div>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 overflow-y-auto max-h-[500px]">
         <h3 className="text-xl font-bold text-white mb-4">Custom Businesses</h3>
         {customContent.customShops.map((shop, i) => (
           <div key={i} className="p-3 bg-slate-900 border border-slate-600 rounded mb-2 flex justify-between items-start">
             <div>
               <div className="font-bold text-emerald-400">✨ {shop.name}</div>
               <div className="text-xs text-slate-400">{shop.region} • {shop.openingTime} - {shop.closingTime}</div>
               <div className="text-xs text-slate-500 mt-1">{shop.description}</div>
             </div>
             <div className="flex gap-2">
                <button onClick={() => handleEdit(shop)} className="text-xs bg-blue-700 px-2 py-1 rounded text-white">Edit</button>
                <button onClick={() => handleDelete(shop.id)} className="text-xs bg-red-700 px-2 py-1 rounded text-white">Delete</button>
             </div>
           </div>
         ))}
         {customContent.customShops.length === 0 && <p className="text-slate-500 italic">No custom shops added.</p>}
      </div>
    </div>
  );
};
