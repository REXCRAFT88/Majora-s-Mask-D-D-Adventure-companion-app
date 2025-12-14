
import { Region, MasterTimelineEvent, Character, Quest, CustomShop } from '../types';

export const getMinutes = (day: 1|2|3|4, timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  let adjustedHour = hours;
  if (hours < 6) {
    adjustedHour = hours + 24;
  }

  const minutesFromDayStart = ((adjustedHour - 6) * 60) + minutes;
  return ((day - 1) * 24 * 60) + minutesFromDayStart;
};

export const formatDisplayTime = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const ampm = hours >= 12 && hours < 24 ? 'pm' : 'am';
  const displayHour = hours % 12 || 12;
  return minutes > 0 ? `${displayHour}:${minutes.toString().padStart(2, '0')}${ampm}` : `${displayHour}${ampm}`;
};

// Helper to reverse getMinutes for display purposes if needed
const minutesToTimeStr = (totalMinutes: number): string => {
    const dayOffset = Math.floor(totalMinutes / 1440); // 0, 1, 2
    const minutesInDay = totalMinutes % 1440;
    const absMinutes = minutesInDay + (6 * 60); // Add 6 hours offset
    const h = Math.floor(absMinutes / 60) % 24;
    const m = absMinutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

export const createDailyEvents = (
  baseId: string,
  title: string,
  description: string,
  startTime: string,
  endTime: string,
  region: Region,
  location: string,
  category: 'Business' | 'NPC Schedule',
  relatedId?: string,
  daysActive: number[] = [1, 2, 3], 
  pageRef?: string
): MasterTimelineEvent[] => {
  return daysActive.map(day => ({
    id: `${baseId}-d${day}`,
    day: day as 1|2|3,
    timeDisplay: formatDisplayTime(startTime),
    sortTime: getMinutes(day as 1|2|3, startTime),
    endTime: getMinutes(day as 1|2|3, endTime),
    title,
    description,
    region,
    location,
    category,
    relatedId,
    pageReference: pageRef
  }));
};

// Dynamic Timeline Generator
export const generateTimelineEvents = (
  manualEvents: MasterTimelineEvent[],
  characters: Character[],
  quests: Quest[],
  customShops: CustomShop[] = []
): MasterTimelineEvent[] => {
  
  // 1. NPC EVENTS from Character Data
  const npcEvents: MasterTimelineEvent[] = characters.flatMap(character => {
    if (!character.scheduleEvents || character.scheduleEvents.length === 0) {
        // If no schedule events, generate default downtime for all 3 days
        if (character.defaultActivity) {
             return [1, 2, 3].map(day => ({
                id: `npc-${character.id}-downtime-d${day}`,
                day: day as 1|2|3,
                timeDisplay: "All Day",
                sortTime: getMinutes(day as 1|2|3, "06:00"),
                endTime: getMinutes((day+1) as any, "06:00"), // Next day start
                title: character.defaultActivity!,
                description: "Downtime / Routine",
                region: character.locationRegion,
                location: character.defaultLocation || character.locationSpecific,
                category: 'NPC Schedule',
                relatedId: character.id,
                isDowntime: true
             }));
        }
        return [];
    }

    const charEvents: MasterTimelineEvent[] = [];
    
    // Expand schedule events to timeline events
    character.scheduleEvents.forEach((event, index) => {
      const daysToCreate = event.day === 'All' ? [1, 2, 3] : [event.day];

      daysToCreate.forEach(day => {
        const sortTime = getMinutes(day as 1|2|3, event.start);
        const endTime = getMinutes(day as 1|2|3, event.end);
        
        charEvents.push({
          id: `npc-${character.id}-${day}-${index}`,
          day: day as 1|2|3,
          timeDisplay: formatDisplayTime(event.start),
          sortTime: sortTime,
          endTime: endTime,
          title: event.title,
          description: event.description,
          region: character.locationRegion,
          location: event.location,
          category: 'NPC Schedule',
          relatedId: character.id,
          condition: event.condition
        });
      });
    });

    // Gap Filling Logic for Downtime
    if (character.defaultActivity) {
        for (let d = 1; d <= 3; d++) {
            const dayStart = getMinutes(d as 1|2|3, "06:00");
            const dayEnd = getMinutes((d === 3 ? 4 : d+1) as any, "06:00"); // 6am next day

            // Get events for this day sorted by time
            const dayEvents = charEvents
                .filter(e => e.day === d)
                .sort((a, b) => a.sortTime - b.sortTime);
            
            let cursor = dayStart;

            dayEvents.forEach(event => {
                // Check for gap before event
                if (event.sortTime > cursor) {
                    // Create downtime event
                     charEvents.push({
                        id: `npc-${character.id}-downtime-d${d}-${cursor}`,
                        day: d as 1|2|3,
                        timeDisplay: formatDisplayTime(minutesToTimeStr(cursor)),
                        sortTime: cursor,
                        endTime: event.sortTime,
                        title: character.defaultActivity!,
                        description: "Downtime / Routine",
                        region: character.locationRegion,
                        location: character.defaultLocation || character.locationSpecific,
                        category: 'NPC Schedule',
                        relatedId: character.id,
                        isDowntime: true
                     });
                }
                // Move cursor to end of event
                if (event.endTime && event.endTime > cursor) {
                    cursor = event.endTime;
                }
            });

            // Check for gap after last event
            if (cursor < dayEnd) {
                 charEvents.push({
                    id: `npc-${character.id}-downtime-d${d}-end`,
                    day: d as 1|2|3,
                    timeDisplay: formatDisplayTime(minutesToTimeStr(cursor)),
                    sortTime: cursor,
                    endTime: dayEnd,
                    title: character.defaultActivity!,
                    description: "Downtime / Routine",
                    region: character.locationRegion,
                    location: character.defaultLocation || character.locationSpecific,
                    category: 'NPC Schedule',
                    relatedId: character.id,
                    isDowntime: true
                 });
            }
        }
    }

    return charEvents;
  });

  // 2. QUEST EVENTS
  const questEvents: MasterTimelineEvent[] = [];

  quests.forEach(quest => {
    quest.steps.forEach((step, index) => {
      const hasStrictTime = !!((step.day || (step.days && step.days.length > 0)) && step.time);
      
      let targetDays: number[] = [];
      let startTimeStr = "";
      let endTimeStr = "";
      let timeDisplay = "";

      if (hasStrictTime) {
        targetDays = step.days ? step.days : (step.day ? [step.day] : []);
        startTimeStr = step.time!;
        endTimeStr = step.endTime || "";
        timeDisplay = formatDisplayTime(step.time!);
      } else {
        if (step.day || (step.days && step.days.length > 0)) {
            targetDays = step.days ? step.days : (step.day ? [step.day] : []);
            startTimeStr = "06:00";
            endTimeStr = "20:00"; 
            timeDisplay = "Any Time";
        }
      }

      targetDays.forEach(d => {
        const startMins = getMinutes(d as 1|2|3, startTimeStr);
        let endMins = startMins + 120; 
        
        if (endTimeStr) {
          endMins = getMinutes(d as 1|2|3, endTimeStr);
        }

        const eventId = `${quest.id}-step-${index}-d${d}`;
        
        questEvents.push({
          id: eventId,
          day: d as 1|2|3,
          timeDisplay: timeDisplay,
          sortTime: startMins,
          endTime: endMins,
          title: step.title,
          description: step.description,
          region: quest.region,
          location: step.location,
          category: quest.isMainQuest ? 'Main Quest' : 'Side Quest',
          relatedId: quest.id,
          condition: step.prerequisiteStepId ? { type: 'requires_step' as const, stepId: step.prerequisiteStepId } : undefined,
          pageReference: step.pageReference
        });
      });
    });
  });

  // 3. CUSTOM SHOP EVENTS
  const shopEvents: MasterTimelineEvent[] = customShops.flatMap(shop => {
    return createDailyEvents(
      `shop-${shop.id}`,
      shop.name,
      shop.description,
      shop.openingTime,
      shop.closingTime,
      shop.region,
      shop.location,
      'Business'
    );
  });

  return [
    ...manualEvents,
    ...npcEvents,
    ...questEvents,
    ...shopEvents
  ].sort((a, b) => a.sortTime - b.sortTime);
};