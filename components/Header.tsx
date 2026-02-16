"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaTimes, FaGraduationCap, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [showBio, setShowBio] = useState(false);
    const bioRef = useRef<HTMLDivElement>(null);

    // Close bio when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (bioRef.current && !bioRef.current.contains(event.target as Node)) {
                setShowBio(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full py-6 px-4 md:px-8 fixed top-0 z-50 transition-all duration-300 pointer-events-none"
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center pointer-events-auto">
                <div className="glass rounded-full px-6 py-3 flex items-center gap-6 bg-white/60 border-white/60 shadow-sm backdrop-blur-xl">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            Sleep Lite
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary-foreground/80 lowercase">
                                playground
                            </span>
                        </h1>
                    </Link>

                    <div className="w-px h-6 bg-foreground/10 hidden md:block"></div>

                    <button
                        onClick={() => setShowBio(!showBio)}
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group relative"
                    >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/50 shadow-sm group-hover:scale-105 transition-transform">
                            <Image src="/nyxly-logo.png" alt="nyxly" fill className="object-cover" />
                        </div>
                        <span className="lowercase">by nyxly</span>

                        <AnimatePresence>
                            {showBio && (
                                <motion.div
                                    ref={bioRef}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full left-0 mt-4 w-80 p-6 glass rounded-[2rem] bg-white/95 border-white/80 shadow-2xl backdrop-blur-2xl text-left z-[60] cursor-default"
                                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-lg font-bold border-2 border-white shadow-md">
                                            SNU
                                        </div>
                                        <button
                                            onClick={() => setShowBio(false)}
                                            className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                        >
                                            <FaTimes size={14} className="text-muted-foreground" />
                                        </button>
                                    </div>

                                    <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">Nyxly Editor</h3>
                                    <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-3">Expertise & Curation</p>

                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="mt-1 text-indigo-500">
                                                <FaGraduationCap size={16} />
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Medical Student at <strong>Seoul National University (College of Medicine)</strong>. Studying the neurobiology of sleep.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="mt-1 text-red-500">
                                                <FaYoutube size={16} />
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Translating complex data into fun, actionable sleep tools for the Nyxly community.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Verified Humanness</span>
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {!isHome && (
                    <Link
                        href="/"
                        className="glass rounded-full px-5 py-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/80 transition-all shadow-sm bg-white/60"
                    >
                        <FaArrowLeft className="text-xs" />
                        <span>Back to Home</span>
                    </Link>
                )}
            </div>
        </motion.header>
    );
}
