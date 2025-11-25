import { useTranslation } from "@refinedev/core";
import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { cn } from "@/core/lib/utils";
import { getAppLanguages } from "@/core/config/app.config";

export const LanguageSwitcher = () => {
  const { getLocale, changeLocale } = useTranslation();

  const languages = getAppLanguages();

  const currentLangKey = getLocale();

  const handleChange = (lang: string) => {
    if (!lang || lang === currentLangKey) return;
    changeLocale(lang);
  };

  return (
    <div className="relative w-[120px] md:w-[150px]">
      <Globe
        className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
      />
      <Select value={currentLangKey} onValueChange={handleChange}>
        <SelectTrigger
          className={cn(
            "h-8 w-full pl-7 pr-6",
            "border-border bg-background text-xs md:text-sm",
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-[150px]">
          {languages.map((lang) => (
            <SelectItem key={lang.key} value={lang.key}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
