"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import LocaleSwitcher from "./switcher/locale";
import ThemeSwitcher from "./switcher/theme";
import { motion } from "framer-motion";

export default function AppNavbar() {
  return (
    <Navbar 
      maxWidth="xl" 
      className="bg-background/60 backdrop-blur-md border-b border-divider fixed top-0"
      isBordered
    >
      <NavbarBrand>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-inherit text-xl"
        >
          IRJ
        </motion.p>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
            Sobre
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#projetos" className="text-sm font-medium hover:text-primary transition-colors">
            Projetos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
            Contato
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex gap-2">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
