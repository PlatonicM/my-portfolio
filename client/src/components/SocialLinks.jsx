import React, { useState } from 'react';

export default function SocialLinks({ links, className = '' }) {
  const [copiedLabel, setCopiedLabel] = useState(null);

  const defaultLinks = [
    {
      label: 'Email',
      value: 'mrunalchaudhari666@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mrunalchaudhari666@gmail.com',
      icon: '✉️',
    },
    {
      label: 'LinkedIn',
      value: 'mrunal-chaudhari03',
      href: 'https://linkedin.com/in/mrunal-chaudhari03',
      icon: '💼',
    },
    {
      label: 'GitHub',
      value: 'PlatonicM',
      href: 'https://github.com/PlatonicM',
      icon: '💻',
    },
    {
      label: 'Naukri',
      value: 'Naukri Profile',
      href: 'https://www.naukri.com/mnjuser/homepage',
      icon: '📄',
    },
    {
      label: 'Instagram',
      value: 's.o.n.u03',
      href: 'https://instagram.com/s.o.n.u03',
      icon: '📸',
    },
    {
      label: 'WhatsApp',
      value: '+91 7030087366',
      href: 'https://wa.me/917030087366',
      icon: '💬',
    },
    {
      label: 'Phone',
      value: '+91 7030087366',
      href: 'tel:+917030087366',
      icon: '📞',
    },
  ];

  const itemsToRender = links && links.length > 0 ? links : defaultLinks;

  const handleCopy = (e, val, label) => {
    e.stopPropagation();
    navigator.clipboard.writeText(val);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {itemsToRender.map((l) => {
        const isEmail = l.label?.toLowerCase().includes('email') || l.href?.includes('gmail') || l.href?.includes('mailto');
        const directHref = isEmail
          ? 'https://mail.google.com/mail/?view=cm&fs=1&to=mrunalchaudhari666@gmail.com'
          : l.href;

        return (
          <div
            key={l.label}
            className="group relative flex items-center bg-slate-900 border border-amber-400/30 hover:border-amber-400 rounded-2xl p-1.5 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            {/* Direct Open Link */}
            <a
              href={directHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-bold text-slate-100 hover:text-amber-300 transition"
              title={isEmail ? 'Open directly in Gmail Web' : `Open ${l.label}`}
            >
              <span className="text-base">{l.icon || '🔗'}</span>
              <span>
                <strong className="text-amber-400 font-extrabold">{l.label}:</strong> {l.value}
              </span>
            </a>

            {/* Copy Button */}
            <button
              onClick={(e) => handleCopy(e, l.value || l.href, l.label)}
              className="ml-1 px-2.5 py-1 text-[10px] font-mono font-bold bg-slate-950 text-slate-300 hover:text-amber-400 border border-slate-800 hover:border-amber-400/40 rounded-xl transition flex items-center gap-1"
              title={`Copy ${l.label}`}
            >
              {copiedLabel === l.label ? (
                <span className="text-emerald-400 font-black">✓ Copied</span>
              ) : (
                <span>📋</span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

