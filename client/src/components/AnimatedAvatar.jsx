import React, { useState } from 'react';

export default function AnimatedAvatar({
  src = '/profile.png',
  alt = 'Mrunal A. Chaudhari',
  size = 'w-48 h-48 sm:w-60 sm:h-60',
  showStatus = true,
  statusText = 'Available for Full-Time Roles',
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center group select-none">
      {/* Outer ambient glow */}
      <div
        className={`absolute rounded-full blur-2xl transition-all duration-700 ${
          isHovered
            ? 'opacity-90 scale-125 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500'
            : 'opacity-50 scale-100 bg-gradient-to-r from-amber-500/60 to-yellow-500/60'
        } ${size}`}
      />

      {/* Rotating outer dash ring */}
      <div
        className={`absolute rounded-full border-2 border-dashed border-amber-400/50 animate-[spin_12s_linear_infinite] pointer-events-none p-4 ${
          size.includes('w-48') ? 'w-56 h-56 sm:w-72 sm:h-72' : 'w-64 h-64 sm:w-80 sm:h-80'
        }`}
      />

      {/* Reverse rotating gradient ring */}
      <div
        className={`absolute rounded-full border-2 border-gradient bg-gradient-to-tr from-amber-400/30 via-yellow-400/20 to-amber-500/30 animate-[spin_20s_linear_infinite_reverse] pointer-events-none ${
          size.includes('w-48') ? 'w-52 h-52 sm:w-68 sm:h-68' : 'w-60 h-60 sm:w-76 sm:h-76'
        }`}
      />

      {/* Main Round Container */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative rounded-full p-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-2xl transition-transform duration-500 transform ${
          isHovered ? 'scale-105 rotate-1 shadow-amber-400/50' : 'scale-100'
        } ${size}`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-950 relative flex items-center justify-center shadow-inner">
          <img
            src={src}
            alt={alt}
            onError={(e) => {
              // Fallback avatar generator SVG if image missing
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=Mrunal+Chaudhari&background=020617&color=F59E0B&size=256&font-size=0.35&bold=true`;
            }}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-110 brightness-105' : 'scale-100'
            }`}
          />
          {/* Glass reflection shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Orbiting tech particle dots */}
        <div className="absolute -top-1 right-3 w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24] animate-bounce" />
        <div className="absolute -bottom-1 left-3 w-3.5 h-3.5 rounded-full bg-yellow-300 shadow-[0_0_10px_#fde047] animate-pulse" />
      </div>

      {/* Optional Status Pill */}
      {showStatus && (
        <div className="mt-5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/40 backdrop-blur-md text-xs font-mono font-bold text-amber-300 shadow-xl animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          {statusText}
        </div>
      )}
    </div>
  );
}

