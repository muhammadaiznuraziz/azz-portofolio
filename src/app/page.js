/**
 * HALAMAN UTAMA (page.js)
 * DESKRIPSI: Root page portofolio azz yang merakit semua komponen section.
 * URUTAN SECTION:
 *   1. GrainOverlay  — efek grain film Y2K di seluruh layar
 *   2. Navbar        — navigasi sticky dengan hide-on-scroll
 *   3. Marquee       — teks berjalan hijau di bagian paling atas
 *   4. Hero          — header utama: nama, subtitle, 3 CTA button, floating stickers
 *   5. AboutMe       — perkenalan diri, statistik, tech stack pills
 *   6. Skills        — progress bar skill per kategori (Frontend/Design/Backend)
 *   7. Projects      — card project dengan thumbnail, deskripsi, tech stack
 *   8. Experience    — timeline perjalanan: sertifikat & prakerin
 *   9. Contact       — form kontak + info kontak
 *  10. Footer        — footer brutalist dengan barcode & logo AZZfile
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroLoader from "@/components/IntroLoader";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Varian animasi entry bertahap untuk seluruh komponen utama setelah loader selesai
  const mainContentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.1 // Komponen di bawahnya akan muncul satu per satu otomatis
      } 
    }
  };

  return (
    <>
      {/* 1. Komponen Animasi Preloader Pembuka */}
      <AnimatePresence mode="wait">
        {isLoading && <IntroLoader key="intro-loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Seluruh Konten Utama Website */}
      {!isLoading && (
        <motion.div 
          variants={mainContentVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Lapisan grain film Y2K — fixed di atas semua konten */}
          <GrainOverlay />

          {/* Navigasi sticky — hide saat scroll turun, muncul saat scroll naik */}
          <Navbar />

          {/* Teks berjalan (marquee) hijau di atas hero */}
          <Marquee />

          {/* Hero: nama besar "azz", subtitle, deskripsi, 3 CTA button, ambient audio */}
          <Hero />

          {/* About Me: bento grid perkenalan, foto/disc, statistik, tech stack */}
          <AboutMe />

          {/* Skills: 3 card kategori dengan animated progress bar */}
          <Skills />

          {/* Projects: grid card project dengan thumbnail & modal detail */}
          <main>
            <Projects />
          </main>

          {/* Experience: timeline vertikal sertifikat & prakerin */}
          <Experience />

          {/* Contact: form pesan + info kontak (email, Instagram, GitHub) */}
          <Contact />

          {/* Footer: logo AIZfile, copyright, social media */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}