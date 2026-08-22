"use client";

import { Breadcrumbs, RouterProvider } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

const pageLabels: Readonly<Record<string, string>> = {
  "/": "Início",
  "/contact": "Contato",
  "/projects": "Projetos",
};

type BreadcrumbEntry = {
  href?: string;
  key: string;
  label: string;
};

function normalizePathname(pathname: string) {
  const normalizedPathname = pathname.replace(/\/+$/u, "");

  return normalizedPathname || "/";
}

function buildBreadcrumbs(rawPathname: string): BreadcrumbEntry[] {
  const pathname = normalizePathname(rawPathname);

  if (pathname === "/") {
    return [{ key: pathname, label: pageLabels[pathname] }];
  }

  const segments = pathname.split("/").filter(Boolean);
  const ancestors = segments.slice(0, -1).flatMap((_, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = pageLabels[href];

    return label ? [{ href, key: href, label }] : [];
  });

  return [
    { href: "/", key: "/", label: pageLabels["/"] },
    ...ancestors,
    {
      key: pathname,
      label: pageLabels[pathname] ?? "Página não encontrada",
    },
  ];
}

export function BreadcrumbNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const items = buildBreadcrumbs(pathname);

  return (
    <nav aria-label="Navegação estrutural" className="overflow-x-auto">
      <RouterProvider navigate={(href) => router.push(href)}>
        <Breadcrumbs
          aria-label="Caminho da página atual"
          className="min-w-max"
        >
          {items.map((item) => {
            if (!item.href) {
              return (
                <Breadcrumbs.Item key={item.key}>
                  {item.label}
                </Breadcrumbs.Item>
              );
            }

            return (
              <Breadcrumbs.Item key={item.key} href={item.href}>
                {item.label}
              </Breadcrumbs.Item>
            );
          })}
        </Breadcrumbs>
      </RouterProvider>
    </nav>
  );
}
