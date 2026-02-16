"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaTimes } from "react-icons/fa";
import { meqQuestions } from "@/lib/chronotype-data";
import { calculateMEQScore } from "@/lib/chronotype-scoring";
import ResultView from "./ResultView";
import Link from "next/link";

export default function MEQQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<{ score: number; type: string; animal: string } | null>(null);

    const handleAnswer = (value: string) => {
        // Save answer
        const newAnswers = { ...answers, [meqQuestions[currentQuestionIndex].id]: value };
        setAnswers(newAnswers);

        // Delay slightly for better UX
        setTimeout(() => {
            if (currentQuestionIndex < meqQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                const res = calculateMEQScore(newAnswers);
                setResult(res);
            }
        }, 250);
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setResult(null);
    };

    if (result) {
        return (
            <ResultView
                resultType={result.animal}
                resultSource="meq"
                onRetake={resetQuiz}
                scoreDetails={`MEQ Score: ${result.score}`}
                scoreSubtitle={result.type}
            />
        );
    }

    const question = meqQuestions[currentQuestionIndex];

    return (
        <div className="max-w-xl mx-auto w-full px-4 relative">
            {/* Navigation Buttons */}
            <div className="absolute -top-12 flex w-full justify-between items-center px-1 left-0">
                {currentQuestionIndex > 0 ? (
                    <button onClick={handleBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                        ← Back
                    </button>
                ) : (
                    <div></div> // Spacer
                )}

                <Link href="/chronotype" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <FaTimes size={20} />
                </Link>
            </div>

            {/* Header / Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                    <span>Question {currentQuestionIndex + 1} of {meqQuestions.length}</span>
                    <span>Scientific Standard</span>
                </div>
                <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / meqQuestions.length) * 100}%` }}
                    />
                </div>
            </div>

            <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border"
            >
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground leading-snug">
                    {question.text}
                </h2>

                <div className="space-y-3">
                    {question.options.map((option, index) => {
                        const isSelected = answers[question.id] === option.value;
                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.value)}
                                className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center group
                  ${isSelected
                                        ? "bg-primary/10 border-primary text-primary"
                                        : "border-border hover:bg-secondary/10 hover:border-secondary"
                                    }`}
                            >
                                <span className="font-medium">{option.label}</span>
                                {isSelected ? (
                                    <FaCheck />
                                ) : (
                                    <FaArrowRight className="opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
