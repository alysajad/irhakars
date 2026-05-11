/* global React, ReactDOM, Nav, Hero, Marquee, Stats, Fleet, Routes, Packages, Drivers, B2B, Testimonials, FAQ, Contact, Footer, TweaksPanel, useTweaks, TweakSection, TweakSlider, TweakRadio */
const { useEffect } = React;

function App(){
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "intensity": 1,
    "parallax": 1,
    "mode": "balanced"
  }/*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    let i = t.intensity, p = t.parallax;
    if (t.mode === 'subtle')  { i = 0.3; p = 0.4; }
    if (t.mode === 'heavy')   { i = 1.5; p = 1.5; }
    document.documentElement.style.setProperty('--tilt', String(i));
    document.documentElement.style.setProperty('--parallax', String(p));
  }, [t]);

  return (
    <>
      <Nav/>
      <Hero/>
      <Marquee/>
      <Stats/>
      <Fleet/>
      <Routes/>
      <Packages/>
      <Drivers/>
      <B2B/>
      <Testimonials/>
      <FAQ/>
      <Contact/>
      <Footer/>

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
