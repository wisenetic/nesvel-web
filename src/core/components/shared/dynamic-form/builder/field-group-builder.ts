import { IBuilderField } from '../interfaces/builder-field.interface';
import { IFieldGroup } from '../interfaces/field-group.interface';
import { LayoutType } from '../types/layout-type.type';

/**
 * Options for configuring a field group.
 */
interface GroupOptions {
  layout?: LayoutType;
  label?: string;
  columns?: number | { mobile: number; tablet: number; desktop: number };
  collapsible?: boolean;
  step?: number;
  showWhen?: ((values: any) => boolean) | import('../types/logic-types').Condition;
}

/**
 * Creates a field group configuration.
 * 
 * @param {Record<string, IBuilderField | IFieldGroup>} fields - Map of fields to include in the group.
 * @param {GroupOptions} options - Configuration options for the group layout and behavior.
 * @returns {IFieldGroup} The configured field group object.
 */
export const fieldGroup = (
  fields: Record<string, IBuilderField | IFieldGroup>,
  options: GroupOptions = {}
): IFieldGroup => {
  return {
    fields,
    layout: options.layout || 'vertical',
    label: options.label,
    columns: options.columns,
    collapsible: options.collapsible,
    step: options.step,
    showWhen: options.showWhen,
  };
};
