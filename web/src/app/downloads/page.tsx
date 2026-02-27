import Link from "next/link";
import { TbArrowRight, TbDownload, TbFileText, TbTools } from "react-icons/tb";

import { settings } from "@/lib";

const resources = [
  {
    title: "Material de estudo",
    description:
      "Coleção curada de links e referências para backend, frontend e arquitetura.",
    icon: TbFileText,
    href: settings.links.github,
    hrefLabel: "Abrir no GitHub",
  },
  {
    title: "Toolbox pessoal",
    description:
      "Lista de ferramentas e extensões que uso para desenvolvimento no dia a dia.",
    icon: TbTools,
    href: settings.links.github,
    hrefLabel: "Ver repositório",
  },
];

export default function DownloadsPage() {
  return (
    <section className="w-full min-h-[calc(100svh-4rem)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-foreground/55">
            <TbDownload size={16} aria-hidden />
            Downloads
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Recursos e materiais
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Espaço para arquivos e referências úteis. Os links abaixo apontam
            para os materiais atualmente disponíveis.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {resources.map((resource) => {
            const ResourceIcon = resource.icon;
            return (
              <article
                key={resource.title}
                className="rounded-2xl border border-foreground/10 bg-background/45 p-5"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-foreground/15 bg-background/60 text-foreground/75">
                  <ResourceIcon size={20} aria-hidden />
                </span>

                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  {resource.title}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {resource.description}
                </p>

                <Link
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <TbDownload size={16} aria-hidden />
                  {resource.hrefLabel}
                  <TbArrowRight size={16} aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
