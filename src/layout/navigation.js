import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';

import * as styles from './navigation.module.scss';
import { getImgOld } from '../util/get-image';

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
  const [scrolled, setScrolled] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const [highest, setHighest] = useState(-9999999);

  useScrollPosition(({ currentPosition }) => {
    if (currentPosition.y > highest) {
      setHighest(currentPosition.y);
    }

    if (currentPosition.y > -25 && highest > -25) {
      setScrolled(false);
    } else if (!isInit) {
      setScrolled(true);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setIsInit(false);
      if (window.pageYOffset > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }, 550);
  }, []);

  return (
    <nav role="navigation" aria-label="Main" className={`${styles.mainNavigation} main-navigation`}>
      <div className={`${styles.container}${scrolled ? ' nav-scrolled' : ''}`}>
        <Link
          to="/"
          className={`${styles.logoLink}${scrolled ? ' nav-scrolled-logo' : ''} nav-home-logo`}
        >
          <img alt="logo" src={getImgOld('logo-blue-icon.png', 100)} />
          <h3 className={styles.navigationItem}>Serendipity I</h3>
        </Link>
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/" activeClassName="active" className="nav-home">
              Home
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/about/" activeClassName="active" className="nav-about">
              About
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/crew/" activeClassName="active" className="nav-crew">
              Crew
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/gallery/" activeClassName="active" className="nav-gallery">
              Gallery
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/technical/" activeClassName="active" className="nav-technical">
              Technical
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/request/" activeClassName="active-button" className="nav-request">
              <button type="button">Request Now</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
