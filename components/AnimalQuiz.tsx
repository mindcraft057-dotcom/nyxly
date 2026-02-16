"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { animalQuestions } from "@/lib/chronotype-data";
import { calculateAnimalScore } from "@/lib/chronotype-scoring";
import ResultView from "./ResultView";
import Link from "next/link";

export default function AnimalQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestionIndex < animalQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const winner = calculateAnimalScore(newAnswers);
            setResult(winner);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            // Optional: Remove last answer if you want strict stack behavior, 
            // but keeping it allows re-answering without losing data if we used an object.
            // Since we used an array `answers`, we should pop the last one to keep sync.
            setAnswers(answers.slice(0, -1));
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setResult(null);
    };

    if (result) {
        return <ResultView resultType={result} resultSource="animal" onRetake={resetQuiz} />;
    }

    const question = animalQuestions[currentQuestionIndex];

    return (
        <div className="max-w-md mx-auto w-full relative">
            {/* Navigation Buttons */}
            <div className="absolute -top-12 flex w-full justify-between items-center px-1">
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

            {/* Progress Bar */}
            <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden bg-secondary/20">
                <motion.div
                    className="h-full bg-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / animalQuestions.length) * 100}%` }}
                />
            </div>

            <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card rounded-3xl p-8 shadow-sm border border-border"
            >
                <h2 className="text-xl font-bold mb-6 text-foreground">
                    <span className="text-muted-foreground mr-2">{currentQuestionIndex + 1}.</span>
                    {question.text}
                </h2>

                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option.value)}
                            className="w-full text-left p-4 rounded-xl border border-border hover:bg-secondary/10 hover:border-secondary transition-all flex justify-between items-center group"
                        >
                            <span>{option.label}</span>
                            <FaArrowRight className="opacity-0 group-hover:opacity-100 text-secondary transition-opacity" />
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
