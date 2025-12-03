import { useFormContext, useWatch } from 'react-hook-form';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { evaluateCondition } from '../utils/logic-engine';

/**
 * Custom hook to determine if a field should be visible based on its showWhen condition.
 * Supports both function-based and declarative logic.
 * 
 * @param {IFieldConfig} config - The field configuration.
 * @returns {boolean} True if the field should be shown, false otherwise.
 */
export const useConditionalField = (config: IFieldConfig): boolean => {
  const { control } = useFormContext();
  const formValues = useWatch({ control });

  if (!config.showWhen) {
    return true;
  }

  try {
    if (typeof config.showWhen === 'function') {
      return config.showWhen(formValues);
    }
    return evaluateCondition(config.showWhen, formValues);
  } catch (error) {
    console.error(`Error evaluating showWhen for field ${config.name}:`, error);
    return true; // Default to showing on error to avoid blocking users
  }
};
