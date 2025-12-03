import { field, form, fieldGroup } from '../builder';
import { z } from 'zod';

/**
 * Advanced demo schema showcasing ALL field types available in the system.
 * This schema demonstrates every field type with basic configuration.
 * 
 * Field Types Covered:
 * - Text inputs: text, email, password, number, tel, url, textarea
 * - Selection: select, radio, checkbox, switch
 * - Temporal: date
 * - File: file upload
 * - Structured: array
 * - Advanced: address, map, voice
 */
export const advancedDemoSchema = form({
  // ===== TEXT INPUT FIELDS =====
  textInputGroup: fieldGroup({
    textField: field.text({
      label: 'Text Field',
      placeholder: 'Enter any text',
      description: 'Standard text input field',
    }),

    emailField: field.email({
      label: 'Email Field',
      placeholder: 'user@example.com',
      description: 'Email input with validation',
      required: true,
    }),

    passwordField: field.password({
      label: 'Password Field',
      placeholder: 'Enter password',
      description: 'Password input with hidden characters',
      strengthMeter: true,
    }),

    numberField: field.text({
      label: 'Number Field',
      placeholder: '123',
      description: 'Numeric input field',
      default: '',
    }),

    telField: field.text({
      label: 'Telephone Field',
      placeholder: '+1 (555) 123-4567',
      description: 'Phone number input',
    }),

    urlField: field.url({
      label: 'URL Field',
      placeholder: 'https://example.com',
      description: 'URL input with validation',
    }),

    textareaField: field.textarea({
      label: 'Textarea Field',
      placeholder: 'Enter multiple lines of text...',
      description: 'Multi-line text input',
    }),
  }, {
    label: 'Text Input Fields',
  }),

  // ===== SELECTION FIELDS =====
  selectionGroup: fieldGroup({
    selectField: field.select({
      label: 'Select Field',
      placeholder: 'Choose an option',
      description: 'Dropdown selection',
      options: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' },
      ],
    }),

    radioField: field.radio({
      label: 'Radio Field',
      description: 'Single selection from radio buttons',
      options: [
        { label: 'Choice A', value: 'a' },
        { label: 'Choice B', value: 'b' },
        { label: 'Choice C', value: 'c' },
      ],
    }),

    checkboxField: field.checkbox({
      label: 'Checkbox Field',
      description: 'Boolean checkbox input',
    }),

    switchField: field.switch({
      label: 'Switch Field',
      description: 'Toggle switch input',
    }),
  }, {
    label: 'Selection Fields',
  }),

  // ===== TEMPORAL FIELDS =====
  temporalGroup: fieldGroup({
    dateField: field.date({
      label: 'Date Field',
      placeholder: 'Select a date',
      description: 'Date picker input',
    }),
  }, {
    label: 'Temporal Fields',
  }),

  // ===== FILE UPLOAD =====
  fileGroup: fieldGroup({
    fileField: field.file({
      label: 'File Upload Field',
      description: 'Upload files with drag-and-drop',
      accept: ['image/*', '.pdf'],
      multiple: true,
      maxSize: 5 * 1024 * 1024, // 5MB
      preview: true,
    }),
  }, {
    label: 'File Upload',
  }),

  // ===== STRUCTURED DATA FIELDS =====
  structuredGroup: fieldGroup({
    arrayField: field.array({
      label: 'Array Field',
      description: 'Dynamic array of text items',
      itemType: 'text',
      addButtonText: 'Add Item',
      collapsible: true,
      sortable: true,
    }),
  }, {
    label: 'Structured Data Fields',
  }),

  // ===== ADVANCED FIELDS =====
  advancedGroup: fieldGroup({
    addressField: field.address({
      label: 'Address Field',
      description: 'Structured address input with country-specific formats',
      addressOptions: {
        showCountry: true,
        showState: true,
        showZip: true,
        showCity: true,
        showAddressLine2: true,
      },
    }),

    mapField: field.map({
      label: 'Map Field',
      description: 'Interactive map with location selection, search, and geolocation',
      componentProps: {
        defaultCenter: { lat: 40.7128, lng: -74.0060 },
        defaultZoom: 12,
        showSearch: true,
        showGeolocation: true,
        markers: [],
      },
    }),

    voiceField: field.voice({
      label: 'Voice Field',
      description: 'Voice recording with optional transcription',
      voiceOptions: {
        maxDuration: 60,
        transcribe: true,
        language: 'en-US',
      },
    }),
  }, {
    label: 'Advanced Fields',
  }),
}).withFormMeta({
  title: 'Advanced Demo - All Field Types',
  description: 'This form demonstrates every field type available in the dynamic form system.',
  submitLabel: 'Submit Form',
});
