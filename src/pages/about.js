import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './about.module.scss';
import { getImg } from '../util/get-image';
import BigSlider from '../components/big-slider';

const data = [
  [
    { value: 'Yard', metric: 'Perini Navi', imperial: 'Perini Navi' },
    { value: 'Type', metric: 'Sailing Yacht', imperial: 'Sailing Yacht' },
  ],
  [
    { value: 'Guests', metric: '7', imperial: '7' },
    { value: 'Crew', metric: '6', imperial: '6' },
    { value: 'Cabins', metric: '4', imperial: '4' },
  ],
  [
    { value: 'Length', metric: '45 m', imperial: '147′8″' },
    { value: 'Beam', metric: '9.73 m', imperial: '32′0″' },
    { value: 'Draft', metric: '3.9 m', imperial: '12′10″' },
  ],
  [
    { value: 'Year of build', metric: '2011', imperial: '2011' },
    { value: 'Classification', metric: 'ABS', imperial: 'ABS' },
    { value: 'Displacement', metric: 'Sailing Yacht', imperial: 'Sailing Yacht' },
  ],
];

const dataDesign = [
  [
    { value: 'Gross tonage', metric: '325', imperial: '325' },
    { value: 'Hull', metric: 'Steel', imperial: 'Steel' },
    { value: 'Superstructure', metric: 'Aluminium', imperial: 'Aluminium' },
  ],
  [
    { value: 'Decking', metric: 'Teak', imperial: 'Teak' },
    { value: 'Decks', metric: '3', imperial: '3' },
  ],
  [
    { value: 'Interior designer', metric: 'Perini Navi', imperial: 'Perini Navi' },
    { value: 'Exterior designer', metric: 'Ron Holland', imperial: 'Ron Holland' },
  ],
];

const dataMotor = [
  [
    { value: 'Model', metric: 'C32', imperial: 'C32' },
    { value: 'Engine power', metric: '1100 hp', imperial: '1100 hp' },
    { value: 'Total power', metric: '1100 hp', imperial: '1100 hp' },
  ],
  [
    { value: 'Maximum Speed', metric: '14 knots', imperial: '14 knots' },
    { value: 'Cruising speed', metric: '10,5 knots', imperial: '10,5 knots' },
  ],
  [
    { value: 'Tender', metric: 'Conrad Pischel', imperial: 'Conrad Pischel' },
    { value: 'Water capacity', metric: '8200 l', imperial: '8200 l' },
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

class AboutIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Blog" />
        <HeroSmall title="About" />
        <div className={styles.aboutWrapper}>
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
          <section>
            <div className={styles.slideshow}>
              <BigSlider images={sliderImages} width={1500} height={900} />
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default AboutIndex;

export const pageQuery = graphql`
  query AboutIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        description {
          raw
        }
      }
    }
  }
`;
