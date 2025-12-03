import Link from "next/link";

import ThemeSwitcher from "@/components/UI/switcher/theme";
import LocaleSwitcher from "@/components/UI/switcher/locale";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center gap-4 py-4 px-6 border-t border-foreground/20">
      <p className="text-sm text-foreground">
        © {new Date().getFullYear()} - <Link className="hover:underline" href={"https://github.com/yeytaken"}>Israel R. Jatobá</Link>
      </p>

      {/* Divisória */}
      <span className="h-5 w-px bg-foreground/30" />

      <ThemeSwitcher />

      {/* Divisória */}
      <span className="h-5 w-px bg-foreground/30" />

      <LocaleSwitcher />
    </footer>
  );
}
