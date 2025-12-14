
import { Quest, Region } from '../types';
import { ITEMS, SPELLS } from './constants';

export const quests: Quest[] = [
  // ... Existing Quests 1-22 ...
  {
    id: "mq1", questNumber: 1, isMainQuest: true, title: "Purify the Southern Swamp", region: Region.SouthernSwamp,
    description: "The Skull Kid, using Majora's Mask, cursed the four guardians of Termina and sealed and warped their power inside of masks, transforming them into monsters. The swamp's guardian giant has been turned into a tribal warrior, and their divine power has been turned into a deadly poison that is slowly contaminating the swamp's water.",
    pageReference: "140",
    rewards: [ITEMS.odolwaRemains, SPELLS.oath],
    steps: [
      {
        id: "mq1-1",
        title: "Hear the Monkey's Plea",
        description: "The deku king, after the disappearance of his daughter, has pinned the blame on the monkeyfolk that accompanied the Deku Princess to Woodfall Temple. And imprisoned the monkey inside of the deku throne room.\n\nAdventurers who sneak into the monkey prison (accessible through a window on the eastern palace gardens) can learn the sonata of awakening from the captured monkey.\n\nAlternatively, adventurers can offer to the Deku King to attempt to rescue the missing princess and the king will teach adventurers the sonata if they succeed a DC 15 Charisma (Persuasion) check. The king mistrusts outsiders and any non-deku adventurers will make the check with disadvantage.",
        location: "Deku Palace",
        xpReward: 150,
        itemRewards: [SPELLS.sonata],
        curiosityShopUnlock: { itemName: "Cape of the Mountebank", id: "si-1" },
        pageReference: "140"
      },
      {
        id: "mq1-2",
        title: "Defeat Odolwa",
        description: "The boss within the great chamber of Woodfall Temple, Odolwa is a warped guardian spirit or deity. Defeating Odolwa allows the victors to claim play the song of healing to release the guardian giant and claim Odolwa's Remains. As soon as the guardian is freed, the poison of Odolwa is swiftly purged from the swamp.\n\nOn freeing the guardian, it will appear as a vision to the adventurers. It will speak in a mixture of giant and celestial, requiring an understanding of both languages to adequately understand, and tell listeners of its peril. On hearing the giant out, or simply at the end of the speech, it will teach the listeners the oath to order. Though, only adventurers, or an adventuring team, who speak both languages will understand the lesson being taught.",
        location: "Woodfall Temple",
        xpReward: 350,
        itemRewards: [ITEMS.odolwaRemains, SPELLS.oath],
        curiosityShopUnlock: { itemName: "Dancing Sword", id: "si-1-2" },
        pageReference: "140",
        affectsTimeline: true,
        prerequisiteStepId: "mq1-1"
      }
    ],
    failureConsequence: "If Odolwa is not defeated by the close of the third day, their poison will spread throughout Termina. The Deku king will kill the monkey and start a war between the deku and the monkeyfolk of the southern swamp. Both parties will die though, as the poison renders the swamp inaccessible, and it then spreads to the whole of Termina."
  },
  {
    id: "mq2", questNumber: 2, isMainQuest: true, title: "Purify the Northern Mountain", region: Region.NorthernMountain,
    description: "The Skull Kid, using Majora's Mask, cursed the four guardians of Termina and sealed and warped their power inside of masks, transforming them into monsters. The mountain's guardian giant has been turned into a mechanical beast, and their divine power has been turned into a deadly cold that has been burying the mountain in snow and sealing it in ice.",
    pageReference: "140",
    rewards: [ITEMS.gohtRemains, SPELLS.oath],
    steps: [
      {
        id: "mq2-1",
        title: "Calm the Goron Child",
        description: "The Goron Elder has gone missing as they attempt to travel to Snowhead Temple and the Elder's Son, lost and afraid, has been unable to stop crying. Unfortunately, the entire Goron population of the Goron Village has held up inside the Goron shrine and not only does the child's crying make it impossible for anyone to get any rest, it risks an avalanche.\n\nAdventurers can find the Goron Elder, obscured by snow, with a DC 15 Wisdom (Survival) check. He is frozen and near death on the frozen lake near the between the goron village and mountain village. They will need to be healed and recovered. They refuse to return to the goron village so long as Snowhead is cursed, but will teach adventurers the goron lullaby to quiet the child.\n\nAlternatively, a calm emotions spell or a DC 15 Charisma (Performance) check will calm the Goron child enough for them to teach adventurers the song.",
        location: "Goron Shrine / Mountain Village",
        xpReward: 150,
        itemRewards: [SPELLS.goron],
        curiosityShopUnlock: { itemName: "Horn of Blasting", id: "si-2" },
        pageReference: "140",
        characterId: "goron-child"
      },
      {
        id: "mq2-2",
        title: "Defeat Goht",
        description: "The boss within the great chamber of Snowhead Temple, Goht is a warped guardian spirit or deity. Defeating Goht allows the victors to claim Goht's Remains, and release the guardian giant. As soon as the guardian is freed, the unnatural freeze ends, and any snow created by Goht's influence melts.\n\nOn freeing the guardian, it will appear as a vision to the adventurers. It will speak in a mixture of giant and celestial, requiring an understanding of both languages to adequately understand, and tell listeners of its peril. On hearing the giant out, or simply at the end of the speech, it will teach the listeners the oath to order. Though, only adventurers, or an adventuring team, who speak both languages will understand the lesson being taught.",
        location: "Snowhead Temple",
        xpReward: 350,
        itemRewards: [ITEMS.gohtRemains, SPELLS.oath],
        curiosityShopUnlock: { itemName: "Animated Shield", id: "si-2-2" },
        pageReference: "141",
        affectsTimeline: true,
        prerequisiteStepId: "mq2-1"
      }
    ],
    failureConsequence: "If Goht is not defeated by the close of the third day, the cold will lock the entire mountain in ice. Every living thing there will be frozen solid before the cold spreads further down."
  },
  {
    id: "mq3", questNumber: 3, isMainQuest: true, title: "Purify the Western Seas", region: Region.WesternSea,
    description: "The Skull Kid, using Majora's Mask, cursed the four guardians of Termina and sealed and warped their power inside of masks, transforming them into monsters. The ocean's guardian giant has been turned into a vicious fish, and their divine power has been turned into a miasmatic heat that is slowly boiling the region's water.",
    pageReference: "141",
    rewards: [ITEMS.gyorgRemains, SPELLS.oath],
    steps: [
      {
        id: "mq3-1",
        title: "Recover the Zora's Voice",
        description: "The Zora singer Lulu had her eggs stolen by Gerudo pirates who were told by the skull kid that they held the secret to accessing the great treasure in Great Bay Temple. There are two special temperature-controlled water tanks located throughout the coast, one in the ocean research laboratory, and one in the Gerudo Fortress. If all seven eggs are collected in one place the eggs will form the notes for the new wave bossa nova. Four eggs are located in the Gerudo pirate's fortress, three are in the underwater depths near pinnacle rock.\n\nThe Gerudo pirates are initially hostile to intruders and have been swayed by the Skull Kid into holding the zora eggs hostage and collecting the rest. However, Aveil can be convinced to work with adventurers and temporarily end hostilities with the Zora with a DC 17 Charisma (Persuasion) check along with a bribe or 'tribute' worth at least 1,000 GP.",
        location: "Pirates' Fortress / Pinnacle Rock",
        xpReward: 150,
        itemRewards: [SPELLS.bossa],
        curiosityShopUnlock: { itemName: "Tentacle Rod", id: "si-3" },
        pageReference: "141",
        characterId: "aveil"
      },
      {
        id: "mq3-2",
        title: "Defeat Gyorg",
        description: "The boss within the great chamber of Great Bay Temple, Gyorg is a warped guardian spirit or deity. Defeating Gyorg allows the victors to claim Gyorg's Remains, and release the guardian giant. As soon as the guardian is freed, the climate of Termina's seas is immediately returned to normal.\n\nOn freeing the guardian, it will appear as a vision to the adventurers. It will speak in a mixture of giant and celestial, requiring an understanding of both languages to adequately understand, and tell listeners of its peril. On hearing the giant out, or simply at the end of the speech, it will teach the listeners the oath to order. Though, only adventurers, or an adventuring team, who speak both languages will understand the lesson being taught.",
        location: "Great Bay Temple",
        xpReward: 350,
        itemRewards: [ITEMS.gyorgRemains, SPELLS.oath],
        curiosityShopUnlock: { itemName: "Staff of Thunder and Lightning", id: "si-3-2" },
        pageReference: "141",
        affectsTimeline: true,
        prerequisiteStepId: "mq3-1"
      }
    ],
    failureConsequence: "If Gyorg is not defeated by the close of the third day, all life in the oceans will die, the zora and the gerudo will gradually starve, as will the rest of the region."
  },
  {
    id: "mq4", questNumber: 4, isMainQuest: true, title: "Purify the Eastern Canyon", region: Region.EasternCanyon,
    description: "The Skull Kid, using Majora's Mask, cursed the four guardians of Termina and sealed and warped their power inside of masks, transforming them into monsters. The canyon's guardian giant has been turned into a pair of great worms, and their divine power has been turned into a curse of undeath that has raised the fallen kingdom of the canyon.",
    pageReference: "141",
    rewards: [ITEMS.twinmoldRemains, SPELLS.oath],
    steps: [
      {
        id: "mq4-1",
        title: "Put the Undead King to Rest",
        description: "The Ikana king Igos du Ikana has been resurrected thanks to the power of Twinmold and believes that, with his new power, he can restore the Ikana Kingdom with this new strength. Then, once they have restored the glory of Ikana, they can sweep out into Termina. He believes that this second chance at 'life' and the strength given to him give him the right to rule. However, the king is honorable and, if convinced, will allow adventurers to challenge his right to conquest.\n\nAdventurers must defeat first the undead king's retainers, then the king himself. The battle will be to the death, as the undead royals have little fear of dying. If adventurers succeed, the king will teach them the elegy of emptiness.\n\nIf the Ikana king's spirit is dispelled, purged, or otherwise removed from the material plane during the course of the battle, he will be unable to teach adventurers the elegy.",
        location: "Ikana Castle",
        xpReward: 150,
        itemRewards: [SPELLS.elegy],
        curiosityShopUnlock: { itemName: "Mace of Disruption", id: "si-4" },
        pageReference: "142",
        characterId: "igos"
      },
      {
        id: "mq4-2",
        title: "Defeat Twinmold",
        description: "The boss within the great chamber of Stone Tower Temple, Twinmold is a warped guardian spirit or deity. Defeating Twinmold allows the victors to claim Twinmold's Remains, and release the guardian giant. As soon as the guardian is freed, the curse of undeath is ended and the undead in Ikana Canyon are all purified.\n\nOn freeing the guardian, it will appear as a vision to the adventurers. It will speak in a mixture of giant and celestial, requiring an understanding of both languages to adequately understand, and tell listeners of its peril. On hearing the giant out, or simply at the end of the speech, it will teach the listeners the oath to order. Though, only adventurers, or an adventuring team, who speak both languages will understand the lesson being taught.",
        location: "Stone Tower Temple",
        xpReward: 350,
        itemRewards: [ITEMS.twinmoldRemains, SPELLS.oath],
        curiosityShopUnlock: { itemName: "Carpet of Flying", id: "si-4-2" },
        pageReference: "142",
        affectsTimeline: true,
        prerequisiteStepId: "mq4-1"
      }
    ],
    failureConsequence: "If Twinmold is not defeated at the close of the third day, the undead that occupy Ikana will gradually move out into the whole of Termina, seeking to rebuild their old kingdom into an empire of the dead."
  },
  {
    id: "q5", questNumber: 5, title: "Inter the Deku Explorer", region: Region.ClockTown,
    description: "In the Lost Woods tunnels underneath Clock Town, a twisted tree stands a short ways beyond the entrance to the clock tower's works. This tree is the remains of a Deku hero that went to seek assistance with the poison swamp from the Deku clan said to live beyond the lost woods, and was cursed by the Skull Kid. Anyone who looks closely could swear that the little tree is weeping sap.",
    pageReference: "142",
    rewards: [ITEMS.dekuMask],
    steps: [{
      id: "q5-1",
      title: "Heal the Twisted Tree",
      description: "Adventurers who play the song of healing for the tree will receive the races’ mask (deku), and the crying will stop. This deku had proficiency with woodwinds and this version of the mask will confer that proficiency.",
      location: "Under Clock Tower",
      xpReward: 120,
      itemRewards: [ITEMS.dekuMask],
      curiosityShopUnlock: { itemName: "Staff of the Woodlands", id: "si-5" },
      pageReference: "142"
    }]
  },
  {
    id: "q6", questNumber: 6, title: "Restore the Great Fairies", region: Region.World,
    description: "The great fairies of Termina, five old and powerful fey, have been shattered by the skull kid. Their bodies divided into independent 'stray fairies.' If these fairies are collected and brought back to the fairy fountains where the great fairies reside, the broken fey may be restored. In gratitude, the great fairies will offer their rescuers a boon. However, the great fairies are powerful and perceptive enough that they can sense the temporal energy that adventurers are infused with, and can sense if the strength of their boon is already present. They are also intelligent enough to deduce what that means. The great fairies will not grant a boon to any adventurer that already possesses a boon from them.",
    pageReference: "142",
    rewards: [{ name: "Great Fairy's Sword", type: "Item" as const, description: "A legendary greatsword." }, { name: "Various Blessings", type: "Other" as const, description: "Boons granted by each Fairy." }],
    steps: [
      { id: "q6-1", title: "Restore Great Fairy of Clock Town", description: "The great fairy of Clock Town is the great fairy of magic, when all the stray fairies of Clock Town have been returned to Clock Town's fairy fountain. The great fairy will reform, regaining her shape and her fey power. In gratitude she will offer adventurers blessings related to Magic and Spells.", xpReward: 20, location: "N. Clock Town", curiosityShopUnlock: { itemName: "Necklace of Prayer Beads", id: "si-6" }, pageReference: "143" },
      { id: "q6-2", title: "Restore Great Fairy of Woodfall", description: "The great fairy of Woodfall is the great fairy of power. Retrieving the ten stray fairies inside of Woodfall temple and bringing them to the great fairy's fountain of Woodfall will reform the shattered fey, restoring her body and her power. Once she is whole, she will offer the adventurers who saved her blessings related to Combat Power and Form.", xpReward: 20, location: "Woodfall", curiosityShopUnlock: { itemName: "Sun Blade", id: "si-6b" }, pageReference: "143" },
      { id: "q6-3", title: "Restore Great Fairy of Snowhead", description: "The great fairy of Snowhead is the great fairy of wisdom. Retrieving the ten stray fairies inside of Snowhead temple and bringing them to the great fairy's fountain of Snowhead will reform the shattered fey, restoring her body and her power. Once she is whole, she will offer the adventurers who saved her blessings related to Magic Resistance and Mana.", xpReward: 20, location: "Snowhead", curiosityShopUnlock: { itemName: "Mantle of Spell Resistance", id: "si-6c" }, pageReference: "144" },
      { id: "q6-4", title: "Restore Great Fairy of Great Bay", description: "The great fairy of the Great Bat is the great fairy of courage. Retrieving the ten stray fairies inside of Great Bay temple and bringing them to the great fairy's fountain of Great Bay will reform the shattered fey, restoring her body and her power. Once she is whole, she will offer the adventurers who saved her blessings related to Fortitude and Protection.", xpReward: 20, location: "Zora Cape", curiosityShopUnlock: { itemName: "Bracers of Defense", id: "si-6d" }, pageReference: "144" },
      { id: "q6-5", title: "Restore Great Fairy of Stone Tower", description: "The great fairy of the Stone Tower is the great fairy of kindness. Retrieving the ten stray fairies inside of Stone Tower Temple and bringing them to the great fairy's fountain of Stone Tower will reform the shattered fey, restoring her body and her power. Once she is whole, she will offer the adventurers who saved her blessings related to Stats and Fortune.", xpReward: 20, location: "Ikana Canyon", curiosityShopUnlock: { itemName: "Wings of Flying", id: "si-6e" }, pageReference: "144" },
      { id: "q6-6", title: "All Great Fairies Restored", description: "If a great fairy is restored while all four of her sisters have also been restored during the same temporal cycle, that fairy will gift adventurers with the Great Fairy’s sword.", xpReward: 20, location: "Any Fountain", itemRewards: [{ name: "Great Fairy's Sword", type: "Item" as const, description: "Legendary Greatsword." }], pageReference: "145" }
    ],
    failureConsequence: "If the great fairies are not restored by the close of the third day, there is little consequence to so long as Termina is saved. The stray fairies will gradually drift back together over a period of about a week."
  },
  {
    id: "q7", questNumber: 7, title: "The Bomber's Notebook", region: Region.ClockTown,
    description: "The young boy frequently found in North Clock Town, Jim Bombazu, has been practicing with his blowgun to 'stay ready for trouble.' He is the leader of the Bombers and, if adventurers manage to convince him that they are trying to help settle the problems in Termina, he will offer membership in the society.",
    pageReference: "145",
    rewards: [{ name: "Bomber's Notebook", type: "Item" as const, description: "Tracks schedule and quests." }, { name: "Secret Code", type: "Other" as const, description: "Code to enter the hideout (12453)." }],
    steps: [{
      id: "q7-1",
      title: "Catch the Bombers",
      description: "Jim will call the other four members of the Bomber's Society and all five will hide in different areas of Clock Town. Adventurers have one hour to find all five members, making Wisdom (Perception) checks in each region against the kid's Dexterity (Stealth) checks, then tagging the kids to mark them as 'out.' The kids have a +2 to Stealth and may take the dash action as a reaction once during a chase.\n\nIf you manage to catch all four kids within the time limit, Jim will award you with the Bomber's Notebook, and teach you their secret code, 12453.",
      location: "Clock Town",
      characterId: "jim",
      xpReward: 120,
      itemRewards: [{ name: "Bomber's Notebook", type: "Item" as const }],
      curiosityShopUnlock: { itemName: "Stone of Good Luck", id: "si-7" },
      pageReference: "145"
    }]
  },
  {
    id: "q8", questNumber: 8, title: "Business Scrub Scramble", region: Region.World,
    description: "Across Termina, five enterprising capitalist deku scrubs have set up shops. However, as the grass is always greener, they all feel they would be happier in different locations. They're all willing to sell their properties, if the right incentive could be offered.",
    pageReference: "145",
    rewards: [ITEMS.heart],
    steps: [
      { id: "q8-1", title: "Town Deku Flower", description: "The business scrub that has set up shop in Clock Town is looking to move somewhere warmer, but wants to have some assurances of financial stability before they move. They will sell a deed to their small plot for 1,000 rupees. Alternatively, they will sell the property for 200 rupees if the buyer can add a moon’s tear gem to the bargain.\n\nCurious adventurers can discover a piece of heart hidden in the soft soil underneath the business scrub’s plot.", xpReward: 24, location: "S. Clock Town", curiosityShopUnlock: { itemName: "Winged Boots", id: "si-8a" }, itemRewards: [{ name: "Town Title Deed", type: "Item" as const }], pageReference: "145" },
      { id: "q8-2", title: "Swamp Deku Flower", description: "The deku scrub by the swamp tourism bureau is looking to sell his property and move somewhere dryer with more foot traffic, but mostly just looking to move out. They are willing to sell their plot for 1,000 rupees, but are willing to cut a deal for 200 rupees if the buyer throws in the deed to the Clock Town plot.\n\nCurious adventurers can discover a piece of heart hidden in the soft soil underneath the business scrub’s plot.", xpReward: 30, location: "Swamp Tourism", curiosityShopUnlock: { itemName: "Goggles of Night", id: "si-8b" }, itemRewards: [{ name: "Swamp Title Deed", type: "Item" as const }], pageReference: "146" },
      { id: "q8-3", title: "Mountain Deku Flower", description: "The business scrub by the Goron Shrine is homesick for the swamp and is looking for an excuse to cut their losses and move home. They are willing to sell their plot for 1,000 rupees, but are willing to cut a deal for 200 rupees if the buyer throws in the deed to the southern Swamp plot.\n\nCurious adventurers can discover a piece of heart hidden in the soft soil underneath the business scrub’s plot.", xpReward: 30, location: "Goron Village", curiosityShopUnlock: { itemName: "Decanter of Endless Water", id: "si-8c" }, itemRewards: [{ name: "Mountain Title Deed", type: "Item" as const }], pageReference: "146" },
      { id: "q8-4", title: "Ocean Deku Flower", description: "The business scrub inside the Zora Hall is tired of the thick smell of the ocean and the humidity and wants to move somewhere cooler and fresher. They are willing to sell their plot for 1,000 rupees, but are willing to cut a deal for 200 rupees if the buyer throws in the deed to the northern mountain plot.\n\nCurious adventurers can discover a piece of heart hidden in the soft soil underneath the business scrub’s plot.", xpReward: 30, location: "Zora Hall", curiosityShopUnlock: { itemName: "Robe of Useful Items", id: "si-8d" }, itemRewards: [{ name: "Ocean Title Deed", type: "Item" as const }], pageReference: "146" },
      { id: "q8-5", title: "Canyon Deku Flower", description: "The business scrub that established themselves in the Valley beneath the old kingdom is absolutely done with the arid heat and the lack of foot traffic, they want to move somewhere by the sea. They are willing to sell their plot for 1,000 rupees, but are willing to cut a deal for 200 rupees if the buyer throws in the deed to the western ocean plot.\n\nCurious adventurers can discover a piece of heart hidden in the soft soil underneath the business scrub’s plot.", xpReward: 30, location: "Ikana Canyon", itemRewards: [{ name: "200 Rupees", type: "Item" as const }, ITEMS.heart], pageReference: "146" }
    ]
  },
  // ... Quests 9-66 ...
  {
    id: "q9", questNumber: 9, title: "Bank Loyalty Program", region: Region.ClockTown,
    description: "The Clock Town bank, hoping to drum up support for their new banking initiatives, are offering incentives for those clients that deposit a certain amount of rupees into their accounts.",
    pageReference: "146",
    rewards: [{ name: "Clock Town Cheque Book", type: "Item" as const }, ITEMS.heart],
    steps: [
      { id: "q9-1", title: "A Special Gift From the Bank", description: "Any adventurers that make a one-time deposit of at least 200 rupees into the bank will be gifted a Clock Town Bank cheque book by the bank’s proprietor.", xpReward: 60, location: "West Clock Town", curiosityShopUnlock: { itemName: "Bag of Holding", id: "si-9a" }, itemRewards: [{ name: "Clock Town Cheque Book", type: "Item" as const, description: "Tracks bank balance across time." }], characterId: "banker", pageReference: "146" },
      { id: "q9-2", title: "Breaking the Bank", description: "When, after a deposit, a bank client has at least 2,000 rupees in their bank account, the banker will give out a piece of heart.", xpReward: 60, location: "West Clock Town", curiosityShopUnlock: { itemName: "Elemental Gem (Yellow Diamond)", id: "si-9b" }, itemRewards: [ITEMS.heart], prerequisiteStepId: "q9-1", characterId: "banker", pageReference: "146" }
    ]
  },
  {
    id: "q10", questNumber: 10, title: "Madame Aroma's Search", region: Region.ClockTown,
    description: "During the Skull Kid's rampage of mischief in Clock Town Kafei, the son of the mayor, vanished without a trace. His mother, sick with worry has been focused on discovering her son's whereabouts.",
    pageReference: "146",
    rewards: [ITEMS.kafeiMask, { name: "Bottle (Chateau Romani)", type: "Item" as const }],
    steps: [
      { id: "q10-1", title: "Find My Son!", description: "Madame Aroma has called for investigators to hunt for her missing son, Kafei. Any adventurers that arrive can say they came in answer to her posting. If adventurers manage to convince her with a DC 12 Charisma (Persuasion) check that they need more resources, she will provide investigators with Kafei's mask to help them find her son.", xpReward: 50, location: "Mayor's House", characterId: "madame-aroma", curiosityShopUnlock: { itemName: "Amulet of Proof against Detection and Location", id: "si-10a" }, itemRewards: [ITEMS.kafeiMask], pageReference: "146", day: 1, time: "10:00", endTime: "20:00", days: [1, 2] },
      { id: "q10-2", title: "Make a Special Delivery", description: "If adventurers receive the letter for Madame Aroma during Quest 24-6, they can take it to her. During the final day Madame Aroma can be found inside of the Milk Bar. She has been drinking there all day. Upon receipt of the letter from her son, she will purchase adventurers a magic bottle containing chateau Romani.", xpReward: 150, location: "Milk Bar", characterId: "madame-aroma", curiosityShopUnlock: { itemName: "Immovable Rod", id: "si-10b" }, itemRewards: [{ name: "Bottle (Chateau Romani)", type: "Item" as const }], day: 3, time: "10:00", endTime: "23:00", pageReference: "147", prerequisiteStepId: "q24-6" }
    ],
    failureConsequence: "If Madame Aroma does not get any word of her son’s life, she will remain in Clock Town as the moon comes down, essentially committing suicide."
  },
  {
    id: "q11", questNumber: 11, title: "A Stay at the Stock Pot Inn", region: Region.ClockTown,
    description: "Anju, the innkeeper and owner of the Stock Pot Inn has been driven to distraction by the disappearance of her finance and the recent departure of much of her staff. As such, she has had a hard time mixing up guests and reservations.",
    pageReference: "147",
    rewards: [{ name: "Room Key", type: "Item" as const }],
    steps: [{
      id: "q11-1",
      title: "Check In",
      description: "Between 2:00 PM and 4:00 PM on the first day a Goron guest by the name of Link is scheduled to arrive at the Stock Pot Inn. If an adventurer tells Anju their name is Link and that they have a reservation, she will give them a free room key for a room that has been reserved through the entire festival.\n\nThe Goron who was scheduled to arrive will actually be relieved, as the moon seems like a much more imminent threat in Clock Town than the cold did in the mountains. He will remain in Clock Town for the rest of the day, then return to the mountain.",
      xpReward: 120,
      day: 1,
      time: "14:00",
      endTime: "16:00",
      location: "Stock Pot Inn",
      characterId: "anju",
      curiosityShopUnlock: { itemName: "Hat of Disguise", id: "si-11" },
      itemRewards: [{ name: "Room Key", type: "Item" as const }],
      pageReference: "147"
    }]
  },
  {
    id: "q12", questNumber: 12, title: "A Challenge to Count On", region: Region.ClockTown,
    description: "Between 3 PM and 9 PM on the first and second days, the postman can be found inside of the small apartment in the back of the post office. He keeps the apartment open in case anyone comes in with postal business while he plays his timing game.",
    pageReference: "147",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q12-1",
      title: "Win Postman's Game",
      description: "The postman will challenge adventurers to beat his timing game, and they may pay 20 rupees to take on his challenge. The postman will show an hourglass timer that counts down ten seconds and then hide it from view and flip it. If adventurers who accept the challenge call 'time' precisely at the ten-second mark, he will reward them with a piece of heart. Otherwise they may try again.",
      xpReward: 120,
      location: "Post Office",
      characterId: "postman",
      curiosityShopUnlock: { itemName: "Headband of Intellect", id: "si-12" },
      itemRewards: [ITEMS.heart],
      day: 1,
      days: [1, 2],
      time: "15:00",
      endTime: "21:00",
      pageReference: "147"
    }]
  },
  {
    id: "q13", questNumber: 13, title: "A Melancholy Melody", region: Region.ClockTown,
    description: "Between 6 PM and midnight of the first and second day Guru-Guru can be found rehearsing with his instrument by the town's laundry pool. A DC 10 Wisdom (Insight) check will show that he is deeply preoccupied with something.",
    pageReference: "147",
    rewards: [ITEMS.bremenMask],
    steps: [{
      id: "q13-1",
      title: "Listen to Guru-Guru",
      description: "Adventurers who convince Guru-Guru to share his story with a DC 16 Charisma (Persuasion) check will find out that he used to be a performer for an animal circus. He played the music for the animals to perform to but felt jealous of the dog that played the circus' ring leader. Guru-Guru will confess that, in a fit of jealousy, he stole the mask the dog wore for the circus act and fled.\n\nAfter being allowed to vent about this issue, Guru-Guru will ask adventurers if they 'understand his plight,' adventurers can convince them they sincerely understand with either a successful DC 13 Charisma (Deception) or Charisma (Deception) check. If Guru-Guru is convinced of their sincerity, he will give the Bremen mask to the adventurers who listen.",
      xpReward: 120,
      location: "Laundry Pool",
      characterId: "guru-guru",
      curiosityShopUnlock: { itemName: "Helm of Comprehending Languages", id: "si-13" },
      itemRewards: [ITEMS.bremenMask],
      day: 1,
      days: [1, 2],
      time: "18:00",
      endTime: "24:00",
      pageReference: "147"
    }],
    failureConsequence: "If Guru-Guru doesn’t have any catharsis from sharing his story, his future performances will gradually become more stilted and awkward until he retires in shame."
  },
  {
    id: "q14", questNumber: 14, title: "A Midnight Attack", region: Region.ClockTown,
    description: "The thief Sakon has caught on to some word that the bomb shop owners will be transporting a new shipment of weapons and high quality gunpowder from the Gorons and has set up an ambush to steal them.",
    pageReference: "145",
    rewards: [ITEMS.blastMask, ITEMS.allNightMask],
    steps: [
      {
        id: "q14-1",
        title: "The Bomb Business",
        description: "At midnight of the first day (00:00 Day 1), the old lady from the Bomb Shop arrives in North Clock Town carrying merchandise for her son to sell. Sakon the thief attacks her, knocks her down, and runs off with the bomb bags.\n\nIf adventurers defeat Sakon (He will drop the bags and flee if he is reduced to half HP), the old lady will gift adventurers with the blast mask and continue to the bomb shop.",
        day: 1,
        time: "00:00", // Midnight Day 1
        endTime: "01:00",
        location: "N. Clock Town",
        characterId: "old-lady",
        xpReward: 150,
        itemRewards: [ITEMS.blastMask],
        curiosityShopUnlock: { itemName: "Circlet of Blasting", id: "si-14a" },
        affectsTimeline: true,
        pageReference: "147"
      },
      {
        id: "q14-2",
        title: "Something Else Snatched",
        description: "If the adventurers completed quest 14-1: The Bomb Business, the all-night mask will be made available for sale at the Curiosity Shop on the night of the third day.",
        day: 3,
        time: "22:00",
        endTime: "24:00",
        location: "Curiosity Shop",
        xpReward: 50,
        itemRewards: [ITEMS.allNightMask],
        curiosityShopUnlock: { itemName: "Gloves of Thievery", id: "si-14b" },
        prerequisiteStepId: "q14-1",
        pageReference: "148"
      }
    ],
    failureConsequence: "If the old woman is not protected, she will not be seriously harmed, but the weapons she is carrying will not be available for sale."
  },
  {
    id: "q15", questNumber: 15, title: "The Ghost of the Inn", region: Region.ClockTown,
    description: "Adventurers who go to the Stock Pot Inn's bathroom between midnight and 4 AM will discover that the inn's toilet is haunted. A disembodied hand stretches out from inside the toilet and will plead for paper.",
    pageReference: "148",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q15-1",
      title: "Give Paper",
      description: "If adventurers give the spirit any sort of paper, the ghost will give them a piece of heart.",
      xpReward: 120,
      location: "Stock Pot Inn Toilet",
      characterId: "toilet-hand",
      curiosityShopUnlock: { itemName: "Pipes of the Sewers", id: "si-15" },
      itemRewards: [ITEMS.heart],
      day: 1,
      days: [1, 2, 3],
      time: "00:00",
      endTime: "04:00",
      pageReference: "148"
    }],
    failureConsequence: "If the ghost is not calmed, other patrons of the Stock Pot Inn will complain about the strange moaning and groaning they hear in the middle of the night, but otherwise there’s no consequence."
  },
  {
    id: "q16", questNumber: 16, title: "Target Shooting Champ", region: Region.ClockTown,
    description: "The operator of the Clock Town Shooting Gallery is eager to bring people into their gallery to raise interest and try to get people buying goods from their shop. They charge 20 rupees for challengers to try their skill at the shooting gallery.",
    pageReference: "148",
    rewards: [{ name: "Large Quiver", type: "Item" as const }, ITEMS.heart],
    steps: [
      {
        id: "q16-1",
        title: "Clear the Gallery",
        description: "Inside of the town shooting gallery, the shopkeeper offers an advanced quiver to anyone who can beat their target challenge.\n\nChallengers will be provided with a shortbow and ten arrows. There are seven targets set up, four are 'easy' shots (AC 13) and three are 'hard' (AC 16). If the challenger hits all the targets within ten shots, they will be rewarded with a +2 arrow or +2 crossbow bolt.",
        xpReward: 100,
        location: "East Clock Town",
        curiosityShopUnlock: { itemName: "Bracers of Archery", id: "si-16" },
        itemRewards: [{ name: "Large Quiver", type: "Item" as const }],
        time: "06:00",
        endTime: "22:00",
        days: [1, 2, 3],
        pageReference: "148"
      },
      {
        id: "q16-2",
        title: "Master the Gallery",
        description: "If, during the shooting gallery game, challengers never roll below 13 and make at least 3 rolls of 16 or higher, the Shooting Gallery owner will also award them with a piece of heart.",
        xpReward: 100,
        location: "East Clock Town",
        curiosityShopUnlock: { itemName: "Quaal's Feather Token (Any)", id: "si-16-2" },
        itemRewards: [ITEMS.heart],
        prerequisiteStepId: "q16-1",
        time: "06:00",
        endTime: "22:00",
        days: [1, 2, 3],
        pageReference: "148"
      }
    ]
  },
  {
    id: "q17", questNumber: 17, title: "Three Days of Gaming", region: Region.ClockTown,
    description: "Honey and Darling own and operate a little shop that they are constantly rearranging and restructuring. Every day they have a new game available inside the shop. Playing the games costs challengers 15 rupees. If a single challenger wins every single one of their games, Honey and Darling will present them with a piece of heart.",
    pageReference: "148",
    rewards: [ITEMS.heart],
    steps: [
      {
        id: "q17-1",
        title: "Bowling (Day 1)",
        description: "On the first day, Honey and Darling have set their shop into a bowling lane. Making an attempt costs 10 rupees each time and Honey and Darling offer a purple rupee, worth 50, for the winners.\n\nChallengers have two rounds to knock down all of the pins. Make an improvised weapon check using Strength. A result of 12 is needed to get the ball all the way down the lane. Challengers win after three sets of bowling if they have knocked down at least eight pins in each set.",
        day: 1,
        location: "East Clock Town",
        xpReward: 66,
        curiosityShopUnlock: { itemName: "Gauntlets of Ogre Power", id: "si-17" },
        time: "10:00",
        endTime: "17:00",
        pageReference: "148"
      },
      {
        id: "q17-2",
        title: "Baskets (Day 2)",
        description: "For the second day of their games, Honey and Darling have set up a hoop-shoot game. Making an attempt at the game costs challengers 10 rupees to play, and Honey and Darling have offered 50 rupees to winners.\n\nAdventurers have four balls with which to make shots. Shooting the ball is done with an improvised weapon check using Dexterity. Adventurers need five points to win and have four shots in which to win it.",
        day: 2,
        location: "East Clock Town",
        xpReward: 66,
        curiosityShopUnlock: { itemName: "Rope of Climbing", id: "si-17-2" },
        prerequisiteStepId: "q17-1",
        time: "10:00",
        endTime: "17:00",
        pageReference: "149"
      },
      {
        id: "q17-3",
        title: "Target Shooting (Day 3)",
        description: "On the third day, Honey and Darling set up their shop into a target shooting gallery, with the additional quirk that the floor challengers must stand on rotates while the targets also move.\n\nChallengers are given a shortbow and five arrows. When they take a shot they first roll to hit, then draw from a deck of cards. The target’s AC is equal to the card’s value + 5. Three successful shots win the game and an award of 50 Rupees.",
        day: 3,
        location: "East Clock Town",
        xpReward: 66,
        curiosityShopUnlock: { itemName: "Wand of Magic Missiles", id: "si-17-3" },
        itemRewards: [ITEMS.heart],
        prerequisiteStepId: "q17-2",
        time: "10:00",
        endTime: "17:00",
        pageReference: "149"
      }
    ]
  },
  {
    id: "q18", questNumber: 18, title: "Lucky Numbers", region: Region.ClockTown,
    description: "Each day the lottery shop offers a 50 rupee prize to anyone who puts in 5 rupees to guess the winning numbers. Any individual can bet up to 100 rupees, earning a maximum of 1000 rupees per bet. Numbers are recorded, and the same numbers may not be entered twice over the same night. The winning numbers are drawn at 11 PM each night and do not change between iterations.",
    pageReference: "149",
    rewards: [{ name: "50 Rupees", type: "Item" as const }],
    steps: [{
      id: "q18-1",
      title: "Win the Lottery",
      description: "Guess the winning numbers (Day 1, 2, or 3) to win the pot.",
      xpReward: 120,
      location: "West Clock Town",
      curiosityShopUnlock: { itemName: "Cloak of Protection", id: "si-18" },
      itemRewards: [{ name: "50 Rupees", type: "Item" as const }],
      time: "18:00",
      endTime: "23:00",
      days: [1, 2, 3],
      pageReference: "149"
    }]
  },
  {
    id: "q19", questNumber: 19, title: "Master Swordsman", region: Region.ClockTown,
    description: "A traveling swordsman has traveled into Clock Town and set up a school to teach people how to fight with the blade. He has devised a test for himself, one that reaches the limit of his ability, and has offered it as a challenge for people to test their swordsmanship skills. He's confident that no one will succeed.",
    pageReference: "149",
    rewards: [ITEMS.heart],
    steps: [
      {
        id: "q19-1",
        title: "Swordsman's Test",
        description: "The swordsman will set up a series of training platforms upon which adventurers can demonstrate their swordsmanship skills. He has offered a grand prize for the first person to succeed in his challenge. For 50 rupees, adventurers can take the test with the prize on the line, or take the 'normal test' for 20 rupees.\n\nThe swordsman has five wooden targets set up in a circle. Each target has an AC of 13 and 10 HP. Challengers have five turns to attack the targets and must destroy at least three of the five dummies to succeed in the swordsman’s challenge and be awarded with 200 rupees. If challengers destroy all five targets, the swordsman also awards them with a piece of heart.",
        xpReward: 75,
        location: "Swordsman's School",
        characterId: "tapis",
        curiosityShopUnlock: { itemName: "Wind Fan", id: "si-19" },
        itemRewards: [ITEMS.heart],
        days: [1, 2, 3],
        time: "06:00",
        endTime: "21:00",
        pageReference: "149"
      },
      {
        id: "q19-2",
        title: "Duel the Master",
        description: "If guests have proved themselves through the swordsman’s challenges, he will offer them one additional trial, facing the swordsman in battle. A traditional one-on-one duel using blunted weapons. Whichever participant has been dropped down to half their hit point maximum first is the loser of the duel.\n\nIf anyone manages to defeat the swordsman, he will offer them a reward of 200 rupees for giving him a fine challenge, and then close his shop for the rest of the day.",
        xpReward: 125,
        location: "Swordsman's School",
        characterId: "tapis",
        curiosityShopUnlock: { itemName: "Sword of Vengeance", id: "si-19-2" },
        itemRewards: [{ name: "200 Rupees", type: "Item" as const }],
        prerequisiteStepId: "q19-1",
        days: [1, 2, 3],
        time: "06:00",
        endTime: "21:00",
        pageReference: "149"
      }
    ]
  },
  {
    id: "q20", questNumber: 20, title: "A Treasure-Chest Prize", region: Region.ClockTown,
    description: "The treasure chest game, run by a flirtatious young woman in Clock Town offers a spectacular prize for anyone willing to put up the money to play. Challengers must succeed a series of gambles to advance and, the further they progress, the bigger the ante and the greater the reward.",
    pageReference: "150",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q20-1",
      title: "Win the Big Prize",
      description: "There are four magical chests, once the bet has been made, the three chests will populate with prizes. One chest has a winning prize, one chest has a 'losing' prize, and two chests is empty. If challengers chose the empty chest, they lose the game and have to start over from the beginning.\n\nWin through 10 rounds of increasing ante. Round 10: 100 rupee ante; piece of heart/50 rupees.",
      xpReward: 200,
      location: "East Clock Town",
      curiosityShopUnlock: { itemName: "Deck of Illusions", id: "si-20" },
      itemRewards: [ITEMS.heart],
      time: "06:00",
      endTime: "22:00",
      days: [1, 2, 3],
      pageReference: "150"
    }]
  },
  {
    id: "q21", questNumber: 21, title: "Find Keaton!", region: Region.ClockTown,
    description: "Across Termina are patches of grass that shake oddly, indicating that Keaton is hiding inside of them. Intruding in the grass while wearing the Keaton mask will cause Keaton to appear.",
    pageReference: "150",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q21-1",
      title: "Answer Keaton's Riddles",
      description: "Keaton will quickly realize that the intruders are not actual keaton, but will take it all as a fun game. Keaton will then ask three riddles.\n\nAnswering Keaton’s riddles successfully will endear adventurers to the fey, he will gift them with a piece of heart and offer to share secrets he has learned from observing the world and its people from the grasses.",
      location: "N. Clock Town",
      xpReward: 200,
      curiosityShopUnlock: { itemName: "Wand of Secrets", id: "si-21" },
      itemRewards: [ITEMS.heart],
      pageReference: "150"
    }]
  },
  {
    id: "q22", questNumber: 22, title: "Music Moves the Heart", region: Region.ClockTown,
    description: "The owner and operator of the Gorman Troupe was influenced by the first iteration of the band the Indigo-Gos. Wracked with anxiety and depression he has been spending his nights holed up drinking in the Milk Bar.",
    pageReference: "150",
    rewards: [ITEMS.troupeMask],
    steps: [
      {
        id: "q22-1",
        title: "Sound Check at the Milk Bar",
        description: "Between 10 PM and 5 AM of the first and second nights Toto, the manager of the Zora band the Indigo-Gos is in the Milk Bar to test the bar's acoustics. Adventurers will be asked to perform The Ballad of the Wind Fish. Adventurers can make a DC 15 Charisma (Performance) check to learn and perform the tune for Toto. If the adventurers successfully perform The Ballad of the Wind Fish for Toto, he will offer to give them one of the fine instruments they were performing on.",
        xpReward: 100,
        location: "Milk Bar",
        characterId: "toto",
        curiosityShopUnlock: { itemName: "Instrument of the Bards", id: "si-22" },
        days: [1, 2],
        time: "22:00",
        endTime: "05:00",
        pageReference: "151"
      },
      {
        id: "q22-2",
        title: "The Troupe Leader's Memories",
        description: "Arro Gorman, the leader of the Troupe that would have been performing during the upcoming festival, spends his nights inside of the Milk Bar. Upon hearing The Ballad of the Wind Fish, Gorman will be reminded of why he decided to go into theater in the first place. When he was a child, he heard a performance of The Ballad of the Wind fish by the previous members of the Indigo-Gos and was inspired. When Gorman hears the ballad, he will begin weeping openly and give adventurers who perform it the troupe leader's mask in gratitude.",
        xpReward: 100,
        location: "Milk Bar",
        characterId: "gorman",
        curiosityShopUnlock: { itemName: "Elemental Gem (Blue Sapphire)", id: "si-22-2" },
        itemRewards: [ITEMS.troupeMask],
        prerequisiteStepId: "q22-1",
        days: [1, 2],
        time: "22:00",
        endTime: "05:00",
        pageReference: "152"
      }
    ],
    failureConsequence: "Gorman, already on the verge of a severe episode, will likely do something drastic or harmful if he does not manage to receive this form of catharsis before the festival."
  },
  {
    id: "q23", questNumber: 23, title: "Fraternal Milk", region: Region.TerminaField,
    description: "Inigo Gorman has been more than willing to gripe and complain, but when he’s deep in his cups he’ll let slip what he really craves. Inigo is hoping for a taste of home, the milk made at his brother’s farm, and he may have a reward for those who can bring him some.\nThe Gorman brothers are willing to part with some of the milk they offer, but not for money. They want a sword that was used by the garo.\nOnce defeated, one of the garo will be willing to part with their swords to a worthy victor, but they ask for a hibiscus blossom from the southern swamp, but they’re out of season.\nSwampy has a dried hibiscus blossom that he’s willing to part with, in exchange for a scale from the bass player of the Indigo-Go’s.\nJapas will part with a scale, if he can get a special steel guitar pick he commissioned from the mountain smithy.\nGabora will hand over the pick, if he is given a pretty ribbon like the one worn by the winner of the doggy races.\nMamau Yan will hand over one of her prize ribbons if the asker would be so kind as to run to Clock Town and get a bag of dog food one of the Bombers promised to deliver.\nJim Bombazu will pass along the dog food, and give adventurers 5 rupees for reminding him of the promise he failed to honor and completing it for him.\nOnce Gorman has finished his milk, he will thank the adventurers and gift them with the magic bottle his brothers packed it in, knowing only he would be asking for some.",
    pageReference: "151",
    rewards: [ITEMS.bottle],
    steps: [
      {
        id: "q23-1",
        title: "The Trading Sequence",
        description: "1. The Gorman brothers are willing to part with some of the milk they offer, but not for money. They want a sword that was used by the garo.\n2. Once defeated, one of the garo will be willing to part with a sword from a weapon cache they concealed when they were alive, but they ask for a hibiscus blossom from the southern swamp, which are unfortunately out of season.\n3. Swampy has a dried hibiscus blossom that he’s willing to part with, in exchange for a scale from the bass player of the Indigo-Go’s.\n4. Japas will part with a scale, if he can get a special steel guitar pick he commissioned from the mountain smithy.\n5. Gabora will do a rush job for the pick, if he is given a pretty ribbon like the one worn by the winner of the doggy races.\n6. Mamau Yan will hand over one of her prize ribbons if the asker would be so kind as to run to Clock Town and get a bag of dog food one of the Bombers promised to deliver.\n7. Jim Bombazu will pass along the dog food, and give adventurers 5 rupees for reminding him of the promise he failed to honor and completing it for him.\nOnce Gorman has finished his milk, he will thank the adventurers and gift them with the magic bottle his brothers packed it in, knowing only he would be asking for some. Gorman also offers that he will speak to his brothers and try to help them reform their business.",
        xpReward: 200,
        location: "Various",
        characterId: "gorman",
        curiosityShopUnlock: { itemName: "Periapt of Health", id: "si-23" },
        itemRewards: [ITEMS.bottle],
        pageReference: "151"
      }
    ],
    failureConsequence: "If Gorman does not reconnect with his brothers, he will not be seriously harmed, but the weapons she is carrying will not be available for sale."
  },
  {
    id: "q24", questNumber: 24, title: "Anju's Anguish and A Testament of Love", region: Region.ClockTown,
    description: "Anju was Kafei's betrothed, she believes that he'll come back to her and is desperate for any news that could be brought to her. At the same time Kafei, cursed by the skull kid, has been trying to reclaim a mark of their engagement before he feels worthy of returning to Anju and his family.",
    pageReference: "152",
    rewards: [ITEMS.couplesMask],
    steps: [
      {
        id: "q24-1",
        title: "Appointment with Anju",
        description: "At 1:30, the Mailman arrives at the Stock Pot Inn with a letter to Anju from her missing finance, Kafei. Between 2:00 PM and 8:00 PM on the first day, if an adventurer comes to the Stock Pot Inn and tells Anju that they are looking for Kafei, she will tell them that he has been in touch with her, and to meet her at 11:30 in the inn's kitchen.",
        xpReward: 0,
        location: "Stock Pot Inn",
        characterId: "anju",
        day: 1,
        time: "14:00",
        endTime: "20:00",
        curiosityShopUnlock: { itemName: "Keoghtom's Ointment", id: "si-24-1" },
        pageReference: "152"
      },
      {
        id: "q24-2",
        title: "A Midnight Request",
        description: "If adventurers arranged the late-night meeting with Anju, she will be waiting for them in the kitchen at the back of the inn between 11:30 PM and Midnight on the first day. Anju will tell the adventurers about her upcoming wedding and give the adventurer a letter to send to Kafei on her behalf.",
        xpReward: 25,
        location: "Stock Pot Inn Kitchen",
        characterId: "anju",
        day: 1,
        time: "23:30",
        endTime: "24:00",
        curiosityShopUnlock: { itemName: "Gloves of Missile Snaring", id: "si-24-2" },
        prerequisiteStepId: "q24-1",
        pageReference: "152"
      },
      {
        id: "q24-3",
        title: "Deliver the Love Letter",
        description: "The adventurers must place the letter addressed to Kafei in one of the town's mailboxes any time before 9 AM of the second day.",
        xpReward: 0,
        location: "Clock Town Mailbox",
        day: 2,
        time: "06:00",
        endTime: "09:00",
        curiosityShopUnlock: { itemName: "Sending Stones", id: "si-24-3" },
        prerequisiteStepId: "q24-2",
        pageReference: "152"
      },
      {
        id: "q24-4",
        title: "The Letter's Recipient",
        description: "Kafei has been hiding out in the apartment behind the Curiosity Shop. If Kafei is found before he receives Anju's letter, he will flee and actively try to avoid any contact with people. After 3:30 PM on the second day, Kafei will have received the letter and is willing to talk to adventurers investigating his disappearance. He will explain how he was cursed by the Skull Kid and his wedding mask was stolen by Sakon the thief. Kafei will give the adventurers his Pendant of Memories to give to Anju.",
        xpReward: 0,
        location: "Laundry Pool",
        characterId: "kafei",
        day: 2,
        time: "15:30",
        endTime: "16:30",
        curiosityShopUnlock: { itemName: "Helm of Telepathy", id: "si-24-4" },
        prerequisiteStepId: "q24-3",
        pageReference: "152"
      },
      {
        id: "q24-5",
        title: "Precious Pendant",
        description: "If Anju receives the Pendant of Memories before 9:00 PM on the second day, she will realize that Kafei still cares and will promise to wait for him, even if the moon comes down.",
        xpReward: 50,
        location: "Stock Pot Inn",
        characterId: "anju",
        day: 2,
        time: "16:30",
        endTime: "21:00",
        curiosityShopUnlock: { itemName: "Medallion of Thoughts", id: "si-24-5" },
        prerequisiteStepId: "q24-4",
        pageReference: "152"
      },
      {
        id: "q24-6",
        title: "Kafei's Leftovers",
        description: "At midnight of the Second day, Sakon the thief will go to the curiosity shop to sell some goods. Kafei will recognize them and give chase. Before he runs off, he will give the Curiosity shop owner a letter to give to his mother. Adventurers that talk to the Curiosity Shop owner about Kafei between 6 AM and 10 PM on the final day will be told that the man has chased after Sakon, where the thief's hideout is located, and be given the letter to deliver to Kafei's mother. In addition to this information, in gratitude for all that adventurers have done to help his friend Kafei, if they agree to help further the Curiosity Shop owner will give them the Keaton mask.",
        xpReward: 0,
        location: "Curiosity Shop Backroom",
        day: 3,
        time: "06:00",
        endTime: "22:00",
        curiosityShopUnlock: { itemName: "Boots of Elvenkind", id: "si-24-6" },
        itemRewards: [ITEMS.keatonMask],
        prerequisiteStepId: "q24-4",
        pageReference: "152"
      },
      {
        id: "q24-7",
        title: "Raid Sakon's Hideout",
        description: "Kafei, having found the thief that stole his wedding mask, is hiding outside the thief's hideout waiting for an opportunity to break in. He has been hiding there since 6:00 AM on the third day. Sakon will exit his hideout at 6:00 PM on the final day, his cavern door closes slowly but, so long as the thief believes he's alone he will leave as soon as it starts shutting. (Sakon’s passive Perception is 14) Sakon has heard that the sun mask's owner has been coming for him, and set a trap in front of the mask. Unless they adventurers stop him, Kafei will trigger this trap and the hideout entrance will lock, trapping everyone inside. The mask is placed on a conveyor belt that will begin moving towards the end of the hideout. At the end there is a pit that will seal itself shut once weight has been dropped into it. The pit can be opened, but doing so takes at least an hour. Sakon has set up two routes on either side of the conveyor belt, each one has different challenges on each side. The path to the left has monsters, the path to the right has puzzles. The left path has a monster defending the door, the doors on the right path have a number-pad lock on the door, and a puzzle written on the door. The door unlocks with the correct answer. Both paths have 10 rounds to make it from the entrance to the final chamber where there is a button that will seal the pit early, making it possible to simply grab the sun mask.",
        xpReward: 125,
        location: "Ikana Canyon",
        characterId: "kafei",
        day: 3,
        time: "18:00",
        endTime: "20:00",
        curiosityShopUnlock: { itemName: "Elemental Gem (Red Corundum)", id: "si-24-7" },
        prerequisiteStepId: "q24-6",
        pageReference: "152"
      },
      {
        id: "q24-8",
        title: "The Couple's Vow",
        description: "As soon as Kafei has recovered the Sun's mask, he will run back to Clock Town to marry Anju. As soon as he arrives, he begins a hasty ceremony. The sun and moon masks will magically fuse as part of the ceremony and the grateful couple will give adventurers the resulting couple's mask in thanks for all they've done.",
        xpReward: 200,
        location: "Stock Pot Inn",
        characterId: "anju",
        day: 3,
        time: "04:30",
        endTime: "06:00",
        curiosityShopUnlock: { itemName: "Ring of Regeneration", id: "si-24-8" },
        itemRewards: [ITEMS.couplesMask],
        prerequisiteStepId: "q24-7",
        pageReference: "153"
      }
    ],
    failureConsequence: "If Anju does not receive the pendant before 9:00 in Quest 24-5, she will give up on Kafei and assume he truly has abandoned her. She will flee town with her mother at noon of the third day instead of waiting. If Anju has been assured of Kafei’s life and intent, but Kafei was not assisted with Sakon, Anju will wait in Clock Town alone and die under the moon. If Kafei is not accompanied into Sakon’s hideout, he will be killed, either by the thief’s traps or by Sakon himself."
  },
  {
    id: "q25", questNumber: 25, title: "The Never-Ending Meeting", region: Region.ClockTown,
    description: "On the first two days between 10 AM and 8 PM, Clock Town's mayor is trapped in an endless meeting where the foreman of festival construction and the guard captain argue furiously about whether to cancel the ceremony and order an evacuation, or continue as normal. If adventurers arrive wearing the couple's mask, the mayor will be inspired to speak up and propose the compromise that citizens may leave as they wish, and will be recommended to seek shelter, but an evacuation will not be ordered and the workers may continue to set up for the festival. Without the couple’s mask, calming the meeting will require either a DC20 Charisma (Intimidation) or Charisma (Persuasion) check or the use of the calm emotions spell, though Mutoh and Viscen will both try to resist the spell’s effect. The mayor, grateful that the meeting has ended, gives adventurers a piece of heart.",
    pageReference: "153",
    rewards: [ITEMS.heart],
    steps: [
      {
        id: "q25-1",
        title: "Resolve the Argument",
        description: "Enter the Mayor's office wearing the Couple's Mask to silence the argument and bring peace to the meeting.",
        xpReward: 120,
        location: "Mayor's Office",
        characterId: "mayor-dotour",
        days: [1, 2],
        time: "10:00",
        endTime: "20:00",
        curiosityShopUnlock: { itemName: "Eversmoking Bottle", id: "si-25" },
        itemRewards: [ITEMS.heart],
        pageReference: "153"
      }
    ],
    failureConsequence: "If the meeting continues to drag on, there will be increased unrest among the people of Clock Town, as an evacuation has not been ordered and they feel trapped in the city."
  },
  {
    id: "q26", questNumber: 26, title: "Grandmother's Stories", region: Region.ClockTown,
    description: "Anju's Grandmother, in the early stages of senility, has been spending most of her time in her room at the Stock Pot Inn. She's pretty bored, and enjoys telling stories so she'll share the stories with people willing to listen. However, she's practiced her storytelling with the goal of getting children to go to sleep and has developed an almost hypnotic cadence to her voice.",
    pageReference: "153",
    rewards: [ITEMS.heart],
    steps: [
      {
        id: "q26-1",
        title: "History of the Carnival",
        description: "If listeners choose to listen to the story of the carnival, the DM reads the fist paragraph of the carnival story in Appendix G: Legends of Termina, then listeners must make a DC 20 Wisdom saving throw, falling asleep for an hour on a failure. Since this effect is not strictly magical, feats like fey ancestry are not proof against it. However, anyone wearing and attuned to the all-night mask automatically succeeds this check. If at least two listeners succeed the check, or any succeed with a critical, read the entire story. Once the story is concluded ask one of the following questions: What did the traditional masks originally represent? Where do celebrants get their masks for the carnival? How do couples celebrate the carnival? If listeners can correctly answer the question, Granny gives them a piece of heart of being a “good child.”",
        xpReward: 60,
        location: "Stock Pot Inn",
        characterId: "granmere",
        curiosityShopUnlock: { itemName: "Gem of Brightness", id: "si-26-1" },
        itemRewards: [ITEMS.heart],
        days: [1, 2],
        time: "08:00",
        endTime: "20:00",
        pageReference: "153"
      },
      {
        id: "q26-2",
        title: "Termina Mythology",
        description: "If listeners choose to listen to the story of the giants, the DM reads the fist paragraph of the four giants story in Appendix G: Legends of Termina, then listeners must make a DC 20 Wisdom saving throw, falling asleep for an hour on a failure. Since this effect is not strictly magical, feats like fey ancestry are not proof against it. However, anyone wearing and attuned to the all-night mask automatically succeeds this check. If at least two listeners succeed the check, or any succeed with a critical, read the entire story. Once the story is concluded ask one of the following questions: How far did each giant travel before resting? How do the people call the giants when they need them? Where did the giants send the imp? If listeners can correctly answer the question, Granny gives them a piece of heart of being a “good child.”",
        xpReward: 60,
        location: "Stock Pot Inn",
        characterId: "granmere",
        curiosityShopUnlock: { itemName: "Necklace of Adaptation", id: "si-26-2" },
        itemRewards: [ITEMS.heart],
        days: [1, 2],
        time: "08:00",
        endTime: "20:00",
        pageReference: "154"
      }
    ],
    failureConsequence: "There is no consequence to not listening to the old woman’s stories, but she’ll appreciate it if you do."
  },
  {
    id: "q27", questNumber: 27, title: "The Postman's Peril", region: Region.ClockTown,
    description: "The postman refuses to abandon his duty to the town without a direct order to flee. He is a direct subordinate of Madame Aroma and will not leave without her express permission. Madame Aroma will only be willing to give permission to leave if she received the letter from her son during Quest 10-2. Without the letter from Kafei to show her son is alive, she will be petty enough to refuse the postman's request and force him to die with her when the moon crashes. If the postman is allowed to leave he will give adventurers the postman's hat in gratitude, then promptly flee.",
    pageReference: "154",
    rewards: [ITEMS.postmanHat],
    steps: [
      {
        id: "q27-1",
        title: "Free the Postman",
        description: "After giving the Letter to Mama to Madame Aroma (Quest 10-2), she allows the Postman to flee. Talk to him to receive his hat.",
        xpReward: 120,
        location: "Milk Bar / Post Office",
        characterId: "postman",
        day: 3,
        time: "12:00", // Estimated after letter delivery
        endTime: "24:00",
        curiosityShopUnlock: { itemName: "Boots of Striding and Springing", id: "si-27" },
        itemRewards: [ITEMS.postmanHat],
        prerequisiteStepId: "q10-2",
        pageReference: "154"
      }
    ],
    failureConsequence: "If the mailman is not released from his obligations, he will be killed by the moon and may lash out radically against the system that he feels has trapped him."
  },
  {
    id: "q28", questNumber: 28, title: "Rescue the Abandoned Fairy", region: Region.ClockTown,
    description: "In the Lost Woods tunnels underneath Clock Town, the fairy Tatl was left trapped and abandoned in a cavern, left behind by the Skull Kid. She has been beaten and abused by the Skull Kid at increasing measure ever since they picked up Majora’s Mask. Finally having enough, Tatl stood up to the Skull Kid, and was trapped in the depths under Clock Town. However, her brother, Tael, is still with the Skull Kid, and she’s afraid for him. Tatl is eager to fight with the Skull Kid, and will answer any questions adventurers might have about them. Tatl can also be persuaded to accompany adventurers along their quests, and tell them what she knows about Termina, even offering some hints about quests.",
    pageReference: "154",
    rewards: [{ name: "Tatl (Companion)", type: "Other" as const }],
    steps: [
      {
        id: "q28-1",
        title: "Rescue Tatl",
        description: "Find and rescue Tatl from the caverns under Clock Town. She will join you.",
        xpReward: 120,
        location: "Under Clock Tower",
        curiosityShopUnlock: { itemName: "Ring of Spell Storing", id: "si-28" },
        pageReference: "154"
      }
    ],
    failureConsequence: "There is no greater consequence to leaving Tatl alone in the dark. She will eventually be able to make her own way out, though with immense difficulty."
  },
  {
    id: "q29", questNumber: 29, title: "Gazing at the Stars", region: Region.TerminaField,
    description: "Inside the Astral Observatory the astronomer has been observing the moon in its descent towards Termina. He has especially been noticing the occasional “droplet” of small pieces of refined moon stones that have been falling from the descending moon that the astronomer has been calling “moon’s tears.” He had collected two so far, but they had been stolen by the Skull Kid. Adventurers can look through the telescope at the moon and see one of the stones dropping from its “eye” to a random point on Termina Field, where it can be collected. The astronomer is willing to buy the moon’s tear for 500 rupees, though it’s easily worth double that. It can also function as an arcane focus.",
    pageReference: "155",
    rewards: [ITEMS.moonsTear],
    steps: [
      {
        id: "q29-1",
        title: "Collect Moon's Tear",
        description: "Look through the telescope to see a Moon's Tear fall. Collect it outside the observatory.",
        xpReward: 120,
        location: "Astral Observatory",
        characterId: "shikashi",
        curiosityShopUnlock: { itemName: "Pearl of Power", id: "si-29" },
        itemRewards: [ITEMS.moonsTear],
        pageReference: "155"
      }
    ]
  },
  {
    id: "q30", questNumber: 30, title: "The Scrub's Secret Stash", region: Region.TerminaField,
    description: "The Clock Town business scrub keeps a hidden stash of goods in a hidden grotto in Termina Field. He is protective of his goods, but willing to sell them at a steep discount if it means keeping the location of his stash secret. The biggest item in the scrub’s inventory is a piece of heart, and he is willing to sell it for 150 rupees if adventurer’s promise to keep the location of his storage stash secret. With a successful DC 16 Charisma (Intimidation) or Charisma (Persuasion) check they’ll be willing to let it go for only 100.",
    pageReference: "155",
    rewards: [ITEMS.heart],
    steps: [
      {
        id: "q30-1",
        title: "Buy the Piece of Heart",
        description: "Find the grotto and buy the Piece of Heart from the scrub for 150 (or 100) rupees.",
        xpReward: 120,
        location: "Termina Field Grotto",
        curiosityShopUnlock: { itemName: "Ring of Mind Shielding", id: "si-30" },
        itemRewards: [ITEMS.heart],
        pageReference: "155"
      }
    ]
  },
  {
    id: "q31", questNumber: 31, title: "A Dance with Meaning", region: Region.World,
    description: "Kamaro was a skilled dancer and choreographer. At one time they performed for the greatest halls in front of roaring crowds. Their movements were considered inspirational and many are still followed. It is rumored that they were working on a final opus, but they died before they could display it to anyone.",
    pageReference: "155",
    rewards: [ITEMS.kamaroMask, ITEMS.heart],
    steps: [
      {
        id: "q31-1",
        title: "Dancing with a Ghost",
        description: "During the night, the spirit of Kamaro the dancer manifests atop a stone pillar in the north-western region of Termina fields. Kamaro's spirit appears to the naked eye as a softly glowing, slowly moving, aura of ethereal energy. Kamaro and his dance can be seen clearly with the see invisibility spell or the lens of truth. If player's cast speak with dead with Kamaro's spirit, the ghost will tell them that they hoped to share the dances they created with the world, but died before they were able. Once they hear Kamaro's story, adventurers can cast the song of healing to create Kamaro's mask. Alternatively, Adventurers can make a DC 16 Charisma (Performance) check to replicate Kamaro's dance. If Kamaro sees the adventurers perform his dance, the spirit will pass on and leave Kamaro's mask behind that way.",
        xpReward: 100,
        location: "North Termina Field",
        characterId: "kamaro",
        time: "00:00",
        endTime: "06:00",
        curiosityShopUnlock: { itemName: "Oil of Slipperiness", id: "si-31-1" },
        itemRewards: [ITEMS.kamaroMask],
        pageReference: "155"
      },
      {
        id: "q31-2",
        title: "The Rosa Sister's New Groove",
        description: "Between 8 PM and 2 AM during the first and second days, the Rosa Sisters can be found in the west Clock Town plaza rehearsing dances for the upcoming festival, a DC 13 Wisdom (Insight) check will reveal that the dancers are not too invested in the performance. If adventurers ask, the dancers will confide that they're worried their performance is becoming stale and they have been trying to come up with a new more artistically deep dance for the upcoming festival performance. Adventurers can make a DC 18 Charisma (Performance) check to perform Kamaro's dance for the sisters if they know it, or perform it perfectly if they are wearing Kamaro's mask. Upon seeing it, the sisters will demand a repeat performance so they can learn these moves, and will give the adventurers a piece of heart after learning the dance.",
        xpReward: 100,
        location: "West Clock Town",
        characterId: "rosa-sisters",
        days: [1, 2],
        time: "18:00",
        endTime: "06:00",
        curiosityShopUnlock: { itemName: "Eyes of Charming", id: "si-31-2" },
        itemRewards: [ITEMS.heart],
        prerequisiteStepId: "q31-1",
        pageReference: "155"
      }
    ],
    failureConsequence: "If Kamaro’s ghost is not put to rest, he will begin haunting others, scaring traders and travelers in Termina field with his strange ethereal music and ghostly form."
  },
  {
    id: "q32", questNumber: 32, title: "A Race Near Milk Road", region: Region.TerminaField,
    description: "Every day between the hours of 6 AM and 6 PM the Gorman brothers operating at their race track and ranch to the south of Romani Ranch will offer horse racing challenges to visitors, demanding 100 rupees to participate in the race. Playing the Minigame. The race runs a length of 300 feet (though this is an abstraction). Every round, each rider must make a Wisdom (Animal Handling) check; with a DC for different types of horses listed in the Table 4-2: Gorman Ranch Racing Horses Table. With each successful Animal Handling check, the first number listed as the Horse's speed is added to its 'running tally.' If the check fails, that horse’s tally doesn't increase that turn. When a racer's tally equals or exceeds 300, that horse crosses the finish line. A racer can try to move at the higher listed speed by lashing the animal furiously; in this case, the Animal Handling check is made with advantage, but the horse must also make a successful DC 10 Constitution check at the end of this round or its speed is halved for the rest of the race. No initiative is involved. Riders can make their Animal Handling checks in any order, or all at the same time. If two or more horses cross the finish line on the same round, the one with the highest tally wins. If the tallies are the same, the racers tied. In the event of a tie, brawls are likely to break out in track side betting pools. The Gorman Brothers are notorious cheaters. First they will take a false start, automatically adding 5 to their first Animal Handling check. Secondly, they have set traps and stumbling blocks across their racing tracks, they know to avoid them, but if any racer rolls lower than 5 their horse’s speed will be reduced by half for their next successful round; If a racer succeeds on a DC 14 Wisdom (Perception) check at the beginning of their round, they can avoid the trap and this effect, racers automatically avoid these traps if they have already encountered them. Adventurers that win the race will be awarded garo's mask.",
    pageReference: "156",
    rewards: [ITEMS.garoMask],
    steps: [
      {
        id: "q32-1",
        title: "Beat the Gorman Bros",
        description: "Pay 100 rupees to race the brothers. Win to receive the Garo's Mask.",
        xpReward: 120,
        location: "Gorman Track",
        characterId: "gorman-bros",
        time: "06:00",
        endTime: "18:00",
        curiosityShopUnlock: { itemName: "Saddle of the Cavalier", id: "si-32" },
        itemRewards: [ITEMS.garoMask],
        pageReference: "156"
      }
    ],
    failureConsequence: "Defeating the Gorman brothers in a race, even despite their cheating, puts a little bit of humility into them. If they are not beaten, they will expand their dirty dealing in gambling and racing."
  },
  {
    id: "q33", questNumber: 33, title: "Protect Romani's Cows!", region: Region.TerminaField,
    description: "Every year, at a certain night, monsters have descended on Romani Ranch to kidnap their cows. Only has one person has seen the creatures responsible for the disappearance, young Romani. Everyone around her assumes that Romani’s time spent practicing archery is just childish fantasy, but she knows the terrible thing that is coming, and can only assume what will happen if she’s not ready.",
    pageReference: "156",
    rewards: [{ name: "Milk Bottle", type: "Item" as const }],
    steps: [
      {
        id: "q33-1",
        title: "Assistant Ghost Stopper",
        description: "For a few days now, cows have been going missing from Romani Ranch. No evidence has been found that could explain these disappearances. Romani, the younger sister of Cremia for whom the ranch was named, has seen strange creatures she believes are “ghosts” that have been abducting the ranch's cows. Despite seeing this and knowing why cows have been missing, Romani didn't tell her sister what was happening to keep her from worrying. If adventurers speak to Romani between 6 AM and 6 PM during the first day, she will recruit adventurers to help her protect the farm from the ghosts and tell them to be at the farm by 2:30 AM, which is when the ghosts appeared before.",
        xpReward: 0,
        location: "Romani Ranch",
        characterId: "romani",
        day: 1,
        time: "06:00",
        endTime: "18:00",
        curiosityShopUnlock: { itemName: "Driftglobe", id: "si-33-1" },
        pageReference: "156"
      },
      {
        id: "q33-2",
        title: "Busting Ghosts",
        description: "Starting at 2:30 AM and until 5:30 AM flatwoods drones will arrive in waves to attack the ranch's barn and steal the cows protected inside. Playing the Siege. Mark 20 unoccupied points on the map of Romani’s Ranch at least 60 feet from the barn and at least 10 feet apart from each other. The DM has a total of 100 flatwoods drones they keep in reserve. At the beginning of each round, the DM roll a D20, rolls of 1-13 are “inactive,” rolls of 14-20 are “active.” Drones can only be placed on the map during active rounds and the DM may place a drone into any unoccupied space that they initially marked off. If the space is occupied, instead of summoning a drone, it blasts away any creature or object occuying the space, dealing 4d6 bludgeoning damage and knocking the object 10 feet in a random direction, a drone is still expended from the DM’s reserve through this. The siege ends at 6 AM, sunrise, of the next day, or when the DM’s reserve of drones has been expended. When the siege concludes, the master drone will fly over, appearing as a ball of bright light, then fly off into the sky.",
        xpReward: 500,
        location: "Romani Ranch",
        characterId: "romani",
        day: 2,
        time: "02:30",
        endTime: "05:15",
        curiosityShopUnlock: { itemName: "Robe of Stars", id: "si-33-2" },
        itemRewards: [{ name: "Milk Bottle", type: "Item" as const }],
        prerequisiteStepId: "q33-1",
        affectsTimeline: true,
        pageReference: "156"
      }
    ],
    failureConsequence: "If the adventurers fail to defend the ranch, Romani will have been psychically assaulted by the they while she was defending the cows. As a result Romani will be sunk into a semi-catatonic state, she will not respond to any stimuli and just sit and watch with a blank expression. Cremia will then abandon everything else to take care of her sister."
  },
  {
    id: "q34", questNumber: 34, title: "Protect the Milk", region: Region.TerminaField,
    description: "If adventurers speak with Cremia between 6 AM and 6 PM on the first or second day, she will tell the adventurers that she is planning to make a delivery of food and milk to Clock Town on the night of the second day. She will also tell them that she has been running into bandits during her last few delivery runs and that she would appreciate company and protection. Adventurers can meet Cremia at 6 PM and ride with her on her delivery cart to the delivery destination. Riding down the delivery route, you will discover that the route has been blocked off by a set of heavy iron bars and the cart must cut through the Gorman Race Track to get to Clock Town. If Cremia and the adventurers wait too long at the fence, the Gorman brothers and a small posse, in disguise, will attack there. Otherwise, the two brothers will attack as soon as the delivery cart starts down the Gorman track. The Gorman Brothers are not actively trying to kill anyone and are instead attempting to destroy the goods that Cremia is delivering. The Gorman Brother’s posse consists of 1 bandit captain and two bandits per adventurer, all of which are riding horses. Cremia has a large cargo of milk and other supplies on her wagon, which is being pulled by two horses. The wagon has an AC of 14, and the cargo has a collective total of 120 HP which represents the total amount of intact cargo being delivered. If the players arrive in Clock Town with at least half the goods Cremia was delivering, she will reward adventurers with Romani's mask.",
    pageReference: "157",
    rewards: [ITEMS.romaniMask],
    steps: [
      {
        id: "q34-1",
        title: "Escort Cremia",
        description: "Ride with Cremia at 6 PM on Day 2. Defend the wagon from the Gorman Brothers (masked bandits).",
        xpReward: 500,
        location: "Milk Road",
        characterId: "cremia",
        day: 2,
        time: "18:00",
        endTime: "20:00",
        curiosityShopUnlock: { itemName: "Heward's Handy Haversack", id: "si-34" },
        itemRewards: [ITEMS.romaniMask],
        prerequisiteStepId: "q33-2",
        pageReference: "157"
      }
    ],
    failureConsequence: "If Cremia’s shipment is not protected, the bottles will be smashed and Cremia will be severely beaten, or worse. This and other setbacks will be the final nails in Romani Ranch’s business, and the farm will eventually collapse."
  },
  {
    id: "q35", questNumber: 35, title: "Cucco Shack's Cute Chicks", region: Region.TerminaField,
    description: "The cucco keeper, Grog has had their usual depressive personality made worse by the encroaching moon and the prospect of certain impending death. His only wish is to see his ten cucco chicks grow to adults before they all die. Adventurers may use the Bremen mask's magic to age the chicks to adults. A successful DC 14 Wisdom (Animal Handling) check allows adventurers to round up all the chicks and use the Bremen mask to age the all the chicks at once in half an hour's time. Accomplishing this takes an hour with a check result of 10-12, an hour and a half with a result of 8-10, and two hours for any lower results. In gratitude, Grog will gift adventurers with the bunny hood for showing him his adult cuccos.",
    pageReference: "157",
    rewards: [ITEMS.bunnyHood],
    steps: [{
      id: "q35-1",
      title: "Age the Chicks",
      description: "Use the Bremen Mask to march the ten chicks around until they mature into roosters.",
      xpReward: 120,
      location: "Romani Ranch",
      characterId: "grog",
      time: "06:00",
      endTime: "20:00",
      curiosityShopUnlock: { itemName: "Eyes of the Eagle", id: "si-35" },
      itemRewards: [ITEMS.bunnyHood],
      pageReference: "157"
    }],
    failureConsequence: "Grog is depressed and will continue to sink into that state if the cuccos don’t provide that little glimpse of hope. However, outside of Grog’s mental health, there’s little consequence to not aging the chicks as, so long as the world is saved, they’ll grow up anyway."
  },
  {
    id: "q36", questNumber: 36, title: "Win Big at the Doggy Race", region: Region.TerminaField,
    description: "Connected to Romani Ranch is the doggy racetrack, a small court run by Mamamu Yan where she takes her small pack of terriers and uses their exercise ring as an excuse to make some money on the side. Visitors can bet on a dog to win and Yan lists the odds based on the previous week’s racing history. Playing the Minigame. Table 4-1: Doggy Track Dogs, lists all the dogs in Mamamu Yan’s Kennels and their odds at the track. Betters pick a dog and place a bet not exceeding 500 rupees on their chosen racer. The GM rolls a d100 and the result determines the winning dog. Then rolls twice more to determine which dogs place. The winning dog pays out the full value of the payout listed in the table. A second-place dog pays out half the value of the payout listed on the table. A third place dog repays half the value of the bet. Speaking with the Dogs: Betters may try to speak with the racing dogs using an attuned mask of truth or another method. If they do so, they can make a DC 13 Wisdom (Animal Handling) or (Insight) check to pick a good racing dog. On a success, the DM picks a random dog from the list",
    pageReference: "157",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q36-1",
      title: "Bet on a Winner",
      description: "Place a bet and win more than 150 rupees to receive a Piece of Heart.",
      xpReward: 120,
      location: "Doggy Racetrack",
      characterId: "mamamu",
      time: "06:00",
      endTime: "20:00",
      curiosityShopUnlock: { itemName: "Bag of Tricks", id: "si-36" },
      itemRewards: [ITEMS.heart],
      pageReference: "157"
    }]
  },
  {
    id: "q37", questNumber: 37, title: "Find the Stone-Faced Soldier", region: Region.TerminaField,
    description: "At the entrance to Ikana Canyon the soldier Shiro stands, completely invisible. He can only be seen with the lens of truth or through see invisibility. Upon being discovered, Shiro will tell adventurers that he had always been plain, boring enough that he seemed to just blend into the background. Then, he was cursed with invisibility by the skull kid, but that the witches in the swamp may have a potion that can break the curse. Performing the song of healing for Shiro will indeed break the curse and, in gratitude, he will give adventurers the resulting stone mask.",
    pageReference: "158",
    rewards: [ITEMS.stoneMask],
    steps: [{
      id: "q37-1",
      title: "Heal Shiro",
      description: "Use the Lens of Truth to see Shiro near the stone circle. Give him a Red or Blue potion to heal him.",
      xpReward: 120,
      location: "Road to Ikana",
      characterId: "shiro",
      curiosityShopUnlock: { itemName: "Periapt of Wound Closure", id: "si-37" },
      itemRewards: [ITEMS.stoneMask],
      pageReference: "158"
    }],
    failureConsequence: "Shiro is invisible and all but abandoned. If he is not rescued and his curse of invisibility broken, he will either starve to death, resort to banditry, or die under the moon."
  },
  {
    id: "q38", questNumber: 38, title: "Rescue the Swamp Witch", region: Region.SouthernSwamp,
    description: "Koume, one of the twin witches of the swamp, went into the woods of mystery in search of the rare medicinal herbs and magical ingredients that grow there, but she ran into the Skull Kid who overwhelmed her with the power of Majora’s Mask and left her broken inside of the woods. Crippled as she is, the witch is unable to leave the forest under her own power, and the shifting landscape of the forest means she is never in the same place and can’t navigate her way out. Map 5-2: The Woods of Mystery shows the layout of the forest and the path adventurers need to follow to reach her. Any deviation from the path will eject travelers from the woods and they will discover they have lost an hour. A small group of monkeyfolk wait outside the woods, they will offer to guide travelers through the woods to Koume if the adventurers pledge to rescue their leader who was imprisoned by the deku. When adventurers reach Koume, they will find her injured and belligerent. She is rude and abrasive, but she knows what she needs, a potion from her sister Kotake will heal her right up, though a cure wounds spell cast at 3rd-level will also heal her. If adventurers leave to tell Kotake about the trouble her sister is in, she will provide them with a magic bottle filled with a potion of greater healing to help her sister, free of charge.",
    pageReference: "158",
    rewards: [{ name: "Bottle (Red Potion)", type: "Item" as const }],
    steps: [
      {
        id: "q38-1",
        title: "Find Koume",
        description: "Locate the injured Koume in the Woods of Mystery. Get a Red Potion from Kotake at the Potion Shop and bring it to her.",
        xpReward: 200,
        location: "Woods of Mystery",
        characterId: "koume",
        curiosityShopUnlock: { itemName: "Alchemy Jug", id: "si-38" },
        itemRewards: [{ name: "Bottle (Red Potion)", type: "Item" as const }],
        pageReference: "158"
      }
    ],
    failureConsequence: "Leaving Koume into the woods means leaving her to die. Kotake will go out searching for her sister if she has no word from her, but won’t be able to find her in time. The monkeys can find her, but Kotake will ignore their advice. It is possible to save Koume’s life by giving the monkeys a potion of healing but without any intervention, the witch will die."
  },
  {
    id: "q39", questNumber: 39, title: "Swamp Shooting Champ", region: Region.SouthernSwamp,
    description: "The swamp shooting gallery has moving targets and offers a reward for anyone who can beat their challenge. Taking the challenge costs 40 rupees. Challengers will be provided with a longbow and ten arrows.",
    pageReference: "158",
    rewards: [{ name: "Largest Quiver", type: "Item" as const }, ITEMS.heart],
    steps: [
      {
        id: "q39-1",
        title: "Clear the Gallery",
        description: "The swamp shooting gallery has moving targets and offers a reward for anyone who can beat their challenge. Taking the challenge costs 40 rupees. Challengers will be provided with a longbow and ten arrows. If the challenger hits all the targets, they will be rewarded with a +1 arrow. Playing the Minigame. Set up a deck of cards, removing aces and face cards, then draw a card at the start of each round. Up to six cards. The card’s suit determines which target will appear, and its AC, the card’s value determines how long it remains on the board. Each target has an HP of 1. Challengers have the ten arrows with which to make their attack, there is no time limit and they are not required to take a shot every round, but they should not know how long an individual target will remain on the field.",
        xpReward: 75,
        location: "Swamp Shooting Gallery",
        curiosityShopUnlock: { itemName: "Quiver of Ehlonna", id: "si-39-1" },
        itemRewards: [{ name: "Largest Quiver", type: "Item" as const }],
        pageReference: "158"
      },
      {
        id: "q39-2",
        title: "Master the Gallery",
        description: "For no additional cost, challengers at the shooting gallery can opt to take the harder trial. Adventurers receive the same gear but the GM, to determine the targets that appear, draw eight cards instead of six. If challengers succeed in hitting all the targets for this challenge, they receive a piece of heart.",
        xpReward: 125,
        location: "Swamp Shooting Gallery",
        curiosityShopUnlock: { itemName: "Arrow-Catching Shield", id: "si-39-2" },
        itemRewards: [ITEMS.heart],
        prerequisiteStepId: "q39-1",
        pageReference: "159"
      }
    ]
  },
  {
    id: "q40", questNumber: 40, title: "Swamp Fishing Hole", region: Region.SouthernSwamp,
    description: "The swamp passage has a building built within the trees with a deep-man made pond dug inside of it. The proprietor has stocked this pond with a number and variety of different fish and is offering enthusiasts the chance to win prizes based on the size and variety of the fish they manage to catch. Playing the Minigame. The fishing hole minigame is essentially a modified version of Go Fish. To play the DM shuffles and lays down a deck of cards, then deals seven cards to the fishing player and draw seven cards themselves. The objective is to have at least two different cards of the same value, the higher the value of the card, the rarer the fish, the more cards of that value, the bigger the fish. Once cards have been dealt the fishing player may then make a DC 13 Wisdom (survival) check. On a success, they may shuffle any number of cards back into the deck and draw back up to seven. Then the fishing player may make a DC 14 fishing gear tool check using Wisdom as the ability. On a success, the fishing player may ask the DM if they have any cards of a particular value; if they do, the DM must hand over all cards of that value, and then draw back up to seven, if they do not, the player draws two cards off the top of the deck, then discards down to seven cards, shuffling discarded cards back into the deck. If a player matches four cards, they may put the matches aside and draw back up to seven. After five rounds, the fishing player reveals the best set of four cards they collected, and then make a fishing gear tool check, using Strength or Dexterity, with a DC determined by the fish caught to reel the fish in. The fish available to be caught, the card suits required to catch them, the DC to reel them in, and the prizes awarded are listed in Table 10-X: Swamp Fishing. Some fish are attracted if fishers are wearing a specific mask while they are fishing. These odd fish, along with every other fish variety that has been stocked in the fishing pond is posted on the wall for fishers to consult. The fish that will appear based on the masks you are wearing are: The ancient fish, attracted to the gibdo mask; The cuccofish, attracted to the Bremen mask; The fragrant reekfish, attracted to the mask of scents; The mooranha, attracted to Romani's mask; The postal salmon, attracted to the Postman's hat. If adventurers are not wearing these masks, but assemble the appropriate suit, they instead pull a random trinket from the trinket table in chapter 5 of the Player's Handbook.",
    pageReference: "159",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q40-1",
      title: "Catch the Big One",
      description: "Catch the Colossal Catfish or Lord Chapu Chapu to win a Piece of Heart.",
      xpReward: 200,
      location: "Swamp Fishing Hole",
      curiosityShopUnlock: { itemName: "Cloak of Elvenkind", id: "si-40" },
      itemRewards: [ITEMS.heart],
      pageReference: "159"
    }]
  },
  {
    id: "q41", questNumber: 41, title: "The Terrifying Swamp House", region: Region.SouthernSwamp,
    description: "Rumors surround the swamp house that a powerful curse holds the mansion in its sway. On entering, travelers will find the twisted form of Henri Maudit. He will tell explorers that he came to the house in search of gold, but was tricked and cursed into the form he now occupied. He will explain that the curse is sustained by creatures inside the house, 10 gold skulltulas. If adventurers can kill all of these monsters, he would be free of the curse and he offers his mask of truth as an incentive. Playing the Minigame. There are 10 gold skulltulas and five curse skulltulas hiding inside of the swamp spider house and each room inside the house has five locations where spiders could be hiding. The DM will pick 15 of those locations and “place” one type of spider in each. When explorers enter a room their passive perception will allow them to determine if any of the loudly chittering spiders remain hiding in that room, with a DC set by the location the spider is hiding. The DM must include each hiding spot in their description of each room and players may freely investigate with an Intelligence (Investigation) check, its DC also set by the spider’s hiding place. When a spider is discovered, players may make a DC 15 Intelligence (Nature) check, or DC 17 Intelligence (Arcana) check to determine what type of spider they have found. The spiders are typically placid, but will attack if agitated. When all 10 gold skulltulas have been destroyed, the curse on Maudit will break and he will award players with the promised mask.",
    pageReference: "160",
    rewards: [ITEMS.maskOfTruth],
    steps: [{
      id: "q41-1",
      title: "Break the Curse",
      description: "Collect all 10 Gold Skulltula tokens in the Swamp Spider House to lift the curse on Henri Maudit.",
      xpReward: 200,
      location: "Swamp Spider House",
      characterId: "henri",
      curiosityShopUnlock: { itemName: "Slippers of Spider Climbing", id: "si-41" },
      itemRewards: [ITEMS.maskOfTruth],
      pageReference: "160"
    }]
  },
  {
    id: "q42", questNumber: 42, title: "Pictograph Contest", region: Region.SouthernSwamp,
    description: "With the acquisition of a pictograph box and the ability to take photographs with the device, the Swamp Tourism Bureau has decided to arrange a pictograph contest to showcase the beauty of the swamp. When using the pictograph tool to take photographs of the swamp, you can make what is essentially an improvised tool check using Wisdom to take photographs. The result of the roll determines the quality of the photograph. Photos from a result of 10 or lower comes with an award of 10 rupees. Photos of a result of 11-14 comes with an award of 20 rupees. Photos of a result of 15-19 comes with an award of 50 rupees. Photos of a result of 20 or higher come with an award of 100 rupees.",
    pageReference: "160",
    rewards: [ITEMS.heart, ITEMS.heart],
    steps: [
      {
        id: "q42-1",
        title: "Photo of Tingle",
        description: "Tingle is the son of the chief of the Swamp Tourism Bureau. Though the man is disappointed by his son and his childish fixation on fairies, and will not speak of him in public, he does still love his son. If the adventurers take a picture of Tingle for the man, he will tear up and award them with a piece of heart.",
        xpReward: 60,
        location: "Tourism Center",
        characterId: "swampy",
        curiosityShopUnlock: { itemName: "Dust of Sneezing and Choking", id: "si-42-1" },
        itemRewards: [ITEMS.heart],
        pageReference: "161"
      },
      {
        id: "q42-2",
        title: "Photo of Deku King",
        description: "The Deku King has been a reclusive madman hiding inside his palace. Even before the loss of his daughter, the king and his court were practically unseen. If the adventurers manage to sneak a photograph of the Deku King, or convince them to let a photo be taken, the Swamp Tourism Bureau will award the photographers a piece of heart.",
        xpReward: 60,
        location: "Tourism Center",
        characterId: "swampy",
        curiosityShopUnlock: { itemName: "Weapon of Warning", id: "si-42-2" },
        itemRewards: [ITEMS.heart],
        pageReference: "161"
      }
    ]
  },
  {
    id: "q43", questNumber: 43, title: "A Hag's New Business", region: Region.SouthernSwamp,
    description: "After Koume has been rescued in quest 38 and Odolwa has been defeated, the witch will start up a new line of business, broom surfing. Koume will say that this game is a competition, and ask for 50 rupees from each participant. Once decided, she will give each challenger a broom of flying and instruct them to race one lap around the natural circuit formed by the swamp’s water flow, which she will demonstrate for them. Playing the Minigame. As the players fly with the broom, they will have to determine how fast they want to race and then make an Acrobatics check to try and stay on the broom, with a DC determined by the speed at which they are racing as per Table 10-X: Broom Racing Checks. Failing the check by more than 5 results in a stumble, making the next check with a -1. Failing the check by more than 10 will result in the racer falling off. If a racer falls off they can, as a reaction, make a DC 14 Strength (Athletics) or Dexterity (Acrobatics) check to grab hold and climb back on, reducing their speed to 0 for the next round, but keeping them in the race. Koume will follow as the pace-setter, traveling at a speed of 35 feet. Koume will award the winner of the race a piece of heart. If anyone beats her pace time, she’ll gift the winner (if they beat her time) a magic bottle.",
    pageReference: "161",
    rewards: [ITEMS.heart, ITEMS.bottle],
    steps: [{
      id: "q43-1",
      title: "Broom Racing",
      description: "Win the broom race to get a Piece of Heart. Beat Koume's time for an Empty Bottle.",
      xpReward: 200,
      location: "Tourism Center",
      characterId: "koume",
      prerequisiteStepId: "mq1-2", 
      curiosityShopUnlock: { itemName: "Broom of Flying", id: "si-43" },
      itemRewards: [ITEMS.heart],
      pageReference: "161"
    }]
  },
  {
    id: "q44", questNumber: 44, title: "A Royal Rush", region: Region.SouthernSwamp,
    description: "The Deku princess went to try to resolve the poison that was pouring out from Woodfall Temple. With the help of one of the monkeyfolk, she entered the temple, but was captured by Odolwa. Her disappearance threw the Deku Kingdom into chaos, but her return could restore it.",
    pageReference: "161",
    rewards: [ITEMS.maskOfScents],
    steps: [
      {
        id: "q44-1",
        title: "Return the Princess",
        description: "The Deku Princess can be found in room W13 in Woodfall Temple, accessible through W12 where Odolwa waits. When Odolwa has been defeated, the princess can be rescued. If what has happened is explained to her she will be incensed and demand to be taken back to the Deku Kingdom as soon as possible so she can stop her father and free the innocent monkey.",
        xpReward: 75,
        location: "Deku Palace",
        characterId: "deku-king",
        prerequisiteStepId: "mq1-2",
        curiosityShopUnlock: { itemName: "Rod of Rulership", id: "si-44-1" },
        pageReference: "161"
      },
      {
        id: "q44-2",
        title: "A Monkey's Innocence",
        description: "The deku king is intent on killing the monkey as retribution for its supposed role in the kidnapping and assumed death of the princess. If the princess is rescued after defeating Odolwa in Quest 44-1, she’ll be more than able to speak in her friend’s defense. If the princess is not with you, the deku king will take more convincing. Adventurers will need o develop a reasonable argument (as determined by the DM) and then succeed a DC 15 Charisma (Persuasion) or (Intimidation) check to convince the Deku King to stand down.",
        xpReward: 25,
        location: "Deku Palace",
        curiosityShopUnlock: { itemName: "Gloves of Swimming and Climbing", id: "si-44-2" },
        prerequisiteStepId: "q44-1",
        pageReference: "161"
      },
      {
        id: "q44-3",
        title: "Chase the Butler",
        description: "The king will declare that, for rescuing the princess and proving the innocence of a true ally of the kingdom, the adventurers shall be awarded a prize from within the royal treasury. He then orders the Deku Butler to escort them. The butler will decide to add a final test or game to the award and will begin to dash away, telling followers to simply “keep up” before running down the castle’s halls. Playing the Minigame. The Deku Butler has a speed of 30 feet and will use the dash action each round to reach a destination 300 feet away. Once he has reached it, he will close the door after three rounds. To further complicate matters, there are roots and other stumbling blocks lining the passage. The butler knows them each perfectly, but chasing adventurers will need to make Dexterity saving throws every 10 feet, or lose five feet of their movement speed for each failure. To determine the challenge of each Dexterity save, draw a card from a deck; the difficulty equals the card’s value +8. Once you have caught up with the deku butler, he will apologize and explain that he was caught up with memories of chasing his lost son down these same halls. After apologizing, he will hand over the mask of scents. If adventurers ask him further about his son, he will tell of a deku hero who left for the tunnels under clock town to seek help from another world, providing an additional hook for quest 5.",
        xpReward: 125,
        location: "Deku Shrine",
        characterId: "deku-butler",
        curiosityShopUnlock: { itemName: "Elemental Gem (Emerald)", id: "si-44-3" },
        itemRewards: [ITEMS.maskOfScents],
        prerequisiteStepId: "q44-2",
        pageReference: "162"
      }
    ]
  },
  {
    id: "q45", questNumber: 45, title: "Follow the Feathers", region: Region.NorthernMountain,
    description: "Nearby the goron shrine, positioned high above the dark chasm below the goron village’s cliffs is a small cave that can be seen at the top of a thin spire of stone. Between the cliffs and the cave there are a series of magical platforms that are completely invisible. Goron shaman consider it a rite of passage to leap between the invisible platforms and make it all the way over to the cavern and all the way back. Kaepora Gaebora wants to provide adventurers with another tool to help them oppose Majora, and will place their feathers onto the platforms to guide you.",
    pageReference: "162",
    rewards: [ITEMS.lensOfTruth],
    steps: [{
      id: "q45-1",
      title: "Lone Peak Shrine",
      description: "Cross the chasm using the owl feathers as guides. Inside of the cavern, adventurers can recover the lens of truth. With the lens, adventurers can see the platforms, and no longer need to make Perception checks to see them.",
      xpReward: 120,
      location: "Goron Village",
      curiosityShopUnlock: { itemName: "Lantern of Revealing", id: "si-45" },
      itemRewards: [ITEMS.lensOfTruth],
      pageReference: "162"
    }]
  },
  {
    id: "q46", questNumber: 46, title: "Absolve the Goron Hero", region: Region.NorthernMountain,
    description: "People in the Mountain Village have been talking about spectral visions of the goron hero, Darmani III, who died trying to end the threats in Snowhead Temple. Rumors have been circling through the villages in the mountain that Darmani cannot rest so long as the gorons are in danger. Inside the Goron Shrine that overlooks the mountain village, the restless spirit of the Goron hero Darmani III lingers over his shrine. The hero attempted to end the curse of ice coming from Snowhead but, unable to see the biggoron blocking the way and blasting away people challenging the slope, he was thrown over the side of the thin passage and fell to his death in the deep caldera.",
    pageReference: "162",
    rewards: [ITEMS.goronMask],
    steps: [{
      id: "q46-1",
      title: "Heal Darmani",
      description: "Darmani is visible on the ethereal plane. Use the Lens of Truth to see Darmani's ghost. If adventurers pledge to finish the Goron hero's work and perform the song of healing, the hero's spirit will pass on and they will receive the races’ mask (goron). Darmani also had proficiency with drums, and this version of the mask will confer that proficiency.",
      xpReward: 120,
      location: "Goron Graveyard",
      characterId: "darmani",
      curiosityShopUnlock: { itemName: "Ring of the Ram", id: "si-46" },
      itemRewards: [ITEMS.goronMask],
      pageReference: "162"
    }]
  },
  {
    id: "q47", questNumber: 47, title: "A Goron's Grief", region: Region.NorthernMountain,
    description: "The winters that have plagued the northern mountains have caused some other problems for the goron that live there. One goron has been keeping the entirety of the goron sanctuary awake, another has been trapped in the cold.",
    pageReference: "162",
    rewards: [ITEMS.donGeroMask],
    steps: [
      {
        id: "q47-1",
        title: "The Elder's Son is Sleepy",
        description: "None of the gorons that have trapped themselves inside of the goron shrine have been able to sleep since the Goron Elder has left as his son has not stopped crying for a second. The kid seems to have iron and inexhaustible lungs. The youngest goron on the northern mountain, the child of the goron elder, has been screaming incessantly following the death of Darmani and the subsequent disappearance of the goron elder. Play the Goron Lullaby for the Elder's Son to put him to sleep. Use the Rock Sirloin you receive for the next step.",
        xpReward: 100,
        location: "Goron Shrine",
        characterId: "goron-child",
        curiosityShopUnlock: { itemName: "Ring of Warmth", id: "si-47-1" },
        pageReference: "163"
      },
      {
        id: "q47-2",
        title: "Feed the Hungry Goron",
        description: "A goron is so hungry that he climbed up one of the cliff faces by the mountain village trying to find some rich stones that he could eat so he doesn’t starve to death. Unfortunately he very obviously got stuck up there. Near the frozen waterfall, on top of it in fact, is a goron who got trapped up there trying to climb the ice in search of minerals to sustain themselves through this unusually lean winter. Throw the Rock Sirloin to the shivering Goron on the ledge in Mountain Village. If adventurers manage to get the goron down and provide them with a rock sirloin, the goron will give them Don Gero’s mask.",
        xpReward: 100,
        location: "Mountain Village",
        characterId: "hungry-goron",
        curiosityShopUnlock: { itemName: "Boots of the Winterlands", id: "si-47-2" },
        itemRewards: [ITEMS.donGeroMask],
        prerequisiteStepId: "q47-1",
        pageReference: "163"
      }
    ],
    failureConsequence: "If Goht is defeated and the mountain thawed, there is little consequence to letting these quests sit by the wayside. If Goht is not defeated, the goron in the sanctuary will be driven out into the cold and likely starve to death with the one on the waterfall while they try to dig out their old mines."
  },
  {
    id: "q48", questNumber: 48, title: "Goron Races! Rock N' Roll", region: Region.NorthernMountain,
    description: "The goron have been stiff and exhausted from their forced confinement in the Goron Shrine. Many of them have been talking about how eager they are to stretch their muscles and take place in one of their great rolling races. When the curse of Goht has been broken, the gorons will arrange a great race in celebration and to stretch their muscles after a period of imposed confinement. Visitors are welcome to participate in the races, but the goron will warn people of other races that goron races are “a bit... rough.”",
    pageReference: "163",
    rewards: [ITEMS.goldDust],
    steps: [{
      id: "q48-1",
      title: "Win the Goron Race",
      description: "Participate in and win the Goron Race after Goht is defeated. Adventurers that win the race will be awarded a magic bottle containing fine gold dust.",
      xpReward: 200,
      location: "Goron Racetrack",
      prerequisiteStepId: "mq2-2",
      curiosityShopUnlock: { itemName: "Mithral Armor", id: "si-48" },
      itemRewards: [ITEMS.goldDust],
      pageReference: "163"
    }]
  },
  {
    id: "q49", questNumber: 49, title: "A Sharper Sword", region: Region.NorthernMountain,
    description: "The smiths of the Mountain Village are famous for their high quality weapons, but they haven’t been able to forge something for some time. Some of the guards in Clock Town may be pining for the kind of quality that those two can offer. In the mountain village to the north of Clock Town there are two master smiths that operate a forge. They have been wanting to show off their skills and demonstrate what their skills and forge are capable of making. In a perverse way, the disasters brought about by Majora’s Mask have been the perfect opportunity for them.",
    pageReference: "163",
    rewards: [ITEMS.gildedSword],
    steps: [
      {
        id: "q49-1",
        title: "The Razor Sword",
        description: "In exchange for 100 rupees, the smiths of the mountain village will agree to reforge any mundane weapon and imbue it with the razor weapon enchantment. The forging and enchantment process will take 24 hours to complete.",
        xpReward: 40,
        location: "Mountain Smithy",
        characterId: "smiths",
        curiosityShopUnlock: { itemName: "Sentinel Shield", id: "si-49-1" },
        pageReference: "163"
      },
      {
        id: "q49-2",
        title: "The Gilded Sword",
        description: "If an adventurer has a weapon enchanted with the Razor Sword enchantment and at least one pound of fine Goron gold dust, then in exchange for 500 rupees the smiths of the mountain village with further enhance the weapon with the golden weapon enchantment. Forging and enhancing the enchantment will take 24 hours to complete.",
        xpReward: 80,
        location: "Mountain Smithy",
        characterId: "smiths",
        prerequisiteStepId: "q49-1",
        curiosityShopUnlock: { itemName: "Brooch of Shielding", id: "si-49-2" },
        itemRewards: [ITEMS.gildedSword],
        pageReference: "164"
      }
    ]
  },
  {
    id: "q50", questNumber: 50, title: "Reunite the Frog Choir", region: Region.World,
    description: "One of the foremost destinations after the winter is the famous frog choir that performs in the northern mountain. Though few people are really aware that the frog choir is intentionally performing, everyone who visits the mountains appreciates the sound. Though they can’t perform while the waters are frozen and many of the frogs have left for different places while the band is disbanded. After the winter that blanketed the northern mountains has been thawed with the defeat of Goht, life will return to the ponds of the mountain village. Questions abound as to the famed frog choir will reunite now that it is safe to return to the mountains.",
    pageReference: "164",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q50-1",
      title: "Conduct the Choir",
      description: "A single frog rests on a lily pad... If adventurers are wearing Don Gero’s Mask, the frog will beg them to reunite the choir and tell them more about where to find the other members. One frog sought civilization and went to Clock Town (it can be found in the laundry pool). Two frogs wanted warmer waters and went to the swamp (one is near the witch’s potion shop, the other was transformed into Gekko). The fourth frog went to try sea climes and traveled to the ocean (where they were also transformed into Gekko). Return to Mountain Village in spring to conduct them.",
      xpReward: 200,
      location: "Mountain Village (Spring)",
      curiosityShopUnlock: { itemName: "Ring of Jumping", id: "si-50" },
      itemRewards: [ITEMS.heart],
      pageReference: "164"
    }],
    failureConsequence: "If the frogs are left to their own devices, there will be little consequence to the world at large, but the mountains will have lost a certain verve with their absence."
  },
  {
    id: "q51", questNumber: 51, title: "Put the Zora Guitarist to Rest", region: Region.WesternSea,
    description: "The Zora hero and the lead guitarist of the zora band the Indigo-Gos rushed out to the pirates’ fortress to retrieve the eggs they stole. No one has heard from him since he left. A cloud of gulls hovers over the southern part of the coast, they seem to be pecking at some flotsam or something. Rushing to save the stolen eggs of Lulu Mikau, a warrior and the lead guitarist for the zora band, charged into the Gerudo Pirate’s fortress. Unfortunately the horde of pirates proved too much for him, and as a reward for his foolish bravery he was beaten near to death and tossed into the ocean. Mikau drifted through the currents, harassed by gulls as he slowly dies.",
    pageReference: "164",
    rewards: [ITEMS.zoraMask],
    steps: [
      {
        id: "q51-1",
        title: "Heal Mikau",
        description: "Mikau can be easily seen from the shore, a cloud of gulls marking his location. Once on shore, Mikau has enough strength for an impassioned plea. He will tell his rescuers what happened and beg them to save Lulu’s eggs from the pirates. He tried himself and failed, if only someone could heal him, or could carry on his quest. Mikau knows he is about to die, however, he cannot rest. If adventurers perform the song of healing, Mikau will surrender himself to its power. Mikau will fade away and leave behind the races’ mask (zora mask).",
        xpReward: 40,
        location: "Great Bay Coast",
        characterId: "mikau",
        curiosityShopUnlock: { itemName: "Ring of Free Action", id: "si-51-1" },
        itemRewards: [ITEMS.zoraMask],
        pageReference: "164"
      },
      {
        id: "q51-2",
        title: "Healing the Guitarist",
        description: "Mikau can be restored to health with dedication and effort, he has barely any strength left and spare the dying will only buy time. To heal Mikau will require the use of spare the dying to stabilize him, greater restoration to ease his exhaustion, and cure wounds cast at 3rd-level or higher to restore his health. If Mikau is restored to health, he will assist his rescuers.",
        xpReward: 80,
        location: "Great Bay Coast",
        characterId: "mikau",
        curiosityShopUnlock: { itemName: "Philter of Love", id: "si-51-2" },
        pageReference: "164"
      }
    ],
    failureConsequence: "If Mikau is not put to rest, his spirit will begin to haunt Lulu, trying to provide her some comfort or protect her like he couldn’t when he was alive. This will only serve to drive her deeper into grief, especially if her eggs still have not been recovered."
  },
  {
    id: "q52", questNumber: 52, title: "Ocean Fishing Hole", region: Region.WesternSea,
    description: "Pictures of fish are put up with arrows guiding people down to the fishing hole. Some of the fish depicted are very rare. A small salt water pond built nearby zora cape that the owner has kept climate-controlled and stocked with exotic fish. They offer prizes for fisherman who manage to catch the so-called “boss fish” in the pond.",
    pageReference: "165",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q52-1",
      title: "Catch the Big One",
      description: "The fish available to be caught include the King Savage Shark and Ace Great Fairy Fish. Successfully catching either of the two fish that come with an award of a piece of heart also comes with an award of 200 XP.",
      xpReward: 200,
      location: "Ocean Fishing Hole",
      curiosityShopUnlock: { itemName: "Ring of Water Walking", id: "si-52" },
      itemRewards: [ITEMS.heart],
      pageReference: "165"
    }]
  },
  {
    id: "q53", questNumber: 53, title: "A Fish's Wish", region: Region.WesternSea,
    description: "In the Fisherman’s hut, he’s been displaying a prize catch (and one of the few things he’s been able to catch lately), an extremely restless seahorse. A seahorse has been captured by the fisherman who lives on the Great Bay coast. The fisherman has the creature on display in a large bowl and will proudly announce that he’s the only one skilled enough to have fished something out of the water by pinnacle rock. A DC 14 Wisdom (Insight) check will show that the seahorse looks distressed, more so than a fish in a bowl should look.",
    pageReference: "165",
    rewards: [ITEMS.heart],
    steps: [
      {
        id: "q53-1",
        title: "Seahorse Rescue",
        description: "The fisherman is reluctant to part with his exotic prize. He will only accept money reluctantly... However, there is something he wants desperately. The fisherman is fixated on the gerudo pirates who live nearby. He believes they’re the most beautiful things in existence. He will offer to exchange the seahorse for a high-quality pictograph of the pirate queen, or for a lock of her hair.",
        xpReward: 75,
        location: "Fisherman's Hut",
        characterId: "pescador",
        curiosityShopUnlock: { itemName: "Cap of Water Breathing", id: "si-53-1" },
        pageReference: "166"
      },
      {
        id: "q53-2",
        title: "Defeat Sea Snakes",
        description: "Using some method to speak with animals will allow explorers to communicate with the seahorse. The fish will explain that it has a partner trapped by monsters in the abyss by pinnacle rock and beg for help to rescue them. Four deep pythons live within the depths of the waters by Pinnacle Rock. The seahorse will be able to guide you through the waters. If the four sea serpents are destroyed, the trapped seahorse will come out and the two seahorses will gift their saviors with a piece of heart.",
        xpReward: 125,
        location: "Pinnacle Rock",
        curiosityShopUnlock: { itemName: "Staff of the Python", id: "si-53-2" },
        itemRewards: [ITEMS.heart],
        prerequisiteStepId: "q53-1",
        pageReference: "166"
      }
    ],
    failureConsequence: "Trapped down in the abyss, the lost seahorse will eventually either starve to death, or be eaten by the deep pythons when they try to escape."
  },
  {
    id: "q54", questNumber: 54, title: "The Suspicious Ocean House", region: Region.WesternSea,
    description: "Strange rumors abound about the abandoned spider house, talk of curses and hidden treasure are floating around. Outside of the Oceanside Spider House, a crowd will slowly gather, hoping to use the building as a shelter when the moon falls. However, each time anyone tries to go in, they almost immediately flee, overwhelmed with terror. The house is cursed, and will not allow weaker souls entry. One of them will inform adventurers that they saw golden spiders inside of the building and that, if they can all be destroyed, the curse will break.",
    pageReference: "166",
    rewards: [{ name: "Giant's Wallet", type: "Item" as const }],
    steps: [{
      id: "q54-1",
      title: "Clear the House",
      description: "To incentivize curse-breakers, the crowd will offer to take up a collection to offer payment to anyone who will break the curse. When all 10 gold skulltulas have been destroyed, the curse on the house will break and the people waiting to take shelter outside will give the adventurers 1,000 rupees (or Giant's Wallet if Day 1).",
      xpReward: 200,
      location: "Oceanside Spider House",
      curiosityShopUnlock: { itemName: "Wand of Web", id: "si-54" },
      itemRewards: [{ name: "Giant's Wallet", type: "Item" as const }],
      pageReference: "166"
    }]
  },
  {
    id: "q55", questNumber: 55, title: "Spider House Mystery", region: Region.WesternSea,
    description: "The former owner of the spider house has long since left the place abandoned but it’s rumored that he locked away a valuable treasure somewhere in the building. Six stalchildren have been dispatched to the Oceanside Spider House to investigate its mysteries to potentially aid the kingdom of Ikana. They haven’t come to any solid conclusions yet, but they have managed to piece together some hints on a treasure hidden within the strange house.",
    pageReference: "167",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q55-1",
      title: "Colored Masks Code",
      description: "If adventurers are wearing the Captain’s Hat to pass as Captain Keeta, the stalchildren will share what they have learned. Inside of the dining room are a set of four masks... Hitting the switches in the specific order revealed by the stalchildren will open the hatch in the fireplace inside the Oceanside Spider House, allowing access to OS6 and the piece of heart held in a treasure chest inside of it.",
      xpReward: 300,
      location: "Oceanside Spider House",
      curiosityShopUnlock: { itemName: "Eyes of Minute Seeing", id: "si-55" },
      itemRewards: [ITEMS.heart],
      pageReference: "167"
    }]
  },
  {
    id: "q56", questNumber: 56, title: "Gimme a Break", region: Region.WesternSea,
    description: "An enterprising zora has set up a little game for other Zora to challenge themselves with for strength and accuracy. By the shore of the Great Bay, near Zora Cape, there is an enterprising zora who has set up a small game of skill. They have set up a row of clay pots and a small rack of boomerangs. Anyone can pay 10 rupees to take a shot at smashing all of the pots with one of the boomerangs, and a prize is awarded depending on the level of challenge.",
    pageReference: "167",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q56-1",
      title: "Break the Pots",
      description: "There are six ceramic pots set up on posts in an arcing path. Challengers must throw the boomerang with an improvised ranged weapon check... If you break all pots in one throw, you win a Piece of Heart.",
      xpReward: 200,
      location: "Zora Cape",
      curiosityShopUnlock: { itemName: "Wand of the War Mage (+1)", id: "si-56" },
      itemRewards: [ITEMS.heart],
      pageReference: "167"
    }]
  },
  {
    id: "q57", questNumber: 57, title: "Race the Beaver Bros", region: Region.WesternSea,
    description: "The pair of beavers that live at the top of the waterfall have been making big talk about how they’re faster than anyone in the water, and have been staking the magic items in their possessions on that claim. The two beaver brothers, Norbert and Daggett, have been calling all comers to try and face them in a race through their new dam. To entice challengers to brave the falls needed to access the dam, they have been staking a magic bottle that they’ll give to winners.",
    pageReference: "168",
    rewards: [ITEMS.bottle, ITEMS.heart],
    steps: [
      {
        id: "q57-1",
        title: "Race Daggett",
        description: "The first challenge is chasing down the younger beaver brother, Daggett... The race is a fair contest... When Daggett is caught, he will acknowledge that he said he would give you a magic bottle, but can’t hand it over without his brother’s permission.",
        xpReward: 75,
        location: "Waterfall Rapids",
        characterId: "beavers",
        curiosityShopUnlock: { itemName: "Mariner's Armor", id: "si-57-1" },
        pageReference: "168"
      },
      {
        id: "q57-2",
        title: "Race Norbert",
        description: "After Daggett has been caught in a race, he will bring out his older brother Norbert. Norbert asks challengers to take on the same race, with himself as their opponent... When challengers manage to catch Norbert, he will hand over the magic bottle that was promised.",
        xpReward: 125,
        location: "Waterfall Rapids",
        characterId: "beavers",
        prerequisiteStepId: "q57-1",
        curiosityShopUnlock: { itemName: "Ring of Swimming", id: "si-57-2" },
        itemRewards: [ITEMS.bottle],
        pageReference: "168"
      }
    ]
  },
  {
    id: "q58", questNumber: 58, title: "Playing Paparazzi", region: Region.WesternSea,
    description: "With the Indigo-Gos popularity, a lot of the Zora have become massive fans. Some of these zora will pay top dollar for candid pictures of the band. The zora of Zora Cape have become fanatics for the band the Indigo-Gos and they will pay handsomely for memorabilia.",
    pageReference: "168",
    rewards: [{ name: "Rupees", type: "Item" as const }],
    steps: [{
      id: "q58-1",
      title: "Photo of Lulu",
      description: "A zora can be found trying to peer into the private rooms of the band’s members. When confronted, they will confess to trying to peer into their private spaces. If adventures have a pictograph box, the zora will offer to purchase candid pictures of the Indigo-Gos for 100 rupees each and an additional 500 rupees for a complete set of photographs. Take a picture of Lulu and sell it to the fan in Zora Hall.",
      xpReward: 120,
      location: "Zora Hall",
      characterId: "lulu",
      curiosityShopUnlock: { itemName: "Cloak of the Manta Ray", id: "si-58" },
      pageReference: "168"
    }],
    failureConsequence: "There is absolutely no consequence for not taking candid photos of the zora band without their knowledge or permission."
  },
  {
    id: "q59", questNumber: 59, title: "A Zora Swan Song", region: Region.WesternSea,
    description: "With Lulu, the lead singer of the Indigo-Gos, rendered mute the band has been trying to come up with some new songs that do not involve her, but the band leader hasn’t been listening to the other member’s suggestions. Japas, the bassist for the zora band, has been working with Mikau to develop a new tune for the band. Unfortunately, with Mikau missing, he’s missing a jam partner and the work they already did. Mikau wrote the cords down, Japas just tried to remember.",
    pageReference: "168",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q59-1",
      title: "Jam Session",
      description: "Adventurers will need to break into Mikau’s room to find his journal... The journal has the cords Japas can’t remember, and he’ll bring the tune to Evan, the band’s manager. Evan is reluctant to change the set... but can be convinced... Once Evan has been convinced Japas will gift 'you dudes' with a piece of heart.",
      xpReward: 120,
      location: "Zora Hall",
      characterId: "evan",
      curiosityShopUnlock: { itemName: "Dust of Disappearance", id: "si-59" },
      itemRewards: [ITEMS.heart],
      pageReference: "168"
    }]
  },
  {
    id: "q60", questNumber: 60, title: "The Seafarer's Challenge", region: Region.WesternSea,
    description: "Pescador has been talking about opening a side business while fishing is poor, but doesn’t want to do it while the Great Bay is under its evil influence. The fisherman has been thinking of ways to expand his income base since the waters of Great Bay started getting murky. But wanted to wait until they cleared to make sure people would stay safe. If Gyorg has been defeated, he will open up his little challenge to the public.",
    pageReference: "169",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q60-1",
      title: "Island Hop",
      description: "The fisherman has lashed together five boats... and used them to connect two small islands... He offers to let people take his challenge for 20 rupees. Jump from one island to the other and light the torch... The first time an adventurer makes it across the boats, the fisherman will reward them with a piece of heart.",
      xpReward: 200,
      location: "Great Bay Coast",
      characterId: "pescador",
      prerequisiteStepId: "mq3-2", // Gyorg defeated
      curiosityShopUnlock: { itemName: "Trident of Fish Command", id: "si-60" },
      itemRewards: [ITEMS.heart],
      pageReference: "169"
    }]
  },
  {
    id: "q61", questNumber: 61, title: "Racing the Captain", region: Region.EasternCanyon,
    description: "The marker on Captain Keeta’s headstone calls for someone to “'awaken' him and quell his furious flame.” Captain Keeta rests underneath the stone walls at the edge of the Ikana Graveyard, his bones becoming a foundation for the structure as his life was a founding pillar of the Ikana military. During the night, Captain Keeta can be risen with the sonata of awakening.",
    pageReference: "169",
    rewards: [ITEMS.captainsHat],
    steps: [{
      id: "q61-1",
      title: "Defeat Keeta",
      description: "Once awakened, Keeta will pose a challenge, he has left a symbol of his authority nearby, and will give it to those who can prove themselves to him in a martial race... If Captain Keeta can be defeated... He will salute the challengers... and 'promoting' them to the ranks of captain in the Ikanan army and giving them the captain’s hat.",
      xpReward: 200,
      location: "Ikana Graveyard",
      characterId: "keeta",
      curiosityShopUnlock: { itemName: "Dust of Dryness", id: "si-61" },
      itemRewards: [ITEMS.captainsHat],
      pageReference: "169"
    }],
    failureConsequence: "Leaving Captain Keeta to rest nearby the graveyard has very little consequence on their afterlife, or the surroundings. So long as Twinmold is defeated, very little will happen with Keeta in any way, as nothing will be tethering them to the world any more."
  },
  {
    id: "q62", questNumber: 62, title: "You Shall Find Me a Grave Man", region: Region.EasternCanyon,
    description: "The stalfos in the graveyard stalk particular graves at different nights, but their positions and movements almost makes it seem like they’re guarding something. Speaking to the stalchildren that occupy the Ikana Graveyard at night while wearing the captain's hat, allows you to instruct them to open a different grave each night. Each grave has a passage underneath the tomb that hides different rewards secreted away a long time ago.",
    pageReference: "170",
    rewards: [ITEMS.heart, { name: "Empty Bottle", type: "Item" as const }, SPELLS.storms],
    steps: [
      {
        id: "q62-1",
        title: "Day 1 Grave (Flat)",
        description: "Delving into the first of the coffins... large crypt commemorating the two composer brothers, Flat and Sharp... When explorers approach, they will be greeted by the ghost of Flat... He will teach the explorers the song (Song of Storms) and ask them to help his brother.",
        xpReward: 200,
        location: "Ikana Graveyard",
        characterId: "flat",
        day: 1,
        time: "20:00",
        endTime: "04:00",
        curiosityShopUnlock: { itemName: "Javelin of Lightning", id: "si-62-1" },
        itemRewards: [SPELLS.storms],
        pageReference: "170"
      },
      {
        id: "q62-2",
        title: "Day 2 Grave",
        description: "Underneath the second coffin is a long tunnel leading to a crypt... Inside of the crypt is a single iron knuckle standing guard... When the Iron Knuckle is defeated it will reveal a piece of heart.",
        xpReward: 75,
        location: "Ikana Graveyard",
        day: 2,
        time: "20:00",
        endTime: "04:00",
        curiosityShopUnlock: { itemName: "Adamantine Armor", id: "si-62-2" },
        itemRewards: [ITEMS.heart],
        pageReference: "170"
      },
      {
        id: "q62-3",
        title: "Day 3 Grave (Dampe)",
        description: "If adventurers have cleared any of the earlier graves... Dampé himself will meet them... He will tell them that the last grave guarded by stalchildren holds a great treasure of Ikana... Once in the tomb, Dampé will lead them forwards to a great tomb... three ghosts will appear... The ghosts are three former monarchs of Ikana... they ask for three gifts... When adventurers leave something for the three ghosts... the ghosts disappear and leave behind a pile of riches. A magic bottle, a piece of heart, and 1,000 rupees.",
        xpReward: 325,
        location: "Ikana Graveyard",
        characterId: "dampe",
        day: 3,
        time: "20:00",
        endTime: "04:00",
        curiosityShopUnlock: { itemName: "Wand of Magic Detection", id: "si-62-3" },
        itemRewards: [{ name: "Empty Bottle", type: "Item" as const }],
        pageReference: "170"
      }
    ]
  },
  {
    id: "q63", questNumber: 63, title: "The Music Box House", region: Region.EasternCanyon,
    description: "A noted archaeologist and his daughter traveled to the old kingdom and began learning about the undead of the valley as well as the old ruins. Their house had once driven away the undead with a water-driven wheel that powered a magical sound, but with the spring stopped up, there's no water to power the wheel.",
    pageReference: "170",
    rewards: [ITEMS.gibdoMask],
    steps: [
      {
        id: "q63-1",
        title: "The Composer's Ghost",
        description: "At the far east of the old Ikana Kingdom, up the dried river bed, is the spring water cave. Before the curse of undeath spread through Ikana Kingdom the spring spread water through the kingdom, but now the ghost of Sharp has returned, and his curse dried up the spring... If adventurers perform the song of storms for Sharp... Sharp will be able to rest again... he will pass on and the spring will be restored.",
        xpReward: 100,
        location: "Spring Water Cave",
        characterId: "sharp",
        curiosityShopUnlock: { itemName: "Pipes of Haunting", id: "si-63-1" },
        pageReference: "170"
      },
      {
        id: "q63-2",
        title: "The Mummy's Curse",
        description: "The ancient ruins of Ikana Canyon attracted the interest of archaeologist and researcher of the undead, Vater Otou, who brought his daughter with him... Unfortunately Vater was caught in the spread of the curse of undeath... and received a curse himself. Vater has slowly begun to transform into a gibdo... He locked himself away in the basement... If adventurers restore the spring and activate the water wheel that turns the music box which repels the undead, Pamela will begin sneaking outside... If adventurers manage to sneak past Pamela, they will find Vater in the basement... Performing the song of healing for Vater will break the curse, creating the gibdo mask...",
        xpReward: 100,
        location: "Music Box House",
        characterId: "vater",
        prerequisiteStepId: "q63-1",
        curiosityShopUnlock: { itemName: "Staff of the Adder", id: "si-63-2" },
        itemRewards: [ITEMS.gibdoMask],
        pageReference: "171"
      }
    ],
    failureConsequence: "If Sharp's ghost is not put to rest and Twinmold remains alive, the old kingdom will stay dried and barren. It will remain uninhabitable without that source of water.\n\nIf the archaeologist's curse is not somehow purged, eventually the binds holding him will fail and either he will hurt his daughter, or his daughter will be forced to hurt him."
  },
  {
    id: "q64", questNumber: 64, title: "Beneath the Well", region: Region.EasternCanyon,
    description: "The walls of the Ikana Castle have long since been walled off with thick masonry and rendered inaccessible. The old well, long since dried up, may be another way into the castle. Underneath the well in Ikana Canyon is a warren of tunnels that form a maze leading to the interior of Ikana Castle. The various passages are guarded by gibdo. Communicating with the gibdo using the gibdo mask will reveal that each of the undead is guarding a door, but will open it if they can be provided with a specific item.",
    pageReference: "171",
    rewards: [ITEMS.heart, ITEMS.mirrorShield], 
    steps: [{
      id: "q64-1",
      title: "Gibdo Trading",
      description: "The gibdo guarding the doors to the chambers will pose a sort of riddle, and pass on when the answer has been provided to them. Making their way from the well to the entrance underneath Ikana Castle allows access to the Castle courtyard.",
      xpReward: 200,
      location: "Beneath the Well",
      curiosityShopUnlock: { itemName: "Bag of Beans", id: "si-64" },
      itemRewards: [ITEMS.mirrorShield],
      pageReference: "171"
    }],
    failureConsequence: "The spirits under the well are trapped there and bound by their lingering duty. Even if the curse spread by Twinmold is not broken, they will remain within the well."
  },
  {
    id: "q65", questNumber: 65, title: "Free the Canyon Ghosts", region: Region.EasternCanyon,
    description: "The Poe Collector, a keeper of strange spirits has four of his prizes that he wants to offer as a challenge for brave travelers. The poe collector stands outside his “shop” waiting for people to come by. The mysterious man who guards the entrance to Ikana canyon has command over the spirits of four sisters, long dead witches that refuse to pass on. He offers a challenge to those traveling through the canyon. For 30 rupees, adventurers may fight the four poe sisters: Amy, Beth, Joelle, and Meg.",
    pageReference: "172",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q65-1",
      title: "Poe Sisters",
      description: "Defeating the sisters will prompt the gatekeeper to award challengers with a piece of heart.",
      xpReward: 200,
      location: "Spirit House",
      characterId: "poe-collector",
      curiosityShopUnlock: { itemName: "Mace of Terror", id: "si-65" },
      itemRewards: [ITEMS.heart],
      pageReference: "172"
    }],
    failureConsequence: "If the four spirits are not defeated, they will eventually escape their seals and start to haunt the canyon. However, this could take anywhere from days to decades to actually happen."
  },
  {
    id: "q66", questNumber: 66, title: "Vanquished Foes Return", region: Region.EasternCanyon,
    description: "The hidden shrine offers a challenge of combat for those who come to visit the shrine. A whispered voice tells visitors to challenge these angry spirits. Hidden behind the waterfall of the Eastern Canyon (Area I6) is a shrine that holds the spirits of the lesser monsters that were called to serve the great monsters created by the Skull Kid and Majora’s Mask. These mini-bosses wait all at once to form a gauntlet to fight those who would challenge them.",
    pageReference: "172",
    rewards: [ITEMS.heart],
    steps: [{
      id: "q66-1",
      title: "Secret Shrine",
      description: "Upon entering the hidden shrine and stepping into the challenge room, you will face the following monsters in the following order... When one is defeated, it immediately fades into dust, the next mini boss will appear... In addition to XP received for defeating the revived minibosses, adventurers will be awarded with 500 XP.",
      xpReward: 500,
      location: "Secret Shrine",
      curiosityShopUnlock: { itemName: "Nine Lives Stealer", id: "si-66" },
      itemRewards: [ITEMS.heart],
      pageReference: "172"
    }],
    failureConsequence: "There is no consequence to not defeating the spirits of the mini bosses."
  }
];
