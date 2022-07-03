import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layout/layout';
import Hero from '../components/hero';
import Container from '../layout/container';
import * as styles from './index.module.scss';
import { getImg, getImgCropped } from '../util/get-image';
import H2 from '../components/h2';

// import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const { location } = this.props;
    // console.log(JSON.stringify(this))
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    // const [home] = get(this, 'props.data.allContentfulHome.nodes');
    // const ship11 = get(this, 'props.data.ship11.nodes.gatsbyImageData');

    // const [author] = get(this, 'props.data.allContentfulPerson.nodes')

    // const sliderSettings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 3,
    //   slidesToScroll: 3,
    // };

    // const url = 'https://ik.imagekit.io/bgmwrkfoi/tr:w-250';

    return (
      <Layout location={location}>
        <Hero
        // heroTitle={home.heroTitle}
        // heroImage={home.heroImage}
        // heroSubtitle={home.heroSubtitle}
        />
        <Container as="main">
          <section>
            <div className={styles.textImage}>
              <div className={styles.content}>
                <div className={styles.img}>
                  <img alt="sy-serendipity-top" width="400" src={getImg('ship-11', 400)} />
                </div>
                <div className={styles.text}>
                  <div>
                    <Link to="/about/">
                      <H2 title="Serendipity I. Set sails. Now." />
                    </Link>
                    <span>
                      Some of the world’s most spectacular destinations are best experienced on the
                      water. Enjoy an unrivalled sense of discovery, promise the highest level of
                      exclusivity and luxury.
                      <br />
                      <br />
                      For the epitome of adventure, or an elegant effortless family & friends trip,
                      you discover astounding nature as well as cultural riches of port cities and
                      remote archipelagos across the globe.
                    </span>
                    <div className="button-group">
                      <Link to="/about/">
                        <button type="button">About</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.textImageSecond}>
              <div className={styles.content}>
                <div className={styles.text}>
                  <div>
                    <span>
                      Tell us about your passions, curiosities and motivations, and we will take you
                      on a once-in-a-lifetime adventure, filled with priceless memories and
                      unforgettable moments. We craft a perfectly tailored itinerary. Perhaps you
                      have an experience in mind, but you’re unsure if it exists?
                    </span>
                  </div>
                </div>
                <div className={styles.img}>
                  <img alt="text-image-image" src={getImg('ship-15', 525)} />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className={styles.textImageThird}>
              <div className={styles.content}>
                <div className={styles.img}>
                  <img alt="sy-serendipity-top" src={getImg('inside-1', 420)} />
                  <img alt="sy-serendipity-top" src={getImg('inside-15', 420)} />
                </div>
                <div className={styles.text}>
                  <div>
                    <Link to="/about/">
                      <H2 title="Take a look inside" />
                    </Link>
                    <span>
                      We promise the highest level of exclusivity and luxury on every voyage. The
                      yacht has been designed with relaxation in mind. Natural materials such as
                      wood, leather and organic cotton are gentle on the eye, so the real star – the
                      natural beauty of surrounding nature can take centre stage. Spacious decks
                      with daybeds, dining areas offer great vantage points to enjoy the spectacular
                      scenery.
                    </span>
                    <div className="button-group">
                      <Link to="/about/">
                        <button type="button">About</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.destinations}>
            <H2 title="Tailor your trip" subtitle="Destinations" addClassName="center" />
            <div>
              <span>
                A lush yacht holiday on Serendipity I promises freedom, privacy and luxury on the
                open ocean. Moor up in exclusive marinas. Hop between charming harbour towns.
                Explore hidden coves, dive spots and archipelagos – all at your own pace.
                <br />
                <br />
                Imagine golden sand, the sound of gentle rolling waves and a warm sea breeze. Add
                attentive service and a stress-free itinerary planned down to the smallest detail
                and you have arrived in your unparalled private trip.
              </span>
            </div>
            <div className={styles.destinationsHeadlines}>
              <div>
                <h3>Mediterranean</h3>
                <span>From June to November</span>
                <span>Italy, Greece, France or islands</span>
              </div>
              <div>
                <h3>Caribbean</h3>
                <span>From December to May</span>
                <span>Caribbean, Maldives, Seychelles</span>
              </div>
            </div>
            {/*TODO: remove*/}
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
            <Link to="/request/">
              <button className="action">
                <h2>REQUEST NOW</h2>
              </button>
            </Link>
          </section>
        </Container>
      </Layout>
    );
  }
}

export default RootIndex;

// export const pageQuery = graphql`
//   query HomeQuery {
//     allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
//       nodes {
//         title
//         slug
//         publishDate(formatString: "MMMM Do, YYYY")
//         tags
//         heroImage {
//           gatsbyImageData(
//             layout: FULL_WIDTH
//             placeholder: BLURRED
//             width: 424
//             height: 212
//           )
//         }
//         description {
//           raw
//         }
//       }
//     }
//     allContentfulPerson(
//       filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
//     ) {
//       nodes {
//         name
//         shortBio {
//           raw
//         }
//         title
//         heroImage: image {
//           gatsbyImageData(
//             layout: CONSTRAINED
//             placeholder: BLURRED
//             width: 1180
//           )
//         }
//       }
//     }
//   }
// `

// export const pageQuery = graphql`
//   query HomeQuery {
//     allContentfulHome {
//       nodes {
//         heroTitle
//         heroSubtitle
//       }
//     }
// `;

// ship11: allContentfulAsset(filter: { title: { eq: "ship-11" } }) {
//   nodes {
//     gatsbyImage(height: 585, layout: FULL_WIDTH, width: 390, quality: 80)
//     gatsbyImageData
//   }
// }
// ship2: allContentfulAsset(filter: { title: { eq: "ship-2" } }) {
//   nodes {
//     gatsbyImage(height: 1000, layout: FULL_WIDTH, width: 1700, quality: 80)
//     gatsbyImageData
//   }
// }
// }
