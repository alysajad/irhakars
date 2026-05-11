/* global React, IRHA, Logo */
const { useEffect, useRef, useState, useMemo, useCallback } = React;

// ============== Reveal-on-scroll helper ==============
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// ============== WA icon ==============
const WaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// ============== MARQUEE ==============
function Marquee(){
  const items = ['Srinagar','Pahalgam','Gulmarg','Sonmarg','Jammu','Patnitop','Vaishno Devi','Delhi','Katra','Leh–Ladakh','Doodhpathri','Yusmarg'];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((it, i) => (
          <div className="marquee-item" key={i}>
            <span className="star">✦</span><span>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== STATS ==============
function Stats(){
  return (
    <section className="stats-strip">
      <div className="cell"><div className="n">15<sup>+</sup></div><div className="l">Vehicle types</div></div>
      <div className="cell"><div className="n">40<sup>+</sup></div><div className="l">Experienced drivers</div></div>
      <div className="cell"><div className="n">17<sup>yrs</sup></div><div className="l">Kashmir route mastery</div></div>
      <div className="cell"><div className="n">24<sup>/7</sup></div><div className="l">Control room support</div></div>
    </section>
  );
}

// ============== FLEET (horizontal scroll showcase) ==============
function CarCard({ c }){
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const intensity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tilt') || 1);
    const mx = (e.clientX - r.left) / r.width;
    const my = (e.clientY - r.top) / r.height;
    const rx = (0.5 - my) * 8 * intensity;
    const ry = (mx - 0.5) * 10 * intensity;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.boxShadow = '0 20px 50px -15px rgba(0,161,155,.22), 0 8px 24px -6px rgba(0,0,0,.1)';
    el.style.borderColor = 'var(--teal)';
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = '';
      ref.current.style.boxShadow = '';
      ref.current.style.borderColor = '';
    }
  }, []);

  const book = () => {
    const msg = `Hi Irha Kars,%0AI%27d like to book a ${encodeURIComponent(c.name)}.%0APlease share availability and tariff.`;
    window.open(`https://wa.me/917006709612?text=${msg}`, '_blank');
  };

  return (
    <div ref={ref} className="car-card" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="car-img-wrap">
        <img
          className="car-img"
          src={c.img}
          alt={c.name}
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="car-img-tag">{c.tag}</div>
      </div>
      <div className="card-body">
        <div>
          <div className="car-cat">{c.cat}</div>
          <div className="car-name">{c.name}</div>
        </div>
        <div className="car-specs">
          <div className="spec"><b>{c.seats}</b>Seats</div>
          <div className="spec"><b>{c.bags}</b>Bags</div>
          <div className="spec"><b>{c.trans}</b>Trans.</div>
          <div className="spec"><b>{c.ac ? 'AC' : '—'}</b>Climate</div>
        </div>
        <div className="car-footer">
          <div className="car-price">₹{c.price.toLocaleString('en-IN')}<small>/day</small></div>
          <button className="car-book-btn" onClick={book}>
            <WaIcon/> Book
          </button>
        </div>
      </div>
    </div>
  );
}

function Fleet(){
  useReveal();
  const trackRef = useRef(null);

  const cats = useMemo(() => {
    const map = new Map();
    map.set('All', IRHA.CARS.length);
    for (const c of IRHA.CARS) map.set(c.cat, (map.get(c.cat) || 0) + 1);
    return [...map.entries()];
  }, []);

  const [active, setActive] = useState('All');
  const list = active === 'All' ? IRHA.CARS : IRHA.CARS.filter(c => c.cat === active);

  const scroll = (dir) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  // drag-to-scroll
  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const md = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const ml = () => { isDown = false; };
    const mm = (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; el.scrollLeft = scrollLeft - (x - startX) * 1.2; };
    el.addEventListener('mousedown', md);
    el.addEventListener('mouseleave', ml);
    el.addEventListener('mouseup', ml);
    el.addEventListener('mousemove', mm);
    return () => { el.removeEventListener('mousedown', md); el.removeEventListener('mouseleave', ml); el.removeEventListener('mouseup', ml); el.removeEventListener('mousemove', mm); };
  }, []);

  return (
    <section className="section" id="fleet" style={{background:'var(--sand-3)'}}>
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>The Fleet</div>
            <h2 className="display s-title" style={{marginTop:16}}>Fifteen vehicles.<br/><span className="accent">One promise.</span></h2>
          </div>
          <p className="s-desc">From a Swift for two through to a 37-seater coach and a Volvo sleeper — pick the format that fits your trip.</p>
        </div>

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12}}>
          <div className="filter-row reveal" style={{margin:0}}>
            {cats.map(([cat, n]) => (
              <button key={cat} className={`chip ${active === cat ? 'active' : ''}`} onClick={() => { setActive(cat); if (trackRef.current) trackRef.current.scrollLeft = 0; }}>
                {cat}<span className="count">{n}</span>
              </button>
            ))}
          </div>
          <div className="fleet-nav">
            <button className="fleet-nav-btn" onClick={() => scroll(-1)} aria-label="Scroll left">←</button>
            <button className="fleet-nav-btn" onClick={() => scroll(1)} aria-label="Scroll right">→</button>
          </div>
        </div>

        <div ref={trackRef} className="fleet-track">
          {list.map(c => <CarCard key={c.name} c={c}/>)}
        </div>

        <p style={{textAlign:'center', fontSize:13, color:'var(--muted)', marginTop:8}}>
          Drag or use arrows to explore · Click any card to book on WhatsApp
        </p>
      </div>
    </section>
  );
}

// ============== ROUTES ==============
function RouteMap({ kind }){
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const path = el.querySelector('path.route');
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          path.style.transition = 'stroke-dashoffset 2.2s ease-out';
          path.style.strokeDashoffset = '0';
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const paths = {
    kashmir: 'M 30 160 Q 80 100 130 130 T 220 90 T 310 130',
    jammu:   'M 30 180 Q 80 90 140 110 T 230 150 T 310 90',
    delhi:   'M 30 200 Q 80 180 110 150 T 180 80 T 250 100 T 310 40',
  };
  const endY = { kashmir: 130, jammu: 90, delhi: 40 };
  const startY = { kashmir: 160, jammu: 180, delhi: 200 };
  return (
    <svg ref={ref} viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" style={{width:'100%'}}>
      <defs>
        <linearGradient id={`rg-${kind}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#33b8b3"/>
          <stop offset="1" stopColor="#00a19b"/>
        </linearGradient>
      </defs>
      {/* subtle mountain silhouettes */}
      <path d="M0 200 L40 160 L80 180 L120 140 L160 170 L200 130 L240 160 L280 120 L320 155 L340 135 L340 220 L0 220 Z" fill="rgba(0,161,155,.08)"/>
      <path d="M0 220 L0 210 L60 200 L120 210 L200 195 L280 208 L340 198 L340 220 Z" fill="rgba(0,161,155,.05)"/>
      {/* route path */}
      <path className="route" d={paths[kind]} fill="none" stroke={`url(#rg-${kind})`} strokeWidth="3" strokeLinecap="round"/>
      {/* endpoint markers */}
      <circle cx="30" cy={startY[kind]} r="6" fill="var(--ink)"/>
      <circle cx="30" cy={startY[kind]} r="12" fill="var(--ink)" opacity=".12"/>
      <circle cx="310" cy={endY[kind]} r="6" fill="var(--teal)"/>
      <circle cx="310" cy={endY[kind]} r="12" fill="var(--teal)" opacity=".2"/>
    </svg>
  );
}

function Routes(){
  useReveal();
  return (
    <section className="section" id="routes">
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>Where we run</div>
            <h2 className="display s-title" style={{marginTop:16}}>Three corridors.<br/><span className="accent">All seasons.</span></h2>
          </div>
          <p className="s-desc">Kashmir to Kashmir. Jammu to Jammu. Delhi to Srinagar. Routes we drive in our sleep — quoted all-inclusive so you know the cost upfront.</p>
        </div>
        <div className="routes">
          {IRHA.ROUTES.map(r => (
            <div className="route-card reveal" key={r.num}>
              <div className="ribbon">{r.tag}</div>
              <div>
                <div className="num">ROUTE {r.num}</div>
                <div className="rname">
                  <span className="from">{r.from}</span>
                  <span className="arr">→</span>
                  <span className="to">{r.to}</span>
                </div>
              </div>
              <div className="map"><RouteMap kind={r.kind}/></div>
              <div className="rinfo">
                <div>
                  <span style={{fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--muted)',fontWeight:600}}>Distance</span>
                  <b>{r.dist}</b>
                </div>
                <div style={{textAlign:'right'}}>
                  <span style={{fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--muted)',fontWeight:600}}>Duration</span>
                  <b>{r.dur}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== PACKAGES ==============
function Packages(){
  useReveal();
  const book = (p) => {
    const msg = `Hi Irha Kars,%0AI%27m interested in the ${encodeURIComponent(p.name)} package.%0APlease share details.`;
    window.open(`https://wa.me/917006709612?text=${msg}`, '_blank');
  };
  return (
    <section className="section" id="packages" style={{background:'var(--sand-2)'}}>
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>Packages &amp; Pricing</div>
            <h2 className="display s-title" style={{marginTop:16}}>Day trips,<br/>full holidays,<br/><span className="accent">B2B fleets.</span></h2>
          </div>
          <p className="s-desc">Transparent rates that include the driver. Customise any package — extend a day, swap a vehicle, add a stop.</p>
        </div>
        <div className="pkg-grid">
          {IRHA.PACKAGES.map(p => (
            <div className={`pkg reveal ${p.featured ? 'featured' : ''}`} key={p.name}>
              <div className="tier">{p.tier}</div>
              <div className="pkg-name">{p.name}</div>
              <div className="pkg-price">₹{p.price}<small>{p.sub}</small></div>
              <ul className="pkg-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button
                className={`cta-btn pick ${p.featured ? '' : 'ghost'}`}
                style={p.featured ? {marginTop:'auto'} : {marginTop:'auto'}}
                onClick={() => book(p)}
              >
                {p.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== DRIVERS ==============
function Drivers(){
  useReveal();
  return (
    <section className="section" id="drivers">
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>The People Behind the Wheel</div>
            <h2 className="display s-title" style={{marginTop:16}}>Forty drivers.<br/><span className="accent">Every road learned by heart.</span></h2>
          </div>
          <p className="s-desc">Most Kashmir tour problems are driver problems. Ours are on payroll, trained on every corridor, fluent in the languages your guests speak.</p>
        </div>

        <div className="drivers-hero">
          <div className="driver-feature reveal">
            <div className="eyebrow"><span className="dot"></span>FEATURED DRIVER · KASHMIR SENIOR</div>
            <div className="quote">"I have driven the Pahalgam road since 2007. There isn't a viewpoint, a tea stall, or a snow-closure detour I don't know."</div>
            <div className="who">
              <div className="avatar">SA</div>
              <div className="meta">
                <b>Showkat Ahmad</b>
                <span>18 YEARS · URDU / HINDI / ENGLISH / KASHMIRI</span>
              </div>
            </div>
          </div>
          <div className="driver-stats reveal">
            <div className="driver-stat">
              <div className="n">40<sup>+</sup></div>
              <div className="l">Drivers on roll</div>
            </div>
            <div className="driver-stat">
              <div className="n">12<sup>yrs</sup></div>
              <div className="l">Avg. road experience</div>
            </div>
            <div className="driver-stat">
              <div className="n">7</div>
              <div className="l">Languages spoken</div>
            </div>
            <div className="driver-stat">
              <div className="n">0</div>
              <div className="l">Incidents last season</div>
            </div>
          </div>
        </div>

        <div className="roster">
          {IRHA.DRIVERS.map(d => (
            <div className="person reveal" key={d.name}>
              <div className="ava">{d.ini}</div>
              <div className="name">{d.name}</div>
              <div className="role">{d.role}</div>
              <div className="skills">{d.skills.map(s => <span key={s}>{s}</span>)}</div>
              <div className="years"><span>Years driving</span><b>{d.years}</b></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== B2B ==============
function B2B(){
  useReveal();
  return (
    <section className="section" id="b2b" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="b2b reveal">
          <div className="left">
            <div className="eyebrow"><span className="dot"></span>For Tour &amp; Travel Operators</div>
            <h3 style={{marginTop:20}}>The Kashmir leg of <span className="accent">your itinerary,</span> handled.</h3>
            <p>We are the silent fleet behind dozens of travel agencies running groups into Kashmir. White-label transport, pan-India billing, dedicated co-ordinator.</p>
            <ul className="bullets">
              <li>Fleet of 15+ vehicles, scaled per group</li>
              <li>Driver pool dedicated to your operator</li>
              <li>GST invoicing &amp; monthly credit terms</li>
              <li>Itinerary co-design with your team</li>
              <li>Real-time location of every vehicle</li>
              <li>Multi-vehicle convoys handled</li>
            </ul>
            <a
              href="https://wa.me/917006709612?text=Hi%20Irha%20Kars%2C%20I%20represent%20a%20tour%20operator%20and%20want%20to%20discuss%20a%20fleet%20arrangement."
              className="cta-btn"
              target="_blank" rel="noreferrer"
            >
              Open a B2B account
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="right">
            <svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:500,opacity:.85}}>
              <defs>
                <linearGradient id="b2bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(255,255,255,.2)"/>
                  <stop offset="1" stopColor="rgba(255,255,255,.05)"/>
                </linearGradient>
              </defs>
              <g transform="translate(20,215)">
                <rect x="0" y="0" width="380" height="56" rx="12" fill="url(#b2bg)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
                <text x="20" y="36" fontFamily="DM Sans, sans-serif" fontSize="18" fill="#fff" fontWeight="600">27-SEATER · 37-SEATER · VOLVO</text>
              </g>
              <g transform="translate(50,148)">
                <rect x="0" y="0" width="320" height="52" rx="12" fill="url(#b2bg)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
                <text x="18" y="33" fontFamily="DM Sans, sans-serif" fontSize="17" fill="#fff" fontWeight="600">TEMPO 12 · 17 · 20 · 26</text>
              </g>
              <g transform="translate(80,90)">
                <rect x="0" y="0" width="260" height="48" rx="12" fill="url(#b2bg)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
                <text x="18" y="30" fontFamily="DM Sans, sans-serif" fontSize="16" fill="#fff" fontWeight="600">INNOVA · CRYSTA · ERTIGA</text>
              </g>
              <g transform="translate(110,40)">
                <rect x="0" y="0" width="200" height="40" rx="10" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
                <text x="18" y="26" fontFamily="DM Sans, sans-serif" fontSize="14" fill="#fff" fontWeight="700">SWIFT · AMAZE · SEDAN</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== TESTIMONIALS ==============
function Testimonials(){
  useReveal();
  return (
    <section className="section" id="testimonials" style={{background:'var(--sand-2)'}}>
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>Travellers Say</div>
            <h2 className="display s-title" style={{marginTop:16}}>Earned on<br/><span className="accent">every road.</span></h2>
          </div>
        </div>
        <div className="testimonials">
          {IRHA.TESTIMONIALS.map((t, i) => (
            <div className="t-card reveal" key={i}>
              <div className="stars">★★★★★</div>
              <div className="tquote">"{t.quote}"</div>
              <div className="twho">
                <div className="tava">{t.ini}</div>
                <div><b>{t.who}</b><span>{t.city}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== FAQ ==============
function FAQ(){
  useReveal();
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="s-head reveal" style={{justifyContent:'center',textAlign:'center'}}>
          <div style={{margin:'0 auto'}}>
            <div className="eyebrow" style={{textAlign:'center'}}><span className="dot"></span>FAQ</div>
            <h2 className="display s-title" style={{marginTop:16,textAlign:'center'}}>Questions,<br/><span className="accent">answered.</span></h2>
          </div>
        </div>
        <div className="faq">
          {IRHA.FAQS.map((f, i) => (
            <div key={i} className={`faq-item reveal ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="fq">
                <h4>{f.q}</h4>
                <div className="sign">+</div>
              </div>
              <div className="fa"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== CONTACT ==============
function Contact(){
  useReveal();
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact reveal">
          <div>
            <div className="eyebrow" style={{color:'rgba(255,255,255,.75)'}}><span className="dot" style={{background:'rgba(255,255,255,.75)'}}></span>Talk to us</div>
            <h3 style={{marginTop:18}}>Pick a car.<br/>We'll pick you up.</h3>
            <p className="lead">WhatsApp is fastest — share your dates, route and group size and we'll revert with availability and a tariff in minutes.</p>
            <div className="actions">
              <a className="btn wa" href="https://wa.me/917006709612?text=Hi%20Irha%20Kars" target="_blank" rel="noreferrer">
                <WaIcon/> WhatsApp · 7006 709 612
              </a>
              <a className="btn" href="tel:+917006709612">Call now</a>
              <a className="btn" href="mailto:irhakars72@gmail.com">Email us</a>
            </div>
          </div>
          <div className="info">
            <a className="crow" href="tel:+917006709612">
              <div className="cl">Primary</div>
              <div className="cv">7006 709 612</div>
            </a>
            <a className="crow" href="tel:+916005899985">
              <div className="cl">Alternate</div>
              <div className="cv">6005 899 985</div>
            </a>
            <a className="crow" href="mailto:irhakars72@gmail.com">
              <div className="cl">Email</div>
              <div className="cv" style={{fontSize:18}}>irhakars72@gmail.com</div>
            </a>
            <div className="crow">
              <div className="cl">Address</div>
              <div className="cv" style={{fontSize:18,lineHeight:1.3}}>Babdam, Srinagar,<br/>Kashmir 190001</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== FOOTER ==============
function Footer(){
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <Logo size={34}/>
              <div style={{fontFamily:"'Recoleta',serif",fontSize:20,fontWeight:700,color:'#fff',letterSpacing:'.04em'}}>IRHA KARS</div>
            </div>
            <p>All-India tourist transport. Sedans, SUVs, tempos, buses and Volvo sleepers — every vehicle with a driver who knows the road.</p>
            <p style={{color:'rgba(255,255,255,.35)',fontSize:13}}>Babdam, Srinagar, Kashmir 190001 · www.irhakars.in</p>
          </div>
          <div>
            <h5>Fleet</h5>
            <ul>
              <li><a href="#fleet">Sedans &amp; Hatchbacks</a></li>
              <li><a href="#fleet">SUVs &amp; MUVs</a></li>
              <li><a href="#fleet">Tempos (12–26 seater)</a></li>
              <li><a href="#fleet">Buses (27 &amp; 37 seater)</a></li>
              <li><a href="#fleet">Volvo Sleeper</a></li>
            </ul>
          </div>
          <div>
            <h5>Routes</h5>
            <ul>
              <li><a href="#routes">Srinagar local</a></li>
              <li><a href="#routes">Kashmir valley</a></li>
              <li><a href="#routes">Jammu corridor</a></li>
              <li><a href="#routes">Delhi → Srinagar</a></li>
              <li><a href="#routes">Pan-India on request</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="tel:+917006709612">+91 7006 709 612</a></li>
              <li><a href="tel:+916005899985">+91 6005 899 985</a></li>
              <li><a href="mailto:irhakars72@gmail.com">irhakars72@gmail.com</a></li>
              <li><a href="https://wa.me/917006709612" target="_blank" rel="noreferrer">WhatsApp us</a></li>
              <li><a href="https://www.irhakars.in" target="_blank" rel="noreferrer">www.irhakars.in</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <div>© 2026 Irha Kars · All rights reserved</div>
          <div>Tourist transport from Srinagar, Kashmir</div>
        </div>
      </div>
    </footer>
  );
}

window.Marquee = Marquee;
window.Stats = Stats;
window.Fleet = Fleet;
window.Routes = Routes;
window.Packages = Packages;
window.Drivers = Drivers;
window.B2B = B2B;
window.Testimonials = Testimonials;
window.FAQ = FAQ;
window.Contact = Contact;
window.Footer = Footer;
