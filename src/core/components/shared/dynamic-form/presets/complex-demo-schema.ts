import { form, field } from '../builder';

/**
 * Async validation example: Check if username is available
 */
const checkUsernameAvailability = async (username: string): Promise<string | boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const reserved = ['admin', 'root', 'test', 'user'];
  if (reserved.includes(username.toLowerCase())) {
    return 'This username is already taken';
  }
  return true;
};

/**
 * Complex demo schema showcasing ALL production-ready features.
 * 
 * Features Demonstrated:
 * - Time and DateTime fields
 * - Input masking (phone, credit card)
 * - Read-only mode
 * - Autocomplete attributes
 * - Prefix/Suffix adornments
 * - Tooltip support
 * - ARIA attributes
 * - Rich text editor (Quill)
 * - Character counter
 * - Conditional logic
 * - Async validation
 * - Password strength meter
 * - Wizard mode (multi-step)
 * - All field types and options
 */
export const complexDemoSchema = form({
  // ===== STEP 1: BASIC INFORMATION =====
  username: field.text({
    label: 'Username',
    placeholder: 'johndoe',
    description: 'Choose a unique username',
    required: true,
    asyncValidate: checkUsernameAvailability,
    debounce: 500,
    componentProps: {
      autocomplete: 'username',
      ariaLabel: 'Enter your username',
      tooltip: 'Username must be unique and cannot be changed later',
      maxLength: 20,
      showCharCount: true,
    },
    colSpan: 6,
    step: 1,
  }),

  email: field.email({
    label: 'Email Address',
    placeholder: 'john@example.com',
    required: true,
    componentProps: {
      autocomplete: 'email',
      ariaLabel: 'Enter your email address',
      tooltip: 'We will send verification email to this address',
    },
    colSpan: 6,
    step: 1,
  }),

  password: field.password({
    label: 'Password',
    placeholder: 'Enter a strong password',
    required: true,
    strengthMeter: true,
    componentProps: {
      autocomplete: 'new-password',
      ariaLabel: 'Create a password',
      tooltip: 'Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters',
      maxLength: 50,
      showCharCount: true,
    },
    colSpan: 6,
    step: 1,
  }),

  confirmPassword: field.password({
    label: 'Confirm Password',
    placeholder: 'Re-enter your password',
    required: true,
    componentProps: {
      autocomplete: 'new-password',
      ariaLabel: 'Confirm your password',
    },
    colSpan: 6,
    step: 1,
  }),

  phone: field.text({
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
    description: 'US phone number format with masking',
    required: true,
    componentProps: {
      mask: 'phone',
      autocomplete: 'tel',
      ariaLabel: 'Enter your phone number',
      prefix: '📞',
    },
    colSpan: 6,
    step: 1,
  }),

  birthdate: field.date({
    label: 'Date of Birth',
    required: true,
    componentProps: {
      autocomplete: 'bday',
      ariaLabel: 'Select your date of birth',
      tooltip: 'You must be 18 years or older to register',
    },
    colSpan: 6,
    step: 1,
  }),

  // ===== STEP 2: ADVANCED FIELDS =====
  meetingTime: field.time({
    label: 'Preferred Meeting Time',
    description: 'Select your preferred time for meetings',
    componentProps: {
      tooltip: 'Time will be converted to your local timezone',
    },
    colSpan: 6,
    step: 2,
  }),

  appointmentDateTime: field.datetime({
    label: 'Appointment Date & Time',
    description: 'Schedule your first appointment',
    required: true,
    componentProps: {
      ariaLabel: 'Select appointment date and time',
      tooltip: 'Appointments are available Monday-Friday, 9 AM - 5 PM',
    },
    colSpan: 6,
    step: 2,
  }),

  salary: field.text({
    label: 'Expected Salary',
    placeholder: '50000',
    description: 'Annual salary expectation (numbers only)',
    componentProps: {
      prefix: '$',
      suffix: 'USD/year',
      ariaLabel: 'Enter expected salary',
      tooltip: 'This information is confidential',
    },
    colSpan: 6,
    step: 2,
  }),

  website: field.url({
    label: 'Website',
    placeholder: 'https://example.com',
    description: 'Your personal or company website',
    componentProps: {
      autocomplete: 'url',
      ariaLabel: 'Enter website URL',
      prefix: '🌐',
    },
    colSpan: 6,
    step: 2,
  }),

  creditCard: field.text({
    label: 'Credit Card Number',
    placeholder: '1234 5678 9012 3456',
    description: 'For payment verification only (masked input)',
    componentProps: {
      mask: 'creditCard',
      autocomplete: 'cc-number',
      ariaLabel: 'Enter credit card number',
      tooltip: 'Your payment information is encrypted and secure',
    },
    colSpan: 12,
    step: 2,
  }),

  bio: field.textarea({
    label: 'Biography',
    placeholder: 'Tell us about yourself...',
    description: 'Brief description about yourself (with character counter)',
    componentProps: {
      maxLength: 500,
      showCharCount: true,
      ariaLabel: 'Enter your biography',
      tooltip: 'This will be displayed on your public profile',
    },
    colSpan: 12,
    step: 2,
  }),

  // ===== STEP 3: RICH CONTENT & PREFERENCES =====
  // NOTE: Rich text fields temporarily disabled due to React 19 compatibility issues with react-quill
  // coverLetter: field.richtext({
  //   label: 'Cover Letter',
  //   description: 'Write your cover letter with rich formatting (Quill editor)',
  //   placeholder: 'Start writing your cover letter...',
  //   required: true,
  //   toolbar: 'full',
  //   componentProps: {
  //     ariaLabel: 'Write cover letter',
  //     tooltip: 'Use the toolbar to format your text with bold, italic, lists, and more',
  //   },
  //   colSpan: 12,
  //   step: 3,
  // }),

  // projectDescription: field.richtext({
  //   label: 'Project Description',
  //   description: 'Describe your project (basic formatting toolbar)',
  //   placeholder: 'Describe your project...',
  //   toolbar: 'basic',
  //   componentProps: {
  //     ariaLabel: 'Describe your project',
  //   },
  //   colSpan: 12,
  //   step: 3,
  // }),

  newsletter: field.checkbox({
    label: 'Subscribe to Newsletter',
    description: 'Receive weekly updates and tips',
    default: true,
    componentProps: {
      ariaLabel: 'Subscribe to newsletter',
    },
    colSpan: 6,
    step: 3,
  }),

  terms: field.checkbox({
    label: 'I agree to Terms and Conditions',
    required: true,
    componentProps: {
      ariaLabel: 'Accept terms and conditions',
      tooltip: 'You must accept the terms to continue',
    },
    colSpan: 6,
    step: 3,
  }),

  notifications: field.switch({
    label: 'Enable Notifications',
    description: 'Receive push notifications',
    default: true,
    componentProps: {
      ariaLabel: 'Toggle notifications',
    },
    colSpan: 6,
    step: 3,
  }),

  theme: field.radio({
    label: 'Preferred Theme',
    description: 'Choose your interface theme',
    options: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
      { label: 'Auto', value: 'auto' },
    ],
    default: 'auto',
    componentProps: {
      ariaLabel: 'Select preferred theme',
    },
    colSpan: 6,
    step: 3,
  }),

  language: field.select({
    label: 'Language',
    description: 'Select your preferred language',
    placeholder: 'Choose language',
    options: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
    ],
    default: 'en',
    componentProps: {
      autocomplete: 'language',
      ariaLabel: 'Select language',
      tooltip: 'Language can be changed later in settings',
    },
    colSpan: 6,
    step: 3,
  }),

  readOnlyField: field.text({
    label: 'Account ID',
    default: 'ACC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    description: 'Your unique account identifier (read-only field)',
    componentProps: {
      readOnly: true,
      ariaLabel: 'Account ID (read-only)',
      tooltip: 'This ID is automatically generated and cannot be changed',
    },
    colSpan: 6,
    step: 3,
  }),
}).withFormMeta({
  title: 'Complex Demo - All Features',
  description: 'Comprehensive demonstration of all production-ready features',
  submitLabel: 'Complete Registration',
  steps: [
    { number: 1, title: 'Basic Information', description: 'Enter your personal details' },
    { number: 2, title: 'Advanced Fields', description: 'Additional information and preferences' },
    { number: 3, title: 'Rich Content & Preferences', description: 'Complete your profile' },
  ],
});
