import React, { useEffect, useRef } from 'react';
import * as styles from './hero.module.scss';
import useWindowDimensions from '../util/window-dimensions';
import { getImg } from '../util/get-image';

function Hero() {
  const { height, width } = useWindowDimensions('fix');
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handlePlay = () => {
      video.play();
    };

    // Add event listeners for click and touch events
    video.addEventListener('click', handlePlay);
    video.addEventListener('touchstart', handlePlay);

    // Cleanup event listeners on unmount
    return () => {
      video.removeEventListener('click', handlePlay);
      video.removeEventListener('touchstart', handlePlay);
    };
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video width={width} height={height} ref={videoRef} playsInline controls autoPlay muted>
          <source
            src="https://ik.imagekit.io/bgmwrkfoi/sy-serendipty-1080.mov?updatedAt=1717936116217"
            type="video/mp4"
          />
          <img
            width={width}
            height={height - 250}
            className={styles.image}
            loading="eager"
            alt="heroTitle"
            src={getImg('ship-6', width, height)}
          />
        </video>
      </div>
    </div>
  );
}

export default Hero;
