/**
 * KOMPONEN: Hero
 * DESKRIPSI: Hero Section dengan Interactive Lanyard Physics yang Tampil di SEMUA PERANGKAT (Mobile, Tablet, Desktop).
 */

"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Mail, Download, FolderOpen, ArrowDown, Home } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef(null);

  const isDraggingRef = useRef(false);
  const dragCooldownRef = useRef(null);

  // ─── COORDINATES & ANCHOR (POJOK KIRI ATAS AMAN DI SEMUA LAYAR) ───
  const anchorX = 55;
  const anchorY = 0;

  const originX = 5;
  const originY = 30;

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

  const [isDragging, setIsDragging] = useState(false);
  const [ropeCurve, setRopeCurve] = useState({
    cx: 30,
    cy: 15,
    x: 55,
    y: 30,
    angle: 0,
    tensionWidth: 7,
  });

  useEffect(() => {
    const unsubscribeX = cardX.on("change", (latestX) => {
      updateRope(latestX, cardY.get());
    });
    const unsubscribeY = cardY.on("change", (latestY) => {
      updateRope(cardX.get(), latestY);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cardX, cardY]);

  const updateRope = (currentX, currentY) => {
    const targetX = currentX + 70;
    const targetY = currentY + 10;

    const dist = Math.hypot(targetX - anchorX, targetY - anchorY);
    const tensionWidth = Math.max(6, 7.5 - dist * 0.008);

    const angleRad = Math.atan2(targetY - anchorY, targetX - anchorX);
    const angleDeg = (angleRad * 180) / Math.PI - 90;

    const midX = (anchorX + targetX) / 2;
    const deltaY = targetY - anchorY;

    const sag = isDragging
      ? Math.max(-2, 3 - dist * 0.03)
      : Math.max(2, 7 - deltaY * 0.04);

    const midY = (anchorY + targetY) / 2 + sag;

    setRopeCurve({
      cx: midX,
      cy: midY,
      x: targetX,
      y: targetY,
      angle: angleDeg,
      tensionWidth,
    });
  };

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
    setIsDragging(true);
    setSpringConfig({ stiffness: 500, damping: 30, mass: 0.3 });
  };

  const handleDragEnd = () => {
    setSpringConfig({ stiffness: 220, damping: 8, mass: 1 });

    rawX.set(originX);
    rawY.set(originY);

    setIsDragging(false);

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
      {/* Latar Belakang Vinyl */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-color-dodge bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent pointer-events-none" />

      {/* 
        LANYARD CONTAINER UTAMA (MUNCUL DI SEMUA PERANGKAT):
        1. scale-[0.55] di HP paling kecil, bertahap membesar hingga scale-100 di Desktop.
        2. origin-top-left mengunci posisi gantung tetap di sudut kiri atas navbar.
      */}
      <div className="absolute top-0 left-1 sm:left-4 md:left-6 lg:left-10 w-[180px] sm:w-[200px] lg:w-[240px] h-[300px] pointer-events-none z-40 block origin-top-left transform scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform duration-300">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d={`M ${anchorX} ${anchorY} Q ${ropeCurve.cx} ${ropeCurve.cy} ${ropeCurve.x} ${ropeCurve.y}`}
            fill="none"
            stroke="black"
            strokeWidth={ropeCurve.tensionWidth + 3}
            strokeLinecap="round"
          />
          <path
            d={`M ${anchorX} ${anchorY} Q ${ropeCurve.cx} ${ropeCurve.cy} ${ropeCurve.x} ${ropeCurve.y}`}
            fill="none"
            stroke="#16a34a"
            strokeWidth={ropeCurve.tensionWidth}
            strokeLinecap="round"
          />
          <path
            d={`M ${anchorX} ${anchorY} Q ${ropeCurve.cx} ${ropeCurve.cy} ${ropeCurve.x} ${ropeCurve.y}`}
            fill="none"
            stroke="#4ade80"
            strokeWidth={ropeCurve.tensionWidth - 4}
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
          <circle
            cx={anchorX}
            cy={anchorY + 2}
            r="5"
            fill="#000"
            stroke="#22c55e"
            strokeWidth="2"
          />
        </svg>

        <motion.div
          style={{
            x: ropeCurve.x - 10,
            y: ropeCurve.y - 10,
            rotate: ropeCurve.angle,
          }}
          className="absolute top-0 left-0 z-45 pointer-events-none flex flex-col items-center"
        >
          <div className="w-5 h-2.5 bg-zinc-800 border-2 border-black rounded-xs flex justify-center items-center">
            <div className="w-1.5 h-0.5 bg-black rounded-xs" />
          </div>
          <div className="w-3 h-3 border-2 border-zinc-300 rounded-full bg-zinc-400 shadow-xs -mt-0.5" />
          <div className="w-3.5 h-2 bg-zinc-400 border border-black rounded-xs -mt-1" />
        </motion.div>

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
          <div className="relative mt-[12px] overflow-hidden rounded-[16px] border-2 border-black bg-zinc-950/95 backdrop-blur-xl shadow-[4px_4px_0px_0px_#000] w-[150px]">
            <div className="absolute left-1/2 top-2 h-2 w-6 -translate-x-1/2 rounded-full bg-black border border-zinc-800 flex justify-center items-center z-20">
              <div className="w-2.5 h-0.5 bg-zinc-700 rounded-full" />
            </div>

            <div className="w-full h-7 bg-gradient-to-r from-han-green via-emerald-400 to-lime-500 border-b-2 border-black flex items-end justify-center pb-1" />

            <div className="p-2.5 pt-2 flex flex-col items-center">
              <div className="relative w-full h-28 rounded-lg border-2 border-black bg-zinc-900 overflow-hidden shadow-[2px_2px_0px_0px_#000] mb-2 group">
                <Image
                  src="/images/3.jpg"
                  alt="Muhammad A'iz Nur Aziz"
                  fill
                  priority
                  sizes="150px"
                  className="object-cover object-top filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-1 right-1 bg-black/80 backdrop-blur-md border border-han-green/50 px-1 py-0.5 rounded text-[5.5px] font-pixel text-han-green uppercase font-bold">
                  VERIFIED
                </div>
              </div>

              <div className="w-full text-center space-y-0.5 mb-2">
                <p className="text-[6.5px] uppercase tracking-[0.15em] text-zinc-500 font-mono">
                  DEV ID: #8092
                </p>
                <h2 className="text-[11px] font-retro uppercase tracking-tight text-white leading-none">
                  MUHAMMAD A&apos;IZ
                </h2>
                <div className="inline-block bg-han-green/20 border border-han-green/50 px-1.5 py-0.5 rounded text-[6.5px] font-pixel text-han-green uppercase font-bold">
                  FULLSTACK ENG
                </div>
              </div>

              <div className="w-full mt-0.5 flex items-center justify-between gap-1 pt-1 border-t border-dashed border-zinc-800">
                <div className="flex items-center gap-[1px] h-2.5 opacity-80">
                  <div className="w-[1px] h-full bg-white" />
                  <div className="w-[2px] h-full bg-white" />
                  <div className="w-[1.5px] h-full bg-white" />
                </div>
                <span className="font-pixel text-[5.5px] uppercase text-zinc-400">
                  PULL & SWING
                </span>
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

        <h1 className="font-retro text-[9vw] md:text-[5.5vw] lg:text-[4.8vw] leading-[0.95] text-white tracking-tight drop-shadow-[5px_5px_0px_#121212] uppercase font-black px-2">
          Muhammad A&apos;iz Nur Aziz
        </h1>

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
            className="group flex items-center gap-2 bg-han-green text-black border-2 border-black px-5 py-2.5 font-pixel text-[9px] md:text-[10px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] transition-all active:translate-x-0 active:translate-y-0"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            Lihat Project
          </a>

          <a
            href="#contact"
            className="group flex items-center gap-2 bg-transparent text-white border-2 border-white px-5 py-2.5 font-pixel text-[9px] md:text-[10px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] hover:bg-white hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            Hubungi Saya
          </a>

          <a
            href="/cv/aiz.pdf"
            download
            className="group flex items-center gap-2 bg-han-yellow text-black border-2 border-black px-5 py-2.5 font-pixel text-[9px] md:text-[10px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] transition-all"
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
