import React from 'react';
import { Link } from 'gatsby';
import * as styles from './footer.module.scss';
import Container from './container';
import { getImg } from '../util/get-image';

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
            <img className={styles.logo} alt="logo" src={getImg('logo-blue.svg')} />
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
