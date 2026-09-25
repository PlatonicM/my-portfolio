import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../hooks/useResume';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Services', path: '/services' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useResume();
  const name = data?.profile?.name || 'Mrunal Chaudhari';

  return (
    <nav className="fixed top-0 inset-x-0 z-40 px-3 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto rounded-2xl bg-slate-900/95 border-2 border-amber-400/40 backdrop-blur-2xl shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand Logo with Glowing Avatar */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
            <img
              src="/profile.png"
              alt={name}
              className="w-full h-full object-cover rounded-[10px] bg-slate-950"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://ui-avatars.com/api/?name=Mrunal+Chaudhari&background=020617&color=F59E0B';
              }}
            />
          </div>
          <div className="min-w-0">
            <span className="font-black text-white text-sm sm:text-base tracking-tight group-hover:text-amber-400 transition-colors block truncate">
              Mrunal <span className="text-amber-400"> Chaudhari</span>
            </span>
            <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-amber-400 font-mono -mt-0.5 font-bold truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              Software Engineer • 2 Yrs Exp
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wide transition-all duration-300 ${isActive
                    ? 'text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 font-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/90'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Button & Direct Gmail Link */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mrunalchaudhari666@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 text-amber-400 border border-amber-400/40 hover:bg-slate-800 text-xs font-mono font-bold transition shadow-sm"
            title="Open Direct Gmail Web Composer"
          >
            <span>✉️</span> Gmail
          </a>

          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs tracking-wider shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>✨</span> Let’s Talk
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-950 text-amber-400 hover:bg-slate-800 border border-amber-400/40 transition font-bold"
            aria-label="Toggle Mobile Menu"
          >
            <span className="text-base">{isOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-slate-900/98 border-2 border-amber-400/40 backdrop-blur-2xl p-4 shadow-2xl space-y-2 max-h-[80vh] overflow-y-auto z-50"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block w-full px-4 py-3 rounded-xl text-xs font-mono font-bold transition-all ${isActive
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-lg'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-amber-400'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-3 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 text-center font-black shadow-md"
            >
              ✨ Let’s Talk
            </Link>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mrunalchaudhari666@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="block w-full px-4 py-3 rounded-xl text-xs font-mono font-bold bg-slate-950 text-amber-400 border border-amber-400/40 text-center"
            >
              ✉️ Gmail
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
