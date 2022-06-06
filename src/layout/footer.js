import React from 'react';
import { Link } from 'gatsby';
import * as styles from './footer.module.scss';
import Container from './container';

function Footer() {
  return (
    <footer className={styles.container}>
      <Container as="div">
        <div className={styles.flexbox}>
          <div>
            <span>
              <Link to="/">Lorem Ipsum</Link>
            </span>
            <span>
              <Link to="/">Lorem Ipsum</Link>
            </span>
            <span>
              <Link to="/">Lorem Ipsum</Link>
            </span>
            <span>
              <Link to="/">Lorem Ipsum</Link>
            </span>
          </div>
          <div>
            <img
              className={styles.logo}
              alt="logo"
              src="https://ik.imagekit.io/bgmwrkfoi/logo-serendipity_rByrYs-ck.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1654454047082"
            />
            <span className={styles.copyright}>Ⓒ 2022 - SY Serendipity</span>
          </div>
          <div>
            <span>
              <Link to="/">Lorem Ipsum</Link>
            </span>
            <span>
              <Link to="/">Lorem Ipsum</Link>
            </span>
            <span>
              <Link to="/">Lorem Ipsum</Link>
            </span>
            <span>
              <Link to="/">Lorem Ipsum</Link>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
