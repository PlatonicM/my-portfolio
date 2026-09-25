import React from 'react';

const categoryIcons = {
  Languages: '💻',
  Frontend: '🎨',
  Backend: '⚙️',
  Databases: '🗄️',
  'Tools & Cloud': '☁️',
  'AI Tools': '🤖',
};

export default function SinglePageColorResume({ resume }) {
  const profile = resume?.profile || {
    name: 'Mrunal A. Chaudhari',
    title: 'Software Engineer | Full-Stack Developer',
    location: 'Nagpur, Maharashtra',
    email: 'mrunalchaudhari666@gmail.com',
    phone: '+91 7030087366',
    linkedin: 'https://linkedin.com/in/mrunal-chaudhari03',
    github: 'https://github.com/PlatonicM',
  };

  const skills = resume?.skills || {};
  const experience = resume?.experience || [];
  const projects = resume?.projects || [];
  const education = resume?.education || {};

  return (
    <div
      id="single-page-resume"
      className="w-full max-w-4xl mx-auto bg-slate-950 text-slate-100 shadow-2xl rounded-3xl overflow-hidden font-sans border-4 border-amber-400 print:shadow-none print:m-0 print:w-full"
    >
      {/* Executive Top Banner */}
      <div className="bg-slate-900 px-4 sm:px-8 py-5 sm:py-6 border-b-4 border-amber-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="px-3.5 py-1 rounded-full text-[11px] font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block mb-1.5 shadow-sm">
            Executive CV 
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            {profile.name}
          </h1>
          <p className="text-amber-400 font-extrabold text-xs sm:text-base tracking-wide mt-0.5">
            {profile.title}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-slate-200">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-400/40 text-amber-300">
            📍 {profile.location}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-400/40 text-white">
            ✉️ {profile.email}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-400/40 text-amber-300">
            📞 {profile.phone}
          </span>
        </div>
      </div>

      {/* 2-Column Executive Template Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 bg-slate-950">
        {/* Left Sidebar Column (4 Cols) - Height Balanced */}
        <div className="md:col-span-4 p-6 bg-slate-900/90 border-r-2 border-amber-400/30 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Technical Skill Matrix */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest border-b border-amber-400/30 pb-2 flex items-center gap-1.5">
                <span>⚡</span> Technical Skill Matrix
              </h3>

              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">{categoryIcons[category] || '⚡'}</span>
                    <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider">{category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(items) &&
                      items.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-slate-200 border border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Sidebar */}
            {education && (
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-400/30 space-y-2">
                <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                  <span>🎓</span> Education
                </h3>
                <h4 className="text-xs font-black text-white">{education.degree}</h4>
                <p className="text-[11px] text-amber-300 font-bold">{education.school}</p>
                <p className="text-[10px] text-slate-400 font-mono">{education.location} • {education.period}</p>
              </div>
            )}
          </div>

          {/* Bottom Core Competencies (Aligns Left Column with Right Column Bottom) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 mt-auto">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-1 flex items-center gap-1.5">
              <span>⚙️</span> Core Focus
            </h3>
            <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
              Service-Repository Architecture, Microservices, Async Processing, Vector DBs & RAG.
            </p>
          </div>
        </div>

        {/* Right Main Column (8 Cols) */}
        <div className="md:col-span-8 p-6 sm:p-8 space-y-8 bg-slate-950">
          {/* Executive Summary */}
          <div className="p-5 rounded-2xl bg-slate-900 border-l-4 border-amber-400 space-y-1.5 shadow-md">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest">
              Executive Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {profile.summary ||
                'Software Engineer with 2 years of experience building scalable web applications, REST APIs, FastAPI microservices, and RAG document intelligence solutions using Python, Django, Next.js, and React.'}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest border-b-2 border-amber-400 pb-2 flex items-center gap-2">
              <span className="text-amber-400 text-sm">💼</span> Professional Experience
            </h3>

            {experience.map((exp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white">{exp.role}</h4>
                    <p className="text-xs font-black text-amber-400">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black bg-amber-400 text-slate-950 shadow-sm">
                    🗓️ {exp.period}
                  </span>
                </div>

                <ul className="space-y-1.5 pt-1">
                  {exp.points?.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-200 font-medium leading-relaxed">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest border-b-2 border-amber-400 pb-2 flex items-center gap-2">
              <span className="text-amber-400 text-sm">🚀</span> Featured Projects
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-md">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-black text-white">{proj.name}</h4>
                    <span className="text-xs font-bold text-amber-400">{proj.subtitle}</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">{proj.desc}</p>
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800">
                    {proj.stack?.map((s, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-amber-300 border border-slate-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

