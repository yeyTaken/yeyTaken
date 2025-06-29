import "./styles/globals.css";

import type { Metadata } from "next";
import ContextMenu from "@/components/ui/ContextMenu";

export const metadata: Metadata = {
  title: {
    default: "IJ",
    template: "%s | Portfólio",
  },
  description: "Minha página pessoal, portfólio e blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative overflow-hidden bg-[var(--background)] min-h-screen">
        {/* Background global */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/10 to-transparent blur-3xl animate-fadeIn" />
          <div
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-accent opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulseSlow"
            aria-hidden="true"
          />
        </div>

        {/* Context menu sempre disponível */}
        <ContextMenu />

        {/* Conteúdo da página acima do background */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
