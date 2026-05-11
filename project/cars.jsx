/* global React */
const { useEffect, useRef, useState } = React;

// ============== LOGO ==============
const Logo = ({ size = 34 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className="logo-mark" aria-label="Irha Kars">
    <defs>
      <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#e89761"/>
        <stop offset="1" stopColor="#c87740"/>
      </linearGradient>
    </defs>
    {/* Hexagon mark */}
    <path d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z" fill="none" stroke="url(#lg)" strokeWidth="2.5"/>
    {/* Stylized V/wing inside */}
    <path d="M18 22 L32 44 L46 22 L40 22 L32 36 L24 22 Z" fill="url(#lg)"/>
    <path d="M22 18 L32 34 L42 18 L38 18 L32 28 L26 18 Z" fill="url(#lg)" opacity=".5"/>
  </svg>
);

// ============== CAR SVGs (stylized side silhouettes) ==============
const carDefs = (id) => (
  <defs>
    <linearGradient id={`body-${id}`} x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stopColor="#e89761"/>
      <stop offset="1" stopColor="#8a4d28"/>
    </linearGradient>
    <linearGradient id={`glass-${id}`} x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stopColor="#f5ead8" stopOpacity=".25"/>
      <stop offset="1" stopColor="#f5ead8" stopOpacity=".05"/>
    </linearGradient>
  </defs>
);

const Wheel = ({ cx, cy, r = 14, id }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#1d1218" stroke="#3a2730" strokeWidth="2"/>
    <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke="#c87740" strokeWidth="2"/>
    <circle cx={cx} cy={cy} r={r * 0.18} fill="#c87740"/>
  </g>
);

const Hatchback = ({ id = 'h' }) => (
  <svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg">
    {carDefs(id)}
    <path d="M30 95 Q50 92 70 90 L90 60 Q110 48 160 46 Q210 48 240 60 L280 80 Q300 84 295 95 L295 100 L30 100 Z" fill={`url(#body-${id})`}/>
    <path d="M95 62 Q120 52 160 50 Q200 52 230 62 L240 78 L95 78 Z" fill={`url(#glass-${id})`}/>
    <line x1="165" y1="50" x2="165" y2="78" stroke="#1d1218" strokeWidth="2" opacity=".5"/>
    <Wheel cx={90} cy={102} r={18}/>
    <Wheel cx={250} cy={102} r={18}/>
    <rect x="270" y="82" width="14" height="4" rx="2" fill="#e89761"/>
    <rect x="36" y="82" width="14" height="4" rx="2" fill="#f5ead8" opacity=".6"/>
  </svg>
);

const Sedan = ({ id = 's' }) => (
  <svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg">
    {carDefs(id)}
    <path d="M20 95 Q40 92 60 88 L110 56 Q140 46 200 46 Q250 48 280 60 L310 82 Q325 86 320 96 L320 100 L20 100 Z" fill={`url(#body-${id})`}/>
    <path d="M115 60 Q145 50 200 50 Q245 52 270 62 L275 78 L115 78 Z" fill={`url(#glass-${id})`}/>
    <line x1="180" y1="50" x2="180" y2="78" stroke="#1d1218" strokeWidth="2" opacity=".5"/>
    <Wheel cx={85} cy={102} r={18}/>
    <Wheel cx={270} cy={102} r={18}/>
    <rect x="295" y="84" width="16" height="4" rx="2" fill="#e89761"/>
    <rect x="26" y="84" width="16" height="4" rx="2" fill="#f5ead8" opacity=".6"/>
  </svg>
);

const SUV = ({ id = 'u' }) => (
  <svg viewBox="0 0 340 140" xmlns="http://www.w3.org/2000/svg">
    {carDefs(id)}
    <path d="M20 100 L40 96 L60 60 Q80 50 120 48 Q200 46 260 52 Q295 58 310 70 L325 88 Q330 92 328 102 L20 102 Z" fill={`url(#body-${id})`}/>
    <path d="M68 62 Q90 54 130 52 L130 84 L70 84 Z" fill={`url(#glass-${id})`}/>
    <path d="M140 52 Q200 52 260 56 Q280 60 290 70 L290 84 L140 84 Z" fill={`url(#glass-${id})`}/>
    <line x1="135" y1="52" x2="135" y2="84" stroke="#1d1218" strokeWidth="2" opacity=".5"/>
    <line x1="195" y1="52" x2="195" y2="84" stroke="#1d1218" strokeWidth="2" opacity=".5"/>
    <Wheel cx={90} cy={108} r={20}/>
    <Wheel cx={270} cy={108} r={20}/>
    <rect x="312" y="88" width="14" height="4" rx="2" fill="#e89761"/>
  </svg>
);

const Tempo = ({ id = 't' }) => (
  <svg viewBox="0 0 360 130" xmlns="http://www.w3.org/2000/svg">
    {carDefs(id)}
    <path d="M20 95 L20 50 Q22 42 32 40 L300 40 Q325 42 332 56 L340 80 Q344 88 340 96 L20 96 Z" fill={`url(#body-${id})`}/>
    <path d="M32 48 L88 48 L88 78 L32 78 Z" fill={`url(#glass-${id})`}/>
    <g fill={`url(#glass-${id})`}>
      <rect x="100" y="50" width="36" height="28"/>
      <rect x="144" y="50" width="36" height="28"/>
      <rect x="188" y="50" width="36" height="28"/>
      <rect x="232" y="50" width="36" height="28"/>
      <rect x="276" y="50" width="36" height="28"/>
    </g>
    <Wheel cx={80} cy={100} r={18}/>
    <Wheel cx={295} cy={100} r={18}/>
  </svg>
);

const Bus = ({ id = 'b' }) => (
  <svg viewBox="0 0 380 130" xmlns="http://www.w3.org/2000/svg">
    {carDefs(id)}
    <path d="M14 95 L14 40 Q16 30 28 28 L348 28 Q368 30 370 44 L370 96 L14 96 Z" fill={`url(#body-${id})`}/>
    <rect x="26" y="40" width="44" height="32" fill={`url(#glass-${id})`}/>
    <g fill={`url(#glass-${id})`}>
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={80 + i*38} y={40} width={32} height={32}/>
      ))}
    </g>
    <rect x="20" y="76" width="350" height="3" fill="#c87740" opacity=".6"/>
    <Wheel cx={80} cy={100} r={18}/>
    <Wheel cx={310} cy={100} r={18}/>
  </svg>
);

const Sleeper = ({ id = 'l' }) => (
  <svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg">
    {carDefs(id)}
    <path d="M14 95 L14 34 Q16 24 30 22 L368 22 Q388 26 390 40 L390 96 L14 96 Z" fill={`url(#body-${id})`}/>
    <rect x="26" y="32" width="44" height="22" fill={`url(#glass-${id})`}/>
    <g fill={`url(#glass-${id})`}>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={80 + i*36} y={32} width={30} height={22}/>
        ))}
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={`b${i}`} x={80 + i*36} y={60} width={30} height={14}/>
      ))}
    </g>
    <rect x="20" y="78" width="370" height="3" fill="#c87740" opacity=".6"/>
    <Wheel cx={80} cy={100} r={18}/>
    <Wheel cx={170} cy={100} r={18}/>
    <Wheel cx={320} cy={100} r={18}/>
  </svg>
);

const CarSVG = ({ type }) => {
  if (type === 'hatch') return <Hatchback id={Math.random().toString(36).slice(2,7)}/>;
  if (type === 'sedan') return <Sedan id={Math.random().toString(36).slice(2,7)}/>;
  if (type === 'suv') return <SUV id={Math.random().toString(36).slice(2,7)}/>;
  if (type === 'tempo') return <Tempo id={Math.random().toString(36).slice(2,7)}/>;
  if (type === 'bus') return <Bus id={Math.random().toString(36).slice(2,7)}/>;
  if (type === 'sleeper') return <Sleeper id={Math.random().toString(36).slice(2,7)}/>;
  return null;
};

// ============== MOUNTAIN SVG layers (parallax) ==============
const MountainLayer = ({ which }) => {
  if (which === 1) return (
    <svg viewBox="0 0 1920 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 600 L0 380 L180 240 L340 320 L520 180 L700 280 L880 160 L1060 260 L1240 200 L1420 320 L1600 240 L1780 340 L1920 280 L1920 600 Z" fill="#3a2730"/>
    </svg>
  );
  if (which === 2) return (
    <svg viewBox="0 0 1920 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 500 L0 320 L150 200 L320 280 L500 140 L680 240 L860 180 L1040 280 L1220 200 L1400 300 L1580 240 L1760 320 L1920 260 L1920 500 Z" fill="#241620"/>
      <path d="M150 200 L210 240 L240 220 L260 230 L280 218 Z" fill="#f5ead8" opacity=".4"/>
      <path d="M500 140 L560 180 L595 165 L620 178 L640 168 Z" fill="#f5ead8" opacity=".4"/>
      <path d="M860 180 L910 215 L940 200 L965 215 L985 205 Z" fill="#f5ead8" opacity=".4"/>
      <path d="M1220 200 L1280 240 L1310 225 L1335 240 L1355 228 Z" fill="#f5ead8" opacity=".35"/>
      <path d="M1580 240 L1635 275 L1665 262 L1690 275 L1710 268 Z" fill="#f5ead8" opacity=".35"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 1920 360" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 360 L0 220 L140 140 L300 200 L480 100 L660 180 L840 130 L1020 200 L1200 150 L1380 220 L1560 170 L1740 240 L1920 200 L1920 360 Z" fill="#120a10"/>
      <path d="M0 360 L0 280 L240 250 L500 280 L780 240 L1080 290 L1380 250 L1680 290 L1920 270 L1920 360 Z" fill="#0a0508"/>
    </svg>
  );
};

window.Logo = Logo;
window.CarSVG = CarSVG;
window.MountainLayer = MountainLayer;
