import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  MapPin, 
  MessageCircle, 
  Calendar,
  Heart,
  Sparkles
} from 'lucide-react';
import { InvitationConfig } from '../types/invitation';
import { audioPlayer } from '../utils/audioPlayer';
import { BuntingGarland } from './BohoIcons';
import { StoryUltrasoundItinerary } from './StoryUltrasoundItinerary';
import { GiftRegistrySection } from './GiftRegistrySection';

interface InvitationMainViewProps {
  config: InvitationConfig;
}

export const InvitationMainView: React.FC<InvitationMainViewProps> = ({ config }) => {
  const [isPlaying, setIsPlaying] = useState(audioPlayer.isPlayingState);

  useEffect(() => {
    const unsub = audioPlayer.subscribe((playing) => setIsPlaying(playing));
    return () => unsub();
  }, []);

  const toggleMusic = () => {
    audioPlayer.toggle(config.musicUrl);
  };

  // Live countdown to target date (29 de Noviembre de 2026 a las 2:00 PM)
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

  // RSVP phone handling
  const phonePrimary = (config.hostPhone || '573143899735').replace(/\D/g, '');
  const phoneSecondary = (config.hostPhoneSecondary || '573166336206').replace(/\D/g, '');
  
  const displayPhonePrimary = '314 389 9735';
  const displayPhoneSecondary = '316 633 6206';

  const defaultRsvpMessage = '¡Hola Andrés y Alejandra! Confirmo mi asistencia al Baby Shower de Benjamín 🧸✨\n\nNombre completo: \n¿Asistiré?: ';

  const getWaLink = (phone: string) => {
    const text = config.rsvpMessage || defaultRsvpMessage;
    return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(text)}`;
  };

  // Google Calendar URL generator
  const googleCalendarUrl = () => {
    const title = encodeURIComponent(`Baby Shower de ${config.babyName} 🧸`);
    const details = encodeURIComponent(
      `¡Acompáñanos a celebrar el Baby Shower de ${config.babyName}!\n\n` +
      `Padres: ${config.parentsNames}\n` +
      `Lugar: Próximamente (Ubicación por confirmar en Bogotá)\n` +
      `Horario: ${config.timeString}\n` +
      `¡Te esperamos con mucho amor!`
    );
    const location = encodeURIComponent(`Próximamente, Bogotá, Colombia`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261129T190000Z/20261130T000000Z&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <div className="relative w-full max-w-md mx-auto boho-bg text-[#4A4A4A] min-h-screen overflow-x-hidden pb-12 select-none">
      {/* Floating Music Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={toggleMusic}
          className="w-12 h-12 rounded-full bg-white/95 border-2 border-[#8A9A83]/50 shadow-xl flex items-center justify-center text-[#8A9A83] hover:text-[#555A4F] hover:bg-white transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#8A9A83] animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-stone-400" />
          )}
        </button>
      </div>

      {/* =========================================================================
          SECCIÓN 1 - BIENVENIDA
          Texto curvo en español, ilustración artesanal del globo con osito,
          Título Script y dedicatoria emotiva.
      ========================================================================== */}
      <section className="pt-16 pb-8 px-6 text-center flex flex-col items-center relative overflow-hidden">
        {/* Curving Welcome Phrase - Letras más grandes */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3 px-2 max-w-sm"
        >
          <span className="inline-block px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#EBF3EC] border border-[#8A9A83]/40 text-lg sm:text-xl font-handwriting text-[#4F6449] font-bold tracking-wide shadow-xs">
            {config.welcomeCurvedText}
          </span>
        </motion.div>

        {/* Acuarela del Osito en Globo Aerostático (/assets/balloon-bear.png) */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative my-2 flex items-center justify-center animate-gentle-float"
        >
          <img
            src="/assets/balloon-bear.png"
            alt="Osito en globo aerostático de Benjamín"
            className="w-56 sm:w-64 h-auto max-h-72 object-contain"
          />
        </motion.div>

        {/* Emotive Welcome Phrase & Scripture from PDF */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-2 max-w-sm mx-auto px-3"
        >
          <h1 className="font-serif-clean font-bold text-2xl sm:text-3xl text-[#555A4F] leading-tight mb-1">
            Una nueva historia
          </h1>
          <p className="font-serif-clean text-lg sm:text-xl text-[#555A4F] font-medium leading-snug">
            está por comenzar, y nos hace felices saber que hay personas como tú con quienes compartirla.
          </p>

          {/* Cita bíblica según el PDF: “Todo lo hizo hermoso en su tiempo.” Eclesiastés 3:11 */}
          <div className="mt-4 pt-3.5 border-t border-[#8A9A83]/25 max-w-xs mx-auto">
            <p className="font-serif-clean italic text-lg sm:text-xl text-[#6E8168] font-semibold leading-relaxed">
              &ldquo;Todo lo hizo hermoso en su tiempo.&rdquo;
            </p>
            <span className="text-sm sm:text-base font-sans-clean uppercase tracking-[0.2em] text-[#C6A67A] font-bold block mt-1.5">
              Eclesiastés 3:11
            </span>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 2 - EL BEBÉ
          Guirnalda de banderines en SVG, Cubitos BABY (/assets/baby-cubes.png),
          Nombre gigante en Script: "Benjamín" +
          Díptico Polaroid: Ecografía real de Benjamín (Imagen 2) + Bebé dormido
      ========================================================================== */}
      <section className="py-8 px-6 text-center">
        {/* SVG Bunting Garland */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          className="max-w-xs mx-auto mb-1"
        >
          <BuntingGarland className="w-full h-8" />
        </motion.div>

        {/* Cubos de madera BABY en acuarela (/assets/baby-cubes.png) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-1"
        >
          <img
            src="/assets/baby-cubes.png"
            alt="Cubos BABY de madera"
            className="w-28 h-auto object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-sans-clean uppercase tracking-[0.3em] text-[#8A9A83] font-bold">
            MI BABY SHOWER
          </span>
          <h2 className="font-script text-6xl sm:text-7xl text-[#555A4F] my-1 drop-shadow-xs">
            {config.babyName}
          </h2>
        </motion.div>

        {/* Galería Polaroid de Benjamín: Ecografía de Benjamín (Imagen 2) + Bebé Dormido */}
        <div className="relative w-full max-w-xs mx-auto h-64 flex items-center justify-center mt-3">
          {/* Polaroid 1: Ecografía real de Benjamín (Imagen 2 debajo de su nombre) */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -6 }}
            whileInView={{ opacity: 1, x: 0, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-1 top-2 w-40 polaroid-frame rotate-[-4deg] z-10"
          >
            <div className="aspect-square w-full overflow-hidden bg-black rounded-2xs relative">
              <img
                src={config.ultrasoundPhotoUrl}
                alt="Ecografía de Benjamín"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-sans-clean font-bold text-white shadow-2xs">
                ECO 4D
              </div>
            </div>
            <p className="font-handwriting text-sm text-[#8A9A83] font-bold text-center mt-2">
              ¡Hola a todos!
            </p>
          </motion.div>

          {/* Polaroid 2: Acuarela del Bebé Benjamín recién nacido dormido */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 6 }}
            whileInView={{ opacity: 1, x: 0, rotate: 4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-1 top-5 w-40 polaroid-frame rotate-[4deg] z-20"
          >
            <div className="aspect-square w-full overflow-hidden bg-white rounded-2xs relative flex items-center justify-center p-1">
              <img
                src="/assets/baby-sleeping.png"
                alt="Benjamín dormidito en su mantita"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-1.5 right-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3EC] text-[10px] font-sans-clean font-bold text-[#6E8168] shadow-2xs">
                Dulces Sueños
              </div>
            </div>
            <p className="font-handwriting text-sm text-stone-700 font-bold text-center mt-2">
              Soñando contigo
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3 - LOS PADRES Y LA FAMILIA (FOTOS JUNTAS ABAJO SIN EMOJIS)
          "Mis papis: ALEJANDRA Y ANDRÉS" + 2 Polaroids con fotos reales sin emojis
      ========================================================================== */}
      <section className="py-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-sans-clean uppercase tracking-[0.25em] text-[#8A9A83] font-bold block mb-1">
            Nuestra Familia
          </span>
          <h2 className="font-sans-clean font-bold text-xl sm:text-2xl text-[#4A4A4A] uppercase tracking-wider mb-2">
            Mis papis: <span className="text-[#8A9A83] font-script normal-case text-3xl sm:text-4xl font-normal block sm:inline">{config.parentsNames}</span>
          </h2>
          <p className="text-sm sm:text-base text-[#555A4F] font-sans-clean max-w-xs mx-auto mb-7 leading-relaxed">
            Esperando con todo el corazón la bendición de tenerte muy pronto entre nuestros brazos.
          </p>
        </motion.div>

        {/* 2 Polaroids Superimposed and Asymmetrically Rotated (Sin Emojis) */}
        <div className="relative w-full max-w-xs mx-auto h-64 flex items-center justify-center">
          {/* Polaroid 1 (Left, rotated -4deg): Alejandra y Andrés (Nueva foto) */}
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
                alt="Andrés y Alejandra"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
            <p className="font-handwriting text-base sm:text-lg text-stone-800 text-center mt-2 font-bold tracking-wide">
              Juntos en la dulce espera
            </p>
          </motion.div>

          {/* Polaroid 2 (Right, rotated +5deg): Perrito de la familia */}
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
                alt="Amor de familia"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-handwriting text-base sm:text-lg text-stone-800 text-center mt-2 font-bold tracking-wide">
              Contando los días
            </p>
          </motion.div>
        </div>

        {/* Tierno Elefantito en Acuarela (/assets/baby-elephant.png) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center -mt-2 mb-1"
        >
          <img
            src="/assets/baby-elephant.png"
            alt="Elefantito tierno de la familia"
            className="w-24 h-auto object-contain opacity-95"
          />
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN ITINERARIO EN CUENTO ECOGRÁFICO (INNOVACIÓN 1000/10)
          Carrousel interactivo con estética de ecografía 4D del bebé Benjamín
          y narrativa de cuento infantil en primera persona.
      ========================================================================== */}
      <StoryUltrasoundItinerary />

      {/* =========================================================================
          SECCIÓN 4 - FECHA Y CONTADOR
          3 tarjetas horizontales: [DÍA 29 Domingo] [MES 11 Noviembre] [AÑO 26]
          "¿CUÁNTO FALTA?" + Contador en vivo en verde salvia
      ========================================================================== */}
      <section className="py-8 px-6 text-center">
        {/* 3 Horizontal Date Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto mb-6"
        >
          {/* Card Día */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-xs font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              DÍA
            </span>
            <span className="font-serif-clean text-3xl sm:text-4xl font-bold text-[#4A4A4A] my-0.5">
              {config.dayNumber}
            </span>
            <span className="text-xs sm:text-sm font-sans-clean text-stone-600 font-semibold capitalize">
              {config.dayName}
            </span>
          </div>

          {/* Card Mes */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-xs font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              MES
            </span>
            <span className="font-serif-clean text-3xl sm:text-4xl font-bold text-[#4A4A4A] my-0.5">
              {config.monthNumber}
            </span>
            <span className="text-xs sm:text-sm font-sans-clean text-stone-600 font-semibold capitalize">
              {config.monthName}
            </span>
          </div>

          {/* Card Año */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-xs font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              AÑO
            </span>
            <span className="font-serif-clean text-3xl sm:text-4xl font-bold text-[#4A4A4A] my-0.5">
              {config.yearShort}
            </span>
            <span className="text-xs sm:text-sm font-sans-clean text-stone-600 font-semibold">
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
          <div className="absolute top-2 right-3 text-xl opacity-20 pointer-events-none">🌿</div>
          <div className="absolute bottom-2 left-3 text-xl opacity-20 pointer-events-none">🌿</div>

          <h3 className="text-sm font-sans-clean uppercase tracking-[0.25em] font-bold text-[#F9F6F0] mb-4">
            ¿CUÁNTO FALTA?
          </h3>

          {timeLeft.isPast ? (
            <div className="py-2">
              <p className="font-script text-3xl sm:text-4xl text-white">¡Hoy es el gran día!</p>
              <p className="text-sm text-white/90 mt-1">Estamos celebrando la llegada de {config.babyName}</p>
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
                    <span className="text-xs font-sans-clean uppercase tracking-wider text-[#F9F6F0] mt-0.5 font-bold">
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

        {/* Direct Google Calendar 1-Tap Button */}
        <div className="mt-4">
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-sans-clean font-semibold text-[#5A6D54] hover:text-[#4A4A4A] bg-white/90 border border-[#8A9A83]/40 px-5 py-2.5 rounded-full shadow-xs hover:bg-white transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#8A9A83]" />
            <span>Agregar a mi Calendario de Google</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 5 - UBICACIÓN (PRÓXIMAMENTE)
          Actualizado a "Próximamente" por cambio de lugar solicitado
      ========================================================================== */}
      <section className="py-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xs mx-auto p-8 rounded-t-[100px] rounded-b-3xl bg-[#D4B895]/35 border border-[#C6A67A]/50 shadow-md relative overflow-hidden"
        >
          {/* Location Pin Icon */}
          <div className="w-14 h-14 rounded-full bg-white text-[#8A9A83] mx-auto flex items-center justify-center shadow-xs mb-2.5">
            <MapPin className="w-7 h-7 text-[#8A9A83]" />
          </div>

          {/* Script Title: "Lugar" */}
          <h3 className="font-script text-4xl sm:text-5xl text-[#555A4F] mb-1">
            Lugar
          </h3>

          {/* Estado Próximamente destacado */}
          <div className="my-3 space-y-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/95 border border-[#C6A67A]/60 text-sm font-sans-clean font-bold text-[#8c6738] uppercase tracking-wider shadow-2xs">
              Próximamente
            </span>

            <p className="font-sans-clean font-bold text-base sm:text-lg text-[#4A4A4A] leading-snug">
              Ubicación por confirmar
            </p>
            <div className="pt-2 border-t border-[#8A9A83]/20 space-y-1">
              <p className="text-xs sm:text-sm font-bold text-[#6E8168] font-sans-clean">
                Fecha: {config.dayName}, {config.dayNumber} de {config.monthName} de 2026
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#8A9A83] font-sans-clean">
                Horario: {config.timeString}
              </p>
            </div>
          </div>

          {/* Tarjeta informativa de estado */}
          <div className="mt-4">
            <div className="w-full py-3 px-4 rounded-xl bg-white/90 border border-[#8A9A83]/40 text-[#555A4F] font-sans-clean font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#C6A67A] shrink-0" />
              <span>Te avisaremos la dirección exacta</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 6 - CONFIRMACIÓN (RSVP)
          Contacto directo con Andrés (Llamada / SMS: 316 336 6206)
          y WhatsApp Alejandra (314 389 9735).
      ========================================================================== */}
      <section className="py-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xs mx-auto p-6 sm:p-7 rounded-3xl bg-white border border-[#8A9A83]/30 shadow-md"
        >
          <div className="w-14 h-14 rounded-full bg-[#EBF3EC] text-[#25D366] mx-auto flex items-center justify-center shadow-xs mb-2.5">
            <MessageCircle className="w-7 h-7 fill-[#25D366]/20" />
          </div>

          <h3 className="font-script text-4xl sm:text-5xl text-[#555A4F] mb-1">
            Confirmación
          </h3>

          <p className="text-xs sm:text-sm text-[#555A4F] font-sans-clean leading-relaxed my-3">
            {config.rsvpInstruction || 'Confirma tu asistencia comunicándote con Andrés y Alejandra indicando tu nombre completo y si asistirás. ¡Te esperamos con mucho amor!'}
          </p>

          <div className="space-y-3">
            {/* 1. Canal WhatsApp con Andrés */}
            <div className="p-3.5 rounded-2xl bg-[#EBF3EC]/70 border border-[#25D366]/30 text-left shadow-2xs">
              <span className="text-xs font-sans-clean uppercase tracking-wider font-bold text-[#20ba5a] block mb-1">
                WhatsApp Andrés:
              </span>
              <p className="text-xs sm:text-sm font-mono font-bold text-stone-700 mb-2">
                +57 {displayPhoneSecondary}
              </p>

              <a
                href={getWaLink(phoneSecondary)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans-clean font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Confirmar con Andrés</span>
              </a>
            </div>

            {/* 2. Canal WhatsApp con Alejandra */}
            <div className="p-3.5 rounded-2xl bg-[#EBF3EC]/70 border border-[#25D366]/30 text-left shadow-2xs">
              <span className="text-xs font-sans-clean uppercase tracking-wider font-bold text-[#20ba5a] block mb-1">
                WhatsApp Alejandra:
              </span>
              <p className="text-xs sm:text-sm font-mono font-bold text-stone-700 mb-2">
                +57 {displayPhonePrimary}
              </p>

              <a
                href={getWaLink(phonePrimary)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans-clean font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Confirmar con Alejandra</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 7 - LISTA OFICIAL DE REGALOS (PEPE GANGA / CONTINENTE #11349)
          Reemplazada por el catálogo completo de 80 artículos del PDF actualizado
      ========================================================================== */}
      <GiftRegistrySection giftNote={config.giftNote} />

      {/* =========================================================================
          SECCIÓN 8 - CIERRE CON AMOR
      ========================================================================== */}
      <section className="py-8 px-6 text-center">

        {/* Acuarela del Osito con Globos en el Cierre (/assets/teddy-balloons.png) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-2 flex flex-col items-center"
        >
          <img
            src="/assets/teddy-balloons.png"
            alt="Osito con globos de Benjamín"
            className="w-44 sm:w-48 h-auto object-contain animate-gentle-float"
          />

          <h3 className="font-script text-5xl sm:text-6xl text-[#555A4F] pt-1">
            {config.closureTitle}
          </h3>

          <div className="flex items-center justify-center gap-2 text-xs font-sans-clean text-[#8A9A83] font-bold">
            <Heart className="w-3.5 h-3.5 text-[#8A9A83] fill-[#8A9A83]" />
            <span>{config.closureText}</span>
            <Heart className="w-3.5 h-3.5 text-[#8A9A83] fill-[#8A9A83]" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};
