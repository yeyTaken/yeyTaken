"use client";

import { NextIntlClientProvider } from "next-intl";
import { HeroUIProvider } from "@heroui/react";

import { ThemeProvider } from "./theme";
import { Footer } from "@/components/UI/Footer";

export function Providers({
  children,
  locale,
  messages
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="America/Sao_Paulo">
        <HeroUIProvider>
          {children}
          <Footer />
        </HeroUIProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
