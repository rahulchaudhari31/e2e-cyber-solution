import { assets } from "../../data/content";
import styles from "./RouteFallback.module.css";

export default function RouteFallback() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <img src={assets.logo} alt="" width="142" height="42" />
      <span className={styles.bar} aria-hidden="true">
        <span />
      </span>
      <span className="sr-only">Loading page</span>
    </div>
  );
}
