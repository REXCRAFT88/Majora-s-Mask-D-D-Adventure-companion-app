
import React, { useState, useEffect, useRef } from 'react';
import { GlobalState } from '../types';

interface TimeCalculatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  addNotification: (msg: string, type: 'info', action?: () => void) => void;
  onAddDistance?: (miles: number) => void;
}

export const TimeCalculatorPanel: React.FC<TimeCalculatorPanelProps> = ({
  isOpen,
  onClose,
  globalState,
  setGlobalState,
  addNotification,
  onAddDistance
}) => {
  
  // --- HELPERS ---
  const addMinutes = (minutesToAdd: number) => {
    setGlobalState(prev => {
      let newTotal = prev.totalMinutes + minutesToAdd;
      
      // Calculate Day based on 1440 minutes per day
      let newDay = Math.floor(newTotal / 1440) + 1;
      
      // Cap at Day 3 end or loop? Default app logic handles 1,2,3.
      if (newDay > 3) {
        // Soft cap for visual day, total minutes keeps going for "End of World" check
        newDay = 3; 
      }
      
      // Time of day is cyclic 0-1440
      let newTimeOfDay = newTotal % 1440;

      return {
        ...prev,
        currentDay: newDay as 1 | 2 | 3,
        timeOfDayMinutes: newTimeOfDay,
        totalMinutes: newTotal
      };
    });
    addNotification(`Added ${minutesToAdd} minutes to clock.`, 'info');
  };

  // --- STOPWATCH STATE ---
  const [stopwatchTime, setStopwatchTime] = useState(0); // in ms
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const stopwatchRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isStopwatchRunning) {
      lastTimeRef.current = Date.now();
      stopwatchRef.current = window.setInterval(() => {
        const now = Date.now();
        const delta = now - lastTimeRef.current;
        setStopwatchTime(prev => prev + delta);
        lastTimeRef.current = now;
      }, 100);
    } else {
      if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    }
    return () => {
      if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    };
  }, [isStopwatchRunning]);

  const handleStopwatchAdd = () => {
    const minutes = Math.ceil(stopwatchTime / 60000);
    if (minutes > 0) {
      addMinutes(minutes);
      setStopwatchTime(0);
      setIsStopwatchRunning(false);
    }
  };

  const formatStopwatch = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- TRAVEL STATE ---
  const [travelDistance, setTravelDistance] = useState(1);
  const [travelPace, setTravelPace] = useState<'slow' | 'normal' | 'fast'>('normal');

  const calculateTravelTime = () => {
    const feet = travelDistance * 5280;
    let minutes = 0;
    switch (travelPace) {
      case 'slow': minutes = feet / 200; break;
      case 'normal': minutes = feet / 300; break;
      case 'fast': minutes = feet / 400; break;
    }
    return Math.ceil(minutes);
  };

  const handleTravel = () => {
    const time = calculateTravelTime();
    addMinutes(time);
    if (onAddDistance) {
      onAddDistance(travelDistance);
    }
  };

  const estMinutes = calculateTravelTime();
  const travelTimeDisplay = estMinutes >= 60 
    ? `${Math.floor(estMinutes / 60)}h ${estMinutes % 60}m` 
    : `${estMinutes} min`;

  return (
    <div 
      className={`fixed top-20 left-0 bottom-0 z-40 bg-slate-900 border-r-2 border-termina-accent shadow-2xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
        isOpen ? 'w-full md:w-80 translate-x-0' : 'w-0 -translate-x-full opacity-0'
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-700 flex justify-between items-center shrink-0 min-w-0">
        <h3 className="font-serif font-bold text-termina-gold text-lg truncate">Time Calculator</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white shrink-0 ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 w-full">
        
        {/* Quick Advance */}
        <section>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">Quick Advance</h4>
          <div className="grid grid-cols-3 gap-2">
            {[5, 15, 30].map(m => (
              <button 
                key={m} 
                onClick={() => addMinutes(m)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded text-xs font-bold border border-slate-600 transition-colors"
              >
                +{m}m
              </button>
            ))}
            <button onClick={() => addMinutes(60)} className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded text-xs font-bold border border-slate-600 transition-colors">+1 Hr</button>
            <button onClick={() => addMinutes(360)} className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded text-xs font-bold border border-slate-600 transition-colors">+6 Hrs</button>
          </div>
        </section>

        {/* Activity */}
        <section>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">Resting</h4>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => addMinutes(60)}
              className="bg-purple-900/30 hover:bg-purple-900/50 text-purple-200 py-3 rounded border border-purple-700/50 transition-colors flex flex-col items-center"
            >
              <span className="text-sm font-bold">Short Rest</span>
              <span className="text-[10px] opacity-70">+1 Hour</span>
            </button>
            <button 
              onClick={() => addMinutes(480)}
              className="bg-purple-900/30 hover:bg-purple-900/50 text-purple-200 py-3 rounded border border-purple-700/50 transition-colors flex flex-col items-center"
            >
              <span className="text-sm font-bold">Long Rest</span>
              <span className="text-[10px] opacity-70">+8 Hours</span>
            </button>
          </div>
        </section>

        {/* Stopwatch */}
        <section>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">Activity Timer</h4>
          <div className="bg-slate-800 rounded-lg p-4 text-center border border-slate-700">
            <div className="text-4xl font-mono text-termina-gold mb-4 tracking-wider">
              {formatStopwatch(stopwatchTime)}
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {!isStopwatchRunning ? (
                <button 
                  onClick={() => setIsStopwatchRunning(true)}
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Start
                </button>
              ) : (
                <button 
                  onClick={() => setIsStopwatchRunning(false)}
                  className="bg-red-700 hover:bg-red-600 text-white px-4 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Stop
                </button>
              )}
              <button 
                onClick={() => { setIsStopwatchRunning(false); setStopwatchTime(0); }}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Reset
              </button>
            </div>
            <button 
              onClick={handleStopwatchAdd}
              disabled={stopwatchTime < 60000} // Minimum 1 minute
              className="w-full bg-slate-700 hover:bg-termina-accent hover:text-black text-slate-300 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Clock
            </button>
          </div>
        </section>

        {/* Travel */}
        <section>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">Travel Calculator</h4>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Distance</span>
                <span className="text-white font-mono">{travelDistance} miles</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="10" 
                step="0.1"
                value={travelDistance}
                onChange={(e) => setTravelDistance(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-termina-accent"
              />
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-2">Pace</p>
              <div className="flex rounded bg-slate-900/50 p-1 gap-1">
                {(['slow', 'normal', 'fast'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setTravelPace(p)}
                    className={`flex-1 py-1 text-[10px] font-bold uppercase rounded transition-colors ${
                      travelPace === p ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {p} ({(p === 'slow' ? 200 : p === 'normal' ? 300 : 400)})
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-400">Est. Time</span>
                <span className="text-lg font-mono text-termina-gold">
                  {travelTimeDisplay}
                </span>
              </div>
              <button 
                onClick={handleTravel}
                className="w-full bg-slate-700 hover:bg-termina-accent hover:text-black text-slate-300 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Travel
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
