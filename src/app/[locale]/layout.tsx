import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";

import "../../../public/styles/globals.css";
import { Providers } from "@/lib/providers";
import { routing } from "@/lib/i18n/routing";

export const metadata: Metadata = {
  title: "Israel R. Jatobá",
  description: "Meu portfólio pessoal, onde compartilho meus projetos e experiências.",
};

export default async function LocaleLayout({ children, params }: Props) {
  const messages = await getMessages();
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
