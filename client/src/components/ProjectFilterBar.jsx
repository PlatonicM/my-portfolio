import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectFilterBar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  categories = [],
  totalCount = 0,
  filteredCount = 0,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favoritesCount = 0,
}) {
  return (
    <div className="space-y-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Live Search Input */}
        <div className="relative w-full md:w-96">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by tech, keyword, or name..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950 text-white placeholder-slate-400 text-xs sm:text-sm border border-slate-800 focus:border-amber-400 outline-none transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Favorite & Count Summary */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              showFavoritesOnly
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400/50'
            }`}
          >
            <span>{showFavoritesOnly ? '★' : '☆'}</span>
            <span>Saved Favorites</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-black bg-slate-900 text-amber-300">
              {favoritesCount}
            </span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            Showing <strong className="text-amber-400">{filteredCount}</strong> of {totalCount}
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : 'bg-slate-950 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-400/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
