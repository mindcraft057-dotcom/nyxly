"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBed, FaSun, FaClock, FaCalendarDay, FaCalendarAlt, FaTimes } from "react-icons/fa";
import { calculateMCTQ } from "@/lib/chronotype-scoring";
import ResultView from "./ResultView";
import Link from "next/link";

type DaySleep = {
    bedTime: string;
    sleepLatency: number;
    wakeTime: string;
    alarm: boolean;
};

const INITIAL_STATE: DaySleep = {
    bedTime: "23:00",
    sleepLatency: 15,
    wakeTime: "07:00",
    alarm: true,
};

export default function MCTQQuiz() {
    const [step, setStep] = useState(0); // 0: Intro, 1: Work, 2: Free, 3: Result
    const [workSleep, setWorkSleep] = useState<DaySleep>(INITIAL_STATE);
    const [freeSleep, setFreeSleep] = useState<DaySleep>({ ...INITIAL_STATE, wakeTime: "09:00", alarm: false });
    const [result, setResult] = useState<{ msfSc: string; animal: string } | null>(null);

    const handleCalculate = () => {
        const res = calculateMCTQ(workSleep, freeSleep);
        setResult(res);
        setStep(3);
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setWorkSleep(INITIAL_STATE);
        setFreeSleep({ ...INITIAL_STATE, wakeTime: "09:00", alarm: false });
        setResult(null);
    };

    const renderInputStep = (
        title: string,
        icon: React.ReactNode,
        data: DaySleep,
        setData: (d: DaySleep) => void,
        onNext: () => void
    ) => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border space-y-6"
        >
            <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-primary/10 text-primary rounded-xl text-2xl">
                    {icon}
                </div>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <p className="text-muted-foreground">
                Please enter your typical schedule for these days. Be as honest as possible!
            </p>

            <div className="grid gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <FaBed className="text-indigo-500" /> Bedtime
                    </label>
                    <input
                        type="time"
                        value={data.bedTime}
                        onChange={(e) => setData({ ...data, bedTime: e.target.value })}
                        className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <FaClock className="text-gray-500" /> Minutes to Fall Asleep
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="180"
                        value={data.sleepLatency}
                        onChange={(e) => setData({ ...data, sleepLatency: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <FaSun className="text-orange-500" /> Wake Up Time
                    </label>
                    <input
                        type="time"
                        value={data.wakeTime}
                        onChange={(e) => setData({ ...data, wakeTime: e.target.value })}
                        className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Do you use an alarm?</label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setData({ ...data, alarm: true })}
                            className={`flex-1 py-3 px-4 rounded-xl border transition-all ${data.alarm ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-secondary/10'}`}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setData({ ...data, alarm: false })}
                            className={`flex-1 py-3 px-4 rounded-xl border transition-all ${!data.alarm ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-secondary/10'}`}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={handleBack}
                    className="flex-1 py-4 rounded-xl border border-border font-bold text-lg hover:bg-secondary/10 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="flex-[2] py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                    Next Step <FaArrowRight />
                </button>
            </div>
        </motion.div>
    );

    if (step === 3 && result) {
        return (
            <ResultView
                resultType={result.animal}
                resultSource="mctq"
                onRetake={resetQuiz}
                scoreDetails={`Mid-Sleep Point: ${result.msfSc}`}
            />
        );
    }

    return (
        <div className="max-w-xl mx-auto w-full px-4 relative">
            {/* Global Exit Button */}
            <Link href="/chronotype" className="absolute -top-12 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors">
                <FaTimes size={20} />
            </Link>

            {/* Intro Step */}
            {step === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card rounded-3xl p-8 shadow-sm border border-border text-center space-y-6"
                >
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                        🧬
                    </div>
                    <h2 className="text-3xl font-bold">Biological Clock Test</h2>
                    <p className="text-muted-foreground text-lg">
                        This test (MCTQ) calculates your <strong>Mid-Sleep Point</strong> based on your actual sleep behavior. It's the most accurate scientific way to find your chronotype.
                    </p>
                    <div className="bg-secondary/20 p-4 rounded-xl text-sm text-left mx-auto max-w-sm">
                        <strong>You'll need to know:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                            <li>Your typical bedtime & wake time on <strong>Work Days</strong>.</li>
                            <li>Your typical bedtime & wake time on <strong>Free Days</strong>.</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => setStep(1)}
                        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
                    >
                        Start Calculation
                    </button>
                </motion.div>
            )}

            {step === 1 && renderInputStep("Global Work Days", <FaCalendarDay />, workSleep, setWorkSleep, () => setStep(2))}
            {step === 2 && renderInputStep("Free Days (Weekend)", <FaCalendarAlt />, freeSleep, setFreeSleep, handleCalculate)}
        </div>
    );
}
