import type { ReactNode } from "react";

/**
 * Generic responsive grid for analytic/summary cards.
 *
 * - Uses CSS grid with auto rows so cards keep natural height.
 * - Uses grid-auto-flow: dense to reduce empty gaps when some cards are taller.
 * - Keeps DOM order so keyboard navigation and reading order remain predictable.
 */
export type CardGridProps = {
  children: ReactNode;
  /**
   * Optional additional className for the grid container.
   */
  className?: string;
};

export const CardGrid = ({ children, className }: CardGridProps) => {
  return (
    <div
      className={
        "grid auto-rows-max grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 [grid-auto-flow:dense]" +
        (className ? ` ${className}` : "")
      }
    >
      {children}
    </div>
  );
};
