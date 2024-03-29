import React from 'react';
import { Link } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import Container from '../layout/container';
import Tags from './tags';
import * as styles from './article-preview.module.scss';

function ArticlePreview({ posts }) {
  if (!posts) return null;
  if (!Array.isArray(posts)) return null;

  return (
    <Container>
      <ul className={styles.articleList}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className={styles.link}>
              {/* <GatsbyImage alt="" image={post.heroImage.gatsbyImageData} /> */}
              <h2 className={styles.title}>{post.title}</h2>
            </Link>
            <div>{post.description?.raw && renderRichText(post.description)}</div>
            <div className={styles.meta}>
              <small className="meta">{post.publishDate}</small>
              <Tags tags={post.tags} />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default ArticlePreview;
