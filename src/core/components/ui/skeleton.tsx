import { cn } from "@/core/lib/utils";

export type SkeletonProps = React.ComponentProps<"div"> & {
  /**
   * Optional semantic variant to standardize sizes.
   */
  variant?:
    | "text"
    | "title"
    | "avatar"
    | "button"
    | "input"
    | "card"
    | "chip";
};

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  const variantClass = (() => {
    switch (variant) {
      case "text":
        return "h-4 rounded-md";
      case "title":
        return "h-6 rounded-md";
      case "avatar":
        return "h-10 w-10 rounded-full";
      case "button":
        return "h-9 rounded-md";
      case "input":
        return "h-9 rounded-md";
      case "card":
        return "h-40 rounded-xl";
      case "chip":
        return "h-5 rounded-full inline-block";
      default:
        return "rounded-md";
    }
  })();

  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse", variantClass, className)}
      {...props}
    />
  );
}

export { Skeleton };
