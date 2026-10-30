import type { PhotoOptions } from '@/util/get-image'

type RequestPhoto = Omit<PhotoOptions, 'width' | 'height'> & { alt?: string }

export const REQUEST_COPY = {
  eyebrow: 'Serendipity I',
  title: 'Request A Charter',
  description:
    'Request a charter on Serendipity I in the Pacific. Contact Barbara Mueller at Ocean Independence, Palma.',
  intro:
    'Serendipity I is sailing the Pacific, including French Polynesia, the Cook Islands and Fiji. Please tell us your preferred dates and where you would like to sail.',
  formTitle: 'charter request',
  formIntro: 'Only your email address is required. All other details are optional.',
  formFallback: 'Please call Barbara to arrange your charter.',
  cruisingLabel: 'Current cruising area',
  cruisingArea: 'The Pacific',
  broker: {
    name: 'Barbara Mueller',
    role: 'Senior Charter Broker',
    office: 'Ocean Independence Palma',
    phone: '+34 690 672 916',
    phoneHref: 'tel:+34690672916',
    link: 'https://www.oceanindependence.com/',
    linkLabel: 'Ocean Independence',
    logoAlt: 'Ocean Independence',
  },
}

export const REQUEST_IMAGE = {
  name: 'deck-24',
  alt: 'The teak deck and polished railing beside clear turquoise water',
} satisfies RequestPhoto

export const REQUEST_BROKER_IMAGE = {
  name: 'barbara-mueller',
  maxWidth: 160,
  alt: 'Barbara Mueller, Senior Charter Broker at Ocean Independence',
} satisfies RequestPhoto

export const REQUEST_FORM_COPY = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email address',
  required: 'Required',
  numberOfPeople: 'Guests',
  guestsPlaceholder: '1–8',
  datesTitle: 'Your preferred dates',
  optional: 'Optional',
  chooseDates: 'Choose your dates',
  arrival: 'Arrival',
  departure: 'Departure',
  datePlaceholder: 'Select a date',
  clearDates: 'Clear dates',
  datesHint:
    'Select an arrival date followed by a departure date. Leave dates blank if you are flexible.',
  phoneToggle: 'Please contact me by phone',
  phone: 'Telephone',
  phoneCountry: 'Country calling code',
  message: 'Message or special requests',
  messagePlaceholder: 'Include any requirements or questions about your charter.',
  consent:
    'By sending this request, you agree that your details may be shared to arrange your charter.',
  submit: 'Send request',
  submitting: 'Sending request…',
  errorTitle: 'Your request has not been sent.',
  submissionError: 'Please try again, or call Barbara to discuss your charter.',
  connectionError: 'Please check your connection and try again, or call Barbara.',
  successEyebrow: 'Charter request',
  successTitle: 'Request sent',
  successBody:
    'Thank you. A confirmation email is on its way, and Barbara Mueller and the charter team will contact you about your request.',
  successCall: 'Call Barbara Mueller',
}
