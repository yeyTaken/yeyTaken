"use client";

import { clsx } from "clsx";
import { MdMenuBook } from "react-icons/md";

import { HoverCardHero } from "@/widgets/hover/CardHero";
import { HoverCardItem } from "@/widgets/hover/CardItem";
import { HoverCardSection } from "@/widgets/hover/CardSection";
import { HoverCard } from "@/widgets/hover/Card";
import { documentationLinks } from "../navigation-data";

export function HoverCardDocs() {
  return (
    <HoverCard className={clsx("grid grid-cols-[240px_1fr] gap-10")}>
      <HoverCardHero icon={MdMenuBook} />

      <HoverCardSection title="Documentação">
        {documentationLinks.map((reward) => (
          <HoverCardItem
            key={reward.title}
            title={reward.title}
            description={reward.description}
            href={reward.href}
            icon={reward.icon}
          />
        ))}
      </HoverCardSection>
    </HoverCard>
  );
}
