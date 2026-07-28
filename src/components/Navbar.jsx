"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Terminal, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about", code: "01" },
  { label: "Skills", href: "#skills", code: "02" },
  { label: "Projects", href: "#projects", code: "03" },
  { label: "Journey", href: "#experience", code: "04" },
  { label: "Contact", href: "#contact", code: "05" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Lock body scroll saat mobile menu aktif
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      setIsScrolled(currentY > 40);

      if (currentY <= 100) {
        setIsVisible(true);
      } else {
        setIsVisible(currentY < lastScrollY.current);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      /* UPGRADE: z-[100] dipasang agar selalu berada di atas Lanyard & elemen Hero */
      className={`fixed top-0 left-0 right-0 z-[100] h-16 w-full border-b-4 border-black transition-colors duration-200 select-none ${
        isScrolled
          ? "bg-zinc-950/95 backdrop-blur-md shadow-[0_4px_0_0_#000]"
          : "bg-zinc-950"
      }`}
    >
      <div className="w-full h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Logo & System Status Badge */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="font-retro text-3xl sm:text-4xl text-white hover:text-han-green transition-colors uppercase tracking-tighter flex items-center gap-1 group"
          >
            <span>azz</span>
            <span className="text-han-green group-hover:animate-ping">.</span>
          </a>
        </div>

        {/* Desktop Nav Links & CTA */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-zinc-900 border-2 border-black p-1 shadow-[3px_3px_0px_0px_#000]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-pixel text-[8.5px] uppercase tracking-wider text-zinc-300 hover:text-black hover:bg-han-green px-3.5 py-1.5 transition-all font-bold border border-transparent hover:border-black shadow-none hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-0 active:translate-y-0"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="flex items-center gap-1.5 bg-han-green hover:bg-white text-black border-2 border-black px-4 py-2 font-pixel text-[9px] uppercase tracking-widest font-black transition-all shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ml-2"
          >
            <span>HIRE ME</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-11 h-11 border-2 border-black bg-han-green text-black flex items-center justify-center font-bold shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all z-[101]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Full-Screen Retro Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 64px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            /* Presisi offset top-16 menyesuaikan tinggi header h-16 */
            className="md:hidden w-full bg-zinc-950 border-t-4 border-black px-6 py-8 flex flex-col justify-between overflow-hidden fixed top-16 inset-x-0 bottom-0 z-[99]"
          >
            <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-800 pb-3">
              <div className="flex items-center gap-2 font-pixel text-[9px] text-han-green uppercase font-bold">
                <Terminal className="w-4 h-4" />
                <span>NAVIGATION_SYSTEM</span>
              </div>
              <span className="font-pixel text-[8px] bg-zinc-900 text-zinc-400 px-2 py-1 border border-black font-bold">
                MENU_VER: 2.0
              </span>
            </div>

            <div className="flex flex-col gap-3 my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="group bg-zinc-900 border-2 border-black p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 hover:bg-han-green transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-pixel text-[10px] text-zinc-500 group-hover:text-black font-bold">
                      //{link.code}
                    </span>
                    <span className="font-retro text-2xl uppercase tracking-wider text-white group-hover:text-black font-bold">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-black" />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="pt-4 border-t-2 border-dashed border-zinc-800"
            >
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full bg-han-green text-black border-4 border-black py-4 font-pixel text-[11px] uppercase tracking-widest text-center font-black flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>HIRE ME NOW</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
