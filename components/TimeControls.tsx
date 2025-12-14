
import React from 'react';
import { GlobalState } from '../types';

interface TimeControlsProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  onCycleReset?: () => void;
  isTrackerMode: boolean;
  setIsTrackerMode: (active: boolean) => void;
  onSkipDay?: () => void;
}

export const TimeControls: React.FC<TimeControlsProps> = ({ 
  globalState, 
  setGlobalState, 
  onCycleReset,
  isTrackerMode,
  setIsTrackerMode,
  onSkipDay
}) => {
  
  // Format minutes (0-1440) into 6am-6am clock time
  const formatDisplayTime = (minutes: number) => {
    // Base time is 6:00 AM
    const absoluteMinutes = minutes + (6 * 60); 
    let hour = Math.floor(absoluteMinutes / 60) % 24;
    const minute = absoluteMinutes % 60;
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 || 12;
    
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(e.target.value);
    
    // In Tracker Mode, prevent going backward in time
    if (isTrackerMode && mins < globalState.timeOfDayMinutes) {
      return; 
    }

    setGlobalState(prev => ({
      ...prev,
      timeOfDayMinutes: mins,
      totalMinutes: ((prev.currentDay - 1) * 1440) + mins
    }));
  };

  const handleDayChange = (day: 1 | 2 | 3) => {
    setGlobalState(prev => ({
      ...prev,
      currentDay: day,
      totalMinutes: ((day - 1) * 1440) + prev.timeOfDayMinutes
    }));
  };

  return (
    <div className="bg-slate-900/95 border-b border-purple-500 p-3 fixed top-0 left-0 w-full z-50 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-3 backdrop-blur-sm h-auto md:h-20">
      
      {/* Left: Current Time Display */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
        <div className="text-center md:text-left">
          <div className="text-xs text-purple-400 font-bold uppercase tracking-widest flex items-center gap-2">
             <span>Current Time</span>
             {isTrackerMode && <span className="text-[10px] text-red-500 animate-pulse">● TRACKING</span>}
          </div>
          <div className="text-2xl font-bold font-serif text-termina-gold tracking-wider drop-shadow-md min-w-[140px]">
            {formatDisplayTime(globalState.timeOfDayMinutes)}
          </div>
        </div>
        
        {/* Day Selectors */}
        {!isTrackerMode ? (
          <div className="flex bg-slate-800 rounded-lg p-1 gap-1">
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                onClick={() => handleDayChange(day as 1|2|3)}
                className={`px-4 py-1 rounded font-bold text-sm transition-all ${
                  globalState.currentDay === day 
                    ? 'bg-termina-accent text-black shadow-lg' 
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Day {day}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2">
             <div className="px-4 py-1 rounded font-bold text-sm bg-termina-accent text-black shadow-lg">
               Day {globalState.currentDay}
             </div>
             {onSkipDay && (
               <button 
                 onClick={onSkipDay}
                 className="px-2 py-1 rounded border border-slate-600 text-slate-400 text-xs hover:bg-slate-700 hover:text-white transition-colors"
                 title="Skip to next day"
               >
                 ⏩ Skip
               </button>
             )}
          </div>
        )}
      </div>

      {/* Center: Time Slider */}
      <div className="flex-1 w-full px-4 relative group">
        <input
          type="range"
          min="0"
          max="1440"
          step="15"
          value={globalState.timeOfDayMinutes}
          onChange={handleSliderChange}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isTrackerMode ? 'bg-red-900/40 accent-red-500' : 'bg-slate-700 accent-termina-accent'}`}
        />
        
        {/* Notches for hours */}
        <div className="absolute top-3 left-4 right-4 flex justify-between pointer-events-none opacity-50 text-[9px] text-slate-500 font-mono">
          <span>6am</span>
          <span>12pm</span>
          <span>6pm</span>
          <span>12am</span>
          <span>6am</span>
        </div>
        
        {/* Hover tip */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {isTrackerMode ? "Drag forward to advance time (Backward disabled)" : "Drag to change time"}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Cycle Reset Button */}
        {onCycleReset && (
          <button
            onClick={onCycleReset}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-termina-gold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors text-xs font-bold uppercase tracking-wider group"
            title="Reset to Day 1 (Song of Time)"
          >
            <span className="text-lg group-hover:-rotate-180 transition-transform duration-500">↺</span>
            <span className="hidden sm:inline">Reset Cycle</span>
          </button>
        )}

        {/* Tracker Toggle */}
        <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
          <span className={`text-[10px] font-bold uppercase ${isTrackerMode ? 'text-white' : 'text-slate-500'}`}>Tracker</span>
          <button 
            onClick={() => setIsTrackerMode(!isTrackerMode)}
            className={`w-10 h-5 rounded-full relative transition-colors ${isTrackerMode ? 'bg-red-600' : 'bg-slate-600'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isTrackerMode ? 'left-6' : 'left-1'}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
};
