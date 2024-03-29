import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layout/layout';

class NotFoundIndex extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <Layout location={location}>
        <section
          style={{
            width: '250px',
            display: 'block',
            margin: '200px auto',
            textAlign: 'center',
          }}
        >
          <h3>Page not found</h3>
          <Link to="/">
            <button type="button">Go Back Home</button>
          </Link>
        </section>
      </Layout>
    );
  }
}

export default NotFoundIndex;
