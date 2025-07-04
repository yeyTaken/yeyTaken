import type { Metadata } from "next";

import HomePage from "@/components/app";

export const metadata: Metadata = {
  title: "IJ | Apresentação",
  description: "Página de apresentação do portifólio IJ.",
};

export default function Home() {
  return <HomePage />;
}
