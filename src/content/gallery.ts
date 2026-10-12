import type { ImageId } from '@/util/images';

export const GALLERY_COPY = {
  eyebrow: 'Serendipity I',
  title: 'Gallery',
  description:
    'Photographs of Serendipity I, including the decks, interiors, dining and activities.',
  intro: 'View the yacht, outdoor spaces, guest accommodation, food and activities on board.',
};

export type GalleryChapter =
  'yacht' | 'south-pacific' | 'decks' | 'interiors' | 'cuisine' | 'activities';

export type GalleryChapterHeading = { id: GalleryChapter; title: string };

export const GALLERY_CHAPTERS: GalleryChapterHeading[] = [
  { id: 'yacht', title: 'The Yacht' },
  { id: 'south-pacific', title: 'The Pacific' },
  { id: 'decks', title: 'Decks' },
  { id: 'interiors', title: 'Interiors' },
  { id: 'cuisine', title: 'Cuisine' },
  { id: 'activities', title: 'Activities' },
];

export type PhotoChoice = {
  name: ImageId;
  chapter: GalleryChapter;
  alt: string;
  layout?: 'full' | 'portrait' | 'companion';
};

/** A gallery photo with its URLs resolved at render time (`src/util/gallery-photos.ts`). */
export type GalleryPhoto = PhotoChoice & {
  index: number;
  number: string;
  crop: { width: number; height: number };
  thumbnail: string;
  thumbnailSrcSet: string;
  slide: {
    src: string;
    alt: string;
    width: number;
    height: number;
    srcSet: { src: string; width: number; height: number }[];
  };
};

export const GALLERY_IMAGES: PhotoChoice[] = [
  // Yacht
  {
    name: 'ship-1',
    chapter: 'yacht',
    alt: 'Serendipity I at anchor, her dark hull reflected in clear blue water',
    layout: 'full',
  },
  {
    name: 'ship-11',
    chapter: 'yacht',
    alt: 'The long bow of Serendipity I seen from the water with blue sky above',
  },
  {
    name: 'ship-18',
    chapter: 'yacht',
    alt: 'Side view of the yacht at anchor beside a sunlit coastline',
  },
  {
    name: 'ship-6',
    chapter: 'yacht',
    alt: 'Serendipity I at anchor under bare poles, full side profile against open sea and sky',
    layout: 'full',
  },

  // The Pacific
  {
    name: 'polynesia-02',
    chapter: 'south-pacific',
    alt: 'Serendipity I at anchor in a Marquesas bay beneath green volcanic mountains',
    layout: 'full',
  },
  {
    name: 'polynesia-21',
    chapter: 'south-pacific',
    alt: 'Aerial view straight down on Serendipity I anchored in a deep blue channel surrounded by reef and other yachts',
    layout: 'full',
  },
  {
    name: 'polynesia-12',
    chapter: 'south-pacific',
    alt: 'Aerial view of Serendipity I anchored beside a coral motu where turquoise shallows drop into deep blue water',
  },
  {
    name: 'polynesia-18',
    chapter: 'south-pacific',
    alt: 'Serendipity I approaching a Polynesian atoll at sunset, bow-on with the sun low on the horizon',
  },
  {
    name: 'polynesia-09',
    chapter: 'south-pacific',
    alt: 'Serendipity I under sail near a Polynesian atoll with a palm-fringed islet and another yacht in the distance',
    layout: 'portrait',
  },
  {
    name: 'polynesia-40',
    chapter: 'south-pacific',
    alt: 'Serendipity I anchored in a bay beneath steep, forested Marquesas peaks at sunset with other yachts nearby',
    layout: 'companion',
  },
  {
    name: 'polynesia-36',
    chapter: 'south-pacific',
    alt: 'Serendipity I at anchor on glassy calm water, her mast perfectly reflected at sunrise',
    layout: 'portrait',
  },
  {
    name: 'polynesia-06',
    chapter: 'south-pacific',
    alt: 'A frangipani blossom frames a distant view of Serendipity I anchored off the Marquesas coast',
    layout: 'companion',
  },
  {
    name: 'polynesia-37',
    chapter: 'south-pacific',
    alt: 'Black and white Tahitian pearls displayed on an open pearl oyster shell',
    layout: 'portrait',
  },
  {
    name: 'polynesia-32',
    chapter: 'south-pacific',
    alt: 'Serendipity I anchored near small reef islets at sunset with another yacht nearby',
    layout: 'companion',
  },

  // Decks
  {
    name: 'outside-8',
    chapter: 'decks',
    alt: 'The sheltered aft deck with a dining table, white sofas and views across the harbour',
    layout: 'full',
  },
  {
    name: 'deck-16',
    chapter: 'decks',
    alt: 'A view forward along the teak deck past the rigging to the open sea',
    layout: 'portrait',
  },
  {
    name: 'outside-24',
    chapter: 'decks',
    alt: 'The upper deck lounge seen from above, with white sofas beside turquoise water',
    layout: 'companion',
  },
  {
    name: 'outside-1',
    chapter: 'decks',
    alt: 'Warm sunlight across the teak aft deck and its shaded seating area',
  },
  {
    name: 'outside-15',
    chapter: 'decks',
    alt: 'White cushioned seating and a teak coffee table beside the upper-deck helm',
  },
  {
    name: 'deck-1',
    chapter: 'decks',
    alt: 'Teak side deck bordered by polished railings and sailing rigging',
  },
  {
    name: 'outside-34',
    chapter: 'decks',
    alt: 'Turquoise beanbags on the foredeck beneath a white sun awning',
  },
  {
    name: 'outside-11',
    chapter: 'decks',
    alt: 'Teak-treaded stairs curving from the aft deck to the flybridge, with the galley bar alongside',
  },
  {
    name: 'outside-20',
    chapter: 'decks',
    alt: 'Twin lounge sofas on the aft deck facing the flybridge canopy and helm',
  },
  {
    name: 'deck-24',
    chapter: 'decks',
    alt: 'A polished deck railing above sunlit teak and deep turquoise water',
  },
  {
    name: 'deck-23',
    chapter: 'decks',
    alt: 'The curved rail and bow seat pointing towards an empty sea horizon',
  },

  // Interiors
  {
    name: 'inside-8',
    chapter: 'interiors',
    alt: 'The bright main saloon with white sofas, a red rug and panoramic windows',
    layout: 'full',
  },
  {
    name: 'inside-91',
    chapter: 'interiors',
    alt: 'A massage table dressed in navy towels beneath a round porthole',
    layout: 'portrait',
  },
  {
    name: 'inside-18',
    chapter: 'interiors',
    alt: 'The curved saloon bar counter with fresh flowers and a window onto the water',
    layout: 'companion',
  },
  {
    name: 'inside-21',
    chapter: 'interiors',
    alt: 'A notebook and an espresso cup on a dark writing desk beside an orange chair',
    layout: 'portrait',
  },
  {
    name: 'inside-40',
    chapter: 'interiors',
    alt: 'A guest cabin with dark cabinetry and doors open to the ensuite beyond',
    layout: 'companion',
  },
  {
    name: 'inside-12',
    chapter: 'interiors',
    alt: 'The saloon dining counter with orange chairs and wide windows over the water',
  },
  {
    name: 'inside-37',
    chapter: 'interiors',
    alt: 'A double bed framed by white cabinetry and a curved sofa in the principal cabin',
  },
  {
    name: 'inside-34',
    chapter: 'interiors',
    alt: 'A spacious double cabin with dark blue bed linen and warm concealed lighting',
  },
  {
    name: 'inside-70',
    chapter: 'interiors',
    alt: 'A softly lit twin guest cabin with pale walls and navy bed covers',
  },
  {
    name: 'inside-54',
    chapter: 'interiors',
    alt: 'A bright en suite bathroom with twin basins, a wide mirror and a sea-facing porthole',
  },
  {
    name: 'inside-59',
    chapter: 'interiors',
    alt: 'A dual-basin bathroom vanity with a mirrored cabinet and woven amenity baskets',
  },
  {
    name: 'inside-51',
    chapter: 'interiors',
    alt: 'A reading sofa beside a built-in bookcase and a round porthole window',
  },
  {
    name: 'inside-55',
    chapter: 'interiors',
    alt: 'A cabin ensuite with a glass shower enclosure and a round porthole',
  },
  {
    name: 'inside-66',
    chapter: 'interiors',
    alt: 'A double guest cabin with navy cushions, white cabinetry and a porthole',
    layout: 'full',
  },
  {
    name: 'cockpit-1',
    chapter: 'interiors',
    alt: 'Wheelhouse navigation console and seating beside the saloon',
  },
  {
    name: 'cockpit-4',
    chapter: 'interiors',
    alt: 'Engine throttle and navigation screens on the wheelhouse console',
  },

  // Cuisine
  {
    name: 'food-4',
    chapter: 'cuisine',
    alt: 'A breakfast table on the aft deck with fresh juices, bread and pastries, the sea beyond',
    layout: 'full',
  },
  {
    name: 'food-11',
    chapter: 'cuisine',
    alt: 'Fresh orange and green juices beside pastries at the breakfast table',
  },
  {
    name: 'food-10',
    chapter: 'cuisine',
    alt: 'Bottled fresh juices, bread and fruit laid out on the aft deck with the sea beyond',
  },
  {
    name: 'food-19',
    chapter: 'cuisine',
    alt: 'A citrus cocktail and a tray of canapés in the late afternoon light',
  },
  {
    name: 'food-6',
    chapter: 'cuisine',
    alt: 'A breakfast spread on the aft deck with the flybridge staircase and galley behind',
  },

  // Activities
  {
    name: 'ship-38',
    chapter: 'activities',
    alt: 'A Tiwal sailing dinghy on the water beside the stern of Serendipity I',
    layout: 'full',
  },
  {
    name: 'sport-1',
    chapter: 'activities',
    alt: 'An inflatable paddleboard mounted at the bow above turquoise water',
    layout: 'portrait',
  },
  {
    name: 'dingi-2',
    chapter: 'activities',
    alt: "The yacht's RIB tender at anchor on calm blue water, its reflection beneath",
    layout: 'companion',
  },
  {
    name: 'sport-3',
    chapter: 'activities',
    alt: 'A red Seabob underwater scooter resting on the teak swim platform',
  },
  {
    name: 'outside-25',
    chapter: 'activities',
    alt: 'Overhead view of the stern with the Seabob, Tiwal dinghy and tender all rigged',
  },
  {
    name: 'polynesia-35',
    chapter: 'activities',
    alt: 'The RIB tender speeding across the lagoon with an island and reef beyond',
    layout: 'full',
  },
];
