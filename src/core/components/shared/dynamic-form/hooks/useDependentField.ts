import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';

/**
 * Custom hook to handle field dependencies (e.g., resetting a field when its dependency changes).
 * 
 * @param {string} fieldName - The name of the current field.
 * @param {string} dependencyName - The name of the field it depends on.
 */
export const useDependentField = (fieldName: string, dependencyName?: string) => {
  const { control, setValue } = useFormContext();
  const dependencyValue = useWatch({
    control,
    name: dependencyName || '',
  });

  useEffect(() => {
    if (dependencyName) {
      // Reset the dependent field when the dependency changes
      // This is a simple implementation; more complex logic could be added here
      setValue(fieldName, undefined);
    }
  }, [dependencyValue, dependencyName, fieldName, setValue]);

  return dependencyValue;
};
