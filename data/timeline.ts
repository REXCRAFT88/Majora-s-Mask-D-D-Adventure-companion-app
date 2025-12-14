


import { MasterTimelineEvent, Region } from '../types';
import { createDailyEvents, getMinutes } from './helpers';

// HARDCODED "WORLD" EVENTS (Shops, Business Hours, etc)
// These serve as the "Base layer" for the timeline
export const manualEvents: MasterTimelineEvent[] = [
  // --- BUSINESS HOURS ---
  ...createDailyEvents("b-bomb", "Bomb Shop Open", "A shop for the discerning customers of all things that explode. Famous for bombs but also sells fireworks and pouches of loose gunpowder.", "10:00", "23:00", Region.ClockTown, "Bomb Shop", "Business", "propri"),
  ...createDailyEvents("b-curiosity", "Curiosity Shop Open", "A consignment/pawn shop that doesn't ask too many questions about what they're buying and selling. Things that go missing tend to turn up here.", "22:00", "06:00", Region.ClockTown, "Curiosity Shop", "Business", "kafei"),
  ...createDailyEvents("b-trading", "Trading Post Open", "Sale of gear and equipment. Features windows into the ceiling, a thick layer of sod, plants, and a small creek running through the store.", "06:00", "21:00", Region.ClockTown, "Trading Post", "Business"),
  ...createDailyEvents("b-lottery", "Lottery Shop Open", "A small location with a lobby for people to place bets on the lottery and claim winnings. Has a heavily secured back room.", "06:00", "23:00", Region.ClockTown, "Lottery Shop", "Business"),
  ...createDailyEvents("b-mayor", "Mayor's Office Open", "Political gridlock.", "10:00", "20:00", Region.ClockTown, "Mayor's Residence", "Business", "mayor-dotour"),
  ...createDailyEvents("b-milk", "Milk Bar Open", "A members only club named after its signature milk cocktails. The drinking hole of the town's wealthy and well connected. Serves good food and excellent drinks.", "10:00", "23:00", Region.ClockTown, "Milk Bar", "Business", "talon"),
  ...createDailyEvents("b-stockpot", "Stock Pot Inn Open", "The largest and finest inn in Clock Town. Has had hard times recently after staff fled. Anju has assumed all responsibilities.", "08:00", "20:30", Region.ClockTown, "Stock Pot Inn", "Business", "anju"),
  ...createDailyEvents("b-shooting", "Shooting Gallery", "A clubhouse for sportsmen and hunters. Sells hunting supplies and offers an archery challenge.", "06:00", "22:00", Region.ClockTown, "Shooting Gallery", "Business"),
  ...createDailyEvents("b-treasure", "Treasure Chest Shop", "A game gallery with a simple premise: three chests, a random one has a prize. Choose right to keep playing.", "06:00", "22:00", Region.ClockTown, "Treasure Chest Shop", "Business"),
  ...createDailyEvents("b-post", "Post Office", "Residence of the town's postman. Collects mail in the morning, delivers in the afternoon.", "09:00", "15:00", Region.ClockTown, "Post Office", "Business", "postman", [1, 2]),
  ...createDailyEvents("b-swordsman", "Swordsman's School", "Run by a skilled swordsman from another country. Offers to teach the way of the sword and offers a 'test' for a grand reward.", "09:00", "21:00", Region.ClockTown, "Swordsman's School", "Business", "tapis", [1, 2]),
  
  // Koume Boat Tours
  { id: "b-swamp-d1", day: 1, timeDisplay: "6:00am", sortTime: getMinutes(1, "06:00"), endTime: getMinutes(1, "18:00"), title: "Swamp Tourism", description: "Raised on posts above the marsh with a roof of interwoven vines. Offers boat rides to show off the swamp's beauty.", region: Region.SouthernSwamp, location: "Tourism Bureau", category: "Business", condition: { type: 'requires_step' as const, stepId: 'q38-1' } }, 
  { id: "b-swamp-d2", day: 2, timeDisplay: "6:00am", sortTime: getMinutes(2, "06:00"), endTime: getMinutes(2, "18:00"), title: "Swamp Tourism", description: "Raised on posts above the marsh with a roof of interwoven vines. Offers boat rides to show off the swamp's beauty.", region: Region.SouthernSwamp, location: "Tourism Bureau", category: "Business", condition: { type: 'requires_step' as const, stepId: 'q38-1' } },
  { id: "b-swamp-d3", day: 3, timeDisplay: "6:00am", sortTime: getMinutes(3, "06:00"), endTime: getMinutes(3, "18:00"), title: "Swamp Tourism", description: "Raised on posts above the marsh with a roof of interwoven vines. Offers boat rides to show off the swamp's beauty.", region: Region.SouthernSwamp, location: "Tourism Bureau", category: "Business", condition: { type: 'requires_step' as const, stepId: 'q38-1' } },

  ...createDailyEvents("b-smithy", "Mountain Smithy", "The largest building of the village. A humble single-room construct sheltered under vast eaves with a great chimney. The two smiths are experts.", "06:00", "18:00", Region.NorthernMountain, "Mountain Smithy", "Business", "smiths"),
  ...createDailyEvents("b-ranch", "Romani Ranch", "Milk and practice.", "06:00", "20:00", Region.TerminaField, "Romani Ranch", "Business", "cremia"),
  ...createDailyEvents("b-mamamu", "Doggy Racetrack", "A small dirt racetrack with an assortment of pens. Mamamu Yan keeps her precious pups here.", "06:00", "20:00", Region.TerminaField, "Doggy Racetrack", "Business", "mamamu"),
  ...createDailyEvents("b-gorman", "Gorman Track", "A large oval track set up to be a fixture of Termina's racing and gambling crowds.", "06:00", "18:00", Region.TerminaField, "Gorman Track", "Business", "gorman-bros"),
  ...createDailyEvents("b-swamp-shoot", "Swamp Shooting", "A hunting lodge built to take advantage of the animals of the swamp. Expanded to include a shooting gallery.", "06:00", "22:00", Region.SouthernSwamp, "Swamp Shooting Gallery", "Business"),
  ...createDailyEvents("b-potion", "Magic Hag's Potion Shop", "Elevated, flask-shaped building atop a large tree. Offers various potions for sale, and can brew rare potions if ingredients are provided.", "06:00", "18:00", Region.SouthernSwamp, "Potion Shop", "Business", "kotake"),
  
  // Goron Races
  ...createDailyEvents("b-goron-race", "Goron Racetrack", "Originally an open-top mine shaped into a rolling racetrack.", "06:00", "18:00", Region.NorthernMountain, "Goron Racetrack", "Business", undefined, [1, 2, 3]).map(e => ({...e, condition: { type: 'requires_step' as const, stepId: 'mq2-2' }})),

  // Ocean Fishing
  { id: "b-ocean-fish-d1", day: 1, timeDisplay: "6:00am", sortTime: getMinutes(1, "06:00"), endTime: getMinutes(1, "22:00"), title: "Ocean Fishing", description: "A small salt water pond kept climate-controlled and stocked with exotic fish.", region: Region.WesternSea, location: "Ocean Fishing Hole", category: "Business", condition: { type: 'requires_step' as const, stepId: 'mq3-2' } },
  { id: "b-ocean-fish-d2", day: 2, timeDisplay: "6:00am", sortTime: getMinutes(2, "06:00"), endTime: getMinutes(2, "22:00"), title: "Ocean Fishing", description: "A small salt water pond kept climate-controlled and stocked with exotic fish.", region: Region.WesternSea, location: "Ocean Fishing Hole", category: "Business", condition: { type: 'requires_step' as const, stepId: 'mq3-2' } },
  { id: "b-ocean-fish-d3", day: 3, timeDisplay: "6:00am", sortTime: getMinutes(3, "06:00"), endTime: getMinutes(3, "22:00"), title: "Ocean Fishing", description: "A small salt water pond kept climate-controlled and stocked with exotic fish.", region: Region.WesternSea, location: "Ocean Fishing Hole", category: "Business", condition: { type: 'requires_step' as const, stepId: 'mq3-2' } },

  // Note: All NPC specific schedules have been moved to characters.ts
  // The generator merges them automatically.

  // World Events
  { id: "w-moon-crash", day: 3, timeDisplay: "6:00am", sortTime: getMinutes(4, "06:00"), title: "MOONFALL", description: "Termina is destroyed.", region: Region.World, location: "Clock Town", category: "World Event" },
];

// NOTE: timelineEvents is now generated in App.tsx using data/helpers.ts generateTimelineEvents
export const timelineEvents: MasterTimelineEvent[] = []; // Placeholder for compatibility, but App logic overrides
