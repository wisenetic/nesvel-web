import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props for the AsyncIndicator component.
 */
interface AsyncIndicatorProps {
  /**
   * The current status of the async operation.
   */
  status: 'idle' | 'loading' | 'success' | 'error';

  /**
   * Optional message to display alongside the icon.
   */
  message?: string;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * A component that displays the status of an asynchronous validation or operation.
 * 
 * @param {AsyncIndicatorProps} props - The component props.
 * @returns {JSX.Element | null} The rendered indicator.
 */
export const AsyncIndicator: React.FC<AsyncIndicatorProps> = ({
  status,
  message,
  className,
}) => {
  if (status === 'idle') return null;

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      {status === 'loading' && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
      {status === 'success' && (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      )}
      {status === 'error' && (
        <XCircle className="h-4 w-4 text-destructive" />
      )}
      
      {message && (
        <span className={cn(
          status === 'loading' && "text-muted-foreground",
          status === 'success' && "text-green-600",
          status === 'error' && "text-destructive"
        )}>
          {message}
        </span>
      )}
    </div>
  );
};
