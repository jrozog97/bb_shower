import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Activity, Clock, Sparkles, Heart, Baby, BookOpen } from 'lucide-react';

export interface ItineraryChapter {
  id: number;
  time: string;
  chapterTitle: string;
  medicalNote: string;
  babyPose: 'wave' | 'kick' | 'cake' | 'gift' | 'sleep';
  storyText: string;
  bpm: number;
  badgeLabel: string;
}

const chapters: ItineraryChapter[] = [
  {
    id: 1,
    time: '2:00 PM',
    chapterTitle: 'Capítulo 1: La Gran Bienvenida',
    medicalNote: 'ECOGRAFÍA 4D · RECEPTIVIDAD MÁXIMA',
    badgeLabel: 'Llegada & Brindis',
    babyPose: 'wave',
    storyText: '¡Siento que ya llegaron! Abro mis ojitos en la pancita de mamá mientras mis papitos Alejandra y Andrés los reciben con una sonrisa gigante, música suave y deliciosas bebidas de bienvenida.',
    bpm: 142,
  },
  {
    id: 2,
    time: '3:30 PM',
    chapterTitle: 'Capítulo 2: Risas y Dinámicas',
    medicalNote: 'ACTIVIDAD MOTRIZ · PATADITAS DE ALEGRÍA',
    badgeLabel: 'Juegos & Risas',
    babyPose: 'kick',
    storyText: '¡Escucho tantas carcajadas allá afuera! Empiezo a dar volteretas y pataditas de felicidad mientras juegan, miden la pancita de mami y compiten por lindos premios para llevar a casa.',
    bpm: 154,
  },
  {
    id: 3,
    time: '4:45 PM',
    chapterTitle: 'Capítulo 3: Mesa Dulce y Pastel',
    medicalNote: 'DULZURA TOTAL · ANTOJITOS DE BEBÉ',
    badgeLabel: 'Torta & Brindis',
    babyPose: 'cake',
    storyText: 'Mmm... ¡a mamá le dio antojito de algo muy rico! Compartiremos la torta más deliciosa, una mesa de postres soñada y un brindis en mi honor cargado de bendiciones.',
    bpm: 145,
  },
  {
    id: 4,
    time: '5:45 PM',
    chapterTitle: 'Capítulo 4: Lluvia de Sobres y Amor',
    medicalNote: 'ECO-DETECCIÓN · ABRAZOS Y DETALLES',
    badgeLabel: 'Lluvia de Sobres',
    babyPose: 'gift',
    storyText: 'Mis papis recibirán con todo el agradecimiento sus sobres y regalitos para mi ajuar en el cofre del salón. ¡Cada detalle guardará su inmenso cariño para cuando nazca!',
    bpm: 148,
  },
  {
    id: 5,
    time: '6:45 PM',
    chapterTitle: 'Capítulo 5: Agradecimiento y Dulces Sueños',
    medicalNote: 'REPOSO PLÁCIDO · CORAZÓN CONTENTO',
    badgeLabel: 'Despedida',
    babyPose: 'sleep',
    storyText: 'Me voy quedando dormidito con el corazón rebosante de amor. Mis papitos les entregarán los recordatorios y nos despediremos con abrazos interminables. ¡Gracias por quererme tanto!',
    bpm: 138,
  },
];

export const StoryUltrasoundItinerary: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? chapters.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev === chapters.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const current = chapters[currentIdx];

  // Render high-definition artistic ultrasound SVG poses for baby Benjamín
  const renderBabyUltrasoundPose = (pose: ItineraryChapter['babyPose']) => {
    switch (pose) {
      case 'wave':
        return (
          <g>
            {/* Womb cavity fluid gradient */}
            <ellipse cx="110" cy="72" rx="80" ry="52" fill="url(#wombGrad)" />
            {/* Acoustic shadow */}
            <path d="M70 115 L150 115 L135 128 L85 128 Z" fill="#000000" opacity="0.4" />
            
            {/* Baby Fetal Body - Pearlescent tissue layers */}
            {/* Head profile */}
            <path
              d="M74 52 C74 40, 94 36, 102 46 C106 50, 105 57, 101 62 C96 68, 80 68, 74 52 Z"
              fill="url(#tissueGrad)"
              filter="url(#tissueGlow)"
            />
            {/* Little baby face profile: forehead, button nose, chin */}
            <path
              d="M98 44 Q102 48 100 51 Q103 52 101 54 Q101 57 97 59 Q95 62 90 62"
              stroke="#F4FBF2"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
            {/* Gentle eye line sleeping / smiling */}
            <path d="M92 49 Q95 51 93 53" stroke="#90A68A" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Fetal Curved Spine and Torso */}
            <path
              d="M78 58 C66 70, 72 96, 95 100 C110 102, 126 94, 128 82 C130 70, 110 65, 95 68"
              fill="url(#tissueGrad)"
            />
            {/* Vertebrae highlight arc */}
            <path
              d="M74 62 Q66 78 74 92"
              stroke="#F4FBF2"
              strokeWidth="2"
              strokeDasharray="2 3"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Arm raised waving hello */}
            <path
              d="M92 68 Q108 55 118 42"
              stroke="#E8F4E5"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Tiny baby hand with open waving fingers */}
            <circle cx="120" cy="40" r="4.5" fill="#FFFFFF" filter="url(#tissueGlow)" />
            <circle cx="123" cy="36" r="1.5" fill="#FFFFFF" />
            <circle cx="120" cy="34" r="1.4" fill="#FFFFFF" />
            <circle cx="117" cy="35" r="1.3" fill="#FFFFFF" />

            {/* Curled legs */}
            <path
              d="M108 94 Q128 98 126 84 Q124 74 116 78"
              stroke="#D8E8D4"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Tiny cute baby foot */}
            <ellipse cx="128" cy="84" rx="4" ry="2.5" transform="rotate(-15 128 84)" fill="#FFFFFF" />

            {/* Sparkle of greeting */}
            <path d="M132 34 L134 38 L138 40 L134 42 L132 46 L130 42 L126 40 L130 38 Z" fill="#FFE5B2" opacity="0.9" />
          </g>
        );

      case 'kick':
        return (
          <g>
            <ellipse cx="110" cy="72" rx="80" ry="52" fill="url(#wombGrad)" />
            {/* Head tucked down excitedly */}
            <path
              d="M68 56 C68 44, 88 40, 96 50 C100 54, 98 62, 94 66 C88 72, 74 70, 68 56 Z"
              fill="url(#tissueGrad)"
              filter="url(#tissueGlow)"
            />
            <path
              d="M92 48 Q96 52 94 55 Q97 56 95 58 Q94 61 90 63"
              stroke="#F4FBF2"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Torso */}
            <path
              d="M74 62 C64 74, 70 98, 92 100 C108 101, 120 90, 120 80 C120 68, 102 65, 88 68"
              fill="url(#tissueGrad)"
            />
            {/* Little arms hugging chest */}
            <path d="M84 70 Q94 76 102 70" stroke="#E8F4E5" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            {/* Big playful KICK leg outstretched high! */}
            <path
              d="M106 82 Q125 76 142 66"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              filter="url(#tissueGlow)"
            />
            {/* Little foot kicking */}
            <ellipse cx="145" cy="64" rx="4.5" ry="3" transform="rotate(-20 145 64)" fill="#FFFFFF" />
            <circle cx="148" cy="62" r="1.3" fill="#FFFFFF" />
            <circle cx="147" cy="60" r="1.2" fill="#FFFFFF" />

            {/* Other leg bent */}
            <path d="M102 92 Q112 102 118 96" stroke="#D8E8D4" strokeWidth="5.5" strokeLinecap="round" fill="none" />

            {/* Kinetic motion sound ripples */}
            <path d="M152 56 Q156 64 152 72" stroke="#C6A67A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.85" />
            <path d="M157 52 Q163 64 157 76" stroke="#8A9A83" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
          </g>
        );

      case 'cake':
        return (
          <g>
            <ellipse cx="110" cy="72" rx="80" ry="52" fill="url(#wombGrad)" />
            {/* Head profile */}
            <path
              d="M74 52 C74 40, 94 36, 102 46 C106 50, 105 57, 101 62 C96 68, 80 68, 74 52 Z"
              fill="url(#tissueGrad)"
              filter="url(#tissueGlow)"
            />
            {/* Face */}
            <path
              d="M98 44 Q102 48 100 51 Q103 52 101 54 Q101 57 97 59"
              stroke="#F4FBF2"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Torso */}
            <path
              d="M78 58 C66 70, 72 96, 95 100 C110 102, 126 94, 128 82 C130 70, 110 65, 95 68"
              fill="url(#tissueGrad)"
            />
            {/* Baby sucking thumb / hand near mouth enjoying sweets */}
            <path
              d="M88 72 Q100 68 98 56"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              filter="url(#tissueGlow)"
            />
            <circle cx="98" cy="54" r="3.2" fill="#FFFFFF" />

            {/* Curled legs */}
            <path d="M106 92 Q122 96 122 84" stroke="#D8E8D4" strokeWidth="6" strokeLinecap="round" fill="none" />

            {/* Sweet glowing cupcake icon floating near mommy's tummy */}
            <g transform="translate(132, 50)" filter="url(#goldGlow)">
              <path d="M2 14 L18 14 L15 24 L5 24 Z" fill="#D4B895" />
              <path d="M0 14 Q10 4 20 14 Z" fill="#FFF4E0" />
              <circle cx="10" cy="6" r="2.8" fill="#FF8A8A" />
              <line x1="10" y1="3" x2="10" y2="1" stroke="#FF5555" strokeWidth="1" />
            </g>
          </g>
        );

      case 'gift':
        return (
          <g>
            <ellipse cx="110" cy="72" rx="80" ry="52" fill="url(#wombGrad)" />
            {/* Head */}
            <path
              d="M74 52 C74 40, 94 36, 102 46 C106 50, 105 57, 101 62 C96 68, 80 68, 74 52 Z"
              fill="url(#tissueGrad)"
              filter="url(#tissueGlow)"
            />
            <path
              d="M98 44 Q102 48 100 51 Q103 52 101 54 Q101 57 97 59"
              stroke="#F4FBF2"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Torso */}
            <path
              d="M78 58 C66 70, 72 96, 95 100 C110 102, 126 94, 128 82 C130 70, 110 65, 95 68"
              fill="url(#tissueGrad)"
            />
            {/* Hands clutching an illuminated gift envelope */}
            <path d="M88 70 Q98 76 106 72" stroke="#E8F4E5" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            {/* Glowing Golden Gift Envelope */}
            <g transform="translate(118, 54)" filter="url(#goldGlow)">
              <rect x="0" y="0" width="22" height="15" rx="3" fill="#D4B895" stroke="#FFF7EB" strokeWidth="1" />
              <path d="M0 0 L11 9 L22 0" stroke="#FFF7EB" strokeWidth="1.2" fill="none" />
              {/* Little red wax heart seal on the gift */}
              <circle cx="11" cy="9" r="2.5" fill="#D9534F" />
            </g>

            {/* Curled legs */}
            <path d="M106 94 Q124 96 122 84" stroke="#D8E8D4" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'sleep':
      default:
        return (
          <g>
            <ellipse cx="110" cy="72" rx="80" ry="52" fill="url(#wombGrad)" />
            {/* Peaceful Sleeping Baby curled in pure bliss */}
            <path
              d="M72 56 C72 44, 92 40, 100 50 C104 54, 102 62, 98 66 C92 72, 78 70, 72 56 Z"
              fill="url(#tissueGrad)"
              filter="url(#tissueGlow)"
            />
            {/* Sweet sleeping curved eye */}
            <path d="M88 54 Q92 58 96 54" stroke="#8A9A83" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            
            {/* Torso curled in fetal peace */}
            <path
              d="M78 64 C66 76, 72 98, 96 102 C114 104, 126 92, 126 80 C126 68, 106 66, 92 68"
              fill="url(#tissueGrad)"
            />
            {/* Hands tucked warmly under cheek */}
            <path d="M84 72 Q94 74 96 66" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="96" cy="64" r="3" fill="#FFFFFF" />

            {/* Curled legs hugging tummy */}
            <path d="M108 92 Q122 96 118 84 Q116 76 106 80" stroke="#D8E8D4" strokeWidth="6" strokeLinecap="round" fill="none" />

            {/* Golden Dream Stars and Floating Zzz */}
            <g fill="#FFE5B2" opacity="0.95" filter="url(#goldGlow)">
              <text x="132" y="46" fontSize="11" fontFamily="'Playfair Display', serif" fontWeight="bold">z</text>
              <text x="142" y="38" fontSize="14" fontFamily="'Playfair Display', serif" fontWeight="bold">Z</text>
              <text x="154" y="28" fontSize="17" fontFamily="'Playfair Display', serif" fontWeight="bold">Z</text>
              {/* Little dream star */}
              <path d="M126 28 L127.5 32 L131.5 33.5 L127.5 35 L126 39 L124.5 35 L120.5 33.5 L124.5 32 Z" />
            </g>
          </g>
        );
    }
  };

  return (
    <section className="py-9 px-4 sm:px-6 text-center select-none relative">
      {/* Narrative Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EC] border border-[#8A9A83]/40 text-[#6E8168] text-[10px] font-sans-clean font-bold tracking-widest uppercase mb-1.5">
          <BookOpen className="w-3 h-3 text-[#8A9A83]" />
          <span>Cuento del Gran Día</span>
        </div>
        <h3 className="font-script text-4xl sm:text-5xl text-[#555A4F] leading-tight">
          El Itinerario de Benjamín
        </h3>
        <p className="font-serif-clean italic text-xs text-stone-600 max-w-xs mx-auto mt-1 leading-relaxed">
          &ldquo;Una mirada mágica a mi fiesta desde la pancita de mamá&rdquo;
        </p>
      </motion.div>

      {/* The Storybook Ultrasound Interactive Monitor Card */}
      <div 
        className="relative max-w-sm mx-auto rounded-3xl bg-[#151c16] border-4 border-[#C6A67A]/60 shadow-2xl overflow-hidden p-4 sm:p-5 text-left"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Global SVG filters and gradients for Ultrasound monitor */}
        <svg className="sr-only" aria-hidden="true">
          <defs>
            <radialGradient id="wombGrad" cx="45%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#253528" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#141f17" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0b120c" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="tissueGrad" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#EBF6E8" />
              <stop offset="70%" stopColor="#C9DEC5" />
              <stop offset="100%" stopColor="#9AB895" />
            </radialGradient>
            <filter id="tissueGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#BDE2B7" floodOpacity="0.5" />
            </filter>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFDE99" floodOpacity="0.7" />
            </filter>
          </defs>
        </svg>

        {/* Ultrasound Top Diagnostic Telemetry Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 text-[10px] font-mono tracking-wider text-[#A8BC9F]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8A9A83] animate-ping" />
            <Activity className="w-3.5 h-3.5 text-[#A8BC9F]" />
            <span className="font-bold text-[#D6E5D3]">ECOGRAFÍA 4D</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[#FFE5B2]">
              <Heart className="w-3 h-3 text-[#FF7070] fill-[#FF7070] animate-pulse" />
              <span>{current.bpm} lpm</span>
            </div>
            <span className="text-white/50">· SEM 28</span>
          </div>
        </div>

        {/* Ultrasound Screen Viewport Frame */}
        <div className="relative w-full h-40 sm:h-44 rounded-2xl bg-[#090f0a] border border-[#8A9A83]/30 overflow-hidden flex items-center justify-center shadow-inner">
          {/* Sonogram Sector Beam Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#8A9A83]/5 via-[#8A9A83]/15 to-[#8A9A83]/25 pointer-events-none"
            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
          />

          {/* Calibrated ultrasound scan depth grid lines */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#A8BC9F_1px,transparent_1px)] bg-[size:14px_14px]" />
          
          {/* Depth Scale on the right */}
          <div className="absolute right-1 top-2 bottom-2 flex flex-col justify-between text-[7px] font-mono text-white/30 pointer-events-none">
            <span>- 2cm</span>
            <span>- 4cm</span>
            <span>- 6cm</span>
            <span>- 8cm</span>
            <span>- 10cm</span>
          </div>

          {/* Time Badge in the Screen */}
          <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-black/70 border border-white/15 text-[10px] font-mono text-[#D4B895] flex items-center gap-1.5 shadow-sm">
            <Clock className="w-3 h-3 text-[#8A9A83]" />
            <span className="font-bold">{current.time}</span>
          </div>

          {/* Chapter Pill in the Screen */}
          <div className="absolute top-2.5 right-6 z-10 px-2 py-0.5 rounded-md bg-black/60 text-[9px] font-mono text-[#EBF3EC] border border-white/10">
            {current.id} de {chapters.length}
          </div>

          {/* Baby Ultrasound Illustration SVG */}
          <svg viewBox="0 0 220 135" className="w-full h-full drop-shadow-md">
            {renderBabyUltrasoundPose(current.babyPose)}
          </svg>

          {/* Dynamic ECG Heartbeat Monitor Line at bottom of screen */}
          <div className="absolute bottom-1.5 left-2 right-12 flex items-center gap-1 text-[8px] font-mono text-[#8A9A83]">
            <svg viewBox="0 0 160 14" className="w-full h-3 opacity-75">
              <path
                d="M0 7 L30 7 L35 2 L40 12 L45 0 L50 14 L55 7 L90 7 L95 3 L100 11 L105 1 L110 13 L115 7 L160 7"
                stroke="#A8BC9F"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[7.5px] text-white/40 shrink-0">FCF: OK</span>
          </div>
        </div>

        {/* Story Narration Content Box (Benjamín's Words) */}
        <div className="mt-3.5 min-h-[125px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#C6A67A] font-bold">
                  {current.medicalNote}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#8A9A83]/30 text-[9.5px] text-[#D6E5D3] font-sans-clean font-semibold">
                  {current.badgeLabel}
                </span>
              </div>

              <h4 className="font-serif-clean text-lg sm:text-xl text-white font-bold tracking-wide">
                {current.chapterTitle}
              </h4>

              <p className="text-xs sm:text-[13px] text-[#E4EDE2] font-sans-clean leading-relaxed font-light">
                &ldquo;{current.storyText}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Stepper Navigation Controls */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="Capítulo anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Chapter Quick Tap Pills */}
          <div className="flex items-center gap-1.5">
            {chapters.map((chap, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentIdx
                    ? 'w-7 bg-[#C6A67A] shadow-xs'
                    : 'w-2 bg-white/25 hover:bg-white/45'
                }`}
                title={`Ver ${chap.badgeLabel}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-full bg-[#8A9A83] hover:bg-[#788871] text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md"
            title="Siguiente capítulo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-[10px] text-stone-500 font-sans-clean mt-2 flex items-center justify-center gap-1">
        <span>✨ Desliza o toca las flechas para leer cada momento del baby shower</span>
      </p>
    </section>
  );
};
