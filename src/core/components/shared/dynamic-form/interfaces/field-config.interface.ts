import { FieldType } from '../types/field-type.type';
import { ZodTypeAny } from 'zod';
import React from 'react';

/**
 * Interface defining the configuration for a single form field.
 * 
 * @interface IFieldConfig
 */
export interface IFieldConfig {
  /**
   * The type of the field (e.g., 'text', 'email', 'select').
   */
  type: FieldType;

  /**
   * The label to display for the field.
   */
  label: string;

  /**
   * The name/key of the field in the form data.
   */
  name: string;

  /**
   * Optional placeholder text for input fields.
   */
  placeholder?: string;

  /**
   * Default value for the field.
   */
  defaultValue?: any;

  /**
   * Zod schema for validation.
   */
  validation?: ZodTypeAny;

  /**
   * Async validation function.
   * Returns a string (error message) or true (valid) or false (invalid generic).
   */
  asyncValidate?: (value: any) => Promise<string | boolean>;

  /**
   * Debounce time in milliseconds for async validation.
   */
  debounce?: number;

  /**
   * Whether the field is required.
   */
  required?: boolean;

  /**
   * Whether the field is disabled.
   */
  disabled?: boolean;

  /**
   * Options for select, radio, etc.
   */
  options?: Array<{ label: string; value: string | number }>;

  /**
   * Conditional logic for showing the field.
   */
  showWhen?: ((values: any) => boolean) | import('../types/logic-types').Condition;

  /**
   * Custom React component to render instead of the default registry component.
   */
  component?: React.ComponentType<any>;

  /**
   * Additional props to pass to the underlying component.
   */
  componentProps?: Record<string, any>;

  /**
   * Grid column span (1-12).
   */
  colSpan?: number;
  
  /**
   * Help text or description to display below the field.
   */
  description?: string;

  /**
   * Step number for wizard forms.
   */
  step?: number;

  /**
   * Whether to show a password strength meter (only for password fields).
   */
  strengthMeter?: boolean;

  /**
   * Additional CSS classes for the field wrapper.
   */
  className?: string;
}
