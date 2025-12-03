import { IFieldConfig } from './field-config.interface';

/**
 * Interface for the builder API's field definition.
 * This is used when constructing forms via the builder pattern.
 * 
 * @interface IBuilderField
 */
export interface IBuilderField extends Omit<IFieldConfig, 'name'> {
  /**
   * The name/key of the field (optional during build, set by form builder).
   */
  name?: string;
  /**
   * Method to set the field name (internal use during build).
   */
  _setName?: (name: string) => void;
}
