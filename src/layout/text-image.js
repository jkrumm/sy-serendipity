import React from 'react';

import * as styles from './text-image.module.scss';

function TextImage({ text, img }) {
  return (
    <div className={styles.textImage}>
      <div className={styles.content}>
        <div className={styles.text}>{text}</div>
        <div className={styles.img}>{img}</div>
      </div>
    </div>
  );
}

export default TextImage;
