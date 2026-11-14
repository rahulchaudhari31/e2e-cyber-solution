import styles from "./Marquee.module.css";

export default function Marquee({ items, tone = "light", speed = 34 }) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className={`${styles.marquee} ${tone === "dark" ? styles.dark : ""}`}
      aria-hidden="true"
    >
      <div
        className={styles.track}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeated.map((item, index) => (
          <span className={styles.item} key={`${item}-${index}`}>
            <span className={styles.text}>{item}</span>
            <span className={styles.star}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
