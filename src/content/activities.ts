import type { PhotoOptions } from '@/util/get-image';

type ActivityPhoto = Omit<PhotoOptions, 'width' | 'height'> & { alt?: string };

export const activitiesImages = {
  opener: {
    name: 'polynesia-35',
    alt: 'Guests aboard the tender at speed, wake fanning out behind, a motu on the horizon',
  },
  seabob: {
    name: 'sport-3',
    alt: 'A red Seabob resting on the teak swim step, clear water beyond',
  },
  supBoard: {
    name: 'sport-1',
    alt: 'A SUP board strapped to the swim step, seen from above against turquoise water',
  },
  tender: {
    name: 'dingi-2',
    alt: 'The RIB tender at anchor on calm blue water, seen from above',
  },
  downwardDog: {
    name: 'sport-12',
    alt: 'Two guests in downward-facing dog on the foredeck, a coastal town beyond',
  },
  headstand: {
    name: 'sport-9',
    alt: 'Two guests in a headstand yoga pose on the foredeck under full sail',
  },
  meditation: {
    name: 'sport-8',
    alt: 'Two guests seated in meditation on the foredeck under the shade sail',
  },
  motuBeach: {
    name: 'polynesia-08',
    maxWidth: 800,
    alt: 'A white-sand beach curving along a palm-lined motu, seen from above',
  },
  waterfall: {
    name: 'polynesia-01',
    alt: 'A jungle waterfall falling into a pool in the Marquesas Islands',
  },
} satisfies Record<string, ActivityPhoto>;

export type ActivityLoop = {
  slug: string;
  width: number;
  height: number;
  caption: string;
};

export const activitiesLoops: ActivityLoop[] = [
  {
    slug: 'yacht',
    width: 1280,
    height: 714,
    caption: 'Drone orbit around Serendipity I at anchor in a lagoon',
  },
  {
    slug: 'tender',
    width: 1280,
    height: 720,
    caption: 'The tender crossing a lagoon channel, seen from above',
  },
  {
    slug: 'reef',
    width: 1280,
    height: 714,
    caption: 'Reef sharks over coral on a dive',
  },
  {
    slug: 'lagoon',
    width: 1280,
    height: 714,
    caption: 'Flying over the coral patterns of a lagoon',
  },
  {
    slug: 'sunset',
    width: 1280,
    height: 720,
    caption: 'Wading in the shallows at sunset, the anchorage behind',
  },
];

export const activitiesContent = {
  meta: {
    title: 'Activities',
    description:
      'Water sports, diving, sailing and yoga aboard Serendipity I, with the tender and crew for excursions ashore in the South Pacific.',
  },
  intro: {
    eyebrow: 'Serendipity I',
    title: 'Activities',
    description:
      'Equipment is available for sailing, diving, snorkelling, paddling, water skiing and exercise on board. Ashore, the crew arranges snorkelling and diving excursions, surfing, hikes and visits to local communities and cultural sites.',
  },
  film: {
    eyebrow: 'On the water',
    title: 'Days in the South Pacific',
    line: 'Short scenes from the 2026 season in French Polynesia.',
    toggleOn: 'Pause videos',
    toggleOff: 'Play videos',
  },
  equipment: {
    eyebrow: 'Equipment',
    title: 'Water sports and fitness',
    waterLabel: 'On the water',
    waterToys: [
      'Seabobs',
      'Tiwal 3 sailing dinghy',
      'SUP boards',
      'Kayak',
      'Scuba diving and snorkelling equipment in various sizes',
      'eFoil',
      'Wakeboard',
      'Water skis for children and adults',
      'Wetsuits',
      'Water doughnut',
    ],
    deckLabel: 'On deck & ashore',
    deckToys: [
      'Weights, skipping rope and Therabands',
      'Yoga mats',
      'Volleyball, football and ping pong rackets',
    ],
  },
  wellness: {
    eyebrow: 'On deck',
    title: 'Yoga on the foredeck',
    line: 'Mats and weights are on board; the foredeck under the shade sail is the usual spot.',
  },
  ashore: {
    eyebrow: 'Ashore',
    title: 'Excursions',
    paragraph:
      'Serendipity I sails the South Pacific until summer 2028. The tender takes guests to beaches, villages and dive sites; the crew plans excursions around your interests.',
  },
};
