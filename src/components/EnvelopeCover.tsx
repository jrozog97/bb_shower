import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Ticket } from 'lucide-react';
import { RealisticWaxSeal, BohoCloud } from './BohoIcons';
import { audioPlayer } from '../utils/audioPlayer';

interface EnvelopeCoverProps {
  onOpen: () => void;
  babyName: string;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({ onOpen, babyName }) => {
  const handleOpenClick = () => {
    // Synchronously unlock audio on mobile gesture
    audioPlayer.unlockMobileAudio();
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8A9A83', '#C6A67A', '#F9F6F0', '#9EB299', '#ffffff', '#E8C7A0'],
        gravity: 0.9,
      });
    } catch {
      // fallback
    }
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -120, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 boho-bg select-none overflow-hidden"
    >
      {/* Decorative Floating Soft SVG Clouds and Balloon Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-6 left-3 opacity-75 animate-gentle-float">
          <BohoCloud className="w-24 h-14" withStar />
        </div>
        <div className="absolute top-6 right-4 opacity-85 animate-gentle-float" style={{ animationDelay: '1.2s' }}>
          <img
            src="/assets/balloon-bear.png"
            alt="Globo aerostático de Benjamín"
            className="w-16 h-auto object-contain"
          />
        </div>
        <div className="absolute bottom-12 left-6 opacity-60 animate-gentle-float" style={{ animationDelay: '2.8s' }}>
          <BohoCloud className="w-24 h-14" withStar />
        </div>
      </div>

      <div className="relative w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Top Header in Spanish */}
        <div className="mb-4 text-center">
          <span className="text-xs font-sans-clean uppercase tracking-[0.3em] text-[#8A9A83] font-bold block mb-1">
            Invitación Especial
          </span>
          <h2 className="font-script text-4xl sm:text-5xl text-[#555A4F] drop-shadow-xs">
            Baby Shower
          </h2>
          <p className="font-serif-clean italic text-base text-[#8A9A83] -mt-1 font-semibold">
            de {babyName}
          </p>
        </div>

        {/* The Closed Envelope Container */}
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#9EB299] shadow-2xl p-4 flex flex-col items-center justify-center border-2 border-[#8A9A83]/50 overflow-visible">
          {/* Envelope Top Triangle Flap fold graphics */}
          <div 
            className="absolute top-0 left-0 right-0 h-[48%] bg-[#8A9A83] border-b border-[#72826c] shadow-sm origin-top rounded-t-2xl"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />

          {/* Golden Silk Ribbon Band across envelope */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-10 bg-gradient-to-r from-[#D4B895]/85 via-[#C6A67A] to-[#D4B895]/85 border-y border-[#B89667] shadow-xs flex items-center justify-center opacity-95" />

          {/* Floating decorative Polaroid with the user's real baby ultrasound photo and washi tape */}
          <div 
            className="absolute -top-9 -left-3 sm:-left-5 w-24 sm:w-28 bg-white p-1.5 pb-3 shadow-2xl rounded-xs border border-stone-200 rotate-[-10deg] z-20 pointer-events-none"
          >
            {/* Washi tape on top of the polaroid */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-9 h-3.5 bg-[#D4B895]/85 border border-[#C6A67A]/60 shadow-2xs rotate-[3deg] rounded-3xs" />
            
            <div className="w-full aspect-square bg-black rounded-2xs overflow-hidden border border-stone-100 shadow-inner relative">
              <img
                src="/assets/ultrasound-cover.png"
                alt={`Ecografía de ${babyName}`}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1 left-1.5 px-1 py-0.2 rounded bg-black/60 text-[8px] font-mono text-white/90">
                ECO 4D
              </span>
            </div>
            <p className="text-xs font-script text-center text-[#555A4F] mt-1.5 font-bold tracking-wide">
              {babyName}
            </p>
          </div>

          {/* Floating ticket: "Pase Personal" */}
          <div 
            className="absolute -bottom-4 -right-3 px-3.5 py-1.5 bg-[#F9F6F0] border border-[#C6A67A] shadow-md rounded-lg rotate-[7deg] z-20 flex items-center gap-1.5 pointer-events-none"
          >
            <Ticket className="w-4 h-4 text-[#C6A67A]" />
            <span className="text-xs font-sans-clean font-bold uppercase tracking-wider text-[#555A4F]">
              Pase Personal
            </span>
          </div>

          {/* Bespoke 3D Gold Wax Seal SVG with Relief */}
          <div className="relative z-30 flex flex-col items-center">
            <RealisticWaxSeal onClick={handleOpenClick} />

            {/* Guest Tag */}
            <div className="mt-3.5 px-4.5 py-1.5 rounded-full bg-[#F9F6F0]/95 border border-[#8A9A83]/40 text-xs sm:text-sm font-sans-clean tracking-wider text-[#555A4F] shadow-xs font-semibold">
              Con cariño para ti
            </div>
          </div>
        </div>

        {/* Action instruction button in Spanish */}
        <div className="mt-7 text-center">
          <button
            onClick={handleOpenClick}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8A9A83] hover:bg-[#788871] text-white text-xs sm:text-sm font-sans-clean font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#F9E8B8]" />
            <span>TOCAR PARA ABRIR INVITACIÓN</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
