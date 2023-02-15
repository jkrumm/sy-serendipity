/* eslint-disable */

import React from 'react';
import get from 'lodash/get';

import Seo from '../../layout/seo';
import Layout from '../../layout/layout';
import ArticlePreview from '../../components/article-preview';
import HeroSmall from '../../components/hero-small';

class BlogIndex extends React.Component {
  render() {
    const { location } = this.props;
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Blog" />
        <HeroSmall title="Blog" />
        <ArticlePreview posts={posts} />
      </Layout>
    );
  }
}

// export default BlogIndex;
//
// export const pageQuery = graphql`
//   query BlogIndexQuery {
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
