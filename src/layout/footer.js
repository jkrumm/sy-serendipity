import React from 'react';
import { Link } from 'gatsby';
import * as styles from './footer.module.scss';
import Container from './container';
import { getImgOld } from '../util/get-image';

function Footer() {
  return (
    <footer className={`${styles.container} footer`}>
      <Container as="div">
        <div className={styles.flexbox}>
          <div>
            <span>
              <Link to="/" activeClassName="active">
                Home
              </Link>
            </span>
            <span>
              <Link to="/about/" activeClassName="active">
                About
              </Link>
            </span>
            <span>
              <Link to="/crew/" activeClassName="active">
                Crew
              </Link>
            </span>
            <span>
              <Link to="/gallery/" activeClassName="active">
                Gallery
              </Link>
            </span>
          </div>
          <div className={styles.logoWrapper}>
            <Link to="/">
              <img className={styles.logo} alt="logo" src={getImgOld('logo-blue.svg')} />
            </Link>
          </div>
          <div>
            <span>
              <Link to="/request" activeClassName="active">
                Request
              </Link>
            </span>
            <span>
              <Link to="/technical/" activeClassName="active">
                Technical
              </Link>
            </span>
            <span>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="/legal-disclaimer/" activeClassName="active">
                Legal Disclaimer
              </Link>
            </span>
            <span>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="/legal-disclaimer/" activeClassName="active">
                Privacy Policy
              </Link>
            </span>
          </div>
        </div>
        <span className={styles.copyright}>Ⓒ {new Date().getFullYear()} - SY SERENDIPITY I</span>
      </Container>
    </footer>
  );
}

export default Footer;
