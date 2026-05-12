/* global React */
const { useEffect, useRef, useState } = React;

// ============== LOGO (from uploaded SVG — adapted for teal theme) ==============
const Logo = ({ size = 32, variant = 'default' }) => {
  // variant: 'default' (teal on transparent), 'light' (white), 'dark' (original red on dark)
  const s = size;
  const scale = s / 64;
  const primary = variant === 'light' ? '#fff' : variant === 'dark' ? '#cc1a1a' : 'var(--teal)';
  const inner = variant === 'light' ? 'rgba(255,255,255,.15)' : variant === 'dark' ? '#111' : 'var(--ink)';
  const accent = variant === 'light' ? 'rgba(255,255,255,.8)' : variant === 'dark' ? '#cc1a1a' : 'var(--teal-hi)';

  return (
    <svg viewBox="0 0 64 64" width={s} height={s} className="logo-mark" aria-label="Irha Kars">
      {/* Outer hexagon */}
      <polygon
        points="32,4 56,18 56,46 32,60 8,46 8,18"
        fill={primary}
        opacity=".9"
      />
      {/* Inner hexagon */}
      <polygon
        points="32,10 50,21 50,43 32,54 14,43 14,21"
        fill={inner}
      />
      {/* Middle hexagon ring */}
      <polygon
        points="32,15 44,23 44,39 32,47 20,39 20,23"
        fill={primary}
        opacity=".85"
      />
      {/* Inner-most hexagon */}
      <polygon
        points="32,20 39,25 39,37 32,42 25,37 25,25"
        fill={inner}
      />
      {/* Diagonal lines */}
      <line x1="8" y1="18" x2="14" y2="21" stroke={accent} strokeWidth="1.5"/>
      <line x1="56" y1="18" x2="50" y2="21" stroke={accent} strokeWidth="1.5"/>
      {/* Central diamond */}
      <path d="M 25,29 L 32,22 L 39,29 L 32,36 Z" fill={primary}/>
    </svg>
  );
};

// ============== FULL LOGO WITH TEXT ==============
const LogoFull = ({ height = 48, variant = 'default' }) => {
  const textColor = variant === 'light' ? '#fff' : 'var(--ink)';
  return (
    <div style={{display:'flex',alignItems:'center',gap:10}}>
      <Logo size={height} variant={variant}/>
      <div style={{display:'flex',flexDirection:'column',gap:0}}>
        <span style={{
          fontFamily:"'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: height * 0.42,
          fontWeight:900,
          color: textColor,
          letterSpacing:'.06em',
          lineHeight:1.1,
        }}>IRHA KARS</span>
      </div>
    </div>
  );
};

// ============== IRHA KARS BADGE LOGO (as used on the uploaded card) ==============
const LogoBadge = ({ size = 120, variant = 'default' }) => {
  const primary = variant === 'light' ? '#fff' : variant === 'original' ? '#cc1a1a' : 'var(--teal)';
  const bg = variant === 'light' ? 'rgba(255,255,255,.1)' : variant === 'original' ? '#111' : 'var(--ink)';
  const textCol = variant === 'light' ? '#fff' : '#fff';

  return (
    <div className="logo-badge" style={{
      width: size, height: size * 0.85,
      background: bg,
      borderRadius: 12,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: size * 0.04,
      padding: size * 0.1,
      border: `1.5px solid ${variant === 'light' ? 'rgba(255,255,255,.2)' : 'rgba(0,161,155,.3)'}`,
    }}>
      <Logo size={size * 0.4} variant={variant === 'original' ? 'dark' : variant}/>
      <span style={{
        fontFamily:"'Arial Black', 'Helvetica Neue', sans-serif",
        fontSize: size * 0.13,
        fontWeight:900,
        color: textCol,
        letterSpacing: size * 0.003 + 'em',
        textAlign:'center',
        lineHeight:1.2,
      }}>IRHA KARS</span>
      <div style={{width:'60%',height:1.5,background: primary, borderRadius:1}}></div>
    </div>
  );
};

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
window.LogoFull = LogoFull;
window.LogoBadge = LogoBadge;
window.MountainLayer = MountainLayer;
