/// <reference path="./global.d.ts" />
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { characters as defaultCharacters, quests as defaultQuests, shopItems as defaultShopItems } from './data';
import { manualEvents } from './data/timeline'; // Import manual events separately
import { generateTimelineEvents } from './data/helpers'; // Import generation logic
import { Character, Region, GlobalState, Quest, GameHistory, SaveFile, QuestStep, CustomContent, CustomShop } from './types';
import { CharacterCard } from './components/CharacterCard';
import { CharacterModal } from './components/CharacterModal';
import { QuestlinesView } from './components/QuestlinesView';
import { TimelineView } from './components/TimelineView';
import { TimeControls } from './components/TimeControls';
import { CuriosityShopView } from './components/CuriosityShopView';
import { AvailableActivitiesView } from './components/AvailableActivitiesView';
import { TimelineDetailPanel } from './components/TimelineDetailPanel';
import { NotificationSystem, Notification } from './components/NotificationSystem';
import { PdfViewerPanel } from './components/PdfViewerPanel';
import { WikiViewerPanel } from './components/WikiViewerPanel';
import { TrackerView } from './components/TrackerView';
import { TimeCalculatorPanel } from './components/TimeCalculatorPanel';
import { GAME_START_OFFSET, formatDisplayTime } from './data';

// Modals
import { CharacterEditorModal } from './components/CharacterEditorModal';
import { ShopEditorModal } from './components/ShopEditorModal';
import { QuestEditorModal } from './components/QuestEditorModal';

type View = 'characters' | 'questlines' | 'timeline' | 'shop' | 'activities' | 'tracker';

const App: React.FC = () => {
  // === Core UI State ===
  const [currentView, setCurrentView] = useState<View>('characters');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedTimelineEventId, setSelectedTimelineEventId] = useState<string | null>(null);
  const [highlightedQuestId, setHighlightedQuestId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isTrackerMode, setIsTrackerMode] = useState(false); // Added back
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  // === App Data States (with initial default values) ===
  const [customContent, setCustomContent] = useState<CustomContent>({
    characters: [],
    editedSchedules: {},
    quests: [],
    customShops: []
  });


  const [globalState, setGlobalState] = useState<GlobalState>({
    currentDay: 1,
    timeOfDayMinutes: 0,
    totalMinutes: GAME_START_OFFSET, // Day 1, 6:00 AM
    completedSteps: [],
    cycleDistance: 0,
    dayDistance: 0,
    dayXp: 0,
    dayCompletedSteps: []
  });

  const [gameHistory, setGameHistory] = useState<GameHistory>({
    totalPlayTimeSeconds: 0,
    cyclesCompleted: 0, 
    stepCompletionCounts: {},
    purchasedItems: [],
    questLog: [],
    totalDistanceTravelled: 0
  });

  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPdfPages, setNumPdfPages] = useState<number | null>(null);
  const [pdfPanelWidth, setPdfPanelWidth] = useState(800);

  // Wiki Viewer State
  const [isWikiOpen, setIsWikiOpen] = useState(false);
  const [wikiUrl, setWikiUrl] = useState<string | null>(null);
  const [wikiTitle, setWikiTitle] = useState<string>("");

  // Time Calculator State
  const [isTimeCalcOpen, setIsTimeCalcOpen] = useState(false);

  // Editor Modals State
  const [isCharEditorOpen, setIsCharEditorOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | undefined>(undefined);
  const [isShopEditorOpen, setIsShopEditorOpen] = useState(false);
  const [isQuestEditorOpen, setIsQuestEditorOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | undefined>(undefined);

  // Reset Confirmation State
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showCycleResetConfirm, setShowCycleResetConfirm] = useState(false);

  // === Persistence Loading Effect ===
  useEffect(() => {
    const loadAppData = async () => {
      // Load PDF Path
      const savedPdfPath = await window.electronStore.get('lastPdfPath');
      const defaultPath = "/public/Majora's Mask Adventure Book.pdf";
      if (savedPdfPath) {
        setPdfUrl(savedPdfPath);
      } else {
        setPdfUrl(defaultPath);
        // await window.electronStore.set('lastPdfPath', defaultPath); // Removed to prevent writing default path on every load
      }

      // Load Global State
      const savedGlobalState = await window.electronStore.get('globalState');
      if (savedGlobalState) {
        setGlobalState(savedGlobalState);
      }

      // Load Game History
      const savedGameHistory = await window.electronStore.get('gameHistory');
      if (savedGameHistory) {
        setGameHistory(savedGameHistory);
      }

      // Load Custom Content
      const savedCustomContent = await window.electronStore.get('customContent');
      if (savedCustomContent) {
        setCustomContent(savedCustomContent);
      }
    };
    loadAppData();
  }, []); // Run only once on mount

  // === Persistence Saving Effect ===
  useEffect(() => {
    const handleBeforeUnload = async () => {
      // Save all relevant states
      await window.electronStore.set('globalState', globalState);
      await window.electronStore.set('gameHistory', gameHistory);
      await window.electronStore.set('customContent', customContent);
      // PDF path is saved immediately when changed by handlePdfPathChange
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [globalState, gameHistory, customContent]); // Re-run when these states change

  // === Other Effects and Callbacks ===
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Playtime Tracker - Only runs when Tracker Mode is ON
  useEffect(() => {
    let timer: any;
    if (isTrackerMode) {
      timer = setInterval(() => {
        setGameHistory(prev => ({
          ...prev,
          totalPlayTimeSeconds: prev.totalPlayTimeSeconds + 1
        }));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTrackerMode]);

  // Day Transition Logic
  const [dawnModal, setDawnModal] = useState<{show: boolean, day: number} | null>(null);
  const [endOfWorldTriggered, setEndOfWorldTriggered] = useState(false);

  useEffect(() => {
    if (!isTrackerMode) return;

    // Day 1 End -> Day 2 Start (1440 mins)
    if (globalState.totalMinutes === 1440 && globalState.currentDay === 1) {
      setDawnModal({ show: true, day: 2 });
      setIsTrackerMode(false); // Pause tracking while modal is up
    }
    // Day 2 End -> Day 3 Start (2880 mins)
    else if (globalState.totalMinutes === 2880 && globalState.currentDay === 2) {
      setDawnModal({ show: true, day: 3 });
      setIsTrackerMode(false);
    }
    // Day 3 End -> Moonfall (4320 mins)
    else if (globalState.totalMinutes >= 4320 && !endOfWorldTriggered) {
      setEndOfWorldTriggered(true);
      setIsTrackerMode(false);
    }
  }, [globalState.totalMinutes, globalState.currentDay, isTrackerMode, endOfWorldTriggered]);

  // --- DATA MERGING LOGIC ---
  const allCharacters = useMemo(() => {
    // 1. Start with default characters
    let merged = defaultCharacters.map(char => {
      // Apply edited schedules if present
      if (customContent.editedSchedules[char.id]) {
        return { 
          ...char, 
          scheduleEvents: customContent.editedSchedules[char.id],
          isEdited: true 
        };
      }
      return char;
    });
    // 2. Add custom characters
    return [...merged, ...customContent.characters];
  }, [customContent.editedSchedules, customContent.characters]);

  const allQuests = useMemo(() => {
    return [...defaultQuests, ...customContent.quests];
  }, [customContent.quests]);

  const timelineEvents = useMemo(() => {
    // Pass custom shops to the generator
    // Generate includes filling gaps now
    return generateTimelineEvents(manualEvents, allCharacters, allQuests, customContent.customShops);
  }, [allCharacters, allQuests, customContent.customShops]);

  const advanceDay = (newDay: number) => {
    setGlobalState(prev => ({
      ...prev,
      currentDay: newDay as 1 | 2 | 3,
      timeOfDayMinutes: 0, // 6 AM
      totalMinutes: (newDay - 1) * 1440,
      // Reset Daily Stats
      dayDistance: 0,
      dayXp: 0,
      dayCompletedSteps: []
    }));
    setDawnModal(null);
    setIsTrackerMode(true); // Resume tracking
    addNotification(`Dawn of the ${newDay === 2 ? 'Second' : 'Final'} Day`, 'info');
  };

  const handleSkipToNextDay = () => {
    if (globalState.currentDay === 3) {
      // Skip to end of world
      setGlobalState(prev => ({
        ...prev,
        timeOfDayMinutes: 1440,
        totalMinutes: 4320
      }));
    } else {
      const nextDay = globalState.currentDay + 1;
      setDawnModal({ show: true, day: nextDay });
    }
  };

  const addNotification = (message: string, type: 'shop' | 'timeline' | 'info', action?: () => void) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type, action }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // --- QUEST LOGIC ---

  const handleToggleStep = (questId: string, stepId: string) => {
    const quest = allQuests.find(q => q.id === questId);
    if (!quest) return;
    const step = quest.steps.find(s => s.id === stepId);
    if (!step) return;

    setGlobalState(prev => {
      const isAlreadyCompleted = prev.completedSteps.includes(stepId);
      let newCompletedSteps = [...prev.completedSteps];
      let newDayCompletedSteps = [...prev.dayCompletedSteps];
      let newDayXp = prev.dayXp;
      
      if (isAlreadyCompleted) {
        // Undo completion
        newCompletedSteps = newCompletedSteps.filter(id => id !== stepId);
        newDayCompletedSteps = newDayCompletedSteps.filter(id => id !== stepId);
        // Only remove XP if it was earned TODAY (simplification: if in dayCompletedSteps)
        if (prev.dayCompletedSteps.includes(stepId)) {
          newDayXp = Math.max(0, newDayXp - step.xpReward);
        }
      } else {
        // Complete step
        newCompletedSteps.push(stepId);
        newDayCompletedSteps.push(stepId);
        newDayXp += step.xpReward;
        
        // --- Notifications ---
        addNotification(`Step Complete: ${step.title}`, 'info');

        if (step.curiosityShopUnlock) {
          addNotification(`${step.curiosityShopUnlock.itemName} available in Shop!`, 'shop');
        }

        // Timeline Event Unlock detection
        const unlockedEvents = timelineEvents.filter(e => 
          e.condition?.type === 'requires_step' && e.condition.stepId === stepId
        );
        if (unlockedEvents.length > 0) {
           const primaryEvent = unlockedEvents[0];
           addNotification(`Timeline Updated: "${primaryEvent.title}" unlocked on Day ${primaryEvent.day}.`, 'timeline', () => {
             handleNavigate('timeline', primaryEvent.id);
           });
        }
      }

      // Check for Full Quest Completion
      const allStepsDone = quest.steps.every(s => newCompletedSteps.includes(s.id));
      
      if (allStepsDone && !isAlreadyCompleted) {
        const currentCycleNum = gameHistory.cyclesCompleted + 1;
        const alreadyLogged = gameHistory.questLog.some(l => l.questId === questId && l.cycle === currentCycleNum);
        
        if (!alreadyLogged) {
          const absMin = prev.timeOfDayMinutes + (6 * 60);
          const hh = Math.floor(absMin / 60) % 24;
          const mm = absMin % 60;
          const fmtTime = `${hh}:${mm.toString().padStart(2,'0')}`;

          const completionRecord = {
            questId: questId,
            cycle: currentCycleNum,
            day: prev.currentDay,
            timeString: `Day ${prev.currentDay}, ${formatDisplayTime(fmtTime)}`,
            timestamp: prev.totalMinutes
          };

          setGameHistory(history => ({
             ...history,
             questLog: [...history.questLog, completionRecord]
          }));

          addNotification(`Quest Completed: ${quest.title}`, 'info');
        }
      }

      return {
        ...prev,
        completedSteps: newCompletedSteps,
        dayCompletedSteps: newDayCompletedSteps,
        dayXp: newDayXp
      };
    });
  };

  // --- TRAVEL LOGIC ---
  const handleAddDistance = (miles: number) => {
    setGlobalState(prev => ({
      ...prev,
      cycleDistance: prev.cycleDistance + miles,
      dayDistance: prev.dayDistance + miles
    }));
    setGameHistory(prev => ({
      ...prev,
      totalDistanceTravelled: prev.totalDistanceTravelled + miles
    }));
  };

  // --- EDITOR HANDLERS ---
  const handleSaveCharacter = (char: Character, isNew: boolean) => {
    if (isNew) {
      setCustomContent(prev => ({ ...prev, characters: [...prev.characters, char] }));
      addNotification("Character Created!", "info");
    } else {
       if (char.isCustom) {
         setCustomContent(prev => ({
           ...prev,
           characters: prev.characters.map(c => c.id === char.id ? char : c)
         }));
       } else {
         // Editing existing -> update editedSchedules
         setCustomContent(prev => ({
           ...prev,
           editedSchedules: { ...prev.editedSchedules, [char.id]: char.scheduleEvents }
         }));
       }
       addNotification("Character Schedule Updated!", "timeline");
    }
  };

  const handleResetCharacterSchedule = (charId: string) => {
     setCustomContent(prev => {
        const newEdits = {...prev.editedSchedules};
        delete newEdits[charId];
        return { ...prev, editedSchedules: newEdits };
     });
     addNotification("Character Schedule Reset to Default.", "info");
  };

  const handleSaveShop = (shop: CustomShop) => {
    setCustomContent(prev => ({ ...prev, customShops: [...prev.customShops, shop] }));
    addNotification("Custom Shop Added!", "shop");
  };

  const handleSaveQuest = (quest: Quest) => {
    // Check if existing to update, else add
    setCustomContent(prev => {
      const exists = prev.quests.some(q => q.id === quest.id);
      return {
        ...prev,
        quests: exists ? prev.quests.map(q => q.id === quest.id ? quest : q) : [...prev.quests, quest]
      };
    });
    addNotification(quest.isCustom ? "Custom Quest Updated!" : "Custom Quest Created!", "info");
  };

  const handleEditQuest = (quest: Quest) => {
    setEditingQuest(quest);
    setIsQuestEditorOpen(true);
  }


  // --- SAVE / LOAD / RESET LOGIC ---

  const executeCycleReset = () => {
    // 1. Archive current steps into history counts and distances
    setGameHistory(prev => {
      const newCounts = { ...prev.stepCompletionCounts };
      globalState.completedSteps.forEach(stepId => {
        newCounts[stepId] = (newCounts[stepId] || 0) + 1;
      });
      return {
        ...prev,
        cyclesCompleted: prev.cyclesCompleted + 1,
        stepCompletionCounts: newCounts,
        // Distance is already accumulated in handleAddDistance, no need to add again
      };
    });

    // 2. Reset Current State
    setGlobalState({
      currentDay: 1,
      timeOfDayMinutes: 0,
      totalMinutes: GAME_START_OFFSET,
      completedSteps: [],
      cycleDistance: 0,
      dayDistance: 0,
      dayXp: 0,
      dayCompletedSteps: []
    });

    setEndOfWorldTriggered(false);
    setDawnModal(null);
    setShowCycleResetConfirm(false);
    // Force Tracker Mode ON for next cycle
    setIsTrackerMode(true); 
    addNotification(`Cycle ${gameHistory.cyclesCompleted + 2} Begun. Dawn of the First Day.`, 'info');
  };

  const handleNewGame = () => {
    setShowResetConfirm(true);
  };

  const executeReset = () => {
    setGlobalState({
      currentDay: 1,
      timeOfDayMinutes: 0,
      totalMinutes: GAME_START_OFFSET,
      completedSteps: [],
      cycleDistance: 0,
      dayDistance: 0,
      dayXp: 0,
      dayCompletedSteps: []
    });
    setGameHistory({
      totalPlayTimeSeconds: 0,
      cyclesCompleted: 0,
      stepCompletionCounts: {},
      purchasedItems: [],
      questLog: [],
      totalDistanceTravelled: 0
    });
    setCustomContent({
      characters: [],
      editedSchedules: {},
      quests: [],
      customShops: []
    });
    setEndOfWorldTriggered(false);
    setDawnModal(null);
    setIsTrackerMode(false);
    setShowResetConfirm(false);
    addNotification("New Game Started. Notebook and Editor Data cleared.", 'info');
  };

  const handleSaveGame = () => {
    const saveData: SaveFile = {
      version: 3, 
      timestamp: Date.now(),
      state: globalState,
      history: gameHistory,
      customContent: customContent // Save custom content
    };
    
    const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `termina-save-cycle${gameHistory.cyclesCompleted}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification("Notebook Saved.", "info");
  };

  const handleLoadGame = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.state && json.history) {
          // Merge with default state to handle version upgrades (missing fields)
          setGlobalState(prev => ({ ...prev, ...json.state }));
          setGameHistory(prev => ({ ...prev, ...json.history }));
          if (json.customContent) {
            setCustomContent(json.customContent);
          }
          addNotification("Notebook Loaded.", "info");
        } else {
          alert("Invalid save file format.");
        }
      } catch (err) {
        alert("Failed to parse save file.");
      }
    };
    reader.readAsText(file);
  };

  // --- VIEW HANDLERS ---

  const handleOpenPdf = (page: string | number) => {
    const pageNum = typeof page === 'string' ? parseInt(page, 10) : page;
    if (!isNaN(pageNum)) {
      setPdfPage(pageNum);
      setIsPdfOpen(true);
      setIsWikiOpen(false); // Close wiki if PDF opens
    }
  };

  const handleOpenWiki = (url: string, title?: string) => {
    setWikiUrl(url);
    setWikiTitle(title || "Wiki");
    setIsWikiOpen(true);
    setIsPdfOpen(false); // Close PDF if Wiki opens
  };

  const handlePdfPathChange = async (filePath: string | null) => {
    setPdfUrl(filePath);
    if (filePath) { // Only save if a file path was actually selected
      await window.electronStore.set('lastPdfPath', filePath);
    }
  };

  // Filter out Region.World for the Character View
  const filteredCharacters = useMemo(() => {
    return allCharacters.filter(c => {
      const matchesRegion = selectedRegion === 'All' || c.locationRegion === selectedRegion;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery, allCharacters]);

  // Remove Region.World from the list of regions to display
  const regions = ['All', ...Object.values(Region).filter(r => r !== Region.World)];

  const handleNavigateToCharacter = (charId: string) => {
    const char = allCharacters.find(c => c.id === charId);
    if (char) {
      // If we want to open edit modal: setEditingCharacter(char); setIsCharEditorOpen(true);
      // Default behavior: Select character to view details
      setSelectedCharacter(char);
    }
  };

  const handleEditCharacter = (char: Character) => {
    setEditingCharacter(char);
    setIsCharEditorOpen(true);
  };

  const handleTimelineEventClick = (type: 'character' | 'quest', id: string) => {
    setSelectedTimelineEventId(id);
  };

  const handleNavigate = (view: View, id?: string) => {
    setCurrentView(view);
    if (view === 'timeline' && id) {
      setSelectedTimelineEventId(id);
    }
    if (view === 'questlines' && id) {
      setHighlightedQuestId(id);
    }
  };

  const selectedTimelineEvent = selectedTimelineEventId 
    ? timelineEvents.find(e => e.id === selectedTimelineEventId) 
    : null;

  // Layout calculations for "push" effect
  const isWideView = currentView === 'timeline';
  const layoutWidthClass = isWideView ? "max-w-[98%] mx-auto" : "max-w-7xl mx-auto";
  
  // Calculate margins to push content based on open panels, ONLY if screen is large enough
  // Using the dynamic pdfPanelWidth instead of fixed 800px
  const mainStyle = isLargeScreen ? {
    marginLeft: isTimeCalcOpen ? '320px' : '0',
    marginRight: isPdfOpen || isWikiOpen ? `${pdfPanelWidth}px` : '0',
    transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1)'
  } : {};

  return (
    <div className="min-h-screen flex flex-col bg-termina-dark text-termina-light font-sans relative overflow-x-hidden">
      {/* Fixed UI Elements */}
      <NotificationSystem notifications={notifications} removeNotification={removeNotification} />
      <TimeControls 
        globalState={globalState} 
        setGlobalState={setGlobalState} 
        onCycleReset={() => setShowCycleResetConfirm(true)}
        isTrackerMode={isTrackerMode}
        setIsTrackerMode={setIsTrackerMode}
        onSkipDay={handleSkipToNextDay}
      />

      {/* Dawn Transition Modal */}
      {dawnModal && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center animate-fade-in p-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Dawn of the {dawnModal.day === 2 ? 'Second' : 'Final'} Day
            </h1>
            <p className="text-2xl text-slate-400 font-mono">
              - {dawnModal.day === 2 ? '48' : '24'} Hours Remain -
            </p>
            <button 
              onClick={() => advanceDay(dawnModal.day)}
              className="mt-8 px-8 py-3 bg-white text-black font-bold text-xl rounded hover:scale-105 transition-transform"
            >
              Begin Day {dawnModal.day}
            </button>
          </div>
        </div>
      )}

      {/* End of World Modal */}
      {endOfWorldTriggered && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-red-950/20 border-2 border-red-500 rounded-xl max-w-lg w-full p-8 text-center shadow-[0_0_50px_rgba(239,68,68,0.5)]">
            <h1 className="text-4xl font-bold font-serif text-red-500 mb-4 tracking-widest uppercase">Dawn of a New Day</h1>
            <p className="text-xl text-red-200 mb-8 leading-relaxed">
              You've met with a terrible fate, haven't you? <br/>
              The moon has fallen. The cycle must restart.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={executeCycleReset}
                className="bg-red-600 hover:bg-red-500 text-black font-bold text-lg px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                Reset Cycle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal (Cycle Reset) */}
      {showCycleResetConfirm && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowCycleResetConfirm(false)}>
          <div className="bg-slate-900 border-2 border-termina-accent rounded-xl max-w-md w-full p-6 text-center shadow-[0_0_50px_rgba(216,180,254,0.3)]" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold font-serif text-termina-accent mb-4 uppercase tracking-widest">↺ Reset Cycle?</h2>
            <p className="text-slate-300 mb-8">
              Return to the Dawn of the First Day?<br/>
              <span className="text-sm text-slate-500">Current progress will be saved to history. Note that <strong>in-progress quests</strong> will be restarted.</span>
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setShowCycleResetConfirm(false)}
                className="px-6 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold rounded border border-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeCycleReset}
                className="px-6 py-2 bg-termina-accent hover:bg-white text-black font-bold rounded shadow-lg transition-colors"
              >
                Yes, Play Song of Time
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hard Reset Confirmation Modal (Wipe Data) */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowResetConfirm(false)}>
          <div className="bg-slate-900 border-2 border-red-500 rounded-xl max-w-md w-full p-6 text-center shadow-[0_0_50px_rgba(239,68,68,0.3)]" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold font-serif text-red-500 mb-4 uppercase tracking-widest">⚠️ Reset Notebook?</h2>
            <p className="text-slate-300 mb-8">
              Are you sure? This will wipe <strong>ALL</strong> history, collected items, progress, and custom editor content. This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="px-6 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold rounded border border-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeReset}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-lg border border-red-400 transition-colors"
              >
                Yes, Wipe Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div 
        className="flex-1 flex flex-col pt-20"
        style={mainStyle}
      >
        <header className="bg-slate-900 border-b border-purple-900 p-4 shadow-lg sticky top-20 z-20">
          <div className={`${layoutWidthClass} flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300`}>
            
            <nav className="flex gap-2 bg-slate-800/50 p-1 rounded-lg overflow-x-auto max-w-full scrollbar-hide">
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
              `}</style>
              {(['characters', 'questlines', 'activities', 'timeline', 'shop', 'tracker'] as View[]).map((view) => (
                <button
                  key={view}
                  onClick={() => { setCurrentView(view); setSelectedTimelineEventId(null); setHighlightedQuestId(null); }}
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all uppercase tracking-wide whitespace-nowrap ${
                    currentView === view 
                      ? 'bg-termina-accent text-black shadow-[0_0_10px_rgba(216,180,254,0.5)]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {view === 'shop' ? 'Curiosity Shop' : view === 'activities' ? 'Activities' : view === 'tracker' ? 'Notebook' : view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4 w-full md:w-auto">
              
              <button
                onClick={() => { setIsTimeCalcOpen(!isTimeCalcOpen); setIsWikiOpen(false); }}
                className={`px-3 py-2 rounded border border-slate-600 text-xs uppercase font-bold tracking-wider transition-colors ${
                  isTimeCalcOpen ? 'bg-termina-accent text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Time Calc
              </button>

              <button
                onClick={() => { setIsPdfOpen(!isPdfOpen); setIsWikiOpen(false); }}
                className={`px-3 py-2 rounded border border-slate-600 text-xs uppercase font-bold tracking-wider transition-colors ${
                  isPdfOpen ? 'bg-termina-accent text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {isPdfOpen ? 'Close PDF' : 'Open Book'}
              </button>
            </div>
          </div>
        </header>

        <main className={`flex-1 w-full p-6 ${layoutWidthClass} transition-all duration-300`}>
          {currentView === 'characters' && (
            <>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                 {/* Creator Buttons */}
                 <div className="flex gap-2">
                   <button 
                     onClick={() => { setEditingCharacter(undefined); setIsCharEditorOpen(true); }}
                     className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded font-bold text-xs shadow-lg transition-colors flex items-center gap-2 uppercase tracking-wide"
                   >
                      <span>+</span> Create Character
                   </button>
                   <button 
                     onClick={() => setIsShopEditorOpen(true)}
                     className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded font-bold text-xs shadow-lg transition-colors flex items-center gap-2 uppercase tracking-wide"
                   >
                      <span>+</span> Create Shop
                   </button>
                 </div>

                 {/* Character Search */}
                 <div className="relative w-full md:w-96">
                    <input 
                      type="text" 
                      placeholder="Search characters..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-termina-accent w-full placeholder-slate-600 text-sm shadow-inner"
                    />
                    <span className="absolute right-3 top-2 text-slate-600 text-sm">🔍</span>
                 </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedRegion === region 
                        ? 'bg-termina-accent text-black shadow-[0_0_15px_rgba(216,180,254,0.4)]' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCharacters.map(char => (
                  <div key={char.id} className="relative group">
                    <CharacterCard 
                      character={char} 
                      onClick={(c) => handleNavigateToCharacter(c.id)}
                      allQuests={allQuests} 
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditCharacter(char); }}
                      className="absolute top-3 right-3 z-10 bg-slate-900/80 text-slate-400 p-1.5 rounded-full hover:text-white hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100 border border-slate-600"
                      title="Edit Character"
                    >
                      ✏️
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {currentView === 'questlines' && (
            <>
              <QuestlinesView 
                onCharacterClick={handleNavigateToCharacter} 
                globalState={globalState}
                setGlobalState={setGlobalState}
                onToggleStep={handleToggleStep}
                addNotification={addNotification}
                onOpenPdf={handleOpenPdf}
                onNavigate={handleNavigate}
                gameHistory={gameHistory}
                highlightedQuestId={highlightedQuestId}
                allQuests={allQuests}
                onCreateQuest={() => { setEditingQuest(undefined); setIsQuestEditorOpen(true); }}
                onEditQuest={handleEditQuest}
              />
            </>
          )}

          {currentView === 'activities' && (
            <AvailableActivitiesView 
              globalState={globalState}
              setGlobalState={setGlobalState}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              onToggleStep={handleToggleStep}
              onCharacterClick={handleNavigateToCharacter}
              onNavigate={handleNavigate}
              addNotification={addNotification}
              onOpenPdf={handleOpenPdf}
              gameHistory={gameHistory}
              allQuests={allQuests} // Passed down correctly
              timelineEvents={timelineEvents} // Passed down dynamic events
              allCharacters={allCharacters} // Passed down dynamic characters
            />
          )}

          {currentView === 'timeline' && (
            <div className="h-[calc(100vh-14rem)] flex flex-row gap-4 relative">
              {/* Left Panel: Inspector */}
              {selectedTimelineEvent && (
                <div className="w-[400px] h-full bg-slate-900 border-r border-slate-700 shrink-0 animate-fade-in flex flex-col">
                  <TimelineDetailPanel 
                    event={selectedTimelineEvent}
                    globalState={globalState}
                    setGlobalState={setGlobalState}
                    onToggleStep={handleToggleStep} 
                    onCharacterClick={handleNavigateToCharacter}
                    onClose={() => setSelectedTimelineEventId(null)}
                    addNotification={addNotification}
                    onOpenPdf={handleOpenPdf}
                    allCharacters={allCharacters}
                    customShops={customContent.customShops}
                    allQuests={allQuests} // Pass allQuests to resolve IDs
                  />
                </div>
              )}
              
              <div className={`flex-1 overflow-hidden transition-all duration-300`}>
                <TimelineView 
                  onEventClick={handleTimelineEventClick} 
                  globalState={globalState}
                  selectedEventId={selectedTimelineEventId}
                  events={timelineEvents}
                  allQuests={allQuests}
                  allCharacters={allCharacters}
                />
              </div>
            </div>
          )}

          {currentView === 'shop' && (
            <CuriosityShopView 
              globalState={globalState} 
              gameHistory={gameHistory}
              setGameHistory={setGameHistory}
              addNotification={addNotification}
              onOpenWiki={handleOpenWiki}
            />
          )}

          {currentView === 'tracker' && (
             <TrackerView 
               globalState={globalState}
               gameHistory={gameHistory}
               onSave={handleSaveGame}
               onLoad={handleLoadGame}
               onNewGame={handleNewGame}
               allQuests={allQuests} // Pass allQuests
             />
          )}

        </main>

        <footer className="bg-slate-900 border-t border-slate-800 p-6 text-center text-slate-500 text-xs uppercase tracking-widest mt-auto">
          <p>Data derived from Majora's Mask D&D Module. Assets © Nintendo.</p>
        </footer>
      </div>

      <CharacterModal 
        character={selectedCharacter} 
        onClose={() => setSelectedCharacter(null)}
        onOpenPdf={handleOpenPdf}
      />
      
      <CharacterEditorModal
        isOpen={isCharEditorOpen}
        onClose={() => setIsCharEditorOpen(false)}
        character={editingCharacter}
        onSave={handleSaveCharacter}
        onReset={handleResetCharacterSchedule}
        allQuests={allQuests}
      />

      <ShopEditorModal
        isOpen={isShopEditorOpen}
        onClose={() => setIsShopEditorOpen(false)}
        onSave={handleSaveShop}
        allCharacters={allCharacters}
      />

      <QuestEditorModal
        isOpen={isQuestEditorOpen}
        onClose={() => setIsQuestEditorOpen(false)}
        quest={editingQuest}
        onSave={handleSaveQuest}
        allCharacters={allCharacters}
        allQuests={allQuests}
      />
      
      <PdfViewerPanel 
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pageNumber={pdfPage}
        onPageChange={setPdfPage}
        pdfUrl={pdfUrl}
        onFilePathChange={handlePdfPathChange}
        numPages={numPdfPages}
        setNumPages={setNumPdfPages}
        onWidthChange={setPdfPanelWidth}
      />

      <WikiViewerPanel 
        isOpen={isWikiOpen}
        onClose={() => setIsWikiOpen(false)}
        url={wikiUrl}
        title={wikiTitle}
      />

      <TimeCalculatorPanel 
        isOpen={isTimeCalcOpen}
        onClose={() => setIsTimeCalcOpen(false)}
        globalState={globalState}
        setGlobalState={setGlobalState}
        addNotification={addNotification}
        onAddDistance={handleAddDistance}
      />
    </div>
  );
};

export default App;