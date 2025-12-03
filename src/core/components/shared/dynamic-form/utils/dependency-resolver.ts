import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Resolves dependencies between fields to determine execution order or visibility.
 * 
 * @param {Record<string, IFieldConfig>} fields - The map of field configurations.
 * @returns {string[]} Sorted field names based on dependencies.
 */
export const resolveDependencies = (fields: Record<string, IFieldConfig>): string[] => {
  // Simple topological sort could go here.
  // For now, we just return keys as order is usually defined by layout.
  return Object.keys(fields);
};
