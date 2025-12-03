import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the VerticalLayout component.
 */
interface VerticalLayoutProps {
  /**
   * The content to render within the layout.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * A layout component that stacks children vertically with spacing.
 * 
 * @param {VerticalLayoutProps} props - The component props.
 * @returns {JSX.Element} The rendered layout.
 */
export const VerticalLayout: React.FC<VerticalLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {children}
    </div>
  );
};
