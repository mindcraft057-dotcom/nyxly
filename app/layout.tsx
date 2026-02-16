import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // Changed fonts
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyxly-phi.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Sleep Lite - The Playground for Better Rest",
  description: "Discover your chronotype, decode your dreams with AI, and explore sleep science tools by Nyxly.",
  keywords: ["sleep test", "chronotype", "dream interpretation", "AI dream decoder", "sleep science"],
  authors: [{ name: "Nyxly" }],
  openGraph: {
    title: "Sleep Lite - The Playground for Better Rest",
    description: "Discover your chronotype, decode your dreams with AI, and explore sleep science tools by Nyxly.",
    url: "https://nyxly-phi.vercel.app",
    siteName: "Sleep Lite",
    images: [
      {
        url: "/nyxly-logo.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Lite - The Playground for Better Rest",
    description: "Discover your chronotype, decode your dreams with AI, and explore sleep science tools by Nyxly.",
    images: ["/nyxly-logo.png"],
  },
  icons: {
    icon: "/nyxly-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
