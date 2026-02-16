"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaReceipt, FaShareAlt, FaDownload } from "react-icons/fa";
import Link from "next/link";
import Header from "../../components/Header";

export default function ReceiptPage() {
    const [bedtime, setBedtime] = useState("23:00");
    const [wakeTime, setWakeTime] = useState("07:00");
    const [weirdness, setWeirdness] = useState(5);
    const [mood, setMood] = useState("Refreshed");
    const [showReceipt, setShowReceipt] = useState(false);
    const receiptRef = useRef<HTMLDivElement>(null);

    const calculateDuration = () => {
        const [h1, m1] = bedtime.split(":").map(Number);
        const [h2, m2] = wakeTime.split(":").map(Number);

        let start = h1 * 60 + m1;
        let end = h2 * 60 + m2;

        if (end < start) end += 24 * 60;

        const diff = end - start;
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;

        return { hours, mins, totalMins: diff };
    };

    const generateReceipt = (e: React.FormEvent) => {
        e.preventDefault();
        setShowReceipt(true);
    };

    const { hours, mins, totalMins } = calculateDuration();
    const sleepScore = Math.min(100, Math.max(0,
        (hours >= 7 && hours <= 9 ? 80 : 50) +
        (weirdness > 7 ? -10 : 10) +
        (mood === "Refreshed" ? 10 : mood === "Electric" ? 20 : mood === "Tired" ? -10 : -20)
    ));

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f1115] flex flex-col items-center p-4 pt-32 pb-20">
            <Header />

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left: Input Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
                        <FaArrowLeft size={14} /> Back to Playground
                    </Link>

                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Sleep Receipt</h1>
                        <p className="text-muted-foreground">Generate a viral-style summary of your rest.</p>
                    </div>

                    <form onSubmit={generateReceipt} className="bg-card rounded-3xl p-8 border border-border shadow-sm space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Bedtime</label>
                                <input
                                    type="time"
                                    value={bedtime}
                                    onChange={(e) => setBedtime(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-secondary outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Wake-up</label>
                                <input
                                    type="time"
                                    value={wakeTime}
                                    onChange={(e) => setWakeTime(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-secondary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-sm font-medium text-muted-foreground">Dream Weirdness</label>
                                <span className="text-2xl font-bold text-secondary">{weirdness}</span>
                            </div>
                            <input
                                type="range"
                                min="1" max="10"
                                value={weirdness}
                                onChange={(e) => setWeirdness(parseInt(e.target.value))}
                                className="w-full accent-secondary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                                <span>Normal</span>
                                <span>Surreal</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">How do you feel?</label>
                            <div className="grid grid-cols-2 gap-2">
                                {["Zombie", "Tired", "Refreshed", "Electric"].map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => setMood(m)}
                                        className={`py-3 rounded-xl text-sm font-medium border transition-all ${mood === m
                                                ? "bg-secondary/10 border-secondary text-secondary-foreground"
                                                : "border-border hover:border-muted-foreground"
                                            }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-foreground text-background font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                        >
                            Generate Receipt
                        </button>
                    </form>
                </motion.div>

                {/* Right: Receipt Preview */}
                <div className="flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {showReceipt ? (
                            <motion.div
                                key="receipt"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative group"
                            >
                                {/* The Actual Receipt */}
                                <div
                                    ref={receiptRef}
                                    className="bg-white text-black p-8 pt-12 w-[340px] shadow-2xl relative font-mono text-sm leading-tight flex flex-col items-center"
                                    style={{ fontFamily: "var(--font-space-mono), monospace" }}
                                >
                                    {/* Jagged Edges */}
                                    <div className="absolute top-0 left-0 w-full h-2 flex overflow-hidden">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="flex-shrink-0 w-4 h-4 bg-[#f8f9fa] dark:bg-[#0f1115] rotate-45 -translate-y-2" />
                                        ))}
                                    </div>

                                    <div className="text-center mb-6 w-full">
                                        <h2 className="text-xl font-bold tracking-tighter mb-1">NYXLY SLEEP STORE</h2>
                                        <p className="text-[10px] uppercase font-bold text-gray-500">Order #SLEEP-{Math.floor(Math.random() * 100000)}</p>
                                        <div className="border-b border-dashed border-gray-300 my-4" />
                                        <p className="text-[10px]">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>

                                    <div className="w-full space-y-2 uppercase text-[11px] mb-8">
                                        <div className="flex justify-between">
                                            <span>Deep Sleep ({Math.floor(hours * 0.2)}h {Math.floor(mins * 0.2)}m)</span>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Rem Cycle x {Math.round(totalMins / 90)}</span>
                                            <span>$FREE</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Strange Dreams (Lv.{weirdness})</span>
                                            <span>$INCL</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Morning State: {mood}</span>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="border-b border-dashed border-gray-300 my-2" />
                                        <div className="flex justify-between text-base font-bold">
                                            <span>Total Sleep</span>
                                            <span>{hours}h {mins}m</span>
                                        </div>
                                    </div>

                                    <div className="w-full text-center space-y-4 mb-4">
                                        <div className="bg-black text-white py-2 px-4 inline-block">
                                            <p className="text-xs font-bold tracking-widest mb-1">SLEEP SCORE</p>
                                            <p className="text-4xl font-black">{sleepScore}</p>
                                        </div>
                                        <p className="text-[9px] text-gray-400 italic">
                                            Thank you for choosing Nyxly.<br />
                                            Visit nyxly.art for more rest.
                                        </p>
                                    </div>

                                    {/* Barcode Placeholder */}
                                    <div className="w-full h-12 flex items-center justify-center gap-[1px] opacity-80 mt-4 mb-8">
                                        {[...Array(40)].map((_, i) => (
                                            <div key={i} className="bg-black" style={{ width: `${Math.random() * 3 + 1}px`, height: '100%' }} />
                                        ))}
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full h-2 flex overflow-hidden translate-y-2">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="flex-shrink-0 w-4 h-4 bg-white rotate-45 -translate-y-2" />
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Actions */}
                                <div className="absolute -right-16 top-0 flex flex-col gap-3">
                                    <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-black hover:scale-110 transition-transform">
                                        <FaShareAlt />
                                    </button>
                                    <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-black hover:scale-110 transition-transform">
                                        <FaDownload />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-[340px] h-[500px] border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <FaReceipt size={32} />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Ready to checkout?</h3>
                                <p className="text-sm">Input your sleep data and click "Generate Receipt" to see your personalized summary.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
