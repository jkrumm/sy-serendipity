// Single seam for the image CDN. Every image URL on the site goes through here,
// so moving hosts (ImageKit -> img.jkrumm.com) is a change to this file only.
const CDN = 'https://ik.imagekit.io/bgmwrkfoi';

type Size = { width?: number; height?: number };

function extensionFor(name: string, jpgNames: (name: string) => boolean): string {
  if (name.includes('.png') || name.includes('.svg')) return name;
  return jpgNames(name) ? `${name}.jpg` : `${name}.jpeg`;
}

function transform({ width, height }: Size, extra: string): string {
  const parts: string[] = [];
  if (width) parts.push(`w-${width}`);
  if (height) parts.push(`h-${height}`);
  parts.push(extra);
  return `tr:${parts.join(',')}`;
}

function isNewJpg(name: string): boolean {
  return ['technical', 'mediterranean', 'caribbean'].some((key) => name.includes(key));
}

function isOldJpg(name: string): boolean {
  if (name.includes('food') && parseInt(name.split('-')[1] ?? '0', 10) > 5) return true;
  return ['technical', 'mediterranean', 'caribbean', 'sport'].some((key) => name.includes(key));
}

/** Scaled by width (or height when no width), from the `new/` folder. */
export function getImg(name: string, width?: number, height?: number): string {
  const size: Size = width ? { width } : { height };
  return `${CDN}/${transform(size, 'f-webp,dpr-auto')}/new/${extensionFor(name, isNewJpg)}`;
}

/** Cropped to width x height, from the `new/` folder. */
export function getImgCropped(name: string, width: number, height: number): string {
  const tr = transform({ width, height }, 'c-maintain_ratio,f-webp,dpr-auto');
  return `${CDN}/${tr}/new/${extensionFor(name, isNewJpg)}`;
}

/** Scaled by width (or height when no width), from the legacy `all/` folder. */
export function getImgOld(name: string, width?: number, height?: number): string {
  const size: Size = width ? { width } : { height };
  return `${CDN}/${transform(size, 'f-webp')}/all/${extensionFor(name, isOldJpg)}`;
}

/** Cropped to width x height, from the legacy `all/` folder. */
export function getImgCroppedOld(name: string, width: number, height: number): string {
  const tr = transform({ width, height }, 'c-maintain_ratio,f-webp');
  return `${CDN}/${tr}/all/${extensionFor(name, isOldJpg)}`;
}

export const SEO_IMAGE = `${CDN}/tr:f-jpg,w-1200,h-630,c-maintain_ratio/all/ship-16.jpeg`;
