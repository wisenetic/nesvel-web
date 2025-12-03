import { z } from 'zod';

/**
 * Parses a Zod schema to extract validation rules in a human-readable format.
 * This implementation inspects the Zod schema structure to derive rules.
 * 
 * @param {z.ZodTypeAny} schema - The Zod schema.
 * @returns {string[]} List of validation rules.
 */
export const parseValidationRules = (schema: z.ZodTypeAny): string[] => {
  const rules: string[] = [];

  // Handle Optional/Nullable wrappers
  let currentSchema = schema;
  while (currentSchema instanceof z.ZodOptional || currentSchema instanceof z.ZodNullable) {
    currentSchema = (currentSchema as any).unwrap();
  }

  // String Validations
  if (currentSchema instanceof z.ZodString) {
    rules.push('Must be a text value');
    
    const checks = (currentSchema as any)._def.checks;
    for (const check of checks) {
      switch (check.kind) {
        case 'min':
          rules.push(`Minimum ${check.value} characters`);
          break;
        case 'max':
          rules.push(`Maximum ${check.value} characters`);
          break;
        case 'email':
          rules.push('Must be a valid email address');
          break;
        case 'url':
          rules.push('Must be a valid URL');
          break;
        case 'uuid':
          rules.push('Must be a valid UUID');
          break;
        case 'regex':
          rules.push('Must match the required pattern');
          break;
      }
    }
  }

  // Number Validations
  if (currentSchema instanceof z.ZodNumber) {
    rules.push('Must be a number');
    
    const checks = (currentSchema as any)._def.checks;
    for (const check of checks) {
      switch (check.kind) {
        case 'min':
          rules.push(`Minimum value: ${check.value}`);
          break;
        case 'max':
          rules.push(`Maximum value: ${check.value}`);
          break;
        case 'int':
          rules.push('Must be an integer');
          break;
      }
    }
  }

  // Date Validations
  if (currentSchema instanceof z.ZodDate) {
    rules.push('Must be a valid date');
    
    const checks = (currentSchema as any)._def.checks;
    for (const check of checks) {
      switch (check.kind) {
        case 'min':
          rules.push(`Must be after ${new Date(check.value).toLocaleDateString()}`);
          break;
        case 'max':
          rules.push(`Must be before ${new Date(check.value).toLocaleDateString()}`);
          break;
      }
    }
  }

  // Array Validations
  if (currentSchema instanceof z.ZodArray) {
    rules.push('Must be a list of items');
    
    const minLength = (currentSchema as any)._def.minLength;
    const maxLength = (currentSchema as any)._def.maxLength;
    
    if (minLength) rules.push(`Minimum ${minLength.value} items`);
    if (maxLength) rules.push(`Maximum ${maxLength.value} items`);
  }

  return rules;
};
