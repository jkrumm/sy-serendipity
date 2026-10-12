import { GALLERY_IMAGES, type GalleryPhoto } from '@/content/gallery';
import { getPhoto, getPhotoSrcSet, getPhotoSrcSetEntries } from '@/util/get-image';
import { imageMeta } from '@/util/images';

export const galleryPhotographs: GalleryPhoto[] = GALLERY_IMAGES.map((photo, index) => {
  const original = imageMeta(photo.name);

  const crop =
    photo.layout === 'portrait'
      ? { width: 1000, height: 1250 }
      : photo.layout === 'full'
        ? { width: 1600, height: 900 }
        : { width: 1200, height: 900 };

  const slideSrcSet = getPhotoSrcSetEntries({
    name: photo.name,
    width: original.width,
    height: original.height,
  });

  return {
    ...photo,
    index,
    number: String(index + 1).padStart(2, '0'),
    crop,
    thumbnail: getPhoto({ name: photo.name, width: crop.width, height: crop.height }),
    thumbnailSrcSet: getPhotoSrcSet({
      name: photo.name,
      width: crop.width,
      height: crop.height,
    }),
    slide: {
      src: getPhoto({
        name: photo.name,
        width: original.width,
        height: original.height,
      }),
      alt: photo.alt,
      width: original.width,
      height: original.height,
      srcSet: slideSrcSet,
    },
  };
});
