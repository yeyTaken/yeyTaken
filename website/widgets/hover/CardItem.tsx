"use client";

import { clsx } from "clsx";
import Link from "next/link";

type HoverCardItemProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

export function HoverCardItem({
  title,
  description,
  href,
  icon: Icon,
}: HoverCardItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group flex items-center gap-4 rounded-2xl border border-transparent p-4",
        "transition-all duration-200 hover:border-primary/30 hover:bg-primary/20",
      )}
    >
      <div
        className={clsx(
          "flex size-10 shrink-0 items-center justify-center rounded-xl bg-default-100",
          "transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary",
        )}
      >
        <Icon className="size-5" />
      </div>

      <div className="min-w-0">
        <p className={clsx("font-medium transition-colors", "group-hover:text-primary")}>
          {title}
        </p>

        <p className={clsx("text-sm text-default-500", "transition-colors group-hover:text-primary")}>
          {description}
        </p>
      </div>
    </Link>
  );
}
