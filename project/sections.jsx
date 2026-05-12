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

// ============== Animated counter ==============
function useCountUp(target, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(step);
        else setCount(target);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return [count, ref];
}

// ============== Animated stat cell ==============
function StatCell({ n, sup, label }) {
  const [count, ref] = useCountUp(n, 1800);
  return (
    <div className="cell in" ref={ref}>
      <div className="n">{count}<sup>{sup}</sup></div>
      <div className="l">{label}</div>
    </div>
  );
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
      <StatCell n={15} sup="+" label="Vehicle types"/>
      <StatCell n={40} sup="+" label="Experienced drivers"/>
      <StatCell n={17} sup="yrs" label="Kashmir route mastery"/>
      <StatCell n={24} sup="/7" label="Control room support"/>
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

  // staggered card visibility as they scroll into view
  useEffect(() => {
    const cards = trackRef.current?.querySelectorAll('.car-card');
    if (!cards) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(c => io.observe(c));
    return () => io.disconnect();
  }, [list]);

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

// ============== ROUTES (Google Maps Satellite) ==============
function RouteMapPreview({ route }) {
  // Build a Google Maps embed URL with satellite view and directions
  const waypointStr = route.waypoints
    .slice(1, -1)
    .map(w => `${w.lat},${w.lng}`)
    .join('|');
  
  const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${route.origin}&destination=${route.destination}&mode=driving&maptype=satellite${waypointStr ? `&waypoints=${waypointStr}` : ''}&zoom=${route.mapZoom}`;

  return (
    <div className="route-map-preview">
      <iframe
        src={embedUrl}
        className="route-map-iframe"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Route ${route.num}: ${route.from} to ${route.to}`}
      ></iframe>
      <div className="route-map-overlay">
        <span className="route-map-overlay-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 3l6 6-6 6M9 21l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span>View Full Map</span>
      </div>
    </div>
  );
}

function RouteMapModal({ route, onClose }) {
  const waypointStr = route.waypoints
    .slice(1, -1)
    .map(w => `${w.lat},${w.lng}`)
    .join('|');
  
  const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${route.origin}&destination=${route.destination}&mode=driving&maptype=satellite${waypointStr ? `&waypoints=${waypointStr}` : ''}&zoom=${route.mapZoom}`;

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="route-modal-overlay" onClick={onClose}>
      <div className="route-modal" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className="route-modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        {/* Header */}
        <div className="route-modal-header">
          <div className="eyebrow"><span className="dot"></span>ROUTE {route.num} · {route.tag}</div>
          <h3 className="route-modal-title">{route.from} → {route.to.split('·')[0].trim()}</h3>
          <div className="route-modal-meta">
            <span>{route.dist}</span>
            <span className="route-modal-sep">·</span>
            <span>{route.dur}</span>
          </div>
        </div>

        {/* Map */}
        <div className="route-modal-map">
          <iframe
            src={embedUrl}
            className="route-modal-iframe"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Full route: ${route.from} to ${route.to}`}
          ></iframe>
        </div>

        {/* Waypoints */}
        <div className="route-modal-waypoints">
          <div className="route-modal-wp-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="var(--teal)" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="var(--teal)" strokeWidth="2"/></svg>
            <span>Places along the way</span>
          </div>
          <div className="route-modal-wp-list">
            {route.waypoints.map((wp, i) => (
              <div className="route-modal-wp" key={i}>
                <div className="route-modal-wp-dot">
                  {i === 0 ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--teal)"><circle cx="12" cy="12" r="8"/></svg>
                  ) : i === route.waypoints.length - 1 ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="var(--teal)"/><circle cx="12" cy="10" r="3" fill="#fff"/></svg>
                  ) : (
                    <div className="route-modal-wp-num">{i}</div>
                  )}
                </div>
                {i < route.waypoints.length - 1 && <div className="route-modal-wp-line"></div>}
                <div className="route-modal-wp-info">
                  <b>{wp.name}</b>
                  <span>{wp.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open in Google Maps CTA */}
        <a
          href={`https://www.google.com/maps/dir/${route.waypoints.map(w => `${w.lat},${w.lng}`).join('/')}`}
          target="_blank"
          rel="noreferrer"
          className="cta-btn"
          style={{alignSelf:'center',marginTop:16}}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

function Routes(){
  useReveal();
  const [selectedRoute, setSelectedRoute] = useState(null);

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
            <div className="route-card reveal" key={r.num} onClick={() => setSelectedRoute(r)} style={{cursor:'pointer'}}>
              <div className="ribbon">{r.tag}</div>
              <div>
                <div className="num">ROUTE {r.num}</div>
                <div className="rname">
                  <span className="from">{r.from}</span>
                  <span className="arr">→</span>
                  <span className="to">{r.to}</span>
                </div>
              </div>
              <div className="map"><RouteMapPreview route={r}/></div>
              {/* Waypoint pills */}
              <div className="route-wp-pills">
                {r.waypoints.slice(0, 4).map((wp, i) => (
                  <span className="route-wp-pill" key={i}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="var(--teal)"><circle cx="12" cy="12" r="8"/></svg>
                    {wp.name}
                  </span>
                ))}
                {r.waypoints.length > 4 && <span className="route-wp-pill more">+{r.waypoints.length - 4} more</span>}
              </div>
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

      {/* Map Popup Modal */}
      {selectedRoute && <RouteMapModal route={selectedRoute} onClose={() => setSelectedRoute(null)} />}
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

// ============== DRIVERS (standalone section, removed from homepage) ==============
function DriverCard({ d, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="person reveal"
      style={{ transitionDelay: `${(index % 4) * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Driver photo */}
      <div className="driver-photo-wrap">
        {d.photo ? (
          <img
            src={d.photo}
            alt={d.name}
            className="driver-photo-img"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div className="driver-photo-placeholder" style={d.photo ? {display:'none'} : {}}>
          <svg viewBox="0 0 80 80" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="30" r="14" fill="rgba(0,161,155,.25)"/>
            <ellipse cx="40" cy="68" rx="22" ry="16" fill="rgba(0,161,155,.2)"/>
          </svg>
          <span className="driver-photo-ini">{d.ini}</span>
        </div>
        {/* Hover overlay with DL & contact */}
        <div className={`driver-hover-info ${hovered ? 'visible' : ''}`}>
          <div className="dhi-row">
            <span className="dhi-label">DL No.</span>
            <span className="dhi-value">{d.dl || '—'}</span>
          </div>
          <div className="dhi-row">
            <span className="dhi-label">Contact</span>
            <span className="dhi-value">{d.phone || '—'}</span>
          </div>
        </div>
      </div>
      <div className="name">{d.name}</div>
      <div className="role">{d.role}</div>
      <div className="skills">{d.skills.map(s => <span key={s}>{s}</span>)}</div>
      <div className="years"><span>Years driving</span><b>{d.years}</b></div>
    </div>
  );
}

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
          {IRHA.DRIVERS.map((d, i) => (
            <DriverCard key={d.name} d={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== TEAM SHOWCASE (interactive photo grid + name list) ==============
function TeamPhotoCard({ member, className, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={`team-photo-card ${className} ${isDimmed ? 'dimmed' : ''}`}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="team-photo-card-img"
          style={{
            filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)',
          }}
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
      ) : null}
      <div className="team-photo-card-fallback" style={member.photo ? {display:'none'} : {}}>
        <span className="team-photo-card-ini">{member.ini}</span>
      </div>
    </div>
  );
}

function TeamMemberRow({ member, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={`team-member-row ${isDimmed ? 'dimmed' : ''}`}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="team-member-row-top">
        <span className={`team-member-dot ${isActive ? 'active' : ''}`}></span>
        <span className={`team-member-name ${isActive ? 'active' : ''}`}>{member.name}</span>
      </div>
      <p className="team-member-role">{member.role}</p>
      {member.desc && (
        <p className={`team-member-desc ${isActive ? 'show' : ''}`}>{member.desc}</p>
      )}
    </div>
  );
}

function Team(){
  useReveal();
  const [hoveredId, setHoveredId] = useState(null);
  const [showDrivers, setShowDrivers] = useState(false);

  const members = IRHA.TEAM;
  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <section className="section" id="team" style={{background:'var(--sand-3)'}}>
      <div className="wrap">
        <div className="s-head reveal">
          <div>
            <div className="eyebrow"><span className="dot"></span>The Leadership</div>
            <h2 className="display s-title" style={{marginTop:16}}>Meet the team<br/><span className="accent">behind the wheel.</span></h2>
          </div>
          <p className="s-desc">From the founder's vision to everyday operations — the people who make every trip seamless.</p>
        </div>

        {/* Team Showcase: Photo Grid + Name List */}
        <div className="team-showcase reveal">
          {/* Left: photo grid */}
          <div className="team-photo-grid">
            {/* Column 1 */}
            <div className="team-photo-col">
              {col1.map((member) => (
                <TeamPhotoCard
                  key={member.id}
                  member={member}
                  className="team-photo-sm"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            {/* Column 2 — offset */}
            <div className="team-photo-col team-photo-col-offset">
              {col2.map((member) => (
                <TeamPhotoCard
                  key={member.id}
                  member={member}
                  className="team-photo-md"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            {/* Column 3 — slight offset */}
            <div className="team-photo-col team-photo-col-offset-sm">
              {col3.map((member) => (
                <TeamPhotoCard
                  key={member.id}
                  member={member}
                  className="team-photo-sm"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          </div>

          {/* Right: member name list */}
          <div className="team-name-list">
            {members.map((member) => (
              <TeamMemberRow
                key={member.id}
                member={member}
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            ))}
          </div>
        </div>

        {/* Meet the Drivers CTA */}
        <div className="team-drivers-cta reveal" style={{marginTop:56, textAlign:'center'}}>
          <button
            className="cta-btn"
            onClick={() => setShowDrivers(!showDrivers)}
            style={{margin:'0 auto'}}
          >
            {showDrivers ? 'Hide Drivers' : 'Meet Our Drivers'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{transform: showDrivers ? 'rotate(90deg)' : 'none', transition:'transform .3s'}}>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Expandable Drivers section */}
        {showDrivers && <Drivers />}
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
              <div style={{fontFamily:"'Helvetica Neue', Helvetica, Arial, sans-serif",fontSize:20,fontWeight:800,color:'#fff',letterSpacing:'.06em'}}>IRHA KARS</div>
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

// ============== SCROLL CAR ==============
function ScrollCar() {
  const carRef = useRef(null);
  const pathRef = useRef(null);

  const d = 'M 34 4 C 54 100, 14 200, 34 330 C 54 460, 14 560, 34 670 C 52 740, 22 770, 34 796';

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const totalLen = path.getTotalLength();
    let rafId;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.max(0, Math.min(window.scrollY / maxScroll, 1)) : 0;
        const len = progress * totalLen;
        const pt  = path.getPointAtLength(len);
        const pt2 = path.getPointAtLength(Math.min(len + 12, totalLen));
        const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI) + 90;
        if (carRef.current) {
          carRef.current.setAttribute('transform',
            `translate(${pt.x - 9},${pt.y - 15}) rotate(${angle},9,15)`);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div className="scroll-car-rail">
      <svg viewBox="0 0 68 800" preserveAspectRatio="none"
           xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        {/* Road base shadow */}
        <path d={d} fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="22" strokeLinecap="round"/>
        {/* Road surface */}
        <path d={d} fill="none" stroke="rgba(30,50,48,.18)" strokeWidth="18" strokeLinecap="round"/>
        {/* Road edge highlight */}
        <path d={d} fill="none" stroke="rgba(0,161,155,.22)" strokeWidth="18.5" strokeLinecap="round"/>
        {/* Centre dashes */}
        <path d={d} fill="none" stroke="rgba(0,161,155,.3)" strokeWidth="1.2"
              strokeDasharray="10 10" strokeLinecap="round"/>
        {/* Invisible reference path for getPointAtLength */}
        <path ref={pathRef} d={d} fill="none" stroke="none" strokeWidth="0"/>
        {/* Car — positioned by JS, drawn with front at y=0 (top) */}
        <g ref={carRef}>
          {/* Drop shadow */}
          <ellipse cx="10" cy="17" rx="8" ry="12" fill="rgba(0,0,0,.18)" transform="translate(0,3)"/>
          {/* Body */}
          <rect x="1" y="1" width="16" height="28" rx="5" fill="var(--teal)"/>
          {/* Roof highlight */}
          <rect x="4" y="5" width="10" height="9" rx="3" fill="rgba(255,255,255,.42)"/>
          {/* Rear screen */}
          <rect x="4" y="18" width="10" height="6" rx="2" fill="rgba(255,255,255,.28)"/>
          {/* Body sheen */}
          <rect x="1" y="1" width="5" height="28" rx="4" fill="rgba(255,255,255,.08)"/>
          {/* Wheels */}
          <ellipse cx="3"  cy="9"  rx="2.5" ry="3.2" fill="#0d2220"/>
          <ellipse cx="15" cy="9"  rx="2.5" ry="3.2" fill="#0d2220"/>
          <ellipse cx="3"  cy="21" rx="2.5" ry="3.2" fill="#0d2220"/>
          <ellipse cx="15" cy="21" rx="2.5" ry="3.2" fill="#0d2220"/>
          {/* Headlights */}
          <ellipse cx="5.5" cy="2"  rx="2"   ry="1"   fill="rgba(255,235,100,.95)"/>
          <ellipse cx="12.5" cy="2" rx="2"   ry="1"   fill="rgba(255,235,100,.95)"/>
          {/* Taillights */}
          <ellipse cx="5.5"  cy="28.5" rx="1.8" ry=".9" fill="rgba(255,50,50,.85)"/>
          <ellipse cx="12.5" cy="28.5" rx="1.8" ry=".9" fill="rgba(255,50,50,.85)"/>
        </g>
      </svg>
    </div>
  );
}

window.ScrollCar = ScrollCar;
window.Marquee = Marquee;
window.Stats = Stats;
window.Fleet = Fleet;
window.Routes = Routes;
window.Packages = Packages;
window.Drivers = Drivers;
window.Team = Team;
window.B2B = B2B;
window.Testimonials = Testimonials;
window.FAQ = FAQ;
window.Contact = Contact;
window.Footer = Footer;
