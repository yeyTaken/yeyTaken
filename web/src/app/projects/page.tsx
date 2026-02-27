import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  TbArrowUpRight,
  TbBrandGithub,
  TbBrandNpm,
  TbDeviceIpadHorizontalShare,
  TbGoGame,
  TbMail,
  TbStack3,
} from "react-icons/tb";
// import { settings } from "@/lib";

type Project = {
  title: string;
  summary: string;
  stack: string;
  icon: IconType;
  banner?: string;
  pinned: boolean;
  href: string;
};

const projects: Project[] = [
  {
    title: "ARC Studio, Inc.",
    summary:
      "Plataforma institucional com CMS, landing pages modulares e painel para gestão de conteúdo.",
    stack: "Next.js · TypeScript · CMS",
    icon: TbDeviceIpadHorizontalShare,
    banner: "/images/projects/arcstudio.png",
    pinned: true,
    href: "https://arcstudio.online/",
  },
  {
    title: "AtosJS",
    summary:
      "Biblioteca JavaScript focada em organização de fluxos e padronização de ações assíncronas.",
    stack: "TypeScript · Vitest · Build Tools",
    icon: TbBrandNpm,
    banner: "/images/projects/atos_js.png",
    pinned: true,
    href: "https://atos.js.org/",
  },
  {
    title: "Project Center",
    summary:
      "Hub central para acompanhar entregas, status das squads e indicadores de execução por projeto.",
    stack: "ARCH Linux · Linux · Nextjs · Github",
    icon: TbBrandGithub,
    // banner: "/images/projects/project-center.svg",
    pinned: false,
    href: "https://yeytaken.github.io/project-center/",
  },
  {
    title: "yeyTaken/Hytale",
    summary:
      "Mods, Sistemas e muitos mais; Sistemas para aprimora sua experiencia com o jogo Hytale.",
    stack: "Hytale · Mods · Outros",
    icon: TbGoGame,
    banner: "/images/projects/hytale.png",
    pinned: false,
    href: "https://github.com/yeytaken/hytale",
  },
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.pinned);
  const otherProjects = projects.filter((project) => !project.pinned);

  const renderProjectCard = (project: Project) => {
    const ProjectIcon = project.icon;
    const isExternalHref = project.href.startsWith("http");

    return (
      <article
        key={project.title}
        className="rounded-2xl border border-foreground/10 bg-background/45 p-5 transition-colors hover:border-primary/25 hover:bg-background/70"
      >
        <div
          className="relative h-24 overflow-hidden rounded-xl border border-foreground/10 bg-background/20"
        >
          <Image
            src={project.banner || "/images/projects/default.svg"}
            alt={`Banner do projeto ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-black/30" />

          <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-xl border border-white/40 bg-black/15 text-white">
            <ProjectIcon size={18} aria-hidden />
          </span>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-foreground">{project.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">{project.summary}</p>
        <p className="mt-4 text-xs font-medium uppercase tracking-wider text-foreground/55">
          {project.stack}
        </p>

        <Link
          href={project.href}
          target={isExternalHref ? "_blank" : undefined}
          rel={isExternalHref ? "noreferrer" : undefined}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Ver projeto
          <TbArrowUpRight size={16} aria-hidden />
        </Link>
      </article>
    );
  };

  return (
    <section className="w-full min-h-[calc(100svh-4rem)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-foreground/55">
            <TbStack3 size={16} aria-hidden />
            Projetos
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Trabalhos em destaque
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Recorte dos tipos de produto que construo com foco em estabilidade,
            clareza de produto e evolução contínua.
          </p>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map(renderProjectCard)}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-foreground/10 bg-background/45 p-5 text-sm text-foreground/70">
            Não há trabalhos em destaque no momento.
          </p>
        )}

        <div className="mt-10 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Trabalhos
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Projetos adicionais que também fazem parte do meu portfólio.
          </p>
        </div>

        {otherProjects.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map(renderProjectCard)}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl border border-foreground/10 bg-background/45 p-5 text-sm text-foreground/70">
            Não há trabalhos disponíveis no momento.
          </p>
        )}

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <TbMail size={16} aria-hidden />
            Quer ver um case específico? Fale comigo
            <TbArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
