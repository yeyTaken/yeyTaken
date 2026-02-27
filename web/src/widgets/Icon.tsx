"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type IconProps = {
  className?: string;
  isOpen?: boolean;
};

export default function Icon({ className, isOpen = false }: IconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showText = isOpen || isHovered;

  return (
    <Link
      href="/"
      className={clsx("flex shrink-0 items-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/favicon.ico"
        alt="Logo RabbiDev"
        width={28}
        height={28}
        className="rounded-md"
      />

      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: showText ? "auto" : 0,
          opacity: showText ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden whitespace-nowrap ml-2 text-xl font-bold text-foreground tracking-tight"
      >
        Rabbi<span className="font-extrabold text-primary">Dev</span>
      </motion.span>
    </Link>
  );
}
