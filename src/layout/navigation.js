import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';

import * as styles from './navigation.module.scss';

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
    <nav role="navigation" className={scroll > -50 ? 'navi scrolled' : 'navi'} aria-label="Main">
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          {/* <span className={styles.logo} /> */}
          <h3 className={styles.navigationItem}>SY Serendipity</h3>
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
  );
}

export default Navigation;
