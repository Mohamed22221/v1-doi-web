import type React from "react";

// ---- Stat Card ----
export interface StatCardData {
  id: string;
  title: string;
  value: string;
  subtitle?: React.ReactNode;
  badge?: string;
  badgePositive?: boolean;
  icon: React.ReactNode;
}

// ---- Action Button ----
export interface ActionButtonData {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}
