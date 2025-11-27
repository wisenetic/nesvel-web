"use client";
import type { PropsWithChildren } from "react";

import { Header } from "@/core/components/layout/header";
import { Sidebar } from "@/core/components/layout/sidebar";
import { LanguageSwitcher } from "@/core/components/shared/language-switcher/language-switcher";
import { ThemeToggle } from "@/core/components/shared/theme/theme-toggle";
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar";
import { ThemeProvider } from "@/core/providers/theme-provider";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header
            desktopClassName="border-b border-border bg-sidebar p-3 justify-end"
            mobileClassName="border-b border-border bg-sidebar pr-3 justify-between"
            desktopRightSlot={
              <>
                <LanguageSwitcher className="w-[120px] md:w-[150px]" />
                <ThemeToggle />
              </>
            }
            mobileRightSlot={<ThemeToggle className="h-8 w-8" />}
          />
          <main className="flex-1 p-6 md:p-10">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

Layout.displayName = "Layout";
