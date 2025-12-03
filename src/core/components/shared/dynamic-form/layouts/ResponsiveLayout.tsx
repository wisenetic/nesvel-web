import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the ResponsiveLayout component.
 */
interface ResponsiveLayoutProps {
  /**
   * The content to render within the layout.
   */
  children: React.ReactNode;

  /**
   * Configuration for columns at different breakpoints.
   */
  columns?: { mobile: number; tablet: number; desktop: number };

  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * A layout component that adjusts columns based on screen size.
 * 
 * @param {ResponsiveLayoutProps} props - The component props.
 * @returns {JSX.Element} The rendered layout.
 */
export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  className 
}) => {
  return (
    <div 
      className={cn(
        "grid gap-4",
        `grid-cols-${columns.mobile}`,
        `md:grid-cols-${columns.tablet}`,
        `lg:grid-cols-${columns.desktop}`,
        className
      )}
    >
      {children}
    </div>
  );
};
