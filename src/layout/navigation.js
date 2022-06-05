import React from 'react';
import { Link } from 'gatsby';

import * as styles from './navigation.module.scss';

function Navigation() {
  return <nav role="navigation" aria-label="Main">
    <div className={styles.container}>
      <Link to="/" className={styles.logoLink}>
        <span className={styles.logo} />
        <span className={styles.navigationItem}>SY Serendipity</span>
      </Link>
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/" activeClassName="active">
            Home
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/blog/" activeClassName="active">
            Blog
          </Link>
        </li>
      </ul>
    </div>
  </nav>
}

export default Navigation;
