"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Icon } from "@/widgets/Icon";
import { Theme } from "@/widgets/switcher/theme";

import { navigation } from "./navigation";
import { NavLink } from "./NavLink";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const iconProps = menuOpen
    ? { isOpen: true as const }
    : { animation: "typing" as const };

  useEffect(() => {
    const mountTimer = window.setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50",
          "border-b border-default-100",
          "bg-background/80 backdrop-blur-xl",
        )}
      >
        <div
          className={clsx(
            "mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6",
          )}
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-14">
            <Icon {...iconProps} />

            <nav className="hidden items-center gap-8 lg:flex">
              {navigation.map((item) => (
                <NavLink key={item.label} href={item.href} icon={item.icon}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Theme />
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      animate={{
        height: scrolled ? 64 : 72,
      }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50",
        "border-b border-default-100",
        "bg-background/80 backdrop-blur-xl",
      )}
    >
      <div
        className={clsx(
          "mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6",
        )}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-14">
          <Icon {...iconProps} />

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <NavLink key={item.label} href={item.href} icon={item.icon}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Theme />
          <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </div>
    </motion.header>
  );
}
