import React from 'react';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as styles from './technical.module.scss';

import { getImg } from '../util/get-image';
import BigSlider from '../components/big-slider';

const data = [
  [
    { value: 'Yard', metric: 'Perini Navi' },
    { value: 'Type', metric: 'Sailing Yacht' },
  ],
  [
    { value: 'Guests', metric: '8' },
    { value: 'Crew', metric: '6' },
    { value: 'Cabins', metric: '4' },
  ],
  [
    { value: 'Length', metric: '45 m / 147′8″ ft' },
    { value: 'Beam', metric: '9.73 m / 32′0″ ft' },
    { value: 'Draft', metric: '3.9 m / 12′10″ ft' },
  ],
  [
    { value: 'Year of build', metric: '2011' },
    { value: 'Classification', metric: 'ABS' },
    { value: 'Displacement', metric: 'Sailing Yacht' },
  ],
];

const dataDesign = [
  [
    { value: 'Gross tonage', metric: '325' },
    { value: 'Hull', metric: 'Steel' },
    { value: 'Superstructure', metric: 'Aluminium' },
  ],
  [
    { value: 'Decking', metric: 'Teak' },
    { value: 'Decks', metric: '3' },
  ],
  [
    { value: 'Interior designer', metric: 'Perini Navi' },
    { value: 'Exterior designer', metric: 'Ron Holland' },
  ],
];

const dataMotor = [
  [
    { value: 'Model', metric: 'C32' },
    { value: 'Engine power', metric: '1100 hp' },
    { value: 'Total power', metric: '1100 hp' },
  ],
  [
    { value: 'Maximum Speed', metric: '14 knots' },
    { value: 'Cruising speed', metric: '10,5 knots' },
  ],
  [
    { value: 'Tender', metric: 'Conrad Pischel' },
    { value: 'Water capacity', metric: '8200 l' },
  ],
];

const sliderImages = [
  {
    name: 'technical-1',
    description: 'Blueprint of the top floor and the deck',
  },
  {
    name: 'technical-2',
    description: 'Blueprint of the ground floor and the basement',
  },
];

class TechnicalIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Technical" />
        <HeroSmall title="Technical" />
        <div className={styles.technicalWrapper}>
          <section className={styles.technical}>
            <img alt="blueprint" src={getImg('technical-3', 500)} width="500" />
            <div className={styles.data}>
              <h3>Technical Data</h3>
              {data.map((itemData, index) => (
                <div key={index} className={styles.item}>
                  {itemData.map((subItemData, subIndex) => (
                    <div key={subIndex} className={styles.subItem}>
                      <span className={styles.value}>{subItemData.value}</span>
                      <span className={styles.metric}>{subItemData.metric}</span>
                    </div>
                  ))}
                </div>
              ))}
              <h3>Design</h3>
              {dataDesign.map((itemData, index) => (
                <div key={index} className={styles.item}>
                  {itemData.map((subItemData, subIndex) => (
                    <div key={subIndex} className={styles.subItem}>
                      <span className={styles.value}>{subItemData.value}</span>
                      <span className={styles.metric}>{subItemData.metric}</span>
                    </div>
                  ))}
                </div>
              ))}
              <h3>Motor</h3>
              {dataMotor.map((itemData, index) => (
                <div key={index} className={styles.item}>
                  {itemData.map((subItemData, subIndex) => (
                    <div key={subIndex} className={styles.subItem}>
                      <span className={styles.value}>{subItemData.value}</span>
                      <span className={styles.metric}>{subItemData.metric}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
          <section className={styles.slideshow}>
            <div>
              <BigSlider images={sliderImages} width={1500} height={900} />
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default TechnicalIndex;

// export const pageQuery = graphql`
//   query TechnicalIndexQuery {
//     allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
//       nodes {
//         title
//         slug
//         publishDate(formatString: "MMMM Do, YYYY")
//         tags
//         description {
//           raw
//         }
//       }
//     }
//   }
// `;
