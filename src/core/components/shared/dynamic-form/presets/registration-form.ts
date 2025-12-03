import { field, form } from '../builder';

/**
 * Pre-built schema for a user registration form.
 */
export const registrationFormSchema = form({
  username: field.text({
    label: 'Username',
    required: true,
    min: 3,
  }),
  email: field.email({
    label: 'Email',
    required: true,
  }),
  password: field.password({
    label: 'Password',
    required: true,
    min: 8,
  }),
  confirmPassword: field.password({
    label: 'Confirm Password',
    required: true,
    min: 8,
  }),
}).withFormMeta({
  title: 'Create Account',
  submitLabel: 'Register',
});
