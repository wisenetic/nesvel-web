"use client";
import type { PropsWithChildren } from "react";
import { cn } from "@/core/lib/utils";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { Sidebar } from "@/core/components/layout/sidebar";
import { Header } from "@/core/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 p-10">{children}</main>
          {/* <main
            className={cn(
              "@container/main",
              "container",
              "mx-auto",
              "relative",
              "w-full",
              "flex",
              "flex-col",
              "flex-1",
              "px-2",
              "pt-4",
              "md:p-4",
              "lg:px-6",
              "lg:pt-6",
            )}
          >
            {children}
          </main> */}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

Layout.displayName = "Layout";
