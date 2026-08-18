import { Avatar } from "../atoms/Avatar";
import styles from "../ui.module.css";

export function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <span className={styles.workspaceName}>リビングデザイン 営業部</span>
      <div className={styles.headerActions}>
        <span className={styles.userName}>山田</span>
        <Avatar name="山田" />
      </div>
    </header>
  );
}
