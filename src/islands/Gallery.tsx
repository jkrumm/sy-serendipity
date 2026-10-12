import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { GALLERY_CHAPTERS, GALLERY_IMAGES } from '@/content/gallery';
import { getPhoto, getPhotoSrcSet, getPhotoSrcSetEntries } from '@/util/get-image';
import { track } from '@/util/analytics';
import { imageMeta } from '@/util/images';
import styles from '@/pages/gallery.module.scss';

const photographs = GALLERY_IMAGES.map((photo, index) => {
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

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <div className={styles.chapters}>
        {GALLERY_CHAPTERS.map(({ id, title, description }, chapterIndex) => (
          <section
            key={id}
            id={id}
            data-chapter={id}
            className={styles.chapter}
            aria-labelledby={`chapter-${id}`}
          >
            <div className={styles.chapterHeading}>
              <div>
                <p className="eyebrow">{String(chapterIndex + 1).padStart(2, '0')}</p>
                <h2 id={`chapter-${id}`}>{title}</h2>
              </div>
              <p>{description}</p>
            </div>
            <div className={styles.imageGrid}>
              {photographs
                .filter((photo) => photo.chapter === id)
                .map((photo) => (
                  <figure
                    key={photo.name}
                    className={styles.photo}
                    data-layout={photo.layout ?? 'half'}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        track('gallery-open', { chapter: id, image: photo.name });
                        setLightboxIndex(photo.index);
                      }}
                      aria-label={`View photograph ${photo.number}: ${photo.alt}`}
                    >
                      <img
                        src={photo.thumbnail}
                        srcSet={photo.thumbnailSrcSet}
                        sizes={
                          photo.layout === 'full'
                            ? '(min-width: 1440px) 1312px, 90vw'
                            : '(min-width: 700px) 45vw, 90vw'
                        }
                        width={photo.crop.width}
                        height={photo.crop.height}
                        alt={photo.alt}
                        loading={photo.index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={photo.index === 0 ? 'high' : 'auto'}
                        decoding="async"
                      />
                      <span className={styles.openIcon} aria-hidden="true">
                        ↗
                      </span>
                    </button>
                    <figcaption>
                      <span>{photo.number}</span>
                      <span>{photo.caption}</span>
                    </figcaption>
                  </figure>
                ))}
            </div>
          </section>
        ))}
      </div>
      <Lightbox
        slides={photographs.map((photo) => photo.slide)}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
      />
    </>
  );
}
