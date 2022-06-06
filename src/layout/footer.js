import React from 'react';
import * as styles from './footer.module.scss';
import Container from './container';

function Footer() {
  return (
    <footer className={styles.container}>
      <Container as="div">
        Built with <a href="https://contentful.com/">Contentful</a> and{' '}
        <a href="https://gatsbyjs.com">Gatsby</a> &middot;{' '}
        <a href="https://github.com/contentful/starter-gatsby-blog">Source</a>
      </Container>
    </footer>
  );
}

export default Footer;
