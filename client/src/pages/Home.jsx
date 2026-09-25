import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedAvatar from '../components/AnimatedAvatar';
import { useResume } from '../hooks/useResume';

import StatsCounter from '../components/StatsCounter';

export default function Home() {
  const { data: resume } = useResume();
  const profile = resume?.profile || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16"
    >
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-4">
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-semibold tracking-wide uppercase shadow-lg">
            <span>✨</span> Full-Stack & AI Engineer
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Hi, I’m <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">{profile.name || 'Mrunal Chaudhari'}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
            {profile.title || 'Software Engineer | Full-Stack Developer'} with 2 years of experience crafting scalable web apps, FastAPI/Django microservices, Next.js UIs, and RAG document intelligence platforms.
          </p>

          {/* Yellow / Amber Theme Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
            <Link
              to="/projects"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm tracking-wide shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>🚀</span> Explore Projects
            </Link>

            <Link
              to="/resume"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-sm border border-amber-400/40 shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>📄</span> Resume View
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-800 transition flex items-center justify-center gap-2"
            >
              Get in Touch →
            </Link>
          </div>
        </div>

        {/* Right Animated Round Avatar */}
        <div className="shrink-0">
          <AnimatedAvatar
            src="/profile.png"
            alt="Mrunal A. Chaudhari"
            statusText="Software Engineer • 2 Yrs Exp"
          />
        </div>
      </section>

      {/* Engineering Stats Metrics */}
      <StatsCounter />

      {/* Featured Projects Highlight */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Projects</h2>
            <p className="text-slate-400 text-sm mt-1">Dive into full architectural breakdowns & stack details.</p>
          </div>
          <Link to="/projects" className="text-sm font-bold text-amber-400 hover:underline">
            View All ({resume?.projects?.length || 5}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(resume?.projects || []).slice(0, 3).map((proj, idx) => {
            const projectSlug = proj.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const images = {
              'ExamForge-AI': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
              'AI-BOS': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
              'ATS-Resume-Builder': 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
              'Mentor': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
              'AgentForge': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
              'FreshVegee': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=80',
              'Amazon-Scraper': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80',
              'SugarRush': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
              'Vegee': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
              'AI-Growth-Engine': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
            };
            const imageSrc = images[proj.name] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 p-5 backdrop-blur-md transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 rounded-xl overflow-hidden mb-4 relative">
                    <img
                      src={imageSrc}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/90 text-amber-300 border border-amber-400/30">
                      {proj.subtitle?.split(' ')[0] || 'Featured'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-amber-400/80 font-semibold mb-2 line-clamp-1">{proj.subtitle}</p>
                  <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                <Link
                  to={`/projects/${projectSlug}`}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs text-center transition shadow-md hover:from-amber-300 flex items-center justify-center gap-1.5"
                >
                  <span>🔍</span> Detail View →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
