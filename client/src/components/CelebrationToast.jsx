import React, { useEffect, useRef } from 'react';

export function fireConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#34d399', '#fbbf24'];
  const particles = Array.from({ length: 90 }, () => ({
    x: width / 2 + (Math.random() - 0.5) * 200,
    y: height / 2 + (Math.random() - 0.5) * 100,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -12 - 4,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    vRot: (Math.random() - 0.5) * 10,
    opacity: 1,
  }));

  let frame;
  const startTime = Date.now();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const elapsed = Date.now() - startTime;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravity
      p.rotation += p.vRot;
      if (elapsed > 1800) p.opacity -= 0.03;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (elapsed < 3000 && particles.some((p) => p.opacity > 0)) {
      frame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }
  }

  animate();
}

export default function CelebrationToast({
  show = false,
  title = 'Success!',
  message = 'Action completed successfully.',
  type = 'success',
  onClose,
}) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (show) {
      fireConfetti();
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] max-w-md w-full animate-bounce-short">
      <div className="relative overflow-hidden rounded-2xl p-4 bg-slate-900/95 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(56,189,248,0.3)] flex items-start gap-4">
        {/* Glowing border highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500" />

        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 text-xl font-bold shadow-inner">
          🎉
        </div>

        {/* Text */}
        <div className="flex-1 pr-2">
          <h4 className="text-sm font-semibold text-white tracking-wide">{title}</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-lg transition-colors leading-none p-1 rounded-lg hover:bg-slate-800"
          title="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
