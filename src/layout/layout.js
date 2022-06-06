import React from 'react';

import '../styling/variables.scss';
import '../styling/global.scss';
import Seo from './seo';
import Footer from './footer';
import Navigation from './navigation';

class Template extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <Seo />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </>
    );
  }
}

export default Template;
