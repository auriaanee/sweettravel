/* ============================================
   SweetTravel — script.js  v3
   Destination modals · Article modals · Gallery lightbox
   FAQ accordion · Video · Confetti · Nav
   ============================================ */

'use strict';

/* ─── Inject keyframes ─── */
const _style = document.createElement('style');
_style.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)} 40%{transform:translateX(6px)}
    60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
  }
  @keyframes confettiFall {
    0%   { transform:translateY(-20px) rotate(0deg);   opacity:1; }
    100% { transform:translateY(100vh) rotate(720deg); opacity:0; }
  }
`;
document.head.appendChild(_style);

/* ══════════════════════════════════
   DATA — DESTINATIONS
══════════════════════════════════ */
const DESTINATIONS = {
  santorini: {
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1100&q=85&fit=crop',
    rating: '4.9',
    ratingText: '4.9 · 12 stories · Women love this',
    safety: '🟢 Very safe for solo women travellers',
    places: [
      { emoji: '🏘️', name: 'Oia Village',         desc: 'The most photographed village in Greece — whitewashed houses, blue domes, and sunsets that will ruin you for life. Arrive early morning before the crowds.' },
      { emoji: '🌋', name: 'Fira Town',            desc: 'The island\'s capital sits on the edge of the caldera. Take the cable car down to the old port, grab a coffee with a view, and explore the narrow streets.' },
      { emoji: '🏖️', name: 'Red Beach',            desc: 'A dramatic volcanic beach near Akrotiri with striking crimson cliffs. A short hike gets you there — wear good shoes and go early for the best light.' },
      { emoji: '🏛️', name: 'Akrotiri Ruins',       desc: 'The "Pompeii of the Aegean" — a perfectly preserved Minoan town buried under ash 3,600 years ago. Surprisingly moving, and free on Sundays.' },
      { emoji: '⛵', name: 'Amoudi Bay',           desc: 'A tiny bay below Oia with some of the freshest seafood you\'ll ever eat. Come at sunset and jump off the rocks into the Aegean — a bucket-list moment.' },
    ],
    tip: 'Rent a quad bike or ATV rather than relying on buses — the roads are narrow and the freedom to explore on your own schedule is worth every euro. Avoid July and August if you can; May and September are magical.',
    facts: [
      { label: 'Best time to visit', value: 'May–June · Sept–Oct' },
      { label: 'Currency', value: 'Euro (€)' },
      { label: 'Language', value: 'Greek (English everywhere)' },
      { label: 'Women\'s safety rating', value: '⭐⭐⭐⭐⭐' },
    ],
  },

  tokyo: {
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1100&q=85&fit=crop',
    rating: '4.8',
    ratingText: '4.8 · 28 stories · #1 for solo women',
    safety: '🟢 One of the safest cities in the world',
    places: [
      { emoji: '🚦', name: 'Shibuya Crossing',     desc: 'The world\'s busiest pedestrian crossing — and somehow, utterly civilised. Stand on the Starbucks second floor or the Mag\'s Park rooftop for the best view of organised chaos.' },
      { emoji: '🏮', name: 'Senso-ji Temple',      desc: 'Tokyo\'s oldest and most beloved temple in Asakusa. Go at dawn before the day-trippers arrive — the incense smoke, red lanterns, and quiet priests make it genuinely magical.' },
      { emoji: '🌸', name: 'Shinjuku Gyoen Garden', desc: 'The best cherry blossom park in Tokyo — beautifully maintained, alcohol allowed, and free to bring a picnic. In autumn, the maple trees turn it into a painting.' },
      { emoji: '🍣', name: 'Tsukiji Outer Market',  desc: 'The tourists moved to Toyosu, but the outer market still serves the freshest sushi breakfast you\'ll ever have. Arrive by 7am, follow your nose, eat everything.' },
      { emoji: '🎀', name: 'Harajuku & Takeshita', desc: 'The spiritual home of Japanese street fashion — cosplay, pastel everything, wild crépes. Even if fashion isn\'t your thing, the people-watching here is extraordinary.' },
    ],
    tip: 'Get a Suica card (IC card) at the airport — it works on every subway, bus, and convenience store in Japan. Download Google Maps offline before you arrive. And yes, solo women regularly call Tokyo the safest city they\'ve ever visited.',
    facts: [
      { label: 'Best time to visit', value: 'March–May (sakura) · Oct–Nov' },
      { label: 'Currency', value: 'Japanese Yen (¥)' },
      { label: 'Language', value: 'Japanese (signs in English)' },
      { label: 'Women\'s safety rating', value: '⭐⭐⭐⭐⭐' },
    ],
  },

  bali: {
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1100&q=85&fit=crop',
    rating: '4.9',
    ratingText: '4.9 · 19 stories · Top wellness destination',
    safety: '🟡 Generally safe — use common sense at night',
    places: [
      { emoji: '🌾', name: 'Tegalalang Rice Terraces', desc: 'The emerald-green stepped terraces in Ubud are one of those places that genuinely looks like the photos. Go in the morning for soft light and cool temperatures before the tour groups arrive.' },
      { emoji: '🌊', name: 'Tanah Lot Temple',         desc: 'A sea temple perched on a rock surrounded by crashing waves — especially dramatic at sunset. One of Bali\'s most sacred sites and genuinely worth the 45-minute drive from Ubud.' },
      { emoji: '🦅', name: 'Uluwatu Cliff Temple',     desc: 'A cliffside temple with 70m drops into the Indian Ocean and monkeys that will steal your sunglasses. Stay for the Kecak fire dance performance at sunset — unforgettable.' },
      { emoji: '🏄', name: 'Seminyak Beach',           desc: 'Bali\'s most stylish stretch of coast — chic beach clubs, great surf for beginners, and incredible sunsets. La Plancha sets up colourful beanbags on the sand at dusk; go.' },
      { emoji: '🐒', name: 'Sacred Monkey Forest',    desc: 'Three ancient temples set inside a jungle inhabited by 700 Balinese long-tailed macaques. Chaotic, funny, and weirdly spiritual. Keep your food hidden and your grip on your glasses.' },
    ],
    tip: 'Book at least one night in a Ubud jungle villa — the morning mist over the rice terraces and sound of temple bells at dawn is an experience money can barely buy. For the beach, Canggu is more laid-back than Seminyak and has a wonderful community of female digital nomads.',
    facts: [
      { label: 'Best time to visit', value: 'May–September (dry season)' },
      { label: 'Currency', value: 'Indonesian Rupiah (IDR)' },
      { label: 'Language', value: 'Bahasa Indonesian (English common)' },
      { label: 'Women\'s safety rating', value: '⭐⭐⭐⭐' },
    ],
  },

  paris: {
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1100&q=85&fit=crop',
    rating: '4.7',
    ratingText: '4.7 · 34 stories · Most-written-about city',
    safety: '🟡 Safe — stay aware in busy tourist areas',
    places: [
      { emoji: '🎨', name: 'Montmartre & Sacré-Cœur', desc: 'The village-within-a-city that inspired generations of artists. Climb to Sacré-Cœur at dawn for a view over the whole city with almost no one around, then find a crêperie for breakfast.' },
      { emoji: '🏘️', name: 'Le Marais',               desc: 'Paris at its most beautiful — medieval streets, Jewish quarter bakeries, cutting-edge galleries, and the Place des Vosges. Spend an entire afternoon just wandering here.' },
      { emoji: '🚤', name: 'Seine River at Dusk',     desc: 'Walk along the Left Bank at the golden hour, find a quiet bench near Pont de la Tournelle, and watch the light change on Notre-Dame. This costs nothing and beats any tour.' },
      { emoji: '🖼️', name: 'Musée d\'Orsay',          desc: 'The world\'s greatest Impressionist collection, housed in a stunning Beaux-Arts railway station. Book tickets online, go on a weekday morning, and spend three hours getting lost.' },
      { emoji: '🌿', name: 'Palais Royal Gardens',    desc: 'The secret garden that Parisians keep mostly to themselves. Gorgeous arcaded galleries, quirky boutiques, and a central garden perfect for a picnic. Arrive with cheese and wine.' },
    ],
    tip: 'Skip the Eiffel Tower queue and walk to the Trocadéro terrace opposite — it\'s the best view of the tower and it\'s completely free. For safety: Paris is very safe for women, but stay alert in Châtelet–Les Halles and near Gare du Nord at night.',
    facts: [
      { label: 'Best time to visit', value: 'April–June · September' },
      { label: 'Currency', value: 'Euro (€)' },
      { label: 'Language', value: 'French (English in tourist areas)' },
      { label: 'Women\'s safety rating', value: '⭐⭐⭐⭐' },
    ],
  },

  marrakech: {
    name: 'Marrakech',
    country: 'Morocco',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1100&q=85&fit=crop',
    rating: '4.6',
    ratingText: '4.6 · 11 stories · Most vibrant medina',
    safety: '🟡 Use common sense — recommended with a buddy',
    places: [
      { emoji: '🎪', name: 'Djemaa el-Fna Square',   desc: 'The heart of Marrakech — snake charmers by day, food stalls and storytellers by night. Overwhelming in the best possible way. Eat at the rooftop restaurants around the edges for atmosphere plus a safer vantage point.' },
      { emoji: '🌺', name: 'Majorelle Garden',        desc: 'Yves Saint Laurent\'s legendary cobalt-blue garden, now home to a Berber museum. The contrast of the vivid blue walls against tropical plants is unlike anything you\'ve seen. Book online to avoid queues.' },
      { emoji: '🏰', name: 'Bahia Palace',            desc: 'A 19th-century palace built for a grand vizier\'s favourite wife. Its intricate carved ceilings, painted doors, and mosaic floors are extraordinary, and it\'s refreshingly uncrowded.' },
      { emoji: '🕌', name: 'Mellah (Jewish Quarter)', desc: 'Marrakech\'s oldest Jewish quarter has gorgeous wrought-iron balconies, a beautiful synagogue, and wonderful silver jewellery workshops. Quieter than the main souks and fascinating.' },
      { emoji: '🛍️', name: 'Souk Semmarine',          desc: 'The main covered market — lanterns, leather, spices, ceramics, textiles. Haggling is expected and part of the joy. A good rule: first offer 40% of the asking price and meet in the middle.' },
    ],
    tip: 'Stay in a riad inside the Medina — a traditional courtyard house that becomes your peaceful refuge from the beautiful chaos outside. Bring a light scarf to cover your shoulders when visiting mosques, and always confirm taxi prices before getting in.',
    facts: [
      { label: 'Best time to visit', value: 'March–May · Sept–November' },
      { label: 'Currency', value: 'Moroccan Dirham (MAD)' },
      { label: 'Language', value: 'Arabic & Darija (French widely spoken)' },
      { label: 'Women\'s safety rating', value: '⭐⭐⭐' },
    ],
  },

  amsterdam: {
    name: 'Amsterdam',
    country: 'Netherlands',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1100&q=85&fit=crop',
    rating: '4.7',
    ratingText: '4.7 · 9 stories · Best cycling city',
    safety: '🟢 Very safe for solo women travellers',
    places: [
      { emoji: '🌳', name: 'Jordaan Neighbourhood',  desc: 'The most charming district in the city — brown cafes, indie boutiques, floating flowers markets, and narrow canal streets that look exactly like a Dutch painting. Best explored on foot over a slow afternoon.' },
      { emoji: '📖', name: 'Anne Frank House',        desc: 'One of the most moving experiences in Europe. The secret annex where Anne Frank hid for two years is small and devastating and important. Book weeks in advance — it sells out every single day.' },
      { emoji: '🎨', name: 'Rijksmuseum',             desc: 'The Netherlands\' great national museum houses Vermeer, Rembrandt, and 8,000 years of Dutch history. Give it at least half a day. The free garden outside is wonderful even if you don\'t go in.' },
      { emoji: '🌷', name: 'Vondelpark in Bloom',     desc: 'Amsterdam\'s central park becomes an outdoor living room in spring — picnics, street performers, dogs, cyclists. On a sunny afternoon there\'s nowhere better in the city to just sit and be.' },
      { emoji: '⛵', name: 'Canal Boat Tour',         desc: 'The best way to understand Amsterdam\'s layout and see the extraordinary 17th-century canal houses from the water. Take the hop-on-hop-off for flexibility, or rent a small paddleboat for two.' },
    ],
    tip: 'Rent a bike on your very first morning — it\'s the cheapest, fastest and most local way to see the city. Cycle lanes are excellent and well-marked. Watch out for trams, which have right of way over everyone.',
    facts: [
      { label: 'Best time to visit', value: 'April–May (tulips) · Sept' },
      { label: 'Currency', value: 'Euro (€)' },
      { label: 'Language', value: 'Dutch (English spoken by everyone)' },
      { label: 'Women\'s safety rating', value: '⭐⭐⭐⭐⭐' },
    ],
  },
};

/* ══════════════════════════════════
   DATA — ARTICLES
══════════════════════════════════ */
const AUTHORS = {
  sofia: {
    name: 'Sofia Martínez',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=85&fit=crop&crop=face',
    bio: 'Travel writer & chronic wanderer. 62 countries, mostly solo. Founder of SweetTravel. Based wherever her next flight takes her.',
  },
  lena: {
    name: 'Lena Kovač',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=85&fit=crop&crop=face',
    bio: 'Food writer turned travel blogger. Believes every destination is best understood through its breakfast. Based in Vienna.',
  },
  maya: {
    name: 'Maya Reeves',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=85&fit=crop&crop=face',
    bio: 'Adventure travel writer and certified hiking guide. Has wild-camped on four continents and still prefers a tent to a hotel.',
  },
};

const ARTICLES = {
  'paris-48h': {
    tag: 'City Guide', title: '48 Hours in Paris: The Itinerary Locals Actually Love',
    author: AUTHORS.sofia, date: 'June 18, 2026', time: '8 min read',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=85&fit=crop',
    content: `
      <p>Everyone thinks they know Paris. They've seen the Eiffel Tower on a thousand postcards, they've watched Amélie three times, they've pinned the café on the corner of the Rue Mouffetard. But the Paris most tourists see and the Paris that Parisians actually live in are two different cities sharing the same beautiful postcode.</p>
      <p>I've been to Paris eleven times. The first five were guided tours and hotel breakfasts and queues outside the Louvre that snaked around two city blocks. The last six have been something else entirely — slow mornings, market shopping, wrong turns that led to the best wine bars I've ever sat in. Here is what I've learned.</p>
      <h3>Morning: Montmartre before the crowds</h3>
      <p>Set your alarm for 6:30am. I mean it. Walk to Sacré-Cœur in the early light, before the tour buses arrive, before the men trying to tie friendship bracelets on your wrist take up their posts on the steps. The city below you will be waking up slowly — steam from boulangeries, the sound of delivery trucks on cobblestones, a lone jogger on the Pont Neuf. You will feel like Paris belongs entirely to you.</p>
      <p>Afterwards: find a bakery (any bakery, they're all good), order a café allongé and a pain au chocolat, and sit on the pavement. Do not rush this. The French invented the concept of lingering for a reason.</p>
      <blockquote>"The best thing about Paris is that it rewards those who slow down. Walk everywhere. Get lost on purpose."</blockquote>
      <h3>Afternoon: Le Marais and the hidden Paris</h3>
      <p>The Marais is the neighbourhood that every "hidden gem" article calls a hidden gem, which means it's not exactly secret anymore — but it remains genuinely wonderful. The Jewish bakeries on the Rue des Rosiers still make the best falafel in France. The Place des Vosges, the oldest planned square in Paris, has a quiet arcade around its edge where you can sit on a stone bench and feel like you've slipped back three centuries.</p>
      <div class="article-tip-box"><strong>🌸 Safety tip:</strong> Paris is very safe for women, but stay aware in the Châtelet–Les Halles area and around Gare du Nord in the evenings. In tourist areas, keep your bag in front of you and your phone in your pocket.</div>
      <p>What most visitors miss: the Musée Picasso is quieter and more interesting than the Pompidou, and the Musée Cognacq-Jay (an 18th-century decorative arts museum) is practically empty even in July. Art lovers should also walk to the tiny Musée de la Vie Romantique, a rose-covered hôtel particulier in Pigalle with a garden tea room that feels like a film set.</p>
      <h3>Evening: Dinner like a local</h3>
      <p>The single most important piece of Paris advice I can give you: never eat within 200 metres of a major tourist attraction. Walk two streets away from the Marais, the Louvre, or Notre-Dame, and prices drop, portion sizes increase, and the menu exists only in French — which is, paradoxically, a very good sign.</p>
      <p>For wine, find any bar à vin with handwritten specials on a blackboard. Order the house red. Stay for two glasses. Talk to the people next to you. This is the Paris worth travelling for.</p>
    `,
  },

  'slow-cafes': {
    tag: 'Food & Culture', title: 'The Art of Slow Travel: How Cafés Changed the Way I Explore',
    author: AUTHORS.lena, date: 'June 12, 2026', time: '5 min read',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=85&fit=crop',
    content: `
      <p>I used to travel like I was completing a checklist. Cathedral, museum, viewpoint, market. Photograph, move on, repeat. It took me three years of travel writing to realise I was doing it entirely wrong — and that the thing that fixed it was learning to sit still in a coffee shop.</p>
      <p>The café is the great equaliser of travel. Everywhere in the world has one — a kopi tiam in Singapore, a kafeneion in Athens, a kaffeehaus in Vienna, a chaikhana in Uzbekistan. Each one serves roughly the same function: a warm room, a hot drink, and an excuse to stay put for an hour and just watch.</p>
      <h3>What you actually learn from sitting still</h3>
      <p>In a good café, you understand how a city breathes. You see who is in a hurry and who isn't. You learn the dress codes, the social rituals, the relationship between neighbours. In Vienna's grand coffee houses, elderly men still come every morning with a newspaper and stay for three hours over a single Melange. In Tokyo's tiny standing espresso bars, salarymen down a double shot in ninety seconds and leave. These are not just coffee habits — they are entire philosophies of time.</p>
      <blockquote>"A city reveals itself most honestly to the person who sits quietly and waits to be surprised."</blockquote>
      <div class="article-tip-box"><strong>✦ Slow travel tip:</strong> Budget 2–3 hours per day for doing nothing specific. Wander without a map, sit in the first café that looks interesting, and see what happens. Some of the best conversations and discoveries of my travels have come from accidental stillness.</div>
      <p>The café has also given me the best meals of my travels. Not because café food is always remarkable, but because lingering long enough to become a semi-regular — even for a single afternoon — tends to result in the waiter bringing you something you didn't order. A small plate of something the kitchen is trying. A tiny glass of the local spirit. A dessert with a note that says "for you, because you stayed."</p>
      <p>Slow travel isn't about going fewer places. It's about arriving more fully at the ones you do go to. The café taught me that.</p>
    `,
  },

  'solo-hiking': {
    tag: 'Adventure', title: 'Solo Hiking for First-Timers: Everything You Actually Need to Know',
    author: AUTHORS.maya, date: 'June 8, 2026', time: '6 min read',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=85&fit=crop',
    content: `
      <p>The first time I hiked alone, I turned around after forty minutes. The trail felt too quiet, the trees too tall, the silence too absolute. I sat on a mossy rock and wondered if every solo hiker in history had felt this way — this strange mixture of freedom and exposure that comes from moving through nature entirely on your own terms.</p>
      <p>I went back the next morning. And the morning after that. And three months later I completed a six-day solo through-hike in the Swiss Alps and cried at the summit not because I was afraid, but because I'd forgotten it was possible to feel this free.</p>
      <h3>Start smaller than you think you need to</h3>
      <p>The most common mistake first-time solo hikers make is choosing a trail that's too long, too remote, or too technically demanding. Start with a well-marked day hike in a popular area — somewhere with phone signal, where you'll pass other hikers regularly. Save the five-day wilderness trek for when you have confidence and experience behind you.</p>
      <p>Your first solo hike should end with you feeling like you could have done more. That feeling — of capacity held in reserve — is the foundation everything else is built on.</p>
      <div class="article-tip-box"><strong>🌸 Safety for women:</strong> Download AllTrails and save your route offline. Share your plan — exact trail, car park location, expected return time — with someone who will actually check. Carry a personal alarm. Trust your gut: if a person or situation on trail feels wrong, change your plan without hesitation or guilt.</div>
      <h3>What to carry (and what to leave at home)</h3>
      <p>The 10 essentials have been the same for 80 years for a reason: navigation (map + compass, not just phone), sun protection, insulation (extra layer), illumination, first-aid kit, fire (lighter), repair tools, nutrition (extra food), hydration (extra water), and emergency shelter (a foil bivvy). These weigh almost nothing. Carry them always.</p>
      <p>What to leave behind: your fear of being alone. Solo hiking is not dangerous. It is different. The hills don't change when you're alone — but your relationship to them does. You move at your own pace, stop when you want, turn around without negotiation. You are entirely responsible for your own experience, which turns out to be, mostly, a very good thing.</p>
    `,
  },

  'packing-list': {
    tag: 'Packing Tips', title: 'The Only Packing List You\'ll Ever Need for a 2-Week Trip',
    author: AUTHORS.sofia, date: 'June 22, 2026', time: '4 min read',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&q=85&fit=crop',
    content: `
      <p>I've packed for over 200 trips. I've done it wrong in approximately 180 of them. I have hauled 23kg suitcases up six flights of stairs in Lisbon. I have paid €80 in excess baggage fees in Bangkok because I "might need options." I have worn the same pair of jeans for a week in Iceland because my suitcase was too heavy to carry and I'd checked it instead of dragging it. None of this was necessary.</p>
      <p>This is the list I've been using for the past three years. Everything fits in a carry-on. For two weeks. In any climate.</p>
      <h3>The actual list</h3>
      <p><strong>Clothing (7 items total):</strong> 3 tops that all go with each other, 1 pair of trousers or jeans, 1 dress or skirt that works for both day and evening, 1 lightweight jacket or cardigan, 1 versatile pair of shoes (walking shoes that don't look like hiking boots). That is genuinely it. Laundry exists everywhere in the world.</p>
      <p><strong>Toiletries:</strong> Buy full-size products at your destination. Pharmacies exist everywhere. You do not need to pack six months of skincare products for a 14-night trip.</p>
      <div class="article-tip-box"><strong>✦ The rolling rule:</strong> Roll everything, don't fold. It takes up 30% less space and somehow produces fewer wrinkles. Pack your shoes in shower caps or small fabric bags to protect your clothes. Use packing cubes — they are not a gimmick, they are life-changing.</div>
      <h3>What you always forget and shouldn't</h3>
      <p>The universal travel adapter. A physical copy of your accommodation address (for customs forms and in case your phone dies). A small padlock for hostel lockers or your suitcase zip. Earplugs. A pen — you will need one on every single flight you take for the rest of your life, and you will never have one.</p>
      <p>The mindset shift that made all of this possible: I stopped thinking about what I might need and started thinking about what I would actually use. Those are very different questions, and answering the second one correctly is the entire skill of good packing.</p>
    `,
  },

  'greek-islands': {
    tag: 'Destination', title: 'Beyond Santorini: 7 Greek Islands Nobody Talks About',
    author: AUTHORS.lena, date: 'June 20, 2026', time: '7 min read',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85&fit=crop',
    content: `
      <p>Santorini is extraordinary. I will never tell you not to go. The caldera view at sunset, the blue domes, the wine from grapes grown in volcanic ash — it earns every superlative it receives. But Greece has over 200 inhabited islands, and the ferry network connects most of them for less than twenty euros. It seems a shame to see only one.</p>
      <p>Here are seven islands I love that won't appear on the Instagram Explore page:</p>
      <h3>Milos — volcanic drama without the crowds</h3>
      <p>Milos has the same volcanic geology as Santorini but a fraction of the visitors. The beaches here are genuinely among the most beautiful in Europe — Sarakiniko looks like a moonscape in white pumice stone; Tsigrado is a secret cove reachable only by rope. The boat tour around the island is a half-day highlight.</p>
      <h3>Ikaria — the island where people forget to die</h3>
      <p>Ikaria has one of the highest concentrations of centenarians on Earth, and locals have a theory: no schedules, good wine, and radical hospitality. Buses run when the driver feels like it. Restaurants open at 10pm. Parties last until dawn. It is the most profoundly relaxing island I've ever visited.</p>
      <h3>Hydra — no cars, no scooters, total peace</h3>
      <p>Hydra bans all motorised vehicles from the island — everything moves by donkey, foot, or water. The port is one of the most beautiful in Greece, the food is excellent, the day-trippers leave by 5pm, and what remains in the evening is something very close to perfect.</p>
      <div class="article-tip-box"><strong>🌸 Practical tip:</strong> Greek ferries are reliable but occasionally subject to weather delays. Build buffer days into your island-hopping itinerary and never book a non-refundable flight home from a small island on the last day of your trip.</div>
      <p>The others on my list — Folegandros, Symi, Nisyros, and Tilos — each have their own particular magic. Greece rewards curiosity, and the islands especially so. Buy a ferry pass, point yourself roughly southeast, and see what you find.</p>
    `,
  },

  'japan-sakura': {
    tag: 'Seasonal', title: 'Japan in Cherry Blossom Season: Planning Around the Sakura Forecast',
    author: AUTHORS.maya, date: 'June 17, 2026', time: '9 min read',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=85&fit=crop',
    content: `
      <p>The sakura season lasts approximately one week per location. The exact week changes every year, varies by up to three weeks between the warmest and coldest years, and cannot be predicted with complete accuracy until about ten days before it happens. Planning a trip to Japan specifically for cherry blossoms is, essentially, a beautiful gamble.</p>
      <p>It is also the best gamble I have ever taken.</p>
      <h3>Understanding the bloom forecast</h3>
      <p>Japan's cherry blossom forecast (sakura yohou) is released each January and updated weekly as spring approaches. The Japan Meteorological Corporation tracks the "sakura front" — the wave of blossoming that moves northward from Kyushu to Hokkaido between late March and early May. Tokyo typically peaks in late March to early April; Kyoto follows a few days behind; the northern island of Hokkaido blooms in late April to early May.</p>
      <p>The sweet spot most photographers seek is "mankai" — full bloom — followed by a period of light wind when the petals begin to fall like pink snow, creating what Japanese call "hanafubuki" (flower blizzard). You want to arrive around 80% bloom and stay through petal fall. In total, perhaps five days at any single location.</p>
      <h3>The spots that are worth the crowds (and the ones that aren't)</h3>
      <p>Maruyama Park in Kyoto is worth the crowds because the great weeping cherry tree at its centre — over a hundred years old and lit from below at night — is something you will remember for the rest of your life. The Philosopher's Path is worth it at dawn before the tour groups arrive.</p>
      <div class="article-tip-box"><strong>🌸 Booking tip:</strong> Book accommodation 4–6 months in advance for sakura season. Prices double and availability collapses within weeks of the forecast release. A 10-minute walk from the main cherry blossom parks will save you 40% on your hotel and give you the same experience.</div>
      <p>What isn't worth it: Ueno Park in Tokyo on a weekend. It's famous for a reason, but that reason is primarily that it's the closest big park to the city centre, and on a sunny Saturday it holds approximately the same number of people as a medium-sized European country.</p>
      <p>The places I've loved most in sakura season are the unexpected ones: a castle moat in a regional city, a mountain temple approached by stone steps covered in petals, a park in an ordinary suburb where families lay out picnic mats under a single tree and open their bento boxes with quiet ceremony. Japan's relationship with cherry blossoms is not just aesthetic — it is a meditation on impermanence. Sit with that for a while. It's worth the trip for the feeling alone.</p>
    `,
  },

  'marrakech-food': {
    tag: 'Food & Culture', title: 'A First-Timer\'s Guide to Eating Through Marrakech',
    author: AUTHORS.sofia, date: 'June 14, 2026', time: '6 min read',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=85&fit=crop',
    content: `
      <p>Marrakech rewards the brave eater. Not brave in the sense of exotic ingredients — though those exist — but brave in the sense of following your nose into an unmarked doorway, sitting down at a plastic table with no menu, and trusting whoever walks over with a pot of tea to also bring you something wonderful.</p>
      <p>The Moroccan kitchen is extraordinary: spiced, fragrant, generous, and entirely built around the logic of the long, slow meal. Couscous is served on Fridays as a family ritual. Tagines bubble for hours over charcoal. Bastilla — the extraordinary sweet-savoury pigeon (or chicken) pie wrapped in paper-thin pastry and dusted with cinnamon and sugar — is one of the finest things I've eaten anywhere in the world.</p>
      <h3>Where the locals actually eat</h3>
      <p>The rooftop restaurants surrounding Djemaa el-Fna square are useful for orientation but not for food — prices are inflated and quality varies. Walk instead into the souks around the square and find the small storefronts selling harira (a hearty tomato and lentil soup with bread) for twelve dirhams. That is your lunch.</p>
      <p>For a proper sit-down meal, the Mellah quarter has several excellent family-run restaurants that serve traditional Marrakchi cuisine with no tourist menu in sight. The best thing you can do is ask your riad host for their personal recommendation — they will not send you somewhere bad.</p>
      <div class="article-tip-box"><strong>🌸 Safety tip:</strong> If you're eating at the Djemaa el-Fna evening stalls, agree the price of each dish before eating — hold firm if they try to add extras you didn't order. Go with confidence and the experience will be wonderful.</div>
      <h3>Breakfast, the Moroccan way</h3>
      <p>The Moroccan breakfast table is a statement of abundance: msemen (flaky flatbread), beghrir (honeycomb pancakes), argan oil and honey for dipping, fresh orange juice pressed in front of you for three dirhams, and mint tea poured from a theatrical height to create the frothy "head" that signals it was made properly. Never rush a Moroccan breakfast.</p>
    `,
  },

  'dolomites': {
    tag: 'Adventure', title: 'The Most Rewarding 3-Day Hike in the Dolomites (Solo Female Edition)',
    author: AUTHORS.maya, date: 'June 10, 2026', time: '11 min read',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop',
    content: `
      <p>The Alta Via 1 is 120km long, runs from Lago di Braies to Belluno, and takes most hikers 8–12 days to complete. I've never done the whole thing in one go. I don't think you need to. The most beautiful section — in my opinion, and I've argued about this with a lot of hikers — are the three days between Rifugio Lavarella and Rifugio Lagazuoi, crossing through the high passes above Cortina d'Ampezzo.</p>
      <p>These three days contain everything the Dolomites do best: vertical limestone towers turned pink at dawn, trails that cross open meadows with no human structure in sight for hours, rifugios (mountain huts) that serve homemade pasta and cold beer at 2,600 metres above sea level, and a silence so complete it has texture.</p>
      <h3>Day 1: Rifugio Lavarella to Rifugio Fanes</h3>
      <p>The trail leaves the valley and climbs steadily through spruce forest before emerging onto the Fanes plateau — a wide, high meadow ringed by dolomitic towers that turns gold in late afternoon. The rifugio at Fanes is basic and warm and serves the best apple strudel I've eaten in the mountains. Sleep is deep at 2,060 metres.</p>
      <div class="article-tip-box"><strong>🌸 Practical:</strong> Book rifugios 6–8 weeks in advance for July and August. Most accept bookings by email. Bring your own sleeping bag liner — bedding quality varies. Rifugio meals are included in most half-board prices; always book dinner when you book your bed.</div>
      <h3>Day 2: The traverse to Rifugio Lagazuoi</h3>
      <p>This is the day that breaks you open in the best way. The trail crosses beneath the Tofane massif and climbs to the Forcella Lagazuoi pass at 2,752 metres. If the weather is clear — check the forecast carefully — the view from the top encompasses half of the Dolomites. Then you take the cable car down if your knees are done, or walk if they aren't. The rifugio at the top has a sunset terrace where, on good evenings, the entire sky turns pink and everyone stops talking.</p>
      <p>Solo female hiking in the Dolomites is common, safe, and warmly welcomed by the rifugio culture. You will not feel alone. You will feel, entirely, like yourself.</p>
    `,
  },
};

/* ══════════════════════════════════
   MODAL HELPERS
══════════════════════════════════ */
function openOverlay(overlayId) {
  const el = document.getElementById(overlayId);
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  el.scrollTop = 0;
  el.querySelector('.dest-modal, .article-modal')?.scrollTo(0, 0);
}
function closeOverlay(overlayId) {
  document.getElementById(overlayId).classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay background click
['dest-overlay','article-overlay'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', e => { if (e.target === el) closeOverlay(id); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeOverlay('dest-overlay');
    closeOverlay('article-overlay');
  }
});
document.getElementById('dest-close')?.addEventListener('click',    () => closeOverlay('dest-overlay'));
document.getElementById('article-close')?.addEventListener('click', () => closeOverlay('article-overlay'));

/* ── Destination modal ── */
function openDestModal(destKey) {
  const d = DESTINATIONS[destKey];
  if (!d) return;

  document.getElementById('dest-modal-img').src     = d.image;
  document.getElementById('dest-modal-img').alt     = d.name;
  document.getElementById('dest-modal-country').textContent     = d.country;
  document.getElementById('dest-modal-name').textContent        = d.name;
  document.getElementById('dest-modal-stars').textContent       = '★★★★★'.slice(0, Math.round(parseFloat(d.rating)));
  document.getElementById('dest-modal-rating-text').textContent = d.ratingText;
  document.getElementById('dest-safety-badge').textContent      = d.safety;
  document.getElementById('dest-tip-text').textContent          = d.tip;

  // Places grid
  const grid = document.getElementById('places-grid');
  grid.innerHTML = d.places.map(p => `
    <div class="place-card">
      <div class="place-card-top">
        <span class="place-emoji">${p.emoji}</span>
        <span class="place-name">${p.name}</span>
      </div>
      <p class="place-desc">${p.desc}</p>
    </div>
  `).join('');

  // Facts
  const factsRow = document.getElementById('dest-facts-row');
  factsRow.innerHTML = d.facts.map(f => `
    <div class="dest-fact">
      <strong>${f.label}</strong>
      <span>${f.value}</span>
    </div>
  `).join('');

  openOverlay('dest-overlay');
}

/* ── Article modal ── */
function openArticleModal(articleKey) {
  const a = ARTICLES[articleKey];
  if (!a) return;

  document.getElementById('article-modal-img').src        = a.image;
  document.getElementById('article-modal-img').alt        = a.title;
  document.getElementById('article-modal-tag').textContent    = a.tag;
  document.getElementById('article-modal-title').textContent  = a.title;
  document.getElementById('article-modal-avatar').src     = a.author.avatar;
  document.getElementById('article-modal-author').textContent = a.author.name;
  document.getElementById('article-modal-date').textContent   = a.date;
  document.getElementById('article-modal-time').textContent   = a.time;
  document.getElementById('article-modal-content').innerHTML  = a.content;
  document.getElementById('article-box-avatar').src       = a.author.avatar;
  document.getElementById('article-box-name').textContent     = a.author.name;
  document.getElementById('article-box-bio').textContent      = a.author.bio;

  openOverlay('article-overlay');
}

/* ── Wire up destination cards ── */
document.querySelectorAll('.dest-card[data-dest]').forEach(card => {
  card.addEventListener('click', () => openDestModal(card.dataset.dest));
});

/* ── Wire up article/post cards ── */
document.querySelectorAll('[data-article]').forEach(card => {
  card.addEventListener('click', () => openArticleModal(card.dataset.article));
  card.style.cursor = 'pointer';
});

/* ══════════════════════════════════
   GALLERY LIGHTBOX
══════════════════════════════════ */
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lightbox-img');
const lbCaption    = document.getElementById('lightbox-caption');
const lbClose      = document.getElementById('lightbox-close');
const lbPrev       = document.getElementById('lightbox-prev');
const lbNext       = document.getElementById('lightbox-next');
let lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  const item = galleryItems[i];
  const img  = item.querySelector('img');
  lbImg.src     = img.src.replace(/w=\d+/, 'w=1200');
  lbImg.alt     = img.alt;
  lbCaption.textContent = item.dataset.caption || img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
function moveLightbox(dir) { lbIndex = (lbIndex + dir + galleryItems.length) % galleryItems.length; openLightbox(lbIndex); }

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
  item.setAttribute('tabindex', '0');
  item.addEventListener('keydown', e => { if (e.key === 'Enter') openLightbox(i); });
});
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click',  () => moveLightbox(-1));
lbNext.addEventListener('click',  () => moveLightbox(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  moveLightbox(-1);
  if (e.key === 'ArrowRight') moveLightbox(1);
});

/* ══════════════════════════════════
   VIDEO PLAYER
══════════════════════════════════ */
const videoPlayer  = document.getElementById('video-player');
const videoPlayBtn = document.getElementById('video-play-btn');
const videoIframe  = document.getElementById('video-iframe');
if (videoPlayBtn) {
  videoPlayBtn.addEventListener('click', () => {
    videoIframe.src = videoIframe.dataset.src;
    videoPlayer.classList.add('playing');
  });
}

/* ══════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════ */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-a').style.maxHeight = item.querySelector('.faq-a').scrollHeight + 'px';
    }
  });
});

/* ══════════════════════════════════
   STICKY HEADER
══════════════════════════════════ */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ══════════════════════════════════
   MOBILE NAV
══════════════════════════════════ */
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
navToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  navToggle.classList.remove('open');
}));

/* ══════════════════════════════════
   SCROLL TOP
══════════════════════════════════ */
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ══════════════════════════════════
   FADE-UP OBSERVER
══════════════════════════════════ */
const fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => io.observe(el));
} else { fadeEls.forEach(el => el.classList.add('visible')); }

/* ══════════════════════════════════
   NEWSLETTER FORMS
══════════════════════════════════ */
function handleForm(id) {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    if (!email.value.trim() || !email.value.includes('@')) { shakeInput(email); return; }
    showToast('🌸 Welcome to SweetTravel! Check your inbox.');
    spawnConfetti();
    form.reset();
  });
}
handleForm('newsletter-form');
handleForm('sidebar-form');

function shakeInput(el) {
  el.style.animation = 'none'; void el.offsetHeight;
  el.style.animation = 'shake .4s ease';
  el.style.borderColor = 'var(--rose-4)';
  setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 700);
}

/* ══════════════════════════════════
   TOAST
══════════════════════════════════ */
function showToast(msg) {
  document.querySelector('.st-toast')?.remove();
  const t = document.createElement('div');
  t.className = 'st-toast'; t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  }));
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => t.remove(), 400);
  }, 3800);
}

/* ══════════════════════════════════
   CONFETTI
══════════════════════════════════ */
function spawnConfetti() {
  const colors = ['#f9c4d8','#e0638e','#c9a882','#f0e6d9','#ffffff','#f4a1bc'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position:fixed; top:0; left:${Math.random()*100}vw;
      width:${6+Math.random()*8}px; height:${6+Math.random()*8}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>.5?'50%':'2px'};
      pointer-events:none; z-index:9999;
      animation:confettiFall ${1.5+Math.random()*2}s ease ${Math.random()*1.5}s forwards;
    `;
    document.body.appendChild(c);
    c.addEventListener('animationend', () => c.remove());
  }
}

/* ── Trip-type cards (open matching article) ── */
document.querySelectorAll('.triptype-card[data-article]').forEach(card => {
  card.addEventListener('click', () => openArticleModal(card.dataset.article));
  card.style.cursor = 'pointer';
});

/* ── Tag pills ── */
document.querySelectorAll('.tag-pill').forEach(p => {
  p.addEventListener('click', () => showToast(`🏷 Filtering by: ${p.textContent.trim()}`));
});

/* ══════════════════════════════════
   TRAVEL STYLE QUIZ
══════════════════════════════════ */
const QUIZ_PROFILES = {
  beach: {
    emoji: '🏖️',
    title: 'The Beach & Sun Seeker',
    desc: 'You\'re made for golden sunsets, salty hair, and the sound of waves. You travel to fully switch off — vitamin D is your medicine and a good book on a sunbed is your definition of heaven. You don\'t need a packed itinerary; you need a perfect stretch of water.',
    dests: ['Santorini', 'Bali', 'Canary Islands', 'Amalfi Coast', 'Sri Lanka'],
    articles: ['greek-islands', 'packing-list'],
  },
  adventure: {
    emoji: '🏔️',
    title: 'The Wild at Heart Adventurer',
    desc: 'You collect summits, not souvenirs. The harder the trail, the more alive you feel. Comfort zones are for other trips — you\'re here for views that make your lungs ache and achievements that make you cry at the top.',
    dests: ['Dolomites', 'New Zealand', 'Patagonia', 'Nepal', 'Scottish Highlands'],
    articles: ['solo-hiking', 'dolomites'],
  },
  food: {
    emoji: '🍜',
    title: 'The Flavour Chaser',
    desc: 'Every destination is a new menu. You travel with your stomach and your heart — following your nose into unmarked doorways, sitting at plastic tables, and letting the food tell you everything the guidebook forgot to mention.',
    dests: ['Marrakech', 'Tokyo', 'Mexico City', 'Bologna', 'Hanoi'],
    articles: ['marrakech-food', 'slow-cafes'],
  },
  city: {
    emoji: '🌆',
    title: 'The City Explorer',
    desc: 'You\'re at your best in a city you don\'t yet know. Give you a neighbourhood to get lost in, a café to camp out in, and a museum that ruins you for the rest of the week — and you\'re completely happy.',
    dests: ['Paris', 'Amsterdam', 'Tokyo', 'Barcelona', 'Vienna'],
    articles: ['paris-48h', 'greek-islands'],
  },
  wellness: {
    emoji: '🧘',
    title: 'The Soul Seeker',
    desc: 'You travel to come home to yourself. Quiet mornings, space to breathe, and the absence of notifications. You return from holidays transformed, not just rested — and everyone notices.',
    dests: ['Bali', 'Iceland', 'Kyoto', 'Azores', 'Tuscany'],
    articles: ['slow-cafes', 'japan-sakura'],
  },
  nature: {
    emoji: '🌿',
    title: 'Into the Wild',
    desc: 'Concrete jungles bore you. You want creatures, canopies, rivers you can drink from, and the feeling of being very small in a very big, very alive world. Wi-Fi is optional; wonder is not.',
    dests: ['Costa Rica', 'Borneo', 'Kenya', 'Galápagos', 'Slovenia'],
    articles: ['dolomites', 'solo-hiking'],
  },
};

/* ── Quiz state ── */
let quizStep = 0;
const quizScores = { beach: 0, adventure: 0, food: 0, city: 0, wellness: 0, nature: 0 };
const TOTAL_STEPS = 5;

const quizProgressBar = document.getElementById('quiz-progress-bar');
const quizStepLabel   = document.getElementById('quiz-step-label');
const quizStepsWrap   = document.getElementById('quiz-steps-wrap');
const quizResult      = document.getElementById('quiz-result');

function updateProgress() {
  const pct = Math.round((quizStep / TOTAL_STEPS) * 100);
  if (quizProgressBar) quizProgressBar.style.width = pct + '%';
  if (quizStepLabel) quizStepLabel.textContent = quizStep < TOTAL_STEPS
    ? `Question ${quizStep + 1} of ${TOTAL_STEPS}`
    : 'Your result ✨';
}

function goToStep(n) {
  const steps = quizStepsWrap ? quizStepsWrap.querySelectorAll('.quiz-step') : [];
  steps.forEach(s => s.classList.remove('active'));
  const target = quizStepsWrap ? quizStepsWrap.querySelector(`[data-step="${n}"]`) : null;
  if (target) target.classList.add('active');
  quizStep = n;
  updateProgress();
}

function showQuizResult() {
  // Find winner
  const winner = Object.entries(quizScores).sort((a, b) => b[1] - a[1])[0][0];
  const profile = QUIZ_PROFILES[winner];
  if (!profile) return;

  if (quizStepsWrap) quizStepsWrap.style.display = 'none';
  if (quizStepLabel) quizStepLabel.textContent = 'Your result ✨';
  if (quizProgressBar) quizProgressBar.style.width = '100%';

  document.getElementById('result-emoji').textContent  = profile.emoji;
  document.getElementById('result-title').textContent  = profile.title;
  document.getElementById('result-desc').textContent   = profile.desc;

  // Destination pills
  const pillsEl = document.getElementById('result-dest-pills');
  pillsEl.innerHTML = profile.dests.map(d => {
    // Check if it matches a known dest key
    const key = Object.keys(DESTINATIONS).find(k => DESTINATIONS[k].name === d);
    return `<button class="result-dest-pill" ${key ? `data-dest="${key}"` : ''}>${d}</button>`;
  }).join('');
  pillsEl.querySelectorAll('[data-dest]').forEach(btn => {
    btn.addEventListener('click', () => openDestModal(btn.dataset.dest));
  });

  // Article cards
  const artEl = document.getElementById('result-article-cards');
  artEl.innerHTML = profile.articles.map(id => {
    const a = ARTICLES[id];
    if (!a) return '';
    return `
      <div class="result-article-card" data-article="${id}">
        <img src="${a.image}" alt="${a.title}" loading="lazy">
        <div class="result-article-card-body">
          <p class="result-article-tag">${a.tag}</p>
          <p class="result-article-title">${a.title}</p>
        </div>
      </div>`;
  }).join('');
  artEl.querySelectorAll('[data-article]').forEach(card => {
    card.addEventListener('click', () => openArticleModal(card.dataset.article));
  });

  if (quizResult) quizResult.style.display = 'block';
  spawnConfetti();
}

function resetQuiz() {
  Object.keys(quizScores).forEach(k => quizScores[k] = 0);
  quizStep = 0;
  if (quizStepsWrap) {
    quizStepsWrap.style.display = '';
    quizStepsWrap.querySelectorAll('.quiz-opt, .quiz-opt-img').forEach(b => b.classList.remove('selected'));
  }
  if (quizResult) quizResult.style.display = 'none';
  goToStep(0);
}

/* ── Bind option clicks ── */
if (quizStepsWrap) {
  quizStepsWrap.querySelectorAll('.quiz-opt, .quiz-opt-img').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.closest('.quiz-step');
      // Highlight selection briefly
      step.querySelectorAll('.quiz-opt, .quiz-opt-img').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      // Record score
      const type = btn.dataset.type;
      if (type && quizScores[type] !== undefined) quizScores[type]++;
      // Advance after short delay so selection is visible
      const nextStep = parseInt(step.dataset.step) + 1;
      setTimeout(() => {
        if (nextStep < TOTAL_STEPS) {
          goToStep(nextStep);
        } else {
          showQuizResult();
        }
      }, 320);
    });
  });
}

document.getElementById('quiz-restart')?.addEventListener('click', resetQuiz);
updateProgress();

/* ── Active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      document.querySelector(`.nav-links a[href="#${e.target.id}"]`)?.style.setProperty('color','var(--rose-5)');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe && sections.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const act = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (act) act.style.color = 'var(--rose-5)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(s)
);
