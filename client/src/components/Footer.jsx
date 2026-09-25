import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../hooks/useResume';

export default function Footer() {
  const { data } = useResume();
  const profile = data?.profile || {};
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mrunalchaudhari666@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // const navLinks = [
  //   { label: 'Home', path: '/' },
  //   { label: 'About', path: '/about' },
  //   { label: 'Experience', path: '/experience' },
  //   { label: 'Projects', path: '/projects' },
  //   { label: 'Blog', path: '/blog' },
  //   { label: 'Resume', path: '/resume' },
  //   { label: 'Contact', path: '/contact' },
  // ];

  return (
    <footer className="mt-20 border-t border-amber-400/20 bg-slate-950/95 text-slate-300 py-12 px-4 sm:px-6 relative z-10 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

          {/* Profile & Branding */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 shadow-xl shrink-0">
              <img
                src="/profile.png"
                alt={profile.name || 'Mrunal Chaudhari'}
                className="w-full h-full object-cover rounded-[14px] bg-slate-900"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://ui-avatars.com/api/?name=Mrunal+Chaudhari&background=020617&color=F59E0B';
                }}
              />
            </div>
            <div>
              <h4 className="font-black text-white text-base tracking-tight">
                {profile.name || 'Mrunal  Chaudhari'}
              </h4>
              <p className="text-xs text-amber-400 font-mono font-bold mt-0.5">
                {profile.title || 'Software Engineer | Full-Stack Developer'}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1.5 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Full-Time Roles & AI Contracts</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono font-bold tracking-wide">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>*/}

          {/* Connect & Direct Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            <a
              href={profile.linkedin || "https://linkedin.com/in/mrunal-chaudhari03"}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 hover:border-amber-400 text-amber-400 text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5"
              title="LinkedIn Profile"
            >
              💼 LinkedIn
            </a>
            <a
              href={profile.github || "https://github.com/PlatonicM"}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 hover:border-amber-400 text-amber-400 text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5"
              title="GitHub Portfolio"
            >
              💻 GitHub
            </a>
            <a
              href={profile.naukri || "https://www.naukri.com/mnjuser/homepage"}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 hover:border-amber-400 text-amber-400 text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5"
              title="Naukri Profile"
            >
              📄 Naukri
            </a>
            <a
              href={profile.instagram || "https://instagram.com/s.o.n.u03"}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 hover:border-amber-400 text-amber-400 text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5"
              title="Instagram Profile"
            >
              📸 Instagram
            </a>
            <a
              href={profile.whatsapp || "https://wa.me/917030087366"}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-400 hover:text-slate-950 border border-slate-800 hover:border-emerald-400 text-emerald-400 text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5"
              title="Chat on WhatsApp"
            >
              💬 WhatsApp
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mrunalchaudhari666@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
              title="Open Direct Web Gmail"
            >
              ✉️ Gmail
            </a>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-6 border-t border-slate-900 relative flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
          <p className="text-center font-medium text-slate-400">
            © {new Date().getFullYear()} Mrunal Chaudhari. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="sm:absolute sm:right-0 p-2 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 border border-amber-400/30 transition-all text-xs font-bold"
            title="Back to Top"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}