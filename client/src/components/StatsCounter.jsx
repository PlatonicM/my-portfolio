import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCounter() {
  const stats = [
    { label: 'Production Projects', value: '10+', icon: '🚀', highlight: 'Full-Stack & AI Systems' },
    { label: 'Engineering Experience', value: '2+ Yrs', icon: '⚡', highlight: 'Python, React & Next.js' },
    { label: 'API Latency Reduced', value: '35%', icon: '📈', highlight: 'FastAPI & Redis Caching' },
    { label: 'ATS Match Accuracy', value: '100%', icon: '🎯', highlight: 'Structured Document Intelligence' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 shadow-xl backdrop-blur-md flex flex-col justify-between group transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{stat.icon}</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
              Verified Metric
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-4xl font-black text-white group-hover:text-amber-400 transition tracking-tight">
              {stat.value}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-200 mt-1">{stat.label}</p>
            <p className="text-[11px] text-amber-300/80 font-mono mt-1">{stat.highlight}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
