"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { TbDownload, TbHome, TbMail, TbStack3 } from "react-icons/tb";

import type { IconType } from "react-icons";

import Icon from "@/widgets/Icon";
import ThemeSwitcher from "@/widgets/switcher/theme";

type NavItem = {
  icon: IconType;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { icon: TbHome, label: "Inicio", href: "/" },
  { icon: TbStack3, label: "Projetos", href: "/projects" },
  { icon: TbDownload, label: "Downloads", href: "/downloads" },
  { icon: TbMail, label: "Contato", href: "/contact" },
];

export function NavbarComponent() {
  const pathname = usePathname();

  return (
    <header className="select-none sticky top-0 z-40 w-full bg-transparent">
      <nav className="relative mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <div className="z-10">
          <Icon className="rounded-md p-1" />
        </div>

        <ul className="absolute left-1/2 top-1/2 flex max-w-[calc(100%-8.5rem)] -translate-x-1/2 -translate-y-1/2 items-center gap-1 overflow-x-auto rounded-full border border-foreground/10 bg-background/40 p-1 text-xs font-medium shadow-sm backdrop-blur-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-w-none sm:gap-2 sm:text-base">
          {navItems.map((item) => {
            const ItemIcon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={clsx(
                    "relative inline-flex items-center rounded-full px-2.5 py-1.5 transition-colors sm:px-4",
                    isActive
                      ? "text-primary"
                      : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-primary/15"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <ItemIcon size={16} aria-hidden />
                    <span className="hidden min-[470px]:inline">{item.label}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="z-10 ml-auto">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
