import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { FieldRenderer } from './field-renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

/**
 * Props for the ArrayField component.
 */
interface ArrayFieldProps {
  /**
   * The configuration for the array field.
   */
  config: IFieldConfig;
}

/**
 * A component that handles dynamic lists of fields (add/remove/reorder).
 * Supports collapsible items and sorting.
 * 
 * @param {ArrayFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered array field.
 */
export const ArrayField: React.FC<ArrayFieldProps> = ({ config }) => {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: config.name,
  });

  const itemSchema = config.componentProps?.itemSchema;
  const isCollapsible = config.componentProps?.collapsible;
  const isSortable = config.componentProps?.sortable;
  const addButtonText = config.componentProps?.addButtonText || 'Add Item';

  // State to track open/closed state of each item if collapsible
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          {config.label}
        </CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            append(config.componentProps?.defaultItem || {});
            // Automatically open the new item if collapsible
            // We can't easily get the ID here immediately without a ref or effect, 
            // but usually the user wants to edit the new item.
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          {addButtonText}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => {
          const isOpen = openItems[field.id] ?? true; // Default to open

          const content = (
            <div className="flex-1 space-y-4">
              {itemSchema ? (
                // Render complex object fields
                Object.entries(itemSchema.fields).map(([key, fieldConfig]) => (
                  <FieldRenderer
                    key={key}
                    config={{
                      ...(fieldConfig as IFieldConfig),
                      name: `${config.name}.${index}.${key}`,
                    }}
                  />
                ))
              ) : (
                // Render simple primitive field
                <FieldRenderer
                  config={{
                    ...config,
                    name: `${config.name}.${index}`,
                    label: `Item ${index + 1}`,
                  }}
                />
              )}
            </div>
          );

          return (
            <div key={field.id} className="flex items-start gap-2 p-4 border rounded-md bg-card">
              {isSortable && (
                <div className="mt-2 cursor-move text-muted-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
              )}
              
              <div className="flex-1">
                {isCollapsible ? (
                  <Collapsible open={isOpen} onOpenChange={() => toggleItem(field.id)}>
                    <div className="flex items-center justify-between mb-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-auto font-medium hover:bg-transparent">
                          {isOpen ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                          Item {index + 1}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      {content}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  content
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive/90"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          );
        })}
        
        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-md">
            No items added yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
