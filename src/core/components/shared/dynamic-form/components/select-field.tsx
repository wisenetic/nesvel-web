import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Props for the SelectField component.
 */
interface SelectFieldProps {
  /**
   * The configuration for the field.
   */
  config: IFieldConfig;
}

/**
 * A component for rendering a select dropdown field.
 * 
 * @param {SelectFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const SelectField: React.FC<SelectFieldProps> = ({ config }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[config.name]?.message as string | undefined;

  return (
    <FieldWrapper
      label={config.label}
      id={config.name}
      error={error}
      description={config.description}
      required={config.required}
      className={config.colSpan ? `col-span-${config.colSpan}` : ''}
    >
      <Controller
        control={control}
        name={config.name}
        defaultValue={config.defaultValue}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={config.disabled}
          >
            <SelectTrigger id={config.name}>
              <SelectValue placeholder={config.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {config.options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FieldWrapper>
  );
};
