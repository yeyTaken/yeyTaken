"use client";

import { useTheme } from "next-themes";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Skeleton
} from "@heroui/react";

import { motion, AnimatePresence } from "framer-motion";

import { FiSun, FiMoon } from "react-icons/fi";
import { LuMonitor } from "react-icons/lu";

import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 🔹 Skeleton enquanto carrega
  if (!mounted) {
    return (
      <Skeleton
        isLoaded={false}
        className="rounded-full w-10 h-10 bg-foreground/10 dark:bg-foreground/20"
      />
    );
  }

  const isDark = theme === "dark";
  const isSystem = theme === "system";

  const iconVariants = {
    initial: { rotate: -90, opacity: 0, scale: 0.8 },
    animate: { rotate: 0, opacity: 1, scale: 1 },
    exit: { rotate: 90, opacity: 0, scale: 0.8 },
    transition: { stiffness: 250, damping: 15 },
  };

  const renderIcon = () => {
    if (isSystem) return <LuMonitor size={20} />;
    return isDark ? <FiSun size={20} /> : <FiMoon size={20} />;
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          radius="full"
          variant="light"
          className="min-w-0 h-auto p-2 hover:bg-foreground/10 transition rounded-full"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={iconVariants.initial}
              animate={iconVariants.animate}
              exit={iconVariants.exit}
              transition={iconVariants.transition}
            >
              {renderIcon()}
            </motion.span>
          </AnimatePresence>
        </Button>
      </DropdownTrigger>

      <DropdownMenu onAction={(key) => setTheme(String(key))}>
        <DropdownItem key="light" startContent={<FiSun />}>
          Claro
        </DropdownItem>

        <DropdownItem key="dark" startContent={<FiMoon />}>
          Escuro
        </DropdownItem>

        <DropdownItem key="system" startContent={<LuMonitor />}>
          Sistema
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
