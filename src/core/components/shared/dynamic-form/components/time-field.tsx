import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/core/components/ui/input';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Props for the TimeField component.
 */
interface TimeFieldProps {
  /**
   * The configuration for the field.
   */
  config: IFieldConfig;
}

/**
 * A component for rendering time input fields using HTML5 time input.
 * Supports 24-hour format with hours and minutes.
 * 
 * @param {TimeFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const TimeField: React.FC<TimeFieldProps> = ({ config }) => {
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
        type="time"
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
