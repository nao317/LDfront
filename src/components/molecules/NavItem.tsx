"use client";

import { Files, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../ui.module.css";

type NavItemProps = {
  href: string;
  icon: "search" | "files";
  label: string;
};

const icons = {
  search: Search,
  files: Files,
};

export function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === href : pathname.startsWith(href);
  const Icon = icons[icon];

  return (
    <Link
      className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
      href={href}
      aria-current={active ? "page" : undefined}
    >
      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
