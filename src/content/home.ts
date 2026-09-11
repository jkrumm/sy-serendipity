import type { PhotoOptions } from '@/util/get-image';

type DestinationPhoto = Omit<PhotoOptions, 'width' | 'height'> & { alt: string };

export const HOME_DESTINATION_IMAGES = {
  marquesasBay: {
    name: 'polynesia-03',
    folder: 'polynesia',
    sourceWidth: 4000,
    sourceHeight: 2256,
    alt: 'Serendipity I anchored in a deep blue Marquesas bay below volcanic cliffs',
  },
  marquesasAnchorage: {
    name: 'polynesia-02',
    folder: 'polynesia',
    sourceWidth: 2048,
    sourceHeight: 1556,
    alt: 'Serendipity I at anchor in a Marquesas bay beneath green volcanic mountains',
  },
  reefAnchorage: {
    name: 'polynesia-12',
    folder: 'polynesia',
    sourceWidth: 2714,
    sourceHeight: 1530,
    alt: 'Serendipity I at anchor in deep blue water beside a reef-fringed Polynesian motu',
  },
} satisfies Record<string, DestinationPhoto>;

export const HOME_TAILOR_PHOTOS = {
  marquesasWaterfall: {
    name: 'polynesia-01',
    folder: 'polynesia',
    sourceWidth: 4032,
    sourceHeight: 3024,
    alt: 'A waterfall descending into a pool beneath lush green cliffs in the Marquesas Islands',
  },
  tuamotuReef: {
    name: 'polynesia-28',
    folder: 'polynesia',
    sourceWidth: 2048,
    sourceHeight: 1154,
    alt: 'Serendipity I anchored in deep blue water beside a forested Polynesian motu and turquoise reef',
  },
} satisfies Record<string, DestinationPhoto>;

export const home = {
  title: 'Private Sailing Yacht Charter',
  description:
    'Serendipity I is a 45-metre Perini Navi sailing yacht for eight guests, available for private charter in the South Pacific until summer 2028.',
  hero: {
    eyebrow: '45-metre Perini Navi sailing yacht',
    title: 'Serendipity I',
    line: 'South Pacific until summer 2028.',
    link: 'Enquire about a charter',
    desktop: {
      name: 'ship-16',
      old: true,
      alt: 'Serendipity I under full sail, cutting through the open sea',
    },
    mobile: {
      name: 'ship-11',
      old: true,
      alt: 'Serendipity I seen from above, her white sails against the deep sea',
    },
  },
  facts: [
    { value: '45', unit: 'metres' },
    { value: '8', unit: 'guests' },
    { value: '4', unit: 'cabins' },
    { value: '7', unit: 'crew' },
  ],
  introduction: {
    eyebrow: 'Perini Navi · Built in 2011',
    title: 'Accommodation for eight guests',
    paragraphs: [
      'The yacht accommodates eight guests in four cabins. The full-beam owner’s cabin aft has a queen-size bed, walk-in closets, a desk and a large en suite.',
      'Two twin cabins convert to suit your party, while the gym becomes a fourth, small double cabin when needed. Every cabin has en suite shower facilities.',
      'The interior uses natural wood, leather and organic cotton. The decks have daybeds, beanbags and dining areas.',
      'The saloon has large U-shaped sofas, formal dining, an office area and a corner bar. Sliding doors open to the outdoor dining and lounge area in the aft cockpit.',
    ],
    links: [
      { label: 'Full specifications', href: '/technical/' },
      { label: 'Photographs of the interiors', href: '/gallery/#interiors' },
    ],
    image: {
      name: 'outside-1',
      alt: 'The shaded aft deck with a teak dining table, cream seating and an open sea view',
    },
    caption: 'Aft deck dining area',
  },
  onboard: {
    eyebrow: 'On board',
    title: 'Cabins and decks',
    body: 'The full-beam owner’s cabin is aft. Guest cabins have en suite facilities, and the decks have seating, sunbeds and dining space.',
    chapters: [
      {
        number: '01',
        title: 'Owner’s cabin',
        label: 'Accommodation',
        href: '/gallery/#interiors',
        image: {
          name: 'inside-37',
          alt: 'The full-beam owner’s cabin with a queen-size bed, pale upholstery and soft lighting',
        },
      },
      {
        number: '02',
        title: 'Open decks',
        label: 'Outdoor spaces',
        href: '/gallery/#decks',
        image: {
          name: 'outside-41',
          alt: 'The foredeck’s shade sail over turquoise bean bags, teak decking and a coastline beyond',
        },
      },
    ],
  },
  destinations: {
    eyebrow: 'Until summer 2028',
    title: 'Wild Wonders And Active Adventures In The South Pacific',
    lead: 'Dazzled by a rainbow of colors, French artist Gauguin found endless inspiration in the South Pacific’s romantically remote islands – invitingly blue ocean, deliciously pink frangipani flowers, and precious black pearls darker than the night.',
    locations: 'French Polynesia',
    paragraphs: [
      'Serendipity I will sail the South Pacific until the summer of 2028. Discover the 121 islands of French Polynesia, favored for their pristine beaches and rich culture. Play with dolphins in Rangiroa’s Tiputa Pass, or have a Polynesian tattoo inked by a traditional artist.',
      'Further afield, the far-flung Marquesas Islands are the heartland of an ancient Polynesian belief system. Spiritually revived by a younger generation, temple ruins and tiki statues serve as a link to seafaring ancestors. Even today, life in the archipelago revolves around water. From the humpbacks greeting snorkellers in Moorea between mid-August and mid-October to the Olympics-worthy waves challenging surfers on Tahiti, this is a destination ruled by marine giants.',
    ],
    openerCaption: 'Marquesas Islands, French Polynesia',
    anchorageCaption: 'At anchor in the Marquesas Islands',
    reefCaption: 'At anchor beside a Polynesian motu',
    tailor: {
      eyebrow: 'Cook Islands · French Polynesia · Fiji',
      title: 'Tailor your trip',
      paragraphs: [
        'There’s “off the beaten path” … and then there is this: a sailing trip to shine an inspiring new light on some truly extraordinary places, each offering its own vision of paradise on earth. In the Cook Islands, it’s black pearls and a chance to swim in clear waters alive with sea turtles and fish. The names Tahiti and Bora Bora conjure images of tropical beaches and endless coral reefs, yet there is so much more to French Polynesia than water sports and idyllic beachfront resorts. Nothing takes you deeper into the diverse cultures of this intriguing island nation, cruising to the far-flung edges of the Tuamotu, Marquesas and Society Islands to reveal local traditions, artisanal villages, uninhabited atolls and archeological finds seldom experienced by outsiders.',
        'No one sets foot on Fiji without being serenaded with the Bula Muleya, the smiling islanders’ singsong welcome, as they slip salusalu flower garlands over your head. Bula means “life”, but on this tropical archipelago in the South Pacific it’s used as a greeting and a blessing, too. Lean into the kava ceremonies, coconut bowling, and lovo cooking.',
        'The backdrop of castaway islands, white-sand beaches, lush rainforests, limestone caves and soft-coral reefs certainly doesn’t hurt, while rainforest canopy tours or shark dives are waiting around the corner. Fiji is governed by water, and surfers dream of the top-quality barrels at Cloudbreak. Scuba divers can log turtles, sharks, manta rays, marlin and barracuda at over 44 sites including a plane wreck, pinnacles and underwater caves. But far-flung Fiji has also perfected the pursuits of romance and relaxation: adopting the island’s go-with-the-flow attitude will leave space for moments of magic.',
      ],
      waterfallCaption: 'Marquesas Islands',
      reefCaption: 'Reef anchorage, French Polynesia',
    },
  },
  crew: {
    eyebrow: 'Crew of seven',
    title: 'Your crew',
    body: 'Captain Scott Waterfield, Chief Stewardess Renee Weatherall and Chef Max are part of the seven-person crew. They arrange your meals, activities and excursions on board and ashore.',
    link: 'Meet your crew',
    image: {
      name: 'food-11',
      alt: 'Fresh juices and warm pastries laid out for breakfast aboard Serendipity I',
    },
  },
  activities: {
    eyebrow: 'Activities',
    title: 'Water sports and fitness',
    body: 'Equipment is available for sailing, diving, snorkelling, paddling, water skiing and exercise on board: Seabobs, an eFoil, a Tiwal sailing dinghy, SUP boards, a kayak, wakeboard and water skis, plus yoga mats and weights on deck.',
    link: 'Explore activities',
    image: {
      name: 'sport-11',
      alt: 'Two guests practising yoga on the teak deck beneath the sails',
    },
  },
  film: {
    eyebrow: 'Film',
    title: 'Serendipity I under sail',
    button: 'Watch the film',
    close: 'Close film',
    source: 'https://ik.imagekit.io/bgmwrkfoi/sy-serendipty-1080.mov',
    image: {
      name: 'ship-21',
      old: true,
      alt: 'Serendipity I sailing towards the viewer, her bow lifting through the waves',
    },
  },
};
