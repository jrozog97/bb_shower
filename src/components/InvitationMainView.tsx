import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  MapPin, 
  MessageCircle, 
  Mail, 
  Calendar,
  ExternalLink,
  Heart
} from 'lucide-react';
import { InvitationConfig } from '../types/invitation';
import { audioPlayer } from '../utils/audioPlayer';

interface InvitationMainViewProps {
  config: InvitationConfig;
  onEditRequested?: () => void;
}

export const InvitationMainView: React.FC<InvitationMainViewProps> = ({ config, onEditRequested }) => {
  const [isPlaying, setIsPlaying] = useState(audioPlayer.isPlayingState);

  useEffect(() => {
    const unsub = audioPlayer.subscribe((playing) => setIsPlaying(playing));
    return () => unsub();
  }, []);

  const toggleMusic = () => {
    audioPlayer.toggle(config.musicUrl);
  };

  // Live countdown to target date
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(config.fullDateTarget);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.fullDateTarget]);

  const handleWhatsAppRsvp = () => {
    const cleanPhone = config.hostPhone.replace(/\D/g, '');
    const encoded = encodeURIComponent(config.rsvpMessage);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="relative w-full max-w-md mx-auto boho-bg text-[#4A4A4A] min-h-screen overflow-x-hidden pb-16">
      {/* Floating Music Button (Top Left as specified) */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={toggleMusic}
          className="w-10 h-10 rounded-full bg-white/95 border border-[#8A9A83]/40 shadow-lg flex items-center justify-center text-[#8A9A83] hover:text-[#555A4F] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-[#8A9A83]" />
          ) : (
            <Play className="w-4 h-4 fill-[#8A9A83] ml-0.5" />
          )}
        </button>
      </div>

      {/* =========================================================================
          SECCIÓN 1 - BIENVENIDA
          Curved text, balloon with teddy bear, Script title: "we can Bearly wait"
      ========================================================================== */}
      <section className="pt-16 pb-10 px-6 text-center flex flex-col items-center relative overflow-hidden">
        {/* Soft floating clouds */}
        <div className="absolute top-8 left-4 text-3xl opacity-35 animate-gentle-float">☁️</div>
        <div className="absolute top-12 right-6 text-3xl opacity-30 animate-gentle-float" style={{ animationDelay: '1.2s' }}>☁️</div>

        {/* Curved Header Phrase */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="font-handwriting text-xl sm:text-2xl text-[#8A9A83] font-semibold tracking-wide">
            {config.welcomeCurvedText}
          </p>
        </motion.div>

        {/* Principal Graphic: Hot Air Balloon with Teddy Bear */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative my-2 w-48 h-48 flex items-center justify-center animate-gentle-float"
        >
          {/* Watercolor Boho Hot Air Balloon Illustration Container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Balloon canopy with pastel sage and cream stripes */}
            <div className="w-32 h-36 rounded-full bg-gradient-to-b from-[#8A9A83] via-[#9EB299] to-[#C6A67A] shadow-md relative flex items-center justify-center overflow-hidden border-2 border-white/80">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:10px_10px]" />
              <div className="w-16 h-full bg-white/30 rounded-full" />
              <span className="text-4xl filter drop-shadow">⭐</span>
            </div>
            {/* Ropes */}
            <div className="w-14 h-4 flex justify-between px-2 -mt-1">
              <div className="w-[1px] h-full bg-[#C6A67A]" />
              <div className="w-[1px] h-full bg-[#C6A67A]" />
            </div>
            {/* Basket with cute teddy bear */}
            <div className="w-16 h-12 rounded-b-xl bg-[#C6A67A] border-t-2 border-[#A8885B] shadow-sm flex items-center justify-center relative -mt-0.5">
              <span className="text-3xl -mt-5">🧸</span>
            </div>
          </div>
        </motion.div>

        {/* Script Title: "we can Bearly wait" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-2"
        >
          <h1 className="font-script text-5xl sm:text-6xl text-[#555A4F] drop-shadow-xs">
            {config.mainBearTitle}
          </h1>
          <p className="font-serif-clean italic text-sm sm:text-base text-[#8A9A83] max-w-xs mx-auto mt-2 leading-relaxed">
            &ldquo;{config.subtitle}&rdquo;
          </p>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 2 - LOS PADRES
          "Mis papis: MARTHA Y DAVID" + 2 Polaroids superimposed & rotated
      ========================================================================== */}
      <section className="py-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-sans-clean uppercase tracking-[0.25em] text-[#8A9A83] font-bold block mb-1">
            Nuestra Familia
          </span>
          <h2 className="font-sans-clean font-bold text-xl sm:text-2xl text-[#4A4A4A] uppercase tracking-wider mb-2">
            Mis papis: <span className="text-[#8A9A83] font-script normal-case text-3xl sm:text-4xl font-normal block sm:inline">{config.parentsNames}</span>
          </h2>
          <p className="text-xs text-[#555A4F] font-sans-clean max-w-xs mx-auto mb-8 leading-relaxed">
            Esperando con todo el amor del mundo la bendición de tenerte entre nuestros brazos.
          </p>
        </motion.div>

        {/* 2 Polaroids Superimposed & Slightly Rotated (-3deg & 5deg) */}
        <div className="relative w-full max-w-xs mx-auto h-64 flex items-center justify-center">
          {/* Polaroid 1 (Left, rotated -4deg) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-2 top-2 w-40 polaroid-frame rotate-[-4deg] z-10"
          >
            <div className="aspect-square w-full overflow-hidden bg-stone-100 rounded-2xs">
              <img
                src={config.parentPhoto1Url}
                alt="Martha y David"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-handwriting text-xs text-stone-600 text-center mt-2">
              Juntos en la espera 💕
            </p>
          </motion.div>

          {/* Polaroid 2 (Right, rotated +5deg) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-2 top-6 w-40 polaroid-frame rotate-[5deg] z-20"
          >
            <div className="aspect-square w-full overflow-hidden bg-stone-100 rounded-2xs">
              <img
                src={config.parentPhoto2Url}
                alt="Amor de papás"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-handwriting text-xs text-stone-600 text-center mt-2">
              Contando los días ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3 - EL BEBÉ
          Bunting graphic, "MI BABY SHOWER", Giant Script "Santiago David" + Ecografía Polaroid
      ========================================================================== */}
      <section className="py-10 px-6 text-center">
        {/* Bunting Banner Graphic (Banderines) */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-1.5 mb-3"
        >
          {['#9EB299', '#C6A67A', '#8A9A83', '#D4B895', '#9EB299', '#C6A67A'].map((color, i) => (
            <div
              key={i}
              className="w-5 h-6 shadow-2xs"
              style={{
                backgroundColor: color,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-sans-clean uppercase tracking-[0.3em] text-[#8A9A83] font-bold">
            MI BABY SHOWER
          </span>
          <h2 className="font-script text-5xl sm:text-6xl text-[#555A4F] my-2 drop-shadow-xs">
            {config.babyName}
          </h2>
        </motion.div>

        {/* Centered Polaroid Ultrasound Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-48 mx-auto mt-4 polaroid-frame"
        >
          <div className="aspect-square w-full overflow-hidden bg-stone-100 rounded-2xs relative">
            <img
              src={config.ultrasoundPhotoUrl}
              alt="Ecografía de Santiago David"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-white/80 text-[9px] font-sans-clean font-semibold text-stone-600">
              Ecografía
            </div>
          </div>
          <p className="font-handwriting text-sm text-[#8A9A83] font-semibold text-center mt-2.5">
            ¡Hola mundo! Soy yo 👶✨
          </p>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 4 - FECHA Y CONTADOR
          3 horizontal cards: [DÍA 20 Sábado] [MES 06 Junio] [AÑO 26]
          "¿CUÁNTO FALTA?" + Live Countdown on Sage Green Background with White Letters
      ========================================================================== */}
      <section className="py-10 px-6 text-center">
        {/* 3 Date Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-8"
        >
          {/* Card Día */}
          <div className="p-3 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-[9px] font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              DÍA
            </span>
            <span className="font-serif-clean text-2xl font-bold text-[#4A4A4A] my-0.5">
              {config.dayNumber}
            </span>
            <span className="text-[10px] font-sans-clean text-stone-500 font-medium">
              {config.dayName}
            </span>
          </div>

          {/* Card Mes */}
          <div className="p-3 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-[9px] font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              MES
            </span>
            <span className="font-serif-clean text-2xl font-bold text-[#4A4A4A] my-0.5">
              {config.monthNumber}
            </span>
            <span className="text-[10px] font-sans-clean text-stone-500 font-medium">
              {config.monthName}
            </span>
          </div>

          {/* Card Año */}
          <div className="p-3 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-[9px] font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              AÑO
            </span>
            <span className="font-serif-clean text-2xl font-bold text-[#4A4A4A] my-0.5">
              {config.yearShort}
            </span>
            <span className="text-[10px] font-sans-clean text-stone-500 font-medium">
              2026
            </span>
          </div>
        </motion.div>

        {/* Countdown Box on Sage Green Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#8A9A83] text-white p-6 shadow-xl max-w-sm mx-auto relative overflow-hidden"
        >
          {/* Subtle floral pattern overlay */}
          <div className="absolute top-2 right-2 text-2xl opacity-20 pointer-events-none">🌿</div>
          <div className="absolute bottom-2 left-2 text-2xl opacity-20 pointer-events-none">🌿</div>

          <h3 className="text-xs font-sans-clean uppercase tracking-[0.25em] font-bold text-[#F9F6F0] mb-4">
            ¿CUÁNTO FALTA?
          </h3>

          {timeLeft.isPast ? (
            <div className="py-2">
              <p className="font-script text-3xl text-white">¡Hoy es el gran día!</p>
              <p className="text-xs text-white/90 mt-1">Estamos celebrando la llegada de {config.babyName}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
              {[
                { label: 'Días', val: timeLeft.days },
                { label: 'Horas', val: timeLeft.hours },
                { label: 'Minutos', val: timeLeft.minutes },
                { label: 'Segundos', val: timeLeft.seconds },
              ].map((item, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <span className="font-serif-clean text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-sans-clean uppercase tracking-wider text-[#F9F6F0]/80 mt-0.5">
                      {item.label}
                    </span>
                  </div>
                  {idx < arr.length - 1 && (
                    <span className="text-lg font-bold text-white/60 -mt-3">:</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 5 - UBICACIÓN
          Arch container background in warm sand color, location pin,
          Script title: "Lugar", "Salón Fantasy", "Calle 90", "4:00 PM",
          Rectangular sage green button: "Ver Ubicación" -> Google Maps
      ========================================================================== */}
      <section className="py-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xs mx-auto p-8 rounded-t-[100px] rounded-b-3xl bg-[#D4B895]/35 border border-[#C6A67A]/50 shadow-md relative overflow-hidden"
        >
          {/* Location Pin Icon */}
          <div className="w-12 h-12 rounded-full bg-white text-[#8A9A83] mx-auto flex items-center justify-center shadow-sm mb-2">
            <MapPin className="w-6 h-6" />
          </div>

          {/* Script Title: "Lugar" */}
          <h3 className="font-script text-4xl text-[#555A4F] mb-1">
            Lugar
          </h3>

          {/* Texts: Salón Fantasy, Calle 90, 4:00 PM */}
          <div className="space-y-1 my-3">
            <p className="font-sans-clean font-bold text-base text-[#4A4A4A]">
              {config.venueName}
            </p>
            <p className="text-xs text-[#555A4F] font-sans-clean">
              {config.venueAddress}
            </p>
            <p className="text-xs font-semibold text-[#8A9A83] font-sans-clean pt-1">
              Hora: {config.timeString}
            </p>
          </div>

          {/* Rectangular Interactive Sage Green Button: "Ver Ubicación" */}
          <div className="mt-5">
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-[#8A9A83] hover:bg-[#788871] text-white font-sans-clean font-semibold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Ver Ubicación</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 6 - CONFIRMACIÓN (RSVP)
          WhatsApp icon, Script title: "Confirmación",
          Text: "Nos encantará saber que nos acompañarás...",
          Button: "Confirma Aquí" (redirects to WhatsApp)
      ========================================================================== */}
      <section className="py-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xs mx-auto p-6 rounded-3xl bg-white border border-[#8A9A83]/30 shadow-md"
        >
          <div className="w-12 h-12 rounded-full bg-[#EBF3EC] text-[#8A9A83] mx-auto flex items-center justify-center shadow-xs mb-2">
            <MessageCircle className="w-6 h-6" />
          </div>

          <h3 className="font-script text-4xl text-[#555A4F] mb-1">
            Confirmación
          </h3>

          <p className="text-xs text-[#555A4F] font-sans-clean leading-relaxed my-3">
            Nos encantará saber que nos acompañarás en este día tan especial. Por favor confírmanos tu asistencia.
          </p>

          <button
            onClick={handleWhatsAppRsvp}
            className="w-full py-3 px-6 rounded-xl bg-[#8A9A83] hover:bg-[#788871] text-white font-sans-clean font-semibold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirma Aquí</span>
          </button>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 7 - REGALOS Y CIERRE
          Money envelope icon, Script title: "Sugerencia de regalos",
          Text: "Tu presencia es lo más importante... Lluvia de sobres",
          Final teddy bear image,
          Final Script title: "Te Esperamos",
          Final text: "Con mucho amor"
      ========================================================================== */}
      <section className="py-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xs mx-auto p-6 rounded-3xl bg-white border border-[#C6A67A]/40 shadow-md mb-8"
        >
          <div className="w-12 h-12 rounded-full bg-[#FAF4ED] text-[#C6A67A] mx-auto flex items-center justify-center shadow-xs mb-2">
            <Mail className="w-6 h-6" />
          </div>

          <h3 className="font-script text-4xl text-[#555A4F] mb-1">
            Sugerencia de regalos
          </h3>

          <p className="text-xs text-[#555A4F] font-sans-clean leading-relaxed mt-2">
            {config.giftNote}
          </p>
          <div className="mt-3 inline-block px-3.5 py-1 rounded-full bg-[#FAF4ED] border border-[#C6A67A]/40 text-[#A8885B] text-xs font-semibold">
            ✉️ Lluvia de sobres
          </div>
        </motion.div>

        {/* Final Teddy Bear & Closure Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-3"
        >
          <div className="text-5xl animate-gentle-float">
            🧸
          </div>

          <h3 className="font-script text-5xl sm:text-6xl text-[#555A4F]">
            {config.closureTitle}
          </h3>

          <div className="flex items-center justify-center gap-2 text-xs font-sans-clean text-[#8A9A83] font-semibold">
            <Heart className="w-3.5 h-3.5 text-[#8A9A83] fill-[#8A9A83]" />
            <span>{config.closureText}</span>
            <Heart className="w-3.5 h-3.5 text-[#8A9A83] fill-[#8A9A83]" />
          </div>
        </motion.div>

        {/* Edit Button for Host/Friend */}
        {onEditRequested && (
          <div className="mt-12 pt-6 border-t border-stone-200">
            <button
              onClick={onEditRequested}
              className="text-[11px] font-sans-clean text-stone-400 hover:text-stone-700 underline cursor-pointer"
            >
              Editar datos de la invitación (Nombre, padres, fecha, lugar)
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
