"use client";

import { useEffect } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "@heroui/react";
import { TbMenu2, TbX, TbChevronRight } from "react-icons/tb";

import { navigation } from "./navigation";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    onOpenChange(false);
  }, [onOpenChange, pathname]);

  return (
    <Drawer.Root isOpen={open} onOpenChange={onOpenChange}>
      <Drawer.Trigger
        aria-label="Abrir menu"
        className={clsx(
          "inline-flex size-11 items-center justify-center rounded-xl",
          "border border-foreground/10 bg-background/60 text-foreground/80",
          "shadow-sm transition-all duration-200",
          "hover:border-foreground/20 hover:bg-background/85 hover:text-foreground",
          "lg:hidden",
        )}
      >
        <TbMenu2 size={20} aria-hidden />
      </Drawer.Trigger>

      <Drawer.Content placement="right">
        <Drawer.Backdrop className="bg-black/35 backdrop-blur-sm" />

        <Drawer.Dialog
          className={clsx(
            "flex h-full w-[min(88vw,24rem)] flex-col",
            "border-l border-foreground/10 bg-background/95 shadow-2xl",
          )}
        >
          <Drawer.Header className="relative flex items-start justify-between gap-4 border-b border-foreground/10 px-5 py-5">
            <div className="space-y-1 pr-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
                Navegação
              </p>
              <Drawer.Heading className="text-xl font-semibold tracking-tight text-foreground">
                Menu rápido
              </Drawer.Heading>
            </div>

            <Drawer.CloseTrigger
              aria-label="Fechar menu"
              className={clsx(
                "absolute right-4 top-4 inline-flex size-10 items-center justify-center",
                "rounded-full border border-foreground/10 bg-background/80",
                "text-foreground/70 shadow-sm transition-colors",
                "hover:border-foreground/20 hover:text-foreground",
              )}
            >
              <TbX size={18} aria-hidden />
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body className="flex-1 overflow-y-auto px-5 py-5">
            <div className="space-y-8">
              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  Páginas
                </p>

                <div className="space-y-2">
                  {navigation.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(`${item.href}/`));

                    return (
                      <Link
                        key={item.label}
                        href={item.href as string}
                        className={clsx(
                          "group flex items-center justify-between rounded-2xl border px-4 py-4 transition-all duration-200",
                          isActive
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : "border-foreground/10 bg-background/60 text-foreground/75 hover:border-foreground/20 hover:bg-background/90 hover:text-foreground",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={clsx(
                              "flex size-10 items-center justify-center rounded-xl",
                              isActive
                                ? "bg-primary/10"
                                : "bg-default-100 text-foreground/70 group-hover:text-foreground",
                            )}
                          >
                            {item.icon}
                          </span>

                          <span className="flex flex-col items-start">
                            <span className="text-sm font-semibold">
                              {item.label}
                            </span>
                            <span className="text-xs text-foreground/55">
                              Abrir página
                            </span>
                          </span>
                        </span>

                        <TbChevronRight
                          size={16}
                          aria-hidden
                          className={clsx(
                            "transition-transform duration-200",
                            isActive
                              ? "translate-x-0 text-primary"
                              : "group-hover:translate-x-0.5",
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>
          </Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Root>
  );
}
