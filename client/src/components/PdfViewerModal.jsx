import React, { useState } from 'react';
import SinglePageColorResume from './SinglePageColorResume';

export default function PdfViewerModal({
  isOpen = false,
  onClose,
  resumeData,
  title = 'Mrunal Chaudhari - Official Resume.pdf',
}) {
  const [zoom, setZoom] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 15, 175));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 15, 60));
  const handleResetZoom = () => setZoom(100);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  // Trigger Save as PDF / Print
  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      {/* Viewer Card Container */}
      <div
        className={`bg-slate-900 border-2 border-amber-400/50 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ${
          isFullScreen ? 'w-full h-full rounded-none border-none' : 'w-full max-w-5xl h-[94vh]'
        }`}
      >
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-3 sm:px-4 sm:py-3 bg-slate-900 border-b border-amber-400/30 text-white select-none">
          {/* Back Arrow & Document Title */}
          <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-400 hover:bg-amber-400 hover:text-slate-950 border border-amber-400/40 text-xs font-black transition flex items-center gap-1.5 shadow-md"
              title="Back to Resume Page"
            >
              <span>←</span> Back
            </button>

            <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />

            <div className="min-w-0 flex-1 sm:flex-none">
              <h3 className="text-xs sm:text-sm font-black text-white truncate max-w-[180px] sm:max-w-md">{title}</h3>
              <p className="text-[10px] sm:text-[11px] text-amber-400 font-mono font-bold truncate">
                View • Full DB Sync • {zoom}%
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {/* Direct System Download PDF Button */}
            <a
              href="/resume.pdf"
              download="Mrunal_Chaudhari_Resume.pdf"
              className="px-3 py-1.5 text-xs bg-slate-900 text-amber-300 hover:bg-slate-800 border border-amber-400/40 font-black rounded-xl transition flex items-center gap-1 shadow-sm"
              title="Direct System File Download"
            >
              <span>📥</span> Download
            </a>

            {/* Save as PDF / Print Full Document Button */}
            <button
              onClick={handleDownloadPdf}
              className="px-3.5 py-1.5 text-xs bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black rounded-xl shadow-lg transition flex items-center gap-1"
              title="Save as PDF / Print Full Document"
            >
              <span>🖨️</span> Save PDF
            </button>

            {/* Zoom Controls */}
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="px-2 py-1 text-xs font-bold text-slate-200 hover:text-amber-400 hover:bg-slate-900 rounded-lg disabled:opacity-40 transition"
              title="Zoom Out (-)"
            >
              -
            </button>
            <span className="text-xs font-mono font-bold text-amber-400">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 175}
              className="px-2 py-1 text-xs font-bold text-slate-200 hover:text-amber-400 hover:bg-slate-900 rounded-lg disabled:opacity-40 transition"
              title="Zoom In (+)"
            >
              +
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullScreen}
              className="p-1.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition"
            >
              {isFullScreen ? '📉' : '📈'}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-2.5 py-1.5 text-xs bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white rounded-xl transition font-bold"
            >
              ✕ Exit
            </button>
          </div>
        </div>

        {/* Dedicated Isolated Document View Area */}
        <div className="flex-1 bg-slate-950 overflow-auto p-2 sm:p-8 flex justify-center items-start">
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-4xl transition-transform duration-200"
          >
            <SinglePageColorResume resume={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
