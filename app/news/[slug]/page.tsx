import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "../../../lib/articles";
import { FaArrowLeft, FaCalendar, FaTag } from "react-icons/fa";
import Image from "next/image";

export const runtime = "edge";

// Helper to extract YouTube ID
function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}

// We need to properly type the params for Next.js 15+ (or recent Next.js versions)
// Since Next.js dynamic routes props are async in newer versions, but basic props work in older.
// Safest is to treat params as a Promise or just use them if not using "use client" hooks immediately on them.
// In Server Components, params is a Promise in Next.js 15, but usually simple object in 14.
// Assuming Next.js 14+ based on the file structure usually seen.
// However, to be safe against the async params change, we can await it if we are on bleeding edge,
// but for standard usage:
interface Props {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const videoId = article.youtubeUrl ? getYouTubeId(article.youtubeUrl) : null;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            {/* Header */}
            <header className="w-full py-6 px-4 md:px-8 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-3 hover:opacity-80 transition-opacity">
                        Sleep Lite <span className="text-sm font-normal text-muted-foreground mr-1">Playground</span>
                        <div className="flex items-center gap-2 pl-3 border-l border-border">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border/50 bg-secondary/10">
                                <Image src="/nyxly-logo.png" alt="nyxly" fill className="object-cover" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground lowercase">by nyxly</span>
                        </div>
                    </Link>
                    <Link href="/news" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <FaArrowLeft /> Back to News
                    </Link>
                </div>
            </header>

            <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="mb-8 not-prose">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full text-secondary-foreground font-medium">
                                <FaTag size={12} /> {article.category}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaCalendar size={12} /> {article.date}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                            {article.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {article.excerpt}
                        </p>
                    </div>

                    {videoId && (
                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg mb-10 border border-border bg-card">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        </div>
                    )}

                    <div
                        className="text-foreground leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>

                <hr className="my-12 border-border" />

                <div className="flex justify-between items-center">
                    <Link href="/news" className="px-6 py-3 rounded-full border border-border hover:bg-secondary/10 transition-colors font-medium">
                        ← Read More News
                    </Link>
                    <Link href="/" className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium">
                        Back to Home
                    </Link>
                </div>
            </main>

            <footer className="w-full py-8 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Sleep Lite. Sweet dreams.
            </footer>
        </div>
    );
}
