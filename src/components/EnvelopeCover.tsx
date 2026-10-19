import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Ticket } from 'lucide-react';

interface EnvelopeCoverProps {
  onOpen: () => void;
  babyName: string;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({ onOpen, babyName }) => {
  const handleOpenClick = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8A9A83', '#C6A67A', '#F9F6F0', '#9EB299', '#ffffff'],
      });
    } catch {
      // fallback
    }
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 boho-bg select-none overflow-hidden"
    >
      {/* Decorative Floating Clouds and Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft clouds */}
        <div className="absolute top-10 left-6 text-4xl opacity-50 animate-gentle-float">
          ☁️
        </div>
        <div className="absolute top-20 right-8 text-5xl opacity-40 animate-gentle-float" style={{ animationDelay: '1.5s' }}>
          ☁️
        </div>
        <div className="absolute bottom-16 left-10 text-3xl opacity-35 animate-gentle-float" style={{ animationDelay: '2.5s' }}>
          ☁️
        </div>

        {/* Hot Air Balloon floating */}
        <div className="absolute top-8 right-12 opacity-80 animate-gentle-float">
          <span className="text-5xl drop-shadow-sm">🎈</span>
        </div>
      </div>

      <div className="relative w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Top Mini Header */}
        <div className="mb-4 text-center">
          <span className="text-[11px] font-sans-clean uppercase tracking-[0.25em] text-[#8A9A83] font-semibold">
            Invitación Especial
          </span>
          <h2 className="font-script text-4xl text-[#555A4F] mt-0.5">
            Baby Shower
          </h2>
        </div>

        {/* The Closed Envelope Container */}
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#9EB299] shadow-2xl p-4 flex flex-col items-center justify-center border-2 border-[#8A9A83]/40 overflow-visible">
          {/* Envelope Top Triangle Flap fold graphics */}
          <div 
            className="absolute top-0 left-0 right-0 h-[48%] bg-[#8A9A83] border-b border-[#7B8B74] shadow-sm origin-top rounded-t-2xl"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />

          {/* Golden Ribbon Band across envelope */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-10 bg-gradient-to-r from-[#D4B895]/80 via-[#C6A67A] to-[#D4B895]/80 border-y border-[#B89667] shadow-xs flex items-center justify-center opacity-90" />

          {/* Floating decorative mini polaroid (ecografía) */}
          <div 
            className="absolute -top-6 -left-4 w-20 bg-white p-1 pb-3 shadow-lg rounded-xs border border-stone-200 rotate-[-12deg] z-20 pointer-events-none"
          >
            <div className="w-full aspect-square bg-[#e8e4db] flex items-center justify-center text-xs overflow-hidden">
              <span className="text-xl">👶</span>
            </div>
            <p className="text-[7px] font-script text-center text-stone-600 mt-1">
              Ecografía
            </p>
          </div>

          {/* Floating ticket that says "Pase Personal" */}
          <div 
            className="absolute -bottom-4 -right-3 px-3 py-1 bg-[#F9F6F0] border border-[#C6A67A] shadow-md rounded-md rotate-[8deg] z-20 flex items-center gap-1 pointer-events-none"
          >
            <Ticket className="w-3 h-3 text-[#C6A67A]" />
            <span className="text-[9px] font-sans-clean font-semibold uppercase tracking-wider text-[#555A4F]">
              Pase Personal
            </span>
          </div>

          {/* The Golden Wax Seal (Clickable, Pulsing) */}
          <div className="relative z-30 flex flex-col items-center">
            <button
              onClick={handleOpenClick}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E2CAA8] via-[#C6A67A] to-[#9C7D52] border-2 border-white/60 flex flex-col items-center justify-center text-white cursor-pointer shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-seal-pulse"
              title="Click para ver la invitación"
            >
              {/* Inner ring */}
              <div className="w-16 h-16 rounded-full border border-dashed border-white/60 flex flex-col items-center justify-center">
                <span className="text-xl">🧸</span>
                <span className="text-[8px] font-sans-clean uppercase tracking-widest font-bold text-white/95 mt-0.5">
                  ABRIR
                </span>
              </div>
            </button>

            {/* Subtle guest name badge */}
            <div className="mt-3 px-3.5 py-1 rounded-full bg-[#F9F6F0]/95 border border-[#8A9A83]/30 text-[10px] font-sans-clean tracking-wider text-[#555A4F] shadow-xs">
              Para ti y tu familia
            </div>
          </div>
        </div>

        {/* Action instruction text */}
        <div className="mt-7 text-center">
          <button
            onClick={handleOpenClick}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8A9A83] hover:bg-[#788871] text-white text-xs font-sans-clean font-semibold uppercase tracking-[0.2em] shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E2CAA8]" />
            <span>CLICK PARA VER LA INVITACIÓN</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
