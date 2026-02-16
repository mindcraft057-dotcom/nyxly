"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaBrain, FaMagic } from "react-icons/fa";
import Header from "../../components/Header";

export default function DreamPage() {
    const [dream, setDream] = useState("");
    const [interpretation, setInterpretation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dream.trim()) return;

        setLoading(true);
        setError("");
        setInterpretation("");

        try {
            const res = await fetch("/api/interpret", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dream }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setInterpretation(data.interpretation);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-32">
            <Header />
            <div className="w-full max-w-2xl">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary/20 text-secondary-foreground mb-4">
                        <FaBrain size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Dream Interpreter</h1>
                    <p className="text-muted-foreground">Type your dream below and let our AI analyze its hidden meaning.</p>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            className="w-full h-40 p-4 rounded-xl border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none resize-none bg-background text-foreground placeholder:text-muted-foreground"
                            placeholder="I was flying over a city made of marshmallows..."
                            value={dream}
                            onChange={(e) => setDream(e.target.value)}
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            disabled={loading || !dream.trim()}
                            className="w-full py-3 px-6 rounded-xl bg-secondary text-secondary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="animate-pulse">Interpreting...</span>
                            ) : (
                                <>
                                    <FaMagic /> Interpret My Dream
                                </>
                            )}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {interpretation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 pt-8 border-t border-border"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                                <span className="text-2xl">✨</span> Interpretation
                            </h3>
                            <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {interpretation}
                            </div>
                            <p className="text-xs text-muted-foreground mt-6 text-center italic">
                                *For entertainment purposes only. AI can make mistakes.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
