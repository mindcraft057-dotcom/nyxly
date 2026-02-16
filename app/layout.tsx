import { Inter, Poppins, Space_Mono } from "next/font/google";
import Script from "next/script";
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

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyxly-phi.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Sleep Lite - The Playground for Better Rest",
  description: "Discover your chronotype, create viral sleep receipts, and explore sleep science tools by Nyxly.",
  keywords: ["sleep test", "chronotype", "sleep receipt", "sleep tracking", "sleep science"],
  authors: [{ name: "Nyxly" }],
  openGraph: {
    title: "Sleep Lite - The Playground for Better Rest",
    description: "Discover your chronotype, create viral sleep receipts, and explore sleep science tools by Nyxly.",
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
      <head>
        <meta name="google-adsense-account" content="ca-pub-2738076558223971" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2738076558223971"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${spaceMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
