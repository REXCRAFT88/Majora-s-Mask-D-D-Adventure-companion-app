import { Character, Region } from '../types';

export const characters: Character[] = [
  // --- CLOCK TOWN ---
  {
    id: "mayor-dotour", name: "Mayor Chouchou Dotour", icon: "icons/Mayor Dotour.png", locationRegion: Region.ClockTown, locationSpecific: "Mayor's Office",
    description: "Once a much more prominent figure in the political and social life of the city, Mayor Dotour has been gradually worn down by the pressure of his work into a weak and vacillating man caught between the frequent arguments of the town council. Despite this he remains a kind man, concerned for the well being of his citizens.", 
    schedule: "10:00 am-8:00 pm: Mayor's Office.\n8:00 pm-10:00 am At the Mayor's Residence.",
    defaultActivity: "Sleeping/Resting", defaultLocation: "Mayor's Residence",
    pages: "14", quests: ["q25", "q10"], connections: ["Madame Aroma", "Kafei", "Mutoh", "Viscen"], wikiLink: "https://zelda.fandom.com/wiki/Mayor_Dotour",
    scheduleEvents: [
      { day: 'All', start: "10:00", end: "20:00", location: "Mayor's Office", title: "Mayor's Meeting", description: "Stuck in a political debate." },
      { day: 'All', start: "20:00", end: "06:00", location: "Mayor's Residence", title: "Resting", description: "At home with family." }
    ]
  },
  {
    id: "kafei", name: "Kafei Dotour", icon: "icons/Kafei.png", locationRegion: Region.ClockTown, locationSpecific: "Curiosity Shop Backroom",
    description: "The son of the mayor, Kafei is well connected and well educated. A debonair young man, Kafei was Clock Town’s most eligible bachelor before his engagement to Anju. After the engagement though, Kafei disappeared. The truth of the matter is that Kafei was cursed by the Skull Kid, transformed into a child, and has been hiding out in the back room of the Curiosity Shop, owned by Gerant Mann, a childhood friend. Kafei loves Anju deeply, but is ashamed of what happened and refuses to face her until he has recovered the wedding mask that was stolen from him.", 
    schedule: "Day 1-2: Backroom (Watching).\nDay 2 3:25 pm: Laundry Pool (Receives Letter).\nDay 2 12:30 am: Chases Sakon.\nDay 3 6:00 pm: Ikana Canyon (Waiting).",
    defaultActivity: "Hiding/Watching", defaultLocation: "Curiosity Shop Backroom",
    pages: "16", quests: ["q24", "q10"], connections: ["Anju", "Madame Aroma", "Gerant Mann"], wikiLink: "https://zelda.fandom.com/wiki/Kafei",
    scheduleEvents: [
      { day: 1, start: "06:00", end: "07:00", location: "South Clock Town", title: "Deposits Letter", description: "Mailing letter to Anju." },
      { day: 1, start: "07:00", end: "06:00", location: "Curiosity Shop", title: "Kafei Hiding", description: "Watching Curiosity Shop." },
      { day: 2, start: "06:00", end: "15:30", location: "Curiosity Shop", title: "Kafei Hiding", description: "Watching Curiosity Shop." },
      { day: 2, start: "15:30", end: "16:30", location: "Laundry Pool", title: "Kafei Checks Mail", description: "Receives Anju's letter." },
      { day: 2, start: "00:30", end: "06:00", location: "Termina Field", title: "Kafei Chases Sakon", description: "Follows thief to Ikana.", condition: { type: 'requires_step_not', stepId: 'q14-1' } },
      { day: 3, start: "06:00", end: "18:00", location: "Ikana Canyon", title: "Kafei Camps Out", description: "Waiting at Sakon's Hideout.", condition: { type: 'requires_step_not', stepId: 'q14-1' } },
      { day: 3, start: "06:00", end: "06:00", location: "Curiosity Shop", title: "Kafei Stuck", description: "Hiding in backroom, missed his chance.", condition: { type: 'requires_step', stepId: 'q14-1' } }
    ]
  },
  {
    id: "viscen", name: "Captain Royale Viscen", icon: "icons/Viscen.png", locationRegion: Region.ClockTown, locationSpecific: "Mayor's Office",
    description: "Captain Viscen is the captain of the town guard and their foremost recruiter, he is a dutiful public servant genuinely concerned with the wellbeing of the citizens. In the face of the crashing moon, Viscen has been advocating for a total evacuation of the city.", 
    schedule: "Afternoons: Mayor's Office (Arguing).\nEvenings: Patrol/Home.",
    defaultActivity: "Patrolling", defaultLocation: "Clock Town",
    pages: "16", quests: ["q25", "q37"], connections: ["Mayor Dotour", "Mutoh"], wikiLink: "https://zelda.fandom.com/wiki/Viscen",
    scheduleEvents: [
      { day: 'All', start: "12:00", end: "18:00", location: "Mayor's Office", title: "Council Meeting", description: "Arguing for evacuation." },
      { day: 'All', start: "18:00", end: "22:00", location: "Clock Town", title: "Evening Patrol", description: "Checking the guards." }
    ]
  },
  {
    id: "mutoh", name: "Mutoh Tek", icon: "icons/Mutoh.png", locationRegion: Region.ClockTown, locationSpecific: "Mayor's Office",
    description: "The head of the Clock Town Carnival Committee, Mutoh is stubborn, short-tempered, and belligerent. In the face of the falling moon, Mutoh has decided that the whole thing is overblown and that the carnival is too important a tradition to abandon. Mutoh has a family that have all already fled town.", 
    schedule: "Afternoons: Mayor's Office (Arguing).\nOtherwise: Carnival Site.",
    defaultActivity: "Supervising Construction", defaultLocation: "South Clock Town",
    pages: "16", quests: ["q25"], connections: ["Mayor Dotour", "Viscen"], wikiLink: "https://zelda.fandom.com/wiki/Mutoh",
    scheduleEvents: [
       { day: 'All', start: "12:00", end: "18:00", location: "Mayor's Office", title: "Council Meeting", description: "Arguing against evacuation." },
       { day: 'All', start: "06:00", end: "12:00", location: "South Clock Town", title: "Supervising", description: "Yelling at workers." },
       { day: 'All', start: "18:00", end: "06:00", location: "South Clock Town", title: "Supervising", description: "Yelling at workers." }
    ]
  },
  {
    id: "postman", name: "Cartero Postier (Postman)", icon: "icons/Postman.png", locationRegion: Region.ClockTown, locationSpecific: "Post Office",
    description: "Perhaps the most dedicated civil servant in Termina, Postier the postman has no social life and no real interest in anything except the timely delivery of mail. He may not even take action unless it is within the strict bounds of his schedule.", 
    schedule: "9:00 am-12:00 pm Collecting Mail.\n1:00 pm-3:00 pm Delivering Mail.\n3:00 pm Training (Post Office).\nDay 2 12:00 am: Mails Letter (S. Clock Town).\nDay 3 6:00 pm: Milk Bar (Delivery).",
    defaultActivity: "Resting/Training", defaultLocation: "Post Office",
    pages: "16", quests: ["q12", "q27", "q24"], connections: ["Madame Aroma"], wikiLink: "https://zelda.fandom.com/wiki/Postman",
    scheduleEvents: [
      { day: 1, start: "09:00", end: "12:00", location: "Clock Town", title: "Postman Collection", description: "Collecting mail from boxes." },
      { day: 1, start: "13:00", end: "15:00", location: "Clock Town", title: "Postman Delivery", description: "Delivering mail." },
      { day: 1, start: "15:00", end: "24:00", location: "Post Office", title: "Postman Training", description: "Mental training." },
      { day: 2, start: "09:00", end: "12:00", location: "Clock Town", title: "Postman Collection", description: "Collecting mail from boxes." },
      { day: 2, start: "13:00", end: "15:00", location: "Clock Town", title: "Postman Delivery", description: "Delivering mail." },
      { day: 2, start: "15:00", end: "24:00", location: "Post Office", title: "Postman Training", description: "Mental training." },
      { day: 2, start: "00:00", end: "01:00", location: "South Clock Town", title: "Mailing Letter", description: "Mailing Anju's letter." },
      { day: 3, start: "18:00", end: "06:00", location: "Post Office", title: "Postman Panics", description: "Waiting for permission to flee." }
    ]
  },
  {
    id: "anju", name: "Anju Kokko", icon: "icons/Anju.png", locationRegion: Region.ClockTown, locationSpecific: "Stock Pot Inn",
    description: "A young woman who inherited control of the stock pot inn after the death of her father, Tortus. She was planning to be married in only a few days, but her husband-to-be, Kafei, has recently disappeared. With this, caring for her elderly grandmother, the stress of planning the festival and the impending destruction from the moon, Anju has been frazzled and makes a lot of mistakes in the management of the inn.", 
    schedule: "6:00 am-11:00 am Inn Desk.\n11:00 am-1:00 pm Kitchen (Cooking).\n1:00 pm-8:30 pm Inn Desk.\nDay 1 11:30 pm: Kitchen (Meeting).\nDay 2 9:30 pm: Employee Room (Talking w/ Mother).\nDay 3 6:00 pm: Flees to Ranch.",
    defaultActivity: "Resting/Sleeping", defaultLocation: "Stock Pot Inn (Room)",
    pages: "16", quests: ["q24", "q11", "q15", "q26"], connections: ["Kafei", "Cremia", "Granmere Koko"], wikiLink: "https://zelda.fandom.com/wiki/Anju",
    scheduleEvents: [
      { day: 1, start: "06:00", end: "11:00", location: "Stock Pot Inn", title: "Anju at Desk", description: "Working reception." },
      { day: 1, start: "11:00", end: "12:00", location: "Stock Pot Inn Kitchen", title: "Anju Cooking", description: "Cooking lunch for Grandma." },
      { day: 1, start: "12:00", end: "13:00", location: "Grandma's Room", title: "Serving Lunch", description: "Delivering food to Grandma." },
      { day: 1, start: "13:00", end: "13:50", location: "Employee Room", title: "Lunch Break", description: "Taking a break." },
      { day: 1, start: "13:50", end: "20:30", location: "Stock Pot Inn", title: "Anju at Desk", description: "Working reception." },
      { day: 1, start: "23:30", end: "06:00", location: "Stock Pot Inn Kitchen", title: "Anju in Kitchen", description: "Waiting for Kafei's messenger." },
      
      { day: 2, start: "06:00", end: "11:30", location: "Stock Pot Inn", title: "Anju at Desk", description: "Working reception." },
      { day: 2, start: "11:30", end: "13:00", location: "East Clock Town", title: "Walking", description: "Taking a walk in the rain." },
      { day: 2, start: "13:00", end: "13:50", location: "Stock Pot Inn", title: "Lunch Break", description: "Quick lunch." },
      { day: 2, start: "13:50", end: "16:00", location: "Laundry Pool", title: "Thinking", description: "Sitting on the bench." },
      { day: 2, start: "16:00", end: "20:30", location: "Stock Pot Inn", title: "Anju at Desk", description: "Working reception." },
      { day: 2, start: "21:30", end: "06:00", location: "Employee Room", title: "Anju with Mother", description: "Talking in employee room." },

      { day: 3, start: "06:00", end: "11:00", location: "Stock Pot Inn", title: "Anju at Desk", description: "Working reception." },
      { day: 3, start: "11:00", end: "13:00", location: "Stock Pot Inn Kitchen", title: "Anju Cooking", description: "Cooking lunch." },
      { day: 3, start: "13:00", end: "18:00", location: "Stock Pot Inn", title: "Anju at Desk", description: "Working reception." },
      { day: 3, start: "18:00", end: "06:00", location: "Romani Ranch", title: "Anju Flees", description: "Goes to Romani Ranch with family.", condition: { type: 'requires_step_not', stepId: 'q24-5'} },
      { day: 3, start: "18:00", end: "06:00", location: "Stock Pot Inn Room", title: "Anju Waiting", description: "Waiting for Kafei in her room.", condition: { type: 'requires_step', stepId: 'q24-5'} }
    ]
  },
  {
    id: "granmere", name: "Granmere Koko", icon: "icons/Anjus Mother.png", locationRegion: Region.ClockTown, locationSpecific: "Stock Pot Inn",
    description: "Anju’s grandmother on her father’s side, Granmere is possibly one of the oldest individuals in all of Termina. She used to spend a lot of time in her better days taking care of all the children in Clock Town and became a master at telling bed time stories that are guaranteed to put kids to sleep. Granmere has started to fade in her old age and dementia has set in, which she is more than willing to exploit.", 
    schedule: "All Day: Stock Pot Inn Room.",
    defaultActivity: "Sitting/Telling Stories", defaultLocation: "Stock Pot Inn (Room)",
    pages: "17", quests: ["q26"], connections: ["Anju"], wikiLink: "https://zelda.fandom.com/wiki/Anju%27s_Grandmother",
    scheduleEvents: [
      { day: 1, start: "08:00", end: "20:00", location: "Stock Pot Inn", title: "Telling Stories", description: "Reading stories." },
      { day: 2, start: "08:00", end: "20:00", location: "Stock Pot Inn", title: "Telling Stories", description: "Reading stories." },
      { day: 3, start: "08:00", end: "18:00", location: "Stock Pot Inn", title: "Telling Stories", description: "Reading stories." },
      { day: 3, start: "18:00", end: "06:00", location: "Romani Ranch", title: "Fleeing", description: "Taking refuge." }
    ]
  },
  {
    id: "gerant", name: "Gerant Mann", icon: "icons/Shopkeeper.png", locationRegion: Region.ClockTown, locationSpecific: "Curiosity Shop",
    description: "Gerant owns and operates the Curiosity Shop, a well-stocked pawn shop in the market district. His policy of not asking too many questions and broad range of contacts means he is also a fence for a lot of stolen goods. There are some hints though that he had secretly been working with Kafei to try and crack a local thieves’ ring.",
    schedule: "Night: Curiosity Shop.",
    defaultActivity: "Resting", defaultLocation: "Curiosity Shop Backroom",
    pages: "17", quests: ["q24", "q14"], connections: ["Kafei", "Sakon"], wikiLink: "https://zelda.fandom.com/wiki/Curiosity_Shop_Man",
    scheduleEvents: [
      { day: 'All', start: "21:00", end: "06:00", location: "Curiosity Shop", title: "Working", description: "Manning the counter." }
    ]
  },
  {
    id: "talon", name: "Talon Barten", icon: "icons/Barten.png", locationRegion: Region.ClockTown, locationSpecific: "Milk Bar",
    description: "The owner of the Milk Bar and its main bartender. Mr. Barten has tied his life to his bar and he has no intention of abandoning it or leaving it looking anything short of spotless. He has a history with Anju’s family and the late father of Cremia and Romani out in Romani’s Ranch. This history with the latter may be why he opened a “milk bar.”", 
    schedule: "12:00 pm-7:00 pm: Cleaning.\n8:00 pm-4:00 am: Operating Bar.",
    defaultActivity: "Sleeping/Preparing", defaultLocation: "Milk Bar",
    pages: "17", quests: ["q22"], connections: ["Gorman", "Madame Aroma"], wikiLink: "https://zelda.fandom.com/wiki/Mr._Barten",
    scheduleEvents: [
      { day: 'All', start: "10:00", end: "21:00", location: "Milk Bar", title: "Cleaning", description: "Cleaning the bar." },
      { day: 'All', start: "22:00", end: "06:00", location: "Milk Bar", title: "Operating Bar", description: "Serving drinks." }
    ]
  },
  {
    id: "tapis", name: "Tapis", icon: "icons/Swordsman.png", locationRegion: Region.ClockTown, locationSpecific: "Swordsman's School",
    description: "A skilled swordsman who traveled to clock town and decided to open a school of swordsmanship. He is a brave fighter and a stern teacher. However, when faced with a threat he can’t cut, like the moon crashing, he shows himself to be a complete coward.", 
    schedule: "9:00 am-9:00 pm: Dojo.\nNight: Back room.",
    defaultActivity: "Hiding/Sleeping", defaultLocation: "Swordsman's School (Back)",
    pages: "18", quests: ["q19"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Swordsman",
    scheduleEvents: [
      { day: 'All', start: "09:00", end: "21:00", location: "Swordsman's School", title: "Teaching", description: "Training students." },
      { day: 'All', start: "21:00", end: "09:00", location: "Swordsman's School", title: "Cowering", description: "Hiding in the back room." }
    ]
  },
  {
    id: "propri", name: "Propri Bomba", icon: "icons/Bomb Shop Guy.png", locationRegion: Region.ClockTown, locationSpecific: "Bomb Shop",
    description: "The owner and operator of the bomb shop, he is an expert in all things gunpowder. Also a bit of an inventor, he has been sketching out plans to use explosives to propel a vessel to the moon to try to find some way to stop it from crashing; or maybe just blow it up.", 
    schedule: "10:00 am-11:00 pm: Bomb Shop.",
    defaultActivity: "Sleeping", defaultLocation: "Bomb Shop (Back)",
    pages: "18", quests: ["q14"], connections: ["Vieille Bomba"], wikiLink: "https://zelda.fandom.com/wiki/Bomb_Shop",
    scheduleEvents: [
      { day: 'All', start: "10:00", end: "23:00", location: "Bomb Shop", title: "Working", description: "Selling bombs." }
    ]
  },
  {
    id: "old-lady", name: "Vieille Bomba", icon: "icons/Bomb Lady.png", locationRegion: Region.ClockTown, locationSpecific: "Bomb Shop",
    description: "The mother of the bomb shop owner. Despite her age she frequently makes trips to the northern mountains for black powder, weapons and other gear for sale in the bomb shop. There’s a running debate in town though if she is doing this because she’s stubborn or if her son is inconsiderate.", 
    schedule: "Day 1 12:00 am: N. Clock Town (Delivery/Robbery).\nAll Day: Bomb Shop.",
    defaultActivity: "Working/Resting", defaultLocation: "Bomb Shop",
    pages: "18", quests: ["q14"], connections: ["Propri Bomba", "Sakon"], wikiLink: "https://zelda.fandom.com/wiki/Old_Lady_from_Bomb_Shop",
    scheduleEvents: [
       { day: 1, start: "00:00", end: "01:00", location: "North Clock Town", title: "Delivery", description: "Carrying heavy bomb bag." },
       { day: 'All', start: "06:00", end: "22:00", location: "Bomb Shop", title: "Working", description: "Helping in the shop." }
    ]
  },
  {
    id: "banker", name: "Banquier", icon: "icons/Banker.png", locationRegion: Region.ClockTown, locationSpecific: "West Clock Town",
    description: "The proprietor of the clock town bank. A bit of a financial wild man, they have been throwing new ideas for the bank beyond simply holding and releasing money at the wall for a while now. Their fiscal bets have largely paid off and there is a sizable amount of rupees stored within the bank’s safe. Banquier doesn’t seem to need to sleep and is always full of energy, some suspect that this is because of a boon from the great fairy", 
    schedule: "All Day: Bank Counter.",
    defaultActivity: "Working (Sleepless)", defaultLocation: "Bank",
    pages: "18", quests: ["q9"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Banker",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "06:00", location: "Bank", title: "Working", description: "Slapping thighs and counting rupees." }
    ]
  },
  {
    id: "toto", name: "Toto", icon: "icons/Toto.png", locationRegion: Region.ClockTown, locationSpecific: "Milk Bar / Mayor's Residence",
    description: "Toto is only in town for a little while, coming up from the southern seas to discuss the arrangement of the performance for the band the Indigo-Gos. Unfortunately, as a consequence of the Skull Kid’s spate of curses, the band’s lead singer, Lulu, has lost her voice and the band will have to cancel. The band was a big draw, and he spends the majority of his days in the Mayor’s residence talking with Madame Aroma who is trying to get his to at least get the rest of the band in. He spends his evenings in the Milk Bar, genuinely regretting not being able to bring the band in and have them perform.", 
    schedule: "Day 1-2 10:00 am: Mayor's Residence (Meeting).\nDay 1-2 10:00 pm: Milk Bar (Sound Check).",
    defaultActivity: "Waiting/Wandering", defaultLocation: "Clock Town",
    pages: "18", quests: ["q22"], connections: ["Madame Aroma", "Gorman"], wikiLink: "https://zelda.fandom.com/wiki/Toto",
    scheduleEvents: [
      { day: 1, start: "10:00", end: "11:00", location: "Mayor's Residence", title: "Toto Meeting", description: "Discussing performance with Aroma." },
      { day: 1, start: "22:00", end: "01:00", location: "Milk Bar", title: "Toto Sound Check", description: "Testing acoustics." },
      { day: 2, start: "10:00", end: "11:00", location: "Mayor's Residence", title: "Toto Meeting", description: "Discussing performance with Aroma." },
      { day: 2, start: "22:00", end: "01:00", location: "Milk Bar", title: "Toto Sound Check", description: "Testing acoustics." }
    ]
  },
  {
    id: "jim", name: "Jim Verona", icon: "icons/Jim.png", locationRegion: Region.ClockTown, locationSpecific: "North Clock Town",
    description: "A young boy that has managed to wrangle together the town’s other children into the Bombers Secret Society of Justice assuming the leadership of the group after others aged out of it. Jim has decided that the bombers first need to get as much information as possible before taking action, so he has been directing all of his crew to keep their ears open for rumors and secrets.", 
    schedule: "All Day: N. Clock Town (Popping Balloon).\nHide and Seek: All Clock Town.",
    defaultActivity: "Patrolling/Hiding", defaultLocation: "North Clock Town",
    pages: "18", quests: ["q7", "q23"], connections: ["Bombers"], wikiLink: "https://zelda.fandom.com/wiki/Jim",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "20:00", location: "North Clock Town", title: "Bombers Practice", description: "Trying to pop the Majora Balloon." }
    ]
  },
  {
    id: "gorman", name: "Inigo Gorman", icon: "icons/Gorman.png", locationRegion: Region.ClockTown, locationSpecific: "East Clock Town",
    description: "The leader and founder of the troupe, Gorman has always struggled with depression and the stress of having his big performance that he expected would put his efforts on the map canceled, has sunk him into a deep funk. He splits his time between waiting to be seen at the mayor’s office to try and get his performers either bumped to a headline act, kept on as side performers, or at the very least paid; and drinking himself into a stupor at the bar.", 
    schedule: "Day 1 10:00 am: Mayor's Office.\nDay 1-2 10:00 pm: Milk Bar (Drinking).\nDay 2 Day: Inn Room (Sulking).",
    defaultActivity: "Sulking/Sleeping", defaultLocation: "Stock Pot Inn (Room)",
    pages: "19", quests: ["q22", "q23"], connections: ["Gorman Bros", "Madame Aroma", "Toto"], wikiLink: "https://zelda.fandom.com/wiki/Gorman",
    scheduleEvents: [
      { day: 1, start: "06:00", end: "10:00", location: "Stock Pot Inn Lobby", title: "Waiting", description: "Waiting for audience." },
      { day: 1, start: "10:00", end: "12:00", location: "Mayor's Office", title: "Petitioning", description: "Trying to get an audience." },
      { day: 1, start: "13:00", end: "22:00", location: "Milk Bar", title: "Drinking", description: "Day drinking." },
      { day: 1, start: "22:00", end: "06:00", location: "Milk Bar", title: "Drinking", description: "Drowning sorrows." },
      { day: 2, start: "06:00", end: "21:00", location: "Stock Pot Inn Room", title: "Sulking", description: "Lying in bed." },
      { day: 2, start: "22:00", end: "06:00", location: "Milk Bar", title: "Drinking", description: "Drowning sorrows." }
    ]
  },
  {
    id: "rosa-sisters", name: "The Rosa Sisters, Judo and Marilla", icon: "icons/Dancer Blue.png", locationRegion: Region.ClockTown, locationSpecific: "West Clock Town",
    description: "Twin dancers and contortionists, lithe and beautiful. They are skilled performers but feel that their work is stale, and they are middling choreographers.", 
    schedule: "Night 6:00 pm-6:00 am: West Clock Town (Practicing).",
    defaultActivity: "Resting", defaultLocation: "Stock Pot Inn (Room)",
    pages: "19", quests: ["q31"], connections: ["Gorman", "Kamaro"], wikiLink: "https://zelda.fandom.com/wiki/Rosa_Sisters",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "18:00", location: "Stock Pot Inn Room", title: "Thinking", description: "Pacing and thinking." },
      { day: 'All', start: "18:00", end: "06:00", location: "West Clock Town", title: "Rosa Sisters Practice", description: "Practicing dance moves." }
    ]
  },
  {
    id: "guru-guru", name: "Guru-Guru", icon: "icons/Guru Guru.png", locationRegion: Region.ClockTown, locationSpecific: "Laundry Pool",
    description: "Guru-Guru is a composer and phonograph “player” for the Gorman Troupe. He usually seems like a very kind and friendly fellow, but he can also be deeply critical and jealous. He is of the “private” opinion that none of the other performers match up to his talent, especially the Rosa sisters.", 
    schedule: "Day: Stock Pot Inn Room.\nNight (6:00 pm-6:00 am): Laundry Pool (Practicing).",
    defaultActivity: "Resting/Brooding", defaultLocation: "Stock Pot Inn (Room)",
    pages: "19", quests: ["q13"], connections: ["Gorman", "Rosa Sisters"], wikiLink: "https://zelda.fandom.com/wiki/Guru-Guru",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "18:00", location: "Stock Pot Inn Room", title: "Resting", description: "Staying in room." },
      { day: 'All', start: "18:00", end: "06:00", location: "Laundry Pool", title: "Guru-Guru Practice", description: "Playing the Song of Storms." }
    ]
  },
  {
    id: "jugglers", name: "Juggler Twins ('Red' and 'Blue')", icon: "icons/Juggler Blue.png", locationRegion: Region.ClockTown, locationSpecific: "East Clock Town",
    description: "Red and Blue are jesters, jugglers, and clowns. Their act involves keeping balls in the air while setting each other up for punchlines and puns. They’re also compulsive gossip mongers, listening to rumors to get material for their act.", 
    schedule: "10:00 am-6:00 pm: East Clock Town (Practicing).\n6:00 pm-12:00 am: Stock Pot Inn (Gambling).",
    defaultActivity: "Sleeping", defaultLocation: "Stock Pot Inn (Room)",
    pages: "19", quests: [], connections: ["Gorman"], wikiLink: "https://zelda.fandom.com/wiki/Juggler_Twins",
    scheduleEvents: [
       { day: 'All', start: "10:00", end: "18:00", location: "East Clock Town", title: "Practicing", description: "Juggling and telling jokes." },
       { day: 'All', start: "18:00", end: "24:00", location: "Stock Pot Inn", title: "Gambling", description: "Playing cards in the lobby." }
    ]
  },
  {
    id: "madame-aroma", name: "Madame Aroma Dotour", icon: "icons/Madame Aroma.png", locationRegion: Region.ClockTown, locationSpecific: "Mayor's Residence",
    description: "The Mayor's wife and entertainment overseer. Looking for her missing son Kafei.", 
    schedule: "Day 1-2 10:00 am-8:00 pm: Mayor's Drawing Room.\nDay 3 6:00 pm: Milk Bar.",
    defaultActivity: "Resting", defaultLocation: "Mayor's Residence",
    pages: "15", quests: ["q10"], connections: ["Mayor Dotour", "Kafei", "Toto", "Gorman"], wikiLink: "https://zelda.fandom.com/wiki/Madame_Aroma",
    scheduleEvents: [
      { day: 1, start: "10:00", end: "20:00", location: "Mayor's Residence", title: "Madame Aroma Office", description: "Overseeing performances." },
      { day: 2, start: "10:00", end: "20:00", location: "Mayor's Residence", title: "Madame Aroma Office", description: "Overseeing performances." },
      { day: 3, start: "18:00", end: "06:00", location: "Milk Bar", title: "Drinking", description: "Waiting for the end." }
    ]
  },
  {
    id: "sakon", name: "Sakon", icon: "icons/Sakon.png", locationRegion: Region.ClockTown, locationSpecific: "Roaming",
    description: "A menace across the whole of Termina, Sakon has stolen enough of value to bankrupt a fiefdom. Some of his ill-gotten gains have been sold at the Curiosity Shop, but he keeps the prizes of his collection in his hideout which he has loaded with tricks and traps, the paranoid parts of his mind worried about thieves coming after what he believes to be his.",
    schedule: "Day 1 12:00 am: N. Clock Town (Robbery).\nDay 2 11:00 pm: Curiosity Shop (Fencing).\nDay 3 6:00 pm: Ikana Hideout.",
    defaultActivity: "Prowling/Hiding", defaultLocation: "Ikana Canyon",
    pages: "85", quests: ["q14", "q24"], connections: ["Kafei", "Gerant Mann"], wikiLink: "https://zelda.fandom.com/wiki/Sakon",
    scheduleEvents: [
      { day: 1, start: "06:00", end: "18:00", location: "Ikana Canyon", title: "Prancing", description: "Roaming the canyon." },
      { day: 1, start: "18:00", end: "24:00", location: "North Clock Town", title: "Waiting", description: "Waiting for bomb bag delivery." },
      { day: 1, start: "00:00", end: "01:00", location: "North Clock Town", title: "Robbery", description: "Stealing bomb bags." },
      { day: 2, start: "23:00", end: "06:00", location: "Curiosity Shop", title: "Sakon Fencing", description: "Selling stolen bomb bags.", condition: { type: 'requires_step_not', stepId: 'q14-1' } },
      { day: 3, start: "18:00", end: "06:00", location: "Ikana Canyon", title: "Guarding Hideout", description: "Protecting his loot." }
    ]
  },
  {
    id: "tingle", name: "Tingle", icon: "icons/Tingle.png", locationRegion: Region.ClockTown, locationSpecific: "Roaming",
    description: "Strange man who thinks he is a fairy. Sells maps.", schedule: "All Day: Floating in N. Clock Town (and other regions).",
    defaultActivity: "Floating", defaultLocation: "North Clock Town",
    pages: "261", quests: ["q42"], connections: ["Swampy"], wikiLink: "https://zelda.fandom.com/wiki/Tingle",
    scheduleEvents: [
       { day: 'All', start: "06:00", end: "20:00", location: "North Clock Town", title: "Floating", description: "Selling maps to tourists." }
    ]
  },

  // --- TERMINA FIELD ---
  {
    id: "romani", name: "Romani Malon", icon: "icons/Romani.png", locationRegion: Region.TerminaField, locationSpecific: "Romani Ranch",
    description: "Boisterous, excitable, and adventurous with a penchant for giving people nicknames. When Romani was born, her late father changed the name of the ranch to hers, something that may have made his passing even more bittersweet. Romani has been distressed by the recent spate of violence and vandalism that has been overtaking the farm that shares her name, and she feels a bit of responsibility for protecting the place and her cows. She saw the aliens that have been surveying the farm at the middle of the night and has been practicing with a bow to try and chase them off as well as trying, unsuccessfully, to convince her sister about this threat.", 
    schedule: "6:00 am-6:00 pm: Practice.\nDay 2 2:00 am: Defends Barn.\nDay 3: Fugue state (if failed).",
    defaultActivity: "Sleeping", defaultLocation: "Romani Ranch (House)",
    pages: "32", quests: ["q33"], connections: ["Cremia", "Mamamu Yan"], wikiLink: "https://zelda.fandom.com/wiki/Romani",
    scheduleEvents: [
      { day: 1, start: "06:00", end: "18:00", location: "Romani Ranch", title: "Romani Practice", description: "Running around, practicing archery." },
      { day: 1, start: "18:00", end: "20:00", location: "Romani Ranch House", title: "Romani Dinner", description: "Eating dinner in the house." },
      { day: 2, start: "06:00", end: "18:00", location: "Romani Ranch Barn", title: "Talking to Sister", description: "Discussing the 'ghosts'." },
      { day: 2, start: "02:00", end: "05:30", location: "Romani Ranch", title: "Defending Barn", description: "Fighting off aliens." },
      { day: 3, start: "06:00", end: "18:00", location: "Romani Ranch", title: "Romani Catatonic", description: "Sitting in a daze, traumatized.", condition: { type: 'requires_step_not', stepId: 'q33-2'} },
      { day: 3, start: "06:00", end: "18:00", location: "Romani Ranch", title: "Romani Practice", description: "Happily practicing archery.", condition: { type: 'requires_step', stepId: 'q33-2'} },
      { day: 3, start: "18:00", end: "20:00", location: "Romani Ranch House", title: "Romani Dinner", description: "Eating dinner in the house." }
    ]
  },
  {
    id: "cremia", name: "Cremia Malon", icon: "icons/Cremia.png", locationRegion: Region.TerminaField, locationSpecific: "Romani Ranch",
    description: "After her father’s recent passing, the ranch was left to Romani and Cremia. Cremia has stepped up in nearly every capacity, she runs the ranch, she manages deliveries, she tends to the cows, and she takes care of her sister. Cremia has been driven to distraction by all the petty attacks and assaults the Gorman brothers have been inflicting on their ranch, especially because she hasn’t been able to figure out who is behind them. Cremia was childhood friends with Anju and Kafei, but hasn’t been able to visit them since her parents died and she assumed more responsibility at the ranch. This increased responsibility has left Cremia feeling stifled, anxious, and lonely.", 
    schedule: "6:00 am-6:00 pm: Ranch Work.\nDay 2 6:00 pm: Milk Delivery Run (Milk Road).",
    defaultActivity: "Sleeping/Housework", defaultLocation: "Romani Ranch (House)",
    pages: "33", quests: ["q34", "q33"], connections: ["Romani", "Anju", "Mamamu Yan"], wikiLink: "https://zelda.fandom.com/wiki/Cremia",
    scheduleEvents: [
      { day: 1, start: "06:00", end: "18:00", location: "Romani Ranch Barn", title: "Cremia Contemplating", description: "Worried about the ranch." },
      { day: 1, start: "18:00", end: "20:00", location: "Romani Ranch House", title: "Dinner", description: "Eating dinner." },
      { day: 2, start: "06:00", end: "18:00", location: "Romani Ranch Barn", title: "Cremia Milking", description: "Milking the cows." },
      { day: 2, start: "18:00", end: "21:00", location: "Milk Road", title: "Milk Delivery", description: "Driving the wagon to town." },
      { day: 3, start: "06:00", end: "18:00", location: "Romani Ranch Barn", title: "Cremia Contemplating", description: "Worried about the ranch." },
      { day: 3, start: "18:00", end: "20:00", location: "Romani Ranch House", title: "Dinner", description: "Eating dinner." }
    ]
  },
  {
    id: "grog", name: "Grog", icon: "icons/Grog.png", locationRegion: Region.TerminaField, locationSpecific: "Romani Ranch (Cucco Shack)",
    description: "Grog was hired a few years back by Romani and Cremia’s father. Grog is quiet, fatalistic, and may suffer from depression, the only things he really seems to be passionate about are his cuccos. Grog is an expert at cucco husbandry but has been sunk into melancholy that, with the moon crashing, he will never see his current flock grow to maturity.", 
    schedule: "6:00 am-8:00 pm: Cucco Shack.",
    defaultActivity: "Sleeping", defaultLocation: "Cucco Shack",
    pages: "33", quests: ["q35"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Grog",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "20:00", location: "Cucco Shack", title: "Tending Cuccos", description: "Watching chicks." }
    ]
  },
  {
    id: "mamamu", name: "Mamamu Yan", icon: "icons/Mamau Yan.png", locationRegion: Region.TerminaField, locationSpecific: "Doggy Racetrack",
    description: "Mamamu Yan is a dog breeder and friend of Romani and Cremia’s late parents. She was given permission to, as part of her dog training, open and operate a racing track for the dogs at the ranch.", 
    schedule: "6:00 am-8:00 pm: Doggy Racetrack.",
    defaultActivity: "Sleeping", defaultLocation: "Doggy Racetrack (House)",
    pages: "33", quests: ["q36", "q23"], connections: ["Romani", "Cremia"], wikiLink: "https://zelda.fandom.com/wiki/Mamamu_Yan",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "20:00", location: "Doggy Racetrack", title: "Hosting Races", description: "Managing the bets." }
    ]
  },
  {
    id: "gorman-bros", name: "The Gorman Brothers (Fratelli & Hermano)", icon: "icons/Gorman Brother Blue.png", locationRegion: Region.TerminaField, locationSpecific: "Gorman Track",
    description: "Two out of a set of identical triplets (along with Inigo Gorman, the leader of the Gorman Troupe) the Gorman brothers are two of the most ruthless thugs in Termina. On the surface, the Gorman brothers are just average scoundrels that breed horses and run lavish races on their track. Behind the scenes, the Gormans command a team of bandits that attack Termina Field and Romani Ranch.", 
    schedule: "6:00 am-6:00 pm: Gorman Track.",
    defaultActivity: "Scheming/Sleeping", defaultLocation: "Gorman Track House",
    pages: "34", quests: ["q32", "q23", "q34"], connections: ["Inigo Gorman"], wikiLink: "https://zelda.fandom.com/wiki/Gorman_Brothers",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "18:00", location: "Gorman Track", title: "Racing", description: "Running the horse races." },
      { day: 2, start: "18:00", end: "21:00", location: "Milk Road", title: "Raiding", description: "Attacking Cremia's wagon." }
    ]
  },
  {
    id: "shikashi", name: "Professor Shikashi", icon: "icons/Astronomer.png", locationRegion: Region.TerminaField, locationSpecific: "Astral Observatory",
    description: "Astronomer studying the moon. Keeper of the Bombers' hideout code.", schedule: "All Day: Astral Observatory.",
    defaultActivity: "Stargazing", defaultLocation: "Astral Observatory",
    pages: "27", quests: ["q29", "q7"], connections: ["Bombers"], wikiLink: "https://zelda.fandom.com/wiki/Astral_Observatory",
    scheduleEvents: [
       { day: 'All', start: "06:00", end: "06:00", location: "Astral Observatory", title: "Stargazing", description: "Watching the moon fall." }
    ]
  },
  {
    id: "kamaro", name: "Kamaro", icon: "icons/Kamaro.png", locationRegion: Region.TerminaField, locationSpecific: "North Termina Field",
    description: "Ghost of a charismatic dancer. Enjoys moonlight.", schedule: "12:00 am-6:00 am: Mushroom Rocks (North Termina Field).",
    defaultActivity: "Faded", defaultLocation: "Spirit World",
    pages: "153", quests: ["q31"], connections: ["Rosa Sisters"], wikiLink: "https://zelda.fandom.com/wiki/Kamaro",
    scheduleEvents: [
      { day: 'All', start: "00:00", end: "06:00", location: "North Termina Field", title: "Kamaro Dance", description: "Ghostly dancing on mushroom rocks."}
    ]
  },
  {
    id: "shiro", name: "Shiro", icon: "icons/Shiro.png", locationRegion: Region.TerminaField, locationSpecific: "Road to Ikana",
    description: "A guard of Clock Town who has been appointed to watch over the pass as things became more dangerous in Termina. He has been insecure about being plain and unexceptional, and when he attempted to stop the skull kid, he was cursed with permanent invisibility, ensuring he would never stand out. He has mostly resigned himself to this fate.", 
    schedule: "All Day: Road to Ikana (calling for help).",
    defaultActivity: "Calling for Help", defaultLocation: "Road to Ikana",
    pages: "83", quests: ["q37"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Shiro",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "06:00", location: "Road to Ikana", title: "Invisible", description: "Waving for help unseen." }
    ]
  },

  // --- SOUTHERN SWAMP ---
  {
    id: "swampy", name: "Swampy", icon: "icons/Swampy.png", locationRegion: Region.SouthernSwamp, locationSpecific: "Tourism Bureau",
    description: "A man passionate about his understanding of the swamp. Swampy opened the swamp tourism bureau to help people who are less prepared still appreciate and explore the swamp. He worries a lot about his son, Tingle, who has become convinced that he is a fairy and run off to learn magic. Swampy has enacted a number of novel ways to try to drive swamp tourism, including a recent inclusion of photography setups.", 
    schedule: "6:00 am-10:00 pm: Tourism Bureau.",
    defaultActivity: "Sleeping", defaultLocation: "Tourism Bureau",
    pages: "39", quests: ["q42", "q23"], connections: ["Tingle", "Koume"], wikiLink: "https://zelda.fandom.com/wiki/Swamp_Tourist_Center_Guide",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "22:00", location: "Tourism Bureau", title: "Guiding", description: "Running the contest." }
    ]
  },
  {
    id: "koume", name: "Koume", icon: "icons/Koume.png", locationRegion: Region.SouthernSwamp, locationSpecific: "Woods of Mystery / Tourism Center",
    description: "Twin witches that split their work between the swamp tourism bureau and their potion shop. They frequently take their brooms off into the woods of mystery for potion ingredients. The two witches seem exceedingly old, but they are very spry and lively for their age, and are frequently playful. The sisters bicker and argue as much as they cooperate and agree.", 
    schedule: "Day 1: Injured in Woods.\nDay 2-3: Ticket Counter (if saved).",
    defaultActivity: "Flying/Resting", defaultLocation: "Potion Shop",
    pages: "39", quests: ["q38", "q43"], connections: ["Kotake"], wikiLink: "https://zelda.fandom.com/wiki/Koume",
    scheduleEvents: [
      { day: 1, start: "06:00", end: "06:00", location: "Woods of Mystery", title: "Koume Injured", description: "Trapped in the Woods of Mystery.", condition: { type: 'requires_step_not', stepId: 'q38-1'} },
      { day: 2, start: "06:00", end: "18:00", location: "Tourism Bureau", title: "Koume at Counter", description: "Selling boat tour tickets.", condition: { type: 'requires_step', stepId: 'q38-1'} },
      { day: 3, start: "06:00", end: "18:00", location: "Tourism Bureau", title: "Koume at Counter", description: "Selling boat tour tickets.", condition: { type: 'requires_step', stepId: 'q38-1'} }
    ]
  },
  {
    id: "kotake", name: "Kotake", icon: "icons/Kotake.png", locationRegion: Region.SouthernSwamp, locationSpecific: "Potion Shop",
    description: "Potion Hag. Makes red and blue potions. Twin sister of Koume.", 
    schedule: "6:00 am-6:00 pm Potion Shop.",
    defaultActivity: "Sleeping/Brewing", defaultLocation: "Potion Shop",
    pages: "39", quests: ["q38"], connections: ["Koume"], wikiLink: "https://zelda.fandom.com/wiki/Kotake",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "18:00", location: "Potion Shop", title: "Brewing", description: "Making potions." }
    ]
  },
  {
    id: "deku-king", name: "Deku King (Rio Mojo)", icon: "icons/Deku Kung.png", locationRegion: Region.SouthernSwamp, locationSpecific: "Deku Palace",
    description: "A prideful, paranoid, short-sighted, and quick to act royal. The Deku king is the supreme lord of the deku people. He sends out orders seemingly at random, caught along on his mercurial whims. He can be violent, merciful, generous, and dangerous all between one minute and the next. The only thing that has managed to stop the deku king once he gets into the swing of things has been his daughter.", 
    schedule: "Throne Room.",
    defaultActivity: "Ruling/Punishing", defaultLocation: "Deku Palace Throne Room",
    pages: "41", quests: ["mq1"], connections: ["Deku Princess"], wikiLink: "https://zelda.fandom.com/wiki/Deku_King",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "20:00", location: "Deku Palace", title: "King Ruling", description: "Sitting on throne, angry."} 
    ]
  },
  {
    id: "deku-princess", name: "Deku Princess (Princhesa Mojo)", icon: "icons/Deku Princess.png", locationRegion: Region.SouthernSwamp, locationSpecific: "Woodfall Temple",
    description: "The deku princess is a tempering influence on her father, she is kind and concerned for her people and those who live in the surrounding region. She promotes cooperation with the other peoples in the swamp rather than the deku nativism of her father. However, she cannot do much to calm her father’s impulses while she is kidnapped.", 
    schedule: "Woodfall Temple (Captured).",
    defaultActivity: "Captured", defaultLocation: "Woodfall Temple",
    pages: "41", quests: ["mq1", "q44"], connections: ["Deku King", "Deku Butler"], wikiLink: "https://zelda.fandom.com/wiki/Deku_Princess",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "06:00", location: "Woodfall Temple", title: "Captured", description: "Trapped in the temple." }
    ]
  },
  {
    id: "deku-butler", name: "The Deku Butler", icon: "icons/Deku Butler.png", locationRegion: Region.SouthernSwamp, locationSpecific: "Deku Palace",
    description: "The loyal servant of the deku royals, the deku butler is a skilled warrior and racer. He has been mourning the loss of his son, a young deku warrior who had promised to journey to the lost woods beneath clock town to try to find some aid from the poison and the masked warrior that had occupied Woodfall.", 
    schedule: "Deku Palace / Shrine.",
    defaultActivity: "Serving/Pacing", defaultLocation: "Deku Palace",
    pages: "41", quests: ["q44-3"], connections: ["Deku King"], wikiLink: "https://zelda.fandom.com/wiki/Deku_Butler",
    scheduleEvents: [
       { day: 'All', start: "06:00", end: "20:00", location: "Deku Palace", title: "Serving", description: "Attending the King." }
    ]
  },
  {
    id: "henri", name: "Henri Maudit", icon: "icons/Spider Cursed.png", locationRegion: Region.SouthernSwamp, locationSpecific: "Swamp Spider House",
    description: "A wealthy man who traveled to the swamp in search of even greater fortune. He was allegedly told that he would find a mansion inside of the swamp that held “more gold than even he could spend.” When he found it though, he was cursed and transformed into a deformed form like a skulltula. He will offer a great deal to anyone who can break his curse.", 
    schedule: "All Day: Swamp Spider House.",
    defaultActivity: "Cursed", defaultLocation: "Swamp Spider House",
    pages: "41", quests: ["q41"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Fearful_Spider_House",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "06:00", location: "Swamp Spider House", title: "Cursed", description: "Trapped in spider form." }
    ]
  },

  // --- NORTHERN MOUNTAIN ---
  {
    id: "smiths", name: "The Smithies (Zubora & Gabora)", icon: "icons/Zubora.png", locationRegion: Region.NorthernMountain, locationSpecific: "Mountain Smithy",
    description: "A pair of long time business partners. Zubora is the shorter front man of the business who works with the customers and handles the detail work. Gabora is a hulking monster of a man wearing a mask who takes care of the heavy lifting and the forging. The two are talented smiths, eager to test the limits of their capabilities and make a tidy profit at the same time.", 
    schedule: "7:00 am-10:00 pm: Mountain Smithy.",
    defaultActivity: "Resting", defaultLocation: "Mountain Smithy",
    pages: "53", quests: ["q49", "q23"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Mountain_Smithy",
    scheduleEvents: [
      { day: 'All', start: "07:00", end: "22:00", location: "Mountain Smithy", title: "Forging", description: "Hammering away." }
    ]
  },
  {
    id: "goron-child", name: "Kogoro (Goron Child)", icon: "icons/Goron Child.png", locationRegion: Region.NorthernMountain, locationSpecific: "Goron Shrine",
    description: "The son of the Goron Elder, Kogoro has been doted upon for being the most recent birth in the goron village in some time. However, with the death of the Goron hero Darmani and the departure of his father to try and quell the winds on Snowhead, the young goron has become absolutely insufferable and cries ceaselessly.", 
    schedule: "All Day: Goron Shrine (Crying).",
    defaultActivity: "Crying/Sleeping", defaultLocation: "Goron Shrine",
    pages: "55", quests: ["mq2-1", "q47-1"], connections: ["Goron Elder"], wikiLink: "https://zelda.fandom.com/wiki/Elder%27s_Son",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "24:00", location: "Goron Shrine", title: "Son Crying", description: "Crying loudly in the shrine."} 
    ]
  },
  {
    id: "goron-elder", name: "Rogoro (Goron Elder)", icon: "icons/Goron Elder.png", locationRegion: Region.NorthernMountain, locationSpecific: "Mountain Village",
    description: "The elder goron, serving both a spiritual and political function. In earlier times, Rogoro was able to defer most of his active responsibilities to Darmani III. But with the goron hero’s death, Rogoro was forced to make his elderly body step up to try and protect his people.", 
    schedule: "Frozen on lake until thawed.",
    defaultActivity: "Frozen/Recovering", defaultLocation: "Mountain Village (Lake)",
    pages: "55", quests: ["mq2-1", "q47-1"], connections: ["Goron Child"], wikiLink: "https://zelda.fandom.com/wiki/Goron_Elder",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "24:00", location: "Mountain Village", title: "Elder Frozen", description: "Frozen in a block of ice.", condition: { type: 'requires_step_not', stepId: 'mq2-2'} }
    ]
  },
  {
    id: "darmani", name: "Darmani III", icon: "icons/Goron.png", locationRegion: Region.NorthernMountain, locationSpecific: "Goron Graveyard",
    description: "Ghost of the Goron Hero. Died trying to reach Snowhead.", schedule: "All Day: Goron Graveyard.",
    defaultActivity: "Haunting", defaultLocation: "Goron Graveyard",
    pages: "53", quests: ["q46"], connections: ["Goron Elder"], wikiLink: "https://zelda.fandom.com/wiki/Darmani",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "24:00", location: "Goron Graveyard", title: "Darmani Ghost", description: "Haunting his grave."} 
    ]
  },
  {
    id: "hungry-goron", name: "Hungry Goron", icon: "icons/Goron.png", locationRegion: Region.NorthernMountain, locationSpecific: "Mountain Village",
    description: "Goron stuck on a ledge, starving. Wants rock sirloin.", schedule: "All Day: Mountain Village (Ledge).",
    defaultActivity: "Starving", defaultLocation: "Mountain Village Ledge",
    pages: "53", quests: ["q47-2"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Hungry_Goron",
    scheduleEvents: [
       { day: 'All', start: "06:00", end: "06:00", location: "Mountain Village", title: "Starving", description: "Stuck on ledge." }
    ]
  },

  // --- WESTERN SEA ---
  {
    id: "lago", name: "Professor Lago Mizuumi", icon: "icons/Ocean Researcher.png", locationRegion: Region.WesternSea, locationSpecific: "Marine Research Lab",
    description: "The professor studies the ecosystems of the oceans and maintains several tanks of water that preserve perfect atmospheric conditions for the local waters.", 
    schedule: "All Day: Marine Research Lab.",
    defaultActivity: "Researching", defaultLocation: "Marine Research Lab",
    pages: "67", quests: ["q3-1"], connections: ["Mikau"], wikiLink: "https://zelda.fandom.com/wiki/Marine_Research_Lab",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "20:00", location: "Marine Research Lab", title: "Researching", description: "Feeding fish." }
    ]
  },
  {
    id: "pescador", name: "Pescador Fischer", icon: "icons/Fisherman.png", locationRegion: Region.WesternSea, locationSpecific: "Fisherman's Hut",
    description: "The most accomplished fisherman on the western coast, Pescador used to spend most of his time on the ocean with his boat, but now he spends most of his time on shore. He has a particular obsession with the Gerudo pirates and longs to get up close with one of those local beauties.", 
    schedule: "All Day: Fisherman's Hut (Displaying Seahorse).",
    defaultActivity: "Idling", defaultLocation: "Fisherman's Hut",
    pages: "67", quests: ["q53", "q60"], connections: ["Pirate Queen Aveil"], wikiLink: "https://zelda.fandom.com/wiki/Fisherman",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "20:00", location: "Fisherman's Hut", title: "Fisherman", description: "Admiring his seahorse."} 
    ]
  },
  {
    id: "aveil", name: "Pirate Queen Aveil", icon: "icons/Aveil.png", locationRegion: Region.WesternSea, locationSpecific: "Pirates' Fortress",
    description: "The leader of the Gerudo Pirates. She is a canny manipulator, and good at keeping her people motivated. Aveil’s current obsession is the treasure she was told was hidden inside of the Great Bay Temple. Despite her many skills, Aveil has a crippling fear of bees.", 
    schedule: "All Day: Pirates' Fortress Throne Room.",
    defaultActivity: "Guarding Eggs", defaultLocation: "Pirates' Fortress",
    pages: "70", quests: ["q3-1"], connections: ["Skull Kid"], wikiLink: "https://zelda.fandom.com/wiki/Aveil",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "24:00", location: "Pirates' Fortress", title: "Aveil Guarding", description: "Guarding the dragon eggs."} 
    ]
  },
  {
    id: "beavers", name: "Norbert and Daggett (Beaver Bros)", icon: "icons/Beaver Old.png", locationRegion: Region.WesternSea, locationSpecific: "Grand Falls",
    description: "Two beavers who keep a fine collection of treasures inside of their dam. They enjoy racing through their dams above the waterfall and are extremely confident in their speed. They were visited not too long ago by Mikau, the zora hero, who hoped to get a magic bottle from the duo.", 
    schedule: "All Day: Beaver Dam (Waterfall Top).",
    defaultActivity: "Swimming/Racing", defaultLocation: "Beaver Dam",
    pages: "72", quests: ["q57"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Beaver",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "18:00", location: "Grand Falls", title: "Racing", description: "Swimming laps." }
    ]
  },
  {
    id: "mikau", name: "Mikau", icon: "icons/Mikau.png", locationRegion: Region.WesternSea, locationSpecific: "Great Bay Coast / Zora Hall",
    description: "Zora warrior and guitarist. Dying on the shore after failing to raid the pirates.", schedule: "Day 1: Dying on Great Bay Coast.",
    defaultActivity: "Dying/Dead", defaultLocation: "Great Bay Coast",
    pages: "258", quests: ["q51", "q59"], connections: ["Lulu", "Evan", "Japas"], wikiLink: "https://zelda.fandom.com/wiki/Mikau",
    scheduleEvents: [
      { day: 1, start: "06:00", end: "06:00", location: "Great Bay Coast", title: "Mikau Dying", description: "Washed up on the shore, critically injured."} 
    ]
  },
  {
    id: "lulu", name: "Lulu", icon: "icons/Lulu.png", locationRegion: Region.WesternSea, locationSpecific: "Zora Hall",
    description: "The lead singer of the Indigo-Gos, she recently gave birth to a clutch of eggs that were stolen by gerudo pirates. The shock of what happened has rendered her completely mute.", 
    schedule: "All Day: Zora Hall (Gazing at sea).",
    defaultActivity: "Gazing/Mourning", defaultLocation: "Zora Hall (Outside)",
    pages: "72", quests: ["q3-1"], connections: ["Mikau", "Evan"], wikiLink: "https://zelda.fandom.com/wiki/Lulu",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "24:00", location: "Zora Hall", title: "Lulu Gazing", description: "Staring out at the ocean, voiceless."} 
    ]
  },
  {
    id: "evan", name: "Evan", icon: "icons/Evan.png", locationRegion: Region.WesternSea, locationSpecific: "Zora Hall",
    description: "The band leader of the Indigo-Gos, he’s also their lead composer. His biggest frustration, other than their upcoming gig being canceled, is that the band is mostly known for songs popularized by the band’s old lineup, nothing new.", 
    schedule: "All Day: Zora Hall (Room).",
    defaultActivity: "Composing", defaultLocation: "Zora Hall (Room)",
    pages: "72", quests: ["q59", "q23"], connections: ["Lulu", "Japas", "Tijo"], wikiLink: "https://zelda.fandom.com/wiki/Evan",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "22:00", location: "Zora Hall", title: "Evan Composing", description: "Writing songs in his room."} 
    ]
  },
  {
    id: "japas", name: "Japas", icon: "icons/Japas.png", locationRegion: Region.WesternSea, locationSpecific: "Zora Hall",
    description: "Japas is the bassist for the Indigo-Gos. He’s a good composer and likes to take his spare time in jam sessions with the band’s other members, trying to write a hit that he can actually get Evan to listen to.", 
    schedule: "All Day: Zora Hall (Room).",
    defaultActivity: "Jamming", defaultLocation: "Zora Hall (Room)",
    pages: "72", quests: ["q59", "q23"], connections: ["Evan", "Mikau"], wikiLink: "https://zelda.fandom.com/wiki/Japas",
    scheduleEvents: [
      { day: 'All', start: "10:00", end: "20:00", location: "Zora Hall", title: "Japas Jamming", description: "Playing bass in his room."} 
    ]
  },
  {
    id: "tijo", name: "Tijo", icon: "icons/Tijo.png", locationRegion: Region.WesternSea, locationSpecific: "Zora Hall",
    description: "The drummer for the Indigo-Gos, Tijo is a laid-back, calm, and rather heavy-set zora who spends most of his time just banging out rhythms on his drums.", 
    schedule: "All Day: Zora Hall (Room).",
    defaultActivity: "Drumming/Sleeping", defaultLocation: "Zora Hall (Room)",
    pages: "72", quests: ["q59"], connections: ["Evan"], wikiLink: "https://zelda.fandom.com/wiki/Tijo",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "22:00", location: "Zora Hall", title: "Tijo Drumming", description: "Practicing drums." }
    ]
  },
  
  // --- EASTERN CANYON ---
  {
    id: "poe-collector", name: "The Poe Collector", icon: "icons/Poe Collector.png", locationRegion: Region.EasternCanyon, locationSpecific: "Spirit House / Canyon Pass",
    description: "A mysterious figure seen all over Ikana Canyon. He will first be seen keeping watch over the pass, waiting for someone to prove they’re capable enough to face the spirits of Ikana. Little is known about the Poe Collector or their identity, but there are several theories. Some believe that he is yet another ghost, that he was a soldier from the kingdom, or that he is the last living member of the Ikana Royal Family. Regardless of his origin, he is not a hostile entity and seems to want the kingdom to be put to rest.", 
    schedule: "Canyon Pass / Spirit House.",
    defaultActivity: "Waiting", defaultLocation: "Canyon Pass",
    pages: "83", quests: ["q65"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Poe_Collector",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "18:00", location: "Canyon Pass", title: "Watching", description: "Guarding the pass." },
      { day: 'All', start: "18:00", end: "06:00", location: "Spirit House", title: "Hosting Game", description: "Running the Poe challenge." }
    ]
  },
  {
    id: "keeta", name: "Captain Keeta", icon: "icons/Captain Keeta.png", locationRegion: Region.EasternCanyon, locationSpecific: "Ikana Graveyard",
    description: "The reanimated body of the last commander of the Ikana Military. He was the leader of all the soldiers that have now become stalfos in living death, and his presence still carries its import with those beings. The captain hopes to return to rest, but is unwilling to do so unless he can pass on his authority to someone worthy.", 
    schedule: "Night: Patrolling Graveyard.",
    defaultActivity: "Slumbering", defaultLocation: "Ikana Graveyard (Grave)",
    pages: "84", quests: ["q61"], connections: ["Igos du Ikana"], wikiLink: "https://zelda.fandom.com/wiki/Captain_Keeta",
    scheduleEvents: [
      { day: 'All', start: "20:00", end: "04:00", location: "Ikana Graveyard", title: "Captain Keeta Patrol", description: "Patrolling the graveyard.", condition: { type: 'requires_step_not', stepId: 'q61-1'} }
    ]
  },
  {
    id: "dampe", name: "Dampé", icon: "icons/Dampe.png", locationRegion: Region.EasternCanyon, locationSpecific: "Ikana Graveyard",
    description: "The last in a long line of crypt keepers that once served the Ikana Kings. It could be argued that this elderly, malformed, widower is the last living subject of the Ikana Kingdom. Dampé is terrified of ghosts, and the rise of the undead in Ikana canyon has been nerve wracking for him, but he does his best to properly care for the memorials he oversees.", 
    schedule: "Day: Graveyard.\nNight: Cabin.",
    defaultActivity: "Hiding", defaultLocation: "Gravedigger's Cabin",
    pages: "84", quests: ["q62"], connections: [], wikiLink: "https://zelda.fandom.com/wiki/Dampe",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "18:00", location: "Ikana Graveyard", title: "Digging", description: "Tending graves." },
      { day: 'All', start: "18:00", end: "06:00", location: "Gravedigger's Cabin", title: "Hiding", description: "Avoiding ghosts." }
    ]
  },
  {
    id: "flat", name: "Flat", icon: "icons/Flat.png", locationRegion: Region.EasternCanyon, locationSpecific: "Ikana Graveyard",
    description: "The spirit of one of the two royal composers. When his brother, the other composer, Sharp went mad, he locked his brother under the graveyard and his spirit haunts the crypt where he was imprisoned, working on a spell that could undo the damage his brother caused.", 
    schedule: "All Day: Beneath Graveyard.",
    defaultActivity: "Haunting", defaultLocation: "Beneath Graveyard",
    pages: "84", quests: ["q62-1"], connections: ["Sharp"], wikiLink: "https://zelda.fandom.com/wiki/Flat",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "06:00", location: "Beneath Graveyard", title: "Haunting", description: "Trapped in crypt." }
    ]
  },
  {
    id: "sharp", name: "Sharp", icon: "icons/Sharp.png", locationRegion: Region.EasternCanyon, locationSpecific: "Spring Water Cave",
    description: "One of the two “composer brothers” of the Ikana Kingdom. When the war started to turn, Sharp went insane. When his brother Flat tried to stop his acts, Sharp had him imprisoned in the Ikana Graveyard. Then stopped up the spring that fed the river of the Ikana Kingdom. When Twinmold resurrected his spirit, the spring was stopped up again and he haunts it still.", 
    schedule: "All Day: Spring Water Cave.",
    defaultActivity: "Haunting", defaultLocation: "Spring Water Cave",
    pages: "86", quests: ["q63-1"], connections: ["Flat"], wikiLink: "https://zelda.fandom.com/wiki/Sharp",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "06:00", location: "Spring Water Cave", title: "Haunting", description: "Cursing the spring." }
    ]
  },
  {
    id: "igos", name: "Igos du Ikana", icon: "icons/Igos Du Ikana.png", locationRegion: Region.EasternCanyon, locationSpecific: "Ancient Castle of Ikana",
    description: "The risen king of Ikana Kingdom. Prone to poetry, Igos dreams of using the undeath of himself and his followers to rebuild his kingdom and expand its borders further than they had ever stretched before. Igos is a skilled warrior and is attended to by two skeletal warriors and entertained by dancing gibdos.", 
    schedule: "All Day: Throne Room.",
    defaultActivity: "Ruling", defaultLocation: "Ikana Castle Throne Room",
    pages: "86", quests: ["mq4-1"], connections: ["Captain Keeta"], wikiLink: "https://zelda.fandom.com/wiki/Igos_du_Ikana",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "24:00", location: "Ikana Castle", title: "King Igos", description: "Waiting in his castle."} 
    ]
  },
  {
    id: "vater", name: "Vater Otou", icon: "icons/Pamelas Father Cursed.png", locationRegion: Region.EasternCanyon, locationSpecific: "Music Box House",
    description: "A researcher of the supernatural who moved to Ikana Canyon to study the spirits there. He ventured too close to the well and was cursed by the Gibdos. He is slowly transforming into one of the undead monsters he studied. His daughter Pamela keeps him locked in the basement to protect him and others.",
    schedule: "All Day: Music Box House Basement.",
    defaultActivity: "Cursed", defaultLocation: "Music Box House Basement",
    pages: "85", quests: ["q63"], connections: ["Pamela"], wikiLink: "https://zelda.fandom.com/wiki/Pamela%27s_Father",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "06:00", location: "Music Box House Basement", title: "Cursed", description: "Locked in the basement." }
    ]
  },
  {
    id: "pamela", name: "Pamela", icon: "icons/Pamela.png", locationRegion: Region.EasternCanyon, locationSpecific: "Music Box House",
    description: "The daughter of the researcher Vater Otou. She is fiercely protective of her father and terrified of the Gibdos circling their house. She rarely leaves the house, only stepping out to check the water wheel that powers the music box keeping the Gibdos at bay.",
    schedule: "All Day: Music Box House (Hiding).",
    defaultActivity: "Hiding", defaultLocation: "Music Box House",
    pages: "85", quests: ["q63"], connections: ["Vater Otou"], wikiLink: "https://zelda.fandom.com/wiki/Pamela",
    scheduleEvents: [
      { day: 'All', start: "06:00", end: "18:00", location: "Music Box House", title: "Pamela Outside", description: "Checking the water flow.", condition: { type: 'requires_step_not', stepId: 'q63-1'} },
      { day: 'All', start: "18:00", end: "06:00", location: "Music Box House", title: "Pamela Hiding", description: "Protecting her father.", condition: { type: 'requires_step_not', stepId: 'q63-1'} }
    ]
  },
  {
    id: "skull-kid", name: "Skull Kid", icon: "icons/Skull Kid Masked.png", locationRegion: Region.ClockTown, locationSpecific: "Clock Tower",
    description: "A mischievous imp who stole Majora's Mask from the Happy Mask Salesman. The mask's dark power has possessed him, amplifying his pranks into world-threatening disasters. He waits atop the Clock Tower for the moon to fall.",
    schedule: "Clock Tower Roof (Final Day Midnight).",
    defaultActivity: "Waiting", defaultLocation: "Clock Tower Roof",
    pages: "95", quests: ["mq-end"], connections: ["Tatl", "Tael"], wikiLink: "https://zelda.fandom.com/wiki/Skull_Kid",
    scheduleEvents: [
      { day: 3, start: "18:00", end: "06:00", location: "Clock Tower Roof", title: "Waiting", description: "Calling down the moon." }
    ]
  }
];
