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
        <video
          width={width}
          height={height}
          ref={videoRef}
          playsInline // Prevent fullscreen on mobiles
          controls // Allows user to interact with play button
          autoPlay
          muted
        >
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
      {/* <video */}
      {/*  poster="https://media.wajer.com/content/images/home/212643/Wajer-Yachts-77-homepage_f9ccbd90f4f2acfc2a27d6de8c4570f2.jpg" */}
      {/*  playsInline */}
      {/*  autoPlay */}
      {/*  muted */}
      {/*  loop */}
      {/* > */}
      {/*  <source */}
      {/*    src="https://media.wajer.com/content/videos/home/EDITWEBSITE_HOME_V2_SMALL.mp4" */}
      {/*    type="video/mp4" */}
      {/*  /> */}
      {/*  <track default kind="captions" /> */}
      {/*  Sorry, your browser doesnt support embedded videos. */}
      {/* </video> */}
      {/* <div className={styles.header}> */}
      {/*  <img className={styles.logo} alt="logo" src={getImg('logo-white.svg')} /> */}
      {/* </div> */}
    </div>
  );
}

export default Hero;

// function Hero({ heroTitle, heroImage, heroSubtitle }) {
//   return (
//     <div className={styles.hero}>
//       <div className={styles.hero}>
//         {heroImage && <GatsbyImage className={styles.image} alt={heroTitle} image={heroImage} />}
//         <div className={styles.details}>
//           <h1 className={styles.title}>{heroTitle} Test</h1>
//           {heroSubtitle && <div className={styles.content}>{heroSubtitle}</div>}
//         </div>
//       </div>
//     </div>
//   );
// }
