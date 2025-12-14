
export interface Character {
  id: string;
  name: string;
  locationRegion: Region;
  locationSpecific: string;
  description: string;
  schedule: string; // Human readable summary
  scheduleEvents: ScheduleEvent[]; // Structured data for timeline
  // New fields for downtime
  defaultActivity?: string; 
  defaultLocation?: string;
  pages: string;
  quests: string[]; // IDs of quests
  connections: string[];
  wikiLink: string;
  icon: string;
  isCustom?: boolean; // New flag
  isEdited?: boolean; // New flag for modified schedules
}

export interface ScheduleEvent {
  day: 1 | 2 | 3 | 'All'; // 'All' applies to days 1, 2, and 3
  start: string; // "HH:MM" 24h format
  end: string;   // "HH:MM" 24h format
  title: string;
  description: string;
  location: string;
  condition?: {
    type: 'requires_step' | 'requires_step_not';
    stepId: string;
  };
}

export interface Reward {
  name: string;
  type: 'Item' | 'Spell' | 'Mask' | 'Other' | 'Song';
  description?: string; // For tooltip
}

export interface Quest {
  id: string;
  questNumber: number;
  isMainQuest?: boolean;
  isCustom?: boolean; // New flag
  title: string;
  description: string; // General description
  region: Region;
  steps: QuestStep[];
  rewards: Reward[]; // Changed to rich object for tooltips
  successOutcome?: string;
  failureConsequence?: string;
  pageReference?: string;
  prerequisiteQuestId?: string; // New: Dependency on another full quest
}

export interface QuestStep {
  id: string;
  title: string; // "Quest 1-1: Title"
  description: string; // Full text block
  xpReward: number;
  curiosityShopUnlock?: {
    itemName: string;
    id: string;
  };
  itemRewards?: Reward[]; // Specific items given in this step
  day?: 1 | 2 | 3; 
  days?: number[]; // Multi-day support [1, 2]
  time?: string; // "HH:MM" 24h format for logic (Start)
  endTime?: string; // "HH:MM" 24h format (End window)
  location: string;
  characterId?: string;
  secondaryCharacterIds?: string[]; // IDs of other characters involved
  pageReference?: string;
  affectsTimeline?: boolean;
  prerequisiteStepId?: string; 
}

export type EventCategory = 'Main Quest' | 'Side Quest' | 'NPC Schedule' | 'World Event' | 'Business';

export interface MasterTimelineEvent {
  id: string;
  day: 1 | 2 | 3;
  timeDisplay: string; // "6am", "1pm", etc.
  sortTime: number; // Minutes from start of Day 1 6:00AM (0 - 4320)
  endTime?: number; // Optional duration for visual blocks
  title: string;
  description: string;
  region: Region; // Used for Swimlanes
  location: string; // Specific location
  category: EventCategory;
  relatedId?: string; // Character ID or Quest ID
  pageReference?: string;
  isDowntime?: boolean; // New flag for generated filler events
  condition?: {
    type: 'requires_step' | 'requires_step_not';
    stepId: string;
  };
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  requiredStepId: string; // The quest step that unlocks this item
  questName: string; // Display name of the quest
  description: string; // Fluff description
  stats: string; // D&D 5e mechanics
  wikidotUrl?: string; // Optional now
  isCustom?: boolean;
}

// NEW: Custom Shop definition (Location/Hours)
export interface CustomShop {
  id: string;
  name: string;
  description: string;
  region: Region;
  location: string;
  openingTime: string; // "HH:MM"
  closingTime: string; // "HH:MM"
  relatedCharacters?: { characterId: string; role: string }[]; // Linked NPCs
}

export enum Region {
  ClockTown = "Clock Town",
  TerminaField = "Termina Field",
  SouthernSwamp = "Southern Swamp",
  NorthernMountain = "Northern Mountain",
  WesternSea = "Western Sea",
  EasternCanyon = "Eastern Canyon",
  World = "World Events"
}

export interface QuestCompletionLog {
  questId: string;
  cycle: number;
  day: number;
  timeString: string; // "Day 2, 4:30pm"
  timestamp: number; // Global minute count
}

export interface GameHistory {
  totalPlayTimeSeconds: number;
  cyclesCompleted: number;
  // Map of StepID -> Number of times completed across all cycles
  stepCompletionCounts: Record<string, number>;
  // IDs of items purchased from shop
  purchasedItems: string[];
  // Detailed log of full quests completed
  questLog: QuestCompletionLog[];
  // Total distance in miles across all cycles
  totalDistanceTravelled: number;
}

export interface GlobalState {
  currentDay: 1 | 2 | 3;
  timeOfDayMinutes: number; // 0 to 1440 (Minutes since 6am)
  totalMinutes: number; // Absolute time tracker since Day 1 6am
  completedSteps: string[]; // IDs of checked quest steps IN CURRENT CYCLE
  
  // Cycle Stats
  cycleDistance: number; // Miles travelled this cycle
  
  // Day Stats (Reset on Dawn)
  dayDistance: number; // Miles travelled today
  dayXp: number; // XP earned today
  dayCompletedSteps: string[]; // Steps completed today
}

export interface CustomContent {
  characters: Character[]; // Newly created characters
  editedSchedules: Record<string, ScheduleEvent[]>; // ID -> New Schedule (Overrides default)
  quests: Quest[]; // Custom quests
  customShops: CustomShop[]; // Custom shop LOCATIONS (Timelines)
  // Note: We removed 'shops' (items) to focus on the request for actual shops, 
  // but keeping 'shopItems' in data/shop.ts for the Curiosity Shop view.
}

export interface SaveFile {
  version: number;
  timestamp: number;
  state: GlobalState;
  history: GameHistory;
  customContent?: CustomContent; // Optional for backward compatibility
}

export interface OutlineItem {
  title: string;
  dest: string | any[] | null;
  items: OutlineItem[];
}

export type PdfOutline = OutlineItem[];
