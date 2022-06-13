import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './about.module.scss';
import BigSlider from '../components/big-slider';
import { getImg, getImgCropped } from '../util/get-image';

function mapSliderImages() {
  const images = [];
  for (let i = 1; i <= 25; i++) {
    images.push({
      name: `inside-${i}`,
    });
  }
  return images;
}

const sliderImages = [
  {
    name: 'technical-1',
    description: 'Blueprint of the top floor and the deck',
  },
  {
    name: 'technical-2',
    description: 'Blueprint of the ground floor and the basement',
  },
];

class AboutIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Blog" />
        <HeroSmall title="About" />
        <div className={styles.aboutWrapper}>
          <section className={styles.cruising}>
            <div>
              <h2>Cruising</h2>
              <span>
                If you focus on some of the most romantic destinations to explore by boat or want to
                discover sacred spaces - the idyllic islands of the Adriatic, Caribbean,
                Mediterranean and Indian Ocean await you in comfort and with style. The world most
                exceptional places await you. Set sail to dive, snorkel or surf the most beat
                beautiful islands in the world!
              </span>
              <div>
                <img alt="caribbean-20" src={getImgCropped('caribbean-20', 320, 400)} />
                <img alt="mediterranean-1" src={getImgCropped('mediterranean-1', 320, 400)} />
              </div>
            </div>
            <div>
              <img alt="mediterranean-11" src={getImg('mediterranean-11', 550)} />
            </div>
          </section>
          <section className={styles.accommodation}>
            <h2>Accommodation</h2>
            <div>
              <span>
                The yacht has been designed with relaxation in mind. Natural materials such as wood
                and organic cotton are gentle on the eye, so the real star – the natural beauty of
                surrounding nature can take centre stage. Spacious decks with daybeds, dining areas
                offer great vantage points to enjoy the spectacular scenery.
              </span>
              <span>
                She also offers ample space for socialising, both inside and out. Her generous
                saloon includes U-shaped sofas, formal dining, an office area and a chic corner bar.
                This space connects via sliding doors to the large al fresco dining and lounge area
                in the aft cockpit.
              </span>
            </div>
            <div className={styles.slideshow}>
              <BigSlider
                images={mapSliderImages()}
                width={1500}
                height={900}
                addSettings={{
                  slidesToShow: 2,
                  autoplay: true,
                  speed: 1000,
                  autoplaySpeed: 3500,
                  pauseOnHover: true,
                  cssEase: 'ease',
                }}
              />
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default AboutIndex;

export const pageQuery = graphql`
  query AboutIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        description {
          raw
        }
      }
    }
  }
`;
