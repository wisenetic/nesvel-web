import React, { useCallback, useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload, X, File as FileIcon, AlertCircle } from 'lucide-react';
import { FieldWrapper } from './field-wrapper';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { Button } from '@/core/components/ui/button';
import { toast } from 'sonner';

/**
 * Props for the FileUpload component.
 */
interface FileUploadProps {
  /**
   * The configuration for the file field.
   */
  config: IFieldConfig;
}

/**
 * A component that handles file uploads with drag-and-drop support, previews, and size validation.
 * 
 * @param {FileUploadProps} props - The component props.
 * @returns {JSX.Element} The rendered file upload field.
 */
export const FileUpload: React.FC<FileUploadProps> = ({ config }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[config.name]?.message as string | undefined;
  const [previews, setPreviews] = useState<string[]>([]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], field: any) => {
    // Handle rejections (e.g. max size exceeded)
    if (fileRejections.length > 0) {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach(err => {
          if (err.code === 'file-too-large') {
            toast.error(`File ${file.name} is too large`, {
              description: `Max size is ${(config.componentProps?.maxSize || 0) / 1024 / 1024}MB`
            });
          } else {
            toast.error(`Error uploading ${file.name}: ${err.message}`);
          }
        });
      });
    }

    if (acceptedFiles.length === 0) return;

    // Create previews for images
    const newPreviews = acceptedFiles.map(file => 
      file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
    );
    
    // Update state based on multiple flag
    if (config.componentProps?.multiple) {
      setPreviews(prev => [...prev, ...newPreviews]);
      const currentFiles = field.value || [];
      field.onChange([...currentFiles, ...acceptedFiles]);
    } else {
      // Replace existing files if not multiple
      setPreviews(newPreviews);
      field.onChange(acceptedFiles);
    }
  }, [config.componentProps?.maxSize, config.componentProps?.multiple]);

  const removeFile = (index: number, field: any) => {
    const newFiles = [...(field.value || [])];
    newFiles.splice(index, 1);
    field.onChange(newFiles);

    const newPreviews = [...previews];
    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

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
        defaultValue={[]}
        render={({ field }) => {
          const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections, field),
            accept: config.componentProps?.accept ? 
              (typeof config.componentProps.accept === 'string' ? 
                {[config.componentProps.accept]: []} : config.componentProps.accept) 
              : undefined,
            maxSize: config.componentProps?.maxSize,
            multiple: config.componentProps?.multiple ?? false,
          });

          return (
            <div className="space-y-4">
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:border-primary'}
                  ${error ? 'border-destructive/50 bg-destructive/5' : ''}
                `}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}
                  </p>
                  {config.componentProps?.maxSize && (
                    <p className="text-xs text-muted-foreground">
                      Max size: {(config.componentProps.maxSize / 1024 / 1024).toFixed(0)}MB
                    </p>
                  )}
                </div>
              </div>

              {/* File List */}
              {field.value?.length > 0 && (
                <div className="grid gap-2">
                  {field.value.map((file: File, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-background">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {previews[index] ? (
                          <img src={previews[index]} alt="Preview" className="h-10 w-10 object-cover rounded" />
                        ) : (
                          <div className="h-10 w-10 bg-muted flex items-center justify-center rounded">
                            <FileIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="truncate">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeFile(index, field)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />
    </FieldWrapper>
  );
};
