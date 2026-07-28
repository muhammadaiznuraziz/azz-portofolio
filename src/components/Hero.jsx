/**
 * KOMPONEN: Hero
 * DESKRIPSI: Hero Section dengan Interactive Rigid PVC ID Pass, Rigid Woven Lanyard Physics, & Fixed Drag Release.
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

  // ─── REF UNTUK MENGUNCI HOVER SAAT DRAG & COOLDOWN ───
  const isDraggingRef = useRef(false);
  const dragCooldownRef = useRef(null);

  // ─── 1. COORDINATES & ANCHOR (PHYSICS ENGINE) ───
  const anchorX = 45;
  const anchorY = 0;

  const originX = 20;
  const originY = 60;

  const rawX = useMotionValue(originX);
  const rawY = useMotionValue(originY);

  // Velocity tracker untuk efek lemparan/momentum ayunan
  const xVelocity = useVelocity(rawX);

  // Dynamic Physics Config untuk pergerakan pejal (Rigid Body)
  const [springConfig, setSpringConfig] = useState({
    stiffness: 100,
    damping: 12,
    mass: 0.8,
  });

  const cardX = useSpring(rawX, springConfig);
  const cardY = useSpring(rawY, springConfig);

  // Pendulum Swing Effect (Kartu kaku mengayun terpisah dari tali)
  const cardRotate = useTransform(cardX, [-40, 180], [-28, 28]);
  const cardSwingInertia = useTransform(xVelocity, [-1000, 1000], [-12, 12]);

  const [isDragging, setIsDragging] = useState(false);
  const [ropeCurve, setRopeCurve] = useState({
    cx: 35,
    cy: 30,
    x: 20,
    y: 60,
    angle: 0,
    tensionWidth: 8.5,
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

  // ─── UPDATE ROPE (RIGID WOVEN LANYARD PHYSICS) ───
  const updateRope = (currentX, currentY) => {
    const targetX = currentX + 85; // Pusat gantungan kartu
    const targetY = currentY + 12;

    const dist = Math.hypot(targetX - anchorX, targetY - anchorY);

    // KAIN WOVEN TIDAK MELAR: Ketebalan konstan & solid
    const tensionWidth = Math.max(7.5, 9 - dist * 0.008);

    // Hitung Sudut Engsel Metal Hook
    const angleRad = Math.atan2(targetY - anchorY, targetX - anchorX);
    const angleDeg = (angleRad * 180) / Math.PI - 90;

    const midX = (anchorX + targetX) / 2;
    const deltaY = targetY - anchorY;

    // SAG/KELENGKUNGAN KAKU: Minim kelengkungan agar terlihat kencang (Tension Tinggi)
    const sag = isDragging
      ? Math.max(-2, 6 - dist * 0.04) // Kencang/hampir lurus saat ditarik
      : Math.max(4, 14 - deltaY * 0.05); // Melengkung alami tipis saat diam

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
    // JIKA SEDANG DRAG ATAU DALAM COOLDOWN RELEASE, STOP PERGERAKAN HOVER MOUSE!
    if (isDraggingRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const offsetX = (mouseX - rect.width / 2) * 0.025;
    const offsetY = (mouseY - rect.height / 2) * 0.025;

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
    // Dynamic spring physics saat dilepas (membal & mengayun)
    setSpringConfig({ stiffness: 220, damping: 5, mass: 1.2 });

    rawX.set(originX);
    rawY.set(originY);

    setIsDragging(false);

    // Kunci hover mouse selama 600ms agar animasi pengembalian kartu selesai sempurna
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
      className="relative w-full min-h-[70vh] md:min-h-[78vh] flex flex-col items-center justify-center px-4 md:px-12 py-10 bg-zinc-900 border-b-4 border-zinc-800 overflow-hidden select-none"
    >
      {/* Latar Belakang Vinyl */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-color-dodge bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent pointer-events-none" />

      {/* ─── RIGID WOVEN LANYARD STRAP (SVG TALI REALISTIS) ─── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-40">
        {/* Outer Shadow Tali */}
        <path
          d={`M ${anchorX} ${anchorY} Q ${ropeCurve.cx} ${ropeCurve.cy} ${ropeCurve.x} ${ropeCurve.y}`}
          fill="none"
          stroke="black"
          strokeWidth={ropeCurve.tensionWidth + 3}
          strokeLinecap="round"
        />
        {/* Base Strap (Woven Fabric) */}
        <path
          d={`M ${anchorX} ${anchorY} Q ${ropeCurve.cx} ${ropeCurve.cy} ${ropeCurve.x} ${ropeCurve.y}`}
          fill="none"
          stroke="#16a34a"
          strokeWidth={ropeCurve.tensionWidth}
          strokeLinecap="round"
        />
        {/* Jahitan Pinggir / Inner Stitch Pattern */}
        <path
          d={`M ${anchorX} ${anchorY} Q ${ropeCurve.cx} ${ropeCurve.cy} ${ropeCurve.x} ${ropeCurve.y}`}
          fill="none"
          stroke="#4ade80"
          strokeWidth={ropeCurve.tensionWidth - 4}
          strokeDasharray="6 4"
          strokeLinecap="round"
        />
        {/* Anchor Ring Atas */}
        <circle
          cx={anchorX}
          cy={anchorY + 2}
          r="6"
          fill="#000"
          stroke="#22c55e"
          strokeWidth="2"
        />
      </svg>

      {/* ─── ENGSEL METAL HOOK ─── */}
      <motion.div
        style={{
          x: ropeCurve.x - 12,
          y: ropeCurve.y - 12,
          rotate: ropeCurve.angle,
        }}
        className="absolute top-0 left-0 z-45 pointer-events-none flex flex-col items-center"
      >
        <div className="w-6 h-3 bg-zinc-800 border-2 border-black rounded-xs shadow-sm flex justify-center items-center">
          <div className="w-2 h-1 bg-black rounded-xs" />
        </div>
        <div className="w-3.5 h-3.5 border-2 border-zinc-300 rounded-full bg-zinc-400 shadow-xs -mt-0.5" />
        <div className="w-4 h-2.5 bg-zinc-400 border border-black rounded-xs -mt-1" />
      </motion.div>

      {/* ─── DRAGGABLE RIGID PVC BADGE (PERSEGI PANJANG & FOTO BESAR) ─── */}
      <motion.div
        style={{
          x: cardX,
          y: cardY,
          rotate: cardRotate,
          skewX: cardSwingInertia,
        }}
        drag
        dragSnapToOrigin
        dragConstraints={{ left: -30, right: 260, top: 0, bottom: 380 }}
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="absolute top-0 left-0 z-50 cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Bodi ID Card PVC Persegi Panjang Vertikal */}
        <div className="relative mt-[14px] overflow-hidden rounded-[20px] border-2 border-black bg-zinc-950/95 backdrop-blur-xl shadow-[6px_6px_0px_0px_#000] w-[180px] sm:w-[200px]">
          {/* Hole Punch tempat pengait masuk */}
          <div className="absolute left-1/2 top-2 h-2.5 w-8 -translate-x-1/2 rounded-full bg-black border border-zinc-800 flex justify-center items-center z-20">
            <div className="w-3.5 h-1 bg-zinc-700 rounded-full" />
          </div>

          {/* Header Accent Band */}
          <div className="w-full h-9 bg-gradient-to-r from-han-green via-emerald-400 to-lime-500 border-b-2 border-black flex items-end justify-center pb-1"></div>

          <div className="p-3.5 pt-3 flex flex-col items-center">
            {/* ─── FOTO PROFIL BESAR (DOMINAN & TEGAS) ─── */}
            <div className="relative w-full h-36 sm:h-40 rounded-xl border-2 border-black bg-zinc-900 overflow-hidden shadow-[3px_3px_0px_0px_#000] mb-3 group">
              <Image
                src="/images/3.jpg"
                alt="Muhammad A'iz Nur Aziz"
                fill
                priority
                sizes="(max-width: 640px) 180px, 200px"
                className="object-cover object-top filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              />
              {/* Overlay Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />

              {/* Status Chip di Atas Foto */}
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-han-green/50 px-1.5 py-0.5 rounded text-[6.5px] font-pixel text-han-green uppercase tracking-wider font-bold">
                VERIFIED
              </div>
            </div>

            {/* ─── DETAIL IDENTITAS (VERTIKAL & CLEAN) ─── */}
            <div className="w-full text-center space-y-1 mb-3">
              <p className="text-[7.5px] uppercase tracking-[0.2em] text-zinc-500 font-mono">
                DEV ID: #8092
              </p>
              <h2 className="text-[14px] sm:text-[15px] font-retro uppercase tracking-tight text-white leading-none">
                MUHAMMAD A&apos;IZ NUR AZIZ
              </h2>
              <div className="inline-block bg-han-green/20 border border-han-green/50 px-2 py-0.5 rounded text-[7.5px] font-pixel text-han-green uppercase font-bold tracking-wider">
                FULLSTACK ENGINEER
              </div>
            </div>

            {/* ─── DEKORASI BARCODE + INSTRUCTION ─── */}
            <div className="w-full mt-3 flex items-center justify-between gap-2 pt-2 border-t border-dashed border-zinc-800">
              <div className="flex items-center gap-[1.5px] h-3.5 opacity-80">
                <div className="w-[1.5px] h-full bg-white" />
                <div className="w-[2.5px] h-full bg-white" />
                <div className="w-[1px] h-full bg-transparent" />
                <div className="w-[3px] h-full bg-white" />
                <div className="w-[1.5px] h-full bg-white" />
                <div className="w-[2px] h-full bg-transparent" />
                <div className="w-[1px] h-full bg-white" />
                <div className="w-[3px] h-full bg-white" />
              </div>

              <span className="font-pixel text-[6.5px] uppercase tracking-wider text-zinc-400">
                PULL & SWING
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Stickers */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stickerEntryVariants}
        className="absolute top-20 right-[15%] z-30 hidden md:block"
      >
        <div className="bg-han-green text-black px-4 py-1.5 rounded-full border-2 border-black font-retro text-xl font-bold tracking-wider hover:scale-110 transition-transform shadow-[3px_3px_0px_0px_#000]">
          ME
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stickerEntryVariants}
        className="absolute bottom-20 left-[8%] z-30 hidden md:block"
      >
        <div className="bg-amber-400 text-black px-5 py-1.5 rounded-full border-2 border-black font-retro text-xl font-extrabold tracking-widest shadow-[4px_4px_0px_0px_#000] rotate-[-5deg]">
          FILES
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stickerEntryVariants}
        className="absolute top-1/2 right-[6%] z-30"
      >
        <div className="w-11 h-11 bg-lime-500 rounded-lg border-2 border-black flex items-center justify-center text-black shadow-[3px_3px_0px_0px_#000] hover:bg-lime-400 transition-colors">
          <Home className="w-5 h-5" />
        </div>
      </motion.div>

      {/* KONTEN UTAMA HERO */}
      <div className="z-20 text-center select-none max-w-5xl flex flex-col items-center gap-3 md:gap-4 mt-8 md:mt-0">
        <div className="inline-flex items-center gap-2 bg-han-green/10 border border-han-green/30 px-3.5 py-1 rounded-full">
          <span className="w-2 h-2 bg-han-green rounded-full animate-pulse" />
          <span className="font-pixel text-[8px] md:text-[9px] text-han-green uppercase tracking-widest font-bold">
            Available for Work
          </span>
        </div>

        <h1 className="font-retro text-[11vw] md:text-[7.5vw] lg:text-[6vw] leading-[0.9] text-white tracking-tight drop-shadow-[6px_6px_0px_#121212] uppercase font-black">
          Muhammad A&apos;iz Nur Aziz
        </h1>

        <div className="space-y-2">
          <p className="font-pixel text-[10px] md:text-xs text-han-green uppercase tracking-widest font-bold">
            Fullstack Developer | Frontend Specialist
          </p>
          <p className="font-sans text-xs md:text-sm text-zinc-400 max-w-lg leading-relaxed mx-auto">
            Membangun sistem web performa tinggi, interaktif, dan berarsitektur
            bersih. Berfokus pada konversi, logika solid, dan performa level
            produksi.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <a
            href="#projects"
            className="group flex items-center gap-2 bg-han-green text-black border-2 border-black px-5 py-2.5 font-pixel text-[9px] md:text-[10px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] transition-all active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#000]"
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

        <div className="mt-3 flex flex-col items-center gap-1 opacity-50">
          <span className="font-pixel text-[8px] text-zinc-500 uppercase tracking-widest font-bold">
            Scroll Down
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-zinc-500 animate-bounce" />
        </div>
      </div>
    </header>
  );
}
