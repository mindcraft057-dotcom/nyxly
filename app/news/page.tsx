import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "../../lib/articles";
import { FaArrowLeft, FaClock, FaYoutube } from "react-icons/fa";

import Header from "../../components/Header";

// ... (imports)

export default function NewsPage() {
    const articles = getAllArticles();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Header />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 flex flex-col pt-32">
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
                        Sleep <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">News</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Latest insights on sleep science, tips for better rest, and updates from the channel.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {articles.map((article) => (
                        <Link key={article.id} href={`/news/${article.slug}`} className="group relative bg-card rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20">
                            <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground font-medium text-xs">
                                            {article.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaClock size={12} /> {article.date}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h2>

                                    <p className="text-muted-foreground line-clamp-2">
                                        {article.excerpt}
                                    </p>

                                    {article.youtubeUrl && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm font-medium mt-2">
                                            <FaYoutube /> Includes Video
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}

                    {articles.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p>No articles found yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="w-full py-8 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Sleep Lite. Sweet dreams.
            </footer>
        </div>
    );
}
