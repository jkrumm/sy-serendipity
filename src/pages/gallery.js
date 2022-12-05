import React, { useState } from 'react';

import PhotoAlbum from 'react-photo-album';
import { Lightbox } from 'yet-another-react-lightbox';
import Seo from '../layout/seo';
import Layout from '../layout/layout';

import '../styling/lightbox-styles.scss';
import * as styles from './gallery.module.scss';

// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/styles.css';
import { getImg } from '../util/get-image';
import { images } from '../util/images';

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photos = images.map((photo) => ({
  src: getImg(photo.id, photo.width, photo.height),
  width: photo.width,
  height: photo.height,
  images: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return {
      src: getImg(photo.id, breakpoint, height),
      width: breakpoint,
      height,
    };
  }),
}));

const slides = photos.map(({ src, width, height, images }) => ({
  src,
  aspectRatio: width / height,
  srcSet: images.map((image) => ({
    src: image.src,
    width: image.width,
  })),
}));

const tabs = [
  { name: 'Ship', key: 'ship' },
  { name: 'Outside', key: 'outside' },
  { name: 'Inside', key: 'inside' },
  { name: 'Cuisine', key: 'food' },
  { name: 'Technical', key: 'technical' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

class GalleryIndex extends React.Component {
  state = { currentTab: 'ship', photosFiltered: [], slidesFiltered: [] };

  componentDidMount() {
    this.filterPhotos(this.state.currentTab);
  }

  filterPhotos(newTab) {
    this.setState({
      currentTab: newTab,
      photosFiltered: photos.filter((item) => item.src.includes(newTab)),
      slidesFiltered: slides.filter((item) => item.src.includes(newTab)),
    });
    // console.log(this.state);
  }

  filterPhotosSelect(newTab) {
    this.filterPhotos(tabs.find((item) => item.name === newTab).key);
  }

  render() {
    const { location } = this.props;

    return (
      <Layout location={location}>
        <Seo
          title="Gallery"
          description="Take a look inside and see the highest level of exclusivity and luxury."
        />
        <div className={styles.galleryWrapper}>
          <section className={styles.gallery}>
            <div className={styles.tabs}>
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  onChange={(e) => this.filterPhotosSelect(e.target.value)}
                  id="tabs"
                  name="tabs"
                  className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  defaultValue={tabs.find((tab) => tab.key === this.state.currentTab).name}
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
                      onClick={() => this.filterPhotos(tab.key)}
                      className={classNames(
                        this.state.currentTab === tab.key ? 'gallery-tab-active' : 'gallery-tab',
                      )}
                      aria-current={tab.current ? 'page' : undefined}
                    >
                      <span>{tab.name}</span>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
            <Gallery
              photosFiltered={this.state.photosFiltered}
              slidesFiltered={this.state.slidesFiltered}
            />
          </section>
        </div>
      </Layout>
    );
  }
}

function Gallery({ photosFiltered, slidesFiltered }) {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <PhotoAlbum
        photos={photosFiltered}
        layout="rows"
        targetRowHeight={250}
        onClick={(event, photo, newIndex) => setIndex(newIndex)}
      />

      <Lightbox
        slides={slidesFiltered}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </>
  );
}

export default GalleryIndex;
