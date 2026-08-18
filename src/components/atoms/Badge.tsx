import type { ReactNode } from "react";
import styles from "../ui.module.css";

type BadgeProps = {
  children: ReactNode;
  tone?: "green" | "warm" | "neutral";
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[`badge-${tone}`]}`}>{children}</span>;
}
