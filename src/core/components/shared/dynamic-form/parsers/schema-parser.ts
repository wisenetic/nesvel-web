import { z } from 'zod';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Parses a Zod schema to extract field configurations.
 * Note: This is a simplified implementation. Full Zod introspection is complex.
 * 
 * @param {z.ZodObject<any>} schema - The Zod schema to parse.
 * @returns {Record<string, Partial<IFieldConfig>>} The extracted field configs.
 */
export const parseZodSchema = (schema: z.ZodObject<any>): Record<string, Partial<IFieldConfig>> => {
  const shape = schema.shape;
  const configs: Record<string, Partial<IFieldConfig>> = {};

  for (const key in shape) {
    const fieldSchema = shape[key];
    configs[key] = {
      name: key,
      required: !fieldSchema.isOptional(),
      // Further introspection would go here (e.g., extracting min/max/regex)
    };
  }

  return configs;
};
