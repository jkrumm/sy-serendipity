// Single seam for the image CDN (imgproxy over B2, see the `img` skill).
// Every image URL on the site goes through here, so a host move is a change to this file only.
import { imageMeta, type ImageFolder, type ImageId } from './images';

const CDN = 'https://img.jkrumm.com';
const PREFIX = 'sy-serendipity';

type Size = { width?: number; height?: number };

function url(options: string[], folder: ImageFolder, file: string): string {
  const path = [PREFIX, folder, file].join('/');
  return options.length ? `${CDN}/${options.join('/')}/${path}` : `${CDN}/${path}`;
}

function format(file: string): string[] {
  return file.endsWith('.svg') || file.endsWith('.png') ? [] : ['f:webp'];
}

function fit({ width, height }: Size): string[] {
  if (width) return [`rs:fit:${width}`];
  if (height) return [`h:${height}`];
  return [];
}

/** Scaled to fit the given width (or height when no width). */
export function getImg(name: ImageId, width?: number, height?: number): string {
  const { folder, file } = imageMeta(name);
  return url([...fit({ width, height }), ...format(file)], folder, file);
}

/** The untransformed original file, straight off the CDN. */
export function getOriginalUrl(name: ImageId): string {
  const { folder, file } = imageMeta(name);
  return url([], folder, file);
}

export type PhotoOptions = {
  name: ImageId;
  width: number;
  height: number;
  quality?: number;
  gravity?: 'ce' | 'no' | `fp:${number}:${number}`;
  maxWidth?: number;
};

function photoMaximumWidth(options: PhotoOptions): number {
  const aspect = options.width / options.height;
  const source = imageMeta(options.name);
  return Math.floor(
    Math.min(1920, options.maxWidth ?? Infinity, source.width, source.height * aspect),
  );
}

function photoUrl(options: PhotoOptions): string {
  const { name, width, height, quality = 80, gravity = 'ce' } = options;
  const { folder, file } = imageMeta(name);
  return url(
    [
      `rs:fill:${Math.round(width)}:${Math.round(height)}`,
      `q:${quality}`,
      `g:${gravity}`,
      ...format(file),
    ],
    folder,
    file,
  );
}

/** A fixed-ratio crop, bounded by the source dimensions and optional delivery limit. */
export function getPhoto(options: PhotoOptions): string {
  const width = Math.min(Math.round(options.width), photoMaximumWidth(options));
  return photoUrl({ ...options, width, height: (width * options.height) / options.width });
}

/** Crop every candidate to the same ratio, avoiding enlarging known source images. */
export function getPhotoSrcSetEntries(
  options: PhotoOptions,
): { src: string; width: number; height: number }[] {
  const aspect = options.width / options.height;
  const maximum = photoMaximumWidth(options);
  const widths = [390, 640, 960, 1280, 1600, 1920].filter((width) => width < maximum);
  widths.push(maximum);
  return widths.map((width) => ({
    src: photoUrl({ ...options, width, height: width / aspect }),
    width,
    height: Math.round(width / aspect),
  }));
}

/** Crop every candidate to the same ratio and avoid enlarging known source images. */
export function getPhotoSrcSet(options: PhotoOptions): string {
  return getPhotoSrcSetEntries(options)
    .map((entry) => `${entry.src} ${entry.width}w`)
    .join(', ');
}

export const SEO_IMAGE = `${CDN}/rs:fill:1200:630/f:jpg/${PREFIX}/all/ship-16.jpeg`;
export const BROKER_LOGO = `${CDN}/rs:fit:230/${PREFIX}/OI_Logo_-_white_thick.png`;
