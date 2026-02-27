import type { Metadata } from "next";

import "../../public/styles/globals.css";
import { ProvidersWrapper } from "@/lib/providers"; // wrapper client
import { settings } from "@/lib";

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
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
    { name: settings.author, url: settings.links.github }
  ],
  creator: settings.author,
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico"
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    // url: './opengraph-image.jpg',
    siteName: settings.name,
    type: 'website'
  },
  keywords: [
    settings.name,
    'portfolio',
    'developer'
  ],
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased min-h-screen w-full relative">
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            opacity: 0.1,
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

        <ProvidersWrapper>
          <div className="relative z-10">
            {children}
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
