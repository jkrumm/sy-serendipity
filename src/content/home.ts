import type { PhotoOptions } from '@/util/get-image'

type HomePhoto = Omit<PhotoOptions, 'width' | 'height'> & { alt?: string }

export const HOME_DESTINATION_IMAGES = {
  marquesasBay: {
    name: 'polynesia-03',
    alt: 'Serendipity I anchored in a deep blue Marquesas bay below volcanic cliffs',
  },
  marquesasAnchorage: {
    name: 'polynesia-02',
    alt: 'Serendipity I at anchor in a Marquesas bay beneath green volcanic mountains',
  },
  reefAnchorage: {
    name: 'polynesia-12',
    alt: 'Serendipity I at anchor in deep blue water beside a reef-fringed Polynesian motu',
  },
} satisfies Record<string, HomePhoto>

export const HOME_TAILOR_PHOTOS = {
  sandbarAerial: {
    name: 'nature-sandbar-aerial',
    alt: 'Aerial view of a palm-fringed sandbar island in a turquoise lagoon',
  },
  blackPearls: {
    name: 'polynesia-37',
    alt: 'Black and white Tahitian pearls displayed on an open pearl oyster shell',
  },
  underSail: {
    name: 'polynesia-04',
    gravity: 'fp:0.38:0.55',
    alt: 'Serendipity I under full sail along the green cliffs of a Polynesian island',
  },
  lagoonShallows: {
    name: 'nature-lagoon-shallows',
    alt: 'A small boat anchored off a palm-lined beach in a turquoise lagoon',
  },
} satisfies Record<string, HomePhoto>

export const home = {
  title: 'Private Sailing Yacht Charter',
  description:
    'Serendipity I is a 45-metre Perini Navi sailing yacht for eight guests, available for private charter in the Pacific.',
  hero: {
    eyebrow: '45-metre Perini Navi sailing yacht',
    title: 'Serendipity I',
    link: 'Request A Charter',
    desktop: {
      name: 'old-ship-16',
      alt: 'Serendipity I under full sail, cutting through the open sea',
    } satisfies HomePhoto,
    mobile: {
      name: 'old-ship-11',
      alt: 'Serendipity I seen from above, her white sails against the deep sea',
    } satisfies HomePhoto,
  },
  introduction: {
    eyebrow: 'Perini Navi · Built in 2011',
    title: 'Accommodation For Eight Guests',
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
      name: 'polynesia-09',
      alt: 'Serendipity I at anchor in a deep blue lagoon, a palm-fringed motu beyond',
    } satisfies HomePhoto,
  },
  onboard: {
    eyebrow: 'On board',
    title: 'Decks And Cabins',
    body: 'The decks have seating, sunbeds and dining space, the main saloon opens onto the aft cockpit, and the full-beam owner’s cabin is aft.',
    chapters: [
      {
        number: '01',
        title: 'open decks',
        label: 'Outdoor spaces',
        href: '/gallery/#decks',
        image: {
          name: 'outside-41',
          alt: 'The foredeck’s shade sail over turquoise bean bags, teak decking and a coastline beyond',
        } satisfies HomePhoto,
      },
      {
        number: '02',
        title: 'main saloon',
        label: 'Indoor living',
        href: '/gallery/#interiors',
        image: {
          name: 'inside-8',
          alt: 'The bright main saloon with white sofas, a red rug and panoramic windows',
        } satisfies HomePhoto,
      },
      {
        number: '03',
        title: 'owner’s cabin',
        label: 'Accommodation',
        href: '/gallery/#interiors',
        image: {
          name: 'inside-37',
          alt: 'The full-beam owner’s cabin with a queen-size bed, pale upholstery and soft lighting',
        } satisfies HomePhoto,
      },
    ],
  },
  destinations: {
    eyebrow: 'Charter destinations',
    title: 'Wild Wonders And Active Adventures In The Pacific',
    lead: 'Dazzled by a rainbow of colors, French artist Gauguin found endless inspiration in the Pacific’s romantically remote islands – invitingly blue ocean, deliciously pink frangipani flowers, and precious black pearls darker than the night.',
    locations: 'French Polynesia',
    paragraphs: [
      'Serendipity I is sailing the Pacific. Discover the 121 islands of French Polynesia, favored for their pristine beaches and rich culture. Play with dolphins in Rangiroa’s Tiputa Pass, or have a Polynesian tattoo inked by a traditional artist.',
      'Further afield, the far-flung Marquesas Islands are the heartland of an ancient Polynesian belief system. Spiritually revived by a younger generation, temple ruins and tiki statues serve as a link to seafaring ancestors. Even today, life in the archipelago revolves around water. From the humpbacks greeting snorkellers in Moorea between mid-August and mid-October to the Olympics-worthy waves challenging surfers on Tahiti, this is a destination ruled by marine giants.',
    ],
    tailor: {
      eyebrow: 'Cook Islands · French Polynesia · Fiji',
      title: 'Tailor Your Trip',
      destinations: [
        { place: 'Cook Islands', image: HOME_TAILOR_PHOTOS.blackPearls },
        { place: 'French Polynesia', image: HOME_TAILOR_PHOTOS.underSail },
        {
          place: 'Fiji',
          image: HOME_TAILOR_PHOTOS.lagoonShallows,
        },
      ],
      fijiEyebrow: 'Fiji',
      paragraphs: [
        'There’s “off the beaten path” … and then there is this: a sailing trip to shine an inspiring new light on some truly extraordinary places, each offering its own vision of paradise on earth. In the Cook Islands, it’s black pearls and a chance to swim in clear waters alive with sea turtles and fish. The names Tahiti and Bora Bora conjure images of tropical beaches and endless coral reefs, yet there is so much more to French Polynesia than water sports and idyllic beachfront resorts. Nothing takes you deeper into the diverse cultures of this intriguing island nation, cruising to the far-flung edges of the Tuamotu, Marquesas and Society Islands to reveal local traditions, artisanal villages, uninhabited atolls and archeological finds seldom experienced by outsiders.',
        'No one sets foot on Fiji without being serenaded with the Bula Muleya, the smiling islanders’ singsong welcome, as they slip salusalu flower garlands over your head. Bula means “life”, but on this tropical archipelago in the Pacific it’s used as a greeting and a blessing, too. Lean into the kava ceremonies, coconut bowling, and lovo cooking.',
        'The backdrop of castaway islands, white-sand beaches, lush rainforests, limestone caves and soft-coral reefs certainly doesn’t hurt, while rainforest canopy tours or shark dives are waiting around the corner. Fiji is governed by water, and surfers dream of the top-quality barrels at Cloudbreak. Scuba divers can log turtles, sharks, manta rays, marlin and barracuda at over 44 sites including a plane wreck, pinnacles and underwater caves. But far-flung Fiji has also perfected the pursuits of romance and relaxation: adopting the island’s go-with-the-flow attitude will leave space for moments of magic.',
      ],
    },
  },
  crew: {
    eyebrow: 'Crew of seven',
    title: 'Your Crew',
    body: 'Captain Scott, Chief Stewardess Renée and Chef Max are part of the seven-person crew. They arrange your meals, activities and excursions on board and ashore.',
    link: 'Meet your crew',
  },
  activities: {
    eyebrow: 'Activities',
    title: 'Water Sports And Fitness',
    body: 'Equipment is available for sailing, diving, snorkelling, paddling, water skiing and exercise on board: Seabobs, an eFoil, a Tiwal sailing dinghy, SUP boards, a kayak, wakeboard and water skis, plus yoga mats and weights on deck.',
    link: 'Explore activities',
    image: {
      name: 'sport-11',
      alt: 'Two guests practising yoga on the teak deck beneath the sails',
    } satisfies HomePhoto,
  },
  film: {
    eyebrow: 'Film',
    // No-break space keeps the name "Serendipity I" on one line.
    title: 'Serendipity\u00a0I Under Sail',
    button: 'Watch the film',
    close: 'Close film',
    source: 'https://ik.imagekit.io/bgmwrkfoi/sy-serendipty-1080.mov',
    image: {
      name: 'old-ship-21',
      alt: 'Serendipity I sailing towards the viewer, her bow lifting through the waves',
    } satisfies HomePhoto,
  },
}
