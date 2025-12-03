import { field, form, fieldGroup } from '../builder';

/**
 * Pre-built schema for a credit card payment form.
 */
export const paymentFormSchema = form({
  cardName: field.text({
    label: 'Name on Card',
    required: true,
    placeholder: 'John Doe',
  }),
  cardNumber: field.text({
    label: 'Card Number',
    required: true,
    placeholder: '0000 0000 0000 0000',
    pattern: /^\d{16}$/,
  }),
  expiry: fieldGroup({
    month: field.text({ label: 'MM', placeholder: 'MM', required: true, pattern: /^\d{2}$/ }),
    year: field.text({ label: 'YY', placeholder: 'YY', required: true, pattern: /^\d{2}$/ }),
    cvc: field.text({ label: 'CVC', placeholder: '123', required: true, pattern: /^\d{3,4}$/ }),
  }, { layout: 'inline', label: 'Expiry & CVC' }),
}).withFormMeta({
  title: 'Payment Details',
  submitLabel: 'Pay Now',
});
