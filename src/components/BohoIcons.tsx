import React from 'react';

/**
 * Bespoke Boho Chic SVG Illustrations & Icons for Benjamín's Baby Shower.
 * Crafted with soft organic curves, warm watercolor gradients, and fine details.
 */

// 1. Hot Air Balloon with Cute Teddy Bear
export const HotAirBalloonBear: React.FC<{ className?: string }> = ({ className = 'w-52 h-64' }) => (
  <svg
    viewBox="0 0 240 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      {/* Balloon Stripes Gradients */}
      <linearGradient id="sageStripe" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A8BC9F" />
        <stop offset="100%" stopColor="#7E9375" />
      </linearGradient>
      <linearGradient id="creamStripe" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFDF9" />
        <stop offset="100%" stopColor="#F1ECE0" />
      </linearGradient>
      <linearGradient id="sandStripe" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFCBAC" />
        <stop offset="100%" stopColor="#C4A87E" />
      </linearGradient>
      <linearGradient id="basketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D5BA93" />
        <stop offset="100%" stopColor="#A9865B" />
      </linearGradient>
      <linearGradient id="bearFur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C8A37A" />
        <stop offset="100%" stopColor="#A47C50" />
      </linearGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#667761" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Balloon Shadow and Main Body */}
    <g filter="url(#softGlow)">
      {/* Outer Balloon Shape */}
      <path
        d="M120 18C64.77 18 20 62.77 20 118C20 152 38 184 72 208C86 218 92 226 94 234H146C148 226 154 218 168 208C202 184 220 152 220 118C220 62.77 175.23 18 120 18Z"
        fill="#F6F2E8"
      />

      {/* Center Sage Green Stripe */}
      <path
        d="M102 19C108 18.5 114 18 120 18C126 18 132 18.5 138 19C146 64 148 168 126 234H114C92 168 94 64 102 19Z"
        fill="url(#sageStripe)"
      />

      {/* Left Sand Stripe */}
      <path
        d="M58 42C72 28 88 22 102 19C94 64 92 168 114 234H104C88 224 50 182 42 118C38 88 46 62 58 42Z"
        fill="url(#sandStripe)"
      />

      {/* Right Sand Stripe */}
      <path
        d="M182 42C168 28 152 22 138 19C146 64 148 168 126 234H136C152 224 190 182 198 118C202 88 194 62 182 42Z"
        fill="url(#sandStripe)"
      />

      {/* Outer Side Flanks (Soft Sage) */}
      <path
        d="M20 118C20 74 42 38 58 42C46 62 38 88 42 118C50 182 88 224 104 234H94C92 226 86 218 72 208C38 184 20 152 20 118Z"
        fill="url(#sageStripe)"
        opacity="0.85"
      />
      <path
        d="M220 118C220 74 198 38 182 42C194 62 202 88 198 118C190 182 152 224 136 234H146C148 226 154 218 168 208C202 184 220 152 220 118Z"
        fill="url(#sageStripe)"
        opacity="0.85"
      />

      {/* Decorative Golden Star at center of balloon */}
      <path
        d="M120 75L122.5 83H131L124 88L126.5 96L120 91L113.5 96L116 88L109 83H117.5L120 75Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
      <circle cx="120" cy="85.5" r="1.5" fill="#C4A87E" />

      {/* Subtle stitched bunting garland draped on balloon */}
      <path
        d="M48 110Q120 148 192 110"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        fill="none"
      />
      <polygon points="76,122 84,124 80,132" fill="#DFCBAC" />
      <polygon points="102,129 110,130 106,138" fill="#A8BC9F" />
      <polygon points="130,130 138,129 134,138" fill="#FFFDF9" />
      <polygon points="156,124 164,122 160,132" fill="#DFCBAC" />
    </g>

    {/* Balloon Collar Ring */}
    <rect x="90" y="234" width="60" height="7" rx="3.5" fill="#B39369" />

    {/* Suspension Ropes (Rigging) */}
    <line x1="96" y1="241" x2="101" y2="258" stroke="#A9865B" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="144" y1="241" x2="139" y2="258" stroke="#A9865B" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="112" y1="241" x2="109" y2="258" stroke="#A9865B" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="128" y1="241" x2="131" y2="258" stroke="#A9865B" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

    {/* Woven Basket */}
    <path
      d="M96 258H144L140 292C139.5 295 137 297 134 297H106C103 297 100.5 295 100 292L96 258Z"
      fill="url(#basketGrad)"
      stroke="#8E6A41"
      strokeWidth="1.2"
    />
    {/* Basket Weave Lines */}
    <line x1="97" y1="268" x2="143" y2="268" stroke="#8E6A41" strokeWidth="1" opacity="0.5" />
    <line x1="98" y1="278" x2="142" y2="278" stroke="#8E6A41" strokeWidth="1" opacity="0.5" />
    <line x1="100" y1="288" x2="140" y2="288" stroke="#8E6A41" strokeWidth="1" opacity="0.5" />

    {/* THE CUTE BABY TEDDY BEAR (Sitting inside the basket, peeking out) */}
    <g id="teddyBear">
      {/* Bear Left Ear */}
      <circle cx="106" cy="235" r="8" fill="url(#bearFur)" />
      <circle cx="106" cy="235" r="4.5" fill="#E8C7A0" />

      {/* Bear Right Ear */}
      <circle cx="134" cy="235" r="8" fill="url(#bearFur)" />
      <circle cx="134" cy="235" r="4.5" fill="#E8C7A0" />

      {/* Bear Head */}
      <circle cx="120" cy="242" r="16" fill="url(#bearFur)" />

      {/* Snout / Muzzle */}
      <ellipse cx="120" cy="247" rx="8" ry="6.5" fill="#FFF2DF" />

      {/* Nose */}
      <ellipse cx="120" cy="244" rx="3" ry="2" fill="#4A3828" />

      {/* Mouth */}
      <path d="M120 246V249M118 249Q120 251 122 249" stroke="#4A3828" strokeWidth="1" strokeLinecap="round" />

      {/* Eyes */}
      <circle cx="114" cy="239" r="2" fill="#2E2319" />
      <circle cx="126" cy="239" r="2" fill="#2E2319" />
      <circle cx="114.6" cy="238.4" r="0.7" fill="#FFFFFF" />
      <circle cx="126.6" cy="238.4" r="0.7" fill="#FFFFFF" />

      {/* Sweet Blush Cheeks */}
      <circle cx="110" cy="246" r="2.8" fill="#E8A598" opacity="0.6" />
      <circle cx="130" cy="246" r="2.8" fill="#E8A598" opacity="0.6" />

      {/* Little Paws holding the edge of the basket */}
      <ellipse cx="102" cy="260" rx="5" ry="4" fill="url(#bearFur)" />
      <ellipse cx="102" cy="260" rx="3" ry="2.2" fill="#E8C7A0" />

      <ellipse cx="138" cy="260" rx="5" ry="4" fill="url(#bearFur)" />
      <ellipse cx="138" cy="260" rx="3" ry="2.2" fill="#E8C7A0" />
    </g>
  </svg>
);

// 2. Realistic 3D Artisan Wax Seal (Sello de Cera Dorado con Relieve)
export const RealisticWaxSeal: React.FC<{
  onClick: () => void;
  className?: string;
}> = ({ onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`group relative w-24 h-24 sm:w-26 sm:h-26 cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 animate-seal-pulse ${className}`}
    title="Toca para ver la invitación"
  >
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-xl"
    >
      <defs>
        {/* Molten Gold Wax Gradient */}
        <radialGradient id="waxGold" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#F9E8B8" />
          <stop offset="25%" stopColor="#E5C78B" />
          <stop offset="60%" stopColor="#C49F5A" />
          <stop offset="85%" stopColor="#9E7836" />
          <stop offset="100%" stopColor="#6E501F" />
        </radialGradient>
        <linearGradient id="bevelLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Organic Melted Wax Outer Contour with drops */}
      <path
        d="M60 5C78 4 93 12 104 26C114 39 117 56 114 73C111 88 102 101 88 109C73 117 54 116 38 111C23 105 10 93 6 77C2 61 7 44 17 31C28 17 43 6 60 5Z"
        fill="url(#waxGold)"
      />

      {/* Organic Wax Rim Ridges */}
      <circle cx="60" cy="60" r="46" stroke="#FFE9B5" strokeWidth="2.5" opacity="0.6" />
      <circle cx="60" cy="60" r="43" stroke="#75521C" strokeWidth="1.5" opacity="0.7" />

      {/* Inner Depressed Center */}
      <circle cx="60" cy="60" r="38" fill="url(#waxGold)" />

      {/* Stitched Inner Ring */}
      <circle cx="60" cy="60" r="35" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

      {/* Relief Baby Feet / Osito Silhouette */}
      {/* Little baby feet debossed icon */}
      <g fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0px 1px 1px rgba(78,54,19,0.7))">
        {/* Left Foot Sole */}
        <ellipse cx="53" cy="58" rx="5" ry="7" transform="rotate(-10 53 58)" />
        <circle cx="49" cy="49" r="1.6" />
        <circle cx="52" cy="48" r="1.5" />
        <circle cx="55" cy="48.5" r="1.4" />
        <circle cx="57.5" cy="50" r="1.2" />
        <circle cx="59.5" cy="52" r="1.0" />

        {/* Right Foot Sole */}
        <ellipse cx="67" cy="58" rx="5" ry="7" transform="rotate(10 67 58)" />
        <circle cx="71" cy="49" r="1.6" />
        <circle cx="68" cy="48" r="1.5" />
        <circle cx="65" cy="48.5" r="1.4" />
        <circle cx="62.5" cy="50" r="1.2" />
        <circle cx="60.5" cy="52" r="1.0" />
      </g>

      {/* Spanish Text Label Around Bottom Ring */}
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="7.5"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="bold"
        letterSpacing="2"
        opacity="0.95"
      >
        TOCAR
      </text>
      <text
        x="60"
        y="87"
        textAnchor="middle"
        fill="#FFE8B5"
        fontSize="6"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="600"
        letterSpacing="1.5"
      >
        PARA ABRIR
      </text>
    </svg>
  </button>
);

// 3. Cute Floating Boho Clouds with Stars
export const BohoCloud: React.FC<{ className?: string; withStar?: boolean }> = ({
  className = 'w-24 h-14',
  withStar = false,
}) => (
  <svg
    viewBox="0 0 100 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 48H80C88.28 48 95 41.28 95 33C95 25.1 88.9 18.6 81.1 18C79.8 9.8 72.8 3.5 64.2 3.5C57.4 3.5 51.5 7.4 48.6 13.1C45.9 11.2 42.6 10 39 10C30 10 22.4 16.5 21.2 25.3C14.7 26.6 10 32.3 10 39C10 44 14.5 48 20 48Z"
      fill="#FFFFFF"
      fillOpacity="0.85"
    />
    {withStar && (
      <path
        d="M72 16L73 20L77 21L73 22L72 26L71 22L67 21L71 20L72 16Z"
        fill="#C6A67A"
        opacity="0.9"
      />
    )}
  </svg>
);

// 4. Bunting Garland Banner in SVG
export const BuntingGarland: React.FC<{ className?: string }> = ({ className = 'w-full h-8' }) => (
  <svg
    viewBox="0 0 320 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    {/* Cathedenary curved line */}
    <path
      d="M0 6Q160 22 320 6"
      stroke="#C6A67A"
      strokeWidth="1.2"
      strokeDasharray="4 3"
    />
    {/* Pennants */}
    <polygon points="30,8 48,10 39,28" fill="#8A9A83" />
    <polygon points="68,11 86,13 77,30" fill="#D4B895" />
    <polygon points="106,13 124,14 115,31" fill="#FFFFFF" stroke="#8A9A83" strokeWidth="0.5" />
    <polygon points="146,14 164,14 155,32" fill="#8A9A83" />
    <polygon points="186,14 204,13 195,31" fill="#D4B895" />
    <polygon points="226,13 244,11 235,30" fill="#FFFFFF" stroke="#8A9A83" strokeWidth="0.5" />
    <polygon points="266,10 284,8 275,28" fill="#8A9A83" />
  </svg>
);

// 5. Final Sleeping/Sitting Teddy Bear with Heart
export const TeddyBearFinal: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="bearFinalFur" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#CBB08C" />
        <stop offset="100%" stopColor="#9C784E" />
      </linearGradient>
    </defs>

    {/* Soft Glow Shadow Underneath */}
    <ellipse cx="80" cy="148" rx="45" ry="8" fill="#8A9A83" fillOpacity="0.2" />

    {/* Left Ear */}
    <circle cx="52" cy="46" r="16" fill="url(#bearFinalFur)" />
    <circle cx="52" cy="46" r="9" fill="#F4E2CD" />

    {/* Right Ear */}
    <circle cx="108" cy="46" r="16" fill="url(#bearFinalFur)" />
    <circle cx="108" cy="46" r="9" fill="#F4E2CD" />

    {/* Body */}
    <ellipse cx="80" cy="106" rx="34" ry="38" fill="url(#bearFinalFur)" />
    {/* Soft Belly Patch */}
    <ellipse cx="80" cy="112" rx="20" ry="24" fill="#FBF3E8" />

    {/* Legs / Feet */}
    <ellipse cx="50" cy="134" rx="14" ry="11" fill="url(#bearFinalFur)" />
    <ellipse cx="50" cy="134" rx="8" ry="6" fill="#F4E2CD" />

    <ellipse cx="110" cy="134" rx="14" ry="11" fill="url(#bearFinalFur)" />
    <ellipse cx="110" cy="134" rx="8" ry="6" fill="#F4E2CD" />

    {/* Head */}
    <circle cx="80" cy="62" r="30" fill="url(#bearFinalFur)" />

    {/* Snout */}
    <ellipse cx="80" cy="71" rx="14" ry="11" fill="#FBF3E8" />
    <ellipse cx="80" cy="66" rx="5" ry="3.5" fill="#4B3726" />
    <path d="M80 69.5V74M76 74Q80 77 84 74" stroke="#4B3726" strokeWidth="1.6" strokeLinecap="round" />

    {/* Sweet Sleeping/Happy Curved Eyes */}
    <path d="M68 59Q72 55 76 59" stroke="#4B3726" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M84 59Q88 55 92 59" stroke="#4B3726" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Cheeks */}
    <circle cx="64" cy="68" r="4.5" fill="#E8A598" opacity="0.6" />
    <circle cx="96" cy="68" r="4.5" fill="#E8A598" opacity="0.6" />

    {/* Little Paws holding a pastel heart */}
    <path
      d="M80 102C76 96 68 96 64 102C58 110 80 124 80 124C80 124 102 110 96 102C92 96 84 96 80 102Z"
      fill="#8A9A83"
    />
    <circle cx="68" cy="104" r="6" fill="url(#bearFinalFur)" />
    <circle cx="92" cy="104" r="6" fill="url(#bearFinalFur)" />
  </svg>
);
