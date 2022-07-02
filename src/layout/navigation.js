import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';

import * as styles from './navigation.module.scss';
import { getImg } from '../util/get-image';

const isBrowser = typeof window !== `undefined`;

const getScrollPosition = ({ element, useWindow }) => {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
};

export const useScrollPosition = (effect, deps, element, useWindow, wait) => {
  const position = useRef(getScrollPosition({ useWindow }));
  let throttleTimeout = null;

  const callBack = () => {
    const currentPosition = getScrollPosition({ element, useWindow });

    effect({ previousPosition: position.current, currentPosition });
    position.current = currentPosition;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait && !throttleTimeout) throttleTimeout = setTimeout(callBack, wait);
      else callBack();
    };

    window.addEventListener(`scroll`, handleScroll);

    return () => window.removeEventListener(`scroll`, handleScroll);
  }, deps);
};

function Navigation() {
  const [scroll, setScroll] = useState(0);

  useScrollPosition(({ currentPosition }) => {
    setScroll(currentPosition.y);
  });

  return (
    <nav role="navigation" aria-label="Main" className="main-navigation">
      <div className={`${styles.container}${scroll < -25 ? ' nav-scrolled' : ''}`}>
        <Link to="/" className={`${styles.logoLink}${scroll < -25 ? ' nav-scrolled-logo' : ''}`}>
          <img alt="logo" src={getImg('logo-blue-icon.png', 100)} />
          <h3 className={styles.navigationItem}>Serendipity I</h3>
        </Link>
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/" activeClassName="active">
              Home
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/about/" activeClassName="active">
              About
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/crew/" activeClassName="active">
              Crew
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/gallery/" activeClassName="active">
              Gallery
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/technical/" activeClassName="active">
              Technical
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/request/" activeClassName="active-button">
              <button>Request Now</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
