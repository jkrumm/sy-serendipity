import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

import * as styles from './request.module.scss';

function ContactForm() {
  const [state, handleSubmit] = useForm('xknyanvw');
  if (state.succeeded) {
    return <p>Thanks for requesting!</p>;
  }
  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <div>
        <div>
          <label htmlFor="firstName">Firstname</label>
          <input id="firstName" type="firstName" name="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Lastname</label>
          <input id="lastName" type="lastName" name="lastName" />
        </div>
      </div>
      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" name="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <div>
        <div>
          <label htmlFor="destination">Destination</label>
          <select name="destination" id="destination" disabled={true} className={styles.disabled}>
            <option value="caribbean">Caribbean</option>
            <option value="mediterranean">Mediterranean</option>
          </select>
        </div>
        <div>
          <label htmlFor="numberOfPeople">Number of people</label>
          <input id="numberOfPeople" type="number" name="numberOfPeople" />
        </div>
      </div>
      <label htmlFor="message">Additional Comments</label>
      <textarea id="message" name="message" />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}

class RequestIndex extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <Layout location={location}>
        <Seo title="Contact" />
        <HeroSmall title="Contact" />
        <div className={styles.contactWrapper}>
          <section>
            <div>
              <span>Barbara Mueller</span>
              <span>Senior Charter Broker</span>
              <span>OCEAN Independence Palma</span>
              <span>Tel: +34 690 672 916</span>
              <div className={styles.logo}>
                <img
                  alt="logo"
                  src="https://ik.imagekit.io/bgmwrkfoi/tr:w-230,f-webp/OI_Logo_-_white_thick.png"
                />
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
