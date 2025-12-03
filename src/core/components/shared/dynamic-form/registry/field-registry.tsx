import React from 'react';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { TextField } from '../components/text-field';
import { SelectField } from '../components/select-field';
import { CheckboxField } from '../components/checkbox-field';
import { RadioField } from '../components/radio-field';
import { SwitchField } from '../components/switch-field';
import { DateField } from '../components/date-field';
import { TimeField } from '../components/time-field';
import { DateTimeField } from '../components/datetime-field';
import { RichTextField } from '../components/rich-text-field';
import { FileUpload } from '../components/file-upload';
import { ArrayField } from '../components/array-field';
import { AddressField } from '../components/address-field';
import { MapField } from '../components/map-field';
import { VoiceField } from '../components/voice-field';
import { FieldType } from '../types/field-type.type';

/**
 * Type definition for a field component.
 */
type FieldComponent = React.FC<{ config: IFieldConfig }>;

/**
 * Registry mapping field types to their corresponding React components.
 */
const registry: Partial<Record<FieldType, FieldComponent>> = {
  text: TextField,
  email: TextField,
  password: TextField,
  number: TextField,
  tel: TextField,
  url: TextField,
  textarea: TextField,
  richtext: RichTextField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  switch: SwitchField,
  date: DateField,
  time: TimeField,
  datetime: DateTimeField,
  file: FileUpload,
  array: ArrayField,
  address: AddressField,
  map: MapField,
  voice: VoiceField,
};

/**
 * Retrieves the component for a given field type.
 * 
 * @param {FieldType} type - The type of field to render.
 * @returns {FieldComponent} The corresponding component, or TextField as fallback.
 */
export const getFieldComponent = (type: FieldType): FieldComponent => {
  return registry[type] || TextField;
};
