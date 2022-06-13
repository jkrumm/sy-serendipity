import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './contact.module.scss';

class ContactIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Contact" />
        <HeroSmall title="Contact" />
        <div className={styles.contactWrapper}>hello</div>
      </Layout>
    );
  }
}

export default ContactIndex;

export const pageQuery = graphql`
  query ContactIndexQuery {
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
