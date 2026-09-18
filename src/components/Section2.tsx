import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Marquee } from './Marquee';

gsap.registerPlugin(ScrollTrigger);

export const Section2: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudsContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const profileWrapperRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    // Reveal text content when scrolling into Section 2
    gsap.fromTo(textContainerRef.current, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    );

    // Profile image slide-in from the right (no falling from above)
    const startX = isMobile ? 300 : 400;
    gsap.fromTo(profileWrapperRef.current,
      { 
        x: startX,
        y: 0,
        scale: 0.95,
        rotation: 0,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 80%' : 'top center',
        },
        onComplete: () => {
          // Start the continuous floating animation ONLY after it has fully landed
          gsap.to(profileWrapperRef.current, {
            y: '+=20',
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      }
    );

    // Orbiting star animation around the card edges
    const tlStar = gsap.timeline({ repeat: -1 });
    tlStar.to(starRef.current, {
      left: '100%',
      top: '0%',
      duration: 2.2,
      ease: 'none'
    })
    .to(starRef.current, {
      left: '100%',
      top: '100%',
      duration: 1.6,
      ease: 'none'
    })
    .to(starRef.current, {
      left: '0%',
      top: '100%',
      duration: 2.2,
      ease: 'none'
    })
    .to(starRef.current, {
      left: '0%',
      top: '0%',
      duration: 1.6,
      ease: 'none'
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="relative w-full min-h-[150vh] z-20 pb-32">
      
      {/* Transition Overlay (Clouds) */}
      <div 
        ref={cloudsContainerRef}
        className="absolute top-0 left-0 w-full z-30 pointer-events-none transform -translate-y-[50%]"
      >
        <img 
          src="/images/clouds.png" 
          alt="Clouds Transition" 
          className="relative w-full h-auto min-h-[300px] object-cover opacity-90 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          loading="lazy"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 pt-[20vh]">
        <Marquee />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column (Typography & CTA) */}
          <div ref={textContainerRef} className="flex flex-col items-start space-y-8 order-2 lg:order-1">
            
            {/* Pill Badge */}
            <div className="px-5 py-2 rounded-full bg-[#110d1a] shadow-lg border border-purple-900/30">
              <span className="text-sm font-semibold text-purple-100 tracking-wide">
                Available for Projects & Opportunities                
              </span>
            </div>

            {/* Display Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tight drop-shadow-lg select-none" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="block font-style-italic text-purple-300 mb-2 text-2xl sm:text-5xl md:text-6xl drop-shadow-md">
                Hi, I'm
              </span>
              <span>Siti Nur</span>
              <br />
              <span>Kharisma Akbar</span>
            </h1>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-3">
{['Information Systems', 'Data Analyst', 'Software QA'].map(tag => (                <div key={tag} className="px-4 py-1.5 rounded-full bg-[#201533] text-purple-200 text-sm font-medium shadow-md">
                  {tag}
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-300 font-medium max-w-lg leading-relaxed drop-shadow-md">
Fresh Graduate S1 Sistem Informasi dengan ketertarikan pada Data Analysis,
  Software Quality Assurance, dan Web Development. Memiliki pengalaman
  dalam pengolahan data, pengujian software, serta pengembangan website.            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="https://github.com/bluegrey-ryz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-purple-600 text-white font-semibold flex items-center gap-2 hover:bg-purple-500 transition-colors shadow-[0_0_20px_rgba(147,51,234,0.4)] cursor-pointer"
              >
                View Work <span className="text-xl leading-none">&rarr;</span>
              </a>
              <a 
                href="/CV_Siti Nur Kharisma Akbar baru.pdf" 
                download="CV_Siti Nur Kharisma Akbar baru.pdf"
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-colors shadow-lg cursor-pointer"
              >
                Download CV <span className="text-xl leading-none">&darr;</span>
              </a>
            </div>
          </div>

          {/* Right Column (Profile Image) */}
          <div className="relative w-full flex justify-center lg:justify-end perspective-1000 order-1 lg:order-2">
                        {/* Glassmorphic Container Wrapper */}
            <div 
              ref={profileWrapperRef}
              className="relative w-full max-w-[500px] aspect-[4/3] perspective-1000"
            >
              {/* Orbiting glowing star */}
              <div 
                ref={starRef}
                className="absolute z-30 w-16 h-16 pointer-events-none flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(253,224,71,1)] -translate-x-1/2 -translate-y-1/2"
                style={{ top: '0%', left: '0%' }}
              >
                <svg className="w-8 h-8 text-yellow-300 animate-spin duration-[4s]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.858 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                </svg>
              </div>

              {/* Glassmorphic Card Container */}
              <div 
                className="relative w-full h-full rounded-[2rem] border-2 border-white/60 bg-white/30 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(138,43,226,0.25)] overflow-hidden flex items-center justify-center p-2"
              >
                {/* Image Placeholder or actual image */}
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
                  <img src="../images/profill.jpg" alt="" className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>

              

                {/* Decorative blobs inside container */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-400/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/30 rounded-full blur-3xl"></div>
              </div>
            </div>
            
          </div>
        </div>

      
      </div>
    </section>
  );
};
