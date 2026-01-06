import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";

import "../../../public/styles/globals.css";
import { ProvidersWrapper } from "@/lib/providers"; // wrapper client
import AppNavbar from "@/widgets/navbar";
import { routing } from "@/lib/i18n/routing";
import { settings } from "@/lib";

export const metadata = {
  // metadataBase: new URL(settings.links.site),
  applicationName: settings.name,
  description: "Israel R. Jatobá - Full Stack Developer.",
  appleWebApp: {
    title: settings.name
  },
  title: {
    default: settings.name,
    template: `${settings.name} — %s`,
  },
  authors: [
    { name: settings.author, url: "https://github.com/yeytaken" }
  ],
  creator: settings.author,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    // url: './opengraph-image.jpg',
    siteName: settings.name,
    locale: 'pt_BR',
    type: 'website'
  },
  keywords: [
    settings.name,
    'npm', 'pnpm', 'yarn',
    'package', 'pacote de recursos',
    'nodejs', 'bun',
    'javascript', 'js',
    'typescript', 'ts'
  ],
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

export default async function LocaleLayout({ children, params }: Props ) {
  const { locale } = await params;
  const messages = await getMessages();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased min-h-screen w-full relative">
        {/* Background Grid Adaptativo */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            opacity: 0.1, // Ajuste a opacidade para o grid não ficar muito forte
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <ProvidersWrapper locale={locale} messages={messages}>
          {/* Conteúdo principal com z-index para ficar acima do bg */}
          <div className="relative z-10">
            <AppNavbar />
            {children}
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
