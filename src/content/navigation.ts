import type { ImageId } from '@/util/images';

type PageFlowStep = {
  href: string;
  label: string;
  blurb: string;
  image?: ImageId;
};

export const navigationLinks = [
  { href: '/', label: 'Yacht' },
  { href: '/activities/', label: 'Activities' },
  { href: '/crew/', label: 'Crew' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/technical/', label: 'Specifications' },
];

export const requestLink = { href: '/request/', label: 'Request A Charter' };

/** Ordered "guided tour" through the site. `image` is a registry id from `images.json`
 * and is only needed on steps that can be rendered as the "next" step by `PageFlow`
 * — never the first entry, since nothing precedes it. */
export const pageFlow: PageFlowStep[] = [
  {
    href: '/',
    label: 'Yacht',
    blurb:
      'Serendipity I is a 45-metre Perini Navi sailing yacht for eight guests, available for private charter in the South Pacific until summer 2028.',
  },
  {
    href: '/activities/',
    label: 'Activities',
    blurb:
      'Water sports, diving, sailing and yoga aboard Serendipity I, with the tender and crew for excursions ashore in the South Pacific.',
    image: 'polynesia-35',
  },
  {
    href: '/crew/',
    label: 'Crew',
    blurb:
      'Serendipity I has seven crew, including Captain Scott, Chief Stewardess Renée and Chef Max.',
    image: 'crew-21',
  },
  {
    href: '/gallery/',
    label: 'Gallery',
    blurb: 'Photographs of Serendipity I, including the decks, interiors, dining and activities.',
    image: 'old-ship-11',
  },
  {
    href: '/technical/',
    label: 'Specifications',
    blurb:
      'The specifications of Serendipity I: a 45 m Perini Navi sailing yacht, built in 2011 for eight guests and seven crew.',
    image: 'cockpit-1',
  },
  {
    href: '/request/',
    label: 'Request A Charter',
    blurb:
      'Request a charter on Serendipity I in the South Pacific until summer 2028. Contact Barbara Mueller at Ocean Independence, Palma.',
    image: 'ship-1',
  },
];
