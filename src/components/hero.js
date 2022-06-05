import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import * as styles from './hero.module.scss';

function Hero() {
  return (
    <div className={styles.hero}>
      <StaticImage
        className={styles.image}
        alt="heroTitle"
        src="https://ik.imagekit.io/bgmwrkfoi/pexels-maahid-photos-5890136_2__7r42_gIJ7.jpg"
      />
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
