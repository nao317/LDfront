import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { Badge } from "../atoms/Badge";
import styles from "../ui.module.css";

export type ReferenceDocument = {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  amount: string;
  status: "見積書" | "施工記録";
};

export function ResultItem({ document }: { document: ReferenceDocument }) {
  return (
    <article className={styles.resultItem}>
      <div className={styles.fileIcon} aria-hidden="true">
        <FileText size={19} strokeWidth={1.7} />
      </div>
      <div className={styles.resultBody}>
        <div className={styles.resultHeading}>
          <h3>{document.title}</h3>
          <Badge tone={document.status === "見積書" ? "green" : "warm"}>
            {document.status}
          </Badge>
        </div>
        <p>{document.content}</p>
        <div className={styles.resultMeta}>
          <span>{document.category}</span>
          <span>{document.date}</span>
          <strong>{document.amount}</strong>
        </div>
      </div>
      <Link
        className={styles.iconButton}
        href="/documents"
        aria-label={`${document.title}を開く`}
        title={`${document.title}を開く`}
      >
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}
