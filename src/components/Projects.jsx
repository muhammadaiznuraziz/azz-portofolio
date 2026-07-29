"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Eye,
  ArrowUpRight,
  FolderGit2,
  Terminal,
  Sparkles,
} from "lucide-react";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    id: "snapazzhot-v1",
    title: "Snapazzhot Photobooth V1",
    subtitle: "Modern Web Photobooth Experience",
    category: "Web Application",
    description:
      "Aplikasi photobooth berbasis web yang memungkinkan pengguna mengambil foto langsung dari browser, menggunakan filter real-time, memilih frame, dan mengunduh hasil akhir tanpa instalasi aplikasi.",
    features: [
      "Real-time Camera Capture",
      "Multiple Layouts",
      "Custom Frames",
      "Photo Filters",
      "Countdown Timer",
      "Download PNG",
      "Responsive Design",
    ],
    image:
      "https://api.microlink.io?url=https%3A%2F%2Fsnapazzhot.web.id&screenshot=true&embed=screenshot.url",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    categoryColor: "text-han-green",
    badgeText: "FEATURED",
    badgeBg: "bg-han-green text-black",
    liveUrl: "https://snapazzhot.web.id",
    githubUrl: "#",
  },
  {
    id: "snapazzhot-v2",
    title: "Snapazzhot V2",
    subtitle: "Next-Gen Photobooth Engine",
    category: "Web Application",
    description:
      "Generasi kedua platform Snapazzhot dengan peningkatan performa render canvas, UI/UX yang lebih responsif, serta optimasi ekspor foto resolusi tinggi.",
    features: [
      "High-Res Canvas Render",
      "Improved UI/UX Engine",
      "Fast Export System",
      "Mobile Optimized",
      "Custom Stickers",
    ],
    image:
      "https://api.microlink.io?url=https%3A%2F%2Fsnapazzhot-v2.vercel.app&screenshot=true&embed=screenshot.url",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    categoryColor: "text-lime-400",
    badgeText: "PROJECT 02",
    badgeBg: "bg-lime-400 text-black",
    liveUrl: "https://snapazzhot-v2.vercel.app",
    githubUrl: "#",
  },
  {
    id: "karang-taruna-kesenden",
    title: "Karang Taruna Kesenden",
    subtitle: "Organization & Community Portal",
    category: "Web Development",
    description:
      "Website portal resmi Karang Taruna Kesenden untuk transparansi informasi publik, agenda kegiatan pemuda, galeri program, dan pusat pendaftaran anggota.",
    features: [
      "Public Information Hub",
      "Event & Activity Logs",
      "Community Gallery",
      "Dynamic News System",
      "Responsive Layout",
    ],
    image:
      "https://api.microlink.io?url=https%3A%2F%2Fkarang-taruna-kesenden.vercel.app&screenshot=true&embed=screenshot.url",
    tech: ["Next.js", "Tailwind CSS", "JavaScript"],
    categoryColor: "text-amber-400",
    badgeText: "PROJECT 03",
    badgeBg: "bg-amber-400 text-black",
    liveUrl: "https://karang-taruna-kesenden.vercel.app",
    githubUrl: "#",
  },
  {
    id: "daemonium-store",
    title: "Daemonium Streetwear",
    subtitle: "Brutalist E-Commerce Platform",
    category: "Web Development",
    description:
      "Platform e-commerce streetwear dengan pendekatan desain brutalist modern, katalog produk, dan pengalaman visual yang kuat.",
    features: [
      "Product Catalog",
      "Product Detail",
      "Responsive Design",
      "Smooth Animation",
      "Brutalist UI",
      "Fast Navigation",
    ],
    image:
      "https://api.microlink.io?url=https%3A%2F%2Fdaemonium.vercel.app&screenshot=true&embed=screenshot.url",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    categoryColor: "text-han-orange",
    badgeText: "PROJECT 04",
    badgeBg: "bg-han-orange text-black",
    liveUrl: "https://daemonium.vercel.app",
    githubUrl: "#",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      id="projects"
      className="w-full bg-zinc-950 border-b-4 border-zinc-800 py-20 md:py-28 z-10 relative scroll-mt-20 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="mb-12 border-b-4 border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-han-green" />
              <span className="font-pixel text-[10px] uppercase tracking-widest text-han-green font-bold">
                PORTFOLIO SHOWCASE
              </span>
            </div>
            <h2 className="font-retro text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Project Saya
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
            Kumpulan aplikasi web & platform digital yang dibangun dengan
            standar performa tinggi, desain tegas, dan kode terstruktur.
          </p>
        </div>

        {/* Grid Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              className="group flex flex-col justify-between overflow-hidden border-4 border-black bg-zinc-900 shadow-[8px_8px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200 relative"
            >
              <div>
                {/* Console Bar Header */}
                <div className="bg-zinc-950 px-3.5 py-2.5 border-b-4 border-black flex items-center justify-between font-pixel text-[9px]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-han-green" />
                    <span className="text-zinc-300 font-bold tracking-wider">
                      PRJ_0{index + 1}.EXE
                    </span>
                  </div>
                  <span
                    className={`${project.categoryColor} font-bold uppercase`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Thumbnail Container */}
                <div
                  onClick={() => handleOpen(project)}
                  className="relative w-full aspect-video overflow-hidden bg-black border-b-4 border-black cursor-pointer group/thumb"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover/thumb:grayscale-0 group-hover/thumb:scale-105 transition-all duration-500"
                  />

                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

                  {/* Badge Label */}
                  <span
                    className={`absolute top-3 left-3 font-pixel text-[8px] uppercase tracking-wider px-2.5 py-1 border-2 border-black ${project.badgeBg} font-black shadow-[2px_2px_0px_0px_#000] z-20`}
                  >
                    {project.badgeText}
                  </span>

                  {/* Click To Expand Banner Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 z-20">
                    <div className="bg-zinc-950 text-white border-2 border-black px-4 py-2 font-pixel text-[9px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_#000] flex items-center gap-2">
                      <Eye className="w-4 h-4 text-han-green" />
                      <span>INSPECT DETAILS</span>
                    </div>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-5 space-y-3">
                  <h3
                    onClick={() => handleOpen(project)}
                    className="font-retro text-xl sm:text-2xl font-bold text-white hover:text-han-green transition-colors leading-tight cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Area: Tech Chips & Actions */}
              <div className="p-5 pt-0 mt-auto space-y-4">
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-dashed border-zinc-800">
                  {project.tech?.map((item) => (
                    <span
                      key={item}
                      className="font-pixel text-[8px] uppercase px-2 py-0.5 border border-black bg-zinc-950 text-zinc-300 font-bold"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Explicit Action Buttons Strip */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleOpen(project)}
                    className="flex items-center justify-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white border-2 border-black py-2 font-pixel text-[8.5px] uppercase tracking-wider font-bold shadow-[2px_2px_0px_0px_#000] active:translate-x-0 active:translate-y-0 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-han-green" />
                    <span>MODAL</span>
                  </button>

                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-han-green hover:bg-white text-black border-2 border-black py-2 font-pixel text-[8.5px] uppercase tracking-wider font-bold shadow-[2px_2px_0px_0px_#000] active:translate-x-0 active:translate-y-0 transition-all"
                      title="Buka Live Site"
                    >
                      <span>DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-1 bg-zinc-950/40 text-zinc-600 border-2 border-zinc-800 py-2 font-pixel text-[8.5px] uppercase font-bold">
                      OFFLINE
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Callout Footer Banner */}
        <div className="mt-14 p-6 bg-zinc-900 border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-han-green border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000] shrink-0">
              <FolderGit2 className="w-6 h-6 text-black" />
            </div>
            <div>
              <h4 className="font-retro text-xl text-white uppercase tracking-wide">
                Tertarik melihat repository & eksperimen lain?
              </h4>
              <p className="font-sans text-xs text-zinc-400 mt-0.5">
                Jelajahi source code dan kustomisasi project lainnya di GitHub
                resmi saya.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/muhammadaiznuraziz"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-zinc-950 text-white border-2 border-black hover:bg-han-green hover:text-black px-5 py-3 font-pixel text-[9.5px] uppercase tracking-wider font-bold transition-all shadow-[3px_3px_0px_0px_#000] active:translate-x-0 active:translate-y-0"
          >
            <span>Kunjungi GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
