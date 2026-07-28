"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { Terminal, Cpu } from "lucide-react";

const STAGES = [
  { threshold: 0, text: "INITIALIZING CORE KERNEL..." },
  { threshold: 25, text: "LOADING VIRTUAL DOM & MODULES..." },
  { threshold: 55, text: "FETCHING DAEMONIUM ASSETS..." },
  { threshold: 85, text: "COMPILING BRUTALIST UI ENGINES..." },
  { threshold: 100, text: "SYSTEM READY. ACCESS GRANTED." },
];

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(STAGES[0].text);
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);

  // Simpan callback terbaru ke ref tanpa memicu re-render
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Safe completion handler — dipanggil SEKALI saja
  const triggerComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    if (onCompleteRef.current) onCompleteRef.current();
  }, []);

  useEffect(() => {
    let timeoutId;
    let fallbackTimer;
    let isDone = false;

    // Safety fallback: force complete jika interval macet (max 5 detik)
    fallbackTimer = setTimeout(() => {
      if (isDone) return;
      isDone = true;
      setProgress(100);
      setStatusText(STAGES[STAGES.length - 1].text);
      timeoutId = setTimeout(triggerComplete, 300);
    }, 5000);

    const intervalId = setInterval(() => {
      if (isDone) return;

      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          clearTimeout(fallbackTimer);
          isDone = true;
          // Trigger callback setelah animasi selesai sempurna
          timeoutId = setTimeout(triggerComplete, 300);
          return 100;
        }

        const nextProgress = prev + Math.floor(Math.random() * 12) + 6;
        const boundedProgress = Math.min(nextProgress, 100);

        // Update status text berdasarkan threshold
        const currentStage = STAGES.slice()
          .reverse()
          .find((s) => boundedProgress >= s.threshold);
        if (currentStage) {
          setStatusText(currentStage.text);
        }

        return boundedProgress;
      });
    }, 70);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [triggerComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.97,
        transition: { duration: 0.4, ease: [0.85, 0, 0.15, 1] },
      }}
      className="fixed inset-0 bg-zinc-950 z-[9999] flex flex-col items-center justify-center p-4 select-none font-mono text-white"
    >
      {/* Background CRT Scanlines Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-10" />

      {/* Main Terminal Frame */}
      <div className="w-full max-w-lg bg-zinc-900 border-4 border-black shadow-[12px_12px_0px_0px_#000] relative z-20 overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="bg-zinc-950 px-4 py-2.5 border-b-4 border-black flex items-center justify-between font-pixel text-[9px]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-han-green" />
            <span className="text-zinc-200 uppercase font-bold tracking-widest">
              BOOT_SEQUENCE.EXE
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500 font-bold">
            <Cpu className="w-3.5 h-3.5 text-han-green animate-spin" />
            <span>SYS_OK</span>
          </div>
        </div>

        {/* Inner Loader Body */}
        <div className="p-6 space-y-6">
          {/* Logo & Version */}
          <div className="flex items-baseline justify-between border-b-2 border-dashed border-zinc-800 pb-4">
            <div className="flex items-baseline gap-2">
              <h1 className="font-retro text-4xl font-black tracking-tighter uppercase text-white">
                AZZ<span className="text-han-green">.</span>
              </h1>
              <span className="font-pixel text-[8px] bg-zinc-950 text-han-green px-2 py-0.5 border border-black font-bold">
                PROD_v2.4
              </span>
            </div>
            <span className="font-pixel text-[8px] text-zinc-500 uppercase tracking-widest font-bold">
              [ 64-BIT ARCH ]
            </span>
          </div>

          {/* Status Text Terminal */}
          <div className="space-y-1.5 bg-zinc-950 p-3 border-2 border-black">
            <div className="flex items-center justify-between font-pixel text-[8px]">
              <span className="text-han-green font-bold">
                // EXECUTION LOG:
              </span>
              <span className="text-zinc-500 animate-pulse">RUNNING</span>
            </div>
            <p className="font-pixel text-[9.5px] text-zinc-200 uppercase tracking-wider font-bold min-h-[18px]">
              &gt; {statusText}
            </p>
          </div>

          {/* Hard Brutalist Progress Bar Container */}
          <div className="space-y-2">
            <div className="w-full bg-zinc-950 border-4 border-black p-1 shadow-[4px_4px_0px_0px_#000]">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
                className="h-5 bg-han-green border-2 border-black relative overflow-hidden"
              >
                {/* Visual Stripe Accent */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.15)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.15)_75%,transparent_75%,transparent)] bg-[length:16px_16px]" />
              </motion.div>
            </div>

            {/* Metrics Below Progress Bar */}
            <div className="flex justify-between items-center font-pixel text-[9px] uppercase tracking-wider pt-1">
              <span className="text-zinc-400 font-bold">
                PROGRESS: <span className="text-white">{progress}/100</span>
              </span>
              <span className="text-han-green font-extrabold text-sm">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

