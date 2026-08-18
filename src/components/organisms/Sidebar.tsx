import { House } from "lucide-react";
import { NavItem } from "../molecules/NavItem";
import styles from "../ui.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true">
          <House size={19} strokeWidth={1.8} />
        </span>
        <span>
          <strong>Living Design</strong>
          <small>Estimate desk</small>
        </span>
      </div>

      <nav className={styles.navigation} aria-label="メインナビゲーション">
        <p className={styles.navLabel}>ワークスペース</p>
        <NavItem href="/" icon="search" label="見積もり検索" />
        <NavItem href="/documents" icon="files" label="参照資料" />
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.serviceStatus}>
          <span aria-hidden="true" />
          <div>
            <strong>検索サービス</strong>
            <small>稼働中</small>
          </div>
        </div>
      </div>
    </aside>
  );
}
