// Walks every content module for `{ name: ImageId }` records so the image catalogue can show
// where each photo is used. Generic on purpose: new content shows up without touching this file.
import { home, HOME_DESTINATION_IMAGES, HOME_TAILOR_PHOTOS } from '@/content/home';
import { GALLERY_CHAPTERS, GALLERY_IMAGES } from '@/content/gallery';
import { activitiesImages } from '@/content/activities';
import { crewImages } from '@/content/crew';
import { REQUEST_IMAGE, REQUEST_BROKER_IMAGE } from '@/content/request';
import { TECHNICAL_IMAGES } from '@/content/technical';
import { IMAGES, type ImageId } from './images';

export type ImagePlacement = { href: string; label: string };

function isImageId(value: unknown): value is ImageId {
  return typeof value === 'string' && value in IMAGES;
}

function collectIds(source: unknown, ids: Set<ImageId>): void {
  if (Array.isArray(source)) {
    source.forEach((entry) => collectIds(entry, ids));
    return;
  }
  if (!source || typeof source !== 'object') return;
  const record = source as Record<string, unknown>;
  if (isImageId(record.name)) ids.add(record.name);
  Object.values(record).forEach((value) => collectIds(value, ids));
}

function idsIn(source: unknown): Set<ImageId> {
  const ids = new Set<ImageId>();
  collectIds(source, ids);
  return ids;
}

const GALLERY_CHAPTER_TITLES = new Map(
  GALLERY_CHAPTERS.map((chapter) => [chapter.id, chapter.title]),
);

const PAGE_SOURCES: { ids: Set<ImageId>; placement: ImagePlacement }[] = [
  {
    ids: idsIn({ home, HOME_DESTINATION_IMAGES, HOME_TAILOR_PHOTOS }),
    placement: { href: '/', label: 'Home' },
  },
  {
    ids: idsIn(activitiesImages),
    placement: { href: '/activities/', label: 'Activities' },
  },
  {
    ids: idsIn(crewImages),
    placement: { href: '/crew/', label: 'Crew' },
  },
  {
    ids: idsIn({ REQUEST_IMAGE, REQUEST_BROKER_IMAGE }),
    placement: { href: '/request/', label: 'Request' },
  },
  {
    ids: idsIn(TECHNICAL_IMAGES),
    placement: { href: '/technical/', label: 'Specifications' },
  },
];

function addPlacement(
  usage: Map<ImageId, ImagePlacement[]>,
  id: ImageId,
  placement: ImagePlacement,
) {
  const existing = usage.get(id) ?? [];
  existing.push(placement);
  usage.set(id, existing);
}

/** Maps every registry image id used somewhere on the site to the pages that reference it. */
export function imageUsage(): Map<ImageId, ImagePlacement[]> {
  const usage = new Map<ImageId, ImagePlacement[]>();

  for (const { ids, placement } of PAGE_SOURCES) {
    ids.forEach((id) => addPlacement(usage, id, placement));
  }

  for (const photo of GALLERY_IMAGES) {
    addPlacement(usage, photo.name, {
      href: `/gallery/#${photo.chapter}`,
      label: `Gallery · ${GALLERY_CHAPTER_TITLES.get(photo.chapter) ?? photo.chapter}`,
    });
  }

  return usage;
}
