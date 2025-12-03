import { form } from '../builder/form-builder';
import { field } from '../builder/field-builder';

/**
 * Demo schema showcasing the Address and Map fields.
 */
export const locationDemoSchema = form({
  // Address Section
  shippingAddress: field.address({
    label: 'Shipping Address',
    description: 'Where should we send your package?',
    addressOptions: {
      showAddressLine2: true,
      showCity: true,
      showState: true,
      showZip: true,
      showCountry: true,
      required: {
        addressLine1: true,
        city: true,
        state: true,
        zip: true,
        country: true,
      },
    },
    colSpan: 12,
  }),

  billingAddress: field.address({
    label: 'Billing Address',
    description: 'Same as shipping?',
    addressOptions: {
      showAddressLine2: false, // Hide line 2 for simplicity in this example
      labels: {
        addressLine1: 'Street Address',
        zip: 'Postal Code',
      },
    },
    colSpan: 12,
  }),

  // Map Section
  location: field.map({
    label: 'Pin Your Location',
    description: 'Select your exact delivery location on the map.',
    required: true,
    colSpan: 12,
  }),

  // Additional Info
  notes: field.textarea({
    label: 'Delivery Notes',
    placeholder: 'Gate code, instructions, etc.',
    colSpan: 12,
  }),
}).withFormMeta({
  title: 'Location & Delivery Details',
  description: 'Please provide your address and pinpoint your location.',
  submitButton: {
    text: 'Confirm Location',
  },
});
