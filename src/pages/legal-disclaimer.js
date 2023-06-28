import React from 'react';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as styles from './legal-disclaimer.module.scss';

class LegalDisclaimerIndex extends React.Component {
  render() {
    const { location } = this.props;
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes');

    return (
      <Layout location={location}>
        <Seo
          title="Technical"
          description="Serendipity I is a 45m luxury sailing yacht, built by Perini Navi in 2011."
        />
        <HeroSmall title="Technical" />
        <div className={styles.legalWrapper}>
          <section className={styles.legal}>
            <h3>Legal Disclaimer</h3>
            <div>
              <strong>WFD Holdings ltd</strong> <br />
              375 Advanced House <br />
              Level 2 <br />
              Manwel Dimech Street <br />
              1058 Sliema <br />
              Malta <br /> <br />
              Telephone: tbc <br />
              E-Mail: info@sy-serendipity.org <br /> <br />
              Company registration - tbc <br />
              VAT IDMT 288 581 28
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default LegalDisclaimerIndex;
