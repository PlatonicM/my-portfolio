import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProjectQuickViewModal({ project, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !project) return null;

  const projectSlug = project.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const handleCopyLink = () => {
    const link = project.github || 'https://github.com/PlatonicM';
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border-2 border-amber-400/50 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Top Banner Image */}
          <div className="h-48 sm:h-64 relative overflow-hidden shrink-0">
            <img
              src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 text-amber-400 hover:text-white border border-amber-400/40 flex items-center justify-center font-black text-sm transition shadow-lg z-10"
            >
              ✕
            </button>

            <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest shadow-md">
              Quick View
            </span>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{project.name}</h2>
              <p className="text-amber-400 font-bold text-xs sm:text-sm mt-1">{project.subtitle}</p>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
              {project.desc}
            </p>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-3">
                Tech Stack & Libraries
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.stack?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-950 text-amber-300 border border-amber-400/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs border border-amber-400/40 transition flex items-center gap-1.5"
                  >
                    <span>💻</span> GitHub Repo
                  </a>
                )}
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-800 transition flex items-center gap-1.5"
                >
                  <span>{copied ? '✅' : '📋'}</span>
                  <span>{copied ? 'Copied Link!' : 'Copy Repo URL'}</span>
                </button>
              </div>

              <Link
                to={`/projects/${projectSlug}`}
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs text-center transition shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>🔍</span> Full Architecture Page →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
