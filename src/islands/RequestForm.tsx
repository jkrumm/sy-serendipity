import { useMemo, useState } from 'react';
import type { SubmitEvent } from 'react';
import { differenceInDays, getMonth } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import styles from '@/pages/request.module.scss';

const FORM_ENDPOINT = 'https://formspree.io/f/xknyanvw';

type FormspreeError = { field?: string; message: string };

function parseErrors(data: unknown): FormspreeError[] {
  const errors = (data as { errors?: unknown })?.errors;
  if (!Array.isArray(errors)) return [{ message: 'Submission failed. Please try again.' }];
  return errors.filter(
    (error): error is FormspreeError =>
      typeof error === 'object' && error !== null && typeof error.message === 'string',
  );
}

function FieldErrors({ field, errors }: { field: string; errors: FormspreeError[] }) {
  const matching = errors.filter((error) => error.field === field);
  if (matching.length === 0) return null;
  return (
    <p>
      {field === 'email' ? 'Email' : 'Message'} {matching.map((error) => error.message).join(', ')}
    </p>
  );
}

function getDuration(range: DateRange | undefined): number {
  if (!range?.from) return 0;
  const duration = differenceInDays(range.to ?? range.from, range.from) + 1;
  return duration === 1 ? 0 : duration;
}

function getDestination(range: DateRange | undefined, duration: number): string {
  if (duration === 0 || !range?.from) return 'error';
  const month = getMonth(range.from) + 1;
  return month >= 11 || month <= 5 ? 'caribbeans' : 'mediterranean sea';
}

export default function RequestForm() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState<FormspreeError[]>([]);

  const duration = useMemo(() => getDuration(range), [range]);
  const destination = useMemo(() => getDestination(range, duration), [range, duration]);
  const arrivalDate = range?.from ? range.from.toDateString() : '';
  const departureDate = range?.to ? range.to.toDateString() : '';

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setErrors([]);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        setSucceeded(true);
        return;
      }
      const data: unknown = await res.json();
      setErrors(parseErrors(data));
    } catch (error) {
      console.error('Formspree submission failed', error);
      setErrors([{ message: 'Submission failed. Please check your connection and try again.' }]);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.dateRange}>
        <div>
          {duration > 0 && (
            <span>
              Duration of {duration} days in the {destination}
            </span>
          )}
        </div>
        <div>
          <div>
            <span>Arrival date</span>
          </div>
          <div>
            <span>Departure date</span>
          </div>
        </div>
        <DayPicker
          mode="range"
          numberOfMonths={2}
          disabled={{ before: new Date() }}
          selected={range}
          onSelect={setRange}
        />
      </div>
      {succeeded ? (
        <div className={styles.success}>
          Thank you for your request, we are looking forward to spoil you very soon!
        </div>
      ) : (
        <div className={styles.form}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div>
              <div>
                <label htmlFor="firstName">Firstname</label>
                <input id="firstName" type="text" name="firstName" />
              </div>
              <div>
                <label htmlFor="lastName">Lastname</label>
                <input id="lastName" type="text" name="lastName" />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="email">Email Address (required)</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={(event) => setMail(event.target.value)}
                  value={mail}
                />
                <FieldErrors field="email" errors={errors} />
              </div>
              <div>
                <label htmlFor="numberOfPeople">Number of people</label>
                <input id="numberOfPeople" type="number" name="numberOfPeople" />
              </div>
            </div>
            <div className={styles.hiddenFields}>
              <input
                id="destination"
                type="hidden"
                name="destination"
                value={destination}
                readOnly
              />
              <input
                id="duration"
                type="hidden"
                name="duration"
                value={`${duration} days`}
                readOnly
              />
              <input
                id="arrivalDate"
                type="hidden"
                name="arrivalDate"
                value={arrivalDate}
                readOnly
              />
              <input
                id="departureDate"
                type="hidden"
                name="departureDate"
                value={departureDate}
                readOnly
              />
              {phoneEnabled && <input type="hidden" name="phone" value={phone} readOnly />}
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
                  <div
                    className="w-11 h-6 peer-focus:outline-none  rounded-full peer dark:bg-gray-700
                  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
                  after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                  after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600
                  peer-checked:bg-blue-600"
                  />
                  <span className="ml-3">Prefer to be contacted by Phone?</span>
                </label>
              </div>
              <div className={`${phoneEnabled ? 'phone-shown' : 'phone-hidden'} phone-input`}>
                <label htmlFor="phone">Telephone</label>
                <PhoneInput
                  defaultCountry="us"
                  inputProps={{ id: 'phone' }}
                  onChange={(value) => setPhone(value)}
                  value={phone}
                />
              </div>
            </div>
            <label htmlFor="message">Your message to us or special requests</label>
            <textarea id="message" name="message" />
            <FieldErrors field="message" errors={errors} />
            <span className={styles.submitNotice}>
              With submitting the form I allow to transfer my personal details so that my request
              can be further processed.
            </span>
            <button type="submit" disabled={!mail || submitting}>
              Submit
            </button>
          </form>
          {errors.some((error) => !error.field) && (
            <div>
              {errors
                .filter((error) => !error.field)
                .map((error) => (
                  <p key={error.message}>{error.message}</p>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
