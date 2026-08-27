import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../../utils/supabase';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// TYPES
// ======================================================

interface Comment {
  id: string;
  name: string;
  message: string;
  date: string;
  colorClass: string;
  rotation: number;
}

// ======================================================
// STICKY NOTE COLORS
// ======================================================

const PASTEL_COLORS = [
  'bg-yellow-200 text-yellow-950 border-yellow-300 shadow-yellow-200/30',
  'bg-pink-200 text-pink-950 border-pink-300 shadow-pink-200/30',
  'bg-blue-200 text-blue-950 border-blue-300 shadow-blue-200/30',
  'bg-green-200 text-green-950 border-green-300 shadow-green-200/30',
  'bg-purple-200 text-purple-950 border-purple-300 shadow-purple-200/30',
  'bg-orange-200 text-orange-950 border-orange-300 shadow-orange-200/30',
  'bg-cyan-200 text-cyan-950 border-cyan-300 shadow-cyan-200/30',
  'bg-rose-200 text-rose-950 border-rose-300 shadow-rose-200/30',
];

// ======================================================
// DESKTOP POSITIONS
// ======================================================

const CARD_WIDTH = 260;

const FIXED_SLOTS = [
  // LEFT
  { top: '12%', left: '4%', rotate: -4 },
  { top: '24%', left: '2%', rotate: 3 },
  { top: '36%', left: '5%', rotate: -2 },
  { top: '48%', left: '3%', rotate: 4 },
  { top: '60%', left: '2%', rotate: -3 },
  { top: '72%', left: '4%', rotate: 3 },

  // RIGHT
  {
    top: '12%',
    left: `calc(100% - ${CARD_WIDTH}px - 4%)`,
    rotate: 5,
  },
  {
    top: '24%',
    left: `calc(100% - ${CARD_WIDTH}px - 2%)`,
    rotate: -3,
  },
  {
    top: '36%',
    left: `calc(100% - ${CARD_WIDTH}px - 5%)`,
    rotate: 3,
  },
  {
    top: '48%',
    left: `calc(100% - ${CARD_WIDTH}px - 3%)`,
    rotate: -4,
  },
  {
    top: '60%',
    left: `calc(100% - ${CARD_WIDTH}px - 2%)`,
    rotate: 2,
  },
  {
    top: '72%',
    left: `calc(100% - ${CARD_WIDTH}px - 4%)`,
    rotate: 4,
  },
];

// ======================================================
// COMPONENT
// ======================================================

export const Section6: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const [honeypot, setHoneypot] = useState('');

  // ======================================================
  // DATE FORMATTER
  // ======================================================

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) {
      return 'Just now';
    }

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    }

    const diffHours = Math.floor(diffMins / 60);

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }

    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // ======================================================
  // VISUAL STYLE
  // ======================================================

  const createVisualStyle = (id: string) => {
    const numericId = Number(id) || 1;

    const colorIndex =
      numericId % PASTEL_COLORS.length;

    const rotationOptions = [
      -4,
      3,
      -2,
      4,
      -3,
      2,
    ];

    const rotation =
      rotationOptions[
        numericId % rotationOptions.length
      ];

    return {
      colorClass:
        PASTEL_COLORS[colorIndex],

      rotation,
    };
  };

  // ======================================================
  // FETCH COMMENTS
  // ======================================================

  const fetchComments = async () => {
    try {
      setLoading(true);

      const {
        data,
        error,
      } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', {
          ascending: false,
        })
        .limit(12);

      if (error) {
        throw new Error(
          error.message
        );
      }

      const mappedComments: Comment[] =
        (data ?? []).map((item) => {
          const visual =
            createVisualStyle(
              item.id.toString()
            );

          return {
            id:
              item.id.toString(),

            name:
              item.name,

            message:
              item.message,

            date:
              formatDate(
                item.created_at
              ),

            colorClass:
              visual.colorClass,

            rotation:
              visual.rotation,
          };
        });

      setComments(
        mappedComments
      );
    } catch (error) {
      console.error(
        'Error fetching guestbook:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // INITIAL FETCH + COOLDOWN
  // ======================================================

  useEffect(() => {
    fetchComments();

    const lastSubmit =
      localStorage.getItem(
        'last_guestbook_submit'
      );

    if (lastSubmit) {
      const elapsed =
        Date.now() -
        parseInt(
          lastSubmit,
          10
        );

      const remaining =
        Math.ceil(
          (60000 - elapsed) /
            1000
        );

      if (remaining > 0) {
        setCooldown(
          remaining
        );
      }
    }
  }, []);

  // ======================================================
  // COOLDOWN TIMER
  // ======================================================

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setCooldown(
          (prev) => {
            if (prev <= 1) {
              window.clearInterval(
                timer
              );

              return 0;
            }

            return prev - 1;
          }
        );
      }, 1000);

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, [cooldown]);

  // ======================================================
  // GSAP
  // ======================================================

  useGSAP(
    () => {
      gsap.fromTo(
        formRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',

          scrollTrigger: {
            trigger:
              containerRef.current,

            start:
              'top 60%',
          },
        }
      );
    },

    {
      scope:
        containerRef,
    }
  );

  // ======================================================
  // STICKY NOTE ENTRANCE ANIMATION
  // ======================================================

  const animateEntrance = (
    id: string
  ) => {
    window.setTimeout(() => {
      const el =
        document.getElementById(
          `comment-${id}`
        );

      if (!el) {
        return;
      }

      gsap.fromTo(
        el,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease:
            'back.out(1.4)',
        }
      );
    }, 50);
  };

  // ======================================================
  // PROFANITY FILTER
  // ======================================================

  const checkProfanity = (
    text: string
  ) => {
    const badWords = [
      'kontol',
      'memek',
      'jembut',
      'peler',
      'pepek',
      'ngentot',
      'ngentod',
      'anjing',
      'bangsat',
      'babi',
      'goblok',
      'tolol',
      'jancok',
      'jancuk',
      'pantek',
      'itil',
      'lonte',
    ];

    const lowerText =
      text.toLowerCase();

    for (
      const word of badWords
    ) {
      const pattern = word
        .split('')
        .map(
          (character) =>
            `${character}+`
        )
        .join('');

      const regex =
        new RegExp(
          `\\b${pattern}\\b`,
          'i'
        );

      if (
        regex.test(
          lowerText
        ) ||
        lowerText.includes(
          word
        )
      ) {
        return true;
      }
    }

    return false;
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      isSubmitting ||
      cooldown > 0
    ) {
      return;
    }

    // Honeypot anti bot
    if (honeypot) {
      setName('');
      setMessage('');
      setHoneypot('');

      return;
    }

    const cleanName =
      name.trim();

    const cleanMessage =
      message.trim();

    // Empty validation
    if (
      !cleanName ||
      !cleanMessage
    ) {
      alert(
        'Nama dan pesan harus diisi.'
      );

      return;
    }

    // Length validation
    if (
      cleanName.length > 50
    ) {
      alert(
        'Nama maksimal 50 karakter.'
      );

      return;
    }

    if (
      cleanMessage.length >
      300
    ) {
      alert(
        'Pesan maksimal 300 karakter.'
      );

      return;
    }

    // Profanity check
    if (
      checkProfanity(
        cleanName
      ) ||
      checkProfanity(
        cleanMessage
      )
    ) {
      alert(
        'Pesan mengandung kata yang tidak diperbolehkan.'
      );

      return;
    }

    // URL spam blocker
    const urlRegex =
      /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\.[a-zA-Z]{2,6}\b)/i;

    if (
      urlRegex.test(
        cleanMessage
      ) ||
      urlRegex.test(
        cleanName
      )
    ) {
      alert(
        'Link atau URL tidak diperbolehkan di guestbook.'
      );

      return;
    }

    // ===================================================
    // CAPTCHA
    // ===================================================

    const n1 =
      Math.floor(
        Math.random() * 8
      ) + 2;

    const n2 =
      Math.floor(
        Math.random() * 8
      ) + 2;

    const correctAnswer =
      n1 + n2;

    const answerInput =
      window.prompt(
        `Verifikasi: ${n1} + ${n2} = ?`
      );

    if (
      answerInput === null
    ) {
      return;
    }

    if (
      Number(
        answerInput.trim()
      ) !== correctAnswer
    ) {
      alert(
        'Jawaban verifikasi salah.'
      );

      return;
    }

    // ===================================================
    // INSERT SUPABASE
    // ===================================================

    try {
      setIsSubmitting(
        true
      );

      const {
        data,
        error,
      } = await supabase
        .from('guestbook')
        .insert([
          {
            name:
              cleanName,

            message:
              cleanMessage,
          },
        ])
        .select()
        .single();

      console.log(
        'SUPABASE DATA:',
        data
      );

      console.log(
        'SUPABASE ERROR:',
        error
      );

      if (error) {
        throw new Error(
          error.message
        );
      }

      if (!data) {
        throw new Error(
          'Supabase tidak mengembalikan data.'
        );
      }

      // ===================================================
      // CREATE COMMENT OBJECT
      // ===================================================

      const visual =
        createVisualStyle(
          data.id.toString()
        );

      const newComment: Comment =
        {
          id:
            data.id.toString(),

          name:
            data.name,

          message:
            data.message,

          date:
            'Just now',

          colorClass:
            visual.colorClass,

          rotation:
            visual.rotation,
        };

      // ===================================================
      // UPDATE UI
      // ===================================================

      setComments(
        (prev) =>
          [
            newComment,
            ...prev,
          ].slice(
            0,
            12
          )
      );

      animateEntrance(
        newComment.id
      );

      // clear inputs
      setName('');
      setMessage('');
      setHoneypot('');

      // ===================================================
      // COOLDOWN
      // ===================================================

      const now =
        Date.now();

      localStorage.setItem(
        'last_guestbook_submit',
        now.toString()
      );

      setCooldown(60);

      console.log(
        'Guestbook berhasil dikirim:',
        data
      );
    } catch (error) {
      console.error(
        'Error posting guestbook:',
        error
      );

      if (
        error instanceof Error
      ) {
        alert(
          `Pesan gagal dikirim: ${error.message}`
        );
      } else {
        alert(
          'Pesan gagal dikirim. Silakan coba lagi.'
        );
      }
    } finally {
      setIsSubmitting(
        false
      );
    }
  };

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <section
      ref={containerRef}
      id="guestbook"
      className="
        relative
        w-full
        min-h-screen

        py-28
        px-6

        bg-gradient-to-b
        from-white
        via-sky-100
        to-slate-950

        text-slate-800

        flex
        flex-col
        items-center
        justify-center

        gap-8

        overflow-x-hidden
        overflow-y-visible

        md:overflow-hidden
      "
    >
      {/* ================================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================================= */}

      <div
        className="
          absolute
          top-[20%]
          left-1/2
          -translate-x-1/2

          w-[600px]
          h-[600px]

          bg-sky-200/40

          rounded-full

          blur-[140px]

          pointer-events-none

          z-0
        "
      />

      {/* ================================================= */}
      {/* DESKTOP STICKY NOTES */}
      {/* ================================================= */}

      <div
        className="
          absolute
          inset-0

          z-0

          pointer-events-none

          select-none
        "
      >
        {comments.map(
          (
            comment,
            index
          ) => {
            const slot =
              FIXED_SLOTS[
                index
              ];

            if (!slot) {
              return null;
            }

            return (
              <div
                key={
                  comment.id
                }
                id={`comment-${comment.id}`}
                style={{
                  position:
                    'absolute',

                  top:
                    slot.top,

                  left:
                    slot.left,

                  transform:
                    `rotate(${comment.rotation}deg)`,
                }}
                className={`
                  hidden
                  md:flex

                  flex-col

                  p-4

                  w-[260px]

                  rounded-2xl

                  border

                  shadow-lg

                  backdrop-blur-sm

                  pointer-events-auto

                  transition-all
                  duration-300

                  hover:scale-105

                  ${comment.colorClass}
                `}
              >
                <div
                  className="
                    flex
                    justify-between
                    items-center

                    gap-2

                    mb-1
                  "
                >
                  <span
                    className="
                      font-extrabold

                      text-xs

                      tracking-wide

                      truncate

                      max-w-[150px]
                    "
                  >
                    {
                      comment.name
                    }
                  </span>

                  <span
                    className="
                      text-[9px]

                      opacity-60

                      font-semibold

                      shrink-0
                    "
                  >
                    {
                      comment.date
                    }
                  </span>
                </div>

                <p
                  className="
                    text-[11px]

                    leading-relaxed

                    font-semibold

                    break-words

                    opacity-95
                  "
                >
                  "
                  {
                    comment.message
                  }
                  "
                </p>
              </div>
            );
          }
        )}
      </div>

      {/* ================================================= */}
      {/* FORM */}
      {/* ================================================= */}

      <div
        className="
          flex
          justify-center

          w-full

          z-20
        "
      >
        <div
          ref={formRef}
          className="
            relative

            w-full
            max-w-sm

            rounded-3xl

            border
            border-white/60

            bg-white/70

            backdrop-blur-xl

            p-8

            shadow-2xl

            text-left
          "
        >
          {/* FORM DECORATION */}

          <div
            className="
              absolute

              -top-3
              -right-3

              w-10
              h-10

              bg-indigo-500/20

              rounded-full

              blur-xl

              pointer-events-none
            "
          />

          {/* HEADING */}

          <h3
            className="
              text-4xl
              md:text-5xl

              font-medium

              italic

              text-indigo-950

              text-center

              leading-none

              mb-3
            "
            style={{
              fontFamily:
                "'Dancing Script', cursive",
            }}
          >
            Leave a Trace
          </h3>

          <p
            className="
              text-slate-600

              text-xs
              md:text-sm

              text-center

              font-medium

              max-w-[280px]

              mx-auto

              mb-6

              leading-relaxed
            "
          >
            Tulis pesan,
            feedback, atau
            sekadar say hi dan
            tinggalkan sticky
            note di wall ini.
          </p>

          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            onSubmit={
              handleSubmit
            }
            className="
              flex
              flex-col
              gap-4
            "
          >
            {/* Honeypot */}

            <input
              type="text"
              name="website_confirm"
              value={
                honeypot
              }
              onChange={(
                e
              ) =>
                setHoneypot(
                  e.target
                    .value
                )
              }
              className="
                absolute
                opacity-0
                w-0
                h-0
                pointer-events-none
              "
              tabIndex={-1}
              autoComplete="off"
            />

            {/* NAME */}

            <div
              className="
                flex
                flex-col
                gap-1
              "
            >
              <label
                className="
                  text-[10px]

                  font-bold

                  text-indigo-950

                  tracking-wider
                "
              >
                YOUR NAME
              </label>

              <input
                type="text"
                placeholder="Name or handle..."
                value={
                  name
                }
                onChange={(
                  e
                ) =>
                  setName(
                    e.target
                      .value
                  )
                }
                maxLength={
                  50
                }
                required
                className="
                  px-4
                  py-2.5

                  rounded-lg

                  bg-white/50

                  border
                  border-slate-200

                  text-slate-800

                  placeholder-slate-400

                  focus:outline-none

                  focus:border-indigo-500

                  transition-colors

                  text-xs

                  font-semibold
                "
              />

              <span
                className="
                  text-[9px]

                  text-slate-400

                  text-right
                "
              >
                {
                  name.length
                }
                /50
              </span>
            </div>

            {/* MESSAGE */}

            <div
              className="
                flex
                flex-col
                gap-1
              "
            >
              <label
                className="
                  text-[10px]

                  font-bold

                  text-indigo-950

                  tracking-wider
                "
              >
                YOUR STICKY NOTE
              </label>

              <textarea
                placeholder="Write your comment here..."
                value={
                  message
                }
                onChange={(
                  e
                ) =>
                  setMessage(
                    e.target
                      .value
                  )
                }
                maxLength={
                  300
                }
                rows={4}
                required
                className="
                  px-4
                  py-2.5

                  rounded-lg

                  bg-white/50

                  border
                  border-slate-200

                  text-slate-800

                  placeholder-slate-400

                  focus:outline-none

                  focus:border-indigo-500

                  transition-colors

                  text-xs

                  font-semibold

                  resize-none
                "
              />

              <span
                className="
                  text-[9px]

                  text-slate-400

                  text-right
                "
              >
                {
                  message.length
                }
                /300
              </span>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={
                isSubmitting ||
                cooldown >
                  0
              }
              className={`
                mt-2

                w-full

                py-2.5

                rounded-lg

                text-white

                font-bold

                transition-all

                shadow-md

                text-xs

                tracking-wider

                ${
                  isSubmitting ||
                  cooldown > 0
                    ? 'bg-slate-400 cursor-not-allowed opacity-80'
                    : 'bg-indigo-950 hover:bg-indigo-900'
                }
              `}
            >
              {cooldown >
              0
                ? `COOLDOWN (${cooldown}s)`
                : isSubmitting
                  ? 'SENDING...'
                  : 'POST STICKY NOTE'}
            </button>
          </form>

          {/* LOADING */}

          {loading && (
            <p
              className="
                text-[10px]

                text-center

                text-slate-400

                mt-4
              "
            >
              Loading
              guestbook...
            </p>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* MOBILE STICKY NOTES */}
      {/* ================================================= */}

      <div
        className="
          md:hidden

          w-full
          max-w-sm

          flex
          flex-col

          gap-4

          z-10
        "
      >
        <h4
          className="
            text-lg

            font-bold

            text-indigo-950/80

            text-center

            mb-1

            uppercase

            tracking-wider
          "
        >
          Sticky Notes
        </h4>

        {!loading &&
          comments.length ===
            0 && (
            <p
              className="
                text-center

                text-sm

                text-slate-500
              "
            >
              Belum ada
              pesan. Jadilah
              yang pertama
              meninggalkan
              jejak ✨
            </p>
          )}

        <div
          className="
            flex
            flex-col

            gap-4

            max-h-[420px]

            overflow-y-auto

            pr-1
          "
        >
          {comments.map(
            (
              comment
            ) => (
              <div
                key={
                  comment.id
                }
                className={`
                  flex
                  flex-col

                  p-4

                  rounded-xl

                  border

                  shadow-sm

                  ${comment.colorClass}
                `}
              >
                <div
                  className="
                    flex
                    justify-between
                    items-center

                    gap-3

                    mb-2
                  "
                >
                  <span
                    className="
                      font-extrabold

                      text-sm

                      tracking-wide

                      truncate
                    "
                  >
                    {
                      comment.name
                    }
                  </span>

                  <span
                    className="
                      text-[10px]

                      opacity-60

                      font-semibold

                      shrink-0
                    "
                  >
                    {
                      comment.date
                    }
                  </span>
                </div>

                <p
                  className="
                    text-xs

                    leading-relaxed

                    font-semibold

                    break-words
                  "
                >
                  "
                  {
                    comment.message
                  }
                  "
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};