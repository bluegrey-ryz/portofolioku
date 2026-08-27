import React, { useRef, useEffect } from 'react';

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
}

export const InteractiveDots: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Promote canvas to its own GPU layer for smoother compositing
    canvas.style.willChange = 'transform';

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let dots: Dot[] = [];
    const spacing = 55; // distance between dots — larger = fewer dots = better perf

    const initDots = () => {
      dots = [];
      const rows = Math.floor(height / spacing) + 1;
      const cols = Math.floor(width / spacing) + 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          dots.push({
            x: j * spacing,
            y: i * spacing,
            baseX: j * spacing,
            baseY: i * spacing,
            radius: 1.5,
            color: '#a855f7' // purple-500
          });
        }
      }
    };

    initDots();

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    const render = () => {
      // Clear the canvas to be completely transparent so the background image shows through
      ctx.clearRect(0, 0, width, height);
      
      // Batch all dots with same alpha into groups to minimize fillStyle changes
      const INFLUENCE_RADIUS = 120;
      const INFLUENCE_RADIUS_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

      dots.forEach(dot => {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        // Use squared distance — avoids expensive Math.sqrt per dot
        const distSq = dx * dx + dy * dy;

        let targetX = dot.baseX;
        let targetY = dot.baseY;
        let targetRadius = 1.5;
        let alpha = 0.2;

        if (distSq < INFLUENCE_RADIUS_SQ) {
          const distance = Math.sqrt(distSq); // sqrt only when needed (~few dots near cursor)
          const force = (INFLUENCE_RADIUS - distance) / INFLUENCE_RADIUS;
          targetX = dot.baseX - dx * force * 0.3;
          targetY = dot.baseY - dy * force * 0.3;
          targetRadius = 1.5 + force * 2.5;
          alpha = 0.2 + force * 0.6;
        }

        // Ease towards target
        dot.x += (targetX - dot.x) * 0.1;
        dot.y += (targetY - dot.y) * 0.1;
        dot.radius += (targetRadius - dot.radius) * 0.1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(dot.radius, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 43, 226, ${alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
