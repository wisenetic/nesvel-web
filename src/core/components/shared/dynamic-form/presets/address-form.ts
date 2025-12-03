import { field, form, fieldGroup } from '../builder';

/**
 * Pre-built schema for a standard address form.
 */
export const addressFormSchema = form({
  fullName: field.text({
    label: 'Full Name',
    required: true,
  }),
  streetAddress: field.text({
    label: 'Street Address',
    required: true,
  }),
  location: fieldGroup({
    city: field.text({ label: 'City', required: true }),
    state: field.text({ label: 'State', required: true }),
    zipCode: field.text({ label: 'Zip Code', required: true, pattern: /^\d{5}$/ }),
  }, { layout: 'grid', columns: { mobile: 1, tablet: 3, desktop: 3 } }),
}).withFormMeta({
  title: 'Shipping Address',
  submitLabel: 'Save Address',
});
