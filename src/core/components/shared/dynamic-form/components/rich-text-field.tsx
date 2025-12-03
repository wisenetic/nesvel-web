import React, { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';

/**
 * Props for the RichTextField component.
 */
interface RichTextFieldProps {
  /**
   * The configuration for the field.
   */
  config: IFieldConfig;
}

/**
 * A component for rendering rich text editor fields using Quill.
 * Supports formatted text with toolbar for bold, italic, lists, links, etc.
 * 
 * @param {RichTextFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const RichTextField: React.FC<RichTextFieldProps> = ({ config }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[config.name]?.message as string | undefined;

  // Extract component props
  const {
    readOnly,
    ariaLabel,
    toolbar = 'full',
    placeholder,
  } = config.componentProps || {};

  // Quill modules configuration
  const modules = useMemo(() => {
    const toolbarOptions = toolbar === 'minimal'
      ? [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link'],
        ]
      : toolbar === 'basic'
      ? [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          ['clean'],
        ]
      : [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }, { 'align': [] }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],
          ['clean'],
        ];

    return {
      toolbar: toolbarOptions,
    };
  }, [toolbar]);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'blockquote', 'code-block',
    'link', 'image', 'video',
  ];

  return (
    <FieldWrapper
      label={config.label}
      id={config.name}
      error={error}
      description={config.description}
      required={config.required}
      className={config.colSpan ? `col-span-${config.colSpan}` : ''}
      tooltip={config.componentProps?.tooltip}
    >
      <Controller
        name={config.name}
        control={control}
        render={({ field }) => (
          <div className="rich-text-editor">
            <ReactQuill
              theme="snow"
              value={field.value || ''}
              onChange={field.onChange}
              modules={modules}
              formats={formats}
              readOnly={readOnly || config.disabled}
              placeholder={placeholder || config.placeholder}
              className={error ? 'border-destructive' : ''}
            />
          </div>
        )}
      />
      <style>{`
        .rich-text-editor .ql-container {
          min-height: 200px;
          font-family: inherit;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
        }
        .rich-text-editor .ql-toolbar {
          border-radius: 0.5rem 0.5rem 0 0;
          border-color: hsl(var(--border));
          background: hsl(var(--background));
        }
        .rich-text-editor .ql-container {
          border-radius: 0 0 0.5rem 0.5rem;
          border-color: hsl(var(--border));
          background: hsl(var(--background));
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }
        .rich-text-editor.border-destructive .ql-toolbar,
        .rich-text-editor.border-destructive .ql-container {
          border-color: hsl(var(--destructive));
        }
      `}</style>
    </FieldWrapper>
  );
};
