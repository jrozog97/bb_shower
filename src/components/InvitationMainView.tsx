import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  MapPin, 
  MessageCircle, 
  Mail, 
  Calendar,
  ExternalLink,
  Heart,
  Sparkles
} from 'lucide-react';
import { InvitationConfig } from '../types/invitation';
import { audioPlayer } from '../utils/audioPlayer';
import { HotAirBalloonBear, BuntingGarland, TeddyBearFinal } from './BohoIcons';
import { StoryUltrasoundItinerary } from './StoryUltrasoundItinerary';

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

  const handleWhatsAppRsvp = () => {
    let cleanPhone = config.hostPhone.replace(/\D/g, '');
    if (cleanPhone.length === 10 && cleanPhone.startsWith('3')) {
      cleanPhone = `57${cleanPhone}`;
    }
    const encoded = encodeURIComponent(config.rsvpMessage);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
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

        {/* Bespoke Hot Air Balloon with Teddy Bear (High Quality SVG) */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative my-2 flex items-center justify-center animate-gentle-float"
        >
          <HotAirBalloonBear className="w-52 h-64 drop-shadow-sm" />
        </motion.div>

        {/* Script Title in Spanish */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-1"
        >
          <h1 className="font-script text-5xl sm:text-6xl text-[#555A4F] leading-tight">
            {config.mainBearTitle}
          </h1>
          <p className="font-serif-clean italic text-sm text-[#8A9A83] max-w-xs mx-auto mt-2 leading-relaxed">
            &ldquo;{config.subtitle}&rdquo;
          </p>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 2 - LOS PADRES
          "Mis papis: ALEJANDRA Y ANDRÉS" + 2 Polaroids asimétricas
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

        {/* 2 Polaroids Superimposed and Asymmetrically Rotated */}
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
                alt="Alejandra y Andrés"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-handwriting text-xs text-stone-600 text-center mt-2 font-semibold">
              Juntos en la dulce espera 💕
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
            <p className="font-handwriting text-xs text-stone-600 text-center mt-2 font-semibold">
              Contando los días ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3 - EL BEBÉ
          Guirnalda de banderines en SVG, "MI BABY SHOWER",
          Nombre gigante en Script: "Benjamín" + Foto Polaroid Ecografía
      ========================================================================== */}
      <section className="py-8 px-6 text-center">
        {/* SVG Bunting Garland */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          className="max-w-xs mx-auto mb-3"
        >
          <BuntingGarland className="w-full h-8" />
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
              alt="Ecografía de Benjamín"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-white/90 text-[9px] font-sans-clean font-bold text-stone-600 shadow-2xs">
              Ecografía
            </div>
          </div>
          <p className="font-handwriting text-sm text-[#8A9A83] font-bold text-center mt-2.5">
            ¡Hola a todos! Soy Benjamín 👶✨
          </p>
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
          Icono de WhatsApp, título Script "Confirmación",
          texto y botón "Confirma Aquí"
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
            Nos llenará de alegría contar con tu presencia en este momento tan especial. Por favor confírmanos tu asistencia al <strong>{config.hostPhone.replace(/^57/, '')}</strong>.
          </p>

          <button
            onClick={handleWhatsAppRsvp}
            className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans-clean font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Confirma Aquí por WhatsApp</span>
          </button>
        </motion.div>
      </section>

      {/* =========================================================================
          SECCIÓN 7 - LISTA DE REGALOS & CIERRE
          Icono de sobre de dinero, título Script "Lista de Regalos",
          Lluvia de sobres + opciones de regalo sugeridas,
          Ilustración final del osito durmiente en SVG,
          Título Script "Te Esperamos" y "Con mucho amor".
      ========================================================================== */}
      <section className="py-8 px-6 text-center">
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
            Lista de Regalos
          </h3>

          <p className="text-xs text-[#555A4F] font-sans-clean leading-relaxed mt-2 mb-4">
            {config.giftNote}
          </p>

          {/* Lluvia de Sobres Card */}
          <div className="p-4 rounded-2xl bg-[#FAF4ED] border border-[#C6A67A]/50 text-left mb-4 shadow-2xs">
            <div className="flex items-center gap-2 font-sans-clean font-bold text-xs text-[#8c6738]">
              <Mail className="w-4 h-4 text-[#C6A67A]" />
              <span>Lluvia de Sobres</span>
            </div>
            <p className="text-[11px] text-[#555A4F] mt-1.5 leading-relaxed font-sans-clean">
              Dispondremos de un cofre especial en el salón para quienes deseen hacernos su regalo en sobre para el ajuar de Benjamín.
            </p>
          </div>

          {/* Lista de sugerencias */}
          {config.giftItems && config.giftItems.length > 0 && (
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-sans-clean uppercase tracking-wider font-bold text-[#8A9A83] block mb-1">
                Sugerencias para el bebé:
              </span>
              {config.giftItems.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl bg-[#F9F6F0] border border-[#8A9A83]/20 text-[11px] text-[#4A4A4A] flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-[#C6A67A] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Final Bespoke Sitting Teddy Bear SVG & Romantic Closure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-2 flex flex-col items-center"
        >
          <TeddyBearFinal className="w-32 h-32 animate-gentle-float" />

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
