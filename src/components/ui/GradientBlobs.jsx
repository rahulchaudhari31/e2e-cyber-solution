import styles from "./GradientBlobs.module.css";

export default function GradientBlobs({ className = "" }) {
  return (
    <div className={`${styles.blobs} ${className}`} aria-hidden="true">
      <span className={styles.blue} />
      <span className={styles.yellow} />
      <span className={styles.teal} />
    </div>
  );
}
