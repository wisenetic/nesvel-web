import { field, form } from '../builder';

/**
 * Pre-built schema for a contact form.
 */
export const contactFormSchema = form({
  name: field.text({
    label: 'Your Name',
    required: true,
    placeholder: 'Jane Doe',
  }),
  email: field.email({
    label: 'Email Address',
    required: true,
    placeholder: 'jane@example.com',
  }),
  subject: field.select({
    label: 'Subject',
    required: true,
    options: [
      { label: 'General Inquiry', value: 'general' },
      { label: 'Support', value: 'support' },
      { label: 'Feedback', value: 'feedback' },
    ],
  }),
  message: field.textarea({
    label: 'Message',
    required: true,
    min: 10,
    max: 500,
    placeholder: 'How can we help you?',
  }),
  newsletter: field.checkbox({
    label: 'Subscribe to our newsletter',
    default: true,
  }),
}).withFormMeta({
  title: 'Contact Us',
  submitLabel: 'Send Message',
});
