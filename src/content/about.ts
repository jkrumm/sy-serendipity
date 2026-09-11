export const aboutImages = {
  aftDeck: {
    name: 'outside-1',
    alt: 'Sheltered aft deck with a dining table, white sofas and teak flooring overlooking the water',
  },
  ownersCabin: {
    name: 'inside-37',
    alt: 'The full-beam owner’s cabin with a queen-size bed, pale furnishings and a desk',
  },
  saloon: {
    name: 'inside-8',
    alt: 'The light-filled saloon with generous sofas, a red rug and a formal dining table',
  },
  yoga: {
    name: 'sport-11',
    alt: 'Two guests practising yoga on the teak deck beneath the sails',
  },
  sailing: {
    name: 'ship-38',
    alt: 'A small sailing dinghy beside the stern of Serendipity I in a sheltered anchorage',
  },
};

type DestinationPhoto = {
  name: string;
  alt: string;
  folder: 'polynesia';
  sourceWidth: number;
  sourceHeight: number;
  maxWidth: number;
};

export const ABOUT_DESTINATION_PHOTOS: Record<
  'cookIslands' | 'frenchPolynesia' | 'marquesasWaterfall' | 'fiji',
  DestinationPhoto | null
> = {
  cookIslands: null,
  frenchPolynesia: {
    name: 'polynesia-28',
    alt: 'Serendipity I anchored in deep blue water beside a forested Polynesian motu and turquoise reef',
    folder: 'polynesia',
    sourceWidth: 2048,
    sourceHeight: 1154,
    maxWidth: 1800,
  },
  marquesasWaterfall: {
    name: 'polynesia-01',
    alt: 'A waterfall descending into a pool beneath lush green cliffs in the Marquesas Islands',
    folder: 'polynesia',
    sourceWidth: 4032,
    sourceHeight: 3024,
    maxWidth: 1800,
  },
  fiji: null,
};

export const aboutContent = {
  meta: {
    title: 'About',
    description:
      'Serendipity I is a 45 m Perini Navi sailing yacht with four cabins for eight guests and seven crew, cruising the South Pacific until summer 2028.',
  },
  intro: {
    eyebrow: 'Serendipity I',
    title: 'The yacht',
    description:
      'Serendipity I is a 45 m Perini Navi sailing yacht, built in 2011. She accommodates eight guests in four cabins, with seven crew.',
  },
  facts: [
    { value: '45 m', label: 'Length' },
    { value: '8', label: 'Guests' },
    { value: '4', label: 'Cabins' },
    { value: '7', label: 'Crew' },
  ],
  interior: {
    eyebrow: 'Accommodation',
    title: 'Four guest cabins',
    paragraphs: [
      'The yacht accommodates eight guests in four cabins. The full-beam owner’s cabin aft has a queen-size bed, walk-in closets, a desk and a large en suite.',
      'Two twin cabins convert to suit your party, while the gym becomes a fourth, small double cabin when needed. Every cabin has en suite shower facilities.',
    ],
  },
  sharedSpaces: {
    eyebrow: 'Living areas',
    title: 'Saloon and decks',
    paragraphs: [
      'The interior uses natural wood, leather and organic cotton. The decks have daybeds, beanbags and dining areas.',
      'The saloon has large U-shaped sofas, formal dining, an office area and a corner bar. Sliding doors open to the outdoor dining and lounge area in the aft cockpit.',
    ],
  },
  activities: {
    eyebrow: 'Equipment',
    title: 'Water sports and fitness',
    description:
      'Equipment is available for sailing, diving, snorkelling, paddling, water skiing and exercise on board.',
    waterLabel: 'On the water',
    waterToys: [
      'Seabobs',
      'Tiwal 3 sailing dinghy',
      'SUP boards',
      'Kayak',
      'Scuba diving and snorkelling equipment in various sizes',
      'eFoil',
      'Wakeboard',
      'Water skis for children and adults',
      'Wetsuits',
      'Water doughnut',
    ],
    deckLabel: 'On deck & ashore',
    deckToys: [
      'Weights, skipping rope and Therabands',
      'Yoga mats',
      'Volleyball, football and ping pong rackets',
    ],
  },
  cruising: {
    eyebrow: 'Until summer 2028',
    title: 'South Pacific cruising',
    season: 'Serendipity I will sail the South Pacific until the summer of 2028.',
    introduction:
      'Cruising areas include the Cook Islands, French Polynesia and Fiji. Activities include snorkelling, diving, surfing and visits to local communities and cultural sites.',
    photographs: [
      ABOUT_DESTINATION_PHOTOS.marquesasWaterfall,
      ABOUT_DESTINATION_PHOTOS.frenchPolynesia,
    ],
    passages: [
      {
        id: 'cook-islands',
        title: 'The Cook Islands',
        image: ABOUT_DESTINATION_PHOTOS.cookIslands,
        paragraphs: [
          'The Cook Islands offer black pearls and swimming in waters with sea turtles and fish.',
        ],
      },
      {
        id: 'french-polynesia',
        title: 'French Polynesia',
        image: null,
        paragraphs: [
          'Tahiti and Bora Bora have tropical beaches, coral reefs, water sports and beachfront resorts. Cruising to the more remote parts of the Tuamotu, Marquesas and Society Islands provides access to local traditions, artisanal villages, uninhabited atolls and archaeological sites.',
        ],
      },
      {
        id: 'fiji',
        title: 'Fiji',
        image: ABOUT_DESTINATION_PHOTOS.fiji,
        paragraphs: [
          'Fijian welcomes include the Bula Muleya song and salusalu flower garlands. Bula means “life” and is also used as a greeting and a blessing. Local activities include kava ceremonies, coconut bowling and lovo cooking.',
          'Fiji’s islands have white-sand beaches, rainforests, limestone caves and soft-coral reefs. Activities include rainforest canopy tours, shark dives and surfing at Cloudbreak.',
          'Scuba divers can visit over 44 sites, including a plane wreck, pinnacles and underwater caves, with turtles, sharks, manta rays, marlin and barracuda.',
        ],
      },
    ],
    link: 'Destinations',
    href: '/#destinations',
  },
  technical: {
    eyebrow: 'Construction',
    title: 'Specifications',
    description:
      'Built by Perini Navi in 2011, Serendipity I pairs a steel hull with an aluminium superstructure. Interior design is by Perini Navi; exterior design is by Ron Holland.',
    specifications: [
      { label: 'Length overall', value: '45 m / 147′8″' },
      { label: 'Beam / draft', value: '9.73 m / 3.9 m' },
      { label: 'Gross tonnage', value: '325 tons' },
      { label: 'Engines', value: '1,100 hp each' },
      { label: 'Cruising / maximum speed', value: '10.5 / 14 knots' },
      { label: 'Classification', value: 'ABS classed · MCA compliant' },
    ],
    link: 'View the full specifications',
    href: '/technical/',
  },
  crew: {
    eyebrow: 'Service',
    title: 'Seven crew',
    description:
      'The seven-person crew includes Captain Scott Waterfield, Chief Stewardess Renee Weatherall and Chef Max.',
    link: 'Crew profiles',
    href: '/crew/',
  },
};
