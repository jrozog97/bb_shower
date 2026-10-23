import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, Heart, BookOpen, Sparkles } from 'lucide-react';

export interface ItineraryChapter {
  id: number;
  time: string;
  chapterTitle: string;
  badgeLabel: string;
  imageUrl: string;
  imageAlt: string;
  storyText: string;
  activityNote: string;
}

const chapters: ItineraryChapter[] = [
  {
    id: 1,
    time: '2:00 PM',
    chapterTitle: 'Capítulo 1: La Gran Bienvenida',
    badgeLabel: 'Llegada & Brindis',
    activityNote: 'PRIMER ENCUENTRO · ABRAZOS DE BIENVENIDA',
    imageUrl: '/src/assets/images/itinerary_bienvenida_1792609839135.jpg',
    imageAlt: 'Benjamín saludando feliz con globitos tiernos en su bienvenida',
    storyText: '¡Siento que ya llegaron! Abro mis ojitos con mucha alegría mientras mis papitos Andrés y Alejandra los reciben con una sonrisa gigante, música suave y deliciosas bebidas de bienvenida.',
  },
  {
    id: 2,
    time: '3:30 PM',
    chapterTitle: 'Capítulo 2: Risas y Dinámicas',
    badgeLabel: 'Juegos & Risas',
    activityNote: 'DIVERSIÓN TOTAL · PATADITAS DE ALEGRÍA',
    imageUrl: '/src/assets/images/itinerary_juegos_1792609839527.jpg',
    imageAlt: 'Benjamín jugando felizmente con bloquecitos y osito de peluche',
    storyText: '¡Escucho tantas carcajadas allá afuera! Empiezo a dar volteretas y pataditas de felicidad mientras juegan, miden la pancita de mami y comparten dinámicas inolvidables llenas de risas.',
  },
  {
    id: 3,
    time: '4:45 PM',
    chapterTitle: 'Capítulo 3: Mesa Dulce y Pastel',
    badgeLabel: 'Torta & Brindis',
    activityNote: 'MOMENTO DULCE · CELEBRACIÓN Y BENDICIONES',
    imageUrl: '/src/assets/images/itinerary_torta_1792609840561.jpg',
    imageAlt: 'Benjamín aplaudiendo frente a su hermoso pastel de baby shower',
    storyText: 'Mmm... ¡a mamá le dio antojito de algo muy dulce y especial! Compartiremos la torta más deliciosa, una mesa de postres soñada y un brindis en mi honor cargado de amor y bendiciones.',
  },
  {
    id: 4,
    time: '5:45 PM',
    chapterTitle: 'Capítulo 4: Lista de Regalos y Ajuar',
    badgeLabel: 'Regalos con Amor',
    activityNote: 'DETALLES SOÑADOS · REGALITOS PARA BENJAMÍN',
    imageUrl: '/src/assets/images/itinerary_regalos_1792609841296.jpg',
    imageAlt: 'Benjamín rodeado de tiernas cajas de regalos y zapatitos',
    storyText: 'Mis papis recibirán con todo el cariño los regalitos de mi ajuar elegidos con amor en Pepe Ganga y sus detalles especiales. ¡Cada regalito guardará su inmenso afecto para cuando nazca!',
  },
  {
    id: 5,
    time: '6:45 PM',
    chapterTitle: 'Capítulo 5: Agradecimiento y Dulces Sueños',
    badgeLabel: 'Despedida & Amor',
    activityNote: 'CORAZÓN CONTENTO · DULCES SUEÑOS',
    imageUrl: '/src/assets/images/itinerary_despedida_1792609840934.jpg',
    imageAlt: 'Benjamín durmiendo plácidamente sobre una nube y luna de ensueño',
    storyText: 'Me voy quedando dormidito con el corazón rebosante de amor. Mis papitos les entregarán los recordatorios y nos despediremos con abrazos interminables. ¡Gracias por quererme tanto!',
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

  return (
    <section className="py-8 px-4 sm:px-6 text-center select-none relative">
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
          &ldquo;Una mirada mágica a cada momento de mi fiesta contada por mí&rdquo;
        </p>
      </motion.div>

      {/* The Storybook Card with Tender Animated Illustrations */}
      <div 
        className="relative max-w-sm mx-auto rounded-3xl bg-white border-2 border-[#C6A67A]/50 shadow-xl overflow-hidden p-4 sm:p-5 text-left transition-all"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Header Bar inside Card */}
        <div className="flex items-center justify-between border-b border-[#8A9A83]/20 pb-2.5 mb-3 text-[10px] font-sans-clean tracking-wider">
          <div className="flex items-center gap-1.5 text-[#6E8168] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A67A]" />
            <span className="uppercase tracking-wider">Momento {current.id} de {chapters.length}</span>
          </div>
          <div className="flex items-center gap-1 text-[#8A9A83] font-semibold">
            <Heart className="w-3 h-3 text-[#FF7070] fill-[#FF7070]" />
            <span>Baby Shower</span>
          </div>
        </div>

        {/* Story Illustration Viewport Frame */}
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#F9F7F2] border border-[#8A9A83]/25 overflow-hidden flex items-center justify-center shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full relative"
            >
              <img
                src={current.imageUrl}
                alt={current.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </AnimatePresence>

          {/* Time Badge Overlay */}
          <div className="absolute top-2.5 left-2.5 z-10 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#C6A67A]/40 text-xs font-sans-clean font-bold text-[#555A4F] flex items-center gap-1.5 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#8A9A83]" />
            <span>{current.time}</span>
          </div>

          {/* Category Badge Overlay */}
          <div className="absolute top-2.5 right-2.5 z-10 px-3 py-1.5 rounded-full bg-[#8A9A83] text-white text-xs font-sans-clean font-bold shadow-xs">
            {current.badgeLabel}
          </div>
        </div>

        {/* Story Narration Content Box (Benjamín's Words) */}
        <div className="mt-4 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans-clean uppercase tracking-wider text-[#8c6738] font-bold">
                  {current.activityNote}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3EC] text-xs text-[#6E8168] font-sans-clean font-semibold">
                  {current.time}
                </span>
              </div>

              <h4 className="font-serif-clean text-xl sm:text-2xl text-[#4A4A4A] font-bold tracking-tight">
                {current.chapterTitle}
              </h4>

              <p className="text-sm sm:text-base text-[#555A4F] font-sans-clean leading-relaxed font-normal">
                &ldquo;{current.storyText}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Stepper Navigation Controls */}
        <div className="pt-3 border-t border-[#8A9A83]/20 flex items-center justify-between mt-2">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full bg-[#F5F1E7] hover:bg-[#EAE4D5] text-[#555A4F] flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-[#C6A67A]/30"
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
                    ? 'w-7 bg-[#8A9A83] shadow-xs'
                    : 'w-2 bg-stone-200 hover:bg-stone-300'
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

      <p className="text-[10px] text-stone-500 font-sans-clean mt-2.5 flex items-center justify-center gap-1">
        <span>Desliza o toca las flechas para leer cada momento del baby shower</span>
      </p>
    </section>
  );
};
