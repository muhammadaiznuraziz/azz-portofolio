/**
 * KOMPONEN: Hero (All-in-One Self-Contained Version)
 * DESKRIPSI: Menggabungkan komponen Shuffle langsung di dalam Hero.jsx untuk mengeliminasi error missing module.
 */

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Mail, Download, FolderOpen, ArrowDown } from "lucide-react";
import Image from "next/image";

// ==========================================
// INTERNAL SHUFFLE COMPONENT (Self-Contained)
// ==========================================
function Shuffle({ text = "", tag = "h1", className = "" }) {
  const Component = tag;
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let timeout;
    let iteration = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const triggerShuffle = () => {
      clearInterval(timeout);
      timeout = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          clearInterval(timeout);
        }
        iteration += 1 / 3;
      }, 30);
    };

    triggerShuffle();

    return () => clearInterval(timeout);
  }, [text]);

  return <Component className={className}>{displayText}</Component>;
}

// ==========================================
// MAIN HERO COMPONENT
// ==========================================
export default function Hero() {
  const containerRef = useRef(null);

  const isDraggingRef = useRef(false);
  const dragCooldownRef = useRef(null);

  const anchorX = 60;
  const anchorY = 0;

  const originX = 5;
  const originY = 35;

  const rawX = useMotionValue(originX);
  const rawY = useMotionValue(originY);

  const xVelocity = useVelocity(rawX);

  const [springConfig, setSpringConfig] = useState({
    stiffness: 100,
    damping: 12,
    mass: 0.8,
  });

  const cardX = useSpring(rawX, springConfig);
  const cardY = useSpring(rawY, springConfig);

  const cardRotate = useTransform(cardX, [-40, 180], [-18, 18]);
  const cardSwingInertia = useTransform(xVelocity, [-1000, 1000], [-8, 8]);

  const [ropeCurve, setRopeCurve] = useState({
    cx1: 35,
    cy1: 25,
    cx2: 45,
    cy2: 25,
    x: 60,
    y: 35,
    angle: 0,
  });

  const updateRope = useCallback((currentX, currentY, draggingState) => {
    const targetX = currentX + 80;
    const targetY = currentY + 12;

    const dist = Math.hypot(targetX - anchorX, targetY - anchorY);
    const angleRad = Math.atan2(targetY - anchorY, targetX - anchorX);
    const angleDeg = (angleRad * 180) / Math.PI - 90;

    const deltaY = targetY - anchorY;
    const sag = draggingState
      ? Math.max(0, 15 - dist * 0.02)
      : Math.max(8, 20 - deltaY * 0.03);

    const midX = (anchorX + targetX) / 2;
    const midY = (anchorY + targetY) / 2 + sag;

    setRopeCurve({
      cx1: midX - 6,
      cy1: midY,
      cx2: midX + 6,
      cy2: midY,
      x: targetX,
      y: targetY,
      angle: angleDeg,
    });
  }, []);

  useEffect(() => {
    const unsubscribeX = cardX.on("change", (latestX) => {
      updateRope(latestX, cardY.get(), isDraggingRef.current);
    });
    const unsubscribeY = cardY.on("change", (latestY) => {
      updateRope(cardX.get(), latestY, isDraggingRef.current);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cardX, cardY, updateRope]);

  const handleMouseMove = (e) => {
    if (isDraggingRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const offsetX = (mouseX - rect.width / 4) * 0.01;
    const offsetY = (mouseY - rect.height / 4) * 0.01;

    rawX.set(originX + offsetX);
    rawY.set(originY + offsetY);
  };

  const handleDragStart = () => {
    if (dragCooldownRef.current) clearTimeout(dragCooldownRef.current);
    isDraggingRef.current = true;
    setSpringConfig({ stiffness: 500, damping: 30, mass: 0.3 });
  };

  const handleDragEnd = () => {
    setSpringConfig({ stiffness: 220, damping: 8, mass: 1 });

    rawX.set(originX);
    rawY.set(originY);

    dragCooldownRef.current = setTimeout(() => {
      isDraggingRef.current = false;
    }, 600);
  };

  const stickerEntryVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 py-12 bg-zinc-900 border-b-4 border-zinc-800 overflow-hidden select-none"
    >
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-color-dodge bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent pointer-events-none" />

      {/* LANYARD & KARTU ID CONTAINER */}
      <div className="absolute top-0 left-1 sm:left-4 md:left-6 lg:left-10 w-[200px] sm:w-[220px] lg:w-[270px] h-[340px] pointer-events-none z-40 block origin-top-left transform scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform duration-300">
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <linearGradient
              id="lanyardRibbon"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="30%" stopColor="#15803d" />
              <stop offset="70%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>

          <path
            d={`M ${anchorX - 3} ${anchorY} Q ${ropeCurve.cx1} ${ropeCurve.cy1} ${ropeCurve.x - 5} ${ropeCurve.y}`}
            fill="none"
            stroke="url(#lanyardRibbon)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={`M ${anchorX + 3} ${anchorY} Q ${ropeCurve.cx2} ${ropeCurve.cy2} ${ropeCurve.x + 5} ${ropeCurve.y}`}
            fill="none"
            stroke="url(#lanyardRibbon)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={`M ${anchorX} ${anchorY} Q ${(ropeCurve.cx1 + ropeCurve.cx2) / 2} ${(ropeCurve.cy1 + ropeCurve.cy2) / 2} ${ropeCurve.x} ${ropeCurve.y}`}
            fill="none"
            stroke="#4ade80"
            strokeWidth="2"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
          <circle
            cx={anchorX}
            cy={anchorY + 2}
            r="6"
            fill="#18181b"
            stroke="#22c55e"
            strokeWidth="2.5"
          />
        </svg>

        <motion.div
          style={{
            x: ropeCurve.x - 12,
            y: ropeCurve.y - 12,
            rotate: ropeCurve.angle,
          }}
          className="absolute top-0 left-0 z-45 pointer-events-none flex flex-col items-center"
        >
          <div className="w-6 h-3 bg-zinc-800 border-2 border-black rounded-xs flex justify-center items-center shadow-md">
            <div className="w-2 h-0.5 bg-black rounded-xs" />
          </div>
          <div className="w-3.5 h-3.5 border-2 border-zinc-300 rounded-full bg-zinc-400 shadow-sm -mt-0.5" />
          <div className="w-4 h-2.5 bg-zinc-400 border border-black rounded-xs -mt-1 shadow-md" />
        </motion.div>

        {/* KARTU ID UTAMA */}
        <motion.div
          style={{
            x: cardX,
            y: cardY,
            rotate: cardRotate,
            skewX: cardSwingInertia,
          }}
          drag
          dragSnapToOrigin
          dragConstraints={{ left: -15, right: 60, top: -10, bottom: 100 }}
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="absolute top-0 left-0 z-50 cursor-grab active:cursor-grabbing pointer-events-auto touch-pan-y"
        >
          <div className="relative mt-[12px] overflow-hidden rounded-[18px] border-[2.5px] border-black bg-gradient-to-b from-zinc-900 via-zinc-950 to-black shadow-[6px_6px_0px_0px_#000] w-[164px]">
            <div className="absolute left-1/2 top-2 h-2.5 w-7 -translate-x-1/2 rounded-full bg-black border border-zinc-800 flex justify-center items-center z-20 shadow-inner">
              <div className="w-3 h-0.5 bg-zinc-600 rounded-full" />
            </div>

            <div className="w-full h-8 bg-gradient-to-r from-emerald-600 via-han-green to-lime-400 border-b-2 border-black flex items-center justify-between px-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
            </div>

            <div className="p-3 pt-2.5 flex flex-col items-center">
              <div className="relative w-full h-32 rounded-xl border-2 border-black bg-zinc-900 overflow-hidden shadow-[2px_2px_0px_0px_#000] mb-2.5 group">
                <Image
                  src="/images/3.jpg"
                  alt="Muhammad A'iz Nur Aziz"
                  fill
                  priority
                  sizes="164px"
                  className="object-cover object-top filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 bg-zinc-950/90 border border-zinc-800 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-han-green animate-pulse" />
                  <span className="text-[5px] font-mono text-zinc-300 uppercase">
                    LVL 99
                  </span>
                </div>
              </div>

              <div className="w-full text-center space-y-1 mb-2.5">
                <h2 className="text-[12px] font-retro uppercase tracking-tight text-white leading-none drop-shadow-sm">
                  MUHAMMAD A&apos;IZ
                </h2>
                <div className="inline-block bg-han-green/20 border border-han-green/60 px-2 py-0.5 rounded-sm text-[6.5px] font-pixel text-han-green uppercase font-bold tracking-wide shadow-xs">
                  FULLSTACK ENG
                </div>
              </div>

              <div className="w-full mt-0.5 flex flex-col gap-1 pt-1.5 border-t border-dashed border-zinc-800">
                <div className="flex items-center justify-between opacity-75">
                  <div className="flex items-center gap-[1.5px] h-3">
                    <div className="w-[1px] h-full bg-white" />
                    <div className="w-[3px] h-full bg-white" />
                    <div className="w-[1px] h-full bg-white" />
                    <div className="w-[2px] h-full bg-white" />
                  </div>
                  <span className="font-pixel text-[5.5px] uppercase text-han-green font-bold">
                    SECURE ID
                  </span>
                </div>
                <div className="text-[5px] font-mono text-zinc-500 text-center tracking-tighter uppercase">
                  PULL & SWING INTERACTIVE
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Stickers Decor */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stickerEntryVariants}
        className="absolute top-16 right-[8%] z-30 hidden lg:block"
      >
        <div className="bg-han-green text-black px-3.5 py-1 rounded-full border-2 border-black font-retro text-lg font-bold tracking-wider shadow-[3px_3px_0px_0px_#000]">
          ME
        </div>
      </motion.div>

      {/* KONTEN UTAMA HERO */}
      <div className="z-20 text-center select-none max-w-3xl lg:max-w-4xl flex flex-col items-center gap-3.5 mt-2">
        <div className="inline-flex items-center gap-2 bg-han-green/10 border border-han-green/30 px-3.5 py-1 rounded-full">
          <span className="w-2 h-2 bg-han-green rounded-full animate-pulse" />
          <span className="font-pixel text-[8px] md:text-[9px] text-han-green uppercase tracking-widest font-bold">
            Available for Work
          </span>
        </div>

        <div className="w-full flex justify-center px-2">
          <Shuffle
            text="MUHAMMAD A'IZ NUR AZIZ"
            tag="h1"
            className="font-retro text-[7vw] md:text-[4.8vw] lg:text-[4.2vw] leading-[1.1] text-white tracking-tight drop-shadow-[5px_5px_0px_#121212] uppercase font-black"
          />
        </div>

        <div className="space-y-1.5">
          <p className="font-pixel text-[10px] md:text-xs text-han-green uppercase tracking-widest font-bold">
            Fullstack Developer | Frontend Specialist
          </p>
          <p className="font-sans text-xs md:text-sm text-zinc-400 max-w-md md:max-w-lg leading-relaxed mx-auto px-4">
            Membangun sistem web performa tinggi, interaktif, dan berarsitektur
            bersih. Berfokus pada konversi, logika solid, dan performa level
            produksi.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <a
            href="#projects"
            className="group flex items-center gap-2 bg-han-green text-black border-2 border-black px-5 py-2.5 font-pixel text-[9px] md:text-[10px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all active:translate-x-0 active:translate-y-0"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            Lihat Project
          </a>

          <a
            href="#contact"
            className="group flex items-center gap-2 bg-transparent text-white border-2 border-white px-5 py-2.5 font-pixel text-[9px] md:text-[10px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] hover:bg-white hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            Hubungi Saya
          </a>

          <a
            href="/cv/aiz.pdf"
            download
            className="group flex items-center gap-2 bg-han-yellow text-black border-2 border-black px-5 py-2.5 font-pixel text-[9px] md:text-[10px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Download CV
          </a>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1 opacity-50">
          <span className="font-pixel text-[8px] text-zinc-500 uppercase tracking-widest font-bold">
            Scroll Down
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-zinc-500 animate-bounce" />
        </div>
      </div>
    </header>
  );
}
