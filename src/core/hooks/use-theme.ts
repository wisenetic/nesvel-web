import { useContext } from "react";
import {
  ThemeContext,
  ThemeProviderState,
} from "@/core/providers/theme-provider";

export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
