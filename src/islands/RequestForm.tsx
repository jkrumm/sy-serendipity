import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { SubmitEvent } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import { defaultCountries, parseCountry, usePhoneInput } from 'react-international-phone';

import { track } from '@/util/analytics';
import { REQUEST_COPY, REQUEST_FORM_COPY as COPY } from '@/content/request';
import styles from '@/pages/request.module.scss';

const FORM_ENDPOINT = '/api/request';
const subscribeToHydration = () => () => {};
const getClientReady = () => true;
const getServerReady = () => false;
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

type FieldError = { field?: string; message: string };

function parseErrors(data: unknown): FieldError[] {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('errors' in data) ||
    !Array.isArray(data.errors)
  ) {
    return [{ message: COPY.submissionError }];
  }
  const errors = data.errors.filter(
    (error): error is FieldError =>
      typeof error === 'object' && error !== null && typeof error.message === 'string',
  );
  return errors.length ? errors : [{ message: COPY.submissionError }];
}

function FieldErrors({ field, errors }: { field: string; errors: FieldError[] }) {
  const matching = errors.filter((error) => error.field === field);
  if (!matching.length) return null;
  return (
    <p id={`${field}-error`} className={styles.fieldError}>
      {matching.map((error) => error.message).join(' ')}
    </p>
  );
}

const phoneCountries = defaultCountries.map(parseCountry);

function InternationalPhoneField({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (phone: string) => void;
  invalid: boolean;
}) {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: 'gb',
    value,
    onChange: ({ phone }) => onChange(phone),
  });

  return (
    <div className={styles.phoneFields}>
      <label className="sr-only" htmlFor="phone-country">
        {COPY.phoneCountry}
      </label>
      <select
        id="phone-country"
        value={country.iso2}
        onChange={(event) => setCountry(event.target.value)}
      >
        {phoneCountries.map((option) => (
          <option key={option.iso2} value={option.iso2}>
            {option.name} (+{option.dialCode})
          </option>
        ))}
      </select>
      <input
        id="phone"
        type="tel"
        autoComplete="tel"
        value={inputValue}
        onChange={handlePhoneValueChange}
        ref={inputRef}
        aria-invalid={invalid}
        aria-describedby={invalid ? 'phone-error' : undefined}
      />
    </div>
  );
}

function getDuration(range: DateRange | undefined) {
  if (!range?.from || !range.to) return 0;
  const duration = differenceInCalendarDays(range.to, range.from) + 1;
  return duration > 1 ? duration : 0;
}

export default function RequestForm() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const ready = useSyncExternalStore(subscribeToHydration, getClientReady, getServerReady);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const dateSection = useRef<HTMLDivElement>(null);
  const feedback = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const duration = getDuration(range);

  useEffect(() => {
    const element = dateSection.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setNumberOfMonths(entry.contentRect.width >= 650 ? 2 : 1);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (succeeded || errors.length) feedback.current?.focus();
  }, [succeeded, errors]);

  function fieldHasError(field: string) {
    return errors.some((error) => error.field === field);
  }

  function handleStart() {
    if (started.current) return;
    started.current = true;
    track('request-form-start');
  }

  function handleSelect(next: DateRange | undefined) {
    setRange(next);
    if (!next?.from || !next.to) return;
    const nights = differenceInCalendarDays(next.to, next.from);
    if (nights > 0) track('request-dates-selected', { nights });
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const formData = new FormData(event.currentTarget);
    setSubmitting(true);
    setErrors([]);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (response.ok) {
        const guests = Number(formData.get('numberOfPeople'));
        track('request-submit', {
          ...(guests > 0 && { guests }),
          ...(duration > 1 && { nights: duration - 1 }),
        });
        setSucceeded(true);
        return;
      }
      track('request-error', {
        kind: response.status === 400 || response.status === 422 ? 'validation' : 'server',
      });
      const data: unknown = await response.json().catch(() => null);
      setErrors(parseErrors(data));
    } catch {
      track('request-error', { kind: 'network' });
      setErrors([{ message: COPY.connectionError }]);
    } finally {
      setSubmitting(false);
    }
  }

  if (succeeded) {
    return (
      <div ref={feedback} className={styles.success} role="status" tabIndex={-1}>
        <p className="eyebrow">{COPY.successEyebrow}</p>
        <h3>{COPY.successTitle}</h3>
        <p>{COPY.successBody}</p>
        <a
          className="text-link"
          href={REQUEST_COPY.broker.phoneHref}
          data-umami-event="phone-click"
          data-umami-event-location="request-success"
        >
          {COPY.successCall}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    );
  }

  return (
    <form
      method="post"
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      onFocus={handleStart}
      onInput={handleStart}
      className={styles.contactForm}
      aria-busy={submitting}
    >
      {errors.length > 0 && (
        <div ref={feedback} className={styles.errorSummary} role="alert" tabIndex={-1}>
          <strong>{COPY.errorTitle}</strong>
          {errors.map((error, index) => (
            <p key={`${error.field ?? 'general'}-${index}`}>
              {error.field ? `${error.field === 'email' ? COPY.email : error.field}: ` : ''}
              {error.message}
            </p>
          ))}
        </div>
      )}
      <div className={styles.fieldPair}>
        <div className={styles.field}>
          <label htmlFor="firstName">{COPY.firstName}</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={200}
            aria-invalid={fieldHasError('firstName')}
            aria-describedby={fieldHasError('firstName') ? 'firstName-error' : undefined}
          />
          <FieldErrors field="firstName" errors={errors} />
        </div>
        <div className={styles.field}>
          <label htmlFor="lastName">{COPY.lastName}</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={200}
            aria-invalid={fieldHasError('lastName')}
            aria-describedby={fieldHasError('lastName') ? 'lastName-error' : undefined}
          />
          <FieldErrors field="lastName" errors={errors} />
        </div>
      </div>
      <div className={styles.fieldPair}>
        <div className={styles.field}>
          <label htmlFor="email">
            {COPY.email}
            <span>{COPY.required}</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            aria-invalid={fieldHasError('email')}
            aria-describedby={fieldHasError('email') ? 'email-error' : undefined}
          />
          <FieldErrors field="email" errors={errors} />
        </div>
        <div className={styles.field}>
          <label htmlFor="numberOfPeople">{COPY.numberOfPeople}</label>
          <input
            id="numberOfPeople"
            name="numberOfPeople"
            type="number"
            inputMode="numeric"
            min={1}
            max={8}
            step={1}
            placeholder={COPY.guestsPlaceholder}
            aria-invalid={fieldHasError('numberOfPeople')}
            aria-describedby={fieldHasError('numberOfPeople') ? 'numberOfPeople-error' : undefined}
          />
          <FieldErrors field="numberOfPeople" errors={errors} />
        </div>
      </div>
      <div ref={dateSection} className={styles.dateSection}>
        <div className={styles.dateLabel}>
          <span>{COPY.datesTitle}</span>
          <span>{COPY.optional}</span>
        </div>
        <details className={styles.datePicker}>
          <summary>
            <span>
              {range?.from ? dateFormatter.format(range.from) : COPY.chooseDates}
              {range?.to ? ` — ${dateFormatter.format(range.to)}` : ''}
            </span>
            <span className={styles.dateIcon} aria-hidden="true">
              +
            </span>
          </summary>
          <div className={styles.calendar}>
            <p className={styles.dateHint}>{COPY.datesHint}</p>
            <DayPicker
              mode="range"
              numberOfMonths={numberOfMonths}
              disabled={{ before: new Date() }}
              selected={range}
              onSelect={handleSelect}
              navLayout="after"
            />
            <div className={styles.selectedDates}>
              <div>
                <span>{COPY.arrival}</span>
                <strong>
                  {range?.from ? dateFormatter.format(range.from) : COPY.datePlaceholder}
                </strong>
              </div>
              <div>
                <span>{COPY.departure}</span>
                <strong>{range?.to ? dateFormatter.format(range.to) : COPY.datePlaceholder}</strong>
              </div>
            </div>
            <button
              type="button"
              className={styles.clearDates}
              onClick={() => setRange(undefined)}
              disabled={!range?.from}
            >
              {COPY.clearDates}
            </button>
          </div>
        </details>
        <p className={styles.journey} aria-live="polite">
          {duration > 0 ? `${duration} days` : ''}
        </p>
      </div>
      <div className={styles.phoneSection}>
        <label className={styles.phoneToggle} htmlFor="phoneEnabled">
          <input
            id="phoneEnabled"
            type="checkbox"
            checked={phoneEnabled}
            onChange={(event) => setPhoneEnabled(event.target.checked)}
            aria-controls={phoneEnabled ? 'phone-field' : undefined}
          />
          <span>{COPY.phoneToggle}</span>
        </label>
        {phoneEnabled && (
          <div className={styles.field} id="phone-field">
            <label htmlFor="phone">{COPY.phone}</label>
            <InternationalPhoneField
              value={phone}
              onChange={setPhone}
              invalid={fieldHasError('phone')}
            />
            <FieldErrors field="phone" errors={errors} />
          </div>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="message">{COPY.message}</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder={COPY.messagePlaceholder}
          aria-invalid={fieldHasError('message')}
          aria-describedby={fieldHasError('message') ? 'message-error' : undefined}
        />
        <FieldErrors field="message" errors={errors} />
      </div>
      <div className={styles.hiddenFields} aria-hidden="true">
        <input type="hidden" name="duration" value={duration ? `${duration} days` : ''} readOnly />
        <input
          type="hidden"
          name="arrivalDate"
          value={range?.from?.toDateString() ?? ''}
          readOnly
        />
        <input
          type="hidden"
          name="departureDate"
          value={range?.to?.toDateString() ?? ''}
          readOnly
        />
        {phoneEnabled && <input type="hidden" name="phone" value={phone} readOnly />}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>
      <p className={styles.consent}>{COPY.consent}</p>
      <button className={`button ${styles.submit}`} type="submit" disabled={!ready || submitting}>
        <span aria-live="polite">{submitting ? COPY.submitting : COPY.submit}</span>
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
