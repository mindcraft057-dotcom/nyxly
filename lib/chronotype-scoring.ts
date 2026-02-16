export function calculateAnimalScore(answers: string[]): string {
    const counts: Record<string, number> = { lion: 0, bear: 0, wolf: 0, dolphin: 0 };

    answers.forEach((ans) => {
        if (counts[ans] !== undefined) {
            counts[ans]++;
        }
    });

    // Find the max value
    let maxScore = -1;
    let winner = "bear"; // Default to most common

    Object.entries(counts).forEach(([animal, score]) => {
        if (score > maxScore) {
            maxScore = score;
            winner = animal;
        }
    });

    return winner;
}

export function calculateMEQScore(answers: Record<number, string>): { score: number; type: string; animal: string } {
    let score = 0;
    Object.values(answers).forEach((val) => {
        score += parseInt(val, 10);
    });

    let type = "";
    let animal = "";

    if (score >= 70) {
        type = "Definite Morning Type";
        animal = "lion";
    } else if (score >= 59) {
        type = "Moderate Morning Type";
        animal = "lion";
    } else if (score >= 42) {
        type = "Intermediate Type";
        animal = "bear";
    } else if (score >= 31) {
        type = "Moderate Evening Type";
        animal = "wolf";
    } else {
        type = "Definite Evening Type";
        animal = "wolf"; // Or maybe dolphin if very low? But Wolf is standard evening.
    }

    return { score, type, animal };
}

// MCTQ Types
type TimeString = string; // "HH:MM"

interface DailySleep {
    bedTime: TimeString;
    sleepLatency: number; // minutes
    wakeTime: TimeString;
    alarm?: boolean;
}

// Helper: Convert "HH:MM" to minutes from midnight (handles past midnight)
function timeToMinutes(time: TimeString): number {
    const [h, m] = time.split(":").map(Number);
    // We assume a "day" starts at noon (12:00) minus 12 hours, to handle 1 AM as 25:00 relative to previous midnight?
    // Actually simpler: 
    // If time is 00:00 - 11:59, it might be "next day". 
    // Standard MCTQ logic often uses 24h. 
    // Let's just standard minutes. 00:00 = 0.
    return h * 60 + m;
}

// Helper: Duration between two times, handling crossing midnight
function getDuration(start: number, end: number): number {
    if (end < start) {
        return (end + 1440) - start; // Add 24 hours (1440 mins)
    }
    return end - start;
}

// Helper: Get absolute time from origin (e.g. bed time) + duration
// Returns minutes from 00:00, can be > 1440.
function addMinutes(start: number, mins: number): number {
    return start + mins;
}

export function calculateMCTQ(work: DailySleep, free: DailySleep): { msfSc: string; animal: string } {
    // 1. Calculate Sleep Onset (SO)
    // We need to handle "BedTime" vs "Sleep Onset". SO = BedTime + Latency

    // Convert inputs to mins
    const soWork = (timeToMinutes(work.bedTime) + work.sleepLatency) % 1440;
    const soFree = (timeToMinutes(free.bedTime) + free.sleepLatency) % 1440;

    const wakeWork = timeToMinutes(work.wakeTime);
    const wakeFree = timeToMinutes(free.wakeTime);

    // 2. Sleep Duration (SD)
    const sdWork = getDuration(soWork, wakeWork);
    const sdFree = getDuration(soFree, wakeFree);

    // 3. Average Weekly Sleep (SD_week)
    const sdWeek = ((sdWork * 5) + (sdFree * 2)) / 7;

    // 4. Mid-Sleep on Free Days (MSF)
    // MSF = SO_free + (SD_free / 2)
    // We need SO_free relative to a standard day start to avoid modulo issues during finding midpoint?
    // Let's treat SO_free as "minutes from midnight".
    // If SO is 23:00, Wake is 07:00. Duration 8h (480m). Mid is 23:00 + 4h = 03:00.
    // If SO is 01:00, Wake is 09:00. Duration 8h. Mid is 01:00 + 4h = 05:00.

    // We need to handle the "crossing midnight" for SO.
    // Standardize: If SO < 12:00 (noon), assume it's "next day" (add 1440) for calculation relative to previous night?
    // Or just use the BedTime.

    // Let's use a "Local Time" approach where we assume sleep happens broadly between 18:00 and 12:00.
    let soFreeRel = soFree;
    if (soFree < 720) { // If sleep onset is AM (00:00 - 12:00), treat as next day for calculation
        soFreeRel += 1440;
    }
    // Wait, if someone goes to bed at 23:00, that's 1380. 
    // If 01:00, that's 60 + 1440 = 1500.
    // Correct.

    const msf = soFreeRel + (sdFree / 2); // Minutes from previous midnight

    // 5. Correction (MSFsc)
    let msfSc = msf;
    if (sdFree > sdWork) {
        msfSc = msf - ((sdFree - sdWeek) / 2);
    }

    // Normalize back to 0-1440 (24h format)
    msfSc = msfSc % 1440;
    if (msfSc < 0) msfSc += 1440;

    // Convert to HH:MM string
    const h = Math.floor(msfSc / 60);
    const m = Math.floor(msfSc % 60);
    const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

    // 6. Map to Animal
    // Lion: < 3:30 (210 min)
    // Bear: 3:30 - 6:00 (210 - 360 min)
    // Wolf: > 6:00 (360 min)

    let animal = "bear";
    // We need to handle the fact that "Early" means small numbers (e.g. 2:00 AM) and "Late" means large (e.g. 7:00 AM).
    // But usually MSF is AM.
    // If MSF is 23:00 (very early?), that's huge number? 
    // No, MSF is usually 2:00 AM - 6:00 AM.
    // If MSF is 23:00 (1380), that is EXTREMELY early Lion.
    // If MSF is 13:00 (13:00 PM), that is EXTREMELY late Wolf.

    // Let's convert msfSc to "hours from midnight" to compare.
    // 00:00 = 0, 06:00 = 6.
    // If > 12 (Noon), it's probably "Is it yesterday or today?"
    // Assuming standard sleep, MSF is 0~12 range.

    if (msfSc < 210) { // < 3:30
        animal = "lion";
    } else if (msfSc >= 360) { // > 6:00
        animal = "wolf";
    } else {
        animal = "bear";
    }

    return { msfSc: timeString, animal };
}
