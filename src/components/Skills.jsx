"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Database, Wrench, Sparkles } from "lucide-react";

// Database keahlian riil dengan Metadata Level & Focus
const skillCategories = [
  {
    id: "frontend",
    label: "Frontend Systems",
    icon: <Cpu className="w-6 h-6 text-black" />,
    badge: "PRIMARY FOCUS",
    colorClass: "bg-han-green",
    borderAccent: "border-han-green",
    skills: [
      { name: "React / Next.js", levelTag: "EXPERT", level: 90, exp: "3+ YRS" },
      {
        name: "TypeScript / JS",
        levelTag: "ADVANCED",
        level: 85,
        exp: "3+ YRS",
      },
      { name: "Tailwind CSS", levelTag: "EXPERT", level: 92, exp: "3+ YRS" },
      {
        name: "State Management",
        levelTag: "ADVANCED",
        level: 80,
        exp: "Redux / Zustand",
      },
      {
        name: "HTML5 / CSS3",
        levelTag: "EXPERT",
        level: 95,
        exp: "Semantic & A11y",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Cloud",
    icon: <Database className="w-6 h-6 text-black" />,
    badge: "CORE STACK",
    colorClass: "bg-amber-400",
    borderAccent: "border-amber-400",
    skills: [
      {
        name: "Node.js / Express",
        levelTag: "INTERMEDIATE",
        level: 70,
        exp: "API Dev",
      },
      {
        name: "Supabase / Firebase",
        levelTag: "ADVANCED",
        level: 80,
        exp: "Auth & DB",
      },
      {
        name: "MySQL / PostgreSQL",
        levelTag: "INTERMEDIATE",
        level: 68,
        exp: "Relational Schema",
      },
    ],
  },
];

const toolsList = ["Git & GitHub", "Vercel / Docker", "VS Code"];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const barVariants = {
  hidden: { width: "0%" },
  visible: (level) => ({
    width: `${level}%`,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  }),
};

export default function Skills() {
  const [activeHoverSkill, setActiveHoverSkill] = useState(null);

  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-20 md:py-28 z-10 relative scroll-mt-20 select-none"
    >
      {/* Header Section */}
      <div className="mb-12 border-b-4 border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-han-green" />
            <span className="font-pixel text-[10px] text-han-green uppercase tracking-widest font-bold">
              TECH STACK
            </span>
          </div>
          <h2 className="font-retro text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tighter">
            Keahlian Saya
          </h2>
        </div>
      </div>

      {/* Asymmetric Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Skill Cards (8 Cols on Desktop) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.id}
              custom={catIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              className="bg-zinc-900 border-4 border-black p-6 flex flex-col justify-between shadow-[8px_8px_0px_0px_#000] relative overflow-hidden group"
            >
              {/* Header Kategori */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-6 border-b-2 border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 ${cat.colorClass} border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000] shrink-0`}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <span className="font-pixel text-[8px] text-zinc-500 uppercase tracking-widest block">
                        CATEGORY
                      </span>
                      <h3 className="font-retro text-2xl font-extrabold text-white uppercase tracking-tight leading-none">
                        {cat.label}
                      </h3>
                    </div>
                  </div>
                  <span className="font-pixel text-[8px] bg-zinc-950 text-zinc-400 px-2 py-1 border border-zinc-800 font-bold">
                    {cat.badge}
                  </span>
                </div>

                {/* Daftar Item Keahlian */}
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setActiveHoverSkill(skill.name)}
                      onMouseLeave={() => setActiveHoverSkill(null)}
                      className="p-2 border border-transparent hover:border-zinc-800 hover:bg-zinc-950/60 transition-all rounded-none"
                    >
                      {/* Label & Level Badge */}
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-pixel text-[9.5px] text-zinc-200 uppercase tracking-wide font-bold flex items-center gap-1.5">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-zinc-500">
                            {skill.exp}
                          </span>
                          <span
                            className={`font-pixel text-[7.5px] px-1.5 py-0.5 border border-black font-bold uppercase ${
                              activeHoverSkill === skill.name
                                ? `${cat.colorClass} text-black`
                                : "bg-zinc-950 text-zinc-400"
                            }`}
                          >
                            {skill.levelTag}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Brutalist Block */}
                      <div className="w-full h-2.5 bg-zinc-950 border border-zinc-800 relative overflow-hidden">
                        <motion.div
                          custom={skill.level}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={barVariants}
                          className={`absolute left-0 top-0 h-full ${cat.colorClass} border-r border-black`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Side Bento Card: Tools & Engineering Practices (4 Cols) */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          className="lg:col-span-4 bg-zinc-900 border-4 border-black p-6 flex flex-col justify-between shadow-[8px_8px_0px_0px_#000] relative"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-6 border-b-2 border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000] shrink-0 text-black">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-pixel text-[8px] text-zinc-500 uppercase tracking-widest block">
                    ECOSYSTEM
                  </span>
                  <h3 className="font-retro text-2xl font-extrabold text-white uppercase tracking-tight leading-none">
                    Tools & Utilities
                  </h3>
                </div>
              </div>
            </div>

            <p className="font-sans text-xs text-zinc-400 mb-6 leading-relaxed">
              Peralatan kerja dan workflow sehari-hari yang digunakan untuk
              menjamin efisiensi pengembangan dan kebersihan arsitektur kode.
            </p>

            {/* Tool Chips Grid */}
            <div className="flex flex-wrap gap-2">
              {toolsList.map((tool) => (
                <div
                  key={tool}
                  className="bg-zinc-950 border-2 border-black px-3 py-2 font-pixel text-[8.5px] text-zinc-300 uppercase tracking-wider font-bold shadow-[2px_2px_0px_0px_#000] hover:bg-han-green hover:text-black transition-colors"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
