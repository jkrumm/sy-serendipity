import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { getImgCropped } from '@/util/get-image';
import styles from '@/components/big-slider.module.scss';

// Same inline arrow icon the old BigSlider used, flipped via CSS for the right arrow.
const arrow =
  '<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC \'-//W3C//DTD SVG 1.1//EN\'  \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'><svg enable-background="new 0 0 32 32" height="32px" id="Слой_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M31.106,15H3.278l8.325-8.293  c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0l-9.9,9.899c-0.385,0.385-0.385,1.029,0,1.414l9.9,9.9  c0.391,0.391,1.024,0.391,1.414,0c0.391-0.391,0.391-1.024,0-1.414L3.278,17h27.828c0.552,0,1-0.448,1-1  C32.106,15.448,31.658,15,31.106,15z" fill="#6d6d6d" fill-rule="evenodd" id="Arrow_Back"/><g/><g/><g/><g/><g/><g/></svg>';
const arrowSrc = `data:image/svg+xml;utf8,${encodeURIComponent(arrow)}`;

type SliderImage = { name: string; description?: string };

type Props = {
  images: SliderImage[];
  width: number;
  height: number;
  slidesToShow?: number;
  autoplay?: boolean;
};

type Tier = 'single' | 'double' | 'multiple';

function tierFor(slidesToShow: number): Tier {
  if (slidesToShow > 2) return 'multiple';
  if (slidesToShow === 2) return 'double';
  return 'single';
}

export default function Slider({
  images,
  width,
  height,
  slidesToShow = 1,
  autoplay = false,
}: Props) {
  const tier = tierFor(slidesToShow);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 1 },
    autoplay ? [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })] : [],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const imageWidth = slidesToShow > 1 ? width / slidesToShow : width;
  const imageHeight = slidesToShow > 1 ? height / slidesToShow : height;
  const slideClassName = slidesToShow > 1 ? 'slide smaller' : 'slide';
  const containerStyle = { '--slides-to-show': slidesToShow } as CSSProperties;

  return (
    <div className={styles.bigSlider}>
      <div className={styles.sliderNav} style={{ padding: slidesToShow > 1 ? '0 0 0 15px' : '0' }}>
        <span>
          {selectedIndex + 1} / {images.length}
        </span>
        <div className={styles.arrows}>
          <button type="button" aria-label="Previous slide" onClick={() => emblaApi?.scrollPrev()}>
            <img alt="slide-left" src={arrowSrc} />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => emblaApi?.scrollNext()}>
            <img alt="slide-right" src={arrowSrc} />
          </button>
        </div>
      </div>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container} data-tier={tier} style={containerStyle}>
          {images.map((image) => (
            <div className={slideClassName} key={image.name}>
              <img
                alt={image.name}
                width={imageWidth}
                height={imageHeight}
                src={getImgCropped(image.name, imageWidth, imageHeight)}
              />
              {image.description && <span>{image.description}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
