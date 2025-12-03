import { form } from '../builder/form-builder';
import { field } from '../builder/field-builder';
import { fieldGroup } from '../builder/field-group-builder';

// Mock async validation function
const checkUsername = async (username: string): Promise<boolean | string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (['admin', 'root', 'user'].includes(username.toLowerCase())) {
        resolve('Username already taken');
      } else {
        resolve(true);
      }
    }, 1000);
  });
};

// Mock data
const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
];

const statesByCountry: Record<string, Array<{ label: string; value: string }>> = {
  US: [
    { label: 'California', value: 'CA' },
    { label: 'New York', value: 'NY' },
    { label: 'Texas', value: 'TX' },
  ],
  CA: [
    { label: 'Ontario', value: 'ON' },
    { label: 'Quebec', value: 'QC' },
  ],
  UK: [
    { label: 'England', value: 'ENG' },
    { label: 'Scotland', value: 'SCT' },
  ],
};

/**
 * Registration form schema demonstrating advanced features:
 * - Wizard mode (steps)
 * - Async validation
 * - Password strength meter
 * - File upload with preview
 * - Conditional logic
 * - Array fields
 */
export const registrationDemoSchema = form({
  // Step 1: Account
  username: field.text({
    label: 'Username',
    placeholder: 'johndoe',
    min: 3,
    asyncValidate: checkUsername,
    debounce: 500,
    step: 1,
    description: 'Try "admin" to see async validation error.',
  }),
  
  email: field.email({
    label: 'Email',
    default: 'user@example.com',
    step: 1,
  }),
  
  password: field.password({
    label: 'Password',
    min: 8,
    strengthMeter: true,
    step: 1,
    description: 'Must be at least 8 characters.',
  }),
  
  // Step 2: Profile (with field group)
  avatar: field.file({
    label: 'Profile Picture',
    accept: 'image/png, image/jpeg',
    maxSize: 5 * 1024 * 1024, // 5MB
    preview: true,
    step: 2,
  }),
  
  name: fieldGroup({
    firstName: field.text({ label: 'First Name' }),
    lastName: field.text({ label: 'Last Name' })
  }, { layout: 'horizontal', step: 2 }),
  
  // Step 3: Company (conditional)
  hasCompany: field.checkbox({
    label: 'I represent a company',
    default: false,
    step: 3,
  }),
  
  companyName: field.text({
    label: 'Company Name',
    showWhen: { field: 'hasCompany', op: 'eq', value: true },
    step: 3,
  }),
  
  location: fieldGroup({
    country: field.select({
      label: 'Country',
      options: countries,
    }),
    state: field.select({
      label: 'State',
      // Note: Dynamic options based on dependency would require a custom component or enhanced builder
      // For now, we'll show all or use a simple conditional if supported, 
      // but standard builder expects static options. 
      // To support dynamic options, we'd need a 'dependsOn' feature in the builder/renderer.
      // For this demo, we'll just show US states as a placeholder or static list.
      options: statesByCountry['US'], 
    })
  }, { 
    layout: 'horizontal',
    showWhen: { field: 'hasCompany', op: 'eq', value: true },
    step: 3,
  }),
  
  // Step 4: Additional
  skills: field.array({
    label: 'Skills',
    itemType: 'text',
    addButtonText: 'Add Skill',
    step: 4,
  }),
  
  projects: field.array({
    label: 'Projects',
    itemSchema: form({
      name: field.text({ label: 'Project Name' }),
      url: field.url({ label: 'Project URL' })
    }),
    collapsible: true,
    sortable: true,
    step: 4,
  })
}).withFormMeta({
  title: 'Create Your Account',
  description: 'Please fill out the form below to register.',
  steps: [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Profile' },
    { number: 3, title: 'Company' },
    { number: 4, title: 'Additional' }
  ],
  submitButton: {
    text: 'Create Account',
    loadingText: 'Creating...'
  },
  disableOnInvalid: true,
});
