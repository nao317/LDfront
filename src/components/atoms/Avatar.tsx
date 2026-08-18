import styles from "../ui.module.css";

type AvatarProps = {
  name: string;
};

export function Avatar({ name }: AvatarProps) {
  return (
    <span className={styles.avatar} aria-label={name} title={name}>
      {name.slice(0, 1)}
    </span>
  );
}
