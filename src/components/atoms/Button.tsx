import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "../ui.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
};

export function Button({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
