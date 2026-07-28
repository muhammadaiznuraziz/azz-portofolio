"use client";

import { useEffect } from "react";
import {
  ExternalLink,
  X,
  Terminal,
  CheckCircle2,
  Code2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function ProjectModal({ isOpen, project, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const hasGithub = project.githubUrl && project.githubUrl !== "#";
  const hasLive = project.liveUrl && project.liveUrl !== "#";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border-4 border-black w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] flex flex-col shadow-[12px_12px_0px_0px_#000] overflow-hidden animate-in zoom-in-95 duration-200 relative"
      >
        {/* Sticky Terminal Header Bar */}
        <div className="bg-zinc-950 px-4 py-3 border-b-4 border-black flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <Terminal className="w-4 h-4 text-han-green shrink-0" />
            <span className="font-pixel text-[10px] text-zinc-300 uppercase tracking-widest truncate font-bold">
              {project.id
                ? `SYS_INSPECT_//_${project.id.toUpperCase()}.EXE`
                : "PROJECT_DETAILS.EXE"}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-8 h-8 bg-zinc-900 border-2 border-black hover:bg-han-green hover:text-black text-white flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <X className="w-4 h-4 font-black" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Thumbnail Banner with CRT Overlay */}
          <div className="relative w-full aspect-video bg-black border-b-4 border-black overflow-hidden group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            {/* Scanline Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />

            {/* Badges Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 items-center z-20">
              <span className="font-pixel text-[8.5px] bg-han-green text-black px-3 py-1 uppercase tracking-widest border-2 border-black font-black shadow-[3px_3px_0px_0px_#000]">
                {project.category}
              </span>
              {project.badgeText && (
                <span className="font-pixel text-[8.5px] bg-zinc-950 text-white px-3 py-1 uppercase tracking-widest border-2 border-black font-black shadow-[3px_3px_0px_0px_#000]">
                  {project.badgeText}
                </span>
              )}
            </div>
          </div>

          {/* Modal Content Details */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* Title & Subtitle */}
            <div className="space-y-1.5 border-b-2 border-dashed border-zinc-800 pb-4">
              <h3 className="font-retro text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="font-pixel text-[9.5px] text-han-green uppercase tracking-widest font-bold">
                  // {project.subtitle}
                </p>
              )}
            </div>

            {/* Tech Stack List */}
            {project.tech && project.tech.length > 0 && (
              <div className="bg-zinc-950 p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] space-y-2.5">
                <div className="flex items-center gap-2 font-pixel text-[8.5px] text-han-green uppercase tracking-wider font-bold">
                  <Code2 className="w-4 h-4" />
                  <span>Tech Stack & Architecture</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="font-pixel text-[8px] uppercase px-2.5 py-1 bg-zinc-900 border-2 border-black text-zinc-200 font-bold shadow-[2px_2px_0px_0px_#000]"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview / Description */}
            <div className="space-y-2">
              <h4 className="font-pixel text-[9.5px] uppercase tracking-widest text-han-green font-black flex items-center gap-2">
                <span className="w-2 h-2 bg-han-green" />
                <span>Overview & Scope</span>
              </h4>
              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 border-2 border-black">
                {project.description}
              </p>
            </div>

            {/* Key Capabilities */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-pixel text-[9.5px] uppercase tracking-widest text-han-green font-black flex items-center gap-2">
                  <span className="w-2 h-2 bg-han-green" />
                  <span>Key Features & Capabilities</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5 bg-zinc-950 p-3 border-2 border-black text-xs text-zinc-200 shadow-[2px_2px_0px_0px_#000]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-han-green shrink-0 mt-0.5" />
                      <span className="font-sans font-medium leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Action Footer (Conversion-focused CTA) */}
        <div className="bg-zinc-950 p-4 border-t-4 border-black flex flex-col sm:flex-row gap-3 shrink-0 z-20">
          {hasLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-pixel text-[9.5px] uppercase px-4 py-3 bg-han-green text-black border-2 border-black font-black hover:bg-white transition-all shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Kunjungi Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="flex-1 text-center font-pixel text-[9.5px] uppercase px-4 py-3 bg-zinc-900 text-zinc-500 border-2 border-black font-black flex items-center justify-center gap-2 cursor-not-allowed">
              <ShieldCheck className="w-4 h-4" />
              <span>Internal / Offline Project</span>
            </div>
          )}

          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-pixel text-[9.5px] uppercase px-4 py-3 bg-zinc-900 text-white border-2 border-black hover:bg-zinc-800 transition-all shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Source Code</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
