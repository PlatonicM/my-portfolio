import { useEffect, useRef } from 'react';

export default function Background3D() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf, w, h;
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.003, dy: (Math.random() - 0.5) * 0.003,
    }));

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d, i) => {
        d.x += d.dx; d.y += d.dy;
        if (d.x < 0 || d.x > 1) d.dx *= -1;
        if (d.y < 0 || d.y > 1) d.dy *= -1;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? '#eab30833' : i % 3 === 1 ? '#a7f3d033' : '#2563eb22';
        ctx.fill();
        dots.slice(i + 1).forEach((d2) => {
          const dist = Math.hypot(d.x - d2.x, d.y - d2.y);
          if (dist < 0.15) {
            ctx.strokeStyle = `rgba(167,243,208,${0.15 - dist})`;
            ctx.beginPath();
            ctx.moveTo(d.x * w, d.y * h);
            ctx.lineTo(d2.x * w, d2.y * h);
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-forest-dark via-forest to-forest-dark" />
      <canvas ref={ref} className="fixed inset-0 -z-10 opacity-60" />
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl -z-10 animate-float" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '4s' }} />
    </>
  );
}
