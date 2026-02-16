export type Question = {
    id: number;
    text: string;
    options: {
        label: string;
        value: string; // For Animal: "lion", "bear", etc. For MEQ: points "5", "4", etc.
    }[];
};

export const animalQuestions: Question[] = [
    {
        id: 1,
        text: "If you were entirely free to plan your day, what time would you wake up?",
        options: [
            { label: "Before 6:30 AM", value: "lion" },
            { label: "7:00 AM - 8:30 AM", value: "bear" },
            { label: "After 9:00 AM", value: "wolf" },
            { label: "My wake-up time varies wildly / I usually wake up tired", value: "dolphin" },
        ],
    },
    {
        id: 2,
        text: "What is your favorite meal of the day?",
        options: [
            { label: "Breakfast—I wake up ready to eat!", value: "lion" },
            { label: "Lunch—I'm hungriest midday", value: "bear" },
            { label: "Dinner—I often skip breakfast and eat late", value: "wolf" },
            { label: "I forget to eat / My appetite fluctuates", value: "dolphin" },
        ],
    },
    {
        id: 3,
        text: "When do you feel most productive and focused?",
        options: [
            { label: "Early morning (8 AM - 12 PM)", value: "lion" },
            { label: "Late morning to early afternoon (10 AM - 2 PM)", value: "bear" },
            { label: "Late afternoon or late night (4 PM - 10 PM)", value: "wolf" },
            { label: "It comes in sporadic bursts throughout the day", value: "dolphin" },
        ],
    },
    {
        id: 4,
        text: "How would you describe your sleep quality?",
        options: [
            { label: "Good, but I'm basically dead to the world once I hit the pillow", value: "lion" },
            { label: "Solid. I deeply sleep and wake up refreshed most days", value: "bear" },
            { label: "I struggle to fall asleep before 1 AM", value: "wolf" },
            { label: "Light sleeper. I wake up at the slightest noise", value: "dolphin" },
        ],
    },
    {
        id: 5,
        text: "Do you take naps?",
        options: [
            { label: "Rarely. I'd rather power through and sleep early", value: "lion" },
            { label: "Only on weekends or when really tired", value: "bear" },
            { label: "Yes, assuming I can actually wake up from them", value: "wolf" },
            { label: "I try, but I usually just lie there thinking", value: "dolphin" },
        ],
    },
    {
        id: 6,
        text: "How do you feel in the first 30 minutes after waking up?",
        options: [
            { label: "Alert and ready to go immediately", value: "lion" },
            { label: "A bit groggy (sleep inertia) but fine after coffee", value: "bear" },
            { label: "Zombie-like. Don't talk to me", value: "wolf" },
            { label: "Disoriented or already anxious about the day", value: "dolphin" },
        ],
    },
    {
        id: 7,
        text: "What is your personality type most like?",
        options: [
            { label: "Goal-oriented, practical, leader", value: "lion" },
            { label: "Friendly, team-oriented, steady worker", value: "bear" },
            { label: "Creative, impulsive, risk-taker", value: "wolf" },
            { label: "Perfectionist, intelligent, sometimes neurotic", value: "dolphin" },
        ],
    },
    {
        id: 8,
        text: "When do you prefer to exercise?",
        options: [
            { label: "First thing in the morning", value: "lion" },
            { label: "Early evening or just before dinner", value: "bear" },
            { label: "Late at night or not at all", value: "wolf" },
            { label: "Whenever I can squeeze it in (inconsistent)", value: "dolphin" },
        ],
    },
    {
        id: 9,
        text: "How sensitive are you to noise and light while sleeping?",
        options: [
            { label: "Not very. I sleep like a log", value: "lion" },
            { label: "I need it dark, but a little noise doesn't bother me", value: "bear" },
            { label: "I can sleep through anything once I'm actually asleep", value: "wolf" },
            { label: "Very. I need blackout curtains and earplugs", value: "dolphin" },
        ],
    },
    {
        id: 10,
        text: "Ideally, when would you go to bed?",
        options: [
            { label: "9:30 PM - 10:30 PM", value: "lion" },
            { label: "10:30 PM - 11:30 PM", value: "bear" },
            { label: "After 12:30 AM", value: "wolf" },
            { label: "Whenever I finally stop overthinking (usually late)", value: "dolphin" },
        ],
    },
];

export const meqQuestions: Question[] = [
    {
        id: 1,
        text: "What time would you get up if you were entirely free to plan your day?",
        options: [
            { label: "5:00 AM - 6:30 AM", value: "5" },
            { label: "6:30 AM - 7:45 AM", value: "4" },
            { label: "7:45 AM - 9:45 AM", value: "3" },
            { label: "9:45 AM - 11:00 AM", value: "2" },
            { label: "11:00 AM - 12:00 PM", value: "1" },
        ],
    },
    {
        id: 2,
        text: "What time would you go to bed if you were entirely free to plan your evening?",
        options: [
            { label: "8:00 PM - 9:00 PM", value: "5" },
            { label: "9:00 PM - 10:15 PM", value: "4" },
            { label: "10:15 PM - 12:30 AM", value: "3" },
            { label: "12:30 AM - 1:45 AM", value: "2" },
            { label: "1:45 AM - 3:00 AM", value: "1" },
        ],
    },
    {
        id: 3,
        text: "If there is a specific time at which you have to get up in the morning, to what extent do you depend on being woken up by an alarm clock?",
        options: [
            { label: "Not at all dependent", value: "4" },
            { label: "Slightly dependent", value: "3" },
            { label: "Fairly dependent", value: "2" },
            { label: "Very dependent", value: "1" },
        ],
    },
    {
        id: 4,
        text: "How easy do you find it to get up in the morning (when you are not awakened unexpectedly)?",
        options: [
            { label: "Very easy", value: "4" },
            { label: "Fairly easy", value: "3" },
            { label: "Somewhat difficult", value: "2" },
            { label: "Very difficult", value: "1" },
        ],
    },
    {
        id: 5,
        text: "How alert do you feel during the first half hour after you wake up in the morning?",
        options: [
            { label: "Very alert", value: "4" },
            { label: "Fairly alert", value: "3" },
            { label: "Somewhat groggy", value: "2" },
            { label: "Very groggy", value: "1" },
        ],
    },
    {
        id: 6,
        text: "How hungry do you feel during the first half hour after you wake up?",
        options: [
            { label: "Very hungry", value: "4" },
            { label: "Fairly hungry", value: "3" },
            { label: "Somewhat hungry", value: "2" },
            { label: "Not hungry at all", value: "1" },
        ],
    },
    {
        id: 7,
        text: "During the first half hour after you wake up in the morning, how do you feel?",
        options: [
            { label: "Very refreshed", value: "4" },
            { label: "Fairly refreshed", value: "3" },
            { label: "Somewhat tired", value: "2" },
            { label: "Very tired", value: "1" },
        ],
    },
    {
        id: 8,
        text: "If you had no commitments the next day, what time would you go to bed compared to your usual bedtime?",
        options: [
            { label: "Seldom or never later", value: "4" },
            { label: "Less than 1 hour later", value: "3" },
            { label: "1-2 hours later", value: "2" },
            { label: "More than 2 hours later", value: "1" },
        ],
    },
    {
        id: 9,
        text: "You have decided to exercise. A friend suggests that you do this for one hour between 7:00-8:00 AM. Bearing in mind nothing but your own internal 'clock,' how do you think you would perform?",
        options: [
            { label: "Would be in good form", value: "4" },
            { label: "Would be in reasonable form", value: "3" },
            { label: "Would find it difficult", value: "2" },
            { label: "Would find it very difficult", value: "1" },
        ],
    },
    {
        id: 10,
        text: "At what time of day do you feel you become tired as a result of need for sleep?",
        options: [
            { label: "8:00 PM - 9:00 PM", value: "5" },
            { label: "9:00 PM - 11:00 PM", value: "4" },
            { label: "11:00 PM - 1:00 AM", value: "3" },
            { label: "1:00 AM - 3:00 AM", value: "2" },
            { label: "3:00 AM - 4:00 AM", value: "1" },
        ],
    },
    {
        id: 11,
        text: "You have two hours of hard physical work. You are entirely free to plan your day. Considering only your internal 'clock,' which of the following times would you choose?",
        options: [
            { label: "8:00 AM - 10:00 AM", value: "4" },
            { label: "11:00 AM - 1:00 PM", value: "3" },
            { label: "3:00 PM - 5:00 PM", value: "2" },
            { label: "7:00 PM - 9:00 PM", value: "1" },
        ],
    },
    {
        id: 12,
        text: "If you got into bed at 11:00 PM, how tired would you be?",
        options: [
            { label: "Not at all tired", value: "0" },
            { label: "Slightly tired", value: "2" },
            { label: "Fairly tired", value: "3" },
            { label: "Very tired", value: "5" },
        ],
    },
    {
        id: 13,
        text: "For some reason, you have gone to bed several hours later than usual, but there is no need to get up at any particular time the next morning. Which of the following are you most likely to do?",
        options: [
            { label: "Wake up at usual time, no nap", value: "4" },
            { label: "Wake up at usual time, nap", value: "3" },
            { label: "Wake up later, no nap", value: "2" },
            { label: "Wake up later, nap", value: "1" },
        ],
    },
    {
        id: 14,
        text: "When you have a specific time to get up in the morning, do you ever wake up before that time?",
        options: [
            { label: "Regularly", value: "4" },
            { label: "Frequently", value: "3" },
            { label: "Occasionally", value: "2" },
            { label: "Seldom or never", value: "1" },
        ],
    },
    {
        id: 15,
        text: "You have to undertake two hours of hard physical work. You are free to plan your day. Which measures would you choose?",
        options: [
            { label: "8:00 AM - 10:00 AM", value: "4" },
            { label: "11:00 AM - 1:00 PM", value: "3" },
            { label: "3:00 PM - 5:00 PM", value: "2" },
            { label: "7:00 PM - 9:00 PM", value: "1" },
        ],
    },
    {
        id: 16,
        text: "You have decided to do physical exercise. A friend suggests that you do this for one hour between 10:00-11:00 PM. How well do you think you would perform?",
        options: [
            { label: "Would be in good form", value: "1" },
            { label: "Reasonable form", value: "2" },
            { label: "Difficult", value: "3" },
            { label: "Very difficult", value: "4" },
        ],
    },
    {
        id: 17,
        text: "Suppose you can choose your own work hours. Assume that you work a five-hour day. At approximately what time would you choose to begin?",
        options: [
            { label: "4:00 AM - 9:00 AM", value: "5" },
            { label: "7:00 AM - 12:00 PM", value: "4" },
            { label: "10:00 AM - 3:00 PM", value: "3" },
            { label: "4:00 PM - 9:00 PM", value: "2" },
            { label: "11:00 PM - 4:00 AM", value: "1" },
        ],
    },
    {
        id: 18,
        text: "At approximately what time of day do you usually feel your best?",
        options: [
            { label: "5:00 AM - 8:00 AM", value: "5" },
            { label: "8:00 AM - 10:00 AM", value: "4" },
            { label: "10:00 AM - 5:00 PM", value: "3" },
            { label: "5:00 PM - 10:00 PM", value: "2" },
            { label: "10:00 PM - 5:00 AM", value: "1" },
        ],
    },
    {
        id: 19,
        text: "One hears about 'morning types' and 'evening types.' Which one of these types do you consider yourself to be?",
        options: [
            { label: "Definitely a morning type", value: "6" },
            { label: "More morning than evening", value: "4" },
            { label: "More evening than morning", value: "2" },
            { label: "Definitely an evening type", value: "0" },
        ],
    },
];

export type Advice = {
    title: string;
    subtitle: string;
    description: string;
    color: string;
    idealWake: string;
    peakFocus: string;
    bestExercise: string;
    caffeineLimit: string;
    idealBed: string;
};

export const chronotypeAdvice: Record<string, Advice> = {
    lion: {
        title: "Lion",
        subtitle: "The Early Riser",
        description: "You are the king of the morning jungle. Goal-oriented and practical, you wake up ready to conquer the day but fade in the evening.",
        color: "bg-orange-100 text-orange-900 border-orange-200",
        idealWake: "5:30 AM – 6:30 AM",
        peakFocus: "8:00 AM – 12:00 PM",
        bestExercise: "5:30 PM (To boost fading energy)",
        caffeineLimit: "2:00 PM",
        idealBed: "10:00 PM",
    },
    bear: {
        title: "Bear",
        subtitle: "The Solar Sleeper",
        description: "The most common chronotype (55% of people). You flow with the sun—steady energy all day, but you need your 8 hours.",
        color: "bg-blue-100 text-blue-900 border-blue-200",
        idealWake: "7:00 AM – 8:00 AM",
        peakFocus: "10:00 AM – 2:00 PM",
        bestExercise: "6:00 PM (Pre-dinner)",
        caffeineLimit: "3:00 PM",
        idealBed: "11:00 PM",
    },
    wolf: {
        title: "Wolf",
        subtitle: "The Night Hunter",
        description: "Creative, impulsive, and allergic to mornings. You do your best work when the world is asleep.",
        color: "bg-purple-100 text-purple-900 border-purple-200",
        idealWake: "7:30 AM – 9:00 AM (or as late as possible)",
        peakFocus: "5:00 PM – 10:00 PM",
        bestExercise: "6:00 PM – 7:00 PM",
        caffeineLimit: "5:00 PM",
        idealBed: "12:00 AM – 1:00 AM",
    },
    dolphin: {
        title: "Dolphin",
        subtitle: "The Light Sleeper",
        description: "Intelligent but often wired. Your sleep is fragmented, and you're prone to insomnia. Consistency is your best friend.",
        color: "bg-teal-100 text-teal-900 border-teal-200",
        idealWake: "6:30 AM (Consistency is key!)",
        peakFocus: "3:00 PM – 9:00 PM",
        bestExercise: "Morning (To boost cortisol early)",
        caffeineLimit: "1:00 PM (Strict!)",
        idealBed: "11:30 PM",
    },
};
