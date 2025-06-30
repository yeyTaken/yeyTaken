"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="select-none flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-5xl font-bold mb-4 relative text-gray-700 dark:text-gray-400">
        404
      </h1>
      <p className="text-xl mb-2">
        Ops! A página
        <span
          className="rounded-md px-2 py-0.5 ml-1 inline-block bg-secondary/50 text-secondary border border-secondary"
        >
          {pathname}
        </span>{" "}
        não foi encontrada.
      </p>
    </div>
  );
}
