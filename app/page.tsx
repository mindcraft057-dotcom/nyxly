"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FaMoon, FaReceipt, FaNewspaper, FaArrowRight } from "react-icons/fa";
import Header from "../components/Header";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05 // Faster stagger
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } } // Snappier
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-primary/30">

      <Header />

      {/* Structured Data for SEO 2026 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sleep Lite by Nyxly",
            "url": "https://sleep-lite.nyxly.art",
            "logo": "https://sleep-lite.nyxly.art/nyxly-logo.png",
            "description": "Fun, informative, and instantly shareable sleep tools including Chronotype Tests and Viral Sleep Receipts."
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a Chronotype Test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Chronotype Test helps you identify your biological rhythm—whether you are a Bear, Wolf, Lion, or Dolphin—to optimize your productivity and rest."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Sleep Receipt?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Sleep Receipt is a fun, shareable visualization of your sleep data, styled like a thermal store receipt."
                }
              }
            ]
          })
        }}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pt-32 pb-20 flex flex-col items-center">

        {/* Hero Section */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-20 space-y-6 max-w-3xl mx-auto"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-foreground"></span>
            </span>
            New: Viral Sleep Receipt
          </motion.div>

          <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Unlock Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-400 animate-gradient-x">
              Sleep Potential
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground/90 max-w-xl mx-auto leading-relaxed">
            Discover your chronotype, visualize your sleep, and master your rest with our suite of free tools.
          </motion.p>

          <motion.div variants={item} className="flex gap-4 justify-center pt-4">
            <button onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition-transform shadow-lg shadow-foreground/20 flex items-center gap-2">
              Explore Tools <FaArrowRight size={14} />
            </button>
          </motion.div>
        </motion.section>

        {/* Bento Grid */}
        <motion.section
          id="tools"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >

          {/* Chronotype Card - Large/Featured */}
          <motion.article variants={item} className="md:col-span-2 group">
            <Link href="/chronotype" className="block h-full">
              <div className="h-full glass glass-hover rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[320px] border-primary/20 bg-gradient-to-br from-primary/20 via-primary/5 to-white/95">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/25 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-primary/40"></div>

                <div className="relative z-10 w-full mb-8 flex justify-between items-start">
                  <div className="h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-primary-foreground shadow-sm">
                    <FaMoon size={28} />
                  </div>
                  <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                    Most Popular
                  </div>
                </div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-3 text-foreground whitespace-nowrap">Find Your Sleep Type</h2>
                  <p className="text-muted-foreground text-lg mb-6 max-w-md">
                    Are you a Bear, Wolf, Lion, or Dolphin? Discover your biological rhythm to supercharge your productivity.
                  </p>

                  {/* Unified Button Style */}
                  <div className="flex justify-end">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <FaArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Dream Interpreter Card */}
          <motion.article variants={item} className="md:col-span-1 group">
            <Link href="/receipt" className="block h-full">
              <div className="h-full glass glass-hover rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[320px] border-secondary/20 bg-gradient-to-br from-secondary/20 via-secondary/5 to-white/95">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/30 to-transparent transition-all group-hover:from-secondary/40"></div>

                <div className="relative z-10 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-secondary-foreground shadow-sm mb-6">
                    <FaReceipt size={28} />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-foreground whitespace-nowrap">Sleep Receipt</h2>
                  <p className="text-muted-foreground">
                    Get a viral thermal-style receipt for your last night's sleep. Shareable and fun.
                  </p>
                </div>

                <div className="relative z-10 flex justify-end">
                  <div className="h-12 w-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <FaArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Sleep News / Updates - Wide Bottom */}
          <motion.article variants={item} className="md:col-span-3 group">
            <Link href="/news" className="block h-full">
              <div className="glass glass-hover rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border-accent/20 bg-gradient-to-br from-accent/20 via-accent/5 to-white/95">
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent/40 rounded-full blur-2xl -ml-16 -mt-16"></div>

                <div className="flex-shrink-0 relative z-10">
                  <div className="h-20 w-20 rounded-3xl bg-white/90 backdrop-blur-md flex items-center justify-center text-accent-foreground shadow-sm rot-3 group-hover:rotate-0 transition-transform duration-300">
                    <FaNewspaper size={40} />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                  <h2 className="text-2xl font-bold mb-2 text-foreground whitespace-nowrap">The Sleep News</h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Deep dives into the latest sleep science, channel updates, and detailed breakdowns of our YouTube content.
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <FaArrowRight size={16} />
                  </div>
                </div>

              </div>
            </Link>
          </motion.article>

        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 text-center text-sm text-muted-foreground/60 border-t border-border/40">
        <p>© {new Date().getFullYear()} Sleep Lite by Nyxly. Sweet dreams.</p>
      </footer>
    </div>
  );
}
