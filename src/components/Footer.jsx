"use client";

import { Mail, Link2, AtSign, ArrowUp } from "lucide-react";

// Inline SVG Icon LinkedIn agar konsisten dan bebas bug build
const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const socialLinks = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:nmuhammadaiz@gmail.com",
    hoverColor: "hover:text-han-green hover:border-han-green",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-aiz-nur-aziz/", // Sesuaikan tautan Anda
    hoverColor: "hover:text-sky-400 hover:border-sky-400",
  },
  {
    icon: Link2,
    label: "GitHub",
    href: "https://github.com/muhammadaiznuraziz",
    hoverColor: "hover:text-indigo-400 hover:border-indigo-400",
  },
  {
    icon: AtSign,
    label: "Instagram",
    href: "https://www.instagram.com/mhmmdazziizz_/",
    hoverColor: "hover:text-han-orange hover:border-han-orange",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-zinc-950 border-t-4 border-zinc-800 py-12 px-4 sm:px-6 md:px-8 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* ─── SEKTOR KIRI: Copyright & Identitas Resmi ─── */}
        <div className="text-center md:text-left space-y-1.5">
          <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
            MUHAMMAD AIZ NUR AZIZ &bull; ALL RIGHTS RESERVED
          </p>
        </div>

        {/* ─── SEKTOR KANAN: Social Icons & Back to Top ─── */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* List Icon Sosial */}
          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2.5 sm:p-3 border-2 border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-all duration-200 shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] hover:bg-zinc-900 ${social.hoverColor}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              );
            })}
          </div>

          {/* Tombol Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="p-2.5 sm:p-3 border-2 border-zinc-800 bg-han-green text-black font-bold transition-all duration-200 shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] hover:bg-white"
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
