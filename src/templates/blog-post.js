import React from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import readingTime from 'reading-time';

import Seo from '../layout/seo';
import Layout from '../layout/layout';
import Tags from '../components/tags';
import * as styles from './blog-post.module.scss';
import HeroSmall from '../components/hero-small';

class BlogPostTemplate extends React.Component {
  render() {
    const { location } = this.props;
    const post = get(this.props, 'data.contentfulBlogPost');
    const previous = get(this.props, 'data.previous');
    const next = get(this.props, 'data.next');
    const plainTextDescription = documentToPlainTextString(JSON.parse(post.description.raw));
    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw));
    const { minutes: timeToRead } = readingTime(plainTextBody);

    return (
      <Layout location={location}>
        <Seo
          title={post.title}
          description={plainTextDescription}
          // image={`http:${post.heroImage.resize.src}`}
        />
        <HeroSmall title={post.title} />
        <section>
          <div className={styles.container}>
            <span className={styles.meta}>
              {post.author?.name} &middot;
              <time dateTime={post.rawDate}>{post.publishDate}</time> – {timeToRead} minute read
            </span>
            <div className={styles.article}>
              <div className={styles.body}>{post.body?.raw && renderRichText(post.body)}</div>
              <Tags tags={post.tags} />
              {(previous || next) && (
                <nav>
                  <ul className={styles.articleNavigation}>
                    {previous && (
                      <li>
                        <Link to={`/blog/${previous.slug}`} rel="prev">
                          ← {previous.title}
                        </Link>
                      </li>
                    )}
                    {next && (
                      <li>
                        <Link to={`/blog/${next.slug}`} rel="next">
                          {next.title} →
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $previousPostSlug: String, $nextPostSlug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      body {
        raw
      }
      tags
      description {
        raw
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`;

// heroImage {
//   gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
//   resize(height: 630, width: 1200) {
//     src
//   }
// }
