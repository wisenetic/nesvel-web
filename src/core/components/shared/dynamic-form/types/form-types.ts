import { IFormSchema } from '../interfaces/form-schema.interface';

/**
 * Props for the DynamicForm component.
 */
export type DynamicFormProps = {
  schema: IFormSchema;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  className?: string;
  submitLabel?: string;
};
