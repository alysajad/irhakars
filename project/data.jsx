/* global React */
// ============== DATA ==============

// Unsplash stock photos mapped by vehicle type — swap with real Irha Kars photos when available
const CAR_IMGS = {
  hatch:   'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=640&h=420&auto=format&fit=crop&q=80',
  sedan:   'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=640&h=420&auto=format&fit=crop&q=80',
  suv:     'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=640&h=420&auto=format&fit=crop&q=80',
  suv2:    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=640&h=420&auto=format&fit=crop&q=80',
  luxury:  'https://images.unsplash.com/photo-1583121274602-3e2ac4f349f6?w=640&h=420&auto=format&fit=crop&q=80',
  tempo:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=420&auto=format&fit=crop&q=80',
  bus:     'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=640&h=420&auto=format&fit=crop&q=80',
  sleeper: 'https://images.unsplash.com/photo-1601629665203-f9f2b8d07d39?w=640&h=420&auto=format&fit=crop&q=80',
};

const CARS = [
  { name:'Swift',           cat:'Hatchback', type:'hatch',   seats:4,  bags:2,  ac:true, trans:'Manual',    price:1800, tag:'Compact',   img: CAR_IMGS.hatch   },
  { name:'Amaze',           cat:'Sedan',     type:'sedan',   seats:4,  bags:3,  ac:true, trans:'Manual',    price:2200, tag:'Sedan',     img: CAR_IMGS.sedan   },
  { name:'Galanza',         cat:'Sedan',     type:'sedan',   seats:4,  bags:3,  ac:true, trans:'Manual',    price:2400, tag:'Sedan',     img: CAR_IMGS.sedan   },
  { name:'Ertiga',          cat:'MUV',       type:'suv',     seats:6,  bags:4,  ac:true, trans:'Manual',    price:2800, tag:'Family',    img: CAR_IMGS.suv     },
  { name:'Urbinia',         cat:'MUV',       type:'suv',     seats:6,  bags:4,  ac:true, trans:'Auto',      price:3200, tag:'Family',    img: CAR_IMGS.suv     },
  { name:'Innova',          cat:'SUV',       type:'suv',     seats:7,  bags:5,  ac:true, trans:'Manual',    price:3600, tag:'Popular',   img: CAR_IMGS.suv2    },
  { name:'Innova Crysta',   cat:'SUV',       type:'suv',     seats:7,  bags:5,  ac:true, trans:'Auto',      price:4200, tag:'Premium',   img: CAR_IMGS.suv2    },
  { name:'Fortuner 4×4',   cat:'SUV',       type:'suv',     seats:7,  bags:5,  ac:true, trans:'Auto 4×4',  price:6500, tag:'Luxury',    img: CAR_IMGS.luxury  },
  { name:'12 Seater Tempo', cat:'Tempo',     type:'tempo',   seats:12, bags:10, ac:true, trans:'Manual',    price:4500, tag:'Group',     img: CAR_IMGS.tempo   },
  { name:'17 Seater Tempo', cat:'Tempo',     type:'tempo',   seats:17, bags:14, ac:true, trans:'Manual',    price:5800, tag:'Group',     img: CAR_IMGS.tempo   },
  { name:'20 Seater Tempo', cat:'Tempo',     type:'tempo',   seats:20, bags:18, ac:true, trans:'Manual',    price:6800, tag:'Group',     img: CAR_IMGS.tempo   },
  { name:'26 Seater Tempo', cat:'Tempo',     type:'tempo',   seats:26, bags:22, ac:true, trans:'Manual',    price:8500, tag:'Large',     img: CAR_IMGS.tempo   },
  { name:'27 Seater Bus',   cat:'Bus',       type:'bus',     seats:27, bags:25, ac:true, trans:'Manual',    price:9200, tag:'Coach',     img: CAR_IMGS.bus     },
  { name:'37 Seater Bus',   cat:'Bus',       type:'bus',     seats:37, bags:34, ac:true, trans:'Manual',    price:11500,tag:'Coach',     img: CAR_IMGS.bus     },
  { name:'Volvo Sleeper 9600', cat:'Sleeper', type:'sleeper',seats:36, bags:36, ac:true, trans:'Manual',    price:18500,tag:'Overnight', img: CAR_IMGS.sleeper },
];

const ROUTES = [
  { num:'01', from:'Srinagar', to:'Pahalgam · Gulmarg · Sonmarg', dist:'90–200 km', dur:'Day trip → 3 days', tag:'Within Kashmir', kind:'kashmir' },
  { num:'02', from:'Jammu',    to:'Patnitop · Vaishno Devi · Katra', dist:'60–250 km', dur:'1–2 days', tag:'Jammu region', kind:'jammu' },
  { num:'03', from:'Delhi',    to:'Srinagar via Kashmir Valley', dist:'~850 km', dur:'2 days · 1 night', tag:'Long haul', kind:'delhi' },
];

const PACKAGES = [
  {
    tier:'STARTER', name:'Day Trip', price:'1,800', sub:'per day, onwards',
    features:['Driver included','Up to 8 hrs / 80 km','Within Srinagar','Sedan or hatchback','Fuel as actuals','24×7 support'],
    cta:'Book a day trip', featured:false,
  },
  {
    tier:'MOST BOOKED', name:'Kashmir 4N5D', price:'14,800', sub:'package, twin sharing',
    features:['Srinagar · Gulmarg · Pahalgam','Innova / Crysta / Ertiga','Sightseeing + transfers','Experienced driver-guide','Hotel pickup & drop','Customisable itinerary'],
    cta:'Plan this trip', featured:true,
  },
  {
    tier:'GROUPS / B2B', name:'Tempo & Coach', price:'4,500', sub:'per day, fleet starts at',
    features:['12 / 17 / 20 / 26 seater','27 & 37 seater buses','Volvo sleeper for overnighters','Dedicated co-ordinator','Volume pricing','GST invoicing'],
    cta:'Request a quote', featured:false,
  },
];

const DRIVERS = [
  { name:'Showkat Ahmad', role:'Senior · Kashmir Valley',    years:18, skills:['Urdu','Hindi','English','Kashmiri'], ini:'SA' },
  { name:'Imtiyaz Bhat',  role:'Highway · Delhi route',      years:12, skills:['Hindi','English','Punjabi'],        ini:'IB' },
  { name:'Bilal Mir',     role:'Mountain · Sonmarg/Zojila',  years:15, skills:['Urdu','Hindi','Kashmiri'],          ini:'BM' },
  { name:'Tariq Wani',    role:'Tempo · 17/20 seater',       years:10, skills:['Hindi','Urdu','English'],           ini:'TW' },
  { name:'Javed Lone',    role:'Coach · Jammu corridor',     years:14, skills:['Hindi','Dogri','Urdu'],             ini:'JL' },
  { name:'Aamir Ganie',   role:'Sedan · City',               years:8,  skills:['Urdu','English'],                  ini:'AG' },
  { name:'Rouf Dar',      role:'Volvo Sleeper · Long haul',  years:16, skills:['Hindi','Punjabi','Urdu'],           ini:'RD' },
  { name:'Sajad Para',    role:'Fortuner 4×4 · Off-road',    years:11, skills:['Urdu','English','Hindi'],           ini:'SP' },
];

const TESTIMONIALS = [
  { quote:'Booked an Innova Crysta with Showkat for our 6-day Kashmir trip. The driver knew every shortcut, every viewpoint. Easily the smoothest part of the holiday.', who:'Anjali R.', city:'Mumbai → Srinagar', ini:'AR' },
  { quote:'We run a small tour operator out of Bangalore. Irha Kars handles every Kashmir handover for our groups — buses, tempos, sedans, paperwork. Zero drama in three seasons.', who:'Kiran Mehta', city:'Lotus Holidays · B2B', ini:'KM' },
  { quote:'Took the Volvo sleeper from Delhi up to Srinagar overnight. Genuinely comfortable, and the driver swap at Patnitop was on the dot. Will book again.', who:'Devansh Singh', city:'Delhi → Kashmir', ini:'DS' },
];

const FAQS = [
  { q:'Is the driver included in the rental price?', a:'Yes — every car, tempo, bus and sleeper comes with an experienced driver. We do not offer self-drive. Our drivers know the Kashmir, Jammu and Delhi-Srinagar corridors intimately.' },
  { q:'How does fuel pricing work?', a:'For day trips and packages, fuel is included up to the agreed kilometre limit. Beyond that, fuel is charged at actuals. For long routes (Delhi–Srinagar, Jammu, etc) we quote all-inclusive packages so there are no surprises.' },
  { q:'Can tour operators get volume pricing?', a:'Absolutely. We work with travel and tour companies across India who need reliable Kashmir handovers. Talk to our B2B desk for credit terms, GST invoicing and dedicated co-ordinators for your group movements.' },
  { q:'Do you cover routes outside Kashmir?', a:'Our core network is Kashmir-to-Kashmir, Jammu-to-Jammu, and Delhi-to-Kashmir. We also handle pan-India tourist transport on request — write to us with your route and dates and we will revert with a quote.' },
  { q:'How do I confirm a booking?', a:'Pick a car and date, click Book on WhatsApp and we will confirm availability within minutes. A small advance secures the vehicle; balance is settled at trip end. All bookings are documented with a digital receipt.' },
  { q:'What if my plans change mid-trip?', a:'Itineraries with us are flexible. Your driver is in constant touch with our control room — extend the trip, swap a stop, add a vehicle. We rework things on the road as long as the fleet is available.' },
];

window.IRHA = { CARS, ROUTES, PACKAGES, DRIVERS, TESTIMONIALS, FAQS };
