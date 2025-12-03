import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Extracts metadata from a field configuration for documentation or UI purposes.
 * 
 * @param {IFieldConfig} config - The field configuration.
 * @returns {Object} Extracted metadata.
 */
export const extractFieldMetadata = (config: IFieldConfig) => {
  return {
    label: config.label,
    description: config.description,
    required: config.required,
    type: config.type,
    optionsCount: config.options?.length || 0,
  };
};
