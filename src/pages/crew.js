import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './crew.module.scss';

class CrewIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Crew" />
        <HeroSmall title="Crew" />
        <div className={styles.crewWrapper}>hello</div>
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
