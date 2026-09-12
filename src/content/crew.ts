import type { PhotoOptions } from '@/util/get-image';

type CrewPortrait = Omit<PhotoOptions, 'width' | 'height'> & {
  alt?: string;
  width?: number;
  height?: number;
};

export const MAX_PORTRAIT_IMAGE = {
  name: 'polynesia-24',
  alt: 'Chef Max in his white jacket on deck, a Polynesian lagoon behind him',
  width: 800,
  height: 1000,
  gravity: 'no',
} satisfies CrewPortrait;

export const crewImages = {
  captain: {
    name: 'crew-21',
    alt: 'Captain Scott Waterfield on board Serendipity I',
    width: 800,
    height: 1000,
  },
  chiefStewardess: {
    name: 'crew-20',
    alt: 'Chief Stewardess Renee Weatherall on board Serendipity I',
    width: 800,
    height: 1000,
  },
  chef: MAX_PORTRAIT_IMAGE,
  breakfast: {
    name: 'food-11',
    alt: 'Breakfast on board with fresh juices, fruit and a croissant',
  },
  aperitif: {
    name: 'food-16',
    alt: 'A cocktail and a selection of small bites served on deck',
  },
} satisfies Record<string, CrewPortrait>;

export const crewContent = {
  meta: {
    title: 'Crew',
    description:
      'Serendipity I has seven crew, including Captain Scott Waterfield, Chief Stewardess Renee Weatherall and Chef Max.',
  },
  intro: {
    eyebrow: 'Serendipity I',
    title: 'The crew',
    description:
      'Serendipity I has seven trained crew. The team provides unobtrusive service and arranges excursions and experiences around guests’ interests.',
  },
  welcome:
    'Share your interests, the needs of your travel companions and any special occasions so the crew can plan suitable excursions and experiences.',
  profiles: [
    {
      name: 'Scott Waterfield',
      role: 'Captain',
      image: crewImages.captain,
      paragraphs: [
        'Scott has been boating since he was six months old. He began competitive windsurfing at 15, bought his first keelboat at 19 and spent more than a decade racing as owner and driver in New Zealand’s top one-design fleet racing class.',
        'His superyacht career has taken him through the Mediterranean, Caribbean and Newport, and as far as the Amazon delta, Easter Island and New Zealand’s sub-Antarctic islands. Over 200,000 nautical miles sailed worldwide without incident reflect his focus on the safety of guests and crew.',
        'Scott brings that care together with a sense of fun and a cooperative team spirit. He loves sharing sailing and the ocean with guests. Off duty, you will find him aboard his own high-performance catamaran, somewhere in the Pacific.',
      ],
    },
    {
      name: 'Renee Weatherall',
      role: 'Chief Stewardess',
      image: crewImages.chiefStewardess,
      paragraphs: [
        'A Kiwi who loves travel and meeting new people, Renee grew up in a small town near the beach, where she learned to sail. While studying for her degree in visual arts, she worked in fine dining restaurants, progressing to hostess and bar manager.',
        'That experience led naturally to life as a chief stewardess on yachts, where she strives to give every guest the highest level of service.',
        'Away from work, Renee hikes and explores the places the yacht visits, and practises yoga and meditation. She also studies winemaking, with the ambition of becoming a sommelier.',
      ],
    },
    {
      name: 'Max',
      role: 'Chef',
      image: crewImages.chef,
      paragraphs: [
        'You are most welcome if you are a high-end foodie! Our energetic chef Max, with his blend of creativity, passion for food and exceptional cooking skills, will source the best ingredients on local markets and serve the most delicious meals ever.',
        'Let him spoil you!',
      ],
    },
  ],
  dining: {
    eyebrow: 'Dining',
    title: 'Meals on board',
  },
};
