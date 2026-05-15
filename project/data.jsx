/* global React */
// ============== DATA ==============

// Vehicle images — local generated images
const CARS = [
  {
    name: 'Swift', cat: 'Hatchback', type: 'hatch', seats: 4, bags: 2, ac: true, trans: 'Manual', price: 2000, tag: 'Compact',
    img: 'cars/swift.png'
  },
  {
    name: 'Amaze', cat: 'Sedan', type: 'sedan', seats: 4, bags: 3, ac: true, trans: 'Manual', price: 2000, tag: 'Sedan',
    img: 'cars/amaze.png'
  },
  {
    name: 'Glanza', cat: 'Sedan', type: 'sedan', seats: 4, bags: 3, ac: true, trans: 'Manual', price: 2000, tag: 'Sedan',
    img: 'cars/glanza.png'
  },
  {
    name: 'Scorpio', cat: 'SUV', type: 'suv', seats: 7, bags: 4, ac: true, trans: 'Manual', price: 2500, tag: 'SUV',
    img: 'cars/scorpio.png'
  },
  {
    name: 'Ertiga', cat: 'MUV', type: 'suv', seats: 6, bags: 4, ac: true, trans: 'Manual', price: 2500, tag: 'Family',
    img: 'cars/ertiga.png'
  },
  {
    name: 'Innova', cat: 'SUV', type: 'suv', seats: 7, bags: 5, ac: true, trans: 'Manual', price: 2500, tag: 'Popular',
    img: 'cars/innova.png'
  },
  {
    name: 'Innova Crysta', cat: 'SUV', type: 'suv', seats: 7, bags: 5, ac: true, trans: 'Auto', price: 3000, tag: 'Premium',
    img: 'cars/innova_crysta.png'
  },
  {
    name: 'Fortuner 4×4', cat: 'SUV', type: 'suv', seats: 7, bags: 5, ac: true, trans: 'Auto 4×4', price: 5000, tag: 'Luxury',
    img: 'cars/fortuner.png'
  },
  {
    name: 'Urbania', cat: 'Luxury Van', type: 'tempo', seats: 12, bags: 10, ac: true, trans: 'Auto', price: 5500, tag: 'Premium',
    img: 'cars/urbania.png'
  },
  {
    name: '13 Seater Tempo', cat: 'Tempo', type: 'tempo', seats: 13, bags: 10, ac: true, trans: 'Manual', price: 3500, tag: 'Group',
    img: 'cars/tempo.png'
  },
  {
    name: '17 Seater Tempo', cat: 'Tempo', type: 'tempo', seats: 17, bags: 14, ac: true, trans: 'Manual', price: 4000, tag: 'Group',
    img: 'cars/tempo.png'
  },
  {
    name: '20 Seater Tempo', cat: 'Tempo', type: 'tempo', seats: 20, bags: 18, ac: true, trans: 'Manual', price: 5000, tag: 'Group',
    img: 'cars/tempo.png'
  },
  {
    name: '27 Seater AC Bus', cat: 'Bus', type: 'bus', seats: 27, bags: 25, ac: true, trans: 'Manual', price: 8000, tag: 'Coach',
    img: 'cars/bus.png'
  },
  {
    name: '37 Seater AC Bus', cat: 'Bus', type: 'bus', seats: 37, bags: 34, ac: true, trans: 'Manual', price: 9000, tag: 'Coach',
    img: 'cars/bus.png'
  },
  {
    name: 'Volvo Sleeper 9600', cat: 'Sleeper', type: 'sleeper', seats: 36, bags: 36, ac: true, trans: 'Manual', price: 18500, tag: 'Overnight',
    img: 'cars/volvo.png'
  },
];

const ROUTES = [
  {
    num: '01', from: 'Srinagar', to: 'Pahalgam · Gulmarg · Sonmarg', dist: '90–200 km', dur: 'Day trip → 3 days', tag: 'Within Kashmir', kind: 'kashmir',
    mapCenter: '34.0837,74.7973', mapZoom: 9,
    origin: 'Srinagar,Kashmir', destination: 'Sonmarg,Kashmir',
    waypoints: [
      { name: 'Srinagar', lat: 34.0837, lng: 74.7973, desc: 'Starting point · Dal Lake, Mughal Gardens' },
      { name: 'Gulmarg', lat: 34.0484, lng: 74.3805, desc: 'Gondola ride · Ski resort · 2,650m altitude' },
      { name: 'Pahalgam', lat: 34.0161, lng: 75.3150, desc: 'Betaab Valley · Aru Valley · Lidder River' },
      { name: 'Sonmarg', lat: 34.3034, lng: 75.2988, desc: 'Thajiwas Glacier · Gateway to Ladakh' },
    ]
  },
  {
    num: '02', from: 'Jammu', to: 'Patnitop · Vaishno Devi · Katra', dist: '60–250 km', dur: '1–2 days', tag: 'Jammu region', kind: 'jammu',
    mapCenter: '33.05,75.38', mapZoom: 9,
    origin: 'Jammu,India', destination: 'Katra,Jammu',
    waypoints: [
      { name: 'Jammu', lat: 32.7266, lng: 74.8570, desc: 'Starting point · Raghunath Temple' },
      { name: 'Katra', lat: 32.9915, lng: 74.9318, desc: 'Base camp for Vaishno Devi shrine' },
      { name: 'Patnitop', lat: 33.0878, lng: 75.3238, desc: 'Hill station · Pine forests · 2,024m' },
      { name: 'Vaishno Devi', lat: 33.0303, lng: 74.9490, desc: 'Holy shrine · 5,200ft altitude trek' },
    ]
  },
  {
    num: '03', from: 'Delhi', to: 'Srinagar via Kashmir Valley', dist: '~850 km', dur: '2 days · 1 night', tag: 'Long haul', kind: 'delhi',
    mapCenter: '31.5,76.5', mapZoom: 6,
    origin: 'New+Delhi,India', destination: 'Srinagar,Kashmir',
    waypoints: [
      { name: 'New Delhi', lat: 28.6139, lng: 77.2090, desc: 'Starting point · Capital city' },
      { name: 'Chandigarh', lat: 30.7333, lng: 76.7794, desc: 'Pit stop · Rock Garden, Sukhna Lake' },
      { name: 'Jalandhar', lat: 31.3260, lng: 75.5762, desc: 'Highway rest · Punjabi cuisine stop' },
      { name: 'Udhampur', lat: 32.9160, lng: 75.1322, desc: 'Jammu region entry · Mountain views' },
      { name: 'Banihal', lat: 33.4314, lng: 75.0878, desc: 'Banihal tunnel · Gateway to Kashmir' },
      { name: 'Srinagar', lat: 34.0837, lng: 74.7973, desc: 'Destination · Kashmir Valley' },
    ]
  },
];

const PACKAGES = [
  {
    tier: 'STARTER', name: 'Day Trip', price: '2,000', sub: 'per day, onwards',
    features: ['Driver included', 'Up to 8 hrs / 80 km', 'Within Srinagar', 'Sedan or hatchback', 'Fuel as actuals', '24×7 support'],
    cta: 'Book a day trip', featured: false,
  },
  {
    tier: 'MOST BOOKED', name: 'Kashmir 4N/5D', price: '14,800', sub: 'price / person',
    features: ['Srinagar · Gulmarg · Pahalgam', 'Sedan', 'Sightseeing + transfers', 'Experienced driver-guide', 'Hotel pickup & drop', 'Customisable itinerary'],
    cta: 'Plan this trip', featured: true,
  },
  {
    tier: 'GROUPS / B2B', name: 'Tempo & Coach', price: '3,500', sub: 'per day, fleet starts at',
    features: ['13 / 17 / 20 seater tempos', '27 & 37 seater AC buses', 'Urbania luxury van', 'Volvo sleeper for overnighters', 'Dedicated co-ordinator', 'Volume pricing & GST invoicing'],
    cta: 'Request a quote', featured: false,
  },
];

const DRIVERS = [
  { name: 'Showkat Ahmad', role: 'Senior · Kashmir Valley', years: 18, skills: ['Urdu', 'Hindi', 'English', 'Kashmiri'], ini: 'SA', dl: 'JK01-XXXX-2007', phone: '+91 70067 XXXXX', photo: 'drivers/showkat.png' },
  { name: 'Imtiyaz Bhat', role: 'Highway · Delhi route', years: 12, skills: ['Hindi', 'English', 'Punjabi'], ini: 'IB', dl: 'JK02-XXXX-2013', phone: '+91 60058 XXXXX', photo: 'drivers/imtiyaz.png' },
  { name: 'Bilal Mir', role: 'Mountain · Sonmarg/Zojila', years: 15, skills: ['Urdu', 'Hindi', 'Kashmiri'], ini: 'BM', dl: 'JK01-XXXX-2010', phone: '+91 70067 XXXXX', photo: 'drivers/bilal.png' },
  { name: 'Tariq Wani', role: 'Tempo · 17/20 seater', years: 10, skills: ['Hindi', 'Urdu', 'English'], ini: 'TW', dl: 'JK03-XXXX-2015', phone: '+91 60058 XXXXX', photo: 'drivers/tariq.png' },
  { name: 'Javed Lone', role: 'Coach · Jammu corridor', years: 14, skills: ['Hindi', 'Dogri', 'Urdu'], ini: 'JL', dl: 'JK02-XXXX-2011', phone: '+91 70067 XXXXX', photo: 'drivers/javed.png' },
  { name: 'Aamir Ganie', role: 'Sedan · City', years: 8, skills: ['Urdu', 'English'], ini: 'AG', dl: 'JK01-XXXX-2017', phone: '+91 60058 XXXXX', photo: 'drivers/aamir.png' },
  { name: 'Rouf Dar', role: 'Volvo Sleeper · Long haul', years: 16, skills: ['Hindi', 'Punjabi', 'Urdu'], ini: 'RD', dl: 'JK02-XXXX-2009', phone: '+91 70067 XXXXX', photo: 'drivers/rouf.png' },
  { name: 'Sajad Para', role: 'Fortuner 4×4 · Off-road', years: 11, skills: ['Urdu', 'English', 'Hindi'], ini: 'SP', dl: 'JK01-XXXX-2014', phone: '+91 60058 XXXXX', photo: 'drivers/sajad.png' },
];

const TESTIMONIALS = [
  { quote: 'Very professional and reliable service. They managed our Kashmir trip perfectly without any hassle. The drivers were knowledgeable and everything from flights to hotels was perfectly organized. Highly recommended for families.', who: 'Shabir Ahmad', time: 'a month ago', ini: 'S', rating: 5 },
  { quote: 'I booked a Kashmir tour package for my parents. Irha Kars made sure they were comfortable and taken care of throughout the journey. Great hotels, excellent transport, and absolutely breathtaking views of Dal Lake.', who: 'Faisal Wani', time: '3 months ago', ini: 'F', rating: 5 },
  { quote: 'Best travel agency in Srinagar! Their custom packages and transparency in pricing sets them apart. Excellent customer support 24×7. We had some flight delays and they instantly re-arranged our accommodation without any stress.', who: 'Mohammad Yasin', time: '6 months ago', ini: 'M', rating: 5 },
  { quote: 'Booked an Innova Crysta with Showkat for our 6-day Kashmir trip. The driver knew every shortcut, every viewpoint. Easily the smoothest part of the holiday.', who: 'Anjali R.', time: '2 months ago', ini: 'A', rating: 5 },
  { quote: 'We run a small tour operator out of Bangalore. Irha Kars handles every Kashmir handover for our groups — buses, tempos, sedans, paperwork. Zero drama in three seasons.', who: 'Kiran Mehta', time: '4 months ago', ini: 'K', rating: 5 },
  { quote: 'Took the Volvo sleeper from Delhi up to Srinagar overnight. Genuinely comfortable, and the driver swap at Patnitop was on the dot. Will book again.', who: 'Devansh Singh', time: 'a month ago', ini: 'D', rating: 5 },
  { quote: 'Excellent service by Irha Kars. Driver was very polite and punctual. The car was clean and well maintained. Highly recommended for Kashmir trips.', who: 'Sameer Bhat', time: '5 months ago', ini: 'S', rating: 5 },
  { quote: 'Our family trip to Gulmarg and Pahalgam was seamless. The driver knew all the best local food spots. A memorable experience!', who: 'Priya Sharma', time: 'a month ago', ini: 'P', rating: 5 },
  { quote: 'Very transparent pricing. No hidden charges at the end of our 5-day trip. Will definitely use them again next year.', who: 'Rohit Verma', time: '2 months ago', ini: 'R', rating: 5 },
  { quote: 'Safety was my biggest concern as a solo female traveler. The team made me feel completely secure. Great communication via WhatsApp.', who: 'Ayesha Khan', time: '3 months ago', ini: 'A', rating: 5 },
  { quote: 'Used their tempo traveller for a family group of 14. The vehicle was in pristine condition, AC worked perfectly, and the driver was extremely patient.', who: 'Tariq Dar', time: '6 months ago', ini: 'T', rating: 5 },
  { quote: 'The best car rental in Srinagar! They customized our itinerary perfectly and even accommodated a last-minute change to visit Sonmarg.', who: 'Neha Gupta', time: '2 weeks ago', ini: 'N', rating: 5 },
  { quote: 'Amazing experience! The driver arrived at the airport on time. The journey to Pahalgam was smooth despite the heavy traffic.', who: 'Vishal Patel', time: 'a month ago', ini: 'V', rating: 5 },
  { quote: 'I highly recommend Irha Kars for anyone visiting Kashmir. Booking on WhatsApp was super easy, and they delivered exactly what they promised.', who: 'Zoya Syed', time: '4 months ago', ini: 'Z', rating: 5 },
  { quote: 'Professionalism at its best. The Innova Crysta was spotless. Our driver Showkat was basically a local guide for us.', who: 'Imran Malik', time: '3 months ago', ini: 'I', rating: 5 },
  { quote: 'A big thank you to the team for making our anniversary trip so special. Flawless transport arrangements across the valley.', who: 'Kavita Rao', time: '5 months ago', ini: 'K', rating: 5 },
  { quote: 'Booked a sedan for a quick 2-day business trip. Efficient, on-time, and very courteous service. Five stars!', who: 'Arjun Nair', time: 'a month ago', ini: 'A', rating: 5 },
  { quote: 'We faced a flight delay, but our driver waited at the airport without any complaints. That level of service is rare.', who: 'Salman Sheikh', time: '2 months ago', ini: 'S', rating: 5 },
  { quote: 'The entire process from getting a quote to the final drop-off was handled professionally. Good cars, good people.', who: 'Ritu Desai', time: '4 months ago', ini: 'R', rating: 5 },
  { quote: 'Top-notch fleet. We had an Urbania for our group, and it felt like a luxury lounge on wheels. Will book again.', who: 'Asif Mir', time: '3 months ago', ini: 'A', rating: 5 },
  { quote: 'Very happy with the service. The driver was cautious on the mountain roads, which put us all at ease.', who: 'Meenakshi Iyer', time: 'a month ago', ini: 'M', rating: 5 },
];

const FAQS = [
  { q: 'Is the driver included in the rental price?', a: 'Yes — every car, tempo, bus and sleeper comes with an experienced driver. We do not offer self-drive. Our drivers know the Kashmir, Jammu and Delhi-Srinagar corridors intimately.' },
  { q: 'How does fuel pricing work?', a: 'For day trips and packages, fuel is included up to the agreed kilometre limit. Beyond that, fuel is charged at actuals. For long routes (Delhi–Srinagar, Jammu, etc) we quote all-inclusive packages so there are no surprises.' },
  { q: 'Can tour operators get volume pricing?', a: 'Absolutely. We work with travel and tour companies across India who need reliable Kashmir handovers. Talk to our B2B desk for credit terms, GST invoicing and dedicated co-ordinators for your group movements.' },
  { q: 'Do you cover routes outside Kashmir?', a: 'Our core network is Kashmir-to-Kashmir, Jammu-to-Jammu, and Delhi-to-Kashmir. We also handle pan-India tourist transport on request — write to us with your route and dates and we will revert with a quote.' },
  { q: 'How do I confirm a booking?', a: 'Pick a car and date, click Book on WhatsApp and we will confirm availability within minutes. A small advance secures the vehicle; balance is settled at trip end. All bookings are documented with a digital receipt.' },
  { q: 'What if my plans change mid-trip?', a: 'Itineraries with us are flexible. Your driver is in constant touch with our control room — extend the trip, swap a stop, add a vehicle. We rework things on the road as long as the fleet is available.' },
];

const TEAM = [
  { id: '1', name: 'Syed Irfan Razvi', role: 'CEO & Founder', ini: 'SIR', desc: 'Founded Irha Kars in 2009. 17+ years of Kashmir tourism expertise driving every strategic decision.', photo: 'uploads/owner.jpeg' },
];

window.IRHA = { CARS, ROUTES, PACKAGES, DRIVERS, TESTIMONIALS, FAQS, TEAM };

