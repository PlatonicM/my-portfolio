import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useResume } from '../hooks/useResume';
import { useProjectFilter } from '../hooks/useProjectFilter';
import ProjectFilterBar from '../components/ProjectFilterBar';
import ProjectQuickViewModal from '../components/ProjectQuickViewModal';

export default function Projects() {
  const { data: resume } = useResume();
  const rawProjects = resume?.projects || [];

  const [activeQuickView, setActiveQuickView] = useState(null);

  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProjects,
    favorites,
    toggleFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
  } = useProjectFilter(rawProjects);

  const projectImages = {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10"
    >
      {/* Quick View Drawer Modal */}
      <ProjectQuickViewModal
        project={activeQuickView}
        isOpen={!!activeQuickView}
        onClose={() => setActiveQuickView(null)}
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block shadow-md">
          Featured Engineering Work
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Portfolio Projects
        </h1>
        <p className="text-slate-200 text-base font-medium">
          Filter by category, search by keyword, save your favorites, or click for full architecture breakdowns.
        </p>
      </div>

      {/* Interactive Filter Control Bar */}
      <ProjectFilterBar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        totalCount={rawProjects.length}
        filteredCount={filteredProjects.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        favoritesCount={favorites.length}
      />

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-3xl">🔍</span>
          <h3 className="text-lg font-bold text-white">No Matching Projects Found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search query or switching selected categories.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setShowFavoritesOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj, idx) => {
            const projectSlug = proj.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const imageSrc =
              projectImages[proj.name] ||
              proj.image ||
              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';
            const isFav = favorites.includes(proj.name);

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="group rounded-3xl bg-slate-900 border-2 border-slate-800 hover:border-amber-400 p-6 sm:p-8 shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Banner */}
                  <div className="h-56 rounded-2xl overflow-hidden mb-6 relative">
                    <img
                      src={imageSrc}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(proj.name);
                      }}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition shadow-lg border ${
                        isFav
                          ? 'bg-amber-400 text-slate-950 border-amber-400 scale-110'
                          : 'bg-slate-950/80 text-amber-300 border-amber-400/40 hover:scale-105'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      {isFav ? '★' : '☆'}
                    </button>

                    <button
                      onClick={() => setActiveQuickView({ ...proj, image: imageSrc })}
                      className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-950 text-amber-400 border border-amber-400/40 hover:bg-amber-400 hover:text-slate-950 transition"
                    >
                      ⚡ Quick View
                    </button>
                  </div>

                  <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition mb-1">
                    {proj.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-400 mb-3">{proj.subtitle}</p>
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal mb-6">{proj.desc}</p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.stack?.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-950 text-amber-300 border border-amber-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Dual Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setActiveQuickView({ ...proj, image: imageSrc })}
                      className="py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-400/40 transition shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>⚡</span> Quick View
                    </button>

                    <Link
                      to={`/projects/${projectSlug}`}
                      className="py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs text-center shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <span>🔍</span> Full Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

