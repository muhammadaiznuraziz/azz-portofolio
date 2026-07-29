"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Wifi,
  Zap,
  MapPin,
  ExternalLink,
  Terminal,
  Filter,
} from "lucide-react";

const experienceData = [
  {
    id: "exp-1",
    type: "education",
    year: "2025 - SEKARANG",
    icon: GraduationCap,
    label: "KULIAH",
    labelColor: "bg-han-orange text-black",
    title: "S1 Teknik Informatika",
    company: "Universitas Muhammadiyah Cirebon (Kampus 1)",
    mapsLink:
      "https://maps.google.com/?q=Universitas+Muhammadiyah+Cirebon+Kampus+1",
    desc: "Mengembangkan kompetensi mendalam di Fakultas Teknik, program studi Teknik Informatika. Fokus pada rekayasa perangkat lunak, arsitektur data, dan pengembangan fullstack application.",
    skills: ["Fullstack Dev", "Data Structures", "Software Engineering"],
  },
  {
    id: "exp-2",
    type: "career",
    year: "2025",
    icon: Zap,
    label: "INDUSTRI / MAGANG",
    labelColor: "bg-amber-400 text-black",
    title: "Asisten Teknisi Jaringan & Pemeliharaan",
    company: "PT PLN (Persero)",
    mapsLink: "https://maps.google.com/?q=PT+PLN+Persero+Cirebon",
    desc: "Membantu tim teknisi dalam pemeliharaan keandalan sistem jaringan, inspeksi kelistrikan lapangan, troubleshooting gangguan operasional, serta pembuatan dokumentasi teknis harian.",
    skills: ["Network Maintenance", "Troubleshooting", "System Inspection"],
  },
  {
    id: "exp-3",
    type: "career",
    year: "2024",
    icon: Wifi,
    label: "PRAKERIN",
    labelColor: "bg-han-yellow text-black",
    title: "Network Infrastructure Intern",
    company: "PT Fastama (Fiqran Solusindo Mediatama)",
    mapsLink:
      "https://maps.google.com/?q=PT+Fastama+Fiqran+Solusindo+Mediatama",
    desc: "Melaksanakan Praktik Kerja Industri pada perusahaan penyedia infrastruktur jaringan. Terlibat dalam instalasi, pemeliharaan, serta troubleshooting sistem jaringan WiFi dan konektivitas.",
    skills: ["WiFi Infrastructure", "Router Config", "Network Topology"],
  },
  {
    id: "exp-4",
    type: "education",
    year: "2022 - 2025",
    icon: GraduationCap,
    label: "PENDIDIKAN VO-TECH",
    labelColor: "bg-han-blue text-white",
    title: "Rekayasa Perangkat Lunak (RPL)",
    company: "SMK Muhammadiyah Gebang, Cirebon",
    mapsLink: "https://maps.google.com/?q=SMK+Muhammadiyah+Gebang+Cirebon",
    desc: "Mempelajari pondasi krusial pemrograman web, algoritma dasar, manajemen basis data relasional, serta ekosistem pengembangan aplikasi desktop dan mobile.",
    skills: ["Web Dev", "Database SQL", "OOP Foundations"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Experience() {
  const [filter, setFilter] = useState("all");

  const filteredData = experienceData.filter((item) => {
    if (filter === "career") return item.type === "career";
    if (filter === "education") return item.type === "education";
    return true;
  });

  return (
    <section
      id="experience"
      className="w-full bg-zinc-950 border-b-4 border-black pt-20 sm:pt-28 pb-20 sm:pb-24 z-10 relative scroll-mt-20 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="mb-10 sm:mb-12 border-b-4 border-black pb-6 sm:pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-han-green" />
              <span className="font-pixel text-[10px] text-han-green uppercase tracking-widest font-bold">
                carrer & education
              </span>
            </div>

            <h2 className="font-retro text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none flex items-baseline">
              <span>PERJALANAN</span>
              <span className="text-han-green animate-pulse ml-1">.</span>
            </h2>
          </div>

          {/* Dynamic Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-zinc-900 p-2 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
            <span className="font-pixel text-[8px] text-zinc-400 px-1.5 flex items-center gap-1 font-bold">
              <Filter className="w-3 h-3 text-han-green" /> FILTER:
            </span>
            <button
              onClick={() => setFilter("all")}
              className={`font-pixel text-[8px] sm:text-[8.5px] uppercase px-2.5 sm:px-3 py-1.5 border-2 border-black font-bold transition-all ${
                filter === "all"
                  ? "bg-han-green text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-zinc-950 text-zinc-400 hover:text-white"
              }`}
            >
              ALL LOGS
            </button>
            <button
              onClick={() => setFilter("career")}
              className={`font-pixel text-[8px] sm:text-[8.5px] uppercase px-2.5 sm:px-3 py-1.5 border-2 border-black font-bold transition-all ${
                filter === "career"
                  ? "bg-han-green text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-zinc-950 text-zinc-400 hover:text-white"
              }`}
            >
              CAREER & INTERN
            </button>
            <button
              onClick={() => setFilter("education")}
              className={`font-pixel text-[8px] sm:text-[8.5px] uppercase px-2.5 sm:px-3 py-1.5 border-2 border-black font-bold transition-all ${
                filter === "education"
                  ? "bg-han-green text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-zinc-950 text-zinc-400 hover:text-white"
              }`}
            >
              EDUCATION
            </button>
          </div>
        </div>

        {/* Timeline Container - Presisi Offset Mobile agar tidak keluar layar */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative max-w-4xl mx-auto ml-2 sm:mx-auto pl-7 sm:pl-10 md:pl-12 border-l-4 border-black space-y-8 sm:space-y-10 my-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((exp) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={exp.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  className="relative group"
                >
                  {/* Fixed Brutalist Node Icon - Posisikan presisi di atas garis border-l-4 */}
                  <div className="absolute -left-[21px] sm:-left-[25px] top-2 w-8 h-8 sm:w-10 sm:h-10 bg-zinc-950 border-2 sm:border-4 border-black flex items-center justify-center text-han-green shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] z-10 group-hover:bg-han-green group-hover:text-black transition-colors">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" />
                  </div>

                  {/* Card Main Box */}
                  <div className="border-4 border-black p-4 sm:p-7 bg-zinc-900 shadow-[4px_4px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] sm:hover:shadow-[12px_12px_0px_0px_#000] hover:border-han-green transition-all duration-200">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span
                        className={`font-pixel text-[8px] sm:text-[9px] uppercase tracking-widest px-2.5 sm:px-3 py-1 border-2 border-black font-black shadow-[2px_2px_0px_0px_#000] ${exp.labelColor}`}
                      >
                        {exp.label}
                      </span>
                      <span className="font-pixel text-[8px] sm:text-[10px] text-zinc-300 bg-zinc-950 px-2.5 sm:px-3 py-1 border-2 border-black font-bold shadow-[2px_2px_0px_0px_#000]">
                        {exp.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-retro text-xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-han-green transition-colors leading-tight break-words">
                      {exp.title}
                    </h3>

                    {/* Location Link - Dikunci max-w-full & overflow agar tidak jebol */}
                    <div className="mt-2.5 mb-4 max-w-full">
                      <a
                        href={exp.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1.5 font-pixel text-[8.5px] sm:text-[10px] text-zinc-300 hover:text-black hover:bg-han-green uppercase tracking-wider bg-zinc-950 px-2.5 sm:px-3 py-1.5 border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000]"
                      >
                        <MapPin className="w-3.5 h-3.5 text-han-green group-hover:text-black shrink-0" />
                        <span className="truncate">{exp.company}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 ml-0.5" />
                      </a>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed border-t-2 border-dashed border-zinc-800 pt-3 sm:pt-4 mb-4">
                      {exp.desc}
                    </p>

                    {/* Tech & Competency Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-pixel text-[7px] sm:text-[7.5px] uppercase px-2 py-0.5 bg-zinc-950 text-zinc-400 border border-zinc-800"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
