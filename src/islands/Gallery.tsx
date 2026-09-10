import { useMemo, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { getImg } from '@/util/get-image';
import { images } from '@/util/images';
import styles from '@/pages/gallery.module.scss';

const BREAKPOINTS = [1080, 640, 384, 256, 128, 96, 64, 48];

type MappedImage = { src: string; width: number; height: number };
type MappedPhoto = MappedImage & { srcSet: MappedImage[] };

const photos: MappedPhoto[] = images.map((photo) => ({
  src: getImg(photo.id, photo.width, photo.height),
  width: photo.width,
  height: photo.height,
  srcSet: BREAKPOINTS.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return { src: getImg(photo.id, breakpoint, height), width: breakpoint, height };
  }),
}));

const tabs = [
  { name: 'Ship', key: 'ship' },
  { name: 'Decks', key: 'outside' },
  { name: 'Inside', key: 'inside' },
  { name: 'Cuisine', key: 'food' },
  { name: 'Technical', key: 'technical' },
];

function classNames(...classes: (string | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Gallery() {
  const [currentTab, setCurrentTab] = useState('ship');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const photosFiltered = useMemo(
    () => photos.filter((item) => item.src.includes(currentTab)),
    [currentTab],
  );

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>, key: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setCurrentTab(key);
    }
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const tab = tabs.find((item) => item.name === event.target.value);
    if (tab) setCurrentTab(tab.key);
  }

  return (
    <>
      <div className={styles.tabs}>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            onChange={handleSelectChange}
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            defaultValue={tabs.find((tab) => tab.key === currentTab)?.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                role="button"
                tabIndex={0}
                onClick={() => setCurrentTab(tab.key)}
                onKeyDown={(event) => handleTabKeyDown(event, tab.key)}
                className={classNames(
                  currentTab === tab.key ? 'gallery-tab-active' : 'gallery-tab',
                )}
              >
                <span>{tab.name}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <RowsPhotoAlbum
        photos={photosFiltered}
        targetRowHeight={250}
        onClick={({ index }) => setLightboxIndex(index)}
      />
      <Lightbox
        slides={photosFiltered}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
      />
    </>
  );
}
