"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Link2,
  AtSign,
  Terminal,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

// Inline Icon LinkedIn agar tidak pernah crash akibat versi lucide-react
const LinkedinIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "nmuhammadaiz@gmail.com",
    href: "mailto:nmuhammadaiz@gmail.com",
    color: "bg-han-green text-black",
    hoverBorder: "hover:border-han-green",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "in/muhammad-aiz-nur-aziz-882399372",
    href: "https://www.linkedin.com/in/muhammad-aiz-nur-aziz-882399372",
    color: "bg-sky-400 text-black",
    hoverBorder: "hover:border-sky-400",
  },
  {
    icon: Link2,
    label: "GitHub",
    value: "github.com/muhammadaiznuraziz",
    href: "https://github.com/muhammadaiznuraziz",
    color: "bg-indigo-500 text-white",
    hoverBorder: "hover:border-indigo-500",
  },
  {
    icon: AtSign,
    label: "Instagram",
    value: "@mhmmdazziizz_",
    href: "https://www.instagram.com/mhmmdazziizz_/",
    color: "bg-han-orange text-black",
    hoverBorder: "hover:border-han-orange",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full bg-zinc-950 border-b-4 border-zinc-800 pt-28 pb-24 z-10 relative scroll-mt-20 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="mb-12 border-b-4 border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-han-green" />
              <span className="font-pixel text-[10px] text-han-green uppercase tracking-widest font-bold">
                direct communication
              </span>
            </div>
            <h2 className="font-retro text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mt-1">
              Hubungi Saya
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
            Terbuka untuk ruang diskusi teknis, pengerjaan proyek freelance
            skala produksi, ataupun penawaran karir full-time.
          </p>
        </div>

        {/* Main Bento Console Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="border-4 border-zinc-800 bg-zinc-900 shadow-[10px_10px_0px_0px_#000] overflow-hidden"
        >
          {/* Top Window Bar */}
          <div className="bg-zinc-950 px-4 py-2.5 border-b-4 border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-han-green" />
              <span className="font-pixel text-[9px] text-zinc-300 uppercase tracking-widest">
                CONNECT_PROTOCOL.EXE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-han-green animate-pulse" />
              <span className="font-pixel text-[8px] text-zinc-400 uppercase hidden sm:inline">
                RESPONSE TIME: &lt; 24 HOURS
              </span>
            </div>
          </div>

          {/* Wrapper Content Body */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Symmetrical 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group flex flex-col items-center justify-between text-center p-6 sm:p-7 border-4 border-zinc-800 bg-zinc-950/80 ${info.hoverBorder} transition-all duration-200 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000]`}
                  >
                    <div className="absolute top-2 right-2 opacity-40 group-hover:opacity-100 group-hover:text-white transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${info.color} border-2 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000] transition-transform group-hover:scale-105 shrink-0`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1 w-full">
                      <span className="font-pixel text-[8px] text-zinc-500 uppercase tracking-widest block">
                        {info.label}
                      </span>
                      <span className="font-mono text-xs font-bold text-white group-hover:text-han-green transition-colors break-all block px-1">
                        {info.value}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 w-full">
                      <span className="font-pixel text-[8px] uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                        [ BUKA LINK ↗ ]
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
