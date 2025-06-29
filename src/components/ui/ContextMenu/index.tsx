"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiSettings, FiChevronRight } from "react-icons/fi";

import type { MenuItem, Position } from "@/types/ContextMenu";

export default function ContextMenu() {
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
        { name: "Tema", icon: <FiSettings size={16} />, href: "/configuracoes/tema" },
        { name: "Perfil", icon: <FiUser size={16} />, href: "/configuracoes/perfil" },
        { name: "Segurança", icon: <FiMail size={16} />, href: "/configuracoes/seguranca" },
      ],
    },
  ];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      const x = e.pageX;
      const y = e.pageY;
      setPosition({ x, y });
      setVisible(true);
      setFixedOpenItem(null);

      setTimeout(() => {
        if (menuRef.current) {
          const menuRect = menuRef.current.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;

          setOpenToLeft(x + menuRect.width > windowWidth);

          if (y + menuRect.height > windowHeight) {
            setPosition(pos => ({
              ...pos,
              y: Math.max(windowHeight - menuRect.height - 10, 10)
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
      const submenuRect = submenuRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      setSubmenuOpenToLeft(submenuRect.right > windowWidth);

      if (submenuRect.bottom > windowHeight) {
        submenuRef.current.style.top = `auto`;
        submenuRef.current.style.bottom = `0`;
      } else {
        submenuRef.current.style.top = `0`;
        submenuRef.current.style.bottom = `auto`;
      }
    }
  }, [hoveredItem, fixedOpenItem]);

  const menuStyle = {
    top: position.y,
    left: openToLeft ? Math.max(position.x - (menuRef.current?.offsetWidth ?? 180), 0) : position.x,
    border: "1px solid var(--border-line)",
  };

  return (
    <>
      {visible && (
        <div
          ref={menuRef}
          className="fixed z-[99999] bg-[#101010] p-3 rounded-xl shadow-lg min-w-[180px] border"
          style={menuStyle}
        >
          <ul className="flex flex-col space-y-1 relative">
            {Items.map((item, idx) => {
              if (item.type === "divider") {
                return (
                  <li key={idx} className="border-t" style={{ borderColor: "var(--border-line)" }}></li>
                );
              }

              if (item.children) {
                const isOpen = fixedOpenItem === item.name || hoveredItem === item.name;

                return (
                  <li
                    key={idx}
                    onMouseEnter={() => {
                      if (!fixedOpenItem) setHoveredItem(item.name ?? null);
                    }}
                    onMouseLeave={() => {
                      if (!fixedOpenItem) setHoveredItem(null);
                    }}
                    className="relative"
                  >
                    <div
                      onClick={() => {
                        if (fixedOpenItem === item.name) {
                          setFixedOpenItem(null);
                          setHoveredItem(null);
                        } else {
                          setFixedOpenItem(item.name ?? null);
                        }
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2a2a2a]/50 transition-colors duration-150 select-none"
                    >
                      {item.icon}
                      <span className="flex-1">{item.name}</span>
                      <FiChevronRight size={18} className="ml-auto" />
                    </div>

                    {isOpen && (
                      <ul
                        ref={submenuRef}
                        className={`absolute ${submenuOpenToLeft ? "right-full -mr-1" : "left-full ml-1"} w-[180px] backdrop-blur-md bg-[#101010] rounded-xl shadow-lg border flex flex-col space-y-1 p-3`}
                        style={{ borderColor: "var(--border-line)", top: "0" }}
                      >
                        {item.children.map((child, cidx) => (
                          <li key={cidx}>
                            <Link
                              href={child.href ?? "#"}
                              className="flex items-center gap-3 cursor-pointer hover:bg-[#2a2a2a]/50 px-3 py-2 rounded-lg transition-colors duration-150"
                              onClick={() => {
                                setVisible(false);
                                setFixedOpenItem(null);
                                setHoveredItem(null);
                              }}
                            >
                              {child.icon}
                              {child.name}
                            </Link>
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
                    className="flex items-center gap-3 cursor-pointer hover:bg-[#2a2a2a]/50 px-3 py-2 rounded-lg transition-colors duration-150"
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
