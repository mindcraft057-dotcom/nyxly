"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaShareAlt, FaRedo, FaMoon, FaSun, FaRunning, FaCoffee, FaArrowLeft } from "react-icons/fa";
import { chronotypeAdvice } from "@/lib/chronotype-data";

interface ResultViewProps {
    resultType: string; // "lion", "bear", "wolf", "dolphin"
    resultSource: "animal" | "meq" | "mctq";
    onRetake: () => void;
    scoreDetails?: string; // e.g. "MEQ Score: 72" or "Mid-Sleep: 04:30"
    scoreSubtitle?: string; // e.g. "Definite Morning Type"
}

export default function ResultView({ resultType, resultSource, onRetake, scoreDetails, scoreSubtitle }: ResultViewProps) {
    const advice = chronotypeAdvice[resultType] || chronotypeAdvice["bear"];

    // Dynamic Header Content based on Source
    let headerIcon = null;
    let headerTitle = "";
    let headerSubtitle = "";

    if (resultSource === "animal") {
        headerIcon = (
            <div className="text-8xl mb-4 animate-bounce-slow">
                {resultType === 'lion' && '🦁'}
                {resultType === 'bear' && '🐻'}
                {resultType === 'wolf' && '🐺'}
                {resultType === 'dolphin' && '🐬'}
            </div>
        );
        headerTitle = advice.title; // "Lion"
        headerSubtitle = advice.subtitle; // "The Early Riser"
    } else if (resultSource === "meq") {
        headerTitle = "Scientific Result";
        headerSubtitle = scoreSubtitle || advice.subtitle;
    } else if (resultSource === "mctq") {
        headerTitle = "Biological Result";
        headerSubtitle = "Based on your Mid-Sleep Point";
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto w-full space-y-8 pb-12"
        >
            <div className={`bg-card rounded-3xl p-8 md:p-12 shadow-xl border-2 ${advice.color} text-center relative overflow-hidden`}>
                {/* Background Pattern decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

                {/* 1. Header Section */}
                {headerIcon}

                <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">{headerTitle}</h2>

                {/* Score Badge for MEQ/MCTQ */}
                {scoreDetails && (
                    <div className="inline-block px-6 py-2 rounded-full bg-white/30 backdrop-blur-md text-lg font-bold mb-4 shadow-sm border border-white/20">
                        {scoreDetails}
                    </div>
                )}

                {/* Subtitle / Description */}
                <p className="text-xl md:text-2xl font-medium opacity-90 mb-6">{headerSubtitle}</p>
                <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {advice.description}
                </p>

                {/* 2. Detailed Guidelines */}
                <div className="bg-white/60 dark:bg-black/20 rounded-3xl p-6 md:p-8 backdrop-blur-sm text-left shadow-inner">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 opacity-90">
                        📌 Your Daily Rhythm Guide
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-yellow-100 text-yellow-700 rounded-2xl shadow-sm"><FaSun size={20} /></div>
                                <div>
                                    <p className="text-xs font-bold uppercase opacity-60 mb-1">Ideal Wake Up</p>
                                    <p className="font-bold text-lg">{advice.idealWake}</p>
                                    <p className="text-sm opacity-70 mt-1">Start your day here to align with your cortisol spike.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 text-red-700 rounded-2xl shadow-sm"><FaRunning size={20} /></div>
                                <div>
                                    <p className="text-xs font-bold uppercase opacity-60 mb-1">Peak Performance</p>
                                    <p className="font-bold text-lg">{advice.bestExercise}</p>
                                    <p className="text-sm opacity-70 mt-1">High intensity work or exercise goes here.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-orange-100 text-orange-700 rounded-2xl shadow-sm"><FaCoffee size={20} /></div>
                                <div>
                                    <p className="text-xs font-bold uppercase opacity-60 mb-1">Caffeine Cut-off</p>
                                    <p className="font-bold text-lg">{advice.caffeineLimit}</p>
                                    <p className="text-sm opacity-70 mt-1">Stop here to protect your deep sleep quality.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl shadow-sm"><FaMoon size={20} /></div>
                                <div>
                                    <p className="text-xs font-bold uppercase opacity-60 mb-1">Ideal Bedtime</p>
                                    <p className="font-bold text-lg">{advice.idealBed}</p>
                                    <p className="text-sm opacity-70 mt-1">Wind down 1 hour before this time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Navigation Actions */}
            <div className="flex flex-col gap-4 max-w-lg mx-auto pt-4">
                {/* Big Back Button */}
                <Link
                    href="/chronotype"
                    className="w-full py-4 px-6 rounded-2xl bg-secondary text-secondary-foreground font-bold text-lg flex items-center justify-center gap-3 hover:bg-secondary/80 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                    <FaArrowLeft /> Choose Another Test
                </Link>

                <div className="flex gap-4">
                    <button className="flex-1 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
                        <FaShareAlt /> Share
                    </button>
                    <button onClick={onRetake} className="flex-1 py-3 px-6 rounded-xl bg-muted text-muted-foreground font-semibold flex items-center justify-center gap-2 hover:bg-muted/80 transition-colors">
                        <FaRedo /> Retake
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
