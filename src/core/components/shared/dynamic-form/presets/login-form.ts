import { field, form } from '../builder';

/**
 * Pre-built schema for a standard login form.
 */
export const loginFormSchema = form({
  email: field.email({
    label: 'Email Address',
    placeholder: 'user@example.com',
    required: true,
  }),
  password: field.password({
    label: 'Password',
    required: true,
    min: 8,
  }),
  rememberMe: field.checkbox({
    label: 'Remember me',
    default: false,
  }),
}).withFormMeta({
  title: 'Sign In',
  submitLabel: 'Sign In',
});
