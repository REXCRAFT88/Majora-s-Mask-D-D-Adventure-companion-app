

import { ShopItem } from '../types';

export const shopItems: ShopItem[] = [
  { 
    id: "si-1", 
    name: "Cape of the Mountebank", 
    price: 3223, 
    requiredStepId: "mq1-1", 
    questName: "Hear the Monkey's Plea", 
    description: "A loose, silky red cloak with gold embroidery.", 
    stats: "Wondrous item, rare (requires attunement)\n\nThis cape smells faintly of brimstone. While wearing it, you can use it to cast the Dimension Door spell as an action. This property of the cape can't be used again until the next dawn. When you disappear, you leave behind a cloud of smoke, and you appear in a similar cloud of smoke at your destination. The smoke lightly obscures the space you left and the space you appear in, and it dissipates at the end of your next turn. " 
  },
  { 
    id: "si-1-2", 
    name: "Dancing Sword", 
    price: 9406, 
    requiredStepId: "mq1-2", 
    questName: "Defeat Odolwa", 
    description: "A sleek, perfectly balanced blade that hums when released.", 
    stats: "Weapon (any sword), very rare (requires attunement)\n\nYou can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.\n\nWhile the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.\n\nAfter 4 attacks, it flies up to 30 feet and tries to return to your hand." 
  },
  { 
    id: "si-2", 
    name: "Horn of Blasting", 
    price: 819, 
    requiredStepId: "mq2-1", 
    questName: "Calm the Goron Child", 
    description: "A curved horn carved from the tusk of a frozen beast.", 
    stats: "Wondrous item, rare\n\nYou can use an action to speak the horn's command word and then blow the horn, which emits a thunderous blast in a 30-foot cone that is audible 600 feet away. Each creature in the cone must make a DC 15 Constitution saving throw. On a failed save, a creature takes 5d6 thunder damage and is deafened for 1 minute. On a successful save, a creature takes half as much damage and isn't deafened.\n\nEach use of the horn's magic has a 20 percent chance of causing the horn to explode. The explosion deals 10d6 fire damage to the blower and destroys the horn." 
  },
  { 
    id: "si-2-2", 
    name: "Animated Shield", 
    price: 9195, 
    requiredStepId: "mq2-2", 
    questName: "Defeat Goht", 
    description: "A heavy steel shield emblazoned with mechanical gears.", 
    stats: "Armor (shield), very rare (requires attunement)\n\nWhile holding this shield, you can speak its command word as a bonus action to cause it to animate. The shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free. The shield remains animated for 1 minute, until you use a bonus action to end this effect, or until you are incapacitated or die, at which point the shield falls to the ground or into your hand if you have one free." 
  },
  { 
    id: "si-3", 
    name: "Tentacle Rod", 
    price: 640, 
    requiredStepId: "mq3-1", 
    questName: "Recover the Zora's Voice", 
    description: "A strange, rubbery rod with three writhing tendrils at the end.", 
    stats: "Rod, rare (requires attunement)\n\nMade by the Drow, this rod is a magic weapon that ends in three rubbery tentacles. While holding the rod, you can use an action to direct each tentacle to attack a creature you can see within 15 feet of you. Each tentacle makes a melee attack roll with a +9 bonus. On a hit, the tentacle deals 1d6 bludgeoning damage. If you hit a target with all three tentacles, it must make a DC 15 Constitution saving throw. On a failure, the creature's speed is halved, it has disadvantage on Dexterity saving throws, and it can't use reactions for 1 minute." 
  },
  { 
    id: "si-3-2", 
    name: "Staff of Thunder and Lightning", 
    price: 9379, 
    requiredStepId: "mq3-2", 
    questName: "Defeat Gyorg", 
    description: "A sturdy oak staff engraved with storm motifs.", 
    stats: "Staff, very rare (requires attunement)\n\nThis staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. It also has the following properties:\n\nLightning Strike: When you hit with a melee attack, you can cause the target to take an extra 2d6 lightning damage.\n\nThunderclap: When you hit with a melee attack, you can cause the staff to emit a crack of thunder. The target must succeed on a DC 17 Constitution saving throw or become stunned until the end of your next turn.\n\nLightning: Action to cause a 5-foot wide line of lightning 60 feet long (9d6 lightning damage, Dex save DC 17 half).\n\nThunder: Action to cause a 60-foot cone of thunder (2d6 thunder damage, Con save DC 17)." 
  },
  { 
    id: "si-4", 
    name: "Mace of Disruption", 
    price: 564, 
    requiredStepId: "mq4-1", 
    questName: "Put the Undead King to Rest", 
    description: "A heavy iron mace that glows with a faint holy light.", 
    stats: "Weapon (mace), rare (requires attunement)\nDamage: 1d6\nDamage Type: Bludgeoning\nWeight: 4\n\nWhen you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes frightened of you until the end of your next turn.\n\nWhile you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet." 
  },
  { 
    id: "si-4-2", 
    name: "Carpet of Flying", 
    price: 9972, 
    requiredStepId: "mq4-2", 
    questName: "Defeat Twinmold", 
    description: "An ornate rug woven with patterns of clouds and wind.", 
    stats: "Wondrous item, very rare\n\nYou can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.\n\nSize: 4 ft. x 6 ft.\nCapacity: 400 lb.\nFlying Speed: 60 ft.\n\nIf the carpet carries more than its capacity, its speed is reduced to 30 feet. It cannot carry more than double its capacity." 
  },
  { 
    id: "si-5", 
    name: "Staff of the Woodlands", 
    price: 1006, 
    requiredStepId: "q5-1", 
    questName: "Inter the Deku Explorer", 
    description: "A gnarled staff that looks like it grew into its current shape.", 
    stats: "Staff, rare (requires attunement by a druid)\nWeight: 4\nProperties: Versatile (1d8)\nDamage: 1d6\nDamage Type: Bludgeoning\n\n+2 bonus to attack and damage rolls made with this magic quarterstaff. +2 bonus to spell attack rolls (Druid spells).\n\nCharges: 10. Regains 1d6+4 daily at dawn.\nSpells: Animal Friendship (1 ch), Awaken (5 ch), Barkskin (2 ch), Locate Animals or Plants (2 ch), Speak with Animals (1 ch), Speak with Plants (3 ch), Wall of Thorns (6 ch).\n\nTree Form: You can use an action to plant one end of the staff in the earth and turn it into a healthy tree (60ft tall, 5ft dia)." 
  },
  { 
    id: "si-6", 
    name: "Necklace of Prayer Beads", 
    price: 2082, 
    requiredStepId: "q6-1", 
    questName: "Restore Great Fairy of Clock Town", 
    description: "A string of beads blessed by the Great Fairy of Magic.", 
    stats: "Wondrous item, rare (requires attunement by a cleric, druid, or paladin)\n\nThis necklace has 1d4+2 magic beads made from aquamarine, pearl, or topaz. Each bead contains a spell that you can cast as a bonus action.\n\nBlessing (1 bead): Casts Bless (lvl 1).\nCuring (1 bead): Casts Cure Wounds (lvl 2) or Lesser Restoration.\nFavor (1 bead): Casts Greater Restoration.\nWind Walk (1 bead): Casts Wind Walk." 
  },
  { 
    id: "si-6b", 
    name: "Sun Blade", 
    price: 3900, 
    requiredStepId: "q6-2", 
    questName: "Restore Great Fairy of Woodfall", 
    description: "A sword hilt that projects a blade of pure radiance.", 
    stats: "Weapon (longsword), rare (requires attunement)\nDamage: 1d8\nDamage Type: Radiant\nWeight: 3\nProperties: Versatile (1d10), Finesse\n\nThis item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the Finesse property. If you are proficient with shortswords or longswords, you are proficient with the sun blade.\n\nYou gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.\n\nThe sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight." 
  },
  { 
    id: "si-6c", 
    name: "Mantle of Spell Resistance", 
    price: 2219, 
    requiredStepId: "q6-3", 
    questName: "Restore Great Fairy of Snowhead", 
    description: "A shimmering cloak that seems to absorb magical energy.", 
    stats: "Wondrous item, rare (requires attunement)\n\nYou have advantage on saving throws against spells while you wear this cloak." 
  },
  { 
    id: "si-6d", 
    name: "Bracers of Defense", 
    price: 765, 
    requiredStepId: "q6-4", 
    questName: "Restore Great Fairy of Great Bay", 
    description: "Polished silver bracers that deflect blows.", 
    stats: "Wondrous item, rare (requires attunement)\nWeight: 0.5\n\nWhile wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield." 
  },
  { 
    id: "si-6e", 
    name: "Wings of Flying", 
    price: 2597, 
    requiredStepId: "q6-5", 
    questName: "Restore Great Fairy of Stone Tower", 
    description: "A cloak that transforms into bat-like wings.", 
    stats: "Wondrous item, rare (requires attunement)\n\nWhile wearing this cloak, you can use an action to speak its command word. This turns the cloak into a pair of bat wings or bird wings on your back for 1 hour or until you repeat the command word as an action. The wings give you a flying speed of 60 feet. When they disappear, you can't use them again for 1d12 hours." 
  },
  { 
    id: "si-7", 
    name: "Stone of Good Luck", 
    price: 167, 
    requiredStepId: "q7-1", 
    questName: "The Bomber's Notebook", 
    description: "A polished agate that feels warm to the touch.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile this stone is on your person, you gain a +1 bonus to ability checks and saving throws." 
  },
  { 
    id: "si-8a", 
    name: "Winged Boots", 
    price: 156, 
    requiredStepId: "q8-1", 
    questName: "Town Deku Flower", 
    description: "Boots with small white wings at the ankles.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration. If you are flying when the duration expires, you descend at a rate of 30 feet per round until you land." 
  },
  { 
    id: "si-8b", 
    name: "Goggles of Night", 
    price: 100, 
    requiredStepId: "q8-2", 
    questName: "Swamp Deku Flower", 
    description: "Dark lenses that allow vision in absolute darkness.", 
    stats: "Wondrous item, uncommon\n\nWhile wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the goggles increases its range by 60 feet." 
  },
  { 
    id: "si-8c", 
    name: "Decanter of Endless Water", 
    price: 147, 
    requiredStepId: "q8-3", 
    questName: "Mountain Deku Flower", 
    description: "A flask that never runs dry.", 
    stats: "Wondrous item, uncommon\nWeight: 2\n\nThis stoppered flask sloshes when shaken, even if it is empty. You can use an action to remove the stopper and speak one of three command words:\n\n- 'Stream': produces 1 gallon of water.\n- 'Fountain': produces 5 gallons of water.\n- 'Geyser': produces 30 gallons of water that gushes forth in a geyser 30 feet long and 1 foot wide. As a bonus action while holding the decanter, you can aim the geyser at a creature you can see within 30 feet of you. The target must succeed on a DC 13 Strength saving throw or take 1d4 bludgeoning damage and fall prone." 
  },
  { 
    id: "si-8d", 
    name: "Robe of Useful Items", 
    price: 382, 
    requiredStepId: "q8-4", 
    questName: "Ocean Deku Flower", 
    description: "A robe covered in cloth patches of various shapes.", 
    stats: "Wondrous item, uncommon\n\nThis robe has cloth patches of various shapes and colors covering it. While wearing the robe, you can use an action to detach one of the patches, causing it to become the object or creature it represents. Patches: 2 Daggers, 2 Bullseye lanterns, 2 Steel mirrors, 2 10-foot poles, 2 Hempen ropes, 2 Sacks. (Plus 4d4 random items)." 
  },
  { 
    id: "si-9a", 
    name: "Bag of Holding", 
    price: 96, 
    requiredStepId: "q9-1", 
    questName: "A Special Gift From the Bank", 
    description: "A bag that is larger on the inside than the outside.", 
    stats: "Wondrous item, uncommon\nWeight: 15\n\nThis bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents." 
  },
  { 
    id: "si-9b", 
    name: "Elemental Gem (Yellow Diamond)", 
    price: 291, 
    requiredStepId: "q9-2", 
    questName: "Breaking the Bank", 
    description: "A gemstone containing the essence of an Earth Elemental.", 
    stats: "Wondrous item, uncommon\n\nThis gem contains a mote of elemental energy. When you use an action to break the gem, an Earth Elemental is summoned as if you had cast the Conjure Elemental spell, and the gem is destroyed." 
  },
  { 
    id: "si-10a", 
    name: "Amulet of Proof against Detection and Location", 
    price: 145, 
    requiredStepId: "q10-1", 
    questName: "Find My Son!", 
    description: "A golden amulet that shields the wearer from divination.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile wearing this amulet, you are hidden from divination magic. You can't be targeted by such magic or perceived through magical scrying sensors." 
  },
  { 
    id: "si-10b", 
    name: "Immovable Rod", 
    price: 300, 
    requiredStepId: "q10-2", 
    questName: "Make a Special Delivery", 
    description: "A flat iron rod with a button on one end.", 
    stats: "Wondrous item, uncommon\n\nThis flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight." 
  },
  { 
    id: "si-11", 
    name: "Hat of Disguise", 
    price: 156, 
    requiredStepId: "q11-1", 
    questName: "A Stay at the Stock Pot Inn", 
    description: "A simple hat that allows the wearer to alter their appearance.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile wearing this hat, you can use an action to cast the Disguise Self spell from it at will. The spell ends if the hat is removed." 
  },
  { 
    id: "si-12", 
    name: "Headband of Intellect", 
    price: 288, 
    requiredStepId: "q12-1", 
    questName: "A Challenge to Count On", 
    description: "A simple gold headband set with small gems.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nYour Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher." 
  },
  { 
    id: "si-13", 
    name: "Helm of Comprehending Languages", 
    price: 266, 
    requiredStepId: "q13-1", 
    questName: "A Melancholy Melody", 
    description: "A helm that allows understanding of any spoken or written language.", 
    stats: "Wondrous item, uncommon\n\nWhile wearing this helm, you can use an action to cast the Comprehend Languages spell from it at will." 
  },
  { 
    id: "si-14a", 
    name: "Circlet of Blasting", 
    price: 97, 
    requiredStepId: "q14-1", 
    questName: "The Bomb Business", 
    description: "A gold circlet that focuses fiery energy.", 
    stats: "Wondrous item, uncommon\n\nWhile wearing this circlet, you can use an action to cast the Scorching Ray spell with it. When you make the spell's attacks, you do so with an attack bonus of +5. The circlet can't be used this way again until the next dawn." 
  },
  { 
    id: "si-14b", 
    name: "Gloves of Thievery", 
    price: 380, 
    requiredStepId: "q14-2", 
    questName: "Something Else Snatched", 
    description: "Invisible gloves that enhance dexterity.", 
    stats: "Wondrous item, uncommon\n\nThese gloves are invisible while worn. While wearing them, you gain a +5 bonus to Dexterity (Sleight of Hand) checks and Dexterity checks made to pick locks." 
  },
  { 
    id: "si-15", 
    name: "Pipes of the Sewers", 
    price: 269, 
    requiredStepId: "q15-1", 
    questName: "The Ghost of the Inn", 
    description: "Wooden pipes that attract swarms of rats.", 
    stats: "Wondrous item, uncommon (requires attunement)\nWeight: 2\n\nWhile you are holding these pipes, you are proficient with them. You can play the pipes to summon swarms of rats (1-3 charges) or command existing swarms of rats." 
  },
  { 
    id: "si-16", 
    name: "Bracers of Archery", 
    price: 340, 
    requiredStepId: "q16-1", 
    questName: "Clear the Town Shooting Gallery", 
    description: "Leather bracers that improve bowmanship.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons." 
  },
  { 
    id: "si-16-2", 
    name: "Quaal's Feather Token (Any)", 
    price: 2405, 
    requiredStepId: "q16-2", 
    questName: "Master the Town Shooting Gallery", 
    description: "A magical feather that transforms into an object.", 
    stats: "Wondrous item, rare\n\nThis tiny object looks like a feather. Different types of feather tokens exist. You can use an action to touch the item to a space and speak its command word. The token disappears and creates the corresponding object (e.g. Boat, Fan, Tree, Whip, Anchor)." 
  },
  { 
    id: "si-17", 
    name: "Gauntlets of Ogre Power", 
    price: 236, 
    requiredStepId: "q17-1", 
    questName: "Bowling", 
    description: "Iron gauntlets that grant immense strength.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nYour Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher." 
  },
  { 
    id: "si-17-2", 
    name: "Rope of Climbing", 
    price: 279, 
    requiredStepId: "q17-2", 
    questName: "Baskets", 
    description: "A 60-foot length of rope that moves on command.", 
    stats: "Wondrous item, uncommon\nWeight: 3\n\nThis 60-foot length of silk rope weighs 3 pounds and can hold up to 3,000 pounds. If you hold one end of the rope and use an action to speak the command word, the rope animates. As a bonus action, you can command the other end to move toward a destination you choose. You can also tell the rope to fasten itself securely or knot itself." 
  },
  { 
    id: "si-17-3", 
    name: "Wand of Magic Missiles", 
    price: 212, 
    requiredStepId: "q17-3", 
    questName: "Target Shooting", 
    description: "A slender wand that fires darts of magical force.", 
    stats: "Wand, uncommon\n\nThis wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Magic Missile spell from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed." 
  },
  { 
    id: "si-18", 
    name: "Cloak of Protection", 
    price: 174, 
    requiredStepId: "q18-1", 
    questName: "Lucky Numbers", 
    description: "A sturdy cloak that deflects attacks.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nYou gain a +1 bonus to AC and saving throws while you wear this cloak." 
  },
  { 
    id: "si-19", 
    name: "Wind Fan", 
    price: 368, 
    requiredStepId: "q19-1", 
    questName: "Swordsman's Test", 
    description: "A fan that creates a gust of wind.", 
    stats: "Wondrous item, uncommon\n\nWhile holding this fan, you can use an action to cast the Gust of Wind spell (save DC 13) from it. Once used, the fan shouldn't be used again until the next dawn. Each time it is used again before then, it has a cumulative 20 percent chance of not working and tearing into nonmagical tatters." 
  },
  { 
    id: "si-19-2", 
    name: "Sword of Vengeance", 
    price: 276, 
    requiredStepId: "q19-2", 
    questName: "Duel the Master", 
    description: "A cursed sword that compels the wielder to fight.", 
    stats: "Weapon (any sword), uncommon (requires attunement)\nProperties: Cursed\n\nYou gain a +1 bonus to attack and damage rolls made with this magic weapon.\n\nCurse: This sword is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the sword, keeping it on your person at all times. If you take damage while wielding this sword, you must succeed on a DC 15 Wisdom saving throw or become frightened of the attacker until the end of your next turn. While frightened, you must use your action to attack the source of your fear." 
  },
  { 
    id: "si-20", 
    name: "Deck of Illusions", 
    price: 312, 
    requiredStepId: "q20-1", 
    questName: "A Treasure-Chest Prize", 
    description: "A deck of cards that create major illusions.", 
    stats: "Wondrous item, uncommon\n\nThis box contains a set of parchment cards. A full deck has 34 cards. You can use an action to draw a card at random and throw it to the ground within 30 feet of you. An illusion of one or more creatures forms over the thrown card and remains until dispelled. The illusionary creature appears real, of the appropriate size, and behaves as if it were a real creature." 
  },
  { 
    id: "si-21", 
    name: "Wand of Secrets", 
    price: 280, 
    requiredStepId: "q21-1", 
    questName: "Find Keaton!", 
    description: "A wand that vibrates near secret doors.", 
    stats: "Wand, uncommon\n\nThe wand has 3 charges. While holding it, you can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of you, the wand pulses and points at the one nearest to you. The wand regains 1d3 expended charges daily at dawn." 
  },
  { 
    id: "si-22", 
    name: "Instrument of the Bards", 
    price: 8796, 
    requiredStepId: "q22-1", 
    questName: "Sound Check at the Milk Bar", 
    description: "A masterwork instrument granting bardic power.", 
    stats: "Wondrous item, rarity varies (requires attunement by a bard)\nWeight: varies\n\nAn Instrument of the Bards is an exquisite example of its kind, superior to an ordinary instrument in every way. Seven types of these instruments exist, each named after a legendary bard college.\n\nSpells: You can use an action to play the instrument and cast one of its spells. Once the instrument has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC.\n\nAll instruments can cast: Fly, Invisibility, Levitate, Protection from Evil and Good." 
  },
  { 
    id: "si-22-2", 
    name: "Elemental Gem (Blue Sapphire)", 
    price: 111, 
    requiredStepId: "q22-2", 
    questName: "The Troupe Leader's Memories", 
    description: "A gemstone containing the essence of an Air Elemental.", 
    stats: "Wondrous item, uncommon\n\nThis gem contains a mote of elemental energy. When you use an action to break the gem, an Air Elemental is summoned as if you had cast the Conjure Elemental spell, and the gem is destroyed." 
  },
  { 
    id: "si-23", 
    name: "Periapt of Health", 
    price: 323, 
    requiredStepId: "q23-1", 
    questName: "Fraternal Milk", 
    description: "A pendant that grants immunity to disease.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nYou are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the effects of the disease are suppressed you wear the pendant." 
  },
  { 
    id: "si-24-1", 
    name: "Keoghtom's Ointment", 
    price: 263, 
    requiredStepId: "q24-1", 
    questName: "Appointment with Anju", 
    description: "A jar of healing ointment.", 
    stats: "Wondrous item, uncommon\nWeight: 0.5\n\nThis glass jar, 3 inches in diameter, contains 1d4 + 1 doses of a thick mixture that smells faintly of aloe. The jar and its contents weigh 1/2 pound. As an action, one dose of the ointment can be swallowed or applied to the skin. The creature that receives it regains 2d8 + 2 hit points, ceases to be poisoned, and is cured of any disease." 
  },
  { 
    id: "si-24-2", 
    name: "Gloves of Missile Snaring", 
    price: 224, 
    requiredStepId: "q24-2", 
    questName: "A Midnight Request", 
    description: "Gloves that help catch incoming projectiles.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nThese gloves seem to almost magnetically attract incoming ranged weapon attacks to the wearer's hands. When a ranged weapon attack hits you while you're wearing them, you can use your reaction to reduce the damage by 1d10 + your Dexterity modifier, provided that you have a free hand. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in that hand." 
  },
  { 
    id: "si-24-3", 
    name: "Sending Stones", 
    price: 373, 
    requiredStepId: "q24-3", 
    questName: "Deliver the Love Letter", 
    description: "Two smooth stones that allow communication.", 
    stats: "Wondrous item, uncommon\n\nSending Stones come in pairs, with each smooth stone carved to match the other so the pairing is easily recognized. While you touch one stone, you can use an action to cast the Sending spell from it. The target is the bearer of the other stone. If no creature bears the other stone, you know that fact as soon as you use the stone and don't cast the spell. Once sending is cast through the stones, they can't be used again until the next dawn." 
  },
  { 
    id: "si-24-4", 
    name: "Helm of Telepathy", 
    price: 377, 
    requiredStepId: "q24-4", 
    questName: "The Letter's Recipient", 
    description: "A helm that allows the wearer to read thoughts.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile wearing this helm, you can use an action to cast the Detect Thoughts spell (save DC 13) from it. As long as you maintain concentration on the spell, you can use a bonus action to send a telepathic message to a creature you are focused on. It can reply using a bonus action to do so while your focus on it continues.\n\nWhile focusing on a creature with Detect Thoughts, you can use an action to cast the Suggestion spell (save DC 13) from the helm on that creature. Once used, the Suggestion property can't be used again until the next dawn." 
  },
  { 
    id: "si-24-5", 
    name: "Medallion of Thoughts", 
    price: 385, 
    requiredStepId: "q24-5", 
    questName: "Precious Pendant", 
    description: "A medallion that reads surface thoughts.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nThe medallion has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the Detect Thoughts spell (save DC 13) from it. The medallion regains 1d3 expended charges daily at dawn." 
  },
  { 
    id: "si-24-6", 
    name: "Boots of Elvenkind", 
    price: 255, 
    requiredStepId: "q24-6", 
    questName: "Kafei's Leftovers", 
    description: "Boots that silence the wearer's steps.", 
    stats: "Wondrous item, uncommon\n\nWhile you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently." 
  },
  { 
    id: "si-24-7", 
    name: "Elemental Gem (Red Corundum)", 
    price: 325, 
    requiredStepId: "q24-7", 
    questName: "Raid Sakon's Hideout", 
    description: "A gemstone containing the essence of a Fire Elemental.", 
    stats: "Wondrous item, uncommon\n\nThis gem contains a mote of elemental energy. When you use an action to break the gem, a Fire Elemental is summoned as if you had cast the Conjure Elemental spell, and the gem is destroyed." 
  },
  { 
    id: "si-24-8", 
    name: "Ring of Regeneration", 
    price: 9124, 
    requiredStepId: "q24-8", 
    questName: "The Couple's Vow", 
    description: "A ring that slowly heals the wearer.", 
    stats: "Ring, very rare (requires attunement)\n\nWhile wearing this ring, you regain 1d6 hit points every 10 minutes, provided that you have at least 1 hit point. If you lose a body part, the ring causes the missing part to regrow and return to full functionality after 1d6 + 1 days if you have at least 1 hit point the whole time." 
  },
  { 
    id: "si-25", 
    name: "Eversmoking Bottle", 
    price: 184, 
    requiredStepId: "q25-1", 
    questName: "The Never-Ending Meeting", 
    description: "A bottle that produces a massive cloud of smoke.", 
    stats: "Wondrous item, uncommon\nWeight: 1\n\nSmoke leaks from the lead-stoppered mouth of this brass bottle, which weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out in a 60-foot radius from the bottle. The cloud's area is heavily obscured. Each minute the bottle remains open and within the cloud, the radius increases by 10 feet until it reaches its maximum radius of 120 feet. The cloud persists as long as the bottle is open. Closing the bottle requires you to speak its command word as an action." 
  },
  { 
    id: "si-26-1", 
    name: "Gem of Brightness", 
    price: 389, 
    requiredStepId: "q26-1", 
    questName: "History of the Carnival", 
    description: "A crystal that can emit blinding beams of light.", 
    stats: "Wondrous item, uncommon\n\nThis prism has 50 charges. While you are holding it, you can use an action to speak one of three command words to cause one of the following effects:\n\n- The gem sheds bright light in a 30-foot radius and dim light for an additional 30 feet. This effect doesn't expend a charge. It lasts until you use a bonus action to repeat the command word or until you use another function of the gem.\n- Expends 1 charge: The gem creates a beam of brilliant light that flashes from it in a 60-foot cone. Each creature in the cone must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. A creature blinded by this effect makes another Constitution saving throw at the end of each of its turns. On a successful save, it is no longer blinded.\n- Expends 5 charges: The gem creates a blinding flash of light in a 60-foot cone. Each creature in the cone must succeed on a DC 15 Constitution saving throw or be blinded for 1 minute. A creature blinded by this effect makes another Constitution saving throw at the end of each of its turns. On a successful save, it is no longer blinded." 
  },
  { 
    id: "si-26-2", 
    name: "Necklace of Adaptation", 
    price: 159, 
    requiredStepId: "q26-2", 
    questName: "Termina Mythology", 
    description: "A necklace that allows the wearer to breathe in any environment.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile wearing this necklace, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors (such as cloudkill and stinking cloud effects, inhaled poisons, and the breath weapons of some dragons)." 
  },
  { 
    id: "si-27", 
    name: "Boots of Striding and Springing", 
    price: 197, 
    requiredStepId: "q27-1", 
    questName: "The Postman's Peril", 
    description: "Boots that increase walking speed and jump distance.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow." 
  },
  { 
    id: "si-28", 
    name: "Ring of Spell Storing", 
    price: 655, 
    requiredStepId: "q28-1", 
    questName: "Rescue the Abandoned Fairy", 
    description: "A ring that can store spells for later use.", 
    stats: "Ring, rare (requires attunement)\n\nThis ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. Any creature can cast a spell of 1st through 5th level into the ring by touching the ring as the spell is cast. The spell has no effect, other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect.\n\nWhile wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell." 
  },
  { 
    id: "si-29", 
    name: "Pearl of Power", 
    price: 377, 
    requiredStepId: "q29-1", 
    questName: "Gazing at the Stars", 
    description: "A pearl that can restore a spell slot.", 
    stats: "Wondrous item, uncommon (requires attunement by a spellcaster)\n\nWhile this pearl is on your person, you can use an action to speak its command word and regain one expended spell slot. If the expended slot was of 4th level or higher, the new slot is 3rd level. Once you use the pearl, it can't be used again until the next dawn." 
  },
  { 
    id: "si-30", 
    name: "Ring of Mind Shielding", 
    price: 92, 
    requiredStepId: "q30-1", 
    questName: "The Scrub's Secret Stash", 
    description: "A ring that protects the mind from intrusion.", 
    stats: "Ring, uncommon (requires attunement)\n\nWhile wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type. Creatures can telepathically communicate with you only if you allow it.\n\nYou can use an action to cause the ring to become invisible until you use another action to make it visible, until you remove the ring, or until you die.\n\nIf you die while wearing the ring, your soul enters it, unless it already houses a soul. You can remain in the ring or depart for the afterlife. As long as your soul is in the ring, you can telepathically communicate with any creature wearing it. A wearer can't prevent this telepathic communication." 
  },
  { 
    id: "si-31-1", 
    name: "Oil of Slipperiness", 
    price: 100, 
    requiredStepId: "q31-1", 
    questName: "Dancing With a Ghost", 
    description: "Oil that grants freedom of movement.", 
    stats: "Potion, uncommon\n\nThis sticky black unguent is thick and heavy. You can use an action to spread it over your body, granting you the effect of the Freedom of Movement spell for 8 hours. Alternatively, you can use an action to pour the oil onto the ground, covering a 10-foot square, where it functions like the Grease spell." 
  },
  { 
    id: "si-31-2", 
    name: "Eyes of Charming", 
    price: 366, 
    requiredStepId: "q31-2", 
    questName: "The Rosa Sister's New Groove", 
    description: "Lenses that allow the casting of charm person.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nThese crystal lenses fit over the eyes. While wearing them, you can use an action to cast the Charm Person spell (save DC 13) on a humanoid within 30 feet of you that you can see. The lenses have 3 charges. The lenses regain all expended charges daily at dawn." 
  },
  { 
    id: "si-32", 
    name: "Saddle of the Cavalier", 
    price: 294, 
    requiredStepId: "q32-1", 
    questName: "A Race Near Milk Road", 
    description: "A saddle that prevents the rider from being dismounted.", 
    stats: "Wondrous item, uncommon\n\nWhile in this saddle, you can't be dismounted against your will if you're conscious, and attack rolls against the mount have disadvantage." 
  },
  { 
    id: "si-33-1", 
    name: "Driftglobe", 
    price: 203, 
    requiredStepId: "q33-1", 
    questName: "Assistant Ghost Stopper", 
    description: "A floating glass sphere that emits light.", 
    stats: "Wondrous item, uncommon\nWeight: 1\n\nThis small sphere of thick glass weighs 1 pound. If you are within 60 feet of it, you can speak its command word and cause it to emanate the Light or Daylight spell. Once used, the daylight effect can't be used again until the next dawn. You can speak another command word as an action to make the illuminated globe rise into the air and float no more than 5 feet off the ground. The globe hovers in this way until you or another creature grasps it. If you move more than 60 feet from the hovering globe, it follows you until it is within 60 feet of you. It takes the shortest route to do so. If prevented from moving, the globe sinks gently to the ground and becomes inactive, and its light winks out." 
  },
  { 
    id: "si-33-2", 
    name: "Robe of Stars", 
    price: 9016, 
    requiredStepId: "q33-2", 
    questName: "Busting Ghosts", 
    description: "A dark blue robe embroidered with stars that can be used as missiles.", 
    stats: "Wondrous item, very rare (requires attunement)\n\nThis black or dark blue robe is embroidered with small white or silver stars. You gain a +1 bonus to saving throws while you wear it.\n\nSix stars, located on the robe's upper front portion, are particularly large. While wearing this robe, you can use an action to pull off one of the stars and use it to cast Magic Missile as a 5th-level spell. Daily at dusk, 1d6 removed stars reappear on the robe.\n\nWhile you wear the robe, you can use an action to enter the Astral Plane along with everything you are wearing and carrying. You remain there until you use an action to return to the plane you were on. You reappear in the last space you occupied, or if that space is occupied, the nearest unoccupied space." 
  },
  { 
    id: "si-34", 
    name: "Heward's Handy Haversack", 
    price: 1522, 
    requiredStepId: "q34-1", 
    questName: "Protect the Milk", 
    description: "A backpack with extra-dimensional pockets.", 
    stats: "Wondrous item, rare\nWeight: 5\n\nThis backpack has a central pouch and two side pouches. Each side pouch holds up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The central pouch holds up to 80 pounds of material, not exceeding a volume of 8 cubic feet. The haversack always weighs 5 pounds, regardless of its contents.\n\nPlacing an object in the haversack follows the normal rules for interacting with objects. Retrieving an item from the haversack requires an action. When you reach into the haversack for a specific item, the item is always magically on top." 
  },
  { 
    id: "si-35", 
    name: "Eyes of the Eagle", 
    price: 325, 
    requiredStepId: "q35-1", 
    questName: "Cucco Shack's Cute Chicks", 
    description: "Lenses that grant sharp vision.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nThese crystal lenses fit over the eyes. While wearing them, you have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, you can make out details of even extremely distant creatures and objects as small as 2 feet across." 
  },
  { 
    id: "si-36", 
    name: "Bag of Tricks", 
    price: 271, 
    requiredStepId: "q36-1", 
    questName: "Win Big at the Doggy Race", 
    description: "A bag containing fuzzy balls that transform into animals.", 
    stats: "Wondrous item, uncommon\nWeight: 0.5\n\nThis ordinary bag, made from gray, rust, or tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs 1/2 pound. You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet away. When the object lands, it transforms into a creature you determine by rolling a d8. The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature. Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn." 
  },
  { 
    id: "si-37", 
    name: "Periapt of Wound Closure", 
    price: 313, 
    requiredStepId: "q37-1", 
    questName: "Find the Stone-Faced Soldier", 
    description: "A pendant that stabilizes the wearer.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores." 
  },
  { 
    id: "si-38", 
    name: "Alchemy Jug", 
    price: 384, 
    requiredStepId: "q38-1", 
    questName: "Rescue the Swamp Witch", 
    description: "A jug that can produce various liquids.", 
    stats: "Wondrous item, uncommon\nWeight: 12\n\nThis ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds come from within the jug when it is shaken, even if the jug is empty. You can use an action and name one liquid from the table below to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named.\n\nAcid (8 oz), Basic poison (1/2 oz), Beer (4 gal), Honey (1 gal), Mayonnaise (2 gal), Oil (1 qt), Vinegar (2 gal), Water, fresh (8 gal), Water, salt (12 gal), Wine (1 gal)." 
  },
  { 
    id: "si-39-1", 
    name: "Quiver of Ehlonna", 
    price: 195, 
    requiredStepId: "q39-1", 
    questName: "Clear the Swamp Shooting Gallery", 
    description: "A quiver that holds far more arrows than normal.", 
    stats: "Wondrous item, uncommon\nWeight: 2\n\nEach of the quiver's three compartments connects to an extradimensional space that allows the quiver to hold numerous items while never weighing more than 2 pounds. The shortest compartment can hold up to sixty arrows, bolts, or similar objects. The midsize compartment holds up to eighteen javelins or similar objects. The longest compartment holds up to six long objects, such as bows, quarterstaffs, or spears." 
  },
  { 
    id: "si-39-2", 
    name: "Arrow-Catching Shield", 
    price: 2554, 
    requiredStepId: "q39-2", 
    questName: "Master the Swamp Shooting Gallery", 
    description: "A shield that attracts and blocks missiles.", 
    stats: "Armor (shield), rare (requires attunement)\n\nYou gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 10 feet of you, you can use your reaction to become the target of the attack instead." 
  },
  { 
    id: "si-40", 
    name: "Cloak of Elvenkind", 
    price: 355, 
    requiredStepId: "q40-1", 
    questName: "Swamp Fishing Hole", 
    description: "A cloak that shifts color to camouflage the wearer.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you." 
  },
  { 
    id: "si-41", 
    name: "Slippers of Spider Climbing", 
    price: 200, 
    requiredStepId: "q41-1", 
    questName: "The Terrifying Swamp House", 
    description: "Slippers that allow walking on walls.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile you wear these light shoes, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil." 
  },
  { 
    id: "si-42-1", 
    name: "Dust of Sneezing and Choking", 
    price: 141, 
    requiredStepId: "q42-1", 
    questName: "Photo of Tingle", 
    description: "Dust that incapacitates those who breathe it.", 
    stats: "Wondrous item, uncommon\n\nThis small container holds enough dust for one use. When you use an action to throw the dust into the air, you and each creature that needs to breathe within 30 feet of you must succeed on a DC 15 Constitution saving throw or become unable to breathe, while sneezing uncontrollably. A creature affected in this way is incapacitated and suffocating. As long as it is conscious, a creature can repeat the saving throw at the end of each of its turns, ending the effect on it on a success. The Lesser Restoration spell can also end the effect on a creature." 
  },
  { 
    id: "si-42-2", 
    name: "Weapon of Warning", 
    price: 151, 
    requiredStepId: "q42-2", 
    questName: "Photo of Deku King", 
    description: "A weapon that alerts the bearer to danger.", 
    stats: "Weapon (any), uncommon (requires attunement)\n\nThis magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can't be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins." 
  },
  { 
    id: "si-43", 
    name: "Broom of Flying", 
    price: 256, 
    requiredStepId: "q43-1", 
    questName: "A Hag's New Business", 
    description: "A wooden broom that can fly.", 
    stats: "Wondrous item, uncommon\nWeight: 3\n\nThis wooden broom, which weighs 3 pounds, functions like a mundane broom until you stand astride it and speak its command word. It then hovers beneath you and can be ridden in the air. It has a flying speed of 50 feet. It can carry up to 400 pounds, but its flying speed becomes 30 feet while carrying over 200 pounds. The broom stops hovering when you land." 
  },
  { 
    id: "si-44-1", 
    name: "Rod of Rulership", 
    price: 1168, 
    requiredStepId: "q44-1", 
    questName: "Rescue the Deku Princess", 
    description: "A rod that can charm huge groups.", 
    stats: "Rod, rare (requires attunement)\n\nYou can use an action to present the rod and command obedience from each creature of your choice that you can see within 120 feet of you. Each target must succeed on a DC 15 Wisdom saving throw or be charmed by you for 8 hours. While charmed in this way, the creature regards you as its trusted leader. If harmed by you or your companions, or commanded to do something contrary to its nature, a target ceases to be charmed in this way. The rod can't be used again until the next dawn." 
  },
  { 
    id: "si-44-2", 
    name: "Gloves of Swimming and Climbing", 
    price: 83, 
    requiredStepId: "q44-2", 
    questName: "A Monkey's Innocence", 
    description: "Gloves that assist in movement.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile wearing these gloves, climbing and swimming doesn't cost you extra movement, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim." 
  },
  { 
    id: "si-44-3", 
    name: "Elemental Gem (Emerald)", 
    price: 240, 
    requiredStepId: "q44-3", 
    questName: "Chase the Deku Butler", 
    description: "A gemstone containing the essence of a Water Elemental.", 
    stats: "Wondrous item, uncommon\n\nThis gem contains a mote of elemental energy. When you use an action to break the gem, a Water Elemental is summoned as if you had cast the Conjure Elemental spell, and the gem is destroyed." 
  },
  { 
    id: "si-45", 
    name: "Lantern of Revealing", 
    price: 86, 
    requiredStepId: "q45-1", 
    questName: "Follow the Feathers", 
    description: "A hooded lantern that reveals invisible creatures.", 
    stats: "Wondrous item, uncommon\n\nWhile lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius." 
  },
  { 
    id: "si-46", 
    name: "Ring of the Ram", 
    price: 1568, 
    requiredStepId: "q46-1", 
    questName: "Absolve the Goron Hero", 
    description: "A ring carved to resemble a ram's head.", 
    stats: "Ring, rare (requires attunement)\n\nThis ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 to 3 of its charges to attack one creature you can see within 60 feet of you. The ring produces a spectral ram's head and makes its attack roll with a +7 bonus. On a hit, for each charge you spend, the target takes 2d10 force damage and is pushed 5 feet away from you. Alternatively, you can expend 1 to 3 charges as an action to try to break an object you can see within 60 feet of you that isn't being worn or carried. The ring makes a Strength check with a +5 bonus for each charge you spend." 
  },
  { 
    id: "si-47-1", 
    name: "Ring of Warmth", 
    price: 336, 
    requiredStepId: "q47-1", 
    questName: "The Elder's Son is Sleepy", 
    description: "A ring that keeps the wearer warm.", 
    stats: "Ring, uncommon (requires attunement)\n\nWhile wearing this ring, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit." 
  },
  { 
    id: "si-47-2", 
    name: "Boots of the Winterlands", 
    price: 126, 
    requiredStepId: "q47-2", 
    questName: "Feed the Hungry Goron", 
    description: "Furred boots that protect against cold.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nThese furred boots are snug and feel quite warm. While you wear them, you gain the following benefits:\n- You have resistance to cold damage.\n- You ignore difficult terrain created by ice or snow.\n- You can tolerate temperatures as low as -50 degrees Fahrenheit without any additional protection. If you wear heavy clothes, you can tolerate temperatures as low as -100 degrees Fahrenheit." 
  },
  { 
    id: "si-48", 
    name: "Mithral Armor", 
    price: 249, 
    requiredStepId: "q48-1", 
    questName: "Goron Races! Rock N' Roll", 
    description: "Armor that is light and flexible.", 
    stats: "Armor (medium or heavy, but not hide), uncommon\n\nMithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't." 
  },
  { 
    id: "si-49-1", 
    name: "Sentinel Shield", 
    price: 360, 
    requiredStepId: "q49-1", 
    questName: "The Famous Razor Sword", 
    description: "A shield emblazoned with an eye.", 
    stats: "Armor (shield), uncommon\n\nWhile holding this shield, you have advantage on initiative rolls and Wisdom (Perception) checks. The shield is emblazoned with a symbol of an eye." 
  },
  { 
    id: "si-49-2", 
    name: "Brooch of Shielding", 
    price: 220, 
    requiredStepId: "q49-2", 
    questName: "The Glorious Golden Sword", 
    description: "A brooch that protects against force damage.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nWhile wearing this brooch, you have resistance to force damage, and you are immune to damage from the Magic Missile spell." 
  },
  { 
    id: "si-50", 
    name: "Ring of Jumping", 
    price: 370, 
    requiredStepId: "q50-1", 
    questName: "Reunite the Frog Choir", 
    description: "A ring that enhances jump distance.", 
    stats: "Ring, uncommon (requires attunement)\n\nWhile wearing this ring, you can use a bonus action to cast the Jump spell from it at will, but can target only yourself." 
  },
  { 
    id: "si-51-1", 
    name: "Ring of Free Action", 
    price: 2071, 
    requiredStepId: "q51-1", 
    questName: "Put the Zora Guitarist to Rest", 
    description: "A ring that prevents movement restrictions.", 
    stats: "Ring, rare (requires attunement)\n\nWhile you wear this ring, difficult terrain doesn't cost you extra movement. In addition, magic can neither reduce your speed nor cause you to be paralyzed or restrained." 
  },
  { 
    id: "si-51-2", 
    name: "Philter of Love", 
    price: 163, 
    requiredStepId: "q51-2", 
    questName: "Healing the Guitarist", 
    description: "A potion that causes infatuation.", 
    stats: "Potion, uncommon\n\nThe next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed." 
  },
  { 
    id: "si-52", 
    name: "Ring of Water Walking", 
    price: 92, 
    requiredStepId: "q52-1", 
    questName: "Ocean Fishing Hole", 
    description: "A ring that allows walking on liquid.", 
    stats: "Ring, uncommon\n\nWhile wearing this ring, you can stand on and move across any liquid surface as if it were solid ground." 
  },
  { 
    id: "si-53-1", 
    name: "Cap of Water Breathing", 
    price: 172, 
    requiredStepId: "q53-1", 
    questName: "Seahorse Rescue Mission", 
    description: "A cap that allows breathing underwater.", 
    stats: "Wondrous item, uncommon\n\nWhile wearing this cap underwater, you can speak its command word as an action to create a bubble of air around your head. It allows you to breathe normally underwater. This bubble stays with you until you speak the command word again, the cap is removed, or you are no longer underwater." 
  },
  { 
    id: "si-53-2", 
    name: "Staff of the Python", 
    price: 256, 
    requiredStepId: "q53-2", 
    questName: "Defeat the Sea Snakes", 
    description: "A staff that transforms into a giant snake.", 
    stats: "Staff, uncommon (requires attunement by a cleric, druid, or warlock)\n\nYou can use an action to speak this staff's command word and throw the staff on the ground within 10 feet of you. The staff becomes a Giant Constrictor Snake under your control and acts on its own initiative count. By using a bonus action to speak the command word again, you return the staff to its normal form in a space formerly occupied by the snake. On your turn, you can mentally command the snake if it is within 60 feet of you and you aren't incapacitated. If the snake is reduced to 0 hit points, it dies and reverts to its staff form. The staff then shatters and is destroyed. If the snake reverts to staff form before losing all its hit points, it regains all of them." 
  },
  { 
    id: "si-54", 
    name: "Wand of Web", 
    price: 389, 
    requiredStepId: "q54-1", 
    questName: "The Suspicious Ocean House", 
    description: "A wand that casts Web.", 
    stats: "Wand, uncommon (requires attunement by a spellcaster)\n\nThis wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the Web spell (save DC 15) from it. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed." 
  },
  { 
    id: "si-55", 
    name: "Eyes of Minute Seeing", 
    price: 183, 
    requiredStepId: "q55-1", 
    questName: "Spider House Mystery", 
    description: "Lenses that magnify small details.", 
    stats: "Wondrous item, uncommon\n\nThese crystal lenses fit over the eyes. While wearing them, you have advantage on Intelligence (Investigation) checks that rely on sight while searching an area or studying an object within 1 foot of you." 
  },
  { 
    id: "si-56", 
    name: "Wand of the War Mage (+1)", 
    price: 306, 
    requiredStepId: "q56-1", 
    questName: "Gimme a Break", 
    description: "A wand that enhances spell attacks.", 
    stats: "Wand, uncommon (requires attunement by a spellcaster)\n\nWhile holding this wand, you gain a +1 bonus to spell attack rolls. In addition, you ignore half cover when making a spell attack." 
  },
  { 
    id: "si-57-1", 
    name: "Mariner's Armor", 
    price: 225, 
    requiredStepId: "q57-1", 
    questName: "Pro Swimmer", 
    description: "Armor that assists in swimming.", 
    stats: "Armor (medium or heavy), uncommon\n\nWhile wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs." 
  },
  { 
    id: "si-57-2", 
    name: "Ring of Swimming", 
    price: 335, 
    requiredStepId: "q57-2", 
    questName: "Master Swimmer", 
    description: "A ring that grants swimming ability.", 
    stats: "Ring, uncommon\n\nYou have a swimming speed of 40 feet while wearing this ring." 
  },
  { 
    id: "si-58", 
    name: "Cloak of the Manta Ray", 
    price: 197, 
    requiredStepId: "q58-1", 
    questName: "Playing Paparazzi", 
    description: "A cloak that allows breathing and swimming underwater.", 
    stats: "Wondrous item, uncommon\n\nWhile wearing this cloak with its hood up, you can breathe underwater, and you have a swimming speed of 60 feet. The cloak is made of leather and has a dorsal fin." 
  },
  { 
    id: "si-59", 
    name: "Dust of Disappearance", 
    price: 371, 
    requiredStepId: "q59-1", 
    questName: "A Zora Swan Song", 
    description: "Dust that turns creatures invisible.", 
    stats: "Wondrous item, uncommon\n\nThis small packet contains 2d4 pinches of dust. You can use an action to throw a pinch of it into the air. You and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its magic takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature." 
  },
  { 
    id: "si-60", 
    name: "Trident of Fish Command", 
    price: 109, 
    requiredStepId: "q60-1", 
    questName: "The Seafarer's Challenge", 
    description: "A trident that commands aquatic beasts.", 
    stats: "Weapon (trident), uncommon (requires attunement)\n\nThis trident is a magic weapon. It has 3 charges. While you carry it, you can use an action and expend 1 charge to cast Dominate Beast (save DC 15) from it on a beast that has an innate swimming speed. The trident regains 1d3 expended charges daily at dawn." 
  },
  { 
    id: "si-61", 
    name: "Dust of Dryness", 
    price: 183, 
    requiredStepId: "q61-1", 
    questName: "Racing the Captain", 
    description: "Dust that absorbs water.", 
    stats: "Wondrous item, uncommon\n\nThis small packet contains 1d6 + 4 pinches of dust. You can use an action to sprinkle a pinch of it over water. The dust turns a cube of water 15 feet on a side into a marble-sized pellet, which floats or rests near where the dust was sprinkled. The pellet's weight is negligible. Someone can use an action to smash the pellet against a hard surface, causing the pellet to shatter and release the water the dust absorbed. Doing so ends that pellet's magic." 
  },
  { 
    id: "si-62-1", 
    name: "Javelin of Lightning", 
    price: 365, 
    requiredStepId: "q62-1", 
    questName: "Flat's Last Piece", 
    description: "A javelin that transforms into a lightning bolt.", 
    stats: "Weapon (javelin), uncommon\n\nThis javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, or half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage. The javelin's property can't be used again until the next dawn." 
  },
  { 
    id: "si-62-2", 
    name: "Adamantine Armor", 
    price: 311, 
    requiredStepId: "q62-2", 
    questName: "Iron Coffin", 
    description: "Armor reinforced with adamantine.", 
    stats: "Armor (medium or heavy, but not hide), uncommon\n\nThis suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit." 
  },
  { 
    id: "si-62-3", 
    name: "Wand of Magic Detection", 
    price: 193, 
    requiredStepId: "q62-3", 
    questName: "Gravekeeper's Buried Treasure", 
    description: "A wand that detects magic.", 
    stats: "Wand, uncommon\n\nThis wand has 3 charges. While holding it, you can use an action to expend 1 of its charges to cast the Detect Magic spell from it. The wand regains 1d3 expended charges daily at dawn." 
  },
  { 
    id: "si-63-1", 
    name: "Pipes of Haunting", 
    price: 93, 
    requiredStepId: "q63-1", 
    questName: "The Composer's Ghost", 
    description: "Pipes that can frighten listeners.", 
    stats: "Wondrous item, uncommon (requires attunement)\n\nYou must be proficient with wind instruments to use these pipes. They have 3 charges. You can use an action to play them and expend 1 charge to create an eerie, spellbinding tune. Each creature within 30 feet of you that hears you must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. If you wish, all creatures in the area that aren't hostile toward you automatically succeed on the save. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these pipes for 24 hours. The pipes regain 1d3 expended charges daily at dawn." 
  },
  { 
    id: "si-63-2", 
    name: "Staff of the Adder", 
    price: 139, 
    requiredStepId: "q63-2", 
    questName: "The Mummy's Curse", 
    description: "A staff that transforms into a venomous snake.", 
    stats: "Staff, uncommon (requires attunement by a cleric, druid, or warlock)\n\nYou can use a bonus action to speak this staff's command word and make the head of the staff become that of an animate poisonous snake for 1 minute. By using another bonus action to speak the command word again, you return the staff to its normal inanimate form.\n\nYou can make a melee attack using the snake head, which has a reach of 5 feet. Your proficiency bonus applies to the attack roll. On a hit, the target takes 1d6 piercing damage and must succeed on a DC 15 Constitution saving throw or take 3d6 poison damage." 
  },
  { 
    id: "si-64", 
    name: "Bag of Beans", 
    price: 888, 
    requiredStepId: "q64-1", 
    questName: "Beneath the Well", 
    description: "A heavy bag containing magical beans.", 
    stats: "Wondrous item, rare\n\nInside this heavy cloth bag are 3d4 dry beans. The bag weighs 1/2 pound plus 1/4 pound for each bean it contains.\n\nIf you dump the bag's contents out on the ground, they explode in a 10-foot radius. Each creature in the area, including you, must make a DC 15 Dexterity saving throw, taking 5d4 fire damage on a failed save, or half as much damage on a successful one. The fire ignites flammable objects in the area that aren't being worn or carried.\n\nIf you remove a bean from the bag, plant it in dirt or sand, and then water it, the bean produces an effect 1 minute later from the ground where it was planted. (See DMG for table of random effects)." 
  },
  { 
    id: "si-65", 
    name: "Mace of Terror", 
    price: 3962, 
    requiredStepId: "q65-1", 
    questName: "Free the Canyon Ghosts", 
    description: "A mace that strikes fear into enemies.", 
    stats: "Weapon (mace), rare (requires attunement)\n\nThis magic weapon has 3 charges. While holding it, you can use an action and expend 1 charge to release a wave of terror. Each creature of your choice in a 30-foot radius extending from you must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success. The mace regains 1d3 expended charges daily at dawn." 
  },
  { 
    id: "si-66", 
    name: "Nine Lives Stealer", 
    price: 9712, 
    requiredStepId: "q66-1", 
    questName: "Vanquished Foes Return", 
    description: "A sword that steals the life force of its victims.", 
    stats: "Weapon (any sword), very rare (requires attunement)\n\nYou gain a +2 bonus to attack and damage rolls made with this magic weapon.\n\nThe sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property." 
  }
];
