import type { ImageId } from '@/util/images'

export const TECHNICAL_COPY = {
  eyebrow: 'Serendipity I · Perini Navi · 2011',
  title: 'Specifications',
  description:
    'The specifications of Serendipity I: a 45 m Perini Navi sailing yacht, built in 2011 for eight guests and seven crew.',
  intro:
    'Serendipity I is a 45 m Perini Navi sailing yacht built in 2011, with four cabins for eight guests and a crew of seven.',
  plansEyebrow: 'General arrangement',
  plansTitle: 'Deck Plans',
  cockpitEyebrow: 'Navigation',
  cockpitTitle: 'Wheelhouse',
}

export const SPECIFICATIONS = [
  {
    title: 'the yacht',
    rows: [
      { label: 'Yard', value: 'Perini Navi' },
      { label: 'Type', value: 'Sailing Yacht' },
      { label: 'Guests', value: '8' },
      { label: 'Crew', value: '7' },
      { label: 'Cabins', value: '4' },
      { label: 'Length', value: '45 m / 147′8″' },
      { label: 'Beam', value: '9.73 m / 32′0″' },
      { label: 'Draft', value: '3.9 m / 12′10″' },
      { label: 'Year of build', value: '2011' },
      { label: 'Classification', value: 'ABS' },
    ],
  },
  {
    title: 'design & construction',
    rows: [
      { label: 'Gross tonnage', value: '325' },
      { label: 'Hull', value: 'Steel' },
      { label: 'Superstructure', value: 'Aluminium' },
      { label: 'Decking', value: 'Teak' },
      { label: 'Decks', value: '3' },
      { label: 'Interior designer', value: 'km design' },
      { label: 'Exterior designer', value: 'Ron Holland' },
    ],
  },
  {
    title: 'power & performance',
    rows: [
      { label: 'Model', value: 'C32' },
      { label: 'Engine power', value: '1100 hp' },
      { label: 'Total power', value: '1100 hp' },
      { label: 'Maximum speed', value: '14 knots' },
      { label: 'Cruising speed', value: '10.5 knots' },
      { label: 'Tender', value: 'Conrad Pischel' },
      { label: 'Water capacity', value: '8,200 L' },
    ],
  },
]

type TechnicalPhoto = { name: ImageId; alt: string }
type DeckPlan = TechnicalPhoto & { caption: string }

export const TECHNICAL_IMAGES = {
  profile: {
    name: 'old-technical-3',
    alt: 'Serendipity I sail profile and four deck drawings, showing the accommodation and machinery layout',
  } satisfies TechnicalPhoto,
  plans: [
    {
      name: 'technical-1',
      alt: 'Complete general arrangement drawing of the upper deck and main deck',
      caption: 'upper deck & main deck',
    },
    {
      name: 'technical-2',
      alt: 'Complete general arrangement drawing of the lower deck and below-deck spaces',
      caption: 'lower deck & below-deck arrangement',
    },
  ] satisfies DeckPlan[],
  cockpit: [
    {
      name: 'cockpit-1',
      alt: 'Wheelhouse navigation console and seating beside the saloon',
    },
    {
      name: 'cockpit-4',
      alt: 'Engine throttle and navigation screens on the wheelhouse console',
    },
  ] satisfies TechnicalPhoto[],
}
