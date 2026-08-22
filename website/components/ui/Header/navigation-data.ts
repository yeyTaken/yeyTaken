import { FaCube, FaCubes } from "react-icons/fa6";
import type { ElementType } from "react";

export type DocumentationLink = {
  title: string;
  description: string;
  href: string;
  icon: ElementType;
};

export const documentationLinks: DocumentationLink[] = [
  {
    title: "Documentação",
    description: "Documentação geral sobre o Tile.",
    icon: FaCubes,
    href: "/docs/get-started",
  },
  {
    title: "Instalação",
    description: "Instalação do projeto Tile.",
    icon: FaCube,
    href: "/docs/install",
  },
];
