"use client";

import { clsx } from "clsx";

type HoverCardSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function HoverCardSection({ title, children }: HoverCardSectionProps) {
  return (
    <div>
      <span className={clsx("mb-5 block text-xs font-bold uppercase tracking-[0.25em]")}>
        {title}
      </span>

      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
