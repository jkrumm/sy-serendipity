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

export const GALLERY_CHAPTERS: { id: GalleryChapter; title: string; description: string }[] = [
  { id: 'yacht', title: 'The yacht', description: 'Exterior views of Serendipity I.' },
  {
    id: 'south-pacific',
    title: 'South Pacific',
    description: 'Serendipity I in French Polynesia, 2026.',
  },
  { id: 'decks', title: 'Decks', description: 'Outdoor seating, dining areas and the foredeck.' },
  {
    id: 'interiors',
    title: 'Interiors',
    description: 'The saloon, guest cabins, bathrooms and the wheelhouse.',
  },
  {
    id: 'cuisine',
    title: 'Cuisine',
    description: 'Breakfast, cocktails and canapés served on board.',
  },
  { id: 'activities', title: 'Activities', description: 'Sailing, sea scooters and yoga on deck.' },
];

type PhotoChoice = {
  name: ImageId;
  chapter: GalleryChapter;
  caption: string;
  alt: string;
  layout?: 'full' | 'portrait' | 'companion';
};

export const GALLERY_IMAGES: PhotoChoice[] = [
  // Yacht
  {
    name: 'ship-1',
    chapter: 'yacht',
    caption: 'Serendipity I',
    alt: 'Serendipity I at anchor, her dark hull reflected in clear blue water',
    layout: 'full',
  },
  {
    name: 'ship-11',
    chapter: 'yacht',
    caption: 'Bow view',
    alt: 'The long bow of Serendipity I seen from the water with blue sky above',
  },
  {
    name: 'ship-18',
    chapter: 'yacht',
    caption: 'Side profile',
    alt: 'Side view of the yacht at anchor beside a sunlit coastline',
  },
  {
    name: 'ship-27',
    chapter: 'yacht',
    caption: 'Yacht underway',
    alt: 'Serendipity I moving through the sea with a white wake beside her bow',
  },
  {
    name: 'ship-6',
    chapter: 'yacht',
    caption: 'Full profile',
    alt: 'Serendipity I at anchor under bare poles, full side profile against open sea and sky',
  },
  {
    name: 'ship-23',
    chapter: 'yacht',
    caption: 'Underway',
    alt: 'Serendipity I motoring through open water with a bow wave and no coastline in view',
  },
  {
    name: 'ship-45',
    chapter: 'yacht',
    caption: 'Bow platform',
    alt: 'A guest standing on the bow platform above deep blue water',
  },
  {
    name: 'ship-54',
    chapter: 'yacht',
    caption: 'Steel hull',
    alt: 'Sunlight and rippling reflections along the dark steel hull',
    layout: 'full',
  },

  // South Pacific
  {
    name: 'polynesia-02',
    chapter: 'south-pacific',
    caption: 'Marquesas anchorage',
    alt: 'Serendipity I at anchor in a Marquesas bay beneath green volcanic mountains',
    layout: 'full',
  },
  {
    name: 'polynesia-21',
    chapter: 'south-pacific',
    caption: 'Aerial view over the reef',
    alt: 'Aerial view straight down on Serendipity I anchored in a deep blue channel surrounded by reef and other yachts',
    layout: 'full',
  },
  {
    name: 'polynesia-12',
    chapter: 'south-pacific',
    caption: 'Reef drop-off from above',
    alt: 'Aerial view of Serendipity I anchored beside a coral motu where turquoise shallows drop into deep blue water',
  },
  {
    name: 'polynesia-18',
    chapter: 'south-pacific',
    caption: 'Sunset arrival at the atoll',
    alt: 'Serendipity I approaching a Polynesian atoll at sunset, bow-on with the sun low on the horizon',
  },
  {
    name: 'polynesia-09',
    chapter: 'south-pacific',
    caption: 'Under sail near an atoll',
    alt: 'Serendipity I under sail near a Polynesian atoll with a palm-fringed islet and another yacht in the distance',
    layout: 'portrait',
  },
  {
    name: 'polynesia-40',
    chapter: 'south-pacific',
    caption: 'Beneath the Marquesas peaks',
    alt: 'Serendipity I anchored in a bay beneath steep, forested Marquesas peaks at sunset with other yachts nearby',
    layout: 'companion',
  },
  {
    name: 'polynesia-36',
    chapter: 'south-pacific',
    caption: 'Still water at first light',
    alt: 'Serendipity I at anchor on glassy calm water, her mast perfectly reflected at sunrise',
    layout: 'portrait',
  },
  {
    name: 'polynesia-06',
    chapter: 'south-pacific',
    caption: 'Frangipani and the bay',
    alt: 'A frangipani blossom frames a distant view of Serendipity I anchored off the Marquesas coast',
    layout: 'companion',
  },
  {
    name: 'polynesia-37',
    chapter: 'south-pacific',
    caption: 'Black pearls',
    alt: 'Black and white Tahitian pearls displayed on an open pearl oyster shell',
    layout: 'portrait',
  },
  {
    name: 'polynesia-32',
    chapter: 'south-pacific',
    caption: 'Anchored among reef islets',
    alt: 'Serendipity I anchored near small reef islets at sunset with another yacht nearby',
    layout: 'companion',
  },

  // Decks
  {
    name: 'outside-8',
    chapter: 'decks',
    caption: 'Aft deck dining and seating',
    alt: 'The sheltered aft deck with a dining table, white sofas and views across the harbour',
    layout: 'full',
  },
  {
    name: 'deck-16',
    chapter: 'decks',
    caption: 'Foredeck and rigging',
    alt: 'A view forward along the teak deck past the rigging to the open sea',
    layout: 'portrait',
  },
  {
    name: 'outside-24',
    chapter: 'decks',
    caption: 'Upper deck lounge',
    alt: 'The upper deck lounge seen from above, with white sofas beside turquoise water',
    layout: 'companion',
  },
  {
    name: 'outside-1',
    chapter: 'decks',
    caption: 'Aft deck',
    alt: 'Warm sunlight across the teak aft deck and its shaded seating area',
  },
  {
    name: 'outside-15',
    chapter: 'decks',
    caption: 'Upper deck seating',
    alt: 'White cushioned seating and a teak coffee table beside the upper-deck helm',
  },
  {
    name: 'deck-1',
    chapter: 'decks',
    caption: 'Teak side deck',
    alt: 'Teak side deck bordered by polished railings and sailing rigging',
  },
  {
    name: 'outside-34',
    chapter: 'decks',
    caption: 'Foredeck shade awning',
    alt: 'Turquoise beanbags on the foredeck beneath a white sun awning',
  },
  {
    name: 'outside-11',
    chapter: 'decks',
    caption: 'Aft deck stairs',
    alt: 'Teak-treaded stairs curving from the aft deck to the flybridge, with the galley bar alongside',
  },
  {
    name: 'outside-20',
    chapter: 'decks',
    caption: 'Aft deck lounge',
    alt: 'Twin lounge sofas on the aft deck facing the flybridge canopy and helm',
  },
  {
    name: 'deck-24',
    chapter: 'decks',
    caption: 'Deck railing',
    alt: 'A polished deck railing above sunlit teak and deep turquoise water',
  },
  {
    name: 'deck-23',
    chapter: 'decks',
    caption: 'Bow seating and railings',
    alt: 'The curved rail and bow seat pointing towards an empty sea horizon',
  },

  // Interiors
  {
    name: 'inside-8',
    chapter: 'interiors',
    caption: 'Main saloon',
    alt: 'The bright main saloon with white sofas, a red rug and panoramic windows',
    layout: 'full',
  },
  {
    name: 'inside-91',
    chapter: 'interiors',
    caption: 'Spa treatment room',
    alt: 'A massage table dressed in navy towels beneath a round porthole',
    layout: 'portrait',
  },
  {
    name: 'inside-18',
    chapter: 'interiors',
    caption: 'Saloon bar',
    alt: 'The curved saloon bar counter with fresh flowers and a window onto the water',
    layout: 'companion',
  },
  {
    name: 'inside-21',
    chapter: 'interiors',
    caption: 'Writing desk',
    alt: 'A notebook and an espresso cup on a dark writing desk beside an orange chair',
    layout: 'portrait',
  },
  {
    name: 'inside-40',
    chapter: 'interiors',
    caption: 'Cabin overview',
    alt: 'A guest cabin with dark cabinetry and doors open to the ensuite beyond',
    layout: 'companion',
  },
  {
    name: 'inside-12',
    chapter: 'interiors',
    caption: 'Saloon dining counter',
    alt: 'The saloon dining counter with orange chairs and wide windows over the water',
  },
  {
    name: 'inside-37',
    chapter: 'interiors',
    caption: 'Principal cabin',
    alt: 'A double bed framed by white cabinetry and a curved sofa in the principal cabin',
  },
  {
    name: 'inside-34',
    chapter: 'interiors',
    caption: 'Double cabin',
    alt: 'A spacious double cabin with dark blue bed linen and warm concealed lighting',
  },
  {
    name: 'inside-70',
    chapter: 'interiors',
    caption: 'Twin guest cabin',
    alt: 'A softly lit twin guest cabin with pale walls and navy bed covers',
  },
  {
    name: 'inside-54',
    chapter: 'interiors',
    caption: 'En suite bathroom',
    alt: 'A bright en suite bathroom with twin basins, a wide mirror and a sea-facing porthole',
  },
  {
    name: 'inside-59',
    chapter: 'interiors',
    caption: 'Bathroom vanity',
    alt: 'A dual-basin bathroom vanity with a mirrored cabinet and woven amenity baskets',
  },
  {
    name: 'inside-51',
    chapter: 'interiors',
    caption: 'Library nook',
    alt: 'A reading sofa beside a built-in bookcase and a round porthole window',
  },
  {
    name: 'inside-55',
    chapter: 'interiors',
    caption: 'Ensuite shower',
    alt: 'A cabin ensuite with a glass shower enclosure and a round porthole',
  },
  {
    name: 'inside-66',
    chapter: 'interiors',
    caption: 'Double guest cabin',
    alt: 'A double guest cabin with navy cushions, white cabinetry and a porthole',
    layout: 'full',
  },
  {
    name: 'cockpit-1',
    chapter: 'interiors',
    caption: 'Wheelhouse',
    alt: 'Wheelhouse navigation console and seating beside the saloon',
  },
  {
    name: 'cockpit-4',
    chapter: 'interiors',
    caption: 'Wheelhouse console',
    alt: 'Engine throttle and navigation screens on the wheelhouse console',
  },

  // Cuisine
  {
    name: 'food-4',
    chapter: 'cuisine',
    caption: 'Breakfast on the aft deck',
    alt: 'A breakfast table on the aft deck with fresh juices, bread and pastries, the sea beyond',
    layout: 'full',
  },
  {
    name: 'food-17',
    chapter: 'cuisine',
    caption: 'Cocktail at sunset',
    alt: 'A citrus cocktail in a coupe glass on deck in warm evening light',
    layout: 'portrait',
  },
  {
    name: 'food-13',
    chapter: 'cuisine',
    caption: 'Cocktails on the helm deck',
    alt: 'Two cocktails and a canapé board on a teak table beside the upper helm',
    layout: 'companion',
  },
  {
    name: 'food-11',
    chapter: 'cuisine',
    caption: 'Fresh juices and pastries',
    alt: 'Fresh orange and green juices beside pastries at the breakfast table',
  },
  {
    name: 'food-10',
    chapter: 'cuisine',
    caption: 'Juices and fresh bread',
    alt: 'Bottled fresh juices, bread and fruit laid out on the aft deck with the sea beyond',
  },
  {
    name: 'food-19',
    chapter: 'cuisine',
    caption: 'Cocktail and canapés',
    alt: 'A citrus cocktail and a tray of canapés in the late afternoon light',
  },
  {
    name: 'food-18',
    chapter: 'cuisine',
    caption: 'Cocktail hour on deck',
    alt: 'Two cocktails in a wooden tray with olives and canapés on the teak deck',
  },
  {
    name: 'food-6',
    chapter: 'cuisine',
    caption: 'Breakfast by the stairs',
    alt: 'A breakfast spread on the aft deck with the flybridge staircase and galley behind',
  },
  {
    name: 'food-12',
    chapter: 'cuisine',
    caption: 'Juice and fresh bread',
    alt: 'Fresh juice carafes and sliced bread in close-up, the sea beyond',
  },

  // Activities
  {
    name: 'ship-38',
    chapter: 'activities',
    caption: 'Tiwal sailing dinghy',
    alt: 'A Tiwal sailing dinghy on the water beside the stern of Serendipity I',
    layout: 'full',
  },
  {
    name: 'sport-1',
    chapter: 'activities',
    caption: 'Paddleboard',
    alt: 'An inflatable paddleboard mounted at the bow above turquoise water',
    layout: 'portrait',
  },
  {
    name: 'dingi-2',
    chapter: 'activities',
    caption: 'RIB tender',
    alt: "The yacht's RIB tender at anchor on calm blue water, its reflection beneath",
    layout: 'companion',
  },
  {
    name: 'sport-3',
    chapter: 'activities',
    caption: 'Seabob',
    alt: 'A red Seabob underwater scooter resting on the teak swim platform',
  },
  {
    name: 'sport-9',
    chapter: 'activities',
    caption: 'Yoga under sail',
    alt: 'Two guests in headstands during a yoga session on the foredeck beneath the sail',
  },
  {
    name: 'sport-12',
    chapter: 'activities',
    caption: 'Yoga on the foredeck',
    alt: 'Two guests stretching on yoga mats on the teak foredeck',
  },
  {
    name: 'outside-25',
    chapter: 'activities',
    caption: 'Water toys aerial',
    alt: 'Overhead view of the stern with the Seabob, Tiwal dinghy and tender all rigged',
  },
  {
    name: 'polynesia-35',
    chapter: 'activities',
    caption: 'Tender at speed',
    alt: 'The RIB tender speeding across the lagoon with an island and reef beyond',
    layout: 'full',
  },
];
