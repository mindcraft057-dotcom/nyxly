import MEQQuiz from "@/components/MEQQuiz";

export default function MEQTestPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12">
            <div className="text-center mb-8 max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-foreground mb-2">Scientific Chronotype Test</h1>
                <p className="text-muted-foreground">The Morningness-Eveningness Questionnaire (MEQ) is the psychological gold standard for determining your circadian preference.</p>
            </div>
            <MEQQuiz />
        </div>
    );
}
