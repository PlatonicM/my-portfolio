import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../hooks/useResume';

export default function Experience() {
  const { data: resume } = useResume();
  const experience = resume?.experience || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block shadow-md">
          Professional Journey
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Work Experience
        </h1>
        <p className="text-slate-200 text-base font-medium">
          Detailed engineering contributions, REST API architectures, and production solutions.
        </p>
      </div>

      {/* Experience List - Visible Cards */}
      <div className="space-y-8">
        {experience.map((job, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/30 shadow-2xl space-y-5"
          >
            {/* Job Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  {job.company}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">{job.role}</h2>
              </div>
              <div className="text-left sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  🗓️ {job.period}
                </span>
                <span className="block text-xs font-mono text-slate-200 font-semibold">📍 {job.location}</span>
              </div>
            </div>

            {/* Bullet Points with High Contrast */}
            <ul className="space-y-3 pt-2">
              {job.points?.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 text-xs mt-0.5 shadow-sm">
                    ✓
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
