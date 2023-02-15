function isNameJpg(name) {
  return name.includes('technical') || name.includes('mediterranean') || name.includes('caribbean');
}

export function getImg(name, width, height) {
  // eslint-disable-next-line no-param-reassign
  // width *= 1.25;
  // eslint-disable-next-line no-param-reassign
  // height *= 1.25;
  // https://ik.imagekit.io/bgmwrkfoi/new/ship-6.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676418090522
  let url = `https://ik.imagekit.io/bgmwrkfoi/`;
  if (width) {
    url += `/tr:w-${width},f-webp,dpr-2/`;
  } else if (height) {
    url += `/tr:h-${height},f-webp,dpr-2/`;
  } else {
    url += `/tr:f-webp,dpr-2/`;
  }
  if (isNameJpg(name)) {
    url += `/new/${name}.jpg`;
  } else if (name.includes('.png') || name.includes('.svg')) {
    url += `/new/${name}`;
  } else {
    url += `/new/${name}.jpeg`;
  }
  return url;
}

export function getImgCropped(name, width, height) {
  let url = `https://ik.imagekit.io/bgmwrkfoi/tr:w-${width},h-${height},c-maintain_ratio,f-webp,dpr-2/`;
  if (isNameJpg(name)) {
    url += `/new/${name}.jpg`;
  } else {
    url += `/new/${name}.jpeg`;
  }
  return url;
}

function isNameJpgOld(name) {
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

export function getImgOld(name, width, height) {
  let url = `https://ik.imagekit.io/bgmwrkfoi`;
  if (width) {
    url += `/tr:w-${width},f-webp/`;
  } else if (height) {
    url += `/tr:h-${height},f-webp/`;
  } else {
    url += `/tr:f-webp/`;
  }
  if (isNameJpgOld(name)) {
    url += `/all/${name}.jpg`;
  } else if (name.includes('.png') || name.includes('.svg')) {
    url += `/all/${name}`;
  } else {
    url += `/all/${name}.jpeg`;
  }
  return url;
}

export function getImgCroppedOld(name, width, height) {
  let url = `https://ik.imagekit.io/bgmwrkfoi/tr:w-${width},h-${height},c-maintain_ratio,f-webp/`;
  if (isNameJpgOld(name)) {
    url += `/all/${name}.jpg`;
  } else {
    url += `/all/${name}.jpeg`;
  }
  return url;
}
