import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SERVICE_TYPES = [
  { id: 'ai', name: '🤖 AI & Agentic Workflow Engineering', baseDays: 7, desc: 'AgentForge LLM workflows, custom AI integrations, automated task runners.' },
  { id: 'fullstack', name: '⚛️ Full-Stack Web App Development', baseDays: 5, desc: 'MERN stack / Vite web apps, scalable MongoDB backends, responsive dark mode UI.' },
  { id: 'scraper', name: '🕷️ High-Volume Web Scraping Engine', baseDays: 4, desc: 'Amazon / E-commerce scrapers, data pipelines, proxy handling, API exports.' },
  { id: 'ats', name: '📄 ATS Resume & Portfolio Suite', baseDays: 3, desc: 'Automated resume parser, match scoring engine, PDF generators.' },
];

const COMPLEXITY_LEVELS = [
  { id: 'mvp', name: '🚀 Fast MVP / Prototype', multiplier: 1, text: 'Single feature module, clean architecture, fast turnaround.' },
  { id: 'pro', name: '⚡ Production Suite (Recommended)', multiplier: 1.5, text: 'Full feature set, API integration, database indexing, automated tests.' },
  { id: 'enterprise', name: '👑 Scalable Enterprise System', multiplier: 2.2, text: 'High-scale multi-user architecture, custom CI/CD pipelines, 24/7 monitoring.' },
];

export default function ServiceCalculatorModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(SERVICE_TYPES[0]);
  const [selectedComplexity, setSelectedComplexity] = useState(COMPLEXITY_LEVELS[1]);
  const [needDeployment, setNeedDeployment] = useState(true);

  if (!isOpen) return null;

  const estimatedDays = Math.ceil(selectedService.baseDays * selectedComplexity.multiplier + (needDeployment ? 2 : 0));

  const handleBookNow = () => {
    onClose();
    navigate('/contact', {
      state: {
        subject: `Service Inquiry: ${selectedService.name} (${selectedComplexity.name})`,
        message: `Hello Mrunal,\n\nI calculated an estimate for ${selectedService.name} with ${selectedComplexity.name}.\nDeployment Included: ${needDeployment ? 'Yes' : 'No'}\nEstimated Timeline: ~${estimatedDays} days.\n\nLet's discuss project requirements!`,
      },
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/40 shadow-2xl space-y-6 text-white overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition font-mono text-sm cursor-pointer"
          >
            ✕
          </button>

          {/* Header */}
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block">
              Interactive Estimator
            </span>
            <h3 className="text-xl sm:text-2xl font-black">Project Solution & Timeline Estimator</h3>
            <p className="text-xs text-slate-400">Select requirements to calculate estimated delivery time and stack setup.</p>
          </div>

          {/* Service Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-400 uppercase">1. Select Engineering Solution</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_TYPES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    selectedService.id === service.id
                      ? 'bg-slate-950 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-black text-white">{service.name}</p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{service.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Complexity Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-400 uppercase">2. Select Project Scale & Scope</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {COMPLEXITY_LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedComplexity(level)}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    selectedComplexity.id === level.id
                      ? 'bg-slate-950 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-black text-white">{level.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{level.text}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Deployment Option */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <p className="text-xs font-black text-white">Include Cloud Deployment & Domain Setup</p>
              <p className="text-[11px] text-slate-400">Configure Vercel / Render / AWS deployment & SSL setup.</p>
            </div>
            <input
              type="checkbox"
              checked={needDeployment}
              onChange={(e) => setNeedDeployment(e.target.checked)}
              className="w-5 h-5 accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Summary Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-400/10 via-yellow-400/5 to-amber-500/10 border border-amber-400/40 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400">Estimated Delivery Time</span>
              <p className="text-2xl font-black text-white">~{estimatedDays} Days Turnaround</p>
            </div>
            <button
              onClick={handleBookNow}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition cursor-pointer"
            >
              🚀 Book Solution
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
