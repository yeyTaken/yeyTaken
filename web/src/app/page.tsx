"use client";

import { Image } from "@heroui/react";
import Link from "next/link";
import { TbArrowRight, TbDownload, TbHome, TbMail, TbStack3, TbTools } from "react-icons/tb";

import { settings } from "@/lib";

const quickLinks = [
  {
    title: "Projetos",
    description: "Veja os trabalhos recentes e o processo por trás de cada entrega.",
    href: "/projects",
    icon: TbStack3,
  },
  {
    title: "Downloads",
    description: "Materiais úteis e recursos que uso no dia a dia.",
    href: "/downloads",
    icon: TbDownload,
  },
  {
    title: "Contato",
    description: "Abra uma conversa rápida por e-mail ou Gmail.",
    href: "/contact",
    icon: TbMail,
  },
];

type ToolCategory = {
  title: string;
  description: string;
  tools: string[];
};

const toolCategories: ToolCategory[] = [
  {
    title: "Frontend e UI",
    description: "Construção de interfaces modernas, acessíveis e com alta performance.",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HeroUI",
      "Framer Motion",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend e APIs",
    description: "Arquitetura de serviços, autenticação e integração entre sistemas.",
    tools: [
      "Node.js",
      "Hono",
      "Express",
      "REST APIs",
      "Zod",
      "Better Auth",
      "Nodemailer",
    ],
  },
  {
    title: "Dados e Persistência",
    description: "Modelagem de dados, consultas eficientes e camada de acesso estável.",
    tools: ["MongoDB", "Mongoose", "PostgreSQL", "MySQL", "Prisma", "Redis"],
  },
  {
    title: "Cloud e DevOps",
    description: "Entrega contínua, observabilidade e ambientes prontos para escala.",
    tools: [
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Cloudflare",
      "Linux",
      "Nginx",
      "CI/CD",
    ],
  },
  {
    title: "Qualidade e DX",
    description: "Padrões de código, testes e fluxo de desenvolvimento confiável.",
    tools: [
      "Vitest",
      "Jest",
      "Biome",
      "Git",
      "Conventional Commits",
      "Code Review",
    ],
  },
];

export default function HomePage() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex min-h-[calc(100svh-4rem)] items-center">
          <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-foreground/55">
                <TbHome size={16} aria-hidden />
                Portfólio
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <div className="w-fit shrink-0">
                  <div className="aspect-[3/4] w-40 overflow-hidden rounded-2xl border border-primary/20 bg-background/70 shadow-sm sm:w-44">
                    <Image
                      removeWrapper
                      src="/images/rabbi.jpg"
                      alt={`Foto de ${settings.author}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {settings.name}
                  </h1>

                  <p className="max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
                    Full stack developer focado em aplicações web robustas, com
                    atenção em experiência, performance e manutenção de longo prazo.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/45 hover:bg-primary/15"
                >
                  Ver projetos
                  <TbArrowRight size={16} aria-hidden />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-foreground/15 bg-background/55 px-5 py-2.5 text-sm font-semibold text-foreground/85 transition-colors hover:border-foreground/25 hover:bg-background/80"
                >
                  <TbMail size={16} aria-hidden />
                  Entrar em contato
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-3">
                {quickLinks.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group rounded-2xl border border-foreground/10 bg-background/45 p-4 transition-colors hover:border-primary/25 hover:bg-background/70"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-base font-semibold text-foreground">
                            {item.title}
                          </h2>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                            {item.description}
                          </p>
                        </div>

                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-foreground/15 text-foreground/75 transition-colors group-hover:border-primary/35 group-hover:text-primary">
                          <ItemIcon size={18} aria-hidden />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-foreground/55">
              <TbTools size={16} aria-hidden />
              Sobre mim
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ferramentas que uso
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
              Uso um stack fullstack completo para projetar, construir e escalar produtos
              web de ponta a ponta, com foco em qualidade, manutenção e entrega contínua.
            </p>
          </div>

          {toolCategories.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {toolCategories.map((category) => (
                <article
                  key={category.title}
                  className="rounded-2xl border border-foreground/10 bg-background/45 p-5"
                >
                  <h3 className="text-base font-semibold text-foreground">{category.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                    {category.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.tools.map((tool) => (
                      <span
                        key={`${category.title}-${tool}`}
                        className="rounded-full border border-foreground/15 bg-background/55 px-3 py-1 text-xs font-medium text-foreground/80"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-foreground/10 bg-background/45 p-5 text-sm text-foreground/70">
              Não há ferramentas cadastradas no momento.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
