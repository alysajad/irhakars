/* global React */
const { useEffect, useRef, useState } = React;

// ============== LOGO ==============
const Logo = ({ size = 32 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className="logo-mark" aria-label="Irha Kars">
    <defs>
      <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#33b8b3"/>
        <stop offset="1" stopColor="#00a19b"/>
      </linearGradient>
    </defs>
    {/* Hexagon */}
    <path d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z" fill="none" stroke="url(#lg)" strokeWidth="2.5"/>
    {/* Wing / K mark */}
    <path d="M18 22 L32 44 L46 22 L40 22 L32 36 L24 22 Z" fill="url(#lg)"/>
    <path d="M22 18 L32 34 L42 18 L38 18 L32 28 L26 18 Z" fill="url(#lg)" opacity=".45"/>
  </svg>
);

// ============== MOUNTAIN SVG layers (parallax, light/teal palette) ==============
const MountainLayer = ({ which }) => {
  if (which === 1) return (
    <svg viewBox="0 0 1920 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 600 L0 380 L180 240 L340 320 L520 180 L700 280 L880 160 L1060 260 L1240 200 L1420 320 L1600 240 L1780 340 L1920 280 L1920 600 Z" fill="rgba(0,161,155,.08)"/>
    </svg>
  );
  if (which === 2) return (
    <svg viewBox="0 0 1920 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 500 L0 320 L150 200 L320 280 L500 140 L680 240 L860 180 L1040 280 L1220 200 L1400 300 L1580 240 L1760 320 L1920 260 L1920 500 Z" fill="rgba(0,161,155,.13)"/>
      {/* snow caps */}
      <path d="M150 200 L210 240 L240 220 L260 230 L280 218 Z" fill="rgba(0,161,155,.25)"/>
      <path d="M500 140 L560 180 L595 165 L620 178 L640 168 Z" fill="rgba(0,161,155,.25)"/>
      <path d="M860 180 L910 215 L940 200 L965 215 L985 205 Z" fill="rgba(0,161,155,.25)"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 1920 360" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 360 L0 220 L140 140 L300 200 L480 100 L660 180 L840 130 L1020 200 L1200 150 L1380 220 L1560 170 L1740 240 L1920 200 L1920 360 Z" fill="rgba(0,161,155,.2)"/>
      <path d="M0 360 L0 290 L240 265 L500 285 L780 260 L1080 288 L1380 265 L1680 288 L1920 275 L1920 360 Z" fill="rgba(0,161,155,.12)"/>
    </svg>
  );
};

window.Logo = Logo;
window.MountainLayer = MountainLayer;
