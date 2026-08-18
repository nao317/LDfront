import { Search, X } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { IconButton } from "../atoms/IconButton";
import styles from "../ui.module.css";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onClear?: () => void;
};

export function SearchInput({ onClear, value, ...props }: SearchInputProps) {
  return (
    <div className={styles.searchInput}>
      <Search size={19} strokeWidth={1.8} aria-hidden="true" />
      <input value={value} {...props} />
      {value ? (
        <IconButton label="入力をクリア" type="button" onClick={onClear}>
          <X size={17} aria-hidden="true" />
        </IconButton>
      ) : null}
    </div>
  );
}
