import type { ReactNode } from "react";
import { TbMail, TbStack3 } from "react-icons/tb";

export type NavigationItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

export const navigation: NavigationItem[] = [
  {
    label: "Contato",
    href: "/contact",
    icon: <TbMail />,
  },
  {
    label: "Projetos",
    href: "/projects",
    icon: <TbStack3 />,
  },
];
