import React from 'react';
import { motion } from 'framer-motion';
import TechRadar from '../components/TechRadar';
import { Link } from 'react-router-dom';

const SKILL_HIGHLIGHTS = [
  {
    title: 'AI & Agentic Systems',
    count: '3+ Repos',
    desc: 'Autonomous multi-agent orchestration, LLM prompt engineering, fine-tuning, and PyTorch workflows.',
    icon: '🤖',
  },
  {
    title: 'Full-Stack Web Development',
    count: '5+ Repos',
    desc: 'Vite, React.js, TailwindCSS, Express.js, and MongoDB document database architectures.',
    icon: '⚛️',
  },
  {
    title: 'E-Commerce Scraping & Automation',
    count: '2+ Repos',
    desc: 'High-speed automated data scraping engines with Puppeteer, Cheerio, and proxy management.',
    icon: '🕷️',
  },
  {
    title: 'ATS & Career Tech',
    count: '2+ Repos',
    desc: 'Automated resume parser, match scoring engine, PDF generator, and candidate filter tools.',
    icon: '📄',
  },
];

export default function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12"
    >
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block shadow-md">
          Technical Arsenal
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Skills, Stack & Expertise
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
          Comprehensive breakdown of my core technical stack, proficiency meters, and real-world project applications across Full-Stack, AI Agent Systems, and Web Scraping.
        </p>
      </div>

      {/* Domain Highlight Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SKILL_HIGHLIGHTS.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 shadow-xl space-y-3 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl p-3 rounded-2xl bg-slate-950 border border-slate-800">{item.icon}</span>
              <span className="text-xs font-mono font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/30">
                {item.count}
              </span>
            </div>
            <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Tech Radar Matrix */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-400/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xl">⚡</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">Interactive Tech Stack Radar</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Explore technologies by domain, proficiency score, and project usage.
            </p>
          </div>
          <Link
            to="/projects"
            className="px-4 py-2 rounded-xl bg-slate-950 text-amber-400 border border-amber-400/40 hover:bg-slate-800 text-xs font-mono font-bold transition"
          >
            📂 View Associated Projects →
          </Link>
        </div>

        <TechRadar />
      </section>

      {/* Call to Action Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-400/20 via-yellow-400/10 to-amber-500/20 border-2 border-amber-400/50 text-center space-y-4 shadow-2xl">
        <h3 className="text-2xl font-black text-white">Need a Custom Tech Stack Solution?</h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          Whether you need a high-speed React frontend, an AI-powered multi-agent workflow, or a web scraper engine, I am ready to engineer it.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition transform hover:-translate-y-0.5"
        >
          <span>🚀</span> Start a Technical Project
        </Link>
      </div>
    </motion.div>
  );
}
