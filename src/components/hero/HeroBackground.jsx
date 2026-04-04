import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function HeroBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const dunesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const initParticles = useCallback((w, h) => {
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.2 - 0.05,
        opacity: Math.random() * 0.5 + 0.1,
        life: Math.random() * 100,
      });
    }
    return particles;
  }, []);

  const initDunes = useCallback((w, h) => {
    return [
      { y: h * 0.65, amplitude: 40, frequency: 0.002, speed: 0.0003, color: 'rgba(139, 111, 71, 0.15)' },
      { y: h * 0.72, amplitude: 35, frequency: 0.003, speed: 0.0005, color: 'rgba(139, 111, 71, 0.12)' },
      { y: h * 0.80, amplitude: 50, frequency: 0.0015, speed: 0.0002, color: 'rgba(139, 111, 71, 0.08)' },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    particlesRef.current = initParticles(w, h);
    dunesRef.current = initDunes(w, h);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particlesRef.current = initParticles(w, h);
      dunesRef.current = initDunes(w, h);
    };

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, w, h);

      // Background gradient
      const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.3, w * 0.8);
      bgGrad.addColorStop(0, '#1a1510');
      bgGrad.addColorStop(0.5, '#0f0d09');
      bgGrad.addColorStop(1, '#050505');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Ambient glow
      const glowX = w * 0.5 + Math.sin(timeRef.current * 0.005) * 100;
      const glowY = h * 0.35 + Math.cos(timeRef.current * 0.003) * 50;
      const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 400);
      glow.addColorStop(0, 'rgba(201, 169, 110, 0.04)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Draw dunes
      dunesRef.current.forEach((dune) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 3) {
          const y = dune.y + 
            Math.sin(x * dune.frequency + timeRef.current * dune.speed) * dune.amplitude +
            Math.sin(x * dune.frequency * 2.5 + timeRef.current * dune.speed * 1.5) * (dune.amplitude * 0.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = dune.color;
        ctx.fill();
      });

      // Draw particles (sand/dust)
      particlesRef.current.forEach((p) => {
        p.x += p.speedX + Math.sin(timeRef.current * 0.01 + p.life) * 0.1;
        p.y += p.speedY;
        p.opacity = 0.1 + Math.sin(timeRef.current * 0.02 + p.life) * 0.15;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 185, 140, ${Math.max(0, p.opacity)})`;
        ctx.fill();
      });

      // Mouse-reactive light
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const mouseGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        mouseGlow.addColorStop(0, 'rgba(201, 169, 110, 0.02)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, w, h);
      }

      // Horizontal light beam
      const beamY = h * 0.45 + Math.sin(timeRef.current * 0.004) * 20;
      const beamGrad = ctx.createLinearGradient(0, beamY - 1, 0, beamY + 1);
      beamGrad.addColorStop(0, 'transparent');
      beamGrad.addColorStop(0.5, 'rgba(201, 169, 110, 0.03)');
      beamGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, beamY - 30, w, 60);

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [initParticles, initDunes]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
