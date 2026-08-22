"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Props {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function NavDropdown({ label, icon, children }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [open, setOpen] = useState(false);

  function openMenu() {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function closeMenu() {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 120);
  }

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button className="flex items-center gap-1 text-sm font-medium">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <MdKeyboardArrowDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.15,
            }}
            className="absolute left-1/2 top-full mt-10 z-50"
            style={{ x: "-50%" }}
          >
            <div className="w-180 rounded-3xl border border-default-200 bg-background p-8 shadow-2xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
