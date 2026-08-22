import type { IconType } from "react-icons";
import {
  TbBrandGithub,
  // TbBrandNpm,
  // TbDeviceIpadHorizontalShare,
  // TbGoGame,
} from "react-icons/tb";

export type Project = {
  title: string;
  summary: string;
  stack: string;
  icon: IconType;
  banner?: string;
  pinned: boolean;
  href: string;
};

export const projects: Project[] = [
  // {
  //   title: "ARC Studio, Inc.",
  //   summary:
  //     "Plataforma institucional com CMS, landing pages modulares e painel para gestão de conteúdo.",
  //   stack: "Next.js · TypeScript · CMS",
  //   icon: TbDeviceIpadHorizontalShare,
  //   banner: "/images/projects/arcstudio.png",
  //   pinned: true,
  //   href: "https://arcstudio.online/",
  // },
  // {
  //   title: "AtosJS",
  //   summary:
  //     "Biblioteca JavaScript focada em organização de fluxos e padronização de ações assíncronas.",
  //   stack: "TypeScript · Vitest · Build Tools",
  //   icon: TbBrandNpm,
  //   banner: "/images/projects/atos_js.png",
  //   pinned: true,
  //   href: "https://atos.js.org/",
  // },
  {
    title: "Verion Studio",
    summary:
      "Criando softwares, ferramentas e experiências open-source para desenvolvedores.",
    stack: "Software · Workflow · Gestão de Projetos",
    icon: TbBrandGithub,
    banner: "/images/projects/verion.png",
    pinned: true,
    href: "https://github.com/verionofc",
  },
  // {
  //   title: "yeyTaken/Hytale",
  //   summary:
  //     "Mods, Sistemas e muitos mais; Sistemas para aprimora sua experiencia com o jogo Hytale.",
  //   stack: "Hytale · Mods · Outros",
  //   icon: TbGoGame,
  //   banner: "/images/projects/hytale.png",
  //   pinned: false,
  //   href: "https://github.com/yeytaken/hytale",
  // },
];
