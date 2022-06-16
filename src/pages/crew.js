import React from 'react';
import { graphql, Link } from 'gatsby';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './crew.module.scss';
import { getImg } from '../util/get-image';
import BigSlider from '../components/big-slider';

function mapSliderImages() {
  const images = [];
  for (let i = 1; i <= 5; i++) {
    images.push({
      name: `food-${i}`,
    });
  }
  return images;
}

class CrewIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Crew" />
        <HeroSmall title="Crew" />
        <div className={styles.crewWrapper}>
          <section className={styles.left}>
            <div>
              <img alt="captain" width="500" src={getImg('crew-2', 500)} />
            </div>
            <div>
              <h2>Captain</h2>
              <span>
                Lars has more than 36 years of sailing experience, being passionate about boats and
                sailing since he was a little boy. Racing yachts or dinghys or taking part in World
                or European Championchips - you are in best hands!
              </span>
              <Link to="/crew/">
                <button>Captain CV</button>
              </Link>
            </div>
          </section>
          <section className={styles.right}>
            <div>
              <h2>Stew</h2>
              <span>
                Kerry is highly motivated and has long years of experience in hospitality. She enyos
                meeting people, planning itineraries or events but does also take care of your
                laundry or any other aspect of your holidays.
              </span>
              <Link to="/crew/">
                <button>Stew CV</button>
              </Link>
            </div>
            <div>
              <img alt="captain" width="500" src={getImg('crew-1', 500)} />
            </div>
          </section>
          <section className={styles.left}>
            <div>
              <img alt="captain" width="500" src={getImg('crew-2', 500)} />
            </div>
            <div>
              <h2>Chef</h2>
              <span>
                Your are most welcome if you are a high end foody! Our energetic chef with his blend
                of creativity, passion for food and exceptional cooking skills will source the best
                ingredients on local markets and serve the most delicious meals ever. Let im spoil
                you!
              </span>
              <Link to="/crew/">
                <button>Chef CV</button>
              </Link>
            </div>
          </section>
          <section className={styles.food}>
            <BigSlider
              images={mapSliderImages()}
              width={850}
              height={1300}
              addSettings={{
                slidesToShow: 2,
                autoplay: true,
                speed: 1000,
                autoplaySpeed: 3500,
                pauseOnHover: true,
                cssEase: 'ease',
              }}
            />
          </section>
        </div>
      </Layout>
    );
  }
}

export default CrewIndex;

export const pageQuery = graphql`
  query CrewIndexQuery {
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
