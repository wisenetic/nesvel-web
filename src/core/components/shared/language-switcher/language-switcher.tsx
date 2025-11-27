import { useTranslation } from "@refinedev/core";
import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { getAppLanguages } from "@/core/config/app.config";
import { cn } from "@/core/lib/utils";

type LanguageSwitcherProps = {
  /** Wrapper div classes (width, positioning, etc.). */
  className?: string;
  /** Extra classes for the SelectTrigger (height, padding, border, text). */
  triggerClassName?: string;
  /** Extra classes for the globe icon. */
  iconClassName?: string;
  /** Optional: override SelectContent width or other styles. */
  contentClassName?: string;
};

export const LanguageSwitcher = ({
  className,
  triggerClassName,
  iconClassName,
  contentClassName,
}: LanguageSwitcherProps) => {
  const { getLocale, changeLocale } = useTranslation();

  const languages = getAppLanguages();

  const currentLangKey = getLocale();

  const handleChange = (lang: string) => {
    if (!lang || lang === currentLangKey) return;
    changeLocale(lang);
  };

  return (
    <div className={cn("relative", className)}>
      <Globe
        className={cn(
          "pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground",
          iconClassName
        )}
      />
      <Select value={currentLangKey} onValueChange={handleChange}>
        <SelectTrigger
          className={cn(
            "h-8 w-full pl-7 pr-6",
            "border-border bg-background text-xs md:text-sm",
            triggerClassName
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={cn("w-[150px]", contentClassName)}>
          {languages.map(lang => (
            <SelectItem key={lang.key} value={lang.key}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
