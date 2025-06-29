import Link from "next/link";

import "./styles/app/page.css";
import { FiSend, FiChevronDown } from "react-icons/fi";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6 animate-fadeUp">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-foreground drop-shadow-md">
          Olá, eu sou <span className="text-accent">Israel Jatobá</span>
        </h1>

        <p className="text-xl text-foreground/90 max-w-xl mx-auto">
          Eu sou um iniciante no mundo da programação e faço projetos nas horas vagas.
        </p>
        <div className="select-none flex justify-center space-x-6 mt-6">
          <Link
            href="/portfolio"
            className="px-8 py-3 rounded-full bg-accent text-background cursor-pointer
                       hover:bg-accent/80 transition-colors duration-300 hover:shadow-lg"
          >
            Ver Portfólio
          </Link>
          <Link
            href="/contato"
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-border-line text-foreground cursor-pointer 
             hover:bg-secondary/30 transition-colors duration-300 hover:shadow-lg"
          >
            contato <FiSend size={18} className="relative top-[1px]" />
          </Link>
        </div>
      </div>
    </main>
  );
}
