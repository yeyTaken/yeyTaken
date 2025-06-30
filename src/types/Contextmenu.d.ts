import React from "react";

interface MenuItem {
  name?: string;
  icon?: React.ReactNode;
  href?: string;
  type?: "divider";
  children?: MenuItem[];
}

interface Position {
  x: number;
  y: number;
}

interface ContextMenuState {
  visible: boolean;
  position: Position;
  hoveredItem: string | null;
}
