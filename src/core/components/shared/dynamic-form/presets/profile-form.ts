import { field, form, fieldGroup } from '../builder';

/**
 * Pre-built schema for a user profile form.
 */
export const profileFormSchema = form({
  avatar: field.file({
    label: 'Profile Picture',
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
  }),
  personalInfo: fieldGroup({
    firstName: field.text({ label: 'First Name', required: true }),
    lastName: field.text({ label: 'Last Name', required: true }),
    bio: field.textarea({ label: 'Bio', max: 200 }),
  }, { label: 'Personal Information', layout: 'grid' }),
  preferences: fieldGroup({
    theme: field.radio({
      label: 'Theme Preference',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'System', value: 'system' },
      ],
      default: 'system',
    }),
    notifications: field.switch({
      label: 'Enable Notifications',
      default: true,
    }),
  }, { label: 'Preferences' }),
}).withFormMeta({
  title: 'Edit Profile',
  submitLabel: 'Save Changes',
});
