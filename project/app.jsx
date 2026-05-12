/* global React, ReactDOM, Nav, Hero, Marquee, Stats, Fleet, Routes, Packages, Drivers, Team, B2B, Testimonials, FAQ, Contact, Footer, ScrollCar, TweaksPanel, useTweaks, TweakSection, TweakSlider, TweakRadio, Logo, LogoFull, LogoBadge */
const { useEffect, useState, useRef } = React;

// ============== ANIMATED CAR SVG (Hot Wheels style) ==============
function AnimatedCar({ progress }) {
  return (
    <svg viewBox="0 0 200 80" width="200" height="80" className="loading-hotwheel">
      {/* Shadow */}
      <ellipse cx="100" cy="72" rx="80" ry="6" fill="rgba(0,0,0,.12)">
        <animate attributeName="rx" values="70;80;70" dur="0.6s" repeatCount="indefinite"/>
      </ellipse>
      {/* Body */}
      <path d="M 30,50 L 40,30 L 70,20 L 140,20 L 165,30 L 175,50 Z" fill="var(--teal)" stroke="var(--teal-lo)" strokeWidth="1.5"/>
      {/* Roof / cabin */}
      <path d="M 58,30 L 68,14 L 120,14 L 135,30 Z" fill="var(--teal-deep)" opacity=".9"/>
      {/* Windshield */}
      <path d="M 62,29 L 70,16 L 95,16 L 95,29 Z" fill="rgba(200,240,238,.6)"/>
      {/* Rear window */}
      <path d="M 100,29 L 100,16 L 125,16 L 130,29 Z" fill="rgba(200,240,238,.45)"/>
      {/* Hood shine */}
      <path d="M 40,30 L 58,30 L 55,40 L 40,45 Z" fill="rgba(255,255,255,.2)"/>
      {/* Body line */}
      <line x1="35" y1="42" x2="170" y2="42" stroke="rgba(255,255,255,.25)" strokeWidth="1"/>
      {/* Front bumper */}
      <rect x="170" y="38" width="8" height="14" rx="3" fill="var(--teal-lo)"/>
      {/* Rear bumper */}
      <rect x="25" y="40" width="8" height="12" rx="3" fill="var(--teal-lo)"/>
      {/* Headlights */}
      <ellipse cx="176" cy="40" rx="3" ry="4" fill="rgba(255,235,100,.95)">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="0.4s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="176" cy="48" rx="2" ry="3" fill="rgba(255,200,50,.7)"/>
      {/* Taillights */}
      <ellipse cx="28" cy="42" rx="2" ry="3" fill="rgba(255,50,50,.9)"/>
      <ellipse cx="28" cy="48" rx="2" ry="3" fill="rgba(255,50,50,.7)"/>
      {/* Front wheel */}
      <g className="loading-wheel-spin">
        <circle cx="145" cy="55" r="13" fill="#1a2625"/>
        <circle cx="145" cy="55" r="10" fill="#2d3a39"/>
        <circle cx="145" cy="55" r="7" fill="#555" stroke="#777" strokeWidth="0.8"/>
        <circle cx="145" cy="55" r="3" fill="#888"/>
        {/* Spokes */}
        <line x1="145" y1="48" x2="145" y2="62" stroke="#666" strokeWidth="1"/>
        <line x1="138" y1="55" x2="152" y2="55" stroke="#666" strokeWidth="1"/>
        <line x1="140" y1="50" x2="150" y2="60" stroke="#666" strokeWidth="0.8"/>
        <line x1="150" y1="50" x2="140" y2="60" stroke="#666" strokeWidth="0.8"/>
      </g>
      {/* Rear wheel */}
      <g className="loading-wheel-spin">
        <circle cx="55" cy="55" r="13" fill="#1a2625"/>
        <circle cx="55" cy="55" r="10" fill="#2d3a39"/>
        <circle cx="55" cy="55" r="7" fill="#555" stroke="#777" strokeWidth="0.8"/>
        <circle cx="55" cy="55" r="3" fill="#888"/>
        <line x1="55" y1="48" x2="55" y2="62" stroke="#666" strokeWidth="1"/>
        <line x1="48" y1="55" x2="62" y2="55" stroke="#666" strokeWidth="1"/>
        <line x1="50" y1="50" x2="60" y2="60" stroke="#666" strokeWidth="0.8"/>
        <line x1="60" y1="50" x2="50" y2="60" stroke="#666" strokeWidth="0.8"/>
      </g>
      {/* Speed lines behind car */}
      {progress > 10 && (
        <g opacity={Math.min(progress / 50, 0.6)}>
          <line x1="5" y1="35" x2={25 - progress * 0.1} y2="35" stroke="var(--teal-hi)" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
          <line x1="0" y1="42" x2={20 - progress * 0.12} y2="42" stroke="var(--teal-hi)" strokeWidth="1" strokeLinecap="round" opacity=".3"/>
          <line x1="8" y1="50" x2={22 - progress * 0.08} y2="50" stroke="var(--teal-hi)" strokeWidth="1.5" strokeLinecap="round" opacity=".35"/>
        </g>
      )}
    </svg>
  );
}

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=logo, 1=car driving, 2=done

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Phase 0: logo reveal (0-20%)
    // Phase 1: car drives and reveals text (20-90%)
    // Phase 2: everything assembled (90-100%)
    const duration = 3500;
    const interval = 16;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 20) setPhase(0);
      else if (p < 90) setPhase(1);
      else setPhase(2);
      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 600);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const carX = Math.min(Math.max((progress - 15) / 70, 0), 1) * 100;
  const textReveal = Math.min(Math.max((progress - 20) / 60, 0), 1) * 100;

  return (
    <div className={`loading-screen ${progress >= 98 ? 'fade-out' : ''}`}>
      <div className="loading-content">

        {/* Phase 0+: Logo fades in */}
        <div className={`loading-logo-reveal ${phase >= 0 ? 'show' : ''}`}>
          <LogoBadge size={100} variant="default"/>
        </div>

        {/* Road + car animation */}
        <div className="loading-road-container">
          {/* Revealed text behind car */}
          <div className="loading-text-track">
            <div className="loading-text-mask" style={{ width: `${textReveal}%` }}>
              <h1 className="loading-text">IRHA KARS</h1>
            </div>
          </div>

          {/* Road surface */}
          <div className="loading-road">
            <div className="loading-road-line"></div>
          </div>

          {/* Animated car driving */}
          <div className="loading-car-sprite" style={{ left: `${carX}%` }}>
            <div className={`loading-car-bounce ${phase === 1 ? 'driving' : ''}`}>
              <AnimatedCar progress={progress}/>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className={`loading-tagline ${phase >= 1 ? 'show' : ''}`}>
          <span className="loading-tagline-line"></span>
          <p>"The journey matters as much as the destination."</p>
          <span className="loading-tagline-sub">Your premium transport partner in Kashmir</span>
        </div>

        {/* Progress indicator */}
        <div className="loading-progress-bar">
          <div className="loading-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}


function App(){
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "intensity": 1,
    "parallax": 1,
    "mode": "balanced"
  }/*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let i = t.intensity, p = t.parallax;
    if (t.mode === 'subtle')  { i = 0.3; p = 0.4; }
    if (t.mode === 'heavy')   { i = 1.5; p = 1.5; }
    document.documentElement.style.setProperty('--tilt', String(i));
    document.documentElement.style.setProperty('--parallax', String(p));
  }, [t]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <Nav/>
      <Hero/>
      <Marquee/>
      <Stats/>
      <Fleet/>
      <Routes/>
      <Packages/>
      <Team/>
      <B2B/>
      <Testimonials/>
      <FAQ/>
      <Contact/>
      <Footer/>

      <ScrollCar/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="3D Intensity">
          <TweakRadio
            label="Preset"
            value={t.mode}
            onChange={(v) => setTweak('mode', v)}
            options={[
              { value:'subtle',   label:'Subtle'   },
              { value:'balanced', label:'Balanced' },
              { value:'heavy',    label:'Heavy'    },
            ]}
          />
          <TweakSlider label="Card tilt"      value={t.intensity} onChange={(v) => setTweak({ intensity:v, mode:'custom' })} min={0} max={2} step={0.05}/>
          <TweakSlider label="Parallax speed" value={t.parallax}  onChange={(v) => setTweak({ parallax:v,  mode:'custom' })} min={0} max={2} step={0.05}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
