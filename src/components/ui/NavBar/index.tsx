"use client";

import { Link } from "@heroui/link";
import { TbHome, TbAlignBoxBottomRight, TbInfoSquareRounded } from "react-icons/tb";
import { IconType } from "react-icons";

interface Item {
  label: string;
  href: string;
  Icon: IconType;
}

const items: Item[] = [
  {
    label: "Início",
    href: "/",
    Icon: TbHome
  },
  {
    label: "Sobre mim",
    href: "/about-me",
    Icon: TbInfoSquareRounded
  },
  {
    label: "Projetos",
    href: "/projects",
    Icon: TbAlignBoxBottomRight
  },
];

export default function NavBar() {
  return (
    <div className="select-none fixed z-[99999999] top-4 right-4 flex flex-col items-center gap-4">
      <div className="w-[2px] h-16 bg-gray-600 dark:bg-gray-500 mx-auto mb-2" />

      <div className="flex flex-col gap-4 items-center">
        {items.map(({ label, href, Icon }) => (
          <div key={label} className="flex items-center relative">
            <div className="group relative">
              <Link href={href}>
                <Icon className="text-foreground hover:text-gray-500 dark:hover:text-gray-400 w-6 h-6 transition-colors" />
              </Link>
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-foreground whitespace-nowrap">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
