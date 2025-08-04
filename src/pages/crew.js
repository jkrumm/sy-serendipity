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
          description="Meet the highly trained crew who will guide you through your journey."
        />
        <div className={styles.crewWrapper}>
          <section className={styles.intro}>
            <img alt="crew-sailing" src={getImgOld('ship-21', 700, 394)} width="700" height="394" />
            <span>
              Our highly trained crew will unobtrusively guide you during your journey, tailoring
              excursions and experiences to the tastes of you and your travel companions. Tell us
              about your passions, curiosities and motivations, and we will take you on a
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
                src={getImgCropped('crew-21', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Scott Waterfield" subtitle="Captain" />
              <span>
                Scott has been boating since he was 6 months old, started competitive windsurfing at
                15, bought his first keel boat at 19 and spent more than a decade racing as
                owner/driver in New Zealand’s top one design fleet racing class. His experience in
                superyachts has taken him around the traditional Mediterranean / Caribbean / Newport
                circuit but also to far flung places like the Amazon delta, Easter Island and the NZ
                sub-Antarctic islands.
                <br />
                His strong safety focus has allowed him to sail over 200,000 nautical miles
                worldwide without incident and holds the safety of guest and crew foremost – but
                also while having fun and encouraging a co-operative team spirit. He loves sharing
                his love for sailing and the ocean with guests on board.
                <br />
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
                src={getImgCropped('crew-20', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Renee Weatherall" subtitle="Chief Stewardess" />
              <span>
                Renee is a Kiwi who loves to travel and meet new people. She grew up on a small town
                near the beach where she learnt to sail. While studying for her degree in visual
                arts, Renee worked in fine dining restaurants working her way up to hostess and bar
                manager. This provided a natural pathway to becoming a chief stewardess onboard
                yachts where she seeks to provide the highest level of service to the guests.
                <br />
                When she's not working, Renee loves to go hiking and explore the areas we are
                visiting and practices yoga and meditation. She also studies wine making with hopes
                to become a sommelier.
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
                src={getImgCropped('crew-22', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Taryne Evans" subtitle="Chef" />
              <span>
                Taryne was raised in Durban, South Africa spending most of her time in the ocean
                boogie boarding & surfing. She studied graphic and web design and worked for a
                multimedia production company. While taking some time off to travel Europe she found
                her love for food. She took some basic cooking classes and then started her career
                as a chef on yachts. She continued on to complete her Advanced Diploma in Culinary
                Training at Silwood School of Cookery.
                <br />
                She now has over ten years experience working on motor and sail yachts and raced the
                Transatlantic RORC, Middle Sea race and St Barts bucket. Tayrne has worked at a few
                recognized restaurants, wine estates, as well as a fine dining safari lodges in
                South Africa – but her passion is now at sea. In her spare time Taryne loves to
                travel, surf, hike & mountain bike.
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
