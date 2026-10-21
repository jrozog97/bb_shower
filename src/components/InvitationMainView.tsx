import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  MapPin, 
  MessageCircle, 
  Mail, 
  Calendar,
  ExternalLink,
  Heart,
  Sparkles,
  Gift,
  ShoppingBag,
  Phone,
  Copy,
  Check,
  X,
  Send,
  UserCheck
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

  // RSVP phone handling & modal state
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestAttendance, setGuestAttendance] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  const phonePrimary = (config.hostPhone || '573143899735').replace(/\D/g, '');
  const phoneSecondary = (config.hostPhoneSecondary || '573163366206').replace(/\D/g, '');
  
  const displayPhonePrimary = '314 389 9735';
  const displayPhoneSecondary = '316 336 6206';

  const generateRsvpText = () => {
    if (!guestName.trim()) {
      return config.rsvpMessage;
    }
    const attendanceText = guestAttendance === 'yes' 
      ? `Sí asistiré con alegría (${guestCount} ${guestCount === 1 ? 'persona' : 'personas'})` 
      : 'Lamentablemente no podré asistir pero les mando un abrazo gigante';
    return `¡Hola Alejandra y Andrés! Confirmo mi asistencia al Baby Shower de Benjamín 🧸✨\n\nNombre: ${guestName.trim()}\nRespuesta: ${attendanceText}`;
  };

  const getWaLink = (phone: string, customText?: string) => {
    const text = customText || generateRsvpText();
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const getSmsLink = (phone: string, customText?: string) => {
    const text = customText || generateRsvpText();
    return `sms:+${phone}?body=${encodeURIComponent(text)}`;
  };

  const handleCopyMessage = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Google Calendar URL generator
  const googleCalendarUrl = () => {
    const title = encodeURIComponent(`Baby Shower de ${config.babyName} 🧸`);
    const details = encodeURIComponent(
      `¡Acompáñanos a celebrar el Baby Shower de ${config.babyName}!\n\n` +
      `Padres: ${config.parentsNames}\n` +
      `Lugar: ${config.venueName} (${config.venueAddress})\n` +
      `Horario: ${config.timeString}\n` +
      `¡Te esperamos con mucho amor!`
    );
    const location = encodeURIComponent(`${config.venueName}, ${config.venueAddress}, Bogotá, Colombia`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261129T190000Z/20261130T000000Z&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <div className="relative w-full max-w-md mx-auto boho-bg text-[#4A4A4A] min-h-screen overflow-x-hidden pb-12 select-none">
      {/* Floating Music Button (Top Left) */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={toggleMusic}
          className="w-11 h-11 rounded-full bg-white/95 border border-[#8A9A83]/40 shadow-lg flex items-center justify-center text-[#8A9A83] hover:text-[#555A4F] hover:bg-white transition-all hover:scale-105 active:scale-95 cursor-pointer group"
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
        {/* Curving Welcome Phrase */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#EBF3EC] border border-[#8A9A83]/30 text-xs font-handwriting text-[#6E8168] font-bold tracking-wide">
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
          <h1 className="font-script text-4xl sm:text-5xl text-[#555A4F] leading-tight">
            Una nueva historia
          </h1>
          <p className="font-serif-clean text-base sm:text-lg text-[#555A4F] font-medium mt-1 leading-snug">
            está por comenzar, y nos hace felices saber que hay personas como tú con quienes compartirla.
          </p>

          {/* Cita bíblica según el PDF: “Todo lo hizo hermoso en su tiempo.” Eclesiastés 3:11 */}
          <div className="mt-4 pt-3 border-t border-[#8A9A83]/25 max-w-xs mx-auto">
            <p className="font-serif-clean italic text-sm text-[#8A9A83] font-medium leading-relaxed">
              &ldquo;Todo lo hizo hermoso en su tiempo.&rdquo;
            </p>
            <span className="text-[11px] font-sans-clean uppercase tracking-[0.2em] text-[#C6A67A] font-bold block mt-0.5">
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
          <span className="text-[10px] font-sans-clean uppercase tracking-[0.3em] text-[#8A9A83] font-bold">
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
              <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/60 text-[8px] font-sans-clean font-bold text-white shadow-2xs">
                ECO 4D
              </div>
            </div>
            <p className="font-handwriting text-xs text-[#8A9A83] font-bold text-center mt-2">
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
              <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-[#EBF3EC] text-[8px] font-sans-clean font-bold text-[#6E8168] shadow-2xs">
                Dulces Sueños
              </div>
            </div>
            <p className="font-handwriting text-xs text-stone-600 font-bold text-center mt-2">
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
          <span className="text-[10px] font-sans-clean uppercase tracking-[0.25em] text-[#8A9A83] font-bold block mb-1">
            Nuestra Familia
          </span>
          <h2 className="font-sans-clean font-bold text-xl sm:text-2xl text-[#4A4A4A] uppercase tracking-wider mb-2">
            Mis papis: <span className="text-[#8A9A83] font-script normal-case text-3xl sm:text-4xl font-normal block sm:inline">{config.parentsNames}</span>
          </h2>
          <p className="text-xs text-[#555A4F] font-sans-clean max-w-xs mx-auto mb-7 leading-relaxed">
            Esperando con todo el corazón la bendición de tenerte muy pronto entre nuestros brazos.
          </p>
        </motion.div>

        {/* 2 Polaroids Superimposed and Asymmetrically Rotated (Sin Emojis) */}
        <div className="relative w-full max-w-xs mx-auto h-64 flex items-center justify-center">
          {/* Polaroid 1 (Left, rotated -4deg): Alejandra y Andrés */}
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
                alt="Alejandra y Andrés"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-handwriting text-xs text-stone-600 text-center mt-2 font-semibold">
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
            <p className="font-handwriting text-xs text-stone-600 text-center mt-2 font-semibold">
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
          <div className="p-3 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-[9px] font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              DÍA
            </span>
            <span className="font-serif-clean text-2xl sm:text-3xl font-bold text-[#4A4A4A] my-0.5">
              {config.dayNumber}
            </span>
            <span className="text-[10px] font-sans-clean text-stone-500 font-medium capitalize">
              {config.dayName}
            </span>
          </div>

          {/* Card Mes */}
          <div className="p-3 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-[9px] font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              MES
            </span>
            <span className="font-serif-clean text-2xl sm:text-3xl font-bold text-[#4A4A4A] my-0.5">
              {config.monthNumber}
            </span>
            <span className="text-[10px] font-sans-clean text-stone-500 font-medium capitalize">
              {config.monthName}
            </span>
          </div>

          {/* Card Año */}
          <div className="p-3 rounded-2xl bg-white border border-[#C6A67A]/40 shadow-sm flex flex-col items-center">
            <span className="text-[9px] font-sans-clean uppercase tracking-wider text-[#8A9A83] font-bold">
              AÑO
            </span>
            <span className="font-serif-clean text-2xl sm:text-3xl font-bold text-[#4A4A4A] my-0.5">
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
          <div className="absolute top-2 right-3 text-xl opacity-20 pointer-events-none">🌿</div>
          <div className="absolute bottom-2 left-3 text-xl opacity-20 pointer-events-none">🌿</div>

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
                    <span className="text-[9px] font-sans-clean uppercase tracking-wider text-[#F9F6F0]/85 mt-0.5">
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
            className="inline-flex items-center gap-2 text-xs font-sans-clean font-semibold text-[#6E8168] hover:text-[#555A4F] bg-white/80 border border-[#8A9A83]/30 px-4 py-2 rounded-full shadow-2xs hover:bg-white transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#8A9A83]" />
            <span>Agregar a mi Calendario de Google</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 5 - UBICACIÓN
          Contenedor con forma de arco / bóveda en color arena,
          "Lugar", "Salón San Juan Suba", "Calle 151b # 103f-41", "2:00 PM a 7:00 PM"
          Botón rectangular verde salvia: "Ver Ubicación en Google Maps"
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
          <div className="w-12 h-12 rounded-full bg-white text-[#8A9A83] mx-auto flex items-center justify-center shadow-xs mb-2">
            <MapPin className="w-6 h-6" />
          </div>

          {/* Script Title: "Lugar" */}
          <h3 className="font-script text-4xl text-[#555A4F] mb-1">
            Lugar
          </h3>

          {/* Venue texts */}
          <div className="space-y-1 my-3">
            <p className="font-sans-clean font-bold text-base text-[#4A4A4A]">
              {config.venueName}
            </p>
            <p className="text-xs text-[#555A4F] font-sans-clean">
              {config.venueAddress}
            </p>
            <p className="text-xs text-stone-500 font-sans-clean">
              Suba, Bogotá
            </p>
            <p className="text-xs font-semibold text-[#8A9A83] font-sans-clean pt-1.5">
              Hora: {config.timeString}
            </p>
          </div>

          {/* Rectangular Interactive Sage Green Button */}
          <div className="mt-5">
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[#8A9A83] hover:bg-[#788871] text-white font-sans-clean font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Ver Ubicación</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 6 - CONFIRMACIÓN (RSVP)
          Opciones múltiples: WhatsApp Principal (Alejandra: 314 389 9735),
          WhatsApp Alternativo (Andrés: 316 336 6206),
          Llamada o SMS directo, y Formulario de confirmación interactivo.
      ========================================================================== */}
      <section className="py-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xs mx-auto p-6 rounded-3xl bg-white border border-[#8A9A83]/30 shadow-md"
        >
          <div className="w-12 h-12 rounded-full bg-[#EBF3EC] text-[#25D366] mx-auto flex items-center justify-center shadow-xs mb-2">
            <MessageCircle className="w-6 h-6 fill-[#25D366]/20" />
          </div>

          <h3 className="font-script text-4xl text-[#555A4F] mb-1">
            Confirmación
          </h3>

          <p className="text-xs text-[#555A4F] font-sans-clean leading-relaxed my-3">
            {config.rsvpInstruction || 'Confirma tu asistencia por WhatsApp a este número, indicando tu nombre completo y si asistirás o no. Así podremos llevar nuestro registro. ¡Te esperamos con mucho amor!'}
          </p>

          {/* Number Display Tag */}
          <div className="mb-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5F1E7] border border-[#8A9A83]/30 text-xs font-sans-clean font-bold text-[#555A4F]">
            <span>Línea:</span>
            <span className="text-[#6E8168] tracking-wider font-mono">
              +57 {displayPhonePrimary}
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Botón Principal: WhatsApp Alejandra */}
            <a
              href={getWaLink(phonePrimary)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans-clean font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>Confirmar por WhatsApp</span>
            </a>

            {/* Botón Alternativo si WhatsApp marca invitar: WhatsApp Andrés / Alternativo */}
            <a
              href={getWaLink(phoneSecondary)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#EBF3EC] hover:bg-[#dcead8] text-[#555A4F] border border-[#8A9A83]/40 font-sans-clean font-semibold text-[11px] transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]/20 shrink-0" />
              <span>WhatsApp Alternativo ({displayPhoneSecondary})</span>
            </a>

            {/* Opciones directas: Llamada / SMS */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={getSmsLink(phonePrimary)}
                className="py-2.5 px-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-[#555A4F] border border-stone-200 font-sans-clean font-semibold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3 h-3 text-[#8A9A83]" />
                <span>Enviar SMS</span>
              </a>

              <a
                href={`tel:+${phonePrimary}`}
                className="py-2.5 px-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-[#555A4F] border border-stone-200 font-sans-clean font-semibold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3 h-3 text-[#8A9A83]" />
                <span>Llamar</span>
              </a>
            </div>

            {/* Botón Personalizar y Enviar en Formulario */}
            <button
              onClick={() => setIsRsvpModalOpen(true)}
              className="w-full mt-1 py-2.5 px-3 rounded-xl bg-[#FAF4ED] hover:bg-[#F2E8DC] text-[#8c6738] border border-[#C6A67A]/50 font-sans-clean font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#C6A67A]" />
              <span>Personalizar Confirmación</span>
            </button>
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

      {/* Modal de Confirmación Personalizada & Copiar Mensaje */}
      <AnimatePresence>
        {isRsvpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-2 border-[#C6A67A]/50 relative text-left max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsRsvpModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#EBF3EC] flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-4 h-4 fill-[#25D366]/20" />
                </div>
                <div>
                  <h4 className="font-serif-clean font-bold text-base text-[#4A4A4A]">
                    Confirmar Asistencia
                  </h4>
                  <p className="text-[10px] text-stone-500 font-sans-clean">
                    Baby Shower de Benjamín
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 my-3">
                <div>
                  <label className="block text-[11px] font-sans-clean font-bold text-[#555A4F] mb-1">
                    Tu Nombre Completo:
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ej. Familia Velandia"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#4A4A4A] focus:outline-hidden focus:border-[#8A9A83]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans-clean font-bold text-[#555A4F] mb-1">
                    ¿Asistirás al baby shower?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGuestAttendance('yes')}
                      className={`py-2 px-2.5 rounded-xl text-xs font-sans-clean font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        guestAttendance === 'yes'
                          ? 'bg-[#8A9A83] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>Sí asistiré</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuestAttendance('no')}
                      className={`py-2 px-2.5 rounded-xl text-xs font-sans-clean font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        guestAttendance === 'no'
                          ? 'bg-[#C6A67A] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      <span>No podré ir</span>
                    </button>
                  </div>
                </div>

                {guestAttendance === 'yes' && (
                  <div>
                    <label className="block text-[11px] font-sans-clean font-bold text-[#555A4F] mb-1">
                      Número de personas que van:
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                        className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 font-bold text-stone-700 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-serif-clean font-bold text-sm text-[#4A4A4A]">
                        {guestCount} {guestCount === 1 ? 'persona' : 'personas'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount((c) => c + 1)}
                        className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 font-bold text-stone-700 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Preview Message Box */}
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-stone-500 uppercase">Mensaje listo para enviar:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(generateRsvpText())}
                      className="text-[10px] font-sans-clean font-bold text-[#8A9A83] hover:text-[#555A4F] flex items-center gap-1 cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-[#555A4F] whitespace-pre-line leading-relaxed">
                    {generateRsvpText()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <a
                  href={getWaLink(phonePrimary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-sans-clean font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>Enviar por WhatsApp a Alejandra</span>
                </a>

                <a
                  href={getWaLink(phoneSecondary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#EBF3EC] hover:bg-[#dcead8] text-[#555A4F] text-xs font-sans-clean font-semibold flex items-center justify-center gap-2 cursor-pointer border border-[#8A9A83]/30"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]/20 shrink-0" />
                  <span>Enviar por WhatsApp a Andrés</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={getSmsLink(phonePrimary)}
                    className="py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-sans-clean font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3 h-3 text-[#8A9A83]" />
                    <span>Enviar SMS</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyMessage(generateRsvpText())}
                    className="py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-sans-clean font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-[#8A9A83]" />
                    <span>{isCopied ? '¡Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
