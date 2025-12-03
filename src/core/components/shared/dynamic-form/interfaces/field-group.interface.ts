import { IBuilderField } from './builder-field.interface';
import { LayoutType } from '../types/layout-type.type';

/**
 * Interface defining a group of fields with a specific layout.
 * 
 * @interface IFieldGroup
 */
export interface IFieldGroup {
  /**
   * The fields contained within this group.
   */
  fields: Record<string, IBuilderField | IFieldGroup>;

  /**
   * The layout strategy for this group.
   */
  layout: LayoutType;

  /**
   * Optional label for the group (rendered as a section header).
   */
  label?: string;

  /**
   * Configuration for grid columns (if layout is 'grid').
   */
  columns?: number | { mobile: number; tablet: number; desktop: number };

  /**
   * Whether the group is collapsible.
   */
  collapsible?: boolean;

  /**
   * Step number for wizard forms.
   */
  step?: number;

  /**
   * Conditional logic for showing the group.
   */
  showWhen?: ((values: any) => boolean) | import('../types/logic-types').Condition;
}
