"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Sparkles,
  Terminal,
  Code2,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Zap,
} from "lucide-react";

const GALLERY_IMAGES = [
  {
    src: "/images/1.jpg",
    title: "Personal Portrait",
  },
  {
    src: "/images/2.jpg",
    title: "Creative Workspace",
  },
  {
    src: "/images/3.jpg",
    title: "Design & Development",
  },
  {
    src: "/images/4.jpg",
    title: "Minimalist Setup",
  },
];

export default function AboutMe() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Auto-slide timer (4 Detik)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = GALLERY_IMAGES[index];

  const handleNext = () =>
    setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const handlePrev = () =>
    setIndex(
      (prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );

  const handleCopyLocation = () => {
    navigator.clipboard.writeText("Cirebon, Indonesia");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      className="w-full bg-zinc-950 border-b-4 border-zinc-800 select-none py-16 md:py-24 relative overflow-hidden"
    >
      {/* Subtle Background Pattern Accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-12 border-b-4 border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-han-green" />
              <span className="font-pixel text-[10px] text-han-green uppercase tracking-widest font-bold">
                SYSTEM_INFO // SECTION_02
              </span>
            </div>
            <h2 className="font-retro text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Tentang Saya
            </h2>
          </div>

          <div className="inline-flex items-center gap-2.5 font-pixel text-[9px] text-zinc-300 bg-zinc-900 px-3.5 py-2 border-2 border-zinc-800 shadow-[3px_3px_0px_0px_#000]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-han-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-han-green" />
            </span>
            <span className="uppercase font-bold tracking-wider">
              STATUS: AVAILABLE FOR FREELANCE & FULLTIME
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* ─── MAIN BIO CARD (TERMINAL STYLE) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 bg-zinc-900 border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between overflow-hidden relative group"
          >
            {/* Window Top Bar */}
            <div className="bg-zinc-950 px-4 py-3 border-b-4 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-han-green" />
                <span className="font-pixel text-[10px] text-zinc-300 uppercase tracking-widest font-bold">
                  BIO_DATA.TXT
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-zinc-600 hidden sm:inline">
                  UTF-8 // READ_ONLY
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 border border-black bg-zinc-700" />
                  <div className="w-2.5 h-2.5 border border-black bg-zinc-700" />
                  <div className="w-2.5 h-2.5 border border-black bg-han-green" />
                </div>
              </div>
            </div>

            {/* Window Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                {/* Profile Title Banner */}
                <div className="flex items-center gap-4 bg-zinc-950 p-3 sm:p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                  <div className="w-12 h-12 bg-han-green border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    <User className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-retro text-2xl sm:text-3xl text-white uppercase tracking-wide leading-none">
                      Muhammad A'iz Nur Aziz
                    </h3>
                    <p className="font-pixel text-[9.5px] text-han-green uppercase tracking-wider font-bold mt-1">
                      Software Engineer & UX Specialist
                    </p>
                  </div>
                </div>

                {/* Main Paragraph Description */}
                <div className="space-y-3 font-sans text-sm sm:text-base text-zinc-300 leading-relaxed pl-1">
                  <p>
                    Halo! Saya seorang{" "}
                    <strong className="text-white bg-zinc-800 px-1">
                      Software Engineer
                    </strong>{" "}
                    yang berfokus membangun aplikasi web berkinerja tinggi,
                    berarsitektur bersih, dan memikat secara visual.
                  </p>
                  <p>
                    Bagi saya, kode bukan sekadar baris instruksi logika biasa,
                    melainkan{" "}
                    <span className="text-han-green font-mono font-semibold">
                      media eksekusi pengalaman pengguna (UX)
                    </span>{" "}
                    yang solutif, presisi, dan terukur secara bisnis.
                  </p>
                </div>
              </div>

              {/* Quick Interactive Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t-2 border-dashed border-zinc-800">
                {/* Location Chip with Copy Action */}
                <button
                  onClick={handleCopyLocation}
                  className="bg-zinc-950 p-3 border-2 border-black flex items-center justify-between gap-3 text-left hover:border-han-green transition-colors group/loc shadow-[3px_3px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 group-hover/loc:border-han-green">
                      <MapPin className="w-4 h-4 text-han-green" />
                    </div>
                    <div>
                      <p className="font-pixel text-[7.5px] text-zinc-500 uppercase tracking-wider">
                        Domisili
                      </p>
                      <p className="font-pixel text-[9.5px] text-white font-bold">
                        Cirebon, Indonesia
                      </p>
                    </div>
                  </div>
                  <div className="text-zinc-500 group-hover/loc:text-white transition-colors pr-1">
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-han-green" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {/* Core Focus Chip */}
                <div className="bg-zinc-950 p-3 border-2 border-black flex items-center gap-3 shadow-[3px_3px_0px_0px_#000]">
                  <div className="p-1.5 bg-zinc-900 border border-zinc-800">
                    <Code2 className="w-4 h-4 text-han-green" />
                  </div>
                  <div>
                    <p className="font-pixel text-[7.5px] text-zinc-500 uppercase tracking-wider">
                      Fokus Utama
                    </p>
                    <p className="font-pixel text-[9.5px] text-white font-bold">
                      Frontend & Web Architecture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── INTERACTIVE PHOTO FRAME (GLITCH & SCANLINE EFFECT) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-zinc-900 border-4 border-black p-4 sm:p-5 shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between gap-4 relative"
          >
            {/* Gallery Top Label */}
            <div className="flex items-center justify-between border-b-4 border-black pb-3">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-han-green fill-han-green" />
                <span className="font-pixel text-[9px] text-zinc-200 uppercase tracking-widest font-bold">
                  VISUAL_SNAPSHOTS
                </span>
              </div>
              <span className="font-pixel text-[9px] text-black bg-han-green px-2 py-0.5 border border-black font-bold">
                0{index + 1} / 0{GALLERY_IMAGES.length}
              </span>
            </div>

            {/* Photo Viewport with CRT Overlay */}
            <div className="relative w-full aspect-square bg-black border-2 border-black overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.08, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(2px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={current.src}
                    alt={current.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay CRT Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-zinc-950/90 border-t-2 border-black p-3 backdrop-blur-md z-20 flex items-center justify-between">
                <div>
                  <p className="font-pixel text-[7px] text-han-green uppercase tracking-widest">
                    {current.subtitle}
                  </p>
                  <p className="font-pixel text-[10px] text-white uppercase tracking-wider font-bold truncate">
                    {current.title}
                  </p>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-han-green shrink-0" />
              </div>

              {/* Manual Touch/Click Navigation Overlay Controls */}
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between z-30 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="pointer-events-auto w-8 h-8 bg-zinc-950 text-white border-2 border-black flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-han-green hover:text-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0 active:translate-y-0"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="pointer-events-auto w-8 h-8 bg-zinc-950 text-white border-2 border-black flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-han-green hover:text-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0 active:translate-y-0"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Progress Bar & Dots */}
            <div className="space-y-2 pt-1">
              <div className="w-full bg-zinc-950 border border-zinc-800 h-1.5 overflow-hidden">
                <motion.div
                  key={index}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="h-full bg-han-green"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-1.5">
                  {GALLERY_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 transition-all ${
                        i === index
                          ? "w-6 bg-han-green border border-black shadow-[1px_1px_0px_0px_#000]"
                          : "w-2.5 bg-zinc-800 hover:bg-zinc-600 border border-black"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="font-pixel text-[7.5px] text-zinc-500 uppercase tracking-widest font-bold">
                  AUTO_ROTATE: ON
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
