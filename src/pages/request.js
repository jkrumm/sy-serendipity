import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Seo from '../layout/seo';
import Layout from '../layout/layout';
import HeroSmall from '../components/hero-small';

// eslint-disable-next-line import/no-unresolved
import 'react-date-range/dist/styles.css'; // main style file
import '../styling/date-range.scss'; // theme css file
import 'react-phone-input-2/lib/style.css';
import * as styles from './request.module.scss';
import DateRange from 'react-date-range/dist/components/DateRange';
import PhoneInput from 'react-phone-input-2';
import { differenceInDays, getMonth } from 'date-fns';

function ContactForm() {
  const [state, handleSubmit] = useForm('xknyanvw');
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [phone, setPhone] = useState('');
  if (state.succeeded) {
    return <p>Thanks for requesting!</p>;
  }
  return (
    <div className={styles.form}>
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
        <div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" name="email" />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>
          <div>
            <label htmlFor="numberOfPeople">Number of people</label>
            <input id="numberOfPeople" type="number" name="numberOfPeople" />
          </div>
        </div>
        <div>
          <div className={styles.toggle}>
            <label
              htmlFor="default-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={phoneEnabled}
                id="default-toggle"
                className="sr-only peer"
                onChange={() => setPhoneEnabled(!phoneEnabled)}
              />
              <div className="w-11 h-6 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ml-3">Prefer to be contacted by Phone?</span>
            </label>
          </div>
          <div className={`${phoneEnabled ? 'phone-shown' : 'phone-hidden'} phone-input`}>
            <label htmlFor="phone">Telephone</label>
            <PhoneInput country={'us'} onChange={setPhone} value={phone} />
          </div>
        </div>
        <label htmlFor="message">Additional Comments</label>
        <textarea id="message" name="message" />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <span className={styles.submitNotice}>
          With submitting the form I allow to transfer my personal details so that my request can be
          further processed.
        </span>
        <button type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form>
      {state.succeeded && <div className={styles.success}>Thanks for your request!</div>}
    </div>
  );
}

class RequestIndex extends React.Component {
  state = {
    dateRange: [{ startDate: null, endDate: new Date(''), key: 'selection' }],
  };

  getDuration() {
    if (this.state.dateRange[0].startDate === null) {
      return '0';
    }
    const duration =
      differenceInDays(this.state.dateRange[0].endDate, this.state.dateRange[0].startDate) + 1;
    if (duration === 1) {
      return '0';
    }
    return String(duration);
  }

  getDestination() {
    if (this.getDuration() === '0') {
      return 'error';
    }
    const month = getMonth(this.state.dateRange[0].startDate) + 1;
    if (month >= 11 || month <= 5) {
      return 'caribbeans';
    }
    return 'mediterranean sea';
  }

  render() {
    const { location } = this.props;

    return (
      <Layout location={location}>
        <Seo
          title="Contact"
          description="Request your personally tailored and unforgettable sailing yacht experience."
        />
        <HeroSmall title="Contact" />
        <div className={styles.contactWrapper}>
          <div>
            <h2>Request your trip</h2>
          </div>
          <section>
            <div>
              <img
                className={styles.barbara}
                alt="barbara-mueller"
                src="https://www.oceanindependence.com/sites/default/files/images/person/Barbara-web.jpg"
                width="130"
              />
              <div>
                <span>Barbara Mueller</span>
                <span>Senior Charter Broker</span>
                <span>OCEAN Independence Palma</span>
                <br />
              </div>
              <div>
                <span>
                  Telephone:
                  <br />
                  <a href="tel:+34690672916">+34 690 672 916</a>
                </span>
                <br />
                <span>
                  Languages Spoken:
                  <br />
                  English, German, Spanish
                </span>
              </div>
              <div className={styles.logo}>
                <img
                  alt="logo"
                  src="https://ik.imagekit.io/bgmwrkfoi/tr:w-230,f-webp/OI_Logo_-_white_thick.png"
                />
              </div>
            </div>
            <div>
              <span>
                Personally tailored, special requests are taken into account, professional booking
                agents, no final booking, get in contact over phone or email ...
              </span>
              <br />
              <br />
              <span>
                Between November and May the yacht is in the caribbeans and otherwise in the
                mediterranean sea. Depending on your selected dates you are requesting a trip for
                either regions. These dates vary from year to year. Of course special requests for a
                desired location may be possible.
              </span>
              <div className={styles.dateRange}>
                <div>
                  {this.getDuration() > 0 && (
                    <span>
                      Duration of {this.getDuration()} days in the {this.getDestination()}
                    </span>
                  )}
                </div>
                <div>
                  <div>
                    <span>Start Date</span>
                  </div>
                  <div>
                    <span>End Date</span>
                  </div>
                </div>
                <DateRange
                  onChange={(item) => {
                    this.setState({ dateRange: [item.selection] });
                  }}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  startDatePlaceholder=""
                  endDatePlaceholder=""
                  minDate={new Date()}
                  ranges={this.state.dateRange}
                  months={2}
                  direction="horizontal"
                  rangeColors={['#3e5769']}
                />
              </div>
              {/*<span className={styles.personalInfoDescription}>*/}
              {/*  Please provide some personal information and how you would prefer to be contacted*/}
              {/*</span>*/}
              <ContactForm />
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
