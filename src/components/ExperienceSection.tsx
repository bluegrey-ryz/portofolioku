import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// STATS
// ======================================================

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const STATS: Stat[] = [
  {
    value: 3,
    suffix: '',
    label: 'Main Experiences',
    icon: '💼',
  },
  {
    value: 20,
    suffix: '+',
    label: 'App Features Tested',
    icon: '🧪',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Affiliate Data Managed',
    icon: '📊',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Visual Contents',
    icon: '🎨',
  },
];

// ======================================================
// MAIN EXPERIENCE
// ======================================================

interface Experience {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  tags: string[];
  accent: string;
}

const EXPERIENCES: Experience[] = [
  {
    period: 'Jul 2025 – Sep 2025',
    role: 'KOL (Key Opinion Leader) / Freelance',
    company: 'CV Lentera Fajar Wijaya',
    type: 'WFH',
    description:
      'Menginput dan mengelola lebih dari 200 data mitra affiliate ke dalam template database internal. Memantau data kinerja harian mitra serta melakukan verifikasi dan klarifikasi data operasional promosi.',
    tags: [
      'Data Entry',
      'Data Management',
      'Database',
      'Data Verification',
    ],
    accent: 'from-sky-500 to-cyan-500',
  },

  {
    period: 'Mar 2025 – Jun 2025',
    role: 'Digital Marketing',
    company: 'PT Imused Satria Muda',
    type: 'Magang MBKM',
    description:
      'Mendesain lebih dari 100 konten visual untuk media sosial, membuat lebih dari 50 ide konten marketing berdasarkan tren, serta mengelola administrasi konten, database KOL, dan laporan performa kampanye.',
    tags: [
      'Digital Marketing',
      'Content Design',
      'Data Management',
      'Administration',
    ],
    accent: 'from-pink-500 to-rose-500',
  },

  {
    period: 'Feb 2025 – Apr 2025',
    role: 'Software Tester / Technical Writer',
    company: 'Bolasoft ID Indonesia',
    type: 'Magang WFH',
    description:
      'Melakukan pengujian lebih dari 20 fitur aplikasi untuk memastikan sistem berjalan sesuai kebutuhan pengguna. Menyusun dokumentasi teknis, laporan bug, dan user guide serta berkoordinasi dengan developer dalam proses validasi dan penyelesaian temuan sistem.',
    tags: [
      'Software Testing',
      'Test Case',
      'Bug Reporting',
      'Technical Writing',
    ],
    accent: 'from-purple-500 to-indigo-500',
  },
];

// ======================================================
// OTHER EXPERIENCE
// ======================================================

interface OtherExperience {
  role: string;
  company: string;
  category: 'other' | 'parttime' | 'fulltime';
  icon?: string;
}

const OTHER_EXPERIENCES: OtherExperience[] = [
  { role: 'Data Entry', company: 'Kantor Kecamatan Kalimanah', category: 'other' },
  { role: 'Pendamping PPH', company: 'Pendamping Proses Produk Halal', category: 'other' },
  { role: 'Praktik Kerja Lapangan', company: 'BRI', category: 'other' },
  { role: 'Petugas Pantarlih', company: 'Pemutakhiran Data Pemilih', category: 'other' },
  { role: 'Anggota KPPS', company: 'Kelompok Penyelenggara Pemungutan Suara', category: 'other' },

  { role: 'Waiter', company: 'Warung Sambal Purbalingga', category: 'parttime', icon: '🍽️' },
  { role: 'Production Team', company: 'Kedai Ini Dimsum', category: 'parttime', icon: '🍱' },

  { role: 'Cashier', company: 'Toko Cerme', category: 'fulltime', icon: '💳' },
];

// ======================================================
// COMPONENT
// ======================================================

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const lineRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State untuk dropdown other experience
  const [showOther, setShowOther] = useState(false);

  // Filter experience berdasarkan category
  const otherExperiences = OTHER_EXPERIENCES.filter((item) => item.category === 'other');
  const partTimeExperiences = OTHER_EXPERIENCES.filter((item) => item.category === 'parttime' || item.category === 'fulltime'
  );


  // ======================================================
  // REFRESH SCROLLTRIGGER SETELAH DROPDOWN DIBUKA
  // ======================================================

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 550);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [showOther]);

  // ======================================================
  // GSAP
  // ======================================================

  useGSAP(
    () => {
      // --------------------------------------------------
      // STAT CARDS
      // --------------------------------------------------

      gsap.fromTo(
        statsRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(1.4)',

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // --------------------------------------------------
      // COUNT UP
      // --------------------------------------------------

      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i];

        if (!el) return;

        const obj = {
          val: 0,
        };

        gsap.to(obj, {
          val: stat.value,

          duration: 2,

          ease: 'power2.out',

          delay: i * 0.12,

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },

          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });

      // --------------------------------------------------
      // TIMELINE HEIGHT
      // --------------------------------------------------

      const TARGET_HEIGHTS = EXPERIENCES.map((_, index) => {
        return `${((index + 1) / EXPERIENCES.length) * 100}%`;
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,

          start: 'top 80%',

          onEnter: () => {
            gsap.to(lineRef.current, {
              height: TARGET_HEIGHTS[i],

              duration: 0.8,

              ease: 'power2.out',
            });
          },

          onLeaveBack: () => {
            gsap.to(lineRef.current, {
              height:
                i === 0
                  ? '0%'
                  : TARGET_HEIGHTS[i - 1],

              duration: 0.8,

              ease: 'power2.out',
            });
          },
        });
      });

      // --------------------------------------------------
      // EXPERIENCE CARDS ENTRANCE
      // --------------------------------------------------

      const isMobile = window.innerWidth < 768;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const fromLeft = i % 2 === 0;

        const xOffset = isMobile
          ? 30
          : fromLeft
            ? -80
            : 80;

        gsap.fromTo(
          card,

          {
            x: xOffset,
            opacity: 0,
            y: 0,
          },

          {
            x: 0,

            opacity: 1,

            duration: 0.8,

            ease: 'back.out(1.6)',

            scrollTrigger: {
              trigger: card,

              start: 'top 80%',
            },

            onComplete: () => {
              // Floating animation setelah card masuk

              gsap.to(card, {
                y: -8,

                duration: 1.8 + i * 0.15,

                ease: 'sine.inOut',

                repeat: -1,

                yoyo: true,
              });
            },
          }
        );
      });
    },

    {
      scope: sectionRef,
    }
  );

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full z-20 mt-0 md:-mt-20 pt-8 pb-40 px-6 md:px-12 overflow-hidden"
    >
      {/* ================================================= */}
      {/* AMBIENT BACKGROUND GLOW */}
      {/* ================================================= */}

      <div
        className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none"
      />

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div className="mb-10 text-center mt-20">

          <p
            className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3"
          >
            Journey
          </p>

          <h2
            className="text-5xl md:text-7xl font-medium italic text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.35)] leading-none"
            style={{
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            Experience
          </h2>

        </div>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <div className="max-w-4xl mx-auto mb-20">

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
          >
            {STATS.map((stat, i) => (

              <div
                key={stat.label}
                ref={(el) => {
                  statsRef.current[i] = el;
                }}
                style={{
                  perspective: '800px',
                }}
                className="group"
              >

                <div
                  className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent shadow-[0_8px_32px_rgba(99,102,241,0.12),0_1px_0_rgba(255,255,255,0.4)_inset] transition-transform duration-500 ease-out group-hover:[transform:rotateX(6deg)_rotateY(-4deg)_scale(1.04)]"
                >

                  <div
                    className="relative rounded-[15px] bg-white/[0.06] backdrop-blur-md px-3 py-5 md:px-4 md:py-6 flex flex-col items-center text-center border border-white/20"
                  >

                    {/* Top light */}

                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    />

                    {/* Icon */}

                    <span className="text-xl md:text-2xl mb-3">
                      {stat.icon}
                    </span>

                    {/* Number */}

                    <div
                      className="relative text-2xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-300 leading-none mb-2"
                    >
                      <span
                        ref={(el) => {
                          counterRefs.current[i] = el;
                        }}
                      >
                        0
                      </span>

                      <span className="text-white">
                        {stat.suffix}
                      </span>

                    </div>

                    {/* Label */}

                    <p
                      className="text-[9px] md:text-xs text-slate-300 font-semibold tracking-wide"
                    >
                      {stat.label}
                    </p>

                  </div>

                </div>

              </div>

            ))}
          </div>

        </div>

        {/* ================================================= */}
        {/* MAIN EXPERIENCE TIMELINE */}
        {/* ================================================= */}

        <div className="relative">

          {/* ------------------------------------------------- */}
          {/* TIMELINE LINE */}
          {/* ------------------------------------------------- */}

          <div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full"
          >

            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500 rounded-full relative shadow-[0_0_8px_rgba(139,92,246,0.3)]"
              style={{
                height: '0%',
              }}
            >

              {/* Timeline Sun */}

              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 flex items-center justify-center pointer-events-none z-20"
              >

                <div
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 shadow-[0_0_16px_rgba(245,158,11,0.8),_0_0_32px_rgba(251,191,36,0.6)] relative flex items-center justify-center"
                >

                  <svg
                    className="absolute w-10 h-10 text-amber-300/80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="
                        M12 3v1
                        m0 16v1
                        m9-9h-1
                        M4 12H3
                        m15.364-6.364-.707.707
                        M6.343 17.657l-.707.707
                        m0-12.728.707.707
                        m11.314 11.314.707.707
                      "
                    />

                  </svg>

                </div>

              </div>

            </div>

          </div>

          {/* ------------------------------------------------- */}
          {/* EXPERIENCE CARDS */}
          {/* ------------------------------------------------- */}

          <div className="flex flex-col gap-14">

            {EXPERIENCES.map((exp, i) => {

              const isLeft = i % 2 === 0;

              return (

                <div
                  key={`${exp.company}-${i}`}
                  className="relative flex items-center"
                >

                  {/* Period */}

                  <div
                    className="absolute left-10 md:left-1/2 md:-translate-x-1/2 -top-7 z-20"
                  >

                    <span
                      className="text-[10px] md:text-[11px] font-semibold backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap text-purple-300 bg-black/60 border border-purple-500/20"
                    >
                      {exp.period}
                    </span>

                  </div>

                  {/* Spacer kanan / kiri */}

                  {!isLeft && (
                    <div className="hidden md:block flex-1 pr-8" />
                  )}

                  {/* Card */}

                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className={`flex-1 pl-10 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12' }`}
                  >

                    <div
                      className="relative rounded-2xl backdrop-blur-md p-5 transition-all duration-300 group overflow-hidden bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                    >

                      {/* Accent */}

                      <div
                        className={`absolute top-0 ${isLeft ? 'md:right-0 md:left-auto left-0' : 'left-0' } w-1 md:w-1.5 h-full bg-gradient-to-b ${exp.accent} rounded-full`}
                      />

                      {/* Header */}

                      <div
                        className="flex items-start justify-between gap-4 mb-3"
                      >

                        <div>

                          <h3
                            className="text-base md:text-lg font-bold leading-snug text-white"
                          >
                            {exp.role}
                          </h3>

                          <p
                            className="text-xs md:text-sm font-medium text-purple-300 mt-1"
                          >
                            {exp.company}
                          </p>

                        </div>

                        <span
                          className={`shrink-0 text-[9px] md:text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r ${exp.accent} text-white font-semibold shadow`}
                        >
                          {exp.type}
                        </span>

                      </div>

                      {/* Description */}

                      <p
                        className="text-xs md:text-[13px] leading-relaxed mb-4 text-slate-400"
                      >
                        {exp.description}
                      </p>

                      {/* Tags */}

                      <div className="flex flex-wrap gap-1.5">

                        {exp.tags.map((tag) => (

                          <span
                            key={tag}
                            className="text-[9px] md:text-[10px] px-2 py-1 rounded-full font-medium bg-white/5 border border-white/10 text-slate-300"
                          >
                            {tag}
                          </span>

                        ))}

                      </div>

                    </div>

                  </div>

                  {/* Spacer */}

                  {isLeft && (
                    <div className="hidden md:block flex-1 pl-8" />
                  )}

                </div>

              );

            })}

          </div>

        </div>

        {/* ================================================= */}
        {/* OTHER EXPERIENCE BUTTON */}
        {/* ================================================= */}

        <div
          className="relative mt-28 flex flex-col items-center z-30"
        >

          <button
            type="button"
            aria-expanded={showOther}
            onClick={() => {
              setShowOther((prev) => !prev);
            }}
            onMouseEnter={() => {
              setShowOther(true);
            }}
            className="group relative px-7 py-3 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-xl text-white font-semibold flex items-center gap-3 hover:bg-white/[0.12] hover:border-purple-400/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)] transition-all duration-300 cursor-pointer"
          >

            <span>
              Other Experiences
            </span>

            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showOther ? 'rotate-180' : '' }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />

            </svg>

          </button>

          {/* ================================================= */}
          {/* OTHER EXPERIENCE PANEL */}
          {/* ================================================= */}

          <div
            className={`w-full max-w-5xl overflow-hidden transition-all duration-500 ease-in-out ${showOther ? 'max-h-[1600px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0' }`}
          >

            <div
              className="relative rounded-[2rem] border border-white/10 bg-black/30 backdrop-blur-xl p-6 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden"
            >

              {/* Decorative Glow */}

              <div
                className="absolute -top-20 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
              />

              {/* ================================================= */}
              {/* OTHER EXPERIENCES */}
              {/* ================================================= */}

              <div className="relative z-10">

                <div className="mb-6">

                  <p
                    className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-purple-300/60 mb-2"
                  >
                    Additional Journey
                  </p>

                  <h3
                    className="text-xl md:text-2xl font-bold text-white"
                  >
                    Other Experiences
                  </h3>

                  <p
                    className="text-xs md:text-sm text-slate-400 mt-2 max-w-2xl"
                  >
                    Additional experiences in administration,
                    data management, public service and field activities.
                  </p>

                </div>

                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >

                  {otherExperiences.map(
                    (experience, index) => (

                      <div
                        key={`${experience.role}-${index}`}
                        className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:border-purple-400/30"
                      >

                        <div className="flex items-start gap-3">

                          {/* Icon */}

                          <div
                            className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform duration-300"
                          >

                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M12 21a9 9 0 100-18 9 9 0 000 18z"
                              />

                            </svg>

                          </div>

                          <div>

                            <h4
                              className="text-sm md:text-base text-white font-semibold"
                            >
                              {experience.role}
                            </h4>

                            <p
                              className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed"
                            >
                              {experience.company}
                            </p>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* ================================================= */}
              {/* DIVIDER */}
              {/* ================================================= */}

              <div
                className="relative z-10 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-10"
              />

              {/* ================================================= */}
              {/* PART TIME */}
              {/* ================================================= */}

              <div className="relative z-10">

                <div className="mb-6">

                  <p
                    className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-pink-300/60 mb-2"
                  >
                    Work Beyond Tech
                  </p>

                  <h3
                    className="text-xl md:text-2xl font-bold text-white"
                  >
                    Part-Time & Service Experience
                  </h3>

                  <p
                    className="text-xs md:text-sm text-slate-400 mt-2 max-w-2xl"
                  >
                    Experiences that strengthened my communication,
                    teamwork, discipline and customer service skills.
                  </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {partTimeExperiences.map((experience, index) => (
                    <div key={`${experience.role}-${index}`} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:border-pink-400/30">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-pink-500/10 border border-pink-400/20 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                          {experience.icon}
                        </div>

                        <div>
                          <h4 className="text-sm md:text-base text-white font-semibold">{experience.role}</h4>
                          <p className="text-xs text-slate-400 mt-1">{experience.company}</p>

                          <span className={`inline-block mt-3 text-[9px] uppercase tracking-[0.15em] ${experience.category === 'fulltime' ? 'text-emerald-300/70' : 'text-pink-300/60'}`}>
                            {experience.category === 'fulltime' ? 'Full-Time' : 'Part-Time'}
                          </span>
                        </div>

                      </div>

                    </div>

                  )
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};