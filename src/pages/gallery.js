import React, { useState } from 'react';
import { graphql } from 'gatsby';

import PhotoAlbum from 'react-photo-album';
import { Lightbox } from 'yet-another-react-lightbox';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './gallery.module.scss';

// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/styles.css';

const unsplashLink = (id, width, height) => `https://source.unsplash.com/${id}/${width}x${height}`;

const unsplashPhotos = [
  { id: 'Osq7UAVxIOI', width: 1080, height: 780 },
  { id: 'Dhmn6ete6g8', width: 1080, height: 1620 },
  { id: 'RkBTPqPEGDo', width: 1080, height: 720 },
  { id: 'Yizrl9N_eDA', width: 1080, height: 721 },
  { id: 'KG3TyFi0iTU', width: 1080, height: 1620 },
  { id: 'Jztmx9yqjBw', width: 1080, height: 607 },
  { id: '-heLWtuAN3c', width: 1080, height: 608 },
  { id: 'xOigCUcFdA8', width: 1080, height: 720 },
  { id: '1azAjl8FTnU', width: 1080, height: 1549 },
  { id: 'ALrCdq-ui_Q', width: 1080, height: 720 },
  { id: 'twukN12EN7c', width: 1080, height: 694 },
  { id: '9UjEyzA6pP4', width: 1080, height: 1620 },
  { id: 'sEXGgun3ZiE', width: 1080, height: 720 },
  { id: 'S-cdwrx-YuQ', width: 1080, height: 1440 },
  { id: 'q-motCAvPBM', width: 1080, height: 1620 },
  { id: 'Xn4L310ztMU', width: 1080, height: 810 },
  { id: 'ls94iFAQerE', width: 1080, height: 1620 },
  { id: 'X48pUOPKf7A', width: 1080, height: 160 },
  { id: 'GbLS6YVXj0U', width: 1080, height: 810 },
  { id: '9CRd1J1rEOM', width: 1080, height: 720 },
  { id: 'xKhtkhc9HbQ', width: 1080, height: 1440 },
];

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id, photo.width, photo.height),
  width: photo.width,
  height: photo.height,
  images: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return {
      src: unsplashLink(photo.id, breakpoint, height),
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

class GalleryIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Blog" />
        <HeroSmall title="Gallery" />
        <div className={styles.galleryWrapper}>
          <Gallery />
        </div>
      </Layout>
    );
  }
}

function Gallery() {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <PhotoAlbum
        photos={photos}
        layout="rows"
        targetRowHeight={250}
        onClick={(event, photo, newIndex) => setIndex(newIndex)}
      />

      <Lightbox slides={slides} open={index >= 0} index={index} close={() => setIndex(-1)} />
    </>
  );
}

export default GalleryIndex;

export const pageQuery = graphql`
  query GalleryIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 424, height: 212)
        }
        description {
          raw
        }
      }
    }
  }
`;
