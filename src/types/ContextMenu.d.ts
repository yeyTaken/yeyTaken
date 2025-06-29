import React from "react";

export interface MenuItem {
  name?: string;
  icon?: React.ReactNode;
  href?: string;
  type?: "divider";
  children?: MenuItem[];
}

export interface Position {
  x: number;
  y: number;
}

export interface ContextMenuState {
  visible: boolean;
  position: Position;
  hoveredItem: string | null;
}
