"use client";

import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "../atoms/Button";
import { ResultItem, type ReferenceDocument } from "../molecules/ResultItem";
import { SearchInput } from "../molecules/SearchInput";
import styles from "../ui.module.css";

const documents: ReferenceDocument[] = [
  {
    id: 1,
    title: "世田谷区 K様邸 キッチン改修",
    content: "対面キッチン交換、カップボード新設、床・クロス張替えを含む改修工事。",
    category: "キッチン",
    date: "2025.11",
    amount: "328万円",
    status: "見積書",
  },
  {
    id: 2,
    title: "杉並区 M様邸 水回りリフォーム",
    content: "キッチン設備交換と造作収納の施工記録。配管移設を伴う類似事例。",
    category: "水回り",
    date: "2025.08",
    amount: "412万円",
    status: "施工記録",
  },
  {
    id: 3,
    title: "練馬区 T様邸 LDK改修",
    content: "壁付けキッチンから対面型へ変更。間仕切り撤去、内装更新を実施。",
    category: "LDK",
    date: "2024.12",
    amount: "365万円",
    status: "見積書",
  },
];

const suggestions = ["対面キッチン", "マンション 水回り", "LDK 内装"];

export function SearchWorkspace() {
  const [query, setQuery] = useState("キッチン リフォーム");
  const [submittedQuery, setSubmittedQuery] = useState(query);
  const [applied, setApplied] = useState(false);

  const results = useMemo(() => {
    const terms = submittedQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return documents;

    return documents.filter((document) => {
      const target = `${document.title} ${document.content} ${document.category}`.toLowerCase();
      return terms.some((term) => target.includes(term));
    });
  }, [submittedQuery]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    setApplied(false);
  }

  function selectSuggestion(suggestion: string) {
    setQuery(suggestion);
    setSubmittedQuery(suggestion);
    setApplied(false);
  }

  return (
    <div className={styles.searchWorkspace}>
      <section className={styles.searchPanel} aria-labelledby="search-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>REFERENCE SEARCH</p>
            <h2 id="search-title">工事条件を入力</h2>
          </div>
          <span className={styles.documentCount}>登録資料 128件</span>
        </div>

        <form className={styles.searchForm} onSubmit={submitSearch}>
          <SearchInput
            aria-label="施工資料を検索"
            placeholder="例：対面キッチン、80㎡、マンション"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
          />
          <Button type="submit" icon={<Search size={18} aria-hidden="true" />}>
            検索
          </Button>
        </form>

        <div className={styles.suggestions} aria-label="検索候補">
          <span>よく使う条件</span>
          {suggestions.map((suggestion) => (
            <button type="button" key={suggestion} onClick={() => selectSuggestion(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      </section>

      <div className={styles.workspaceGrid}>
        <section className={styles.resultsPanel} aria-labelledby="results-title">
          <div className={styles.resultsHeader}>
            <div>
              <h2 id="results-title">検索結果</h2>
              <p>「{submittedQuery || "すべて"}」に近い資料</p>
            </div>
            <strong>{results.length}件</strong>
          </div>

          <div className={styles.resultList} aria-live="polite">
            {results.length ? (
              results.map((document) => <ResultItem key={document.id} document={document} />)
            ) : (
              <div className={styles.emptyState}>
                <Search size={22} aria-hidden="true" />
                <p>条件に一致する資料がありません</p>
                <button type="button" onClick={() => selectSuggestion("キッチン")}>
                  条件をリセット
                </button>
              </div>
            )}
          </div>
        </section>

        <aside className={styles.summaryPanel} aria-labelledby="summary-title">
          <div className={styles.summaryIcon} aria-hidden="true">
            <CheckCircle2 size={22} strokeWidth={1.8} />
          </div>
          <p className={styles.eyebrow}>SEARCH SUMMARY</p>
          <h2 id="summary-title">参考価格の目安</h2>
          <p className={styles.summaryAmount}>320〜410万円</p>
          <p className={styles.summaryText}>
            類似するキッチン改修3件では、設備交換と内装工事が主な費用項目です。
          </p>
          <dl className={styles.summaryFacts}>
            <div>
              <dt>平均工期</dt>
              <dd>18日</dd>
            </div>
            <div>
              <dt>参照件数</dt>
              <dd>{results.length}件</dd>
            </div>
          </dl>
          <Button
            variant="secondary"
            icon={applied ? <CheckCircle2 size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
            onClick={() => setApplied(true)}
            disabled={applied || !results.length}
          >
            {applied ? "反映済み" : "見積もりに反映"}
          </Button>
          <small>金額は過去事例に基づく参考値です</small>
        </aside>
      </div>
    </div>
  );
}
