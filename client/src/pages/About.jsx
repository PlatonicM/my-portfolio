import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedAvatar from '../components/AnimatedAvatar';
import { useResume } from '../hooks/useResume';

const categoryIcons = {
  Languages: '💻',
  Frontend: '🎨',
  Backend: '⚙️',
  Databases: '🗄️',
  'Tools & Cloud': '☁️',
  'AI Tools': '🤖',
};

export default function About() {
  const { data: resume } = useResume();
  const profile = resume?.profile || {
    name: 'Mrunal A. Chaudhari',
    title: 'Software Engineer | Full-Stack Developer',
    location: 'Nagpur, Maharashtra',
    email: 'mrunalchaudhari666@gmail.com',
    phone: '+91 7030087366',
  };
  const skills = resume?.skills || {};

  const architecturalPillars = [
    {
      icon: '🏗️',
      title: 'Modular Architecture',
      desc: 'Building layered software systems with Service, Repository, and Storage-Adapter layers for clean separation of concerns and maintainability.',
    },
    {
      icon: '🚀',
      title: 'High-Performance APIs',
      desc: 'Architecting fast, async REST microservices with FastAPI & Django DRF, achieving 35%+ reduction in latency via query indexing.',
    },
    {
      icon: '🤖',
      title: 'AI & RAG Intelligence',
      desc: 'Developing enterprise Retrieval-Augmented Generation (RAG) pipelines, document processing (OCR), semantic search, and AI agents.',
    },
    {
      icon: '🔐',
      title: 'Security & Access Control',
      desc: 'Implementing JWT authentication, Role-Based Access Control (RBAC), and encrypted token management across multi-tenant SaaS environments.',
    },
    {
      icon: '🗄️',
      title: 'Database Architecture',
      desc: 'Designing relational schemas in PostgreSQL & NoSQL stores in MongoDB with Redis caching for scalable, high-concurrency access.',
    },
    {
      icon: '☁️',
      title: 'Cloud Storage & DevOps',
      desc: 'Integrating AWS S3 asset retrieval, Docker containerization, Celery task queues, and automated CI/CD workflows.',
    },
  ];

  const impactMetrics = [
    { stat: '2+ Yrs', label: 'Hands-on Engineering Experience' },
    { stat: '40%', label: 'Indexing Throughput Boost via FastAPI' },
    { stat: '35%', label: 'API Latency Reduction via DB Optimization' },
    { stat: '100%', label: 'Secure RBAC & JWT Implementation' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12"
    >
      {/* Executive Bio Header Card */}
      <section className="p-5 sm:p-12 rounded-3xl bg-slate-900 border-2 border-amber-400/40 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center gap-8 sm:gap-10">
        <div className="shrink-0">
          <AnimatedAvatar
            src="/profile.png"
            alt={profile.name}
            size="w-48 h-48 sm:w-64 sm:h-64"
            statusText="Software Engineer • 2 Yrs Exp"
          />
        </div>

        <div className="space-y-5 text-center lg:text-left flex-1 w-full">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block shadow-md">
              Executive Profile
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-950 text-amber-300 border border-amber-400/40">
              Insightful Mentoring Network
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Engineering High-Performance <span className="text-amber-400">Web, API & AI Systems</span>
          </h1>

          <p className="text-slate-100 text-sm sm:text-lg leading-relaxed font-medium">
            I’m <strong className="text-amber-300 font-bold">Mrunal A. Chaudhari</strong>, a Software Engineer & Full-Stack Developer with 2 years of hands-on experience building scalable web applications, REST APIs, business platforms, and AI-powered solutions using Python, Django, Django REST Framework, FastAPI, Next.js, React, and TypeScript.
          </p>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal border-l-4 border-amber-400 pl-4 bg-slate-950/60 py-3 rounded-r-xl text-left">
            Experienced in backend development, API integration, authentication and authorization, database optimization, asynchronous processing, cloud storage (AWS S3), AI/LLM applications, RAG document intelligence, and workflow automation.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-2 text-xs font-mono">
            <span className="px-3.5 py-2 rounded-xl bg-slate-950 text-amber-400 border border-amber-400/40 font-black shadow-md flex items-center gap-1.5">
              <span>📍</span> {profile.location}
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-950 text-white border border-slate-700 font-bold shadow-md flex items-center gap-1.5 truncate max-w-full">
              <span>✉️</span> {profile.email}
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-950 text-amber-300 border border-slate-700 font-bold shadow-md flex items-center gap-1.5">
              <span>📞</span> {profile.phone}
            </span>
          </div>

          {/* Action Navigation Bar */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 w-full">
            <Link
              to="/projects"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>🚀</span> Explore Featured Projects
            </Link>
            <Link
              to="/experience"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 border border-amber-400/50 font-black text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <span>💼</span> View Experience Details
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Impact Metrics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactMetrics.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900 border border-amber-400/30 text-center space-y-1 shadow-xl hover:border-amber-400 transition"
          >
            <h3 className="text-2xl sm:text-4xl font-black text-amber-400 font-mono">{item.stat}</h3>
            <p className="text-xs font-bold text-slate-200">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Architectural Capabilities Section */}
      <section className="p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest font-mono">
            Core Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <span>⚙️</span> Software Engineering & Architectural Pillars
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-3xl">
            My engineering methodology focuses on building resilient, modular, and maintainable software systems optimized for performance and rapid business iteration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architecturalPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/60 shadow-lg space-y-3 transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-2xl group-hover:bg-amber-400 group-hover:text-slate-950 transition">
                {pillar.icon}
              </div>
              <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Technical Skill Matrix */}
      <section className="p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-400 pb-4">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="text-amber-400 text-3xl">⚡</span> Comprehensive Skill Matrix
          </h2>
          <span className="text-xs font-mono font-bold text-amber-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-400/30">
            6 Specialized Domains
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="p-6 rounded-2xl bg-slate-950 border-2 border-amber-400/30 hover:border-amber-400 shadow-lg space-y-4 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{categoryIcons[category] || '⚡'}</span>
                <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(items) &&
                  items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 text-white border border-slate-700 hover:border-amber-400/60 hover:text-amber-300 shadow-sm transition"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Academic Background */}
      <section className="p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block">
            Academic Background
          </span>
          <h3 className="text-xl font-black text-white">Bachelor of Computer Application (BCA)</h3>
          <p className="text-xs font-bold text-amber-400">Prerna College Of Commerce (RTMNU) – Nagpur, MH</p>
          <p className="text-xs text-slate-300 font-medium">Graduated: 2019 – 2022 • Core Computer Science & Information Technology</p>
        </div>

        <Link
          to="/resume"
          className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white border border-amber-400/40 font-black text-xs shadow-xl transition shrink-0 flex items-center gap-2"
        >
          <span>📄</span> Open Resume Section
        </Link>
      </section>
    </motion.div>
  );
}

