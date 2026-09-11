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
    body: 'Serendipity I has four guest cabins, a saloon, indoor and outdoor dining areas, and open decks.',
    detail:
      'Seven crew operate the yacht and arrange meals, activities and excursions. Private charters are available in French Polynesia, the Cook Islands and Fiji.',
    link: 'Explore the yacht',
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
        href: '/about/#interior-title',
        image: {
          name: 'inside-37',
          alt: 'The full-beam owner’s cabin with a queen-size bed, pale upholstery and soft lighting',
        },
      },
      {
        number: '02',
        title: 'Open decks',
        label: 'Outdoor spaces',
        href: '/about/#activities-title',
        image: {
          name: 'deck-24',
          alt: 'Clear turquoise water just beyond the yacht’s sunlit teak deck',
        },
      },
    ],
  },
  destinations: {
    eyebrow: 'Until summer 2028',
    title: 'South Pacific charters',
    body: 'French artist Gauguin found inspiration in the South Pacific. Its islands have blue lagoons, pink frangipani flowers and black pearls.',
    locations: 'French Polynesia · Cook Islands · Fiji',
    paragraphs: [
      'Serendipity I will sail the South Pacific until summer 2028. French Polynesia has 121 islands, with beaches and local cultural traditions to explore. See dolphins in Rangiroa’s Tiputa Pass or visit a traditional Polynesian tattoo artist.',
      'In the Marquesas Islands, temple ruins and tiki statues record ancient Polynesian beliefs and seafaring ancestry. Younger generations are reviving these traditions.',
      'Humpback whales visit Moorea between mid-August and mid-October, when snorkelling excursions are possible. Tahiti is also a destination for surfing.',
    ],
    openerCaption: 'Marquesas Islands, French Polynesia',
    anchorageCaption: 'At anchor in the Marquesas Islands',
    reefCaption: 'At anchor beside a Polynesian motu',
    link: 'View cruising destinations',
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
