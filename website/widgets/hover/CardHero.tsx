"use client";

import { clsx } from "clsx";
import Image from "next/image";
import type { IconType } from "react-icons";

interface HoverCardHeroProps {
  icon?: IconType;
  image?: string;
  alt?: string;
}

export function HoverCardHero({
  icon: Icon,
  image,
  alt = "Tile",
}: HoverCardHeroProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          "relative flex size-40 items-center justify-center overflow-hidden rounded-3xl",
          "border border-default-200 bg-linear-to-br from-default-50 to-default-100",
        )}
      >
        {Icon && (
          <Icon className={clsx("size-20", "text-primary opacity-80")} />
        )}

        {!Icon && image && (
          <Image src={image} alt={alt} fill priority className="object-cover" />
        )}
      </div>
    </div>
  );
}
