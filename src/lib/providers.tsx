"use client";

import { NextIntlClientProvider } from "next-intl";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

import { ThemeProvider } from "./theme";

export function ProvidersWrapper({
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
          <ToastProvider />
          <main>{children}</main>
        </HeroUIProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
