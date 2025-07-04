import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import ContextMenu from "@/components/ui/ContextMenu";
import ContextMenuAlert from "@/components/ui/ContextMenu/alert";
import SocialMediaBar from "@/components/ui/SocialMediaBar";
import NavBar from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: {
    default: "IJ | Portfólio",
    template: "IJ | %s",
  },
  description:
    "Olá, sou Israel R. Jatobá, eu sou um iniciante no mundo da programação e faço projetos nas horas vagas.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-br">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <ContextMenu />
            <ContextMenuAlert />
            <SocialMediaBar />
            <NavBar />

            <main className="px-12">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
