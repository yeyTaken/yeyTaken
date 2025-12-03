"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("homePage");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
    </main>
  );
}
