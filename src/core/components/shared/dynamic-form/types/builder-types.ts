import { IBuilderField } from '../interfaces/builder-field.interface';
import { IFieldGroup } from '../interfaces/field-group.interface';

/**
 * Type for the builder definition object.
 */
export type BuilderDefinition = Record<string, IBuilderField | IFieldGroup>;
