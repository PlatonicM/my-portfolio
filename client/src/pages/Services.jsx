import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceCalculatorModal from '../components/ServiceCalculatorModal';

const SERVICES_LIST = [
  {
    id: 'ai-agents',
    title: 'AI Agent Systems & Workflow Automation',
    tag: 'Agentic AI & PyTorch',
    icon: '🤖',
    desc: 'Custom multi-agent workflows, autonomous task runners, and LLM integrations fine-tuned for high precision.',
    features: [
      'Multi-Agent System Design (AgentForge)',
      'Custom LLM Prompting & API Integration',
      'Automated Task Execution & Monitoring',
      'Fine-Tuning & Vector Store Retrieval (RAG)',
    ],
    projects: ['Agentforge', 'Exam_Forge', 'ai-growth-engine'],
  },
  {
    title: 'Full-Stack Web Applications',
    tag: 'MERN & Vite',
    icon: '💻',
    desc: 'End-to-end full-stack development with modern React/Vite frontends and scalable Express/MongoDB backends.',
    features: [
      'Responsive Dark-Mode UI (TailwindCSS)',
      'RESTful API Architecture & Authentication',
      'Real-Time MongoDB Persistence & Fallbacks',
      'Production Deployment & CI/CD Setup',
    ],
    projects: ['Vegee', 'FreshVegee', 'SugarRush'],
  },
  {
    title: 'Web Scraping & Data Extraction Engines',
    tag: 'Puppeteer & Python',
    icon: '🕷️',
    desc: 'High-speed, resilient web scraping pipelines capable of scraping Amazon, e-commerce stores, and complex dynamic sites.',
    features: [
      'Automated Headless Browser Control',
      'Proxy Rotation & Anti-Bot Bypass',
      'Structured JSON & Database Storage',
      'Scheduled Scraping Jobs & Alerts',
    ],
    projects: ['amazon-scraper', 'ai-growth-engine'],
  },
  {
    title: 'ATS & Career Technology Suite',
    tag: 'Resume AI',
    icon: '📄',
    desc: 'Intelligent resume matching, PDF parsing, skill extraction, and career optimization engines.',
    features: [
      'Keyword Match & Match Rate Scoring',
      'PDF Resume Data Extraction',
      'Single-Page Responsive PDF Generators',
      'Interactive Candidate Filtering',
    ],
    projects: ['ATS-Resume-Builder', 'Mentor'],
  },
];

const WORKFLOW_STEPS = [
  { num: '01', title: 'Requirement Discovery', desc: 'Detailed discussion of project scope, target tech stack, and goals.' },
  { num: '02', title: 'Architecture & Prototype', desc: 'Designing database models, API schemas, and interactive UI wireframes.' },
  { num: '03', title: 'Agile Engineering', desc: 'Clean coding, unit testing, integration of AI/scraping logic, and optimization.' },
  { num: '04', title: 'Deployment & Support', desc: 'Deploying to cloud servers (Vercel/Render/AWS) with documentation & handover.' },
];

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12"
    >
      <ServiceCalculatorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block shadow-md">
          Engineering Solutions
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Services & Specialized Capabilities
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
          High-performance software engineering services spanning AI agent development, full-stack MERN web applications, automated scraping pipelines, and ATS career technology.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            🧮 Launch Interactive Quote Estimator
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES_LIST.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 hover:border-amber-400/50 shadow-2xl space-y-5 flex flex-col justify-between transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl p-3.5 rounded-2xl bg-slate-950 border border-slate-800">{service.icon}</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  {service.tag}
                </span>
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{service.desc}</p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Key Deliverables:</span>
                <ul className="space-y-1.5">
                  {service.features.map((feat) => (
                    <li key={feat} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="text-amber-400 font-bold">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Repos:</span>
                {service.projects.map((p) => (
                  <span key={p} className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] font-mono">
                    {p}
                  </span>
                ))}
              </div>

              <Link
                to="/contact"
                className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                Inquire →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Engineering Workflow Steps */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/30 shadow-2xl space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase">Proven Methodology</span>
          <h2 className="text-2xl font-black text-white">How We Build Solutions Together</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW_STEPS.map((step) => (
            <div key={step.num} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative">
              <span className="text-2xl font-black text-amber-400/40 font-mono block">{step.num}</span>
              <h4 className="text-sm font-black text-white">{step.title}</h4>
              <p className="text-xs text-slate-400 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <div className="p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-2xl font-black text-white">Have a Project or Role in Mind?</h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            Let’s discuss your technical requirements and turn your vision into production-ready software.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-slate-950 text-amber-400 border border-amber-400/40 hover:bg-slate-800 text-xs font-mono font-bold transition cursor-pointer"
          >
            Estimate Cost
          </button>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition"
          >
            Contact Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
