import { useEffect, useRef } from 'react'
import { HeroSection } from './components/HeroSection'
import { Section2 } from './components/Section2'
import { TechStackSection } from './components/TechStackSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Section5 } from './components/Section5'
import { Section6 } from './components/Section6'
import { Section7 } from './components/Section7'
import { FloatingNav } from './components/FloatingNav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './App.css'

gsap.registerPlugin(ScrollTrigger);

function App() {
  const planetRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    // Force scroll to top on mount
    window.scrollTo(0, 0)

    // Sync Lenis rendering loop with GSAP ticker for maximum performance
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    // Update ScrollTrigger calculations when Lenis scrolls
    const lenisInstance = lenisRef.current?.lenis;
    if (lenisInstance) {
      lenisInstance.on('scroll', ScrollTrigger.update);
    }

    // Animate the 3D purple planet on scroll to exit to the left before Section 2
    gsap.to(planetRef.current, {
      x: () => -(window.innerWidth + 200),
      y: 100,
      rotation: -180,
      opacity: 0,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '200vh top',
        scrub: true,
      }
    });

    return () => {
      gsap.ticker.remove(update);
    };
  }, [])

  return (
    <ReactLenis ref={lenisRef} autoRaf={false} root>
      <div className="relative bg-black w-full min-h-screen overflow-x-hidden">
        
        {/* Hero Section (Will be pinned by GSAP) */}
        <div className="relative z-0 w-full">
          <HeroSection />
        </div>

        {/* Content wrapper for Section 2 and onwards */}
        <div className="relative z-20 -mt-[50vh] w-full min-h-screen">
          
          {/* Scrollable Background Image — spans full content height */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-top bg-no-repeat"
              style={{ backgroundImage: 'url(/images/bg-section.webp)' }}
            />
          </div>

          {/* Sections Content */}
          <div className="relative z-10 w-full">
            <Section2 />
            <TechStackSection />
            <ExperienceSection />
            
            {/* Section 5 (Portfolio) moved inside to share the background image seamlessly */}
            <Section5 />
          </div>
        </div>

        {/* Section 6 (Padlet Wall/Guestbook) */}
        <Section6 />

        {/* Section 7 (Hire Me Call to Action / Footer) */}
        <Section7 />

        {/* 3D Purple Planet Overlay */}
        <div 
          ref={planetRef}
          className="fixed w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full z-45 pointer-events-none bg-cover bg-center bg-no-repeat mix-blend-screen will-change-transform"
          style={{
            backgroundImage: 'url(/images/planet-purple.png)',
            top: '-60px',
            right: '-60px',
          }}
        />

        {/* Floating fixed navigation bar */}
        <FloatingNav />
      </div>
    </ReactLenis>
  )
}

export default App
