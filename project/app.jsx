/* global React, ReactDOM, Nav, Hero, Marquee, Stats, Fleet, Routes, Packages, Drivers, Team, B2B, Testimonials, FAQ, Contact, Footer, ScrollCar, TweaksPanel, useTweaks, TweakSection, TweakSlider, TweakRadio, Logo, LogoFull, LogoBadge */
const { useEffect, useState, useRef } = React;

// ============== ANIMATED CAR SVG (Lottie Style) ==============
const TRAVEL_QUOTES = [
  { text: "Not all those who wander are lost.", author: "— J.R.R. Tolkien" },
  { text: "The world is a book. Those who do not travel read only one page.", author: "— Saint Augustine" },
  { text: "Travel is the only thing you buy that makes you richer.", author: "— Anonymous" },
  { text: "Life is short and the world is wide.", author: "— Simon Raven" },
  { text: "Kashmir — heaven on earth.", author: "— Irha Kars" },
];

function AnimatedCar() {
  return (
    <div style={{ position: 'relative', textAlign: 'center', lineHeight: 1 }}>
      {/* Company name on windshield glass */}
      <div style={{
        fontFamily: "'Nevera', 'Open Sans', sans-serif",
        fontSize: 13,
        letterSpacing: '0.22em',
        color: 'var(--teal)',
        marginBottom: 4,
        userSelect: 'none',
        animation: 'lottie-fade-in 1.2s ease forwards',
      }}>
        IRHA KARS
      </div>
      <svg viewBox="0 0 100 45" width="200" height="90" className="lottie-sedan">
        <g className="lottie-car-bounce">
          {/* Car Body */}
          <path d="M 12,32 L 8,24 Q 8,16 22,16 L 38,10 Q 55,6 70,16 L 88,24 Q 93,30 93,32 Z" fill="var(--teal)" stroke="var(--teal-deep)" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Windows */}
          <path d="M 28,17 L 42,12 L 52,12 L 52,22 L 20,22 Z" fill="var(--ink-2)" />
          <path d="M 57,12 L 68,17 L 78,22 L 57,22 Z" fill="var(--ink-2)" />
          {/* Headlight */}
          <ellipse cx="85" cy="25" rx="3" ry="1.5" fill="#FFFFFF" />
          {/* Taillight */}
          <rect x="8" y="22" width="3" height="5" fill="#E74C3C" rx="1" />
          {/* Wheels */}
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 22 32" to="360 22 32" dur="0.35s" repeatCount="indefinite" />
            <circle cx="22" cy="32" r="8" fill="var(--ink)" />
            <circle cx="22" cy="32" r="5" fill="var(--sand-2)" />
            <path d="M 22,27 L 22,37 M 17,32 L 27,32 M 18.5,28.5 L 25.5,35.5 M 25.5,28.5 L 18.5,35.5" stroke="var(--ink)" strokeWidth="1" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 72 32" to="360 72 32" dur="0.35s" repeatCount="indefinite" />
            <circle cx="72" cy="32" r="8" fill="var(--ink)" />
            <circle cx="72" cy="32" r="5" fill="var(--sand-2)" />
            <path d="M 72,27 L 72,37 M 67,32 L 77,32 M 68.5,28.5 L 75.5,35.5 M 75.5,28.5 L 68.5,35.5" stroke="var(--ink)" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const duration = 2600;
    const interval = 16;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 400);
      }
    }, interval);

    // Rotate quotes every 1.8s
    const quoteTimer = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIdx(i => (i + 1) % TRAVEL_QUOTES.length);
        setQuoteFade(true);
      }, 350);
    }, 1800);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const totalSegments = 25;
  const filledSegments = Math.floor((progress / 100) * totalSegments);
  const q = TRAVEL_QUOTES[quoteIdx];

  return (
    <div className={`lottie-loading-screen ${progress >= 98 ? 'fade-out' : ''}`}>
      <div className="lottie-loading-content">

        <div className="lottie-progress-container">
          {/* Progress Bar Background */}
          <div className="lottie-progress-bar-bg">
            <div className="lottie-progress-segments">
              {[...Array(totalSegments)].map((_, i) => (
                <div key={i} className={`lottie-segment ${i < filledSegments ? 'filled' : ''}`}></div>
              ))}
            </div>
          </div>

          {/* Knob and Car wrapper moving together */}
          <div className="lottie-progress-knob-wrapper" style={{ left: `calc(${progress}% - 12px)` }}>
            <div className="lottie-car-wrapper">
              <AnimatedCar />
            </div>
            <div className="lottie-progress-knob"></div>
          </div>
        </div>

        {/* Travel Quote */}
        <div className="lottie-quote-block" style={{ opacity: quoteFade ? 1 : 0, transition: 'opacity 0.35s ease' }}>
          <div className="lottie-quote-text">"{q.text}"</div>
          <div className="lottie-quote-author">{q.author}</div>
        </div>

        <div className="lottie-loading-text">Loading..</div>
      </div>
    </div>
  );
}



function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "intensity": 1,
    "parallax": 1,
    "mode": "balanced"
  }/*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let i = t.intensity, p = t.parallax;
    if (t.mode === 'subtle') { i = 0.3; p = 0.4; }
    if (t.mode === 'heavy') { i = 1.5; p = 1.5; }
    document.documentElement.style.setProperty('--tilt', String(i));
    document.documentElement.style.setProperty('--parallax', String(p));
  }, [t]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Fleet />
      <Routes />
      <Packages />
      <Team />
      <B2B />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />

      <ScrollCar />

      <TweaksPanel title="Tweaks">
        <TweakSection label="3D Intensity">
          <TweakRadio
            label="Preset"
            value={t.mode}
            onChange={(v) => setTweak('mode', v)}
            options={[
              { value: 'subtle', label: 'Subtle' },
              { value: 'balanced', label: 'Balanced' },
              { value: 'heavy', label: 'Heavy' },
            ]}
          />
          <TweakSlider label="Card tilt" value={t.intensity} onChange={(v) => setTweak({ intensity: v, mode: 'custom' })} min={0} max={2} step={0.05} />
          <TweakSlider label="Parallax speed" value={t.parallax} onChange={(v) => setTweak({ parallax: v, mode: 'custom' })} min={0} max={2} step={0.05} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

