
import React, { useState, useEffect } from 'react';
import { Character, Region, ScheduleEvent } from '../types';
import { formatDisplayTime } from '../data/helpers';

interface CharacterEditorModalProps {
  character?: Character;
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: Character, isNew: boolean) => void;
  onReset?: (charId: string) => void;
  allQuests: any[]; // Simplified type for dropdowns
}

export const CharacterEditorModal: React.FC<CharacterEditorModalProps> = ({
  character,
  isOpen,
  onClose,
  onSave,
  onReset,
  allQuests
}) => {
  // Basic Info
  const [name, setName] = useState('');
  const [region, setRegion] = useState<Region>(Region.ClockTown);
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');
  
  // Downtime Info
  const [defActivity, setDefActivity] = useState('');
  const [defLocation, setDefLocation] = useState('');

  // Schedule
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  
  // Event Form
  const [evtDay, setEvtDay] = useState<1|2|3|'All'>('All');
  const [evtStart, setEvtStart] = useState('06:00');
  const [evtEnd, setEvtEnd] = useState('18:00');
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDesc, setEvtDesc] = useState('');
  const [evtLoc, setEvtLoc] = useState('');
  const [condType, setCondType] = useState<'none'|'requires_step'|'requires_step_not'>('none');
  const [condStep, setCondStep] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (character) {
      setName(character.name);
      setRegion(character.locationRegion);
      setLocation(character.locationSpecific);
      setDesc(character.description);
      setDefActivity(character.defaultActivity || '');
      setDefLocation(character.defaultLocation || '');
      setEvents(character.scheduleEvents || []);
    } else {
      // Default for new
      setName('');
      setRegion(Region.ClockTown);
      setLocation('');
      setDesc('');
      setDefActivity('Resting');
      setDefLocation('');
      setEvents([]);
    }
    setError(null);
  }, [character, isOpen]);

  if (!isOpen) return null;

  const handleAddEvent = () => {
    setError(null);

    // Validation: Day 1 before 6am
    const [startH, startM] = evtStart.split(':').map(Number);
    const [endH, endM] = evtEnd.split(':').map(Number);

    if ((evtDay === 1 || evtDay === 'All') && startH < 6) {
      setError("Cannot schedule events before 6:00 AM on the First Day.");
      return;
    }

    // Validation: End before Start (Simple check, assumes same day)
    // Normalize for 24h cycle where 00:00-05:59 is "next day" effectively
    const normStart = startH < 6 ? startH + 24 : startH;
    const normEnd = endH < 6 ? endH + 24 : endH;

    if (normEnd * 60 + endM <= normStart * 60 + startM) {
      setError("End time must be after start time.");
      return;
    }

    const newEvent: ScheduleEvent = {
      day: evtDay,
      start: evtStart,
      end: evtEnd,
      title: evtTitle || 'Activity',
      description: evtDesc,
      location: evtLoc || location
    };

    if (condType !== 'none' && condStep) {
      newEvent.condition = { type: condType, stepId: condStep };
    }

    setEvents(prev => [...prev, newEvent].sort((a, b) => a.start.localeCompare(b.start)));
    
    // Reset form
    setEvtTitle('');
    setEvtDesc('');
    setCondType('none');
  };

  const handleRemoveEvent = (idx: number) => {
    setEvents(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!name) {
      setError("Name is required.");
      return;
    }

    const newChar: Character = {
      id: character ? character.id : `custom-char-${Date.now()}`,
      name,
      locationRegion: region,
      locationSpecific: location,
      description: desc,
      schedule: "Custom Schedule",
      defaultActivity: defActivity,
      defaultLocation: defLocation || location, // Fallback to main location if empty
      scheduleEvents: events,
      pages: "",
      quests: [],
      connections: [],
      wikiLink: "",
      icon: character?.icon || "/icons/Mask of Truth.png",
      isCustom: character ? character.isCustom : true,
      isEdited: true
    };

    onSave(newChar, !character);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-slate-900 border border-termina-accent rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">
            {character ? `Edit ${character.name}` : "Create New Character"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Name</label>
              <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-termina-accent outline-none" value={name} onChange={e => setName(e.target.value)} disabled={character && !character.isCustom} />
              {character && !character.isCustom && <p className="text-[10px] text-slate-500">Standard character names cannot be changed.</p>}
            </div>
            
            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Region</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={region} onChange={e => setRegion(e.target.value as Region)}>
                {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Specific Location</label>
              <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Stock Pot Inn" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Downtime Activity</label>
                  <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={defActivity} onChange={e => setDefActivity(e.target.value)} placeholder="e.g. Sleeping" />
               </div>
               <div>
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Downtime Location</label>
                  <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" value={defLocation} onChange={e => setDefLocation(e.target.value)} placeholder="Optional (Defaults to loc)" />
               </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Description</label>
              <textarea className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white h-24 resize-none" value={desc} onChange={e => setDesc(e.target.value)} />
            </div>
          </div>

          {/* Right: Schedule */}
          <div className="space-y-4 flex flex-col h-full">
             <div className="flex justify-between items-center">
                <h4 className="font-bold text-termina-gold uppercase text-sm">Schedule</h4>
                {character && !character.isCustom && character.isEdited && onReset && (
                  <button onClick={() => { if(confirm("Reset schedule to default?")) onReset(character.id); }} className="text-xs text-red-400 hover:underline">Reset Defaults</button>
                )}
             </div>
             
             <p className="text-[10px] text-slate-400 italic">Events added here override downtime. Gaps are filled by Downtime Activity.</p>

             <div className="bg-slate-800/50 p-4 rounded border border-slate-700 space-y-3">
                {error && <div className="text-red-400 text-xs bg-red-900/20 p-2 rounded border border-red-900">{error}</div>}
                
                <div className="grid grid-cols-3 gap-2">
                   <select className="bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white" value={evtDay} onChange={e => setEvtDay(e.target.value as any)}>
                     <option value="All">All Days</option>
                     <option value="1">Day 1</option>
                     <option value="2">Day 2</option>
                     <option value="3">Day 3</option>
                   </select>
                   <div className="relative">
                     <input type="time" className="w-full bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white" value={evtStart} onChange={e => setEvtStart(e.target.value)} />
                     <span className="text-[9px] text-slate-400 absolute right-0 -bottom-3">{formatDisplayTime(evtStart)}</span>
                   </div>
                   <div className="relative">
                     <input type="time" className="w-full bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white" value={evtEnd} onChange={e => setEvtEnd(e.target.value)} />
                     <span className="text-[9px] text-slate-400 absolute right-0 -bottom-3">{formatDisplayTime(evtEnd)}</span>
                   </div>
                </div>
                
                <input className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white mt-2" placeholder="Event Title (e.g. Eating Lunch)" value={evtTitle} onChange={e => setEvtTitle(e.target.value)} />
                <input className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white" placeholder="Location override (optional)" value={evtLoc} onChange={e => setEvtLoc(e.target.value)} />
                
                <div className="flex gap-2">
                  <select className="bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white flex-1" value={condType} onChange={e => setCondType(e.target.value as any)}>
                    <option value="none">No Condition</option>
                    <option value="requires_step">If Step Complete</option>
                    <option value="requires_step_not">If Step NOT Complete</option>
                  </select>
                  {condType !== 'none' && (
                    <select className="bg-slate-900 border border-slate-600 rounded p-1 text-xs text-white flex-1" value={condStep} onChange={e => setCondStep(e.target.value)}>
                       <option value="">Select Step...</option>
                       {allQuests.flatMap(q => q.steps.map((s: any, i: number) => <option key={s.id} value={s.id}>Q{q.questNumber}-{i+1}</option>))}
                    </select>
                  )}
                </div>

                <button onClick={handleAddEvent} className="w-full bg-slate-700 hover:bg-green-700 text-white font-bold py-1.5 rounded text-xs transition-colors border border-slate-600 hover:border-green-500">
                  + Add Event
                </button>
             </div>

             <div className="flex-1 overflow-y-auto space-y-2 min-h-[150px] bg-black/20 rounded p-2 border border-slate-800/50">
                {events.length === 0 && <p className="text-slate-500 text-center italic text-xs pt-4">No schedule events.</p>}
                {events.map((evt, i) => (
                  <div key={i} className="bg-slate-800 p-2 rounded border border-slate-700 flex justify-between items-start group">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-blue-900/30 text-blue-300 px-1 rounded">{evt.day === 'All' ? 'Daily' : `Day ${evt.day}`}</span>
                        <span className="text-[10px] font-mono text-slate-400">{formatDisplayTime(evt.start)} - {formatDisplayTime(evt.end)}</span>
                      </div>
                      <div className="font-bold text-slate-200 text-xs">{evt.title}</div>
                      <div className="text-[10px] text-slate-500">{evt.location}</div>
                    </div>
                    <button onClick={() => handleRemoveEvent(i)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      &times;
                    </button>
                  </div>
                ))}
             </div>
          </div>

        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 bg-termina-accent hover:bg-white text-black font-bold rounded shadow-lg transition-all transform hover:scale-105">
            Save Character
          </button>
        </div>
      </div>
    </div>
  );
};