import { IFieldConfig } from './field-config.interface';
import { ZodObject, ZodRawShape } from 'zod';

/**
 * Interface defining the overall schema for a dynamic form.
 * 
 * @interface IFormSchema
 */
export interface IFormSchema {
  /**
   * Map of field names to their configurations.
   */
  fields: Record<string, IFieldConfig>;

  /**
   * The complete Zod validation schema for the form.
   */
  validationSchema: ZodObject<ZodRawShape>;

  /**
   * Optional metadata for the form (title, description, etc.).
   */
  meta?: {
    title?: string;
    description?: string;
    submitLabel?: string;
    disableOnInvalid?: boolean;
    steps?: Array<{ number: number; title: string; description?: string }>;
    submitButton?: {
      text?: string;
      loadingText?: string;
    };
  };
}
