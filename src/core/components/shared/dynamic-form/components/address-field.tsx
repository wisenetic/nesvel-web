import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { FieldWrapper } from './field-wrapper';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { cn } from '@/core/lib/utils';

/**
 * Configuration options for the AddressField.
 */
export interface AddressFieldOptions {
  /**
   * Whether to show the second address line.
   * @default true
   */
  showAddressLine2?: boolean;

  /**
   * Whether to show the city field.
   * @default true
   */
  showCity?: boolean;

  /**
   * Whether to show the state/region field.
   * @default true
   */
  showState?: boolean;

  /**
   * Whether to show the zip/postal code field.
   * @default true
   */
  showZip?: boolean;

  /**
   * Whether to show the country field.
   * @default true
   */
  showCountry?: boolean;

  /**
   * Custom labels for sub-fields.
   */
  labels?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };

  /**
   * Required status for sub-fields.
   */
  required?: {
    addressLine1?: boolean;
    addressLine2?: boolean;
    city?: boolean;
    state?: boolean;
    zip?: boolean;
    country?: boolean;
  };
}

/**
 * Props for the AddressField component.
 */
interface AddressFieldProps {
  /**
   * The configuration for the address field.
   */
  config: IFieldConfig;
}

/**
 * A configurable address field component that renders multiple sub-fields
 * for a complete address (Line 1, Line 2, City, State, Zip, Country).
 * 
 * @param {AddressFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered address field group.
 */
export const AddressField: React.FC<AddressFieldProps> = ({ config }) => {
  const { register, formState: { errors } } = useFormContext();
  const { name, label, description, required, componentProps } = config;
  
  const options: AddressFieldOptions = componentProps || {};
  
  // Default visibility settings
  const showLine2 = options.showAddressLine2 !== false;
  const showCity = options.showCity !== false;
  const showState = options.showState !== false;
  const showZip = options.showZip !== false;
  const showCountry = options.showCountry !== false;

  // Default labels
  const labels = {
    addressLine1: options.labels?.addressLine1 || 'Address Line 1',
    addressLine2: options.labels?.addressLine2 || 'Address Line 2',
    city: options.labels?.city || 'City',
    state: options.labels?.state || 'State / Region',
    zip: options.labels?.zip || 'Zip / Postal Code',
    country: options.labels?.country || 'Country',
  };

  // Default required status (inherit from main field required if not specified)
  const isRequired = {
    addressLine1: options.required?.addressLine1 ?? required,
    addressLine2: options.required?.addressLine2 ?? false,
    city: options.required?.city ?? required,
    state: options.required?.state ?? required,
    zip: options.required?.zip ?? required,
    country: options.required?.country ?? required,
  };

  // Helper to get error message for a sub-field
  const getError = (subField: string) => {
    const fieldError = (errors[name] as any)?.[subField];
    return fieldError?.message as string | undefined;
  };

  return (
    <div className={cn("space-y-4", config.className)}>
      <div className="flex flex-col gap-1">
        <Label className={cn(errors[name] && "text-destructive")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="grid gap-4">
        {/* Address Line 1 */}
        <div className="grid gap-2">
          <Label htmlFor={`${name}.line1`} className="text-xs text-muted-foreground">
            {labels.addressLine1}
            {isRequired.addressLine1 && <span className="text-destructive ml-1">*</span>}
          </Label>
          <Input
            id={`${name}.line1`}
            {...register(`${name}.line1`, { required: isRequired.addressLine1 && `${labels.addressLine1} is required` })}
            className={cn(getError('line1') && "border-destructive")}
          />
          {getError('line1') && (
            <p className="text-xs text-destructive">{getError('line1')}</p>
          )}
        </div>

        {/* Address Line 2 */}
        {showLine2 && (
          <div className="grid gap-2">
            <Label htmlFor={`${name}.line2`} className="text-xs text-muted-foreground">
              {labels.addressLine2}
              {isRequired.addressLine2 && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={`${name}.line2`}
              {...register(`${name}.line2`, { required: isRequired.addressLine2 && `${labels.addressLine2} is required` })}
              className={cn(getError('line2') && "border-destructive")}
            />
            {getError('line2') && (
              <p className="text-xs text-destructive">{getError('line2')}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City */}
          {showCity && (
            <div className="grid gap-2">
              <Label htmlFor={`${name}.city`} className="text-xs text-muted-foreground">
                {labels.city}
                {isRequired.city && <span className="text-destructive ml-1">*</span>}
              </Label>
              <Input
                id={`${name}.city`}
                {...register(`${name}.city`, { required: isRequired.city && `${labels.city} is required` })}
                className={cn(getError('city') && "border-destructive")}
              />
              {getError('city') && (
                <p className="text-xs text-destructive">{getError('city')}</p>
              )}
            </div>
          )}

          {/* State */}
          {showState && (
            <div className="grid gap-2">
              <Label htmlFor={`${name}.state`} className="text-xs text-muted-foreground">
                {labels.state}
                {isRequired.state && <span className="text-destructive ml-1">*</span>}
              </Label>
              <Input
                id={`${name}.state`}
                {...register(`${name}.state`, { required: isRequired.state && `${labels.state} is required` })}
                className={cn(getError('state') && "border-destructive")}
              />
              {getError('state') && (
                <p className="text-xs text-destructive">{getError('state')}</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Zip Code */}
          {showZip && (
            <div className="grid gap-2">
              <Label htmlFor={`${name}.zip`} className="text-xs text-muted-foreground">
                {labels.zip}
                {isRequired.zip && <span className="text-destructive ml-1">*</span>}
              </Label>
              <Input
                id={`${name}.zip`}
                {...register(`${name}.zip`, { required: isRequired.zip && `${labels.zip} is required` })}
                className={cn(getError('zip') && "border-destructive")}
              />
              {getError('zip') && (
                <p className="text-xs text-destructive">{getError('zip')}</p>
              )}
            </div>
          )}

          {/* Country */}
          {showCountry && (
            <div className="grid gap-2">
              <Label htmlFor={`${name}.country`} className="text-xs text-muted-foreground">
                {labels.country}
                {isRequired.country && <span className="text-destructive ml-1">*</span>}
              </Label>
              <Input
                id={`${name}.country`}
                {...register(`${name}.country`, { required: isRequired.country && `${labels.country} is required` })}
                className={cn(getError('country') && "border-destructive")}
              />
              {getError('country') && (
                <p className="text-xs text-destructive">{getError('country')}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
