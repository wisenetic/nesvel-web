import React from 'react';
import { IFieldGroup } from '../interfaces/field-group.interface';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { FieldRenderer } from './field-renderer';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Props for the FieldGroup component.
 */
interface FieldGroupProps {
  /**
   * The configuration for the field group.
   */
  group: IFieldGroup;
}

/**
 * A component that renders a group of fields with a specific layout.
 * Supports vertical, horizontal, inline, and grid layouts, as well as collapsible sections.
 * 
 * @param {FieldGroupProps} props - The component props.
 * @returns {JSX.Element} The rendered group.
 */
export const FieldGroup: React.FC<FieldGroupProps> = ({ group }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const renderFields = () => {
    return (
      <div
        className={cn(
          'grid gap-4',
          group.layout === 'vertical' && 'grid-cols-1',
          group.layout === 'horizontal' && 'grid-cols-2',
          group.layout === 'inline' && 'flex flex-wrap gap-4 items-end',
          group.layout === 'grid' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' // Default grid behavior
        )}
      >
        {Object.entries(group.fields).map(([key, field]) => {
          if ('layout' in field) {
            // Nested group
            return <FieldGroup key={key} group={field as IFieldGroup} />;
          } else {
            // Single field
            return <FieldRenderer key={key} config={field as IFieldConfig} />;
          }
        })}
      </div>
    );
  };

  if (group.collapsible) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">{group.label}</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "" : "-rotate-90")} />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <Card>
            <CardContent className="pt-6">
              {renderFields()}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (group.label) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{group.label}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderFields()}
        </CardContent>
      </Card>
    );
  }

  return renderFields();
};
