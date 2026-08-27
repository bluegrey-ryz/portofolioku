import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Section7: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Subtitle reveal
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Portal reveal
      gsap.fromTo(
        portalRef.current,
        {
          scale: 0.7,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Button reveal
      gsap.fromTo(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Portal breathing
      gsap.to(portalRef.current, {
        scale: 1.05,
        opacity: 0.9,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    {
      scope: sectionRef,
    }
  );

  const handleMouseEnter = () => {
    gsap.to(portalRef.current, {
      scale: 1.15,
      boxShadow:
        '0 0 80px rgba(168, 85, 247, 0.5), inset 0 0 40px rgba(236, 72, 153, 0.4)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(portalRef.current, {
      scale: 1,
      boxShadow:
        '0 0 50px rgba(139, 92, 246, 0.25), inset 0 0 20px rgba(139, 92, 246, 0.15)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        w-full
        min-h-screen
        py-24
        flex
        flex-col
        items-center
        justify-between
        bg-slate-950
        text-white
        overflow-hidden
        z-20
      "
    >
      {/* Background */}
      <div className="
        absolute
        inset-0
        z-0
        opacity-30
        bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
        from-indigo-950
        via-slate-950
        to-black
        pointer-events-none
      " />

      {/* Ambient glows */}
      <div className="
        absolute
        -top-1/4
        left-1/4
        w-[600px]
        h-[600px]
        bg-purple-600/10
        rounded-full
        blur-[140px]
        pointer-events-none
      " />

      <div className="
        absolute
        -bottom-1/4
        right-1/4
        w-[600px]
        h-[600px]
        bg-indigo-600/15
        rounded-full
        blur-[140px]
        pointer-events-none
      " />

      {/* Main Content */}
      <div className="
        relative
        z-10
        max-w-4xl
        w-full
        mx-auto
        flex
        flex-col
        items-center
        justify-center
        text-center
        my-auto
        px-6
      ">
        {/* Portal */}
        <div
          ref={portalRef}
          className="
            relative
            w-56
            h-56
            md:w-64
            md:h-64
            rounded-full
            mb-12
            bg-gradient-to-tr
            from-purple-600/30
            via-indigo-900/40
            to-pink-500/30
            border
            border-purple-500/30
            shadow-[0_0_50px_rgba(139,92,246,0.25),_inset_0_0_20px_rgba(139,92,246,0.15)]
            flex
            items-center
            justify-center
            backdrop-blur-sm
          "
        >
          {/* Inner ring */}
          <div className="
            w-[80%]
            h-[80%]
            rounded-full
            border
            border-pink-500/20
            bg-indigo-950/20
            flex
            items-center
            justify-center
            animate-spin
            duration-[20s]
          ">
            <div className="
              w-4
              h-4
              rounded-full
              bg-pink-500/80
              shadow-[0_0_12px_#ec4899]
              transform
              translate-x-20
            " />
          </div>

          {/* Keyhole */}
          <div className="
            absolute
            w-[40%]
            h-[40%]
            rounded-full
            bg-white/5
            border
            border-white/20
            shadow-[0_0_30px_rgba(255,255,255,0.2)_inset]
            flex
            flex-col
            items-center
            justify-center
            animate-pulse
            duration-[4s]
          ">
            <div className="
              w-4
              h-4
              rounded-full
              bg-gradient-to-b
              from-white
              to-purple-200
              shadow-sm
            " />

            <div className="
              w-2.5
              h-6
              bg-gradient-to-b
              from-white
              to-purple-200
              -mt-1
              rounded-b
            " />
          </div>

          {/* Particles */}
          <div className="
            absolute
            inset-0
            w-full
            h-full
            rounded-full
            overflow-hidden
            opacity-40
            pointer-events-none
          ">
            <div className="
              absolute
              top-[20%]
              left-[10%]
              w-1.5
              h-1.5
              bg-white
              rounded-full
              animate-ping
              duration-[3s]
            " />

            <div className="
              absolute
              bottom-[25%]
              right-[15%]
              w-1
              h-1
              bg-white
              rounded-full
              animate-ping
              duration-[4s]
            " />
          </div>
        </div>

        {/* Eyebrow */}
        <p className="
          text-purple-400
          text-xs
          md:text-sm
          font-bold
          tracking-[0.4em]
          uppercase
          mb-4
        ">
          Ready for the Next Chapter?
        </p>

        {/* Title */}
        <h2
          ref={titleRef}
          className="
            text-4xl
            sm:text-6xl
            md:text-8xl
            font-medium
            italic
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-white
            via-purple-100
            to-purple-300
            drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]
            leading-none
            mb-8
            select-none
          "
          style={{
            fontFamily: "'Dancing Script', cursive",
            transform: 'rotate(-3deg)',
          }}
        >
          Let's Work Together
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="
            text-slate-400
            text-sm
            md:text-base
            max-w-xl
            leading-relaxed
            mb-12
          "
        >
          I am open to opportunities in Software Quality Assurance,
          Data Analysis, Web Development, Administration, freelance
          projects, and collaborative work. Feel free to reach out and
          let's discuss how we can work together.
        </p>

        {/* Email Button */}
        <a
          ref={buttonRef}
          href="mailto:sitinurkharismaakbar@gmail.com?subject=Portfolio%20Opportunity&body=Hi%20Kharisma,%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you."
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="
            relative
            px-8
            py-4
            rounded-full
            font-bold
            tracking-wider
            text-xs
            md:text-sm
            uppercase
            bg-gradient-to-r
            from-purple-600
            via-pink-600
            to-indigo-600
            text-white
            transition-all
            duration-300
            shadow-[0_0_30px_rgba(139,92,246,0.3)]
            hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]
            hover:scale-[1.04]
            active:scale-[0.98]
            flex
            items-center
            gap-3
            group
          "
        >
          <span className="relative z-10">
            Contact Me
          </span>

          <svg
            className="
              w-4
              h-4
              relative
              z-10
              text-white
              group-hover:translate-x-1
              transition-transform
              duration-300
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M4 4h16v16H4zM4 6l8 6 8-6"
            />
          </svg>

          <div className="
            absolute
            inset-[1.5px]
            bg-slate-950
            rounded-full
            group-hover:opacity-0
            transition-opacity
            duration-300
            z-0
            pointer-events-none
          " />
        </a>
      </div>

      {/* Footer */}
      <div className="
        relative
        z-10
        w-full
        text-center
        px-6
        mt-16
        border-t
        border-white/5
        pt-12
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        max-w-6xl
        mx-auto
        gap-6
        text-xs
        md:text-sm
        text-slate-500
      ">
        <div>
          <span className="font-semibold text-slate-400">
            Siti Nur Kharisma Akbar
          </span>
          {' '}— Portfolio
        </div>

        <div className="
          flex
          items-center
          gap-6
          font-semibold
          text-slate-400
          flex-wrap
          justify-center
        ">
          <a
            href="https://github.com/bluegrey-ryz"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hover:text-purple-400
              transition-colors
            "
          >
            GitHub
          </a>

          <a
            href="https://id.linkedin.com/in/kharisma-akbar"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hover:text-purple-400
              transition-colors
            "
          >
            LinkedIn
          </a>

          <a
            href="mailto:sitinurkharismaakbar@gmail.com"
            className="
              hover:text-purple-400
              transition-colors
            "
          >
            Email
          </a>
        </div>

        <p>
          © {new Date().getFullYear()} — Built with Passion
        </p>
      </div>
    </section>
  );
};