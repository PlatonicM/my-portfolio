import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SKILLS_DATA = [
  { name: 'React.js / Vite', category: 'Full-Stack', level: 95, icon: '⚛️', color: 'from-cyan-400 to-blue-600', description: 'Modern SPA development, custom hooks, state management, framer-motion, TailwindCSS.', projects: ['ATS-Resume-Builder', 'SugarRush', 'FreshVegee'] },
  { name: 'Node.js & Express', category: 'Full-Stack', level: 90, icon: '🟢', color: 'from-emerald-400 to-green-600', description: 'REST APIs, middleware architecture, authentication, rate limiting, MongoDB integration.', projects: ['Mentor', 'Exam_Forge', 'amazon-scraper'] },
  { name: 'Python & AI Engineering', category: 'AI & Agentic', level: 92, icon: '🐍', color: 'from-amber-400 to-yellow-500', description: 'Agentic workflows, prompt engineering, LLM fine-tuning, PyTorch, PySpark, data processing.', projects: ['Agentforge', 'ai-growth-engine', 'Exam_Forge'] },
  { name: 'MongoDB & Mongoose', category: 'Database', level: 88, icon: '🍃', color: 'from-emerald-500 to-teal-700', description: 'Document modeling, aggregation pipelines, real-time sync, indexing, fallback persistence.', projects: ['ATS-Resume-Builder', 'FreshVegee', 'Mentor'] },
  { name: 'Web Scraping & Puppeteer', category: 'Scraping', level: 94, icon: '🕷️', color: 'from-purple-400 to-indigo-600', description: 'High-volume web extraction, proxy rotation, CAPTCHA bypass, headless browser automation.', projects: ['amazon-scraper', 'ai-growth-engine'] },
  { name: 'TailwindCSS & Glassmorphism', category: 'Full-Stack', level: 96, icon: '🎨', color: 'from-sky-400 to-cyan-500', description: 'Custom design systems, responsive dark-mode UIs, micro-animations, premium layouts.', projects: ['ATS-Resume-Builder', 'SugarRush', 'Vegee'] },
  { name: 'PySpark & Data Pipelines', category: 'Data & Cloud', level: 85, icon: '🔥', color: 'from-orange-400 to-rose-600', description: 'Large-scale distributed data processing, ETL automation, dataset transformation.', projects: ['ai-growth-engine'] },
  { name: 'Docker & DevOps', category: 'Data & Cloud', level: 82, icon: '🐳', color: 'from-blue-400 to-indigo-500', description: 'Containerization, environment isolation, deployment automation, GitHub Actions CI/CD.', projects: ['Agentforge', 'amazon-scraper'] },
];

export default function TechRadar() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Full-Stack', 'AI & Agentic', 'Scraping', 'Database', 'Data & Cloud'];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCat = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-amber-400/30">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search technology or framework..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs font-mono focus:border-amber-400 focus:outline-none transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Skill Proficiency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 shadow-xl space-y-3 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800">{skill.icon}</span>
                <div>
                  <h4 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-amber-400/90 uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/30">
                  {skill.level}%
                </span>
              </div>
            </div>

            {/* Proficiency Level Meter Bar */}
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{skill.description}</p>

            {/* Related Projects Tags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Projects:</span>
              {skill.projects.map((proj) => (
                <span
                  key={proj}
                  className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono font-bold"
                >
                  {proj}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
