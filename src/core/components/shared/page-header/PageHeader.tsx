import { ReactNode } from "react";

interface PageHeaderProps {
  /** Main page title — can be plain text or translated element */
  title: ReactNode;
  /** Optional description below the title */
  description?: ReactNode;
  /** The module decides whether to render any action buttons */
  rightSlot?: ReactNode;
  /** Optional extra class names */
  className?: string;
}

/**
 * Generic reusable page header component.
 * Layout: Left (title/description) | Right (actions)
 * Modules control their own actions (buttons, filters, etc.)
 */
export function PageHeader({
  title,
  description,
  rightSlot,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`
        flex flex-col md:flex-row md:items-center md:justify-between
        gap-3 md:gap-4 mb-6
        ${className}
      `}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            {description}
          </p>
        )}
      </div>

      {rightSlot && (
        <div className="flex items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          {rightSlot}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
