import type { PhotoOptions } from '@/util/get-image';

type DestinationPhoto = Omit<PhotoOptions, 'width' | 'height'> & { alt: string };

export const HOME_DESTINATION_IMAGES = {
  southPacific: {
    name: 'polynesia-02',
    folder: 'polynesia',
    sourceWidth: 2048,
    sourceHeight: 1556,
    alt: 'Serendipity I at anchor in a Marquesas bay beneath green volcanic mountains',
  },
  frangipani: {
    name: 'polynesia-06',
    folder: 'polynesia',
    sourceWidth: 2048,
    sourceHeight: 1536,
    alt: 'White frangipani flowers frame a blue Marquesas bay, with Serendipity I at anchor beyond',
  },
} satisfies Record<string, DestinationPhoto>;

export const home = {
  title: 'Charter Sailing Yacht | Set Sails. Now.',
  description:
    'Set sail aboard Serendipity I, a 45-metre Perini Navi sailing yacht for eight guests. Discover the South Pacific until summer 2028.',
  hero: {
    eyebrow: 'Serendipity I · Private sailing charters',
    title: ['Let the world', 'wait.'],
    line: 'Your own course. Your own kind of extraordinary.',
    link: 'Discover life on board',
    caption: '45 metres of possibility',
    location: 'South Pacific · Until summer 2028',
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
    { value: '45', unit: 'metres', detail: 'Perini Navi' },
    { value: '8', unit: 'guests', detail: 'Your inner circle' },
    { value: '4', unit: 'cabins', detail: 'Room to unwind' },
    { value: '7', unit: 'crew', detail: 'Every detail considered' },
  ],
  introduction: {
    eyebrow: 'A different rhythm',
    title: 'Somewhere between\nthe sea and yourself.',
    body: 'A quiet anchorage. A long lunch that becomes an afternoon. The people you love, with nowhere else to be. Aboard Serendipity I, the days follow your lead.',
    detail:
      'Built by Perini Navi in 2011, this 45-metre sailing yacht brings eight guests together in the places best reached by sea. Tell us what draws you to the water. We’ll shape the journey around it.',
    link: 'Explore the yacht',
    image: {
      name: 'outside-1',
      alt: 'The shaded aft deck with a teak dining table, cream seating and an open sea view',
    },
    caption: 'A table with an ever-changing view.',
  },
  onboard: {
    eyebrow: 'Life, beautifully unhurried',
    title: 'Make yourself at sea.',
    body: 'Bare feet on teak. A swim before breakfast. A favourite corner to read. There is space here for whatever the day brings.',
    chapters: [
      {
        number: '01',
        title: 'A little room to retreat.',
        label: 'The interiors',
        href: '/about/#interior-title',
        image: {
          name: 'inside-37',
          alt: 'The full-beam owner’s cabin with a queen-size bed, pale upholstery and soft lighting',
        },
      },
      {
        number: '02',
        title: 'All the time in the world.',
        label: 'The open air',
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
    title: 'Wild wonders and active adventures in the South Pacific',
    body: 'Dazzled by a rainbow of colors, French artist Gauguin found endless inspiration in the South Pacific’s romantically remote islands — invitingly blue ocean, deliciously pink frangipani flowers, and precious black pearls darker than the night.',
    locations: 'French Polynesia · Cook Islands · Fiji',
    paragraphs: [
      'Serendipity I will sail the South Pacific until the summer of 2028. Discover the 121 islands of French Polynesia, favored for their pristine beaches and rich culture. Play with dolphins in Rangiroa’s Tiputa Pass, or have a Polynesian tattoo inked by a traditional artist.',
      'Further afield, the far-flung Marquesas Islands are the heartland of an ancient Polynesian belief system. Spiritually revived by a younger generation, temple ruins and tiki statues serve as a link to seafaring ancestors.',
      'Even today, life in the archipelago revolves around water. From the humpbacks greeting snorkellers in Moorea between mid-August and mid-October to the Olympics-worthy waves challenging surfers on Tahiti, this is a destination ruled by marine giants.',
    ],
    imageCaption: 'An arrival in the Marquesas Islands.',
    frangipaniCaption: 'The colors of the South Pacific.',
    link: 'Tailor your trip',
  },
  crew: {
    eyebrow: 'Thoughtful, by nature',
    title: 'The art of feeling\nat home.',
    body: 'Seven experienced crew, one shared instinct: knowing when to step in and when to leave you to the moment. From your first coffee to a celebration under the stars, the details are in good hands.',
    link: 'Meet your crew',
    image: {
      name: 'food-11',
      alt: 'Fresh juices and warm pastries laid out for breakfast aboard Serendipity I',
    },
  },
  film: {
    eyebrow: 'A moment aboard',
    title: 'This is what freedom feels like.',
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
