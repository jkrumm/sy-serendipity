export function getImg(name, width, height) {
  let url = `https://ik.imagekit.io/bgmwrkfoi`;
  if (width) {
    url += `/tr:w-${width},f-webp/`;
  } else if (height) {
    url += `/tr:h-${height},f-webp/`;
  } else {
    url += `/tr:f-webp/`;
  }
  if (name.includes('technical')) {
    url += `/all/${name}.jpg`;
  } else {
    url += `/all/${name}.jpeg`;
  }
  return url;
}

export function getImgCropped(name, width, height) {
  let url = `https://ik.imagekit.io/bgmwrkfoi/tr:w-${width},h-${height},c-maintain_ratio,f-webp/`;
  if (name.includes('technical')) {
    url += `/all/${name}.jpg`;
  } else {
    url += `/all/${name}.jpeg`;
  }
  return url;
}
