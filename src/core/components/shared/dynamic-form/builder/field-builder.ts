import { z } from 'zod';
import { IBuilderField } from '../interfaces/builder-field.interface';
import { FieldType } from '../types/field-type.type';
import React from 'react';
import { AddressFieldOptions } from '../components/address-field';
import { VoiceFieldOptions } from '../components/voice-field';

/**
 * Base configuration options for all fields.
 */
interface BaseFieldOptions {
  label: string;
  placeholder?: string;
  default?: any;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  colSpan?: number;
  showWhen?: ((values: any) => boolean) | import('../types/logic-types').Condition;
  component?: React.ComponentType<any>;
  componentProps?: Record<string, any>;
  asyncValidate?: (value: any) => Promise<string | boolean>;
  debounce?: number;
  step?: number;
  className?: string;
}

/**
 * Options specific to text-like fields.
 */
interface TextFieldOptions extends BaseFieldOptions {
  min?: number;
  max?: number;
  pattern?: RegExp;
}

/**
 * Options specific to password fields.
 */
interface PasswordFieldOptions extends TextFieldOptions {
  strengthMeter?: boolean;
}

/**
 * Options specific to select/radio fields.
 */
interface OptionFieldOptions extends BaseFieldOptions {
  options: Array<{ label: string; value: string | number }>;
}

/**
 * Options specific to file fields.
 */
interface FileFieldOptions extends BaseFieldOptions {
  accept?: string | string[];
  multiple?: boolean;
  maxSize?: number;
  preview?: boolean;
}

/**
 * Options specific to array fields.
 */
interface ArrayFieldOptions extends BaseFieldOptions {
  itemType?: FieldType;
  itemSchema?: any; // Should be IFormSchema but circular dependency issues might arise
  addButtonText?: string;
  collapsible?: boolean;
  sortable?: boolean;
}

/**
 * Options specific to address fields.
 */
interface AddressOptions extends BaseFieldOptions {
  addressOptions?: AddressFieldOptions;
}

/**
 * Options specific to voice fields.
 */
interface VoiceOptions extends BaseFieldOptions {
  voiceOptions?: VoiceFieldOptions;
}

/**
 * Builder object containing methods to create various field configurations.
 * This serves as the primary API for defining form fields.
 */
export const field = {
  /**
   * Creates a text input field configuration.
   */
  text: (options: TextFieldOptions): IBuilderField => ({
    type: 'text',
    name: '',
    label: options.label,
    placeholder: options.placeholder,
    defaultValue: options.default,
    validation: z.string()
      .min(options.min || 0)
      .max(options.max || 255)
      .regex(options.pattern || /.*/)
      .optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates an email input field configuration.
   */
  email: (options: BaseFieldOptions): IBuilderField => ({
    type: 'email',
    name: '',
    label: options.label,
    placeholder: options.placeholder,
    defaultValue: options.default,
    validation: z.string().email().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a password input field configuration.
   */
  password: (options: PasswordFieldOptions): IBuilderField => ({
    type: 'password',
    name: '',
    label: options.label,
    placeholder: options.placeholder,
    defaultValue: options.default,
    validation: z.string().min(options.min || 8).optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    strengthMeter: options.strengthMeter,
    className: options.className,
  }),

  /**
   * Creates a select dropdown field configuration.
   */
  select: (options: OptionFieldOptions): IBuilderField => ({
    type: 'select',
    name: '',
    label: options.label,
    options: options.options,
    defaultValue: options.default,
    validation: z.union([z.string(), z.number()]).optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a checkbox field configuration.
   */
  checkbox: (options: BaseFieldOptions): IBuilderField => ({
    type: 'checkbox',
    name: '',
    label: options.label,
    defaultValue: options.default || false,
    validation: z.boolean().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a switch toggle field configuration.
   */
  switch: (options: BaseFieldOptions): IBuilderField => ({
    type: 'switch',
    name: '',
    label: options.label,
    defaultValue: options.default || false,
    validation: z.boolean().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a radio button group field configuration.
   */
  radio: (options: OptionFieldOptions): IBuilderField => ({
    type: 'radio',
    name: '',
    label: options.label,
    options: options.options,
    defaultValue: options.default,
    validation: z.union([z.string(), z.number()]).optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a date picker field configuration.
   */
  date: (options: BaseFieldOptions): IBuilderField => ({
    type: 'date',
    name: '',
    label: options.label,
    defaultValue: options.default,
    validation: z.date().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a textarea field configuration.
   */
  textarea: (options: TextFieldOptions): IBuilderField => ({
    type: 'textarea',
    name: '',
    label: options.label,
    placeholder: options.placeholder,
    defaultValue: options.default,
    validation: z.string()
      .min(options.min || 0)
      .max(options.max || 1000)
      .optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a file upload field configuration.
   */
  file: (options: FileFieldOptions): IBuilderField => ({
    type: 'file',
    name: '',
    label: options.label,
    defaultValue: options.default,
    validation: z.any().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: {
      accept: options.accept,
      multiple: options.multiple,
      maxSize: options.maxSize,
      preview: options.preview,
      ...options.componentProps,
    },
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates an array field configuration.
   */
  array: (options: ArrayFieldOptions): IBuilderField => ({
    type: 'array',
    name: '',
    label: options.label,
    defaultValue: options.default || [],
    validation: z.array(z.any()).optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: {
      itemType: options.itemType,
      itemSchema: options.itemSchema,
      addButtonText: options.addButtonText,
      collapsible: options.collapsible,
      sortable: options.sortable,
      ...options.componentProps,
    },
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a URL input field configuration.
   */
  url: (options: BaseFieldOptions): IBuilderField => ({
    type: 'url',
    name: '',
    label: options.label,
    placeholder: options.placeholder,
    defaultValue: options.default,
    validation: z.string().url().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates an address field configuration.
   */
  address: (options: AddressOptions): IBuilderField => ({
    type: 'address',
    name: '',
    label: options.label,
    defaultValue: options.default,
    validation: z.any().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: {
      addressOptions: options.addressOptions,
      ...options.componentProps,
    },
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a map field configuration.
   */
  map: (options: BaseFieldOptions): IBuilderField => ({
    type: 'map',
    name: '',
    label: options.label,
    defaultValue: options.default,
    validation: z.any().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a voice input field configuration.
   */
  voice: (options: VoiceOptions): IBuilderField => ({
    type: 'voice',
    name: '',
    label: options.label,
    defaultValue: options.default,
    validation: z.any().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: {
      ...options.voiceOptions,
      ...options.componentProps,
    },
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a time input field configuration.
   */
  time: (options: BaseFieldOptions): IBuilderField => ({
    type: 'time',
    name: '',
    label: options.label,
    placeholder: options.placeholder,
    defaultValue: options.default,
    validation: z.string().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a datetime-local input field configuration.
   */
  datetime: (options: BaseFieldOptions): IBuilderField => ({
    type: 'datetime',
    name: '',
    label: options.label,
    placeholder: options.placeholder,
    defaultValue: options.default,
    validation: z.string().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: options.componentProps,
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),

  /**
   * Creates a rich text editor field configuration.
   */
  richtext: (options: BaseFieldOptions & { toolbar?: 'minimal' | 'basic' | 'full' }): IBuilderField => ({
    type: 'richtext',
    name: '',
    label: options.label,
    placeholder: options.placeholder,
    defaultValue: options.default,
    validation: z.string().optional(),
    required: options.required,
    disabled: options.disabled,
    description: options.description,
    colSpan: options.colSpan,
    showWhen: options.showWhen,
    component: options.component,
    componentProps: {
      toolbar: options.toolbar || 'full',
      ...options.componentProps,
    },
    asyncValidate: options.asyncValidate,
    debounce: options.debounce,
    step: options.step,
    className: options.className,
  }),
};
