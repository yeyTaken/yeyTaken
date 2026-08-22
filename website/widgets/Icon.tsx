"use client";

import { clsx } from "clsx";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type IconBaseProps = {
  variant?: "website" | "dashboard";
  isOpen?: false;
  animation?: "expand" | "typing";
};

type IconOpenProps = {
  variant?: "website" | "dashboard";
  isOpen: true;
  animation?: never;
};

type IconProps = IconBaseProps | IconOpenProps;

export function Icon({
  variant = "website",
  animation,
  isOpen = false,
}: IconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isActive = isHovered || isOpen;
  const title = (
    <>
      <span>Rabbi</span>
      <span className="text-primary"> Dev</span>
    </>
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const href = variant === "dashboard" ? "/dashboard" : "/";
  const effectiveAnimation = isOpen ? undefined : animation;

  function renderText() {
    if (isOpen) {
      return (
        <span className={clsx("ml-2", "text-2xl font-black leading-none tracking-[-0.04em]")}>
          <span>Rabbi</span>
          <span className="text-primary"> Dev</span>
        </span>
      );
    }

    switch (effectiveAnimation) {
      case "expand":
        if (!mounted) {
          return (
            <span
              className={clsx(
                "ml-2 overflow-hidden whitespace-nowrap",
                "text-2xl font-black leading-none tracking-[-0.04em]",
              )}
            >
              {title}
            </span>
          );
        }

        return (
          <motion.span
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={clsx(
              "ml-2 overflow-hidden whitespace-nowrap",
              "text-2xl font-black leading-none tracking-[-0.04em]",
            )}
          >
            <span>Rabbi</span>
            <span className="text-primary"> Dev</span>
          </motion.span>
        );

      case "typing":
        if (!mounted) {
          return (
            <span
              className={clsx(
                "ml-2 overflow-hidden whitespace-nowrap",
                "text-2xl font-black leading-none tracking-[-0.04em]",
              )}
            >
              {title}
            </span>
          );
        }

        return (
          <motion.span
            className={clsx(
              "ml-2 overflow-hidden whitespace-nowrap",
              "text-2xl font-black leading-none tracking-[-0.04em]",
            )}
            animate={{
              width: isActive ? "auto" : 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {"Rabbi Dev".split("").map((char, index) => (
              <motion.span
                key={index}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 4,
                }}
                transition={{
                  delay: isActive ? index * 0.04 : 0,
                  duration: 0.15,
                }}
                className={clsx(
                  "inline-block",
                  char === " " && "w-2",
                  index >= 6 && "text-primary",
                )}
              >
                {char === " " ? null : char}
              </motion.span>
            ))}
          </motion.span>
        );

      default:
        return (
          <span className={clsx("ml-2", "text-2xl font-black leading-none tracking-[-0.04em]")}>
            <span>Rabbi</span>
            <span className="text-primary"> Dev</span>
          </span>
        );
    }
  }

  return (
    <Link
      href={href}
      className={clsx(
        "flex shrink-0 items-center",
        "transition-opacity hover:opacity-80",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {mounted ? (
        <motion.div
          animate={
            isActive
              ? {
                  rotate: [-3, 3, -2, 2, 0],
                }
              : {
                  rotate: 0,
                }
          }
          transition={{
            duration: 0.4,
          }}
        >
          <Image
            src="/favicon.ico"
            alt="Rabbi Dev"
            width={28}
            height={28}
            priority
            className="size-7 rounded-md"
          />
        </motion.div>
      ) : (
        <div>
          <Image
            src="/favicon.ico"
            alt="Rabbi Dev"
            width={28}
            height={28}
            priority
            className="size-7 rounded-md"
          />
        </div>
      )}

      {renderText()}
    </Link>
  );
}
