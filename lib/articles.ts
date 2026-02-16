export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Supports basic HTML or you can use a markdown parser if preferred later
    youtubeUrl?: string; // Optional YouTube video URL
    date: string;
    category: string;
    imageUrl?: string; // Optional cover image
}

export const articles: Article[] = [
    {
        id: '1',
        slug: 'importance-of-sleep-cycles',
        title: 'The Importance of Sleep Cycles: Facts You Didn\'t Know',
        excerpt: 'Why do we sleep? And what are REM and Non-REM sleep? Let\'s dive into the science of sleep.',
        content: `
      <p>Sleep is not just about resting. It is an intense process where our brain and body recover, organize memories, and prepare for the next day.</p>
      <h3>REM and Non-REM Sleep</h3>
      <p>Sleep is largely divided into REM (Rapid Eye Movement) and Non-REM sleep. Non-REM sleep is further divided into stages 1 to 3, with deep sleep occurring in stage 3. This is when physical recovery primarily happens.</p>
      <p>On the other hand, during REM sleep, the brain is highly active, and we often dream. This stage is crucial for emotional regulation and memory consolidation.</p>
      <p>This cycle typically repeats 4 to 5 times a night. Maintaining this cycle without interruption is the key to 'good sleep'.</p>
    `,
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Example URL, replace with actual
        date: '2026-02-15',
        category: 'Sleep Science',
    },
    {
        id: '2',
        slug: 'morning-routine-for-better-sleep',
        title: 'Morning Routines Determine Your Night\'s Sleep',
        excerpt: 'To sleep well, how you spend your morning is just as important as your night. Introducing effective morning routines.',
        content: `
      <p>Many people worry about what to do at night to sleep well. However, sleep experts emphasize the 'morning'.</p>
      <h3>Sunlight Shower</h3>
      <p>Getting sunlight immediately after waking up resets your body's biological clock. Melatonin secretion stops, and serotonin begins to be released. This serotonin converts back into melatonin at night to induce sleep.</p>
      <h3>Drinking a Glass of Water</h3>
      <p>We lose a lot of moisture while sleeping. Drinking a glass of lukewarm water as soon as you wake up wakes up your metabolism and helps regain vitality.</p>
    `,
        date: '2026-02-10',
        category: 'Tips & Tricks',
    },
    {
        id: '3',
        slug: 'chronotype-explanation',
        title: 'Understanding My Chronotype',
        excerpt: 'Morning person, Night person... Where do I allow? How to understand my sleep rhythm.',
        content: `
      <p>Chronotype refers to an individual's innate 24-hour biological rhythm. Some people find it comfortable to wake up early in the morning, while others fit better with going to bed late and waking up late.</p>
      <p>Rather than forcing yourself to change your chronotype, adjusting your lifestyle pattern to fit your type is the shortcut to increasing sleep efficiency.</p>
      <p>Find out your type through our <strong>Chronotype Test</strong>!</p>
    `,
        date: '2026-02-01',
        category: 'Sleep Science',
    }
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((article) => article.slug === slug);
}

export function getAllArticles(): Article[] {
    // Sort by date descending
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
