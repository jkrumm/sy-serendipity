import React from 'react';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './crew.module.scss';
import { getImg, getImgCropped, getImgOld } from '../util/get-image';
import H2 from '../components/h2';

class CrewIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo title="Crew" />
        <HeroSmall
          title="Crew"
          description="Meet the highly trained who will guide you through your journey."
        />
        <div className={styles.crewWrapper}>
          <section className={styles.intro}>
            <img alt="crew-sailing" src={getImgOld('ship-21', 700, 394)} width="700" height="394" />
            <span>
              Our highly trained crew of seven will unobtrusively guide you during your journey,
              tailoring excursions and experiences to the tastes of you and your travel companions.
              Tell us about your passions, curiosities and motivations, and we will take you on a
              once-in-a-lifetime adventure, filled with priceless memories and unforgettable
              moments. Do you celebrate a special occasion? Let us know and we will present ideas to
              you.
            </span>
          </section>
          <section className={styles.left}>
            <div>
              <img
                alt="captain"
                width="350"
                height="460"
                src={getImgCropped('crew-11', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Scott" subtitle="Captain" />
              <span>
                Scott has been boating since he was 6 months old, started competitive windsurfing at
                15, bought his first keel boat at 19 and spent more than a decade racing as
                owner/driver in New Zealand’s top one design fleet racing class. His experience in
                superyachts has taken him around the traditional Mediterranean / Caribbean/Newport
                circuit but also to far flung places like the Amazon delta, Easter Island and the NZ
                sub-Antarctic islands. His strong safety focus has allowed him to sail nearly
                200,000 nautical miles worldwide without incident and holds the safety of guest and
                crew foremost – but also while having fun and encouraging a co-operative team
                spirit. He loves sharing his love for sailing and the ocean with guests on board.
                When he&#39;s not working you will find him sailing on his own high performance
                catamaran somewhere around the Pacific.
              </span>
            </div>
          </section>
          <section className={styles.right}>
            <div>
              <img
                alt="chief_stewardess"
                width="350"
                height="460"
                loading="lazy"
                src={getImgCropped('crew-9', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Katerina" subtitle="Chief Stewardess" />
              <span>
                Born in Skopje, Katerina was lured into the yachting industry in 2019 where she
                discovered a new passion, allowing her to show her hospitality skills and ability to
                make the boat feel like a home for crew and guests. Her Bachelor’s degree in
                Industrial Design has been an influence in giving her the aptness to understand the
                glamourous detail of the interior along with the ability to find solutions and
                overcome any obstacles that may arise. She prioritises serving the guests at the
                highest standard to ensure that they are happy. She is positive, friendly and always
                happy to help out.
              </span>
            </div>
          </section>
          <section className={`${styles.left} ${styles.chef}`}>
            <div>
              <img
                alt="chef"
                width="350"
                height="460"
                loading="lazy"
                src={getImgCropped('crew-12', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Simon" subtitle="Chef" />
              <span>
                Cooking became essential for Simon at a very young age, having seen his mother
                acting as the family chef with love and passion. Early on in school, he attended
                cooking classes and had his mind set on becoming a Professional Chef. Starting his
                career in world-renowned Hotel in Zermatt he moved to London, refining and improving
                his skillset. His taste for Cruising developed on cruise ship and this period in
                life led the path to become a YachtChef later on. His cooking style has always been
                focused on fine dining, taking the utmost care in sourcing the best available
                products.His extensive experience enables him to serve whatever the clients is
                asking for. Working for so many years in the yachting industry, this is the most
                important part of his job – making his guests happy whatever cuisine they wish for.
              </span>
            </div>
          </section>
          <section className={styles.food}>
            <img
              alt="food-2"
              loading="lazy"
              src={getImg('food-11', 300)}
              width={300}
              height={500}
            />
            <img
              alt="food-1"
              loading="lazy"
              src={getImg('food-16', 300)}
              width={300}
              height={500}
            />
            <img
              alt="food-3"
              loading="lazy"
              src={getImgOld('food-3', 300)}
              width={300}
              height={500}
            />
          </section>
        </div>
      </Layout>
    );
  }
}

export default CrewIndex;

// export const pageQuery = graphql`
//   query CrewIndexQuery {
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
