import React from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import Layout from '../layout/layout';
import Hero from '../components/hero';
import Container from '../layout/container';
import * as styles from './index.module.scss';
import { getImg } from '../util/get-image';

// import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const { location } = this.props;
    // console.log(JSON.stringify(this))
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    const [home] = get(this, 'props.data.allContentfulHome.nodes');
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

    const crew = [
      {
        name: 'Lars',
        title: 'Captain',
        img: getImg('crew-2', 250),
      },
      {
        name: 'Kerry',
        title: 'Captain',
        img: getImg('crew-1', 250),
      },
      {
        name: 'Lars',
        title: 'Captain',
        img: getImg('crew-2', 250),
      },
      // {
      //   name: 'Lorem Ipsum',
      //   title: 'Captain',
      //   img: 'https://ik.imagekit.io/bgmwrkfoi/pexels-cottonbro-5370854_pW_okXTNe.jpg',
      // },
      // {
      //   name: 'Lorem Ipsum',
      //   title: 'Captain',
      //   img: 'https://ik.imagekit.io/bgmwrkfoi/pexels-cottonbro-4934601_gteTeSivc.jpg',
      // },
      {
        name: 'Kerry',
        title: 'Captain',
        img: getImg('crew-1', 250),
      },
    ];

    return (
      <Layout location={location}>
        <Container as="main">
          <Hero
            heroTitle={home.heroTitle}
            heroImage={home.heroImage}
            heroSubtitle={home.heroSubtitle}
          />
          <section>
            <div className={styles.textImage}>
              <div className={styles.content}>
                <div className={styles.img}>
                  <img alt="sy-serendipity-top" width="400" src={getImg('ship-11', 400)} />
                </div>
                <div className={styles.text}>
                  <div>
                    <Link to="/about/">
                      <h2>Serendipity I. set sails. Now.</h2>
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
                        <button type="button">View About</button>
                      </Link>
                      <Link to="/gallery/">
                        <button type="button">View Gallery</button>
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet
                      urna feugiat, varius quam quis, scelerisque odio.
                    </span>
                  </div>
                </div>
                <div className={styles.img}>
                  <img alt="text-image-image" src={getImg('ship-15', 525)} />
                </div>
              </div>
            </div>
          </section>
          <section className={styles.crew}>
            <div className={styles.content}>
              <Link to="/crew/">
                <h2>Meet the crew</h2>
              </Link>
              <div className={styles.members}>
                {/* eslint-disable-next-line array-callback-return,react/jsx-props-no-spreading */}
                {/* <BigSlider dots infinite speed="500" slidesToShow="3" slidesToScroll="3"> */}
                {crew.map((item) => (
                  <Link to="/crew/" key={item.name}>
                    <img alt={item.name} src={item.img} width="300px" />
                    <h4>{item.name}</h4>
                    <span>{item.title}</span>
                  </Link>
                ))}
                {/* </BigSlider> */}
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
                    <Link to="/gallery/">
                      <h2>Take a look inside</h2>
                    </Link>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet
                      urna feugiat, varius quam quis, scelerisque odio. Pellentesque at feugiat
                      lorem, ac fermentum velit. Phasellus commodo ornare sem, vel volutpat turpis
                      congue nec. Pellentesque consequat elit bibendum fringilla rutrum.
                    </span>
                    <div className="button-group">
                      <Link to="/about/">
                        <button type="button">View About</button>
                      </Link>
                      <Link to="/gallery/">
                        <button type="button">View Gallery</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulHome {
      nodes {
        heroTitle
        heroSubtitle
      }
    }
    ship11: allContentfulAsset(filter: { title: { eq: "ship-11" } }) {
      nodes {
        gatsbyImage(height: 585, layout: FULL_WIDTH, width: 390, quality: 80)
        gatsbyImageData
      }
    }
    ship2: allContentfulAsset(filter: { title: { eq: "ship-2" } }) {
      nodes {
        gatsbyImage(height: 1000, layout: FULL_WIDTH, width: 1700, quality: 80)
        gatsbyImageData
      }
    }
  }
`;
