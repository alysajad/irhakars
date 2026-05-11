/* global React, IRHA, Logo, CarSVG, MountainLayer */
const { useEffect, useRef, useState } = React;

// ============== NAV ==============
function Nav(){
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive:true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="brand"><Logo size={32}/><span>IRHA KARS</span></a>
      <div className="links">
        <a href="#fleet">Fleet</a>
        <a href="#routes">Routes</a>
        <a href="#packages">Packages</a>
        <a href="#drivers">Drivers</a>
        <a href="#b2b">For Operators</a>
        <a href="#contact">Contact</a>
      </div>
      <a href="https://wa.me/917006709612?text=Hi%20Irha%20Kars%2C%20I%27d%20like%20to%20book%20a%20car." className="cta-btn" target="_blank" rel="noreferrer">
        <span>Book on WhatsApp</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
    </nav>
  );
}

// ============== HERO ==============
function Hero(){
  const carRef = useRef(null);
  const m1 = useRef(null), m2 = useRef(null), m3 = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    let rafId;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const intensity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tilt') || 1);
        const px = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--parallax') || 1);
        if (carRef.current) {
          const rot = Math.min(y * 0.12 * intensity, 60);
          const scale = 1 + Math.min(y * 0.0005, 0.18);
          const ty = y * 0.18 * px;
          carRef.current.style.transform = `translate(-50%,-50%) translateY(${ty}px) rotate(${rot}deg) scale(${scale})`;
        }
        if (m1.current) m1.current.style.transform = `translateY(${y * 0.10 * px}px)`;
        if (m2.current) m2.current.style.transform = `translateY(${y * 0.22 * px}px)`;
        if (m3.current) m3.current.style.transform = `translateY(${y * 0.32 * px}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  // booking widget state
  const [form, setForm] = useState({ pickup:'Srinagar', drop:'Pahalgam', date:'', pax:'4', car:'Innova' });
  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const book = (e) => {
    e.preventDefault();
    const msg = `Hi Irha Kars,%0AI%27d like to book a car.%0A%0APickup: ${encodeURIComponent(form.pickup)}%0ADrop: ${encodeURIComponent(form.drop)}%0ADate: ${encodeURIComponent(form.date || 'flexible')}%0APassengers: ${encodeURIComponent(form.pax)}%0APreferred car: ${encodeURIComponent(form.car)}`;
    window.open(`https://wa.me/917006709612?text=${msg}`, '_blank');
  };

  return (
    <section className="hero" id="home">
      <div ref={m1} className="mtn-layer mtn-1"><MountainLayer which={1}/></div>
      <div ref={m2} className="mtn-layer mtn-2"><MountainLayer which={2}/></div>

      <div className="hero-car" ref={carRef}>
        <svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroBody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e89761"/>
              <stop offset=".55" stopColor="#c87740"/>
              <stop offset="1" stopColor="#6b3a1e"/>
            </linearGradient>
            <linearGradient id="heroGlass" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#f5ead8" stopOpacity=".35"/>
              <stop offset="1" stopColor="#f5ead8" stopOpacity=".05"/>
            </linearGradient>
            <radialGradient id="heroShine" cx=".3" cy=".2" r=".7">
              <stop offset="0" stopColor="#fff" stopOpacity=".4"/>
              <stop offset="1" stopColor="#fff" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* shadow */}
          <ellipse cx="210" cy="180" rx="180" ry="10" fill="#000" opacity=".45"/>
          {/* body — large stylised SUV */}
          <path d="M30 145 L52 138 L80 85 Q108 70 170 66 Q260 64 330 72 Q372 80 392 96 L410 130 Q416 140 412 152 L30 152 Z" fill="url(#heroBody)"/>
          {/* glass */}
          <path d="M92 88 Q120 76 178 72 L178 122 L96 122 Z" fill="url(#heroGlass)"/>
          <path d="M188 72 Q280 72 340 78 Q360 84 372 96 L372 122 L188 122 Z" fill="url(#heroGlass)"/>
          <line x1="183" y1="72" x2="183" y2="122" stroke="#1d1218" strokeWidth="2.5" opacity=".6"/>
          <line x1="252" y1="72" x2="252" y2="122" stroke="#1d1218" strokeWidth="2.5" opacity=".6"/>
          {/* roof rails */}
          <rect x="100" y="64" width="240" height="3" fill="#1d1218" opacity=".5" rx="1.5"/>
          {/* shine */}
          <path d="M30 145 L52 138 L80 85 Q108 70 170 66 Q260 64 330 72 Q372 80 392 96 L410 130 Q416 140 412 152 L30 152 Z" fill="url(#heroShine)" opacity=".6"/>
          {/* wheels with arches */}
          <circle cx="110" cy="152" r="34" fill="#1d1218"/>
          <circle cx="110" cy="152" r="28" fill="#0a0508" stroke="#3a2730" strokeWidth="3"/>
          <circle cx="110" cy="152" r="14" fill="none" stroke="#c87740" strokeWidth="3"/>
          <circle cx="110" cy="152" r="4" fill="#c87740"/>
          <circle cx="340" cy="152" r="34" fill="#1d1218"/>
          <circle cx="340" cy="152" r="28" fill="#0a0508" stroke="#3a2730" strokeWidth="3"/>
          <circle cx="340" cy="152" r="14" fill="none" stroke="#c87740" strokeWidth="3"/>
          <circle cx="340" cy="152" r="4" fill="#c87740"/>
          {/* lights */}
          <rect x="385" y="126" width="22" height="6" rx="3" fill="#e89761"/>
          <rect x="34" y="126" width="22" height="6" rx="3" fill="#f5ead8" opacity=".85"/>
          {/* door handle */}
          <rect x="200" y="108" width="22" height="3" rx="1.5" fill="#1d1218" opacity=".5"/>
          <rect x="290" y="108" width="22" height="3" rx="1.5" fill="#1d1218" opacity=".5"/>
        </svg>
      </div>

      <div ref={m3} className="mtn-layer mtn-3"><MountainLayer which={3}/></div>

      <div className="stage" ref={stageRef}>
        <div className="hero-sub">
          <div className="eyebrow"><span className="dot"></span>SINCE 2009 · SRINAGAR, KASHMIR</div>
          <p style={{marginTop:18}}>All-India tourist transport. From a city sedan to a Volvo sleeper — every vehicle comes with an experienced Kashmir-route driver.</p>
        </div>

        <div className="hero-stats">
          <div className="row"><div><div className="n">15+</div><div className="l">Vehicle types</div></div></div>
          <div className="row"><div><div className="n">40<sup>+</sup></div><div className="l">Drivers on roll</div></div></div>
          <div className="row"><div><div className="n">17<sup>yrs</sup></div><div className="l">On Kashmir routes</div></div></div>
        </div>

        <h1 className="hero-headline display">
          DRIVE THE<br/>
          <span className="accent">VALLEY.</span><br/>
          <span className="outline">YOUR WAY.</span>
        </h1>
      </div>

      <form className="booking" onSubmit={book}>
        <div className="field"><label>Pickup</label><input value={form.pickup} onChange={handle('pickup')} placeholder="Srinagar"/></div>
        <div className="field"><label>Drop</label><input value={form.drop} onChange={handle('drop')} placeholder="Pahalgam"/></div>
        <div className="field"><label>Date</label><input type="date" value={form.date} onChange={handle('date')}/></div>
        <div className="field"><label>Pax</label>
          <select value={form.pax} onChange={handle('pax')}>
            {['1-2','3-4','5-7','8-12','13-17','18-26','27+'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div className="field"><label>Vehicle</label>
          <select value={form.car} onChange={handle('car')}>
            {IRHA.CARS.map(c => <option key={c.name}>{c.name}</option>)}
          </select>
        </div>
        <button type="submit" className="submit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Book on WhatsApp
        </button>
      </form>
    </section>
  );
}

window.Nav = Nav;
window.Hero = Hero;
