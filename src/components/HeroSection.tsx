import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  color: string;
}

interface RoleCard {
  title: string;
  top: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: number;
}

const TECH_STACK: TechItem[] = [
  { name: 'SQL', x: -250, y: -180, z: 50, scale: 1.2, color: 'text-cyan-400' },
  { name: 'MySQL', x: 280, y: -120, z: -20, scale: 1.1, color: 'text-white' },
  { name: 'PHP', x: -280, y: 160, z: 80, scale: 1.3, color: 'text-blue-500' },
  { name: 'Laravel', x: 240, y: 200, z: 30, scale: 1.2, color: 'text-yellow-400' },
  { name: 'Python', x: 0, y: -260, z: -50, scale: 1.0, color: 'text-blue-300' },
];

const ROLE_CARDS: RoleCard[] = [
  { title: 'Data Analyst', top: '15%', left: '8%', delay: 0 },
  { title: 'Software QA', top: '75%', right: '10%', delay: 1 },
  { title: 'Software Developer', top: '30%', right: '5%', delay: 2 },
];


export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const innerTextRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const techRefs = useRef<(HTMLDivElement | null)[]>([]);
  const roleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    // Initial states
    gsap.set(techRefs.current, {
      xPercent: -50,
      yPercent: -50,
      z: -100,
      scale: 0,
      opacity: 0
    });

    // Set initial 3D states for cardRef
    gsap.set(cardRef.current, {
      rotation: -2,
      rotationX: 0,
      transformPerspective: 1000,
      transformStyle: 'preserve-3d'
    });

    // 1. Continuous floating animation for role cards (only on desktop)
    if (!isMobile) {
      roleRefs.current.forEach((ref, index) => {
        gsap.to(ref, {
          y: '+=20',
          rotation: '+=3',
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: ROLE_CARDS[index].delay,
        });
      });
    }

    // 2. ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // Pin for 200vh
        scrub: true, // true instead of 1 removes the artificial delay
        pin: true,
        pinSpacing: true, // Adds 200vh padding below, so Section 2 flows naturally
      },
    });

    // Widen and flip the card container vertically on scroll (no scaleX stretch on mobile)
    tl.to(cardRef.current, {
      scaleX: isMobile ? 1 : 1.25,
      rotationX: 180, // 3D Flip vertically (upwards)
      rotation: 2, // Dynamic positive tilt shift
      ease: 'power2.inOut'
    }, 0);

    // Explode tech stack from center (spread out on mobile to prevent cluttering)
  const MOBILE_POSITIONS = [
  { x: -105, y: -170 }, // SQL
  { x: 105, y: -120 },  // MySQL
  { x: -105, y: 150 },  // PHP
  { x: 105, y: 175 },   // Laravel
  { x: 0, y: -235 },    // Python
];

techRefs.current.forEach((ref, index) => {
  const tech = TECH_STACK[index];

  const targetX = isMobile
    ? MOBILE_POSITIONS[index].x
    : tech.x;

  const targetY = isMobile
    ? MOBILE_POSITIONS[index].y
    : tech.y;

  tl.to(
    ref,
    {
      x: targetX,
      y: targetY,
      z: tech.z,
      scale: isMobile
        ? tech.scale * 0.68
        : tech.scale,
      opacity: 1,
      ease: 'power2.out',
    },
    0
  );
});

    // Final shrink and rise effect for parallax exit (upward escape)
    tl.to(mainContentRef.current, {
      scale: 0.5,
      y: -300, // Move upwards
      opacity: 0,
      ease: 'power2.inOut'
    }, 1.0); // Start at exactly 1.0 on the timeline, perfectly syncing with Section 2 sweeping up

  });

  return (
    <>
      <style>{`
        @keyframes float-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .ambient-blob {
          animation: float-blob 10s ease-in-out infinite;
          will-change: transform;
        }
        .ambient-blob.delay-1 { animation-delay: -2s; }
        .ambient-blob.delay-2 { animation-delay: -5s; }
      `}</style>

      <div ref={containerRef} id="hero" className="relative w-full h-screen overflow-hidden bg-black text-white perspective-1000">
        
        {/* Background Image & Gradient */}
 <div className="absolute inset-0 z-0 overflow-hidden">
  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center">
    <source src="/images/langit.webm" type="video/webm" />
  </video>
  <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e]/60 via-[#10072b]/50 to-[#0a2342]/60 mix-blend-multiply"></div>
  <div className="absolute inset-0 bg-blue-900/10"></div>
</div>


        <div ref={mainContentRef} className="relative z-10 w-full h-full flex items-center justify-center transform-style-3d will-change-transform">
          
          {/* Tech Stack */}
          {TECH_STACK.map((tech, i) => (
            <div
              key={tech.name}
              ref={(el) => { techRefs.current[i] = el; }}
              className={`absolute font-bold text-sm sm:text-lg md:text-2xl opacity-0 ${tech.color} px-3 py-1.5 sm:px-5 sm:py-3 rounded-2xl bg-[#1d0d3a]/90 border border-white/15 shadow-2xl z-20 will-change-transform`}
              style={{ 
                top: '50%', left: '50%'
              }}
            >
              {tech.name}
            </div>
          ))}

          {/* Central Rectangular Card Container */}
          <div 
            ref={cardRef} 
className="relative w-[84vw] max-w-[360px] sm:max-w-none sm:w-[500px] md:w-[750px] lg:w-[900px] h-[90px] sm:h-[130px] md:h-[180px] flex justify-center items-center z-30 pointer-events-none transform-style-3d will-change-transform"          >
            {/* Layer 1: Figma/Vector Edit Bounding Box */}
            <div 
              ref={layer1Ref} 
              className="absolute inset-[-6px] sm:inset-[-10px] md:inset-[-14px] border border-dashed border-purple-400/50 rounded-[1.5rem] sm:rounded-[2.2rem] pointer-events-none origin-center"
            >
              {/* Corner Handles (Resize Dots) */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 md:w-3.5 md:h-3.5 bg-purple-500 border border-white rounded-[2px]" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 md:w-3.5 md:h-3.5 bg-purple-500 border border-white rounded-[2px]" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 md:w-3.5 md:h-3.5 bg-purple-500 border border-white rounded-[2px]" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 md:w-3.5 md:h-3.5 bg-purple-500 border border-white rounded-[2px]" />

              {/* Top Rotation Handle */}
              <div className="absolute left-1/2 -top-4 w-[1px] h-4 md:w-[2px] md:h-6 bg-purple-400/50 -translate-x-1/2" />
              <div className="absolute left-1/2 -top-[20px] md:-top-[30px] w-2 h-2 md:w-3.5 md:h-3.5 bg-purple-500 border border-white rounded-full -translate-x-1/2" />
            </div>
            
            {/* Layer 2: Main Glass Plate (Optimized dark theme without backdrop blur for smooth 3D flip performance) */}
            <div 
              ref={layer2Ref} 
              className="absolute inset-0 bg-[#140a24]/95 border border-white/20 rounded-2xl sm:rounded-3xl origin-center shadow-[0_0_30px_rgba(138,43,226,0.25)] md:shadow-[0_0_50px_rgba(138,43,226,0.35)]"
            ></div>

            {/* Front Face: MY PORTFOLIO */}
            <div className="absolute inset-0 flex justify-center items-center backface-hidden z-10">
              <h1 
                ref={textRef} 
                className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-blue-200 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap"
              >
                MY PORTFOLIO
              </h1>
            </div>

            {/* Back Face: Software Engineer */}
            <div 
              ref={innerTextRef}
              className="absolute inset-0 flex flex-col justify-center items-center backface-hidden [transform:rotateX(180deg)] z-20 px-2 sm:px-4"
            >
              <h2 className="text-base sm:text-3xl md:text-5xl font-extrabold text-blue-50 drop-shadow-lg leading-tight text-center">
                Software Engineer<br/>
                <span className="text-purple-300 text-xs sm:text-xl md:text-3xl font-medium tracking-wider mt-1 sm:mt-2 block">
                  &amp; Web Developer
                </span>
              </h2>
            </div>
          </div>

          {/* Floating Role Cards */}
          {ROLE_CARDS.map((role, i) => (
            <div
              key={role.title}
              ref={(el) => { roleRefs.current[i] = el; }}
              className="hidden sm:block absolute z-20 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{ 
                top: role.top, 
                left: role.left || 'auto', 
                right: role.right || 'auto',
                bottom: role.bottom || 'auto'
              }}
            >
              <span className="text-xs md:text-base font-medium text-pink-100 tracking-wide">{role.title}</span>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};
