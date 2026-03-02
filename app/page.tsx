"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium tracking-wide border border-[#e5e5e5] text-[#666] uppercase leading-none">
      {label}
    </span>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  tags: string[];
  tier: 1 | 2;
  size: "massive" | "medium" | "small" | "wide";
  index?: string;
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sizeClasses: Record<string, string> = {
    massive: "col-span-2 row-span-2 min-h-[420px]",
    medium: "col-span-1 row-span-2 min-h-[320px]",
    small: "col-span-1 row-span-1 min-h-[200px]",
    wide: "col-span-2 row-span-1 min-h-[200px]",
  };

  const tierLabel = project.tier === 1 ? "Professional" : "Experiment";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.012, transition: { duration: 0.25 } }}
      className={`group relative flex flex-col justify-between p-6 border border-[#e5e5e5] bg-white cursor-pointer overflow-hidden ${sizeClasses[project.size]}`}
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 bg-[#f7f7f7] z-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#aaa] font-medium">
            {tierLabel}
          </span>
          <span className="text-[11px] text-[#ccc] font-light tabular-nums">
            {project.index}
          </span>
        </div>

        {/* Middle - grows */}
        <div className="flex-1 flex flex-col justify-end gap-3">
          <h3 className="font-semibold text-[#111] tracking-tight leading-snug text-lg">
            {project.title}
          </h3>
          <p className="text-[13px] text-[#888] leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Arrow on hover */}
      <motion.div
        className="absolute bottom-6 right-6 z-10 text-[#111] opacity-0 group-hover:opacity-100"
        initial={{ x: -4, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: "Vande Bharat Digital Experience",
    description:
      "A high-end, sophisticated mobile application concept for India's premier rail network — blending wayfinding clarity with premium visual language.",
    tags: ["UX/UI", "App Architecture"],
    tier: 1,
    size: "massive",
    index: "01",
  },
  {
    title: "Next-Gen Vehicle HMI",
    description:
      "Complex dashboard and human-machine interface concepts for modern vehicles. Precision at 120 km/h.",
    tags: ["Interface Design", "Automotive"],
    tier: 1,
    size: "medium",
    index: "02",
  },
  {
    title: "Cyberpunk Character Renders",
    description:
      "High-fidelity 3D modeling exploring cyberpunk aesthetics and silhouettes.",
    tags: ["3D Modeling", "Conceptual"],
    tier: 2,
    size: "small",
    index: "03",
  },
  {
    title: "Origami Explorations",
    description:
      "Generated 3D illustrations featuring intricate origami objects and impossible folds.",
    tags: ["3D Illustration", "Prompt Engineering"],
    tier: 2,
    size: "small",
    index: "04",
  },
  {
    title: "AI-Powered UX Systems",
    description:
      "Utilizing AI agents to supercharge UI/UX design workflows and dynamically manipulate design tokens at scale.",
    tags: ["AI Agents", "Design Systems"],
    tier: 1,
    size: "medium",
    index: "05",
  },
  {
    title: "Instagram Follower Cleaner",
    description:
      "A custom-built application to automate the removal of inactive followers. Reclaim your signal-to-noise ratio.",
    tags: ["Full-stack Dev", "Utility"],
    tier: 2,
    size: "wide",
    index: "06",
  },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <motion.nav
      style={{ borderBottomColor: `rgba(229,229,229,${borderOpacity.get()})` }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
    >
      <motion.div
        className="absolute inset-0 bg-white/90 backdrop-blur-sm"
        style={{ opacity: useTransform(scrollY, [0, 60], [0, 1]) }}
      />
      <div className="relative max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[13px] font-semibold tracking-tight text-[#111]"
        >
          Portfolio
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-6"
        >
          {["Work", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] text-[#888] hover:text-[#111] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-white text-[#111] min-h-screen font-sans">
      <Nav />

      {/* ── Hero ── */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-6 pt-36 pb-24 border-b border-[#e5e5e5]"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Status pill */}
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e5e5e5] text-[12px] text-[#888]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for freelance
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-[clamp(44px,7vw,80px)] font-semibold tracking-[-0.04em] leading-[1.02] text-[#111] mb-6"
          >
            UX Designer
            <br />& Developer.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-[17px] text-[#888] leading-relaxed max-w-lg mb-10"
          >
            Bridging complex system architecture with unconstrained creative
            experiments.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap gap-3"
          >
            <motion.a
              href="mailto:hello@example.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111] text-white text-[13px] font-medium rounded-full hover:bg-[#333] transition-colors duration-200"
            >
              Send an Email
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#111] text-[13px] font-medium rounded-full border border-[#e5e5e5] hover:border-[#aaa] transition-colors duration-200"
            >
              LinkedIn
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Decorative numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute right-10 top-36 hidden lg:flex flex-col gap-1 text-right"
        >
          {["06 Projects", "04+ Years", "02 Disciplines"].map((s, i) => (
            <span key={i} className="text-[11px] text-[#ccc] tracking-widest">
              {s}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Work Grid ── */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-20">
        <Reveal className="flex items-baseline justify-between mb-10 border-b border-[#e5e5e5] pb-4">
          <h2 className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#aaa]">
            Selected Work
          </h2>
          <span className="text-[13px] text-[#ccc]">2022 – 2025</span>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Row 1: massive(2col×2row) + medium(1col×2row) */}
          <div className="sm:col-span-2 md:col-span-2 md:row-span-2">
            <ProjectCard project={projects[0]} />
          </div>
          <div className="md:row-span-2">
            <ProjectCard project={projects[1]} />
          </div>

          {/* Row 2 (fills under massive on mobile, next row on md) */}
          <div className="hidden md:block" />
          <div className="hidden md:block" />

          {/* Row 3: small + small + medium */}
          <div>
            <ProjectCard project={projects[2]} />
          </div>
          <div>
            <ProjectCard project={projects[3]} />
          </div>
          <div className="md:row-span-2">
            <ProjectCard project={projects[4]} />
          </div>

          {/* Row 4: wide(2col) + (medium continues) */}
          <div className="sm:col-span-2 md:col-span-2">
            <ProjectCard project={projects[5]} />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="max-w-6xl mx-auto px-6 py-20 border-t border-[#e5e5e5]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Reveal className="md:col-span-1">
            <h2 className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#aaa] mb-6">
              About
            </h2>
            <div className="w-8 h-px bg-[#e5e5e5]" />
          </Reveal>

          <div className="md:col-span-2 space-y-8">
            <Reveal delay={0.1}>
              <p className="text-[17px] text-[#444] leading-[1.7] tracking-[-0.01em]">
                I work at the intersection of design rigor and engineering
                precision. My practice spans mobile products, automotive
                interfaces, and generative experiments — always asking: what
                does this feel like at 60fps?
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-[15px] text-[#888] leading-[1.7]">
                I believe the most memorable products are built from first
                principles — where the constraint is the creative brief. Whether
                I'm mapping user flows for a national rail system or generating
                origami renders at 3am, the discipline is the same: clarity,
                intention, restraint.
              </p>
            </Reveal>

            {/* Currently exploring */}
            <Reveal delay={0.3}>
              <div className="border border-[#e5e5e5] p-6 space-y-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#aaa]">
                  Currently exploring
                </h3>
                <ul className="space-y-2">
                  {[
                    "The economics of average vs. marginal costs",
                    "Wingtip vortices in aviation",
                    "The aerodynamics of the Sukhoi Su-57 Felon",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-start gap-3 text-[14px] text-[#555]"
                    >
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-[#ccc] flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Skills row */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Figma",
                  "Next.js",
                  "Framer",
                  "Blender",
                  "TypeScript",
                  "Tailwind",
                  "React",
                  "Motion",
                ].map((skill) => (
                  <Tag key={skill} label={skill} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e5e5e5] max-w-6xl mx-auto px-6 py-10">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-[#bbb]">
            © {new Date().getFullYear()} — Designed & built with intention.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#888] hover:text-[#111] transition-colors duration-200 flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="mailto:hello@example.com"
              className="text-[12px] text-[#111] font-medium hover:text-[#555] transition-colors duration-200 flex items-center gap-1.5"
            >
              Let's Talk →
            </a>
          </div>
        </Reveal>
      </footer>
    </main>
  );
}
