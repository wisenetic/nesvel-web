import { FieldType } from '../types/field-type.type';

/**
 * Maps field types to their string identifiers.
 * Can be extended to include metadata about components.
 */
export const componentMap: Record<FieldType, string> = {
  text: 'TextField',
  email: 'TextField',
  password: 'TextField',
  number: 'TextField',
  tel: 'TextField',
  url: 'TextField',
  textarea: 'TextField',
  richtext: 'RichTextField',
  checkbox: 'CheckboxField',
  switch: 'SwitchField',
  radio: 'RadioField',
  select: 'SelectField',
  date: 'DateField',
  time: 'TimeField',
  datetime: 'DateTimeField',
  file: 'FileUpload',
  array: 'ArrayField',
  object: 'ObjectField',
  address: 'AddressField',
  map: 'MapField',
  voice: 'VoiceField',
  custom: 'CustomField',
};
