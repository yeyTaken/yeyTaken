"use client";

import { useState } from "react";
import { Link } from "@heroui/link";
import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";
import {
  TbHome,
  TbAlignBoxBottomRight,
  TbInfoSquareRounded,
  TbX,
  TbAddressBook,
  TbUser,
  TbBox,
} from "react-icons/tb";
import { IconType } from "react-icons";

import { AboutMe } from "@/components/modals/about-me";
import { Projects } from "@/components/modals/projects";

interface Item {
  label: string;
  Icon: IconType;
  onClick?: () => void;
  href?: string;
}

export default function NavBar() {
  const [activeComponent, setActiveComponent] = useState<
    "about" | "projects" | null
  >(null);

  const items: Item[] = [
    {
      label: "Início",
      Icon: TbHome,
      href: "/",
      onClick: () => setActiveComponent(null),
    },
    {
      label: "Sobre mim",
      Icon: TbInfoSquareRounded,
      href: "/#about-me",
      onClick: () => setActiveComponent("about"),
    },
    {
      label: "Projetos",
      Icon: TbAlignBoxBottomRight,
      href: "/#projects",
      onClick: () => setActiveComponent("projects"),
    },
  ];

  return (
    <>
      <div className="select-none fixed z-[99999999] top-4 right-4 flex flex-col items-center gap-4">
        <div className="w-[2px] h-16 bg-gray-600 dark:bg-gray-500 mx-auto mb-2" />

        <div className="flex flex-col gap-4 items-center">
          {items.map(({ label, href, Icon, onClick }) => (
            <div key={label} className="flex items-center relative group">
              {href && onClick ? (
                <Link href={href} onClick={onClick}>
                  <Icon className="text-foreground hover:text-gray-500 dark:hover:text-gray-400 w-6 h-6 transition-colors" />
                </Link>
              ) : (
                <>
                  {href ? (
                    <Link href={href}>
                      <Icon className="text-foreground hover:text-gray-500 dark:hover:text-gray-400 w-6 h-6 transition-colors" />
                    </Link>
                  ) : (
                    <button className="focus:outline-none" onClick={onClick}>
                      <Icon className="text-foreground hover:text-gray-500 dark:hover:text-gray-400 w-6 h-6 transition-colors" />
                    </button>
                  )}
                </>
              )}

              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-foreground whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeComponent && (
        <div className="fixed inset-0 z-[99999997] px-12 bg-background flex flex-col">
          <div className="select-none flex items-center justify-between">
            <Breadcrumbs isDisabled>
              <BreadcrumbItem startContent={<TbHome />}>Home</BreadcrumbItem>
              <BreadcrumbItem startContent={<TbAddressBook />}>Modal</BreadcrumbItem>
              <BreadcrumbItem startContent={activeComponent === "about" ? <TbUser /> : <TbBox />}>
                {activeComponent === "about" ? "Sobre mim" : "Projetos"}
              </BreadcrumbItem>
            </Breadcrumbs>
            <Link
              className="self-end mt-4 mr-4 text-foreground hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
              href="/"
              onClick={() => setActiveComponent(null)}
            >
              <TbX className="w-8 h-8" />
            </Link>
          </div>

          {activeComponent === "about" && <AboutMe />}
          {activeComponent === "projects" && <Projects />}
        </div>
      )}
    </>
  );
}
