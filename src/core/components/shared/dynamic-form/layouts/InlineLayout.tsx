import React from 'react';
import { cn } from '@/core/lib/utils';

/**
 * Props for the InlineLayout component.
 */
interface InlineLayoutProps {
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
 * A layout component that arranges children inline (flex row).
 * 
 * @param {InlineLayoutProps} props - The component props.
 * @returns {JSX.Element} The rendered layout.
 */
export const InlineLayout: React.FC<InlineLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-wrap gap-4 items-end", className)}>
      {children}
    </div>
  );
};
