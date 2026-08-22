"use client";

import { Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  TbApi,
  TbArrowRight,
  TbArrowUpRight,
  TbBrandGithub,
  TbCode,
  TbInfoCircle,
  TbMail,
  TbPackages,
  TbSparkles,
  TbStack3,
} from "react-icons/tb";

import { settings } from "@/lib";
import { projects } from "@/lib/projects";

type FocusArea = {
  title: string;
  description: string;
  eyebrow: string;
  icon: IconType;
};

const focusAreas: FocusArea[] = [
  {
    title: "APIs e dados bem organizados",
    description:
      "Desenvolvo APIs, integrações e ferramentas para bancos de dados com contratos claros, bom desempenho e manutenção simples.",
    eyebrow: "Back-end",
    icon: TbApi,
  },
  {
    title: "Sites e apps do início ao fim",
    description:
      "Conecto back-end, dados e interface para transformar ideias em aplicações completas, úteis e preparadas para evoluir.",
    eyebrow: "Full stack",
    icon: TbCode,
  },
  {
    title: "Ferramentas feitas para serem úteis",
    description:
      "Crio pacotes npm e outras ferramentas que uso nos meus projetos e compartilho para facilitar o trabalho da comunidade.",
    eyebrow: "Comunidade",
    icon: TbPackages,
  },
];

const stack = [
  "TypeScript",
  "Bun",
  "Node.js",
  "Next.js",
  "React",
  "APIs",
  "Bancos de dados",
  "Pacotes npm",
  "Java (Minecraft)",
];

const featuredProjects = projects.filter((project) => project.pinned);
const selectedProjects =
  featuredProjects.length > 0 ? featuredProjects.slice(0, 3) : projects.slice(0, 3);

export default function HomePage() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.9, 0.2, 1] }}
            className="space-y-5"
          >
            <Chip className="border border-danger/20 bg-danger/10 px-3 py-1 text-danger">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em]">
                <TbInfoCircle size={14} aria-hidden />
                Indisponível
              </span>
            </Chip>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Crio APIs, sites, aplicativos e ferramentas que resolvem problemas reais.
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-foreground/75 sm:text-base lg:text-lg">
                Sou {settings.name}, desenvolvedor full stack. Trabalho principalmente com
                TypeScript, Bun e Node.js na criação de APIs, aplicações e pacotes npm. Muitos
                projetos nascem como hobby, mas são usados no dia a dia e compartilhados para
                melhorar a qualidade do desenvolvimento na comunidade. Por enquanto, uso Java
                em projetos ligados ao Minecraft.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Ver projetos
                <TbArrowRight size={16} aria-hidden />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-background/55 px-5 py-3 text-sm font-semibold text-foreground/85 transition-colors hover:border-foreground/25 hover:bg-background/80"
              >
                Entrar em contato
                <TbMail size={16} aria-hidden />
              </Link>

              <Link
                href={settings.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary/30 hover:bg-primary/15"
              >
                GitHub
                <TbBrandGithub size={16} aria-hidden />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {stack.slice(0, 6).map((item) => (
                <Chip
                  key={item}
                  className="border border-foreground/10 bg-background/55 px-3 py-1 text-foreground/75"
                >
                  <span className="text-xs font-medium">{item}</span>
                </Chip>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.2, 0.9, 0.2, 1] }}
            className="rounded-3xl border border-foreground/10 bg-background/45 p-4 shadow-sm backdrop-blur-md sm:p-5"
          >
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-2xl border border-foreground/10 bg-background/20">
              <Image
                src="/images/rabbi.jpg"
                alt={`Foto de ${settings.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <Chip className="border border-white/20 bg-white/10 px-3 py-1 text-white backdrop-blur-md">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                    Rabbi Dev
                  </span>
                </Chip>

                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  {settings.name}
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
                  Desenvolvedor full stack focado em APIs, aplicações e ferramentas úteis para
                  a comunidade.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-foreground/10 bg-background/55 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                  Projetos publicados
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{projects.length}</p>
                <p className="mt-1 text-sm text-foreground/65">
                  Trabalhos disponíveis para conhecer e usar.
                </p>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/55 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                  Stack em uso
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{stack.length}</p>
                <p className="mt-1 text-sm text-foreground/65">
                  Tecnologias presentes nos projetos atuais.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {focusAreas.map((area, index) => {
            const AreaIcon = area.icon;

            return (
              <motion.article
                key={area.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.12 + index * 0.06,
                  ease: [0.2, 0.9, 0.2, 1],
                }}
                className="rounded-3xl border border-foreground/10 bg-background/45 p-5 backdrop-blur-md"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <AreaIcon size={22} aria-hidden />
                </span>

                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/55">
                  {area.eyebrow}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                  {area.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {area.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
          className="rounded-3xl border border-foreground/10 bg-background/45 p-5 shadow-sm backdrop-blur-md sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/55">
                <TbStack3 size={16} aria-hidden />
                Stack e ferramentas
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Tecnologias escolhidas de acordo com cada projeto
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-right sm:text-base">
              TypeScript, Bun e Node.js estão no centro do meu dia a dia, com Next.js e React nos
              produtos web. Também trabalho com APIs, pacotes npm e bancos de dados; Java, por
              enquanto, fica concentrado em projetos para Minecraft.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {stack.map((item) => (
              <Chip
                key={item}
                className="border border-foreground/10 bg-background/70 px-3 py-1.5 text-foreground/80"
              >
                <span className="text-sm font-medium">{item}</span>
              </Chip>
            ))}
          </div>
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.34, ease: [0.2, 0.9, 0.2, 1] }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/55">
                <TbSparkles size={16} aria-hidden />
                Projetos selecionados
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Projetos feitos para aprender, usar e compartilhar
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
                Um recorte de aplicações, ferramentas e experimentos que nasceram de necessidades
                ou curiosidades reais e hoje fazem parte das minhas contribuições para a comunidade.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {selectedProjects.map((project) => {
                const ProjectIcon = project.icon;
                const isExternalHref = project.href.startsWith("http");

                return (
                  <article
                    key={project.title}
                    className="rounded-3xl border border-foreground/10 bg-background/45 p-4 transition-colors hover:border-primary/25 hover:bg-background/70"
                  >
                    <div className="relative h-32 overflow-hidden rounded-2xl border border-foreground/10 bg-background/20">
                      <Image
                        src={project.banner || "/images/projects/default.svg"}
                        alt={`Banner do projeto ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-black/35 via-black/15 to-black/30" />

                      <span className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-2xl border border-white/40 bg-black/15 text-white">
                        <ProjectIcon size={18} aria-hidden />
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{project.summary}</p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
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
              })}
            </div>

            <div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Ver portfólio completo
                <TbArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.2, 0.9, 0.2, 1] }}
            className="rounded-3xl border border-foreground/10 bg-background/45 p-5 shadow-sm backdrop-blur-md"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/55">
              Próximo passo
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Tem uma API, um site, um aplicativo ou uma ferramenta em mente? Vamos conversar.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              Posso ajudar do back-end à interface, criando integrações, produtos completos e
              ferramentas com foco em qualidade, manutenção e evolução contínua.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Falar comigo
                <TbMail size={16} aria-hidden />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
