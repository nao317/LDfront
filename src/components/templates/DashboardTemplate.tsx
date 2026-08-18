import type { ReactNode } from "react";
import { AppHeader } from "../organisms/AppHeader";
import { Sidebar } from "../organisms/Sidebar";
import styles from "../ui.module.css";

type DashboardTemplateProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function DashboardTemplate({ children, title, description }: DashboardTemplateProps) {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <div className={styles.appBody}>
        <AppHeader />
        <main className={styles.pageContent}>
          <header className={styles.pageHeading}>
            <div>
              <p className={styles.eyebrow}>ESTIMATE ASSISTANT</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <div className={styles.pageDate}>
              <span>最終更新</span>
              <strong>2026.08.18</strong>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
