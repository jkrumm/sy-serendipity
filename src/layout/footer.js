import React from 'react';
import { Link } from 'gatsby';
import * as styles from './footer.module.scss';
import Container from './container';
import { getImg } from '../util/get-image';

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
          <div>
            <img className={styles.logo} alt="logo" src={getImg('logo-blue.svg')} />
            <span className={styles.copyright}>Ⓒ 2022 - SY Serendipity</span>
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
              <Link to="#" activeClassName="active">
                Legal Disclaimer
              </Link>
            </span>
            <span>
              <Link to="#" activeClassName="active">
                Privacy Policy
              </Link>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
