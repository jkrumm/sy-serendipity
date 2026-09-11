type CrewPortrait = {
  name: string;
  alt: string;
  width: number;
  height: number;
  folder?: 'polynesia';
  gravity?: 'no';
  sourceWidth?: number;
  sourceHeight?: number;
  maxWidth?: number;
};

export const MAX_PORTRAIT_IMAGE = {
  name: 'polynesia-25',
  alt: 'Chef Max smiling on deck, with a Polynesian lagoon behind him',
  width: 400,
  height: 380,
  folder: 'polynesia',
  gravity: 'no',
  sourceWidth: 960,
  sourceHeight: 1280,
  maxWidth: 400,
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
};

export const crewContent = {
  meta: {
    title: 'Crew',
    description:
      'Meet the people who make your passage on Serendipity I exceptional: a highly trained crew of seven, with thoughtful service and a love of the sea.',
  },
  intro: {
    eyebrow: 'The people behind your passage',
    title: 'In very good hands.',
    description:
      'Seven highly trained crew, one shared purpose: making your time on board your own. Thoughtful, unobtrusive service leaves you free to enjoy every moment.',
  },
  welcome:
    'Your passions, curiosities, motivations and the people travelling with you shape the excursions and experiences we arrange. Celebrating a special occasion? Tell us what you have in mind; we will bring ideas to the table.',
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
        'You are most welcome if you are a high-end foodie!',
        'Our energetic chef Max, with his blend of creativity, passion for food and exceptional cooking skills, will source the best ingredients on local markets and serve the most delicious meals ever. Let him spoil you!',
      ],
    },
  ],
  dining: {
    eyebrow: 'A taste of life on board',
    title: 'From the first coffee to the last toast.',
    breakfastCaption: 'Breakfast, with nowhere else to be.',
    aperitifCaption: 'An aperitif and something to share.',
  },
};
