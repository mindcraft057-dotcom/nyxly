"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaPaw, FaBrain, FaDna, FaArrowRight } from "react-icons/fa";

const tests = [
    {
        id: "animal",
        title: "Sleep Personality Test",
        subtitle: "Fun & Fast • 3 min",
        description: "Discover your inner sleep animal (Lion, Bear, Wolf, Dolphin) based on your daily habits and preferences.",
        icon: <FaPaw className="text-4xl text-orange-500" />,
        color: "hover:border-orange-500/50 hover:bg-orange-500/5",
        link: "/chronotype/animal",
    },
    {
        id: "meq",
        title: "Scientific Standard (MEQ)",
        subtitle: "Psychological • 5 min",
        description: "The gold-standard Morningness-Eveningness Questionnaire used by researchers to determine your circadian preference.",
        icon: <FaBrain className="text-4xl text-blue-500" />,
        color: "hover:border-blue-500/50 hover:bg-blue-500/5",
        link: "/chronotype/meq",
    },
    {
        id: "mctq",
        title: "Biological Clock (MCTQ)",
        subtitle: "Physiological • 2 min",
        description: "Calculate your Mid-Sleep Point based on actual sleep behavior on work vs. free days.",
        icon: <FaDna className="text-4xl text-purple-500" />,
        color: "hover:border-purple-500/50 hover:bg-purple-500/5",
        link: "/chronotype/mctq",
    },
];

import Header from "../../components/Header";

// ... existing imports ...

export default function ChronotypeHub() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center py-16 px-4 pt-32">
            <Header />
            <div className="text-center mb-12 max-w-4xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight whitespace-nowrap">
                    Chronotype Test: Find Your Sleep Type
                </h1>
                <p className="text-xl text-muted-foreground">
                    Discover if you are a Bear, Wolf, Lion, or Dolphin. Optimize your circadian rhythm and productivity for better living.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                {tests.map((test, index) => (
                    <Link href={test.link} key={test.id} className="block h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`h-full rounded-3xl p-8 border-2 border-border transition-all duration-300 group flex flex-col glass glass-hover bg-white/95 
                                ${test.id === 'animal' ? 'bg-orange-50/80 border-orange-200/50' : ''} 
                                ${test.id === 'meq' ? 'bg-blue-50/80 border-blue-200/50' : ''} 
                                ${test.id === 'mctq' ? 'bg-purple-50/80 border-purple-200/50' : ''} 
                                ${test.color} hover:shadow-lg`}
                        >
                            <div className="mb-6 bg-background rounded-2xl w-16 h-16 flex items-center justify-center shadow-sm border border-border group-hover:scale-110 transition-transform">
                                {test.icon}
                            </div>

                            <div className="mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                                    {test.subtitle}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold mb-3 mt-4 group-hover:text-primary transition-colors">
                                {test.title}
                            </h2>

                            <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                                {test.description}
                            </p>

                            <div className="w-full py-3 px-6 rounded-full border border-border bg-card text-foreground font-semibold text-center hover:bg-secondary/10 transition-colors shadow-sm inline-flex items-center justify-center gap-2 group-hover:border-primary/50 group-hover:text-primary">
                                Start Test <FaArrowRight />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="mt-16 text-center text-sm text-muted-foreground">
                <p className="mb-6">Not sure? Start with the <strong>Sleep Personality Test</strong> for a quick insight.</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground font-semibold hover:bg-secondary/10 transition-colors shadow-sm text-base"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
