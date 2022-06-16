import React from 'react';
import { graphql, Link } from 'gatsby';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './about.module.scss';
import BigSlider from '../components/big-slider';
import { getImg, getImgCropped } from '../util/get-image';

function mapSliderImages() {
  const images = [];
  for (let i = 1; i <= 25; i++) {
    if (i !== 10 && i !== 12 && i !== 20 && i !== 25 && i !== 18) {
      images.push({
        name: `inside-${i}`,
      });
    }
  }
  return images;
}

// const sliderImages = [
//   {
//     name: 'technical-1',
//     description: 'Blueprint of the top floor and the deck',
//   },
//   {
//     name: 'technical-2',
//     description: 'Blueprint of the ground floor and the basement',
//   },
// ];

class AboutIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="About" />
        <HeroSmall title="About" />
        <div className={styles.aboutWrapper}>
          <section className={styles.cruising}>
            <div>
              <h2>Tailor your trip</h2>
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
            <h2 className="center">slow mode</h2>
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
          <section className={styles.activities}>
            <div className={styles.textImage}>
              <div className={styles.content}>
                <div className={styles.img}>
                  <img alt="sport-snorkeling" width="400" src={getImg('sport-2', 400)} />
                </div>
                <div className={styles.text}>
                  <div>
                    <h2>Challenge yourself</h2>
                    <span>
                      Serendipity I is packed with a unbearable selection of water toys as well as
                      various amenities to spoil you.
                      <br />
                      <strong>Toys</strong>
                      <ul>
                        <li>Seabobs</li>
                        <li>Tiwal 3</li>
                        <li>SUP Boards</li>
                        <li>Kayak</li>
                        <li>Scuba Diving/Snorkeling equipment in various sizes</li>
                        <li>eFoil</li>
                        <li>Wakeboard</li>
                        <li>Water skis (kids & adults)</li>
                        <li>wet suits</li>
                        <li>water donught</li>
                        <li>weights, skip, therabands</li>
                        <li>yoga mats</li>
                        <li>volleyball, football, ping pong rackets</li>
                      </ul>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.threeImages}>
              <img
                alt="sy-serendipity-top"
                width="400"
                height="600"
                src={getImgCropped('sport-3', 400, 600)}
              />
              <img
                alt="sy-serendipity-top"
                width="400"
                height="600"
                src={getImgCropped('mediterranean-3', 400, 600)}
              />
              <img
                alt="sy-serendipity-top"
                width="400"
                height="600"
                src={getImgCropped('sport-9', 400, 600)}
              />
            </div>
          </section>
          <section className={styles.technical}>
            <div>
              <img alt="technical-4" width="500" src={getImg('technical-4', 500)} />
            </div>
            <div>
              <h2>Blueprints and data</h2>
              <span>
                Serendipity I is a 45 m / 147′8″ luxury sailing yacht. She was built by Perini Navi
                in 2011. With a beam of 9.73 m and a draft of 3.9 m, she has a steel hull and
                aluminium superstructure. This adds up to a gross tonnage of 325 tons. She is
                powered by engines of 1100 hp each giving her a maximum speed of 14 knots and a
                cruising speed of 10.5 knots. The sailing yacht can accommodate 8 guests in 4 cabins
                including a full-beam owner’s cabin aft, with a queen-size bed, walk-in closets, a
                desk and a large en suite. There are also two convertible twins, a gym that can
                convert to a fourth small double as needed and all cabins have en suite shower
                facilities. The interior design is by Perini Navi and the exterior design by Ron
                Holland Serendipity I is ABS classed and MCA compliant.
              </span>

              <Link to="/technical/">
                <button type="button">View Technical Data</button>
              </Link>
            </div>
          </section>
          <section className={styles.destinations}>
            <h2 className="center">Tailor your trip</h2>
            <div>
              <span>
                A lush yacht holiday on Serendipity I promises freedom, privacy and luxury on the
                open ocean. Moor up in exclusive marinas. Hop between charming harbour towns.
                Explore hidden coves, dive spots and archipelagos – all at your own pace.
              </span>
              <span>
                Imagine golden sand, the sound of gentle rolling waves and a warm sea breeze. Add
                attentive service and a stress-free itinerary planned down to the smallest detail
                and you have arrived in your unparalled private trip.
              </span>
            </div>
            <div className={styles.destinationsHeadlines}>
              <div>
                <h3>Mediterranean</h3>
                <span>In the summer from May to November</span>
                <span>Italy, Greece, South France</span>
              </div>
              <div>
                <h3>Caribbean</h3>
                <span>In the winter from November to April</span>
                <span>Caribbean, Maldives, Seychelles</span>
              </div>
            </div>
            <div className={styles.months}>
              <div>May</div>
              <div>June</div>
              <div>Juli</div>
              <div>September</div>
              <div>October</div>
              <div>November</div>
              <div>December</div>
              <div>January</div>
              <div>February</div>
              <div>March</div>
              <div>April</div>
            </div>
            <div className={styles.destinationsImages}>
              <img
                alt="sy-serendipity-top"
                width="600"
                height="400"
                src={getImgCropped('mediterranean-14', 600, 400)}
              />
              <img
                alt="sy-serendipity-top"
                width="600"
                height="400"
                src={getImgCropped('caribbean-31', 600, 400)}
              />
            </div>
            <Link to="/contact/">
              <button className="action">
                <h2>REQUEST NOW</h2>
              </button>
            </Link>
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
