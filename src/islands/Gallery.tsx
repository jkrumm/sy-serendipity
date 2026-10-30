import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import type { GalleryChapterHeading, GalleryPhoto } from '@/content/gallery'
import { track } from '@/util/analytics'
import styles from '@/pages/gallery.module.scss'

type Props = {
  chapters: GalleryChapterHeading[]
  photographs: GalleryPhoto[]
}

export default function Gallery({ chapters, photographs }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  return (
    <>
      <div className={styles.chapters}>
        {chapters.map(({ id, title }, chapterIndex) => (
          <section
            key={id}
            id={id}
            data-chapter={id}
            className={styles.chapter}
            aria-labelledby={`chapter-${id}`}
          >
            <div className={styles.chapterHeading}>
              <p className="eyebrow">{String(chapterIndex + 1).padStart(2, '0')}</p>
              <h2 id={`chapter-${id}`}>{title}</h2>
            </div>
            <div className={styles.imageGrid}>
              {photographs
                .filter((photo) => photo.chapter === id)
                .map((photo) => (
                  <figure
                    key={photo.name}
                    className={styles.photo}
                    // Layout's reveal-on-scroll script adds a `reveal` class before hydration.
                    suppressHydrationWarning
                    data-layout={photo.layout ?? 'half'}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        track('gallery-open', { chapter: id, image: photo.name })
                        setLightboxIndex(photo.index)
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
                    </button>
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
  )
}
