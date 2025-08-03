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
                alt="rotation_captain"
                width="350"
                height="460"
                loading="lazy"
                src={getImgCropped('crew-18', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Paul Kelly" subtitle="Captain" />
              <span>
                Paul was born and raised in Papua New Guinea and first sailed to New Zealand as a
                teenager visiting amazing places along the way. This first adventure gave Paul a
                love of sailing and boats in general that would shape his future endeavours. Paul
                completed his building apprenticeship to a boat builder for some of NZ's leading
                superyacht shipyards.
                <br />
                His dream of adventure and being back on the water then bought him in to crewing on
                yachts, starting as deckhand and progressing quickly through the ranks. Working as
                Captain and Engineer on both sail and motor yachts he has clocked up more than
                200,000nm around the world.
                <br />
                Paul loves to impart his knowledge to crew and guests alike to make their stay on
                board more of a complete and safe experience. And you're guaranteed a few good
                laughs along the way.
              </span>
            </div>
          </section>
          <section className={styles.left}>
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
          <section className={styles.right}>
            <div>
              <img
                alt="stewardess"
                width="350"
                height="460"
                loading="lazy"
                src={getImgCropped('crew-15', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Georgia Joubert" subtitle="Stewardess" />
              <span>
                Georgia grew up on the coast of South Africa surrounded by beautiful mountains and
                white sand beaches. Naturally growing up by such beautiful scenes Georgia loves to
                spend her time being active or partaking in adventure around nature.
                <br />
                She bartendered, waitressed and managed in the hospitality for 3 years before taking
                her skills onboard yachts. In her free time she enjoys many hobbies and sports
                including yoga which she has her 300hr teacher training certificate and is planning
                on learning more.
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
          <section className={styles.right}>
            <div>
              <img
                alt="first_mate"
                width="350"
                height="460"
                loading="lazy"
                src={getImgCropped('crew-19', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Rachael Ross" subtitle="First Mate" />
              <span>
                Rachael grew up in the English countryside, spending any chance she could outdoors.
                She developed a love for sculpture at 14 and went on to attend Cambridge School of
                Art to study Illustration and Animation.
                <br />
                She realised her love for the ocean would define where she lived so at 21 moved to
                the Caribbean to be a conservation researcher and scuba diver instructor. Each
                summer she worked as a camp leader, taking groups of teenagers sailing and diving
                around the world. Through this she found a love for sailing and has made her career
                combining life on and below the water.
                <br />
                Before becoming Bosun and then Mate onboard larger sail boats, she captained a
                circumnavigation catamaran exploring off the beaten track destinations running over
                100 charters. In her spare time, she spend her time enjoying the waters and the
                mountains of Mallorca where she now calls home.
              </span>
            </div>
          </section>
          <section className={styles.left}>
            <div>
              <img
                alt="deckhand"
                width="350"
                height="460"
                loading="lazy"
                src={getImgCropped('crew-23', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Thomas Goodsell" subtitle="Deckhand" />
              <span>
                Thomas was born in St Tropez, France where his father was involved in the yacht
                racing industry building high performance race yachts. His mother was also a keen
                and avid sailor teaching him how to sail and windsurf.
                <br />
                During his childhood they moved around sailing locations in France, Spain and
                England which introduced him to the world of yachting at a young age. Having
                completed a Superyacht Cadetship Thomas is now embarking on his own professional
                maritime career.
                <br />
                He has done a lot of competitive sailing, competing in Nationals and World
                Championships on everything from dinghies to small sailing yachts. His real passion
                is windsurfing including IQ Foiling, slalom, wave and speed sailing. Long term his
                goal is to break the UK windsurf speed sailing record.
              </span>
            </div>
          </section>
          <section className={styles.right}>
            <div>
              <img
                alt="rotation_engineer1"
                width="350"
                height="460"
                loading="lazy"
                src={getImgCropped('crew-16', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Jesse Bird" subtitle="Rotation Engineer" />
              <span>
                Born and raised in South Auckland New Zealand, Jesse has had a love for the ocean
                from a young age, fishing, diving and living on his own sailboat for the first few
                years after high school.
                <br />
                Jesse joined the yachting world at the age of 22, starting off as a deckhand in the
                early days the countless days with chamois in hand grew tiresome and Jesse decided
                to try his hand at engineering where he has been ever since, working on an array of
                different boats in locations all over the world.
                <br />
                Jesses hobbies include singing terribly in the engine room, riding motorbikes and
                the odd bit of diving here and there.
              </span>
            </div>
          </section>
          <section className={styles.left}>
            <div>
              <img
                alt="rotation_engineer2"
                width="350"
                height="460"
                loading="lazy"
                src={getImgCropped('crew-17', 350, 460)}
              />
            </div>
            <div>
              <H2 title="Matthew Woods" subtitle="Rotation Engineer" />
              <span>
                Matthew grew up in Zimbabwe where he first started sailing on optimists. As a strong
                swimmer and water polo player he developed his skills as a waterman through school
                taking a particular interest in fishing. Since then he has become am accomplished
                freediver holding 5 national records.
                <br />
                Mechanically, fixing 2 stroke outboards and motorbike was also necessary skill as
                spare parts were not easy to come by in that part of the world. The combination of
                his passion for anything water based and engineering skills naturally this led him
                into yachting.
                <br />
                In his spare time, along with surfing and para-gliding, Matthew is a spearfishing
                guide in Mexico where he pursues his primal passion of hunting trophy fish.
              </span>
            </div>
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
