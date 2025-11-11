import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/core/components/ui/dropdown-menu";
import { Button } from "@/core/components/ui/button";
import { Globe } from "lucide-react";
import { getAppLanguages } from "@/core/config/app.config";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = getAppLanguages();

  const currentLang =
    languages.find((l) => l.key === i18n.language) || languages[0];

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-sm"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{currentLang.label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.key}
            onClick={() => handleChange(lang.key)}
            className={
              i18n.language === lang.key
                ? "font-semibold text-primary"
                : "text-foreground"
            }
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
