const normalize = (path: string) => path.replace(/\/+$/, '') || '/';

/** True when `href` points at the page currently being rendered. */
export function isActive(pathname: string, href: string): boolean {
  return normalize(href) === normalize(pathname);
}
