import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the HorizontalLayout component.
 */
interface HorizontalLayoutProps {
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
 * A layout component that arranges children horizontally (grid with 2 columns by default).
 * 
 * @param {HorizontalLayoutProps} props - The component props.
 * @returns {JSX.Element} The rendered layout.
 */
export const HorizontalLayout: React.FC<HorizontalLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {children}
    </div>
  );
};
