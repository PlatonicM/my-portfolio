import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../hooks/useResume';
import PdfViewerModal from '../components/PdfViewerModal';
import CelebrationToast from '../components/CelebrationToast';
import { addExperienceApi, deleteExperienceApi, addProjectApi, deleteProjectApi } from '../api/client';

const categoryIcons = {
  Languages: '💻',
  Frontend: '🎨',
  Backend: '⚙️',
  Databases: '🗄️',
  'Tools & Cloud': '☁️',
  'AI Tools': '🤖',
};

export default function Resume() {
  const { data: resume, loading } = useResume();
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [newExp, setNewExp] = useState({ company: '', role: '', period: '', location: '', pointInput: '' });
  const [newProject, setNewProject] = useState({ name: '', subtitle: '', desc: '', stackInput: '', link: '', github: '' });
  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-amber-400">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold">Loading Official Resume...</p>
      </div>
    );
  }

  const { profile, skills, experience, projects, education } = resume || {};

  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!newExp.company || !newExp.role) return;

    const points = newExp.pointInput ? newExp.pointInput.split('\n').filter(Boolean) : [];
    const payload = { ...newExp, points };

    try {
      await addExperienceApi(payload);
      setToast({
        show: true,
        title: '🎉 Experience Added!',
        message: `Successfully added ${newExp.role} at ${newExp.company} to resume database!`,
      });
      setNewExp({ company: '', role: '', period: '', location: '', pointInput: '' });
      window.location.reload();
    } catch (err) {
      setToast({ show: true, title: 'Error', message: 'Failed to add experience.' });
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await deleteExperienceApi(id);
      setToast({ show: true, title: 'Deleted', message: 'Experience item deleted.' });
      window.location.reload();
    } catch (err) {
      setToast({ show: true, title: 'Error', message: 'Failed to delete experience.' });
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.name) return;

    const stack = newProject.stackInput ? newProject.stackInput.split(',').map((s) => s.trim()) : [];
    const payload = { ...newProject, stack };

    try {
      await addProjectApi(payload);
      setToast({
        show: true,
        title: '🎉 Project Added to Resume!',
        message: `Successfully added ${newProject.name} project!`,
      });
      setNewProject({ name: '', subtitle: '', desc: '', stackInput: '', link: '', github: '' });
      window.location.reload();
    } catch (err) {
      setToast({ show: true, title: 'Error', message: 'Failed to add project.' });
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProjectApi(id);
      setToast({ show: true, title: 'Deleted', message: 'Project item removed.' });
      window.location.reload();
    } catch (err) {
      setToast({ show: true, title: 'Error', message: 'Failed to delete project.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10"
    >
      <CelebrationToast
        show={toast.show}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl="/resume.pdf"
        resumeData={resume}
        title={`${profile?.name || 'Mrunal Chaudhari'} - Official Resume.pdf`}
      />

      {/* Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-400/40 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-widest inline-block mb-2 shadow-sm">
            Curriculum Vitae
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {profile?.name || 'Mrunal A. Chaudhari'}
          </h1>
          <p className="text-amber-400 font-extrabold text-base mt-1">
            {profile?.title || 'Software Engineer | Full-Stack Developer'}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200 font-mono mt-3 font-semibold">
            <span>📍 {profile?.location}</span>
            <span>✉️ {profile?.email}</span>
            <span>📞 {profile?.phone}</span>
          </div>
        </div>

        {/* Action Controls - Prominent Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Direct System File Download Button */}
          <a
            href="/resume.pdf"
            download="Mrunal_Chaudhari_Resume.pdf"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-black text-xs sm:text-sm border-2 border-amber-400/50 shadow-md transition flex items-center justify-center gap-2"
            title="Download PDF directly into system"
          >
            <span>📥</span> Download PDF
          </a>

          {/* Single View Modal Launcher Button */}
          <button
            onClick={() => setIsPdfOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-amber-500/30 transition flex items-center justify-center gap-2"
            title="Open Single View Document Modal"
          >
            <span>📄</span> View Resume
          </button>

          {/* CRUD Mode Button */}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`w-full sm:w-auto px-4 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold border transition flex items-center justify-center gap-2 ${
              editMode
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-slate-950 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>{editMode ? '✕ Exit Edit Mode' : '✏️ Edit Resume'}</span>
          </button>
        </div>
      </div>

      {editMode && (
        <div className="p-4 rounded-2xl bg-amber-400/20 border border-amber-400 text-amber-200 text-xs sm:text-sm font-bold flex items-center justify-between shadow-md">
          <span>⚡ Resume Mode Active: Add or delete entries</span>
        </div>
      )}

      {/* Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-xl">
        <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-3">
          Professional Summary
        </h3>
        <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-normal">
          {profile?.summary}
        </p>
      </div>

      {/* High Contrast Technical Skills */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-xl space-y-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2 border-b-2 border-amber-400 pb-3">
          <span className="text-amber-400">⚡</span> Technical Skills & Stack
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills &&
            Object.entries(skills).map(([category, items]) => (
              <div key={category} className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-400/30 shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{categoryIcons[category] || '⚡'}</span>
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">{category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(items) &&
                    items.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 text-white border border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Experience */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-xl space-y-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2 border-b-2 border-amber-400 pb-3">
          <span className="text-amber-400">💼</span> Experience
        </h3>

        {editMode && (
          <form onSubmit={handleAddExperience} className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-400/40 space-y-4">
            <h4 className="text-xs font-black text-amber-400 uppercase">Add New Experience Entry</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Company Name *"
                value={newExp.company}
                onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                required
              />
              <input
                type="text"
                placeholder="Role / Title *"
                value={newExp.role}
                onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                required
              />
              <input
                type="text"
                placeholder="Period (e.g. Sept 2024 - Aug 2026)"
                value={newExp.period}
                onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
              />
              <input
                type="text"
                placeholder="Location (e.g. Faridabad, Haryana)"
                value={newExp.location}
                onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
              />
            </div>
            <textarea
              placeholder="Bullet points (one per line)..."
              value={newExp.pointInput}
              onChange={(e) => setNewExp({ ...newExp, pointInput: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs h-20"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition"
            >
              + Save Experience Entry
            </button>
          </form>
        )}

        <div className="space-y-6">
          {experience?.map((exp, index) => (
            <div key={exp.id || index} className="p-6 rounded-2xl bg-slate-950 border border-amber-400/20 space-y-3 relative">
              {editMode && (
                <button
                  onClick={() => handleDeleteExperience(exp.id || exp._id)}
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white text-xs font-bold transition"
                >
                  ✕ Delete
                </button>
              )}

              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-lg font-black text-white">{exp.role}</h4>
                  <p className="text-amber-400 text-sm font-bold">{exp.company}</p>
                </div>
                <div className="text-right text-xs font-mono font-bold text-slate-200">
                  <div>🗓️ {exp.period}</div>
                  <div>📍 {exp.location}</div>
                </div>
              </div>

              <ul className="space-y-2 pt-2">
                {exp.points?.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 font-medium">
                    <span className="text-amber-400 font-bold shrink-0">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-xl space-y-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2 border-b-2 border-amber-400 pb-3">
          <span className="text-amber-400">🚀</span> Projects
        </h3>

        {editMode && (
          <form onSubmit={handleAddProject} className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-400/40 space-y-4">
            <h4 className="text-xs font-black text-amber-400 uppercase">Add New Project Entry</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Project Name *"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                required
              />
              <input
                type="text"
                placeholder="Subtitle / Tagline"
                value={newProject.subtitle}
                onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
              />
            </div>
            <textarea
              placeholder="Description..."
              value={newProject.desc}
              onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs h-20"
            />
            <input
              type="text"
              placeholder="Tech stack (comma-separated)"
              value={newProject.stackInput}
              onChange={(e) => setNewProject({ ...newProject, stackInput: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition"
            >
              + Save Project Entry
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects?.map((proj, idx) => (
            <div key={proj.id || idx} className="p-6 rounded-2xl bg-slate-950 border border-amber-400/20 flex flex-col justify-between relative">
              {editMode && (
                <button
                  onClick={() => handleDeleteProject(proj.id || proj._id)}
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white text-xs font-bold transition"
                >
                  ✕ Delete
                </button>
              )}

              <div>
                <h4 className="text-lg font-black text-white">{proj.name}</h4>
                <p className="text-xs text-amber-400 font-bold mb-3">{proj.subtitle}</p>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed mb-4">{proj.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                {proj.stack?.map((s, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-900 text-amber-300 border border-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      {education && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-xl">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2 border-b-2 border-amber-400 pb-3">
            <span className="text-amber-400">🎓</span> Education
          </h3>
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-400/20 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-base font-black text-white">{education.degree}</h4>
              <p className="text-amber-400 text-sm font-bold">{education.school}</p>
              <p className="text-xs font-mono text-slate-200 mt-1">{education.location}</p>
            </div>
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
              {education.period}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
