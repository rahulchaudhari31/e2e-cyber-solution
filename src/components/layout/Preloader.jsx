import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { assets } from "../../data/content";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    if (reduced) return undefined;

    const exit = window.setTimeout(() => setPhase("exiting"), 1050);
    const done = window.setTimeout(() => setPhase("done"), 1650);

    return () => {
      window.clearTimeout(exit);
      window.clearTimeout(done);
    };
  }, [reduced]);

  if (reduced || phase === "done") return null;

  return (
    <div
      className={`${styles.preloader} ${phase === "exiting" ? styles.exiting : ""}`}
      role="status"
      aria-label="Loading e2e Cyber Solutions"
      aria-live="polite"
    >
      <div className={styles.inner}>
        <img
          src={assets.logo}
          alt=""
          width="190"
          height="55"
          className={styles.logo}
        />
        <div className={styles.track} aria-hidden="true">
          <span />
        </div>
        <p>Design. Build. Grow.</p>
      </div>
    </div>
  );
}
