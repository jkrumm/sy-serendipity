export const GALLERY_COPY = {
  eyebrow: 'Serendipity I',
  title: 'Gallery',
  description:
    'Photographs of Serendipity I, including the decks, interiors, dining and activities.',
  intro: 'View the yacht, outdoor spaces, guest accommodation, food and activities on board.',
  allLabel: 'All photographs',
  filterLabel: 'Filter photographs',
  imageLabel: 'photographs',
};

export type GalleryChapter = 'underway' | 'deck' | 'inside' | 'table' | 'water';

export const GALLERY_CHAPTERS: { id: GalleryChapter; title: string; description: string }[] = [
  { id: 'underway', title: 'The yacht', description: 'Exterior views of Serendipity I.' },
  { id: 'deck', title: 'Decks', description: 'Outdoor seating, dining areas and the foredeck.' },
  { id: 'inside', title: 'Interiors', description: 'The saloon, guest cabins and bathrooms.' },
  {
    id: 'table',
    title: 'Cuisine',
    description: 'Breakfast, cocktails and canapés served on board.',
  },
  { id: 'water', title: 'Activities', description: 'Sailing, sea scooters and yoga on deck.' },
];

type PhotoChoice = {
  name: string;
  chapter: GalleryChapter;
  caption: string;
  alt: string;
  layout?: 'full' | 'portrait' | 'companion';
};

export const GALLERY_IMAGES: PhotoChoice[] = [
  {
    name: 'ship-1',
    chapter: 'underway',
    caption: 'Serendipity I',
    alt: 'Serendipity I at anchor, her dark hull reflected in clear blue water',
    layout: 'full',
  },
  {
    name: 'ship-11',
    chapter: 'underway',
    caption: 'Bow view',
    alt: 'The long bow of Serendipity I seen from the water with blue sky above',
  },
  {
    name: 'ship-18',
    chapter: 'underway',
    caption: 'Side profile',
    alt: 'Side view of the yacht at anchor beside a sunlit coastline',
  },
  {
    name: 'ship-27',
    chapter: 'underway',
    caption: 'Yacht underway',
    alt: 'Serendipity I moving through the sea with a white wake beside her bow',
  },
  {
    name: 'ship-45',
    chapter: 'underway',
    caption: 'Bow platform',
    alt: 'A guest standing on the bow platform above deep blue water',
  },
  {
    name: 'ship-54',
    chapter: 'underway',
    caption: 'Steel hull',
    alt: 'Sunlight and rippling reflections along the dark steel hull',
    layout: 'full',
  },
  {
    name: 'outside-8',
    chapter: 'deck',
    caption: 'Aft deck seating and dining',
    alt: 'The sheltered aft deck with a dining table, white sofas and views across the harbour',
    layout: 'full',
  },
  {
    name: 'deck-16',
    chapter: 'deck',
    caption: 'Foredeck and rigging',
    alt: 'A view forward along the teak deck past the rigging to the open sea',
    layout: 'portrait',
  },
  {
    name: 'outside-24',
    chapter: 'deck',
    caption: 'Upper deck lounge',
    alt: 'The upper deck lounge seen from above, with white sofas beside turquoise water',
    layout: 'companion',
  },
  {
    name: 'outside-1',
    chapter: 'deck',
    caption: 'Aft deck',
    alt: 'Warm sunlight across the teak aft deck and its shaded seating area',
  },
  {
    name: 'outside-15',
    chapter: 'deck',
    caption: 'Upper deck seating',
    alt: 'White cushioned seating and a teak coffee table beside the upper-deck helm',
  },
  {
    name: 'deck-1',
    chapter: 'deck',
    caption: 'Teak side deck',
    alt: 'Teak side deck bordered by polished railings and sailing rigging',
  },
  {
    name: 'deck-11',
    chapter: 'deck',
    caption: 'Bow seat',
    alt: 'A small bow seat suspended over clear blue water between steel railings',
  },
  {
    name: 'outside-34',
    chapter: 'deck',
    caption: 'Foredeck shade awning',
    alt: 'Turquoise beanbags on the foredeck beneath a white sun awning',
  },
  {
    name: 'outside-38',
    chapter: 'deck',
    caption: 'Foredeck cushions',
    alt: 'A view out to sea between turquoise deck cushions beneath the shade of a sail',
  },
  {
    name: 'deck-24',
    chapter: 'deck',
    caption: 'Deck railing',
    alt: 'A polished deck railing above sunlit teak and deep turquoise water',
  },
  {
    name: 'deck-23',
    chapter: 'deck',
    caption: 'Bow seating and railings',
    alt: 'The curved rail and bow seat pointing towards an empty sea horizon',
  },
  {
    name: 'inside-8',
    chapter: 'inside',
    caption: 'Main saloon',
    alt: 'The bright main saloon with white sofas, a red rug and panoramic windows',
    layout: 'full',
  },
  {
    name: 'inside-34',
    chapter: 'inside',
    caption: 'Double cabin',
    alt: 'A spacious double cabin with dark blue bed linen and warm concealed lighting',
  },
  {
    name: 'inside-37',
    chapter: 'inside',
    caption: 'Principal cabin',
    alt: 'A double bed framed by white cabinetry and a curved sofa in the principal cabin',
  },
  {
    name: 'inside-12',
    chapter: 'inside',
    caption: 'Saloon dining counter',
    alt: 'The saloon dining counter with orange chairs and wide windows over the water',
  },
  {
    name: 'inside-21',
    chapter: 'inside',
    caption: 'Writing desk',
    alt: 'A notebook and an espresso cup on a dark writing desk beside an orange chair',
  },
  {
    name: 'inside-54',
    chapter: 'inside',
    caption: 'En suite bathroom',
    alt: 'A bright en suite bathroom with twin basins, a wide mirror and a sea-facing porthole',
  },
  {
    name: 'inside-70',
    chapter: 'inside',
    caption: 'Twin guest cabin',
    alt: 'A softly lit twin guest cabin with pale walls and navy bed covers',
  },
  {
    name: 'inside-66',
    chapter: 'inside',
    caption: 'Double guest cabin',
    alt: 'A double guest cabin with navy cushions, white cabinetry and a porthole',
    layout: 'full',
  },
  {
    name: 'food-2',
    chapter: 'table',
    caption: 'Outdoor breakfast table',
    alt: 'An outdoor breakfast table laid with blue napkins, fresh juices and glassware',
    layout: 'full',
  },
  {
    name: 'food-11',
    chapter: 'table',
    caption: 'Fresh juices and pastries',
    alt: 'Fresh orange and green juices beside pastries at the breakfast table',
    layout: 'portrait',
  },
  {
    name: 'food-8',
    chapter: 'table',
    caption: 'Breakfast service',
    alt: 'A breakfast spread of fruit, juice, bread and glassware on a turquoise tablecloth',
    layout: 'companion',
  },
  {
    name: 'food-14',
    chapter: 'table',
    caption: 'Cocktails on deck',
    alt: 'Cocktails and small bites on a teak coffee table in the open-air lounge',
  },
  {
    name: 'food-19',
    chapter: 'table',
    caption: 'Cocktail and canapés',
    alt: 'A citrus cocktail and a tray of canapés in the late afternoon light',
  },
  {
    name: 'food-16',
    chapter: 'table',
    caption: 'Aperitif service',
    alt: 'A pale cocktail with a dried citrus garnish beside an assortment of small bites',
    layout: 'full',
  },
  {
    name: 'ship-38',
    chapter: 'water',
    caption: 'Small-boat sailing',
    alt: 'A small sailing boat on the water beside the stern of Serendipity I',
    layout: 'full',
  },
  {
    name: 'ship-43',
    chapter: 'water',
    caption: 'Swim platform',
    alt: 'The open swim platform extending from the yacht just above the calm sea',
    layout: 'portrait',
  },
  {
    name: 'sport-2',
    chapter: 'water',
    caption: 'Sea scooter',
    alt: 'A red underwater sea scooter resting on the teak deck',
    layout: 'companion',
  },
  {
    name: 'sport-11',
    chapter: 'water',
    caption: 'Standing yoga on deck',
    alt: 'Two guests practising standing yoga on the foredeck beneath a white awning',
  },
  {
    name: 'sport-12',
    chapter: 'water',
    caption: 'Yoga on the foredeck',
    alt: 'Two guests stretching on yoga mats on the teak foredeck',
  },
];
