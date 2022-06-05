import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../layout/layout';
import Hero from '../components/hero';

// import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const { location } = this.props;
    // console.log(JSON.stringify(this))
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    const [home] = get(this, 'props.data.allContentfulHome.nodes');
    // const [author] = get(this, 'props.data.allContentfulPerson.nodes')

    return (
      <Layout location={location}>
        <Hero
          heroTitle={home.heroTitle}
          heroImage={home.heroImage}
          heroSubtitle={home.heroSubtitle}
        />
        {/* <ArticlePreview posts={posts} /> */}
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
