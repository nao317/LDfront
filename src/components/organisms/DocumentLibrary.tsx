"use client";

import { FilePlus2, FileText, Search, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { SearchInput } from "../molecules/SearchInput";
import styles from "../ui.module.css";

const initialLibrary = [
  { name: "K様邸_キッチン改修_見積書.pdf", type: "見積書", category: "キッチン", updated: "2026.08.12" },
  { name: "M様邸_水回り工事_施工記録.pdf", type: "施工記録", category: "水回り", updated: "2026.08.08" },
  { name: "T様邸_LDK改修_見積書.pdf", type: "見積書", category: "内装", updated: "2026.07.25" },
  { name: "標準単価表_2026年度.xlsx", type: "単価表", category: "共通", updated: "2026.07.01" },
];

export function DocumentLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("すべて");
  const [library, setLibrary] = useState(initialLibrary);
  const [adding, setAdding] = useState(false);
  const filtered = useMemo(
    () => library.filter((item) => {
      const matchesQuery = `${item.name}${item.type}${item.category}`.includes(query);
      return matchesQuery && (category === "すべて" || item.category === category);
    }),
    [category, library, query],
  );

  function addDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const newCategory = String(form.get("category") || "共通");
    if (!name) return;

    setLibrary((items) => [
      { name, type: "施工記録", category: newCategory, updated: "2026.08.18" },
      ...items,
    ]);
    setAdding(false);
  }

  return (
    <section className={styles.libraryPanel} aria-labelledby="library-title">
      <div className={styles.libraryToolbar}>
        <SearchInput
          aria-label="資料名を検索"
          placeholder="資料名を検索"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
        />
        <label className={styles.selectField}>
          <span className={styles.visuallyHidden}>分類で絞り込み</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>すべて</option>
            <option>キッチン</option>
            <option>水回り</option>
            <option>内装</option>
            <option>共通</option>
          </select>
        </label>
        <Button icon={<FilePlus2 size={18} aria-hidden="true" />} onClick={() => setAdding(true)}>
          資料を追加
        </Button>
      </div>

      <div className={styles.documentTable}>
        <div className={styles.tableHeader} aria-hidden="true">
          <span>資料名</span>
          <span>分類</span>
          <span>更新日</span>
          <span>状態</span>
        </div>
        <div className={styles.tableBody} aria-live="polite">
          {filtered.map((item) => (
            <article className={styles.tableRow} key={item.name}>
              <div className={styles.documentName}>
                <span className={styles.fileIcon} aria-hidden="true"><FileText size={18} /></span>
                <strong>{item.name}</strong>
              </div>
              <span>{item.category}</span>
              <span>{item.updated}</span>
              <Badge tone="green">登録済み</Badge>
            </article>
          ))}
          {!filtered.length ? (
            <div className={styles.emptyState}>
              <Search size={22} aria-hidden="true" />
              <p>該当する資料がありません</p>
            </div>
          ) : null}
        </div>
      </div>

      {adding ? (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setAdding(false)}>
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-document-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.eyebrow}>NEW DOCUMENT</p>
                <h2 id="add-document-title">参照資料を追加</h2>
              </div>
              <button type="button" className={styles.iconButton} aria-label="閉じる" onClick={() => setAdding(false)}>
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <form className={styles.documentForm} onSubmit={addDocument}>
              <label>
                <span>資料名</span>
                <input name="name" placeholder="例：A様邸_改修工事_施工記録.pdf" autoFocus required />
              </label>
              <label>
                <span>分類</span>
                <select name="category" defaultValue="キッチン">
                  <option>キッチン</option>
                  <option>水回り</option>
                  <option>内装</option>
                  <option>共通</option>
                </select>
              </label>
              <div className={styles.modalActions}>
                <Button type="button" variant="secondary" onClick={() => setAdding(false)}>キャンセル</Button>
                <Button type="submit">登録</Button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </section>
  );
}
