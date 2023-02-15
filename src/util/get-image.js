function isNameJpg(name) {
  if (name.includes('food') && parseInt(name.split('-')[1], 10) > 5) {
    return true;
  }

  return (
    name.includes('technical') ||
    name.includes('mediterranean') ||
    name.includes('caribbean') ||
    name.includes('sport')
  );
}

export function getImg(name, width, height) {
  let url = `https://ik.imagekit.io/bgmwrkfoi`;
  if (width) {
    url += `/tr:w-${width},f-webp/`;
  } else if (height) {
    url += `/tr:h-${height},f-webp/`;
  } else {
    url += `/tr:f-webp/`;
  }
  if (isNameJpg(name)) {
    url += `/all/${name}.jpg`;
  } else if (name.includes('.png') || name.includes('.svg')) {
    url += `/all/${name}`;
  } else {
    url += `/all/${name}.jpeg`;
  }
  return url;
}

export function getImgCropped(name, width, height) {
  let url = `https://ik.imagekit.io/bgmwrkfoi/tr:w-${width},h-${height},c-maintain_ratio,f-webp/`;
  if (isNameJpg(name)) {
    url += `/all/${name}.jpg`;
  } else {
    url += `/all/${name}.jpeg`;
  }
  return url;
}
