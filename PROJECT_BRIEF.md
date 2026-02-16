# Web Project Brief: Sleep Lite - "The Playground"

## 1. Overview
The Web platform is the "Playground" of the Sleep Lite ecosystem. Its primary goal is **viral engagement** and **traffic acquisition** without requiring login or app installation. 
**Philosophy**: "Fun, informative, and instantly shareable."

## 2. Key Features (MVP)

### A. Sleep Chronotype Test (Priority 1)
*   **Concept**: A simple, MBTI-style personality test for sleep patterns.
*   **Types**: Bear (Solar), Wolf (Night), Lion (Early), Dolphin (Light/Insomniac).
*   **User Flow**:
    1.  User answers 5-7 simple questions (e.g., "When do you feel most energetic?").
    2.  System calculates the dominant type.
    3.  **Result Page**: Displays a cute character card with key traits and a "Share to Instagram/Story" button.

### B. Dream Interpretation AI (Priority 2)
*   **Concept**: AI-powered dream analysis for entertainment.
*   **User Flow**:
    1.  User types a short description of their dream into a text box.
    2.  User clicks "Interpret".
    3.  **Backend**: Calls Google Gemini API with a specific system prompt (e.g., "Act as a Jungian dream analyst, keep it light and fun...").
    4.  **Result**: Displays the interpretation with a disclaimer ("For entertainment purposes only").

### C. Sleep Encyclopedia (Future Phase)
*   **Concept**: A clean, searchable wiki for sleep terms.
*   **Status**: Defer to Phase 1.5.

## 3. Technology Stack
*   **Framework**: Next.js 14+ (App Router)
*   **Styling**: TailwindCSS
*   **Hosting**: Vercel (Recommended)
*   **AI Model**: Google Gemini Pro (API Key provided by user)

## 4. Implementation Details
*   **Directory**: `d:/AntigravityWorkspace/sleep/web`
*   **Environment Variables**:
    *   `GEMINI_API_KEY`: Stores the provided API key.
*   **Design Reference**:
    *   Clean, calming colors (Midnight Blue, Soft Purple, Warm Amber).
    *   Minimalist UI with plenty of whitespace.

## 5. User Constraints
*   **No Login**: The MVP must be usable without creating an account.
*   **Mobile First**: Ensure the design is perfectly responsive for mobile browsers (where most users will come from YouTube/Instagram).
