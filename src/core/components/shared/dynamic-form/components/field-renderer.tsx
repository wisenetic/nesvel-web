import React from 'react';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { getFieldComponent } from '../registry/field-registry';
import { useConditionalField } from '../hooks/useConditionalField';

/**
 * Props for the FieldRenderer component.
 */
interface FieldRendererProps {
  /**
   * The configuration for the field to render.
   */
  config: IFieldConfig;
}

/**
 * A component that dynamically renders the appropriate field component based on configuration.
 * It handles conditional visibility logic (showWhen) and custom component overrides.
 * 
 * @param {FieldRendererProps} props - The component props.
 * @returns {JSX.Element | null} The rendered field or null if hidden.
 */
export const FieldRenderer: React.FC<FieldRendererProps> = ({ config }) => {
  const isVisible = useConditionalField(config);

  if (!isVisible) {
    return null;
  }

  // Use custom component if provided, otherwise fallback to registry
  const Component = config.component || getFieldComponent(config.type);

  return <Component config={config} {...config.componentProps} />;
};
