
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { EventCategory, Region, GlobalState, MasterTimelineEvent, Character, Quest } from '../types';
import { generateTimelineEvents } from '../data/helpers';
import { manualEvents } from '../data/timeline';
import { quests as defaultQuests } from '../data/quests';
import { characters as defaultCharacters } from '../data/characters';

interface TimelineViewProps {
  onEventClick: (type: 'character' | 'quest', id: string) => void;
  globalState: GlobalState;
  selectedEventId?: string | null;
  events?: MasterTimelineEvent[];
  allQuests?: Quest[];
  allCharacters?: Character[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onEventClick, globalState, selectedEventId, events, allQuests, allCharacters }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [fitToScreen, setFitToScreen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [showUnavailable, setShowUnavailable] = useState(false);
  
  // Region Filter State (Default to Clock Town)
  const regions = Object.values(Region).filter(r => r !== Region.World);
  const [activeRegion, setActiveRegion] = useState<Region>(Region.ClockTown);

  // Use events from props if available (dynamic), otherwise generate defaults
  const displayEvents = useMemo(() => {
      if (events && events.length > 0) return events;
      return generateTimelineEvents(manualEvents, defaultCharacters, defaultQuests, []);
  }, [events]);

  const displayCharacters = allCharacters || defaultCharacters;
  const displayQuests = allQuests || defaultQuests;

  // Monitor container width for responsive "Fit"
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Constants
  const effectiveZoom = useMemo(() => {
    if (fitToScreen && containerWidth > 0) {
      const w = containerWidth - 50; // 50px buffer
      const totalMinutes = (3 * 24 * 60) + (4 * 60); // 3 days + buffer hours
      return w / totalMinutes;
    }
    return zoomLevel;
  }, [zoomLevel, fitToScreen, containerWidth]);

  const PIXELS_PER_MINUTE = 1.0 * effectiveZoom; 
  const HOUR_WIDTH = 60 * PIXELS_PER_MINUTE;
  const DAY_WIDTH = 24 * HOUR_WIDTH;
  const TOTAL_WIDTH = (DAY_WIDTH * 3) + (4 * HOUR_WIDTH); 

  // Auto-scroll to current time on mount
  useEffect(() => {
    if (containerRef.current && !fitToScreen && !selectedEventId) {
      const cursorX = globalState.totalMinutes * PIXELS_PER_MINUTE;
      const w = containerRef.current.clientWidth;
      containerRef.current.scrollLeft = Math.max(0, cursorX - (w / 2) + 150);
    }
  }, [globalState.totalMinutes, fitToScreen, selectedEventId]); 

  // Auto-scroll and Switch Region to Selected Event only when selection CHANGES
  const prevSelectedEventIdRef = useRef<string | null | undefined>(null);
  
  useEffect(() => {
    // Check if selectedEventId actually changed
    if (selectedEventId && selectedEventId !== prevSelectedEventIdRef.current) {
      const evt = displayEvents.find(e => e.id === selectedEventId);
      if (evt && evt.region !== activeRegion) {
        setActiveRegion(evt.region);
      }

      setTimeout(() => {
         if (!containerRef.current) return;
         const el = document.getElementById(`timeline-event-${selectedEventId}`);
         if (el) {
           el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
           el.classList.add('ring-4', 'ring-white', 'scale-110', 'z-50');
           setTimeout(() => el.classList.remove('ring-4', 'ring-white', 'scale-110', 'z-50'), 2000);
         }
      }, 100);
    }
    prevSelectedEventIdRef.current = selectedEventId;
    // Remove 'displayEvents' from dependency to prevent re-runs on data refresh affecting region state unexpectedly
  }, [selectedEventId]); 

  const checkAvailability = (event: MasterTimelineEvent) => {
    // Check Dependencies
    if (event.condition) {
      const isStepCompleted = globalState.completedSteps.includes(event.condition.stepId);
      if (event.condition.type === 'requires_step' && !isStepCompleted) return false;
      if (event.condition.type === 'requires_step_not' && isStepCompleted) return false;
    }

    // Check Quest Prerequisites (Whole Quest)
    if (event.category === 'Main Quest' || event.category === 'Side Quest') {
       // Find the quest this event belongs to
       const quest = displayQuests.find(q => q.id === event.relatedId);
       if (quest && quest.prerequisiteQuestId) {
          const prereqQ = displayQuests.find(q => q.id === quest.prerequisiteQuestId);
          if (prereqQ && !prereqQ.steps.every(s => globalState.completedSteps.includes(s.id))) {
             // Prerequisite quest not complete
             return false;
          }
       }
    }

    return true;
  };

  // Filter Events logic
  const filteredEvents = useMemo(() => {
    return displayEvents.filter(event => {
      // 1. Filter by Region
      if (event.region !== activeRegion) return false;

      // 2. Availability Check
      const isAvailable = checkAvailability(event);
      if (!showUnavailable && !isAvailable) return false;

      return true;
    });
  }, [globalState.completedSteps, activeRegion, displayEvents, displayQuests, showUnavailable]);

  // Group events by swimlane key
  const processedLanes = useMemo(() => {
    const groups: Record<string, { event: MasterTimelineEvent, stackIndex: number, isAvailable: boolean }[]> = {};
    
    const addToLane = (key: string, event: MasterTimelineEvent, isAvailable: boolean) => {
       if (!groups[key]) groups[key] = [];
       groups[key].push({ event, stackIndex: 0, isAvailable });
    };

    filteredEvents.forEach(event => {
       let laneNames: string[] = [];
       const isAvailable = checkAvailability(event);

       if (event.category === 'Business') {
         laneNames.push("Shops & Services");
       } else if (event.category === 'NPC Schedule') {
         // Logic for NPC Schedule (usually relatedId is charId)
         const char = displayCharacters.find(c => c.id === event.relatedId);
         laneNames.push(char ? char.name : (event.relatedId || "Unknown NPC"));
       } else if ((event.category === 'Main Quest' || event.category === 'Side Quest') && event.relatedId) {
          // Logic for Quests: Check if it pertains to specific characters
          // event.id format is generated as: `${quest.id}-step-${index}-d${day}`
          // event.relatedId is quest.id
          
          // Safer parsing: Remove the prefix (questId) to find the rest
          if (event.id.startsWith(event.relatedId)) {
             const suffix = event.id.substring(event.relatedId.length); 
             // suffix looks like "-step-0-d1" or similar.
             // We need to extract the step index.
             const match = suffix.match(/-step-(\d+)-d/);
             
             if (match && match[1]) {
                const stepIndex = parseInt(match[1], 10);
                const quest = displayQuests.find(q => q.id === event.relatedId);
                
                if (quest && quest.steps[stepIndex]) {
                   const step = quest.steps[stepIndex];
                   const charIds = new Set<string>();
                   if (step.characterId) charIds.add(step.characterId);
                   if (step.secondaryCharacterIds) step.secondaryCharacterIds.forEach(id => charIds.add(id));
                   
                   const validChars = displayCharacters.filter(c => charIds.has(c.id));
                   
                   // Requirement: If 1 or 2 characters, show in their rows. If more, stay in area/general.
                   if (validChars.length > 0 && validChars.length <= 2) {
                      validChars.forEach(c => laneNames.push(c.name));
                   } else {
                      laneNames.push("Area Quests");
                   }
                } else {
                   laneNames.push("Area Quests");
                }
             } else {
                laneNames.push("Area Quests");
             }
          } else {
             laneNames.push("Area Quests");
          }
       } else {
          laneNames.push("Area Quests"); // World events, etc.
       }

       // Add event to all determined lanes
       laneNames.forEach(name => addToLane(name, event, isAvailable));
    });

    Object.keys(groups).forEach(key => {
       const laneEvents = groups[key];
       laneEvents.sort((a, b) => a.event.sortTime - b.event.sortTime);
       
       const rowEndTimes: number[] = []; 
       laneEvents.forEach(item => {
          const start = item.event.sortTime;
          const duration = item.event.endTime ? (item.event.endTime - start) : 60;
          const end = start + duration + 15; 
          
          let rowIndex = 0;
          while (rowEndTimes[rowIndex] > start) {
            rowIndex++;
          }
          rowEndTimes[rowIndex] = end;
          item.stackIndex = rowIndex;
       });
    });

    return groups;
  }, [filteredEvents, displayCharacters, displayQuests, globalState.completedSteps]);

  const swimlanes = useMemo(() => {
     const keys = Object.keys(processedLanes);
     return keys.sort((a, b) => {
       if (a === "Shops & Services") return -1;
       if (b === "Shops & Services") return 1;
       if (a === "Area Quests") return 1;
       if (b === "Area Quests") return -1;
       return a.localeCompare(b);
     });
  }, [processedLanes]);

  const laneHeights = useMemo(() => {
    return swimlanes.map(laneKey => {
      const items = processedLanes[laneKey];
      const maxStack = items.reduce((max, item) => Math.max(max, item.stackIndex), 0);
      return Math.max(64, (maxStack + 1) * 32 + 24);
    });
  }, [swimlanes, processedLanes]);

  const totalSwimlaneHeight = laneHeights.reduce((a, b) => a + b, 0);
  const totalContainerHeight = Math.max(600, totalSwimlaneHeight + 48);

  const handleScroll = () => {
    if (containerRef.current && sidebarRef.current) {
      sidebarRef.current.scrollTop = containerRef.current.scrollTop;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const getCategoryColor = (cat: EventCategory, isDowntime?: boolean) => {
    if (isDowntime) return 'bg-slate-800/80 border-slate-700/50 text-slate-500';
    
    switch(cat) {
      case 'Main Quest': return 'bg-red-600 border-red-400';
      case 'Side Quest': return 'bg-purple-600 border-purple-400';
      case 'NPC Schedule': return 'bg-blue-600 border-blue-400';
      case 'Business': return 'bg-emerald-600 border-emerald-400';
      case 'World Event': return 'bg-yellow-600 border-yellow-400 text-white';
      default: return 'bg-slate-600 border-slate-400';
    }
  };

  const cursorPosition = globalState.totalMinutes * PIXELS_PER_MINUTE;

  const getHourLabel = (hourIndex: number) => {
    const absoluteHour = (hourIndex + 6) % 24;
    const ampm = absoluteHour >= 12 ? 'pm' : 'am';
    const display = absoluteHour % 12 || 12;
    return `${display}${ampm}`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden select-none shadow-2xl">
      <div className="bg-slate-900 border-b border-slate-700 z-20">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-termina-gold font-serif">Timeline</h2>
            <div className="flex gap-2 items-center bg-slate-800 rounded px-2 py-1 border border-slate-700">
              <button onClick={() => { setZoomLevel(Math.max(0.5, zoomLevel - 0.1)); setFitToScreen(false); }} className="px-2 text-slate-400 hover:text-white font-bold">-</button>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Zoom</span>
              <button onClick={() => { setZoomLevel(Math.min(2, zoomLevel + 0.1)); setFitToScreen(false); }} className="px-2 text-slate-400 hover:text-white font-bold">+</button>
              <div className="w-px h-4 bg-slate-700 mx-1"></div>
              <button 
                onClick={() => setFitToScreen(!fitToScreen)} 
                className={`px-2 text-[10px] uppercase font-bold transition-colors rounded ${fitToScreen ? 'bg-termina-accent text-black' : 'text-slate-400 hover:text-white'}`}
              >
                Fit
              </button>
              <div className="w-px h-4 bg-slate-700 mx-1"></div>
              <button 
                onClick={() => setShowUnavailable(!showUnavailable)} 
                className={`px-2 text-[10px] uppercase font-bold transition-colors rounded flex items-center gap-1 ${showUnavailable ? 'bg-purple-900/50 text-purple-200 border border-purple-500' : 'text-slate-400 hover:text-white border border-transparent'}`}
                title="Toggle hidden/unavailable events"
              >
                {showUnavailable ? 'Hide Hidden' : 'Show Hidden'}
              </button>
            </div>
          </div>
          
          <div className="flex overflow-x-auto max-w-full gap-1 pb-1 scrollbar-hide">
             {regions.map((region) => (
               <button
                 key={region}
                 onClick={() => setActiveRegion(region)}
                 className={`px-3 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                   activeRegion === region
                     ? 'text-termina-accent border-termina-accent bg-slate-800/50'
                     : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800/30'
                 }`}
               >
                 {region}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div ref={sidebarRef} className="w-40 bg-slate-900 border-r border-slate-700 z-10 shrink-0 h-full overflow-hidden shadow-[4px_0_10px_rgba(0,0,0,0.3)]">
          <div className="relative" style={{ height: `${totalContainerHeight}px` }}>
            <div className="h-12 bg-slate-900 border-b border-slate-700 sticky top-0 z-30"></div>

            <div className="absolute top-12 left-0 right-0">
              {swimlanes.map((laneKey, i) => {
                const height = laneHeights[i];
                const isShop = laneKey === "Shops & Services";
                const isQuest = laneKey === "Area Quests";

                return (
                  <div 
                    key={laneKey} 
                    className={`border-b border-slate-700 flex items-center px-3 text-xs font-bold transition-colors ${
                      isShop ? 'bg-emerald-900/20 text-emerald-200 border-emerald-900/30' : 
                      isQuest ? 'bg-purple-900/20 text-purple-200 border-purple-900/30' : 
                      'text-slate-300 bg-slate-800/50'
                    }`} 
                    style={{ height: `${height}px` }}
                    title={laneKey}
                  >
                    <span className="line-clamp-2">{laneKey}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="flex-1 overflow-auto relative cursor-grab active:cursor-grabbing bg-[#151019]"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div style={{ width: `${TOTAL_WIDTH}px`, height: `${totalContainerHeight}px` }} className="relative min-h-full">
            
            <div className="absolute top-0 bottom-0 left-0 right-0 z-0">
               <div className="h-12 border-b border-slate-700 flex bg-slate-900/95 sticky top-0 z-20 shadow-sm">
                {[1, 2, 3].map(day => (
                  <div key={day} className="relative h-full border-r border-slate-600" style={{ width: `${DAY_WIDTH}px` }}>
                     <div className="absolute top-0 left-0 right-0 h-5 bg-slate-800 flex items-center px-3 border-b border-slate-700">
                       <span className="font-serif font-bold text-termina-gold text-xs tracking-widest">DAY {day}</span>
                     </div>
                     {Array.from({length: 24}).map((_, h) => (
                       <div key={h} className={`absolute bottom-0 h-7 border-l ${h%6===0 ? 'border-slate-500' : 'border-slate-700'} text-[9px] text-slate-500 pl-1.5 pt-1`} style={{ left: `${h * HOUR_WIDTH}px`}}>
                         {getHourLabel(h)}
                       </div>
                     ))}
                  </div>
                ))}
              </div>

              <div className="absolute top-12 bottom-0 left-0 right-0 pointer-events-none">
                 {[1, 2, 3].map((day, dIdx) => (
                   <div key={day} className="absolute top-0 bottom-0 border-r border-slate-600" style={{ left: `${dIdx * DAY_WIDTH}px`, width: `${DAY_WIDTH}px` }}>
                     {Array.from({ length: 24 }).map((_, h) => (
                        <div key={h} className={`absolute top-0 bottom-0 border-l ${h%24===0 ? 'border-transparent' : h%6===0 ? 'border-slate-700/60' : 'border-slate-800/40'} ${h%24===0 ? 'w-0.5 bg-slate-600/10' : ''}`} style={{ left: `${h * HOUR_WIDTH}px` }}></div>
                     ))}
                   </div>
                 ))}
              </div>
            </div>

            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 shadow-[0_0_15px_rgba(239,68,68,0.8)] pointer-events-none transition-all duration-300"
              style={{ left: `${cursorPosition}px` }}
            >
              <div className="sticky top-10 left-0 -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md z-40 whitespace-nowrap uppercase tracking-wider border border-red-400 w-max">
                Current Time
              </div>
            </div>

            <div className="absolute top-12 left-0 right-0">
              {swimlanes.map((laneKey, i) => {
                 const items = processedLanes[laneKey] || [];
                 const height = laneHeights[i];

                 return (
                   <div key={laneKey} className="border-b border-slate-700/30 relative group/lane hover:bg-white/[0.01] transition-colors" style={{ height: `${height}px` }}>
                     {items.map(({ event, stackIndex, isAvailable }) => {
                       const left = event.sortTime * PIXELS_PER_MINUTE;
                       const width = event.endTime ? (event.endTime - event.sortTime) * PIXELS_PER_MINUTE : 100;
                       const top = 12 + (stackIndex * 32);
                       const isSelected = selectedEventId === event.id;

                       return (
                         <div
                           key={`${event.id}-${laneKey}`} // Use composite key because one event might be in multiple lanes now
                           id={`timeline-event-${event.id}`}
                           onClick={(e) => { e.stopPropagation(); onEventClick('quest', event.id); }}
                           className={`absolute h-7 px-2 rounded shadow-sm border flex items-center gap-2 text-[10px] cursor-pointer transition-all overflow-hidden ring-1 
                             ${getCategoryColor(event.category, event.isDowntime)}
                             ${isSelected ? 'ring-white scale-105 shadow-xl z-50' : 'ring-white/10 hover:z-50 hover:scale-105 hover:shadow-lg'}
                             ${!isAvailable && !event.isDowntime ? 'opacity-80 grayscale border-dashed border-slate-500' : ''}
                           `}
                           style={{ left: `${left}px`, top: `${top}px`, width: `${width}px`, minWidth: '80px' }}
                           title={`${event.timeDisplay} - ${event.title}${!isAvailable ? ' (Unavailable)' : ''}`}
                         >
                           {!event.isDowntime && <span className="font-mono opacity-75 shrink-0 border-r border-white/20 pr-1.5 mr-0.5">{event.timeDisplay}</span>}
                           <span className="font-bold truncate">{event.title}</span>
                         </div>
                       );
                     })}
                   </div>
                 );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
