import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Props for the DateTimeField component.
 */
interface DateTimeFieldProps {
  /**
   * The configuration for the field.
   */
  config: IFieldConfig;
}

/**
 * A component for rendering datetime-local input fields using HTML5 datetime-local input.
 * Supports date and time selection in the user's local timezone.
 * 
 * @param {DateTimeFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const DateTimeField: React.FC<DateTimeFieldProps> = ({ config }) => {
  const { register, formState: { errors } } = useFormContext();
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
      <Input
        id={config.name}
        type="datetime-local"
        placeholder={config.placeholder}
        disabled={config.disabled}
        readOnly={config.componentProps?.readOnly}
        autoComplete={config.componentProps?.autocomplete}
        aria-label={config.componentProps?.ariaLabel || config.label}
        aria-describedby={config.description ? `${config.name}-description` : undefined}
        aria-required={config.required}
        {...register(config.name)}
        {...config.componentProps}
      />
    </FieldWrapper>
  );
};
