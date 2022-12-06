import React from 'react';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './crew.module.scss';
import { getImg } from '../util/get-image';
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
            <img alt="crew-sailing" src={getImg('ship-21', 700)} />
            <span>
              Our highly trained crew will unobtrusively guide you during your journey, tailoring
              excursions and experiences to the tastes of you and your travel companions. Tell us
              about your passions, curiosities and motivations, and we will take you on a
              once-in-a-lifetime adventure, filled with priceless memories and unforgettable
              moments. Do you celebrate a speccial occasion? Let us know and we will present ideas
              to you.
            </span>
          </section>
          <section className={styles.left}>
            <div>
              <img alt="captain" width="350" src={getImg('crew-2', 350)} />
            </div>
            <div>
              <H2 title="Lars" subtitle="Captain" />
              <span>
                Lars has more than 36 years of sailing experience, being passionate about boats and
                sailing since he was a little boy. Racing yachts or dinghies or taking part in World
                or European Championships - you are in best hands!
              </span>
            </div>
          </section>
          <section className={styles.right}>
            <div>
              <img alt="chief_stewardess" width="350" src={getImg('crew-1', 350)} />
            </div>
            <div>
              <H2 title="Gabi" subtitle="Chief Stewardess" />
              <span>
                Gabi is highly motivated and has long years of experience in hospitality. She is
                passionate meeting people, planning itineraries and events but does also take care
                of your laundry or any other aspect of your holidays. She is also a qualified yoga
                instructor and
              </span>
            </div>
          </section>
          <section className={`${styles.left} ${styles.chef}`}>
            <div>
              <img alt="chef" width="350" src={getImg('crew-3', 350)} />
            </div>
            <div>
              <H2 title="Antonio" subtitle="Chef" />
              <span>
                You are most welcome if you are a high end foody! Antonio, our energetic chef with
                his blend of creativity, passion for food and exceptional cooking skills will source
                the best ingredients on local markets and serve the most delicious meals ever. Let
                him spoil you!
              </span>
            </div>
          </section>
          <section className={styles.food}>
            <img alt="food-2" src={getImg('food-2', 300)} width={300} height={500} />
            <img alt="food-1" src={getImg('food-1', 300)} width={300} height={500} />
            <img alt="food-3" src={getImg('food-3', 300)} width={300} height={500} />
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
