import AnimalQuiz from "@/components/AnimalQuiz";

export default function AnimalTestPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Sleep Personality Test</h1>
                <p className="text-muted-foreground">Discover your inner sleep animal in 3 minutes.</p>
            </div>
            <AnimalQuiz />
        </div>
    );
}
