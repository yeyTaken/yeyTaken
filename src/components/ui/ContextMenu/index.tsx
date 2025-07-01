"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiSettings, FiChevronRight } from "react-icons/fi";
import { useTheme } from "next-themes";

import { MenuItem, Position } from "@/types/Contextmenu";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

export default function ContextMenu() {
  const { theme, setTheme } = useTheme();

  // const [showContextMenu, setShowContextMenu] = useState(false);

  // useEffect(() => {
  //   const isMobile = /iPhone|Android/i.test(navigator.userAgent);
  //   if (!isMobile) {
  //     setShowContextMenu(true);
  //   }
  // }, []);

  // if (!showContextMenu) return null;

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [openToLeft, setOpenToLeft] = useState(false);
  const [submenuOpenToLeft, setSubmenuOpenToLeft] = useState(false);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [fixedOpenItem, setFixedOpenItem] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLUListElement>(null);

  const Items: MenuItem[] = [
    { name: "Portfólio", icon: <FiUser size={18} />, href: "/portfolio" },
    { name: "Contato", icon: <FiMail size={18} />, href: "/contato" },
    { type: "divider" },
    {
      name: "Configurações",
      icon: <FiSettings size={18} />,
      children: [
        { name: "Tema" }, // agora sem icon fixo
        {
          name: "Perfil",
          icon: <FiUser size={16} />,
          href: "/configuracoes/perfil",
        },
        {
          name: "Segurança",
          icon: <FiMail size={16} />,
          href: "/configuracoes/seguranca",
        },
      ],
    },
  ];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.pageX, y: e.pageY });
      setVisible(true);
      setFixedOpenItem(null);

      setTimeout(() => {
        if (menuRef.current) {
          const rect = menuRef.current.getBoundingClientRect();
          setOpenToLeft(e.pageX + rect.width > window.innerWidth);

          if (e.pageY + rect.height > window.innerHeight) {
            setPosition((pos) => ({
              ...pos,
              y: Math.max(window.innerHeight - rect.height - 10, 10),
            }));
          }
        }
      }, 0);
    };

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
        setHoveredItem(null);
        setFixedOpenItem(null);
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if ((hoveredItem || fixedOpenItem) && submenuRef.current) {
      const rect = submenuRef.current.getBoundingClientRect();
      setSubmenuOpenToLeft(rect.right > window.innerWidth);

      if (rect.bottom > window.innerHeight) {
        submenuRef.current.style.top = "auto";
        submenuRef.current.style.bottom = "0";
      } else {
        submenuRef.current.style.top = "0";
        submenuRef.current.style.bottom = "auto";
      }
    }
  }, [hoveredItem, fixedOpenItem]);

  const menuStyle = {
    top: position.y,
    left: openToLeft
      ? Math.max(position.x - (menuRef.current?.offsetWidth ?? 180), 0)
      : position.x,
  };

  return (
    <>
      {visible && (
        <div
          ref={menuRef}
          className="select-none fixed z-[99999] bg-background/80 p-3 rounded-xl shadow-lg min-w-[180px] border border-neutral-300 dark:border-neutral-700"
          style={menuStyle}
        >
          <ul className="flex flex-col space-y-1 relative">
            {Items.map((item, idx) => {
              if (item.type === "divider") {
                return (
                  <li
                    key={idx}
                    className="border-t border-neutral-300 dark:border-neutral-700"
                  ></li>
                );
              }

              if (item.children) {
                const isOpen =
                  fixedOpenItem === item.name || hoveredItem === item.name;

                return (
                  <li
                    key={idx}
                    onMouseEnter={() =>
                      !fixedOpenItem && setHoveredItem(item.name ?? null)
                    }
                    onMouseLeave={() => !fixedOpenItem && setHoveredItem(null)}
                    className="relative"
                  >
                    <div
                      onClick={() =>
                        setFixedOpenItem(
                          fixedOpenItem === item.name ? null : item.name!
                        )
                      }
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#2a2a2a]/50 transition-colors duration-150 select-none"
                    >
                      {item.icon}
                      <span className="flex-1">{item.name}</span>
                      <FiChevronRight size={18} className="ml-auto" />
                    </div>

                    {isOpen && (
                      <ul
                        ref={submenuRef}
                        className={`absolute ${submenuOpenToLeft ? "right-full -mr-1" : "left-full ml-1"} 
                          w-[180px] bg-background/80 rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 flex flex-col space-y-1 p-3`}
                        style={{ top: "0" }}
                      >
                        {item.children.map((child, cidx) => (
                          <li key={cidx}>
                            {child.name === "Tema" ? (
                              <button
                                className="flex items-center w-full gap-3 cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#2a2a2a]/50 px-3 py-2 rounded-lg transition-colors duration-150"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTheme(
                                    theme === "light" ? "dark" : "light"
                                  );
                                }}
                              >
                                {theme === "light" ? (
                                  <RiSunLine size={18} />
                                ) : (
                                  <RiMoonLine size={18} />
                                )}
                                {child.name}
                              </button>
                            ) : (
                              <Link
                                href={child.href ?? "#"}
                                className="flex items-center gap-3 cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#2a2a2a]/50 px-3 py-2 rounded-lg transition-colors duration-150"
                                onClick={() => {
                                  setVisible(false);
                                  setFixedOpenItem(null);
                                  setHoveredItem(null);
                                }}
                              >
                                {child.icon}
                                {child.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={idx}>
                  <Link
                    href={item.href as string}
                    className="flex items-center gap-3 cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#2a2a2a]/50 px-3 py-2 rounded-lg transition-colors duration-150"
                    onClick={() => {
                      setVisible(false);
                      setFixedOpenItem(null);
                      setHoveredItem(null);
                    }}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
