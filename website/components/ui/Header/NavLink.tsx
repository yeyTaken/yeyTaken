"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface Props {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function NavLink({ href, icon, children }: Props) {
  const pathname = usePathname();

  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className="relative flex items-center justify-center"
    >
      {active && (
        <motion.div
          layoutId="active-nav"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}
          className="absolute inset-0 rounded-xl border border-default-200 bg-default-100/80 backdrop-blur-sm shadow-sm"
        />
      )}

      <span
        className={clsx(
          "relative z-10 flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all duration-200",
          active
            ? "font-semibold text-foreground"
            : "font-medium text-foreground/70 hover:text-foreground",
        )}
      >
        {icon}
        {children}
      </span>
    </Link>
  );
}
