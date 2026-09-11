import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { GALLERY_CHAPTERS, GALLERY_COPY, GALLERY_IMAGES } from '@/content/gallery';
import type { GalleryChapter } from '@/content/gallery';
import { getImg, getImgCropped } from '@/util/get-image';
import { images } from '@/util/images';
import styles from '@/pages/gallery.module.scss';

const IMAGE_WIDTHS = [480, 800, 1200, 1600, 2400];
const imageDimensions = new Map(images.map((photo) => [photo.id, photo]));

const photographs = GALLERY_IMAGES.map((photo, index) => {
  const original = imageDimensions.get(photo.name);
  if (!original) throw new Error(`Missing image dimensions for ${photo.name}`);
  const crop =
    photo.layout === 'portrait'
      ? { width: 1000, height: 1250 }
      : photo.layout === 'full'
        ? { width: 1600, height: 900 }
        : { width: 1200, height: 900 };

  return {
    ...photo,
    index,
    number: String(index + 1).padStart(2, '0'),
    crop,
    thumbnail: getImgCropped(photo.name, crop.width, crop.height),
    thumbnailSrcSet: IMAGE_WIDTHS.filter((width) => width <= 1600)
      .map(
        (width) =>
          `${getImgCropped(photo.name, width, Math.round((width * crop.height) / crop.width))} ${width}w`,
      )
      .join(', '),
    slide: {
      src: getImg(photo.name, 2400),
      alt: photo.alt,
      width: original.width,
      height: original.height,
      srcSet: IMAGE_WIDTHS.map((width) => ({
        src: getImg(photo.name, width),
        width,
        height: Math.round((width * original.height) / original.width),
      })),
    },
  };
});

export default function Gallery() {
  const [chapter, setChapter] = useState<GalleryChapter | 'all'>('underway');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const visibleChapters = GALLERY_CHAPTERS.filter(
    (item) => chapter === 'all' || item.id === chapter,
  );
  const visiblePhotographs = photographs.filter(
    (photo) => chapter === 'all' || photo.chapter === chapter,
  );

  function selectChapter(value: GalleryChapter | 'all') {
    setChapter(value);
    setLightboxIndex(-1);
  }

  return (
    <>
      <div className={styles.filters} role="group" aria-label={GALLERY_COPY.filterLabel}>
        <button type="button" aria-pressed={chapter === 'all'} onClick={() => selectChapter('all')}>
          {GALLERY_COPY.allLabel}
          <span>{photographs.length}</span>
        </button>
        {GALLERY_CHAPTERS.map(({ id, title }) => (
          <button
            key={id}
            type="button"
            aria-pressed={chapter === id}
            onClick={() => selectChapter(id)}
          >
            {title}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visiblePhotographs.length} {GALLERY_COPY.imageLabel}
      </p>
      <div className={styles.chapters}>
        {visibleChapters.map(({ id, title, description }) => (
          <section key={id} className={styles.chapter} aria-labelledby={`chapter-${id}`}>
            <div className={styles.chapterHeading}>
              <div>
                <p className="eyebrow">
                  0{GALLERY_CHAPTERS.findIndex((item) => item.id === id) + 1}
                </p>
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
                      onClick={() =>
                        setLightboxIndex(
                          visiblePhotographs.findIndex((item) => item.name === photo.name),
                        )
                      }
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
        slides={visiblePhotographs.map((photo) => photo.slide)}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
      />
    </>
  );
}
