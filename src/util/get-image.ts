// Single seam for the image CDN (imgproxy over B2, see the `img` skill).
// Every image URL on the site goes through here, so a host move is a change to this file only.
import { images } from './images';

const CDN = 'https://img.jkrumm.com';
const PREFIX = 'sy-serendipity';

export type Folder = 'new' | 'all' | 'polynesia';
type Size = { width?: number; height?: number };

function fileFor(name: string, jpgNames: (name: string) => boolean): string {
  if (/\.(jpe?g|png|svg|webp)$/i.test(name)) return name;
  return jpgNames(name) ? `${name}.jpg` : `${name}.jpeg`;
}

function isNewJpg(name: string): boolean {
  return ['technical', 'mediterranean', 'caribbean'].some((key) => name.includes(key));
}

function isOldJpg(name: string): boolean {
  if (name.includes('food') && parseInt(name.split('-')[1] ?? '0', 10) > 5) return true;
  return ['technical', 'mediterranean', 'caribbean', 'sport'].some((key) => name.includes(key));
}

function url(options: string[], folder: Folder, file: string): string {
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

/** Scaled to fit the given width (or height when no width), from the `new/` folder. */
export function getImg(name: string, width?: number, height?: number): string {
  const file = fileFor(name, isNewJpg);
  return url([...fit({ width, height }), ...format(file)], 'new', file);
}

/** Centre-cropped to exactly width x height, from the `new/` folder. */
export function getImgCropped(name: string, width: number, height: number): string {
  const file = fileFor(name, isNewJpg);
  return url([`rs:fill:${width}:${height}`, ...format(file)], 'new', file);
}

/** Scaled to fit the given width (or height when no width), from the legacy `all/` folder. */
export function getImgOld(name: string, width?: number, height?: number): string {
  const file = fileFor(name, isOldJpg);
  return url([...fit({ width, height }), ...format(file)], 'all', file);
}

/** Centre-cropped to exactly width x height, from the legacy `all/` folder. */
export function getImgCroppedOld(name: string, width: number, height: number): string {
  const file = fileFor(name, isOldJpg);
  return url([`rs:fill:${width}:${height}`, ...format(file)], 'all', file);
}

export type PhotoOptions = {
  name: string;
  width: number;
  height: number;
  old?: boolean;
  folder?: Folder;
  quality?: number;
  gravity?: 'ce' | 'no';
  sourceWidth?: number;
  sourceHeight?: number;
  maxWidth?: number;
};

function photoFolder({ folder, old }: PhotoOptions): Folder {
  return folder ?? (old ? 'all' : 'new');
}

function photoMaximumWidth(options: PhotoOptions): number {
  const aspect = options.width / options.height;
  const source =
    photoFolder(options) === 'new' ? images.find((image) => image.id === options.name) : undefined;
  return Math.floor(
    Math.min(
      1920,
      options.maxWidth ?? Infinity,
      options.sourceWidth ?? source?.width ?? Infinity,
      (options.sourceHeight ?? source?.height ?? Infinity) * aspect,
    ),
  );
}

function photoUrl(options: PhotoOptions): string {
  const { name, width, height, quality = 80, gravity = 'ce' } = options;
  const folder = photoFolder(options);
  const file = fileFor(
    name,
    folder === 'polynesia' ? () => true : folder === 'all' ? isOldJpg : isNewJpg,
  );
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

/** Crop every candidate to the same ratio and avoid enlarging known source images. */
export function getPhotoSrcSet(options: PhotoOptions): string {
  const aspect = options.width / options.height;
  const maximum = photoMaximumWidth(options);
  const widths = [390, 640, 960, 1280, 1600, 1920].filter((width) => width < maximum);
  widths.push(maximum);
  return widths
    .map((width) => `${photoUrl({ ...options, width, height: width / aspect })} ${width}w`)
    .join(', ');
}

export const SEO_IMAGE = `${CDN}/rs:fill:1200:630/f:jpg/${PREFIX}/all/ship-16.jpeg`;
export const BROKER_LOGO = `${CDN}/rs:fit:230/${PREFIX}/OI_Logo_-_white_thick.png`;
