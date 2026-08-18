import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "../ui.module.css";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({ label, children, ...props }: IconButtonProps) {
  return (
    <button className={styles.iconButton} aria-label={label} title={label} {...props}>
      {children}
    </button>
  );
}
