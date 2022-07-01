import React from 'react';
import * as styles from './hero.module.scss';
import { getImg } from '../util/get-image';

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} alt="heroTitle" src={getImg('ship-16')} />
      </div>
      {/*<video*/}
      {/*  poster="https://media.wajer.com/content/images/home/212643/Wajer-Yachts-77-homepage_f9ccbd90f4f2acfc2a27d6de8c4570f2.jpg"*/}
      {/*  playsInline*/}
      {/*  autoPlay*/}
      {/*  muted*/}
      {/*  loop*/}
      {/*>*/}
      {/*  <source*/}
      {/*    src="https://media.wajer.com/content/videos/home/EDITWEBSITE_HOME_V2_SMALL.mp4"*/}
      {/*    type="video/mp4"*/}
      {/*  />*/}
      {/*  <track default kind="captions" />*/}
      {/*  Sorry, your browser doesnt support embedded videos.*/}
      {/*</video>*/}
      {/*<div className={styles.header}>*/}
      {/*  <img className={styles.logo} alt="logo" src={getImg('logo-white.svg')} />*/}
      {/*</div>*/}
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
