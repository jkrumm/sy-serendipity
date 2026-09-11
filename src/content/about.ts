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
  caption: string;
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
    caption: 'At anchor beside a reef-fringed Polynesian motu.',
    folder: 'polynesia',
    sourceWidth: 2048,
    sourceHeight: 1154,
    maxWidth: 1800,
  },
  marquesasWaterfall: {
    name: 'polynesia-01',
    alt: 'A waterfall descending into a pool beneath lush green cliffs in the Marquesas Islands',
    caption: 'A waterfall in the Marquesas Islands.',
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
      'Step aboard Serendipity I: 45 metres of Perini Navi craftsmanship, four cabins for eight guests, open decks and a world of possibilities.',
  },
  intro: {
    eyebrow: 'Life on board',
    title: 'The luxury of letting go.',
    description:
      'A quiet anchorage. An unhurried lunch. Space to be together, and room to find a little solitude. This is life aboard Serendipity I.',
  },
  heroCaption: 'Open to the sea. Sheltered from the everyday.',
  facts: [
    { value: '45 m', label: 'Length' },
    { value: '8', label: 'Guests' },
    { value: '4', label: 'Cabins' },
    { value: '7', label: 'Crew' },
  ],
  interior: {
    eyebrow: 'A place of your own',
    title: 'Rest comes naturally.',
    paragraphs: [
      'Four cabins welcome eight guests. The full-beam owner’s cabin aft has a queen-size bed, walk-in closets, a desk and a generous en suite.',
      'Two twin cabins convert to suit your party, while the gym becomes a fourth, small double cabin when needed. Every cabin has en suite shower facilities.',
    ],
    caption: 'The owner’s cabin, spanning the full beam.',
  },
  sharedSpaces: {
    eyebrow: 'Time together',
    title: 'Make yourself at home.',
    paragraphs: [
      'Natural wood, leather and organic cotton keep the mood easy. Outside, spacious decks, daybeds and beanbags invite you to settle in and watch the scenery change.',
      'Inside, the saloon brings together large U-shaped sofas, formal dining, an office area and a corner bar. Sliding doors open to al fresco dining and the lounge in the aft cockpit.',
    ],
    caption: 'The saloon, with space to gather or simply unwind.',
  },
  activities: {
    eyebrow: 'At your own pace',
    title: 'A day with no fixed plans.',
    description:
      'Start with yoga on deck, then take to the water. An unparalleled selection of water toys and on-board equipment lets everyone find their own rhythm.',
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
    yogaCaption: 'A little balance, with a sea view.',
    sailingCaption: 'An invitation to explore the anchorage.',
  },
  cruising: {
    eyebrow: 'Cruising the South Pacific',
    title: 'Tailor your trip',
    season: 'Serendipity I will sail the South Pacific until the summer of 2028.',
    introduction:
      'There’s “off the beaten path” … and then there is this: a sailing trip to shine an inspiring new light on some truly extraordinary places, each offering its own vision of paradise on earth.',
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
          'In the Cook Islands, it’s black pearls and a chance to swim in clear waters alive with sea turtles and fish.',
        ],
      },
      {
        id: 'french-polynesia',
        title: 'French Polynesia',
        image: null,
        paragraphs: [
          'The names Tahiti and Bora Bora conjure images of tropical beaches and endless coral reefs, yet there is so much more to French Polynesia than water sports and idyllic beachfront resorts. Nothing takes you deeper into the diverse cultures of this intriguing island nation than cruising to the far-flung edges of the Tuamotu, Marquesas and Society Islands to reveal local traditions, artisanal villages, uninhabited atolls and archeological finds seldom experienced by outsiders.',
        ],
      },
      {
        id: 'fiji',
        title: 'Fiji',
        image: ABOUT_DESTINATION_PHOTOS.fiji,
        paragraphs: [
          'No one sets foot on Fiji without being serenaded with the Bula Muleya, the smiling islanders’ singsong welcome, as they slip salusalu flower garlands over your head. Bula means “life”, but on this tropical archipelago in the South Pacific it’s used as a greeting and a blessing, too. Lean into the kava ceremonies, coconut bowling, and lovo cooking.',
          'The backdrop of castaway islands, white-sand beaches, lush rainforests, limestone caves and soft-coral reefs certainly doesn’t hurt, while rainforest canopy tours or shark dives are waiting around the corner. Fiji is governed by water, and surfers dream of the top-quality barrels at Cloudbreak. Scuba divers can log turtles, sharks, manta rays, marlin and barracuda at over 44 sites including a plane wreck, pinnacles and underwater caves.',
          'But far-flung Fiji has also perfected the pursuits of romance and relaxation: adopting the island’s go-with-the-flow attitude will leave space for moments of magic.',
        ],
      },
    ],
    link: 'Explore the destinations',
    href: '/#destinations',
  },
  technical: {
    eyebrow: 'The yacht',
    title: 'Italian craft. Ocean spirit.',
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
    eyebrow: 'Thoughtful by nature',
    title: 'Seven people. All for you.',
    description:
      'Captain Scott Waterfield, Chief Stewardess Renee Weatherall and Chef Max are among the seven crew who make life on board feel effortless.',
    link: 'Meet your crew',
    href: '/crew/',
  },
};
