import { motion, useReducedMotion } from "framer-motion";
import styles from "./HandNote.module.css";

export default function HandNote({
  text,
  className = "",
  tone = "yellow",
  rotate = -3,
  arrow = "down-right",
}) {
  const reduced = useReducedMotion();
  const arrowPath =
    arrow === "down-left"
      ? "M4 3 C12 3 16 8 16 16 L16 34"
      : arrow === "up-right"
        ? "M3 35 C11 34 14 28 14 20 L28 5"
        : "M3 4 C12 5 14 12 14 20 L28 34";
  const arrowClass =
    { "down-right": styles.downRight, "down-left": styles.downLeft, "up-right": styles.upRight }[arrow] ||
    styles.downRight;

  return (
    <span className={`${styles.note} ${styles[tone] || styles.yellow} ${className}`.trim()}>
      <motion.span
        className={styles.text}
        style={{ rotate }}
        initial={reduced ? false : { opacity: 0, y: 8, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
      >
        {text}
      </motion.span>
      <svg
        className={`${styles.arrow} ${arrowClass}`}
        viewBox="0 0 34 40"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d={arrowPath}
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.12 }}
        />
        <path d="M23 29 L29 35 L23 38" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
