import React from 'react';

import * as styles from './hero-small.module.scss';

function HeroSmall({ title }) {
  return (
    <div className={styles.heroSmall}>
      <h1>{title}</h1>
    </div>
  );
}

export default HeroSmall;
