import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Home() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold">Meus Projetos!</h1>{" "}
    </section>
  );
}
