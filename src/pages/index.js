import React from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../layout/layout';
import Hero from '../components/hero';
import Container from '../layout/container';
import * as styles from './index.module.scss';

// import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const { location } = this.props;
    // console.log(JSON.stringify(this))
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    const [home] = get(this, 'props.data.allContentfulHome.nodes');
    // const [author] = get(this, 'props.data.allContentfulPerson.nodes')

    // const sliderSettings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 3,
    //   slidesToScroll: 3,
    // };

    const url = 'https://ik.imagekit.io/bgmwrkfoi/tr:w-225';

    const crew = [
      {
        name: 'Lorem Ipsum',
        title: 'Captain',
        img: `${url}/pexels-yaroslav-shuraev-8916852_AthAIIh9q.jpg`,
      },
      {
        name: 'Lorem Ipsum',
        title: 'Captain',
        img: `${url}/pexels-cottonbro-4911148_tP1ocsiDL.jpg`,
      },
      {
        name: 'Lorem Ipsum',
        title: 'Captain',
        img: `${url}/pexels-cottonbro-5416484_ebwlIYqwG.jpg`,
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
        name: 'Lorem Ipsum',
        title: 'Captain',
        img: `${url}/pexels-cottonbro-4910960_8rc4FN-5x5.jpg`,
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
                <div className={styles.text}>
                  <div>
                    <h2>Welcome on board!</h2>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet
                      urna feugiat, varius quam quis, scelerisque odio. Pellentesque at feugiat
                      lorem, ac fermentum velit. Phasellus commodo ornare sem, vel volutpat turpis
                      congue nec. Pellentesque consequat elit bibendum fringilla rutrum.
                    </span>
                    <Link to="/">
                      <button type="button">Charter now</button>
                    </Link>
                  </div>
                </div>
                <div className={styles.img}>
                  <StaticImage
                    alt="text-image-image"
                    src="https://ik.imagekit.io/bgmwrkfoi/pexels-b-pixels-2258092_mKgtVaNG-.jpg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.textImageSecond}>
              <div className={styles.content}>
                <div className={styles.img}>
                  <StaticImage
                    alt="text-image-image"
                    src="https://ik.imagekit.io/bgmwrkfoi/yacht-charter-30_Z3PJvQORi.jpeg"
                  />
                </div>
                <div className={styles.text}>
                  <div>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet
                      urna feugiat, varius quam quis, scelerisque odio.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.crew}>
            <div className={styles.content}>
              <h2>Meet the crew!</h2>
              <div className={styles.members}>
                {/* eslint-disable-next-line array-callback-return,react/jsx-props-no-spreading */}
                {/* <Slider dots infinite speed="500" slidesToShow="3" slidesToScroll="3"> */}
                {crew.map((item) => (
                  <div key={item.name}>
                    <img alt={item.name} src={item.img} width="300px" />
                    <h4>{item.name}</h4>
                    <span>{item.title}</span>
                  </div>
                ))}
                {/* </Slider> */}
              </div>
            </div>
          </section>
          <section className={styles.video}>Blog</section>
          <section className={styles.video}>Gallery</section>
          <section className={styles.video}>Charter now</section>
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
        heroImage {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 1180)
        }
      }
    }
  }
`;
