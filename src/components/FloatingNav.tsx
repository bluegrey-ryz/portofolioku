import React, { useEffect, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },

  {
    id: 'about',
    label: 'About',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },

  {
    id: 'tech-stack',
    label: 'Skills',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },

  {
    id: 'experience',
    label: 'Journey',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },

  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },

  {
    id: 'guestbook',
    label: 'Wall',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
    ),
  },

  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState('hero');

  useEffect(() => {
    let rafId: number | null = null;

    const updateActiveSection = () => {
      const viewportPoint =
        window.innerHeight * 0.35;

      let currentSection = 'hero';

      for (const item of NAV_ITEMS) {
        const element =
          document.getElementById(
            item.id
          );

        if (!element) {
          continue;
        }

        const rect =
          element.getBoundingClientRect();

        const isInside =
          rect.top <= viewportPoint &&
          rect.bottom >
            viewportPoint;

        if (isInside) {
          currentSection =
            item.id;

          break;
        }
      }

      setActiveSection(
        currentSection
      );

      rafId = null;
    };

    const handleScroll = () => {
      if (rafId !== null) {
        return;
      }

      rafId =
        window.requestAnimationFrame(
          updateActiveSection
        );
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      'resize',
      handleScroll
    );

    updateActiveSection();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
        handleScroll
      );

      if (rafId !== null) {
        window.cancelAnimationFrame(
          rafId
        );
      }
    };
  }, []);

  const handleNavClick = (
    id: string
  ) => {
    const element =
      document.getElementById(id);

    if (!element) {
      return;
    }

    setActiveSection(id);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <nav
      aria-label="Portfolio navigation"
      className="
        fixed

        bottom-4
        md:bottom-6

        left-1/2
        -translate-x-1/2

        z-[100]

        flex
        items-center

        max-w-[calc(100vw-24px)]

        bg-black/65

        backdrop-blur-xl

        border
        border-white/10

        rounded-full

        p-1.5

        shadow-[0_20px_50px_rgba(0,0,0,0.5)]

        transition-all
        duration-300

        hover:border-purple-500/40
      "
    >
      {NAV_ITEMS.map(
        (item) => {
          const isActive =
            activeSection ===
            item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                handleNavClick(
                  item.id
                )
              }
              aria-label={
                item.label
              }
              aria-current={
                isActive
                  ? 'page'
                  : undefined
              }
              className={`
                relative

                px-2.5
                py-2.5

                sm:px-3

                md:px-4
                md:py-2

                rounded-full

                text-xs

                font-bold

                uppercase

                tracking-wider

                transition-all
                duration-300

                flex
                items-center
                justify-center

                gap-2

                group

                ${
                  isActive
                    ? 'text-white scale-105'
                    : 'text-slate-400 hover:text-slate-200'
                }
              `}
            >
              {/* Active Background */}

              <span
                className={`
                  absolute
                  inset-0

                  rounded-full

                  bg-gradient-to-r
                  from-purple-600
                  via-indigo-600
                  to-purple-600

                  shadow-[0_0_15px_rgba(139,92,246,0.5)]

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75'
                  }
                `}
              />

              {/* Icon */}

              <span
                className="
                  relative
                  z-10

                  flex
                  items-center
                  justify-center
                "
              >
                {item.icon}
              </span>

              {/* Desktop Label */}

              <span
                className="
                  hidden
                  md:inline

                  relative
                  z-10

                  text-[10px]
                "
              >
                {item.label}
              </span>

              {/* Mobile Tooltip */}

              <span
                className="
                  md:hidden

                  absolute

                  bottom-12

                  left-1/2
                  -translate-x-1/2

                  px-2
                  py-1

                  bg-black/90

                  border
                  border-white/10

                  rounded-md

                  text-[9px]

                  font-bold

                  text-white

                  tracking-widest

                  pointer-events-none

                  opacity-0

                  group-hover:opacity-100

                  group-focus-visible:opacity-100

                  transition-opacity
                  duration-200

                  whitespace-nowrap

                  shadow-xl
                "
              >
                {item.label}
              </span>
            </button>
          );
        }
      )}
    </nav>
  );
};