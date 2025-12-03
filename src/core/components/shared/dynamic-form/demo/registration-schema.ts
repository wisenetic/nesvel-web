import { field, form } from '../builder';

/**
 * A comprehensive demo schema for a user registration form.
 * Demonstrates various field types, validation, and layout options.
 */
export const registrationSchema = form({
  username: field.text({
    label: 'Username',
    placeholder: 'johndoe',
    min: 3,
    max: 20,
    required: true,
    description: 'Must be between 3 and 20 characters.',
  }),

  email: field.email({
    label: 'Email Address',
    placeholder: 'user@example.com',
    required: true,
  }),

  password: field.password({
    label: 'Password',
    min: 8,
    required: true,
    description: 'At least 8 characters required.',
  }),

  role: field.select({
    label: 'Role',
    options: [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
    ],
    required: true,
    default: 'user',
  }),

  bio: field.text({
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    required: false,
    // Note: In a real app, we'd use a textarea type, but for now text works
  }),

  terms: field.checkbox({
    label: 'I agree to the terms and conditions',
    required: true,
  }),

  newsletter: field.checkbox({
    label: 'Subscribe to newsletter',
    default: true,
    description: 'Receive updates about our products.',
  }),
}).withFormMeta({
  title: 'Create Account',
  description: 'Please fill out the form below to register.',
  submitLabel: 'Register',
});
