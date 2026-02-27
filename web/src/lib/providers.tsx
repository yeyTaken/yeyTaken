"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

import { ThemeProvider } from "./theme";
import { FooterComponent } from "@/components/Footer";
import { NavbarComponent } from "@/components/Navbar";

export function ProvidersWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HeroUIProvider>
        <ToastProvider />
        <main className="flex min-h-screen flex-col">
          <NavbarComponent />
          <div className="flex-1">{children}</div>
          <FooterComponent />
        </main>
      </HeroUIProvider>
    </ThemeProvider>
  );
}
