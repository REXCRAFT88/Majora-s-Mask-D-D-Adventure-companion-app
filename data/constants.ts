
export const GAME_START_OFFSET = 0;

export const SPELLS = {
  oath: { name: "Oath to Order", type: "Spell" as const, description: "4th-level evocation (ritual).\nCasting Time: 1 minute\nRange: Self\nComponents: V (Song), M (Guardian Masks)\n\nWhen cast at the top of the Clock Tower, simultaneously frees all four divine guardian giants from the cursed forms imposed by Majora's Mask, then teleports them to you." },
  sonata: { name: "Sonata of Awakening", type: "Spell" as const, description: "1st-level abjuration (ritual).\nCasting Time: 2 minutes\nRange: 60 feet\n\nYou end the unconscious condition on one creature within range. This can also force a meditating, sleeping, or unconscious creature out of astral projection." },
  goron: { name: "Goron Lullaby", type: "Spell" as const, description: "1st-level enchantment (ritual).\nCasting Time: 2 minutes\nRange: 60 feet\n\nSends creatures into a magical slumber. A creature must succeed a Wisdom saving throw or fall unconscious. Undead/immune creatures are unaffected." },
  bossa: { name: "New Wave Bossa Nova", type: "Spell" as const, description: "1st-level abjuration (ritual).\nCasting Time: 2 minutes\nRange: 60 feet\n\nYou end one psychological condition, such as charmed or frightened, affecting a creature within range." },
  elegy: { name: "Elegy of Emptiness", type: "Spell" as const, description: "5th-level illusion (ritual).\nCasting Time: 2 minutes\nRange: Self\n\nYou leave behind a statue that resembles you. It has half your HP and takes damage for you. Only one statue active at a time." },
  healing: { name: "Song of Healing", type: "Spell" as const, description: "4th-level abjuration (ritual).\nCasting Time: 2 minutes\n\nEnds a curse on a willing creature, creating a mask from the curse's power. Also allows a willing creature at 0 HP or a restless spirit to pass on, creating a mask." },
  epona: { name: "Epona's Song", type: "Spell" as const, description: "2nd-level enchantment.\nCasting Time: 2 minutes\n\nBinds a beast to you. If you play the song again, the beast is teleported to an unoccupied space within 30 ft of you." },
  storms: { name: "Song of Storms", type: "Spell" as const, description: "2nd-level transmutation (ritual).\nCasting Time: 2 minutes\nRange: 1 mile\n\nChanges weather conditions, creating or ending a storm within 1d4 x 5 minutes." },
  time: { name: "Song of Time", type: "Spell" as const, description: "1st-level transmutation (ritual).\nCasting Time: 2 minutes\nRange: 30 feet\n\nSends you and up to 8 willing creatures to the beginning or end of a temporal loop without ill effects." }
};

export const ITEMS = {
  odolwaRemains: { name: "Odolwa's Remains", type: "Item" as const, description: "The mask containing the corrupted spirit of the Swamp Guardian." },
  gohtRemains: { name: "Goht's Remains", type: "Item" as const, description: "The mask containing the corrupted spirit of the Mountain Guardian." },
  gyorgRemains: { name: "Gyorg's Remains", type: "Item" as const, description: "The mask containing the corrupted spirit of the Ocean Guardian." },
  twinmoldRemains: { name: "Twinmold's Remains", type: "Item" as const, description: "The mask containing the corrupted spirit of the Canyon Guardian." },
  dekuMask: { name: "Deku Mask", type: "Mask" as const, description: "Allows the wearer to transform into a Deku Scrub. Grants proficiency with woodwinds." },
  goronMask: { name: "Goron Mask", type: "Mask" as const, description: "Allows the wearer to transform into a Goron. Grants proficiency with drums." },
  zoraMask: { name: "Zora Mask", type: "Mask" as const, description: "Allows the wearer to transform into a Zora." },
  bremenMask: { name: "Bremen Mask", type: "Mask" as const, description: "Small animals follow you while you play music. Attunement allows casting animal friendship/messenger at will." },
  blastMask: { name: "Blast Mask", type: "Mask" as const, description: "Action to explode (4d6 fire + 1d6 piercing to self/others). Attunement reduces self damage." },
  allNightMask: { name: "All-Night Mask", type: "Mask" as const, description: "Shortens rests. Attunement grants immunity to sleep/unconscious conditions." },
  kafeiMask: { name: "Kafei's Mask", type: "Mask" as const, description: "Learn details about Kafei. Attunement allows locating him." },
  kamaroMask: { name: "Kamaro's Mask", type: "Mask" as const, description: "Dance like Kamaro. Attunement charms viewers." },
  keatonMask: { name: "Keaton Mask", type: "Mask" as const, description: "Summon/confuse Keatons. Attunement allows entering border ethereal." },
  garoMask: { name: "Garo's Mask", type: "Mask" as const, description: "+2 Stealth. Summon a Garo ally once per day." },
  romaniMask: { name: "Romani's Mask", type: "Mask" as const, description: "Doubles potion effects. Attunement allows enchanting milk into healing potions." },
  troupeMask: { name: "Troupe Leader's Mask", type: "Mask" as const, description: "Disadvantage on target's attacks. Attunement stops target from attacking." },
  stoneMask: { name: "Stone Mask", type: "Mask" as const, description: "Advantage on Stealth. Attunement grants invisibility while motionless." },
  postmanHat: { name: "Postman's Hat", type: "Mask" as const, description: "Open mailboxes. Attunement allows double actions." },
  bunnyHood: { name: "Bunny Hood", type: "Mask" as const, description: "Doubles speed. Attunement triples speed." },
  couplesMask: { name: "Couple's Mask", type: "Mask" as const, description: "Cast calm emotions. Attunement charms people." },
  maskOfTruth: { name: "Mask of Truth", type: "Mask" as const, description: "Speak with Gossip Stones/Animals. Read minds." },
  maskOfScents: { name: "Mask of Scents", type: "Mask" as const, description: "Advantage on smell checks. Find mushrooms." },
  donGeroMask: { name: "Don Gero's Mask", type: "Mask" as const, description: "Speak with frogs. Conduct choir." },
  gibdoMask: { name: "Gibdo Mask", type: "Mask" as const, description: "Friendly with Gibdos/Redeads. Command them." },
  captainsHat: { name: "Captain's Hat", type: "Mask" as const, description: "Friendly with Stalfos. Command them." },
  giantsMask: { name: "Giant's Mask", type: "Mask" as const, description: "Grow huge." },
  bottle: { name: "Magic Bottle", type: "Item" as const, description: "Indestructible container that preserves contents indefinitely. Can hold creatures/souls." },
  heart: { name: "Piece of Heart", type: "Item" as const, description: "Collect 4 to create a Heart Container (40 Temp HP)." },
  moonsTear: { name: "Moon's Tear", type: "Item" as const, description: "Arcane focus. Restores mana or spell slots." },
  lensOfTruth: { name: "Lens of Truth", type: "Item" as const, description: "See through illusions and invisible objects." },
  goldDust: { name: "Gold Dust", type: "Item" as const, description: "Fine Goron gold dust. Used for forging." },
  gildedSword: { name: "Gilded Sword", type: "Item" as const, description: "Permanent upgrade. +2 to attack/damage." },
  mirrorShield: { name: "Mirror Shield", type: "Item" as const, description: "A legendary shield that can reflect light and energy." }
};
