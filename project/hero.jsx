/* global React, IRHA, Logo, MountainLayer */
const { useEffect, useRef, useState } = React;

// ============== NAV ==============
function Nav(){
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive:true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="brand">
        <Logo size={30}/>
        <span>IRHA KARS</span>
      </a>
      <div className="links">
        <a href="#fleet">Fleet</a>
        <a href="#routes">Routes</a>
        <a href="#packages">Packages</a>
        <a href="#drivers">Drivers</a>
        <a href="#b2b">For Operators</a>
        <a href="#contact">Contact</a>
      </div>
      <a
        href="https://wa.me/917006709612?text=Hi%20Irha%20Kars%2C%20I%27d%20like%20to%20book%20a%20car."
        className="cta-btn"
        target="_blank" rel="noreferrer"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Book on WhatsApp
      </a>
    </nav>
  );
}

// ============== HERO ==============
function Hero(){
  const m1 = useRef(null), m2 = useRef(null), m3 = useRef(null);

  useEffect(() => {
    let rafId;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const px = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--parallax') || 1);
        if (m1.current) m1.current.style.transform = `translateY(${y * 0.08 * px}px)`;
        if (m2.current) m2.current.style.transform = `translateY(${y * 0.18 * px}px)`;
        if (m3.current) m3.current.style.transform = `translateY(${y * 0.28 * px}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const [form, setForm] = useState({ pickup:'Srinagar', drop:'Pahalgam', date:'', pax:'3-4', car:'Innova' });
  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const book = (e) => {
    e.preventDefault();
    const msg = `Hi Irha Kars,%0AI%27d like to book a car.%0A%0APickup: ${encodeURIComponent(form.pickup)}%0ADrop: ${encodeURIComponent(form.drop)}%0ADate: ${encodeURIComponent(form.date || 'flexible')}%0APassengers: ${encodeURIComponent(form.pax)}%0APreferred car: ${encodeURIComponent(form.car)}`;
    window.open(`https://wa.me/917006709612?text=${msg}`, '_blank');
  };

  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div className="hero-inner">
          {/* LEFT: content */}
          <div className="hero-content">
            <div className="hero-eyebrow eyebrow">
              <span className="dot"></span>SINCE 2009 · SRINAGAR, KASHMIR
            </div>

            <h1 className="hero-headline display">
              <span className="line">Drive the</span>
              <span className="line accent">Valley.</span>
              <span className="line">Your way.</span>
            </h1>

            <p className="hero-sub">
              All-India tourist transport from Srinagar. Sedans, SUVs, tempos, buses and Volvo sleepers — every vehicle with an experienced Kashmir-route driver.
            </p>

            <div className="hero-cta">
              <a
                href="https://wa.me/917006709612?text=Hi%20Irha%20Kars%2C%20I%27d%20like%20to%20book%20a%20car."
                className="cta-btn"
                target="_blank" rel="noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Book on WhatsApp
              </a>
              <a href="#fleet" className="cta-btn ghost">Browse Fleet</a>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="n">15<sup>+</sup></div>
                <div className="l">Vehicle types</div>
              </div>
              <div className="stat">
                <div className="n">40<sup>+</sup></div>
                <div className="l">Drivers on roll</div>
              </div>
              <div className="stat">
                <div className="n">17<sup>yrs</sup></div>
                <div className="l">Kashmir routes</div>
              </div>
            </div>
          </div>

          {/* RIGHT: hero car image */}
          <div className="hero-visual">
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1583121274602-3e2ac4f349f6?w=900&h=600&auto=format&fit=crop&q=80"
                alt="Premium SUV on Kashmir mountain road"
                loading="eager"
              />
              <div className="hero-img-badge">
                <div className="badge-n">₹1,800</div>
                <div className="badge-l">Starting per day</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mountain parallax layers at bottom */}
      <div ref={m1} className="mtn-layer mtn-1"><MountainLayer which={1}/></div>
      <div ref={m2} className="mtn-layer mtn-2"><MountainLayer which={2}/></div>
      <div ref={m3} className="mtn-layer mtn-3"><MountainLayer which={3}/></div>

      {/* Booking widget */}
      <form className="booking" onSubmit={book}>
        <div className="field">
          <label>Pickup</label>
          <input value={form.pickup} onChange={handle('pickup')} placeholder="Srinagar"/>
        </div>
        <div className="field">
          <label>Drop</label>
          <input value={form.drop} onChange={handle('drop')} placeholder="Pahalgam"/>
        </div>
        <div className="field">
          <label>Date</label>
          <input type="date" value={form.date} onChange={handle('date')}/>
        </div>
        <div className="field">
          <label>Passengers</label>
          <select value={form.pax} onChange={handle('pax')}>
            {['1-2','3-4','5-7','8-12','13-17','18-26','27+'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Vehicle</label>
          <select value={form.car} onChange={handle('car')}>
            {IRHA.CARS.map(c => <option key={c.name}>{c.name}</option>)}
          </select>
        </div>
        <button type="submit" className="submit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Book via WhatsApp
        </button>
      </form>
    </section>
  );
}

window.Nav = Nav;
window.Hero = Hero;
