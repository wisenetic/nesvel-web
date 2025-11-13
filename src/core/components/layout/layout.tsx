"use client";
import type { PropsWithChildren } from "react";

import { Header } from "@/core/components/layout/header";
import { Sidebar } from "@/core/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar";
import { ThemeProvider } from "@/core/providers/theme-provider";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 p-6 md:p-10">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

Layout.displayName = "Layout";
