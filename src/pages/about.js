import React from 'react';
import { Link } from 'gatsby';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as styles from './about.module.scss';

import BigSlider from '../components/big-slider';
import { getImg, getImgCropped, getImgCroppedOld, getImgOld } from '../util/get-image';
import H2 from '../components/h2';

function mapSliderImages() {
  const images = [];
  const skippedImages = [
    2, 6, 9, 10, 11, 14, 15, 16, 17, 18, 20, 19, 22, 23, 24, 25, 27, 28, 30, 31, 36, 38, 41, 42, 44,
    45, 46, 47, 49, 50, 51, 52, 53, 55, 57, 58, 59, 60, 64, 65, 68, 71, 73, 74, 7679, 80, 82, 84,
    85, 86, 87, 88, 89,
  ];
  for (let i = 1; i <= 91; i += 1) {
    if (!skippedImages.includes(i)) {
      images.push({
        name: `inside-${i}`,
      });
    }
  }
  return images;
}

const crew = [
  {
    name: 'Scott Waterfield',
    title: 'Captain',
    img: getImgCropped('crew-21', 210, 270),
  },
  {
    name: 'Renee Weatherall',
    title: 'Chief Stewardess',
    img: getImgCropped('crew-20', 210, 270),
  },
  {
    name: 'Taryne Evans',
    title: 'Chef',
    img: getImgCropped('crew-22', 210, 270),
  },
];

class AboutIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="About" description="See what amazing destinations and activities await you." />
        <HeroSmall title="About" />
        <div className={styles.aboutWrapper}>
          <section className={styles.cruising}>
            <div>
              <H2 title="Tailor your trip" subtitle="Cruising" />
              <span>
                If you focus on some of the most romantic destinations to explore by boat or want to
                discover sacred spaces - the idyllic islands of the Adriatic, Caribbean,
                Mediterranean and Indian Ocean, the world most exceptional places, await you in
                comfort and with style. Set sail to dive, snorkel or surf the most beat beautiful
                islands in the world!
              </span>
              <div>
                <img
                  alt="caribbean-20"
                  src={getImgCroppedOld('caribbean-20', 320, 400)}
                  width="320"
                  height="400"
                />
                <img
                  alt="mediterranean-13"
                  src={getImgCroppedOld('mediterranean-13', 320, 400)}
                  width="320"
                  height="400"
                />
              </div>
            </div>
            <div>
              <img
                alt="mediterranean-11"
                src={getImgOld('mediterranean-11', 500, 625)}
                width="500"
                height="625"
              />
            </div>
          </section>
          <section className={styles.accommodation}>
            <H2 title="Slow Mode" subtitle="Interior" addClassName="center" />
            <div>
              <span>
                The yacht has been designed with relaxation in mind. Natural materials such as wood
                and organic cotton are gentle on the eye, so the real star – the natural beauty of
                surrounding nature can take centre stage. Spacious decks with daybeds and beanbags,
                dining areas offer great vantage points to enjoy the spectacular scenery.
                <br />
                <br />
                She also offers ample space for socialising, both inside and out. Her generous
                saloon includes large U-shaped sofas, formal dining, an office area and a chic
                corner bar. This space connects via sliding doors to the large al fresco dining and
                lounge area in the aft cockpit.
              </span>
            </div>
            <div>
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
                  <img
                    alt="sport-9"
                    width="400"
                    height="520"
                    loading="lazy"
                    src={getImgCropped('sport-11', 400, 520)}
                  />
                </div>
                <div className={styles.text}>
                  <div>
                    <H2 title="Challenge yourself" subtitle="Activities" />
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
                        <li>water doughnut</li>
                        <li>weights, skip, therabands</li>
                        <li>yoga mats</li>
                        <li>volleyball, football, ping pong rackets</li>
                      </ul>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.sportImages}>
              <div>
                <img
                  alt="sport-snorkeling"
                  width="460"
                  height="307"
                  loading="lazy"
                  src={getImg('ship-38', 460, 307)}
                />
              </div>
              <div>
                <img
                  alt="sport-snorkeling"
                  width="460"
                  height="307"
                  loading="lazy"
                  src={getImgCroppedOld('sport-11', 460, 307)}
                />
              </div>
            </div>
            {/* <div className={styles.threeImages}> */}
            {/*  <img */}
            {/*    alt="sy-serendipity-top" */}
            {/*    width="400" */}
            {/*    height="600" */}
            {/*    src={getImgCropped('sport-3', 400, 600)} */}
            {/*  /> */}
            {/*  <img */}
            {/*    alt="sy-serendipity-top" */}
            {/*    width="400" */}
            {/*    height="600" */}
            {/*    src={getImgCropped('mediterranean-3', 400, 600)} */}
            {/*  /> */}
            {/*  <img */}
            {/*    alt="sy-serendipity-top" */}
            {/*    width="400" */}
            {/*    height="600" */}
            {/*    src={getImgCropped('sport-9', 400, 600)} */}
            {/*  /> */}
            {/* </div> */}
          </section>
          <section className={styles.crew}>
            <div className={styles.content}>
              <Link to="/crew/">
                <h2 className="center">At your service</h2>
              </Link>
              <div className={styles.members}>
                {/* eslint-disable-next-line array-callback-return,react/jsx-props-no-spreading */}
                {/* <BigSlider dots infinite speed="500" slidesToShow="3" slidesToScroll="3"> */}
                {crew.map((item) => (
                  <Link to="/crew/" key={item.name}>
                    <img alt={item.name} src={item.img} loading="lazy" width="210" height="270" />
                    <h4>{item.name}</h4>
                    <span>{item.title}</span>
                  </Link>
                ))}
                {/* </BigSlider> */}
              </div>
            </div>
          </section>
          <section className={styles.technical}>
            <div>
              <img
                alt="technical-4"
                width="500"
                height="553"
                loading="lazy"
                src={getImgOld('technical-4', 500, 553)}
              />
            </div>
            <div>
              <H2 title="Blueprints and data" subtitle="Technical" />
              <span>
                Serendipity I is a 45 m / 147′8″ luxury sailing yacht. She was built by Perini Navi
                in 2011. With a beam of 9.73 m and a draft of 3.9 m, she has a steel hull and
                aluminium superstructure. This adds up to a gross tonnage of 325 tons. She is
                powered by engines of 1100 hp each giving her a maximum speed of 14 knots and a
                cruising speed of 10.5 knots.
                <br />
                <br />
                The sailing yacht can accommodate 8 guests in 4 cabins including a full-beam owner’s
                cabin aft, with a queen-size bed, walk-in closets, a desk and a large en suite.
                There are also two convertible twins, a gym that can convert to a fourth small
                double as needed and all cabins have en suite shower facilities. The interior design
                is by Perini Navi and the exterior design by Ron Holland Serendipity I is ABS
                classed and MCA compliant.
              </span>

              <Link to="/technical/">
                <button type="button">Technical Data</button>
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default AboutIndex;

// export const pageQuery = graphql`
//   query AboutIndexQuery {
//     allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
//       nodes {
//         title
//         slug
//         publishDate(formatString: "MMMM Do, YYYY")
//         tags
//         description {
//           raw
//         }
//       }
//     }
//   }
// `;
