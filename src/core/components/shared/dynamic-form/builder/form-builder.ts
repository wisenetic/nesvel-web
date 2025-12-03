import { z } from 'zod';
import { IBuilderField } from '../interfaces/builder-field.interface';
import { IFieldGroup } from '../interfaces/field-group.interface';
import { IFormSchema } from '../interfaces/form-schema.interface';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Helper to recursively extract fields and build Zod schema.
 * 
 * @param {Record<string, IBuilderField | IFieldGroup>} fields - The fields or groups to process.
 * @param {Record<string, IFieldConfig>} flatFields - Accumulator for flattened field configs.
 * @param {z.ZodRawShape} zodShape - Accumulator for Zod schema shape.
 */
const processFields = (
  fields: Record<string, IBuilderField | IFieldGroup>,
  flatFields: Record<string, IFieldConfig>,
  zodShape: Record<string, z.ZodTypeAny>
) => {
  Object.entries(fields).forEach(([key, value]) => {
    if ('layout' in value) {
      // It's a group, recurse
      processFields(value.fields, flatFields, zodShape);
    } else {
      // It's a field
      const fieldConfig = value as IBuilderField;
      fieldConfig.name = key; // Assign the key as the field name
      
      // Add to flat fields map
      flatFields[key] = fieldConfig as IFieldConfig;

      // Add to Zod shape
      if (fieldConfig.validation) {
        let schema = fieldConfig.validation;
        if (!fieldConfig.required) {
          schema = schema.optional();
        }
        zodShape[key] = schema;
      } else {
        // Default to optional string if no validation provided
        zodShape[key] = z.any().optional();
      }
    }
  });
};

/**
 * Creates a complete form schema from a definition object.
 * 
 * @param {Record<string, IBuilderField | IFieldGroup>} definition - The form definition containing fields and groups.
 * @returns {Object} An object containing the schema and a method to add metadata.
 */
export const form = (definition: Record<string, IBuilderField | IFieldGroup>) => {
  const flatFields: Record<string, IFieldConfig> = {};
  const zodShape: Record<string, z.ZodTypeAny> = {};

  processFields(definition, flatFields, zodShape);

  const schema: IFormSchema = {
    fields: flatFields,
    validationSchema: z.object(zodShape),
  };

  return {
    ...schema,
    /**
     * Adds metadata to the form schema.
     * 
     * @param {IFormSchema['meta']} meta - The metadata to add.
     * @returns {IFormSchema} The final form schema.
     */
    withFormMeta: (meta: IFormSchema['meta']): IFormSchema => ({
      ...schema,
      meta,
    }),
  };
};
