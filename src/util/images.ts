// The single image registry for the site: one entry per photograph, keyed by id.
// Generated from a vision-model pass over the CDN library — see CLAUDE.md § Images and email.
import catalog from '@/content/images.json';

export type ImageFolder = 'new' | 'polynesia' | 'nature' | 'all' | 'broker';

export type ImageMeta = {
  folder: ImageFolder;
  file: string;
  width: number;
  height: number;
  alt: string;
  subject: string;
  description: string;
  tags: string[];
  orientation: 'landscape' | 'portrait' | 'square';
  people: 'none' | 'incidental' | 'prominent';
  faces: boolean;
  quality: number;
  bestUse: 'hero' | 'gallery' | 'section' | 'detail' | 'avoid';
  notes?: string;
};

export type ImageId = keyof typeof catalog;

export const IMAGES = catalog as Record<ImageId, ImageMeta>;

export function imageMeta(id: ImageId): ImageMeta {
  const meta = IMAGES[id];
  if (!meta) throw new Error(`Unknown image id: ${id}`);
  return meta;
}
