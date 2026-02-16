import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const { dream } = await req.json();
        if (!dream) {
            return NextResponse.json({ error: "Dream description required" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Act as a friendly, slightly mystical dream interpreter. Analyze the following dream in a fun and insightful way. Focus on symbols and emotions. Keep the tone lighthearted but meaningful. Keep it under 200 words.

Dream: "${dream}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ interpretation: text });
    } catch (error) {
        console.error("Dream interpretation error:", error);
        return NextResponse.json({ error: "Failed to interpret dream. Please try again." }, { status: 500 });
    }
}
