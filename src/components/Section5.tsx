import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// PROJECT TYPE
// ======================================================

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
  liveUrl?: string;
  githubUrl?: string;
  status: 'Live' | 'Academic';
}

// ======================================================
// PROJECT DATA
// ======================================================

const PROJECTS: Project[] = [
  {
    title: 'Thipank Skin',
    category: 'Brand Website',
    description:
      'Website brand skincare untuk menampilkan identitas brand, informasi produk, serta konten secara terstruktur dan responsif.',
    image: '/images/P1.webp',
    tags: ['Laravel', 'PHP', 'MySQL', 'HTML', 'CSS'],
    color: 'from-pink-500/20 to-rose-500/20',
    liveUrl: 'https://thipankskinindonesia.store/',
    githubUrl: '',
    status: 'Live',
  },

  {
    title: 'Baltikh Indonesia',
    category: 'Brand Website',
    description:
      'Website brand dengan fokus pada tampilan visual, informasi produk, identitas brand, dan pengalaman pengguna yang responsif.',
    image: '/images/P2.webp',
    tags: ['Laravel', 'PHP', 'MySQL', 'HTML', 'CSS'],
    color: 'from-amber-500/20 to-orange-500/20',
    liveUrl: 'https://baltikhindonesia.store/',
    githubUrl: '',
    status: 'Live',
  },

  {
    title: 'Sevim',
    category: 'Brand Website',
    description:
      'Website brand yang dirancang untuk menampilkan identitas visual, informasi produk, dan konten secara terstruktur.',
    image: '/images/P3.webp',
    tags: ['Laravel', 'PHP', 'MySQL', 'HTML', 'CSS'],
    color: 'from-purple-500/20 to-fuchsia-500/20',
    liveUrl: 'https://sevim.id/',
    githubUrl: '',
    status: 'Live',
  },

  {
    title: 'Jasa Tugas',
    category: 'Web Application',
    description:
      'Website layanan pemesanan jasa yang menampilkan informasi layanan dan kebutuhan pengguna dengan tampilan sederhana dan responsif.',
    image: '/images/P4.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: 'from-blue-500/20 to-cyan-500/20',
    liveUrl: 'https://sijokitugasku.netlify.app/',
    githubUrl: '',
    status: 'Live',
  },

  {
    title: 'Snack & Catering',
    category: 'Business Website',
    description:
      'Website bisnis snack dan catering untuk menampilkan menu, informasi layanan, pemesanan, dan profil usaha.',
    image: '/images/P5.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: 'from-green-500/20 to-emerald-500/20',
    liveUrl: 'https://4rsnackcatering.netlify.app/',
    githubUrl: '',
    status: 'Live',
  },

  {
    title: 'School Management System',
    category: 'Desktop Application',
    description:
      'Aplikasi manajemen sekolah berbasis desktop untuk membantu pengelolaan data akademik dan administrasi sekolah.',
    image: '/images/P6.png',
    tags: ['Java', 'NetBeans', 'MySQL'],
    color: 'from-violet-500/20 to-purple-500/20',
    githubUrl: '',
    status: 'Academic',
  },

  {
    title: 'Cell Service Manager',
    category: 'Desktop Application',
    description:
      'Aplikasi desktop untuk membantu pencatatan data pelanggan, transaksi layanan servis, dan pengelolaan proses service perangkat.',
    image: '/images/P7.png',
    tags: [
      'C#',
      '.NET Framework',
      'WinForms',
      'MySQL',
      'Visual Studio',
    ],
    color: 'from-slate-500/20 to-blue-500/20',
    githubUrl: '',
    status: 'Academic',
  },

];

// ======================================================
// COMPONENT
// ======================================================

export const Section5: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  // ======================================================
  // GSAP STACKING ANIMATION
  // ======================================================

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const isMobile = window.innerWidth < 768;

      const panels = gsap.utils.toArray<HTMLElement>(
        '.portfolio-panel'
      );

      if (panels.length <= 1) return;

      // Semua project dimulai dari bawah viewport.
      // Panel 0 adalah title panel.
      gsap.set(panels.slice(1), {
        y: '110vh',
        rotation: isMobile ? 0 : 4,
        scale: isMobile ? 1 : 0.97,
        transformOrigin: 'center center',
      });

      // Title tetap normal
      gsap.set(panels[0], {
        y: 0,
        opacity: 1,
        scale: 1,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,

          pin: true,

          scrub: 1,

          start: 'top top',

          // Otomatis mengikuti jumlah project.
          end: () =>
            `+=${window.innerHeight * PROJECTS.length}`,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      // ==================================================
      // DYNAMIC PROJECT LOOP
      // ==================================================

      panels.slice(1).forEach((panel, index) => {
        const timelinePosition = index;

        // Project masuk dari bawah
        timeline.to(
          panel,
          {
            y: 0,
            rotation: 0,
            scale: 1,
            ease: 'none',
            duration: 1,
          },
          timelinePosition
        );

        // Saat project pertama masuk,
        // title panel menghilang.
        if (index === 0) {
          timeline.to(
            panels[0],
            {
              opacity: 0,
              y: -60,
              scale: 0.94,
              ease: 'none',
              duration: 0.7,
            },
            timelinePosition
          );
        }

        // Sedikit efek kartu lama saat tertutup kartu baru.
        if (index > 0) {
          const previousPanel = panels[index];

          timeline.to(
            previousPanel,
            {
              scale: isMobile ? 0.985 : 0.97,
              y: isMobile ? -8 : -15,
              ease: 'none',
              duration: 1,
            },
            timelinePosition
          );
        }
      });

      // ==================================================
      // SUN PARALLAX
      // ==================================================

      const sun = containerRef.current.querySelector(
        '.sun-parallax'
      );

      if (sun) {
        timeline.to(
          sun,
          {
            top: '90%',
            left: '15%',

            scale: isMobile ? 4.5 : 25,

            opacity: isMobile ? 0 : 0.55,

            ease: 'power1.inOut',

            duration: Math.max(
              PROJECTS.length - 1,
              1
            ),
          },
          0
        );
      }

      // Refresh supaya pin benar setelah asset/layout selesai.
      const refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => {
        window.clearTimeout(refreshTimer);

        timeline.scrollTrigger?.kill();

        timeline.kill();
      };
    },

    {
      scope: containerRef,
      dependencies: [],
    }
  );

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <div className="relative w-full z-30">

      {/* ================================================= */}
      {/* CLOUD TRANSITION */}
      {/* ================================================= */}

      <div
        ref={cloudsRef}
        className="
          absolute
          top-0
          left-0

          w-full

          z-50

          pointer-events-none

          -translate-y-[50%]

          scale-y-[-1]
        "
      >
        <img
          src="/images/clouds.png"
          alt="Cloud transition"
          className="
            w-full
            h-auto
            object-cover
            opacity-100
          "
          loading="lazy"
        />
      </div>

      {/* ================================================= */}
      {/* PROJECT SECTION */}
      {/* ================================================= */}

      <section
        ref={containerRef}
        id="projects"
        className="
          relative

          w-full
          h-screen

          overflow-hidden

          bg-gradient-to-b
          from-transparent
          via-[#dbeafe]
          to-white

          text-slate-800
        "
      >

        {/* ================================================= */}
        {/* SUN */}
        {/* ================================================= */}

        <div
          className="
            sun-parallax

            absolute

            z-[5]

            pointer-events-none

            flex
            items-center
            justify-center
          "
          style={{
            top: '0%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >

          <div
            className="
              w-6
              h-6

              rounded-full

              bg-gradient-to-r
              from-amber-400
              via-yellow-300
              to-orange-400

              shadow-[0_0_16px_rgba(245,158,11,0.8),_0_0_32px_rgba(251,191,36,0.6)]

              relative

              flex
              items-center
              justify-center
            "
          >

            <svg
              className="
                absolute
                w-10
                h-10
                text-amber-300/80
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707"
              />

            </svg>

          </div>

        </div>

        {/* ================================================= */}
        {/* BACKGROUND */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-0

            z-0

            pointer-events-none
          "
        >

          {/* Soft light */}

          <div
            className="
              absolute

              top-[10%]
              left-[15%]

              w-[450px]
              h-[450px]

              bg-white/70

              rounded-full

              blur-[120px]
            "
          />

          <div
            className="
              absolute

              bottom-[15%]
              right-[20%]

              w-[550px]
              h-[550px]

              bg-white/80

              rounded-full

              blur-[140px]
            "
          />

          <div
            className="
              absolute

              bottom-[5%]
              left-[30%]

              w-[350px]
              h-[350px]

              bg-sky-200/50

              rounded-full

              blur-[90px]
            "
          />

          {/* Clouds */}

          <div
            className="
              absolute

              inset-x-0

              top-[20%]
              bottom-0

              opacity-15

              mix-blend-overlay

              bg-repeat-x
              bg-top
            "
            style={{
              backgroundImage:
                'url(/images/clouds.png)',

              backgroundSize:
                '1000px auto',
            }}
          />

          <div
            className="
              absolute

              inset-x-0

              top-[40%]
              bottom-0

              opacity-10

              mix-blend-screen

              bg-repeat-x
              bg-bottom

              scale-y-[-1]
            "
            style={{
              backgroundImage:
                'url(/images/clouds.png)',

              backgroundSize:
                '1400px auto',
            }}
          />

        </div>

        {/* ================================================= */}
        {/* STACK WRAPPER */}
        {/* ================================================= */}

        <div
          ref={scrollWrapperRef}
          className="
            relative

            z-10

            w-full
            h-full
          "
        >

          {/* ================================================= */}
          {/* TITLE PANEL */}
          {/* ================================================= */}

          <div
            className="
              portfolio-panel

              absolute
              inset-0

              w-full
              h-full

              flex
              flex-col

              items-center
              justify-center

              text-center

              px-6

              z-10

              will-change-transform
            "
          >

            <p
              className="
                text-indigo-900

                text-xs
                md:text-sm

                font-semibold

                tracking-[0.3em]

                uppercase

                mb-4
              "
            >
              Showcase
            </p>

            <h2
              className="
                text-6xl
                md:text-8xl

                font-medium

                italic

                text-indigo-950

                drop-shadow-[0_0_30px_rgba(255,255,255,0.7)]

                leading-none

                mb-6
              "
              style={{
                fontFamily:
                  "'Dancing Script', cursive",
              }}
            >
              My Portfolio
            </h2>

            <p
              className="
                text-slate-700

                text-sm
                md:text-base

                max-w-md

                leading-relaxed

                mb-8
              "
            >
              Explore my web, desktop and mobile
              development projects. Scroll down and
              watch each project stack like a deck of
              cards.
            </p>

            {/* Project count */}

            <div
              className="
                mb-8

                px-4
                py-2

                rounded-full

                bg-indigo-950/5

                border
                border-indigo-900/10

                text-xs

                font-semibold

                text-indigo-900
              "
            >
              {PROJECTS.length} Selected Projects
            </div>

            <div
              className="
                flex
                items-center
                gap-3

                text-indigo-900

                animate-bounce
              "
            >

              <span
                className="
                  text-sm

                  font-semibold

                  tracking-wider
                "
              >
                SCROLL DOWN
              </span>

              <span>
                ↓
              </span>

            </div>

          </div>

          {/* ================================================= */}
          {/* PROJECT PANELS */}
          {/* ================================================= */}

          {PROJECTS.map(
            (project, index) => (

              <div
                key={`${project.title}-${index}`}
                className="
                  portfolio-panel

                  absolute
                  inset-0

                  w-full
                  h-full

                  flex
                  items-center
                  justify-center

                  px-5
                  sm:px-8
                  md:px-16

                  will-change-transform
                "
                style={{
                  zIndex: 11 + index,
                }}
              >

                <div
                  className="
                    relative

                    w-full

                    max-w-4xl
                  "
                >

                  {/* ================================================= */}
                  {/* FIGMA OUTLINE */}
                  {/* ================================================= */}

                  <div
                    className="
                      absolute

                      inset-[-8px]
                      md:inset-[-14px]

                      border-2
                      border-dashed
                      border-indigo-400/50

                      rounded-[2.2rem]

                      pointer-events-none

                      origin-center
                    "
                  >

                    {/* Top left */}

                    <div
                      className="
                        absolute

                        -top-1.5
                        -left-1.5

                        w-2.5
                        h-2.5

                        md:w-3.5
                        md:h-3.5

                        bg-indigo-600

                        border-2
                        border-white

                        rounded-[2px]
                      "
                    />

                    {/* Top right */}

                    <div
                      className="
                        absolute

                        -top-1.5
                        -right-1.5

                        w-2.5
                        h-2.5

                        md:w-3.5
                        md:h-3.5

                        bg-indigo-600

                        border-2
                        border-white

                        rounded-[2px]
                      "
                    />

                    {/* Bottom left */}

                    <div
                      className="
                        absolute

                        -bottom-1.5
                        -left-1.5

                        w-2.5
                        h-2.5

                        md:w-3.5
                        md:h-3.5

                        bg-indigo-600

                        border-2
                        border-white

                        rounded-[2px]
                      "
                    />

                    {/* Bottom right */}

                    <div
                      className="
                        absolute

                        -bottom-1.5
                        -right-1.5

                        w-2.5
                        h-2.5

                        md:w-3.5
                        md:h-3.5

                        bg-indigo-600

                        border-2
                        border-white

                        rounded-[2px]
                      "
                    />

                    {/* Rotation line */}

                    <div
                      className="
                        absolute

                        left-1/2

                        -top-6

                        w-[2px]
                        h-6

                        bg-indigo-500/40

                        -translate-x-1/2
                      "
                    />

                    {/* Rotation handle */}

                    <div
                      className="
                        absolute

                        left-1/2

                        -top-[30px]

                        w-2.5
                        h-2.5

                        md:w-3.5
                        md:h-3.5

                        bg-indigo-600

                        border-2
                        border-white

                        rounded-full

                        -translate-x-1/2
                      "
                    />

                  </div>

                  {/* ================================================= */}
                  {/* ACTUAL CARD */}
                  {/* ================================================= */}

                  <div
                    className="
                      relative

                      w-full

                      rounded-3xl

                      border
                      border-white/80

                      bg-white

                      p-4
                      sm:p-6
                      md:p-10

                      shadow-2xl

                      grid
                      grid-cols-1
                      md:grid-cols-2

                      gap-4
                      md:gap-8

                      items-center

                      overflow-hidden
                    "
                  >

                    {/* Gradient decoration */}

                    <div
                      className={`
                        absolute

                        -right-20
                        -bottom-20

                        w-80
                        h-80

                        bg-gradient-to-br

                        ${project.color}

                        rounded-full

                        blur-3xl

                        pointer-events-none

                        opacity-40
                      `}
                    />

                    {/* ================================================= */}
                    {/* IMAGE */}
                    {/* ================================================= */}

                    <div
                      className="
                        group

                        relative

                        z-10

                        rounded-2xl

                        overflow-hidden

                        border
                        border-white/40

                        shadow-md

                        aspect-video

                        flex
                        items-center
                        justify-center

                        bg-slate-100

                        max-h-[150px]
                        sm:max-h-[220px]
                        md:max-h-none
                      "
                    >

                      <img
                        src={project.image}
                        alt={project.title}
                        className="
                          w-full
                          h-full

                          object-cover

                          transition-transform
                          duration-700

                          group-hover:scale-105
                        "
                        loading="lazy"
                      />

                    </div>

                    {/* ================================================= */}
                    {/* CONTENT */}
                    {/* ================================================= */}

                    <div
                      className="
                        relative

                        z-10

                        flex
                        flex-col

                        items-start

                        text-left
                      "
                    >

                      {/* Top badges */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center

                          gap-2

                          mb-2
                        "
                      >

                        {/* Status */}

                        <span
                          className={`
                            text-[9px]
                            sm:text-[10px]

                            px-2.5
                            py-1

                            rounded-full

                            font-bold

                            uppercase

                            tracking-wider

                            ${
                              project.status === 'Live'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-indigo-100 text-indigo-700'
                            }
                          `}
                        >
                          {project.status}
                        </span>

                        {/* Category */}

                        <span
                          className="
                            text-sky-600

                            text-[10px]
                            sm:text-xs

                            font-bold

                            tracking-wider

                            uppercase
                          "
                        >
                          {project.category}
                        </span>

                      </div>

                      {/* Project number */}

                      <p
                        className="
                          text-[10px]

                          text-slate-400

                          font-semibold

                          mb-1
                        "
                      >
                        PROJECT{' '}
                        {String(
                          index + 1
                        ).padStart(2, '0')}
                      </p>

                      {/* Title */}

                      <h3
                        className="
                          text-xl
                          sm:text-3xl
                          md:text-4xl

                          font-extrabold

                          text-indigo-950

                          mb-2
                          md:mb-4

                          leading-tight
                        "
                      >
                        {project.title}
                      </h3>

                      {/* Description */}

                      <p
                        className="
                          text-slate-600

                          text-xs
                          sm:text-sm
                          md:text-base

                          leading-relaxed

                          mb-4
                          md:mb-6
                        "
                      >
                        {project.description}
                      </p>

                      {/* Tags */}

                      <div
                        className="
                          flex
                          flex-wrap

                          gap-1.5
                          md:gap-2

                          mb-4
                          md:mb-7
                        "
                      >

                        {project.tags.map(
                          (tag) => (

                            <span
                              key={tag}
                              className="
                                text-[9px]
                                sm:text-xs

                                px-2
                                py-0.5

                                sm:px-2.5
                                sm:py-1

                                rounded-full

                                bg-white/70

                                border
                                border-slate-200

                                text-slate-700

                                font-medium

                                shadow-sm
                              "
                            >
                              {tag}
                            </span>

                          )
                        )}

                      </div>

                      {/* ================================================= */}
                      {/* BUTTONS */}
                      {/* ================================================= */}

                      <div
                        className="
                          flex
                          flex-wrap

                          gap-2
                          sm:gap-3
                        "
                      >

                        {/* LIVE WEBSITE */}

                        {project.liveUrl && (

                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              px-4
                              py-2

                              sm:px-5
                              sm:py-2.5

                              rounded-full

                              bg-indigo-950

                              text-white

                              font-bold

                              hover:bg-indigo-800

                              transition-colors

                              shadow

                              text-[10px]
                              sm:text-xs
                              md:text-sm
                            "
                          >
                            Live Website ↗
                          </a>

                        )}

                        {/* GITHUB */}

                        {project.githubUrl && (

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              px-4
                              py-2

                              sm:px-5
                              sm:py-2.5

                              rounded-full

                              bg-white

                              border
                              border-indigo-200

                              text-indigo-950

                              font-bold

                              hover:bg-indigo-50

                              transition-colors

                              shadow-sm

                              text-[10px]
                              sm:text-xs
                              md:text-sm
                            "
                          >
                            GitHub ↗
                          </a>

                        )}

                        {/* Kalau belum ada URL */}

                        {!project.liveUrl &&
                          !project.githubUrl && (

                            <span
                              className="
                                px-4
                                py-2

                                rounded-full

                                bg-slate-100

                                border
                                border-slate-200

                                text-slate-500

                                text-[10px]
                                sm:text-xs

                                font-semibold
                              "
                            >
                              Project Showcase
                            </span>

                          )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>

    </div>
  );
};