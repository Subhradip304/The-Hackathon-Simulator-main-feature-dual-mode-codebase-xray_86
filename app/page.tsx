"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Rocket, Terminal } from "lucide-react";
import { useGameStore } from "@/store/gameStore";

export default function LandingPage() {
  const router = useRouter();
  const resetGame = useGameStore((state) => state.resetGame);
  const setGameMode = useGameStore((state) => state.setGameMode);
  const setDifficulty = useGameStore((state) => state.setDifficulty);

  const startClassicSimulation = () => {
    resetGame();
    setGameMode("classic");
    setDifficulty("medium");
    useGameStore.setState({ isGameStarted: true });
    router.push("/game");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#fafaf8] font-mono text-xs text-neutral-900">
      <div className="pointer-events-none absolute inset-0 z-0 grid-pattern opacity-[0.35]" />

      <nav className="relative z-10 flex items-center justify-between border-b border-neutral-200 bg-[#fafaf8]/70 px-6 py-4 backdrop-blur-sm md:px-12">
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-80">
          <span className="rounded border border-neutral-200 bg-neutral-100 p-2 text-neutral-800 transition-colors group-hover:border-neutral-300">
            <Terminal aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="font-sans text-sm font-bold tracking-tight">
            THE HACKATHON <span className="font-normal text-neutral-500">SIMULATOR</span>
          </span>
        </Link>
        <span className="text-[10px] font-bold tracking-wider text-neutral-400">V2.4.0</span>
      </nav>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-12 sm:px-8 sm:py-16">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto mb-10 max-w-2xl space-y-4 text-center sm:mb-12"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            Build, evaluate, and improve
          </p>
          <h1 className="font-sans text-3xl font-black uppercase tracking-tight sm:text-5xl">
            Choose Your Mode
          </h1>
          <p className="font-sans text-sm font-light leading-relaxed text-neutral-600 sm:text-base">
            Choose how you want to build or evaluate your hackathon project.
          </p>
        </motion.header>

        <section aria-label="Choose a mode" className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <motion.button
            type="button"
            onClick={startClassicSimulation}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.18 }}
            className="group flex min-h-[300px] w-full flex-col rounded-lg border-2 border-neutral-800 bg-white p-6 text-left shadow-[4px_4px_0px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 sm:p-8"
          >
            <span className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
              <Rocket aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] text-neutral-400">MODE 01</span>
            <span className="mt-2 font-sans text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl">
              Classic Hackathon Simulation
            </span>
            <span className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed text-neutral-600">
              Generate a challenge, build your team, choose technologies, prioritize features, get teammate and mentor guidance, and pitch to AI judges—all at your own pace.
            </span>
            <span className="mt-auto flex items-center gap-2 pt-8 text-[10px] font-bold uppercase tracking-wider text-neutral-900">
              Start simulation
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => {
              router.push("/xray");
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.18 }}
            className="group flex min-h-[300px] w-full flex-col rounded-lg border-2 border-neutral-300 bg-white p-6 text-left shadow-[4px_4px_0px_rgba(0,0,0,0.04)] transition-all hover:border-neutral-800 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 sm:p-8"
          >
            <span className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
              <Code2 aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] text-neutral-400">MODE 02</span>
            <span className="mt-2 font-sans text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl">
              Codebase X-Ray
            </span>
            <span className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed text-neutral-600">
              Prepare to inspect an existing project’s source code, architecture, technologies, weaknesses, and opportunities to improve.
            </span>
            <span className="mt-auto flex items-center gap-2 pt-8 text-[10px] font-bold uppercase tracking-wider text-neutral-900">
              Open X-Ray workspace
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        </section>
      </main>

      <footer className="relative z-10 border-t border-neutral-200 px-6 py-4 text-center text-[9px] font-bold uppercase tracking-wider text-neutral-400">
        Choose a mode to continue
      </footer>
    </div>
  );
}
