import { useReducedMotion } from "framer-motion";
import useScrollReveal from "../../hooks/useScrollReveal";
import styles from "./ImageReveal.module.css";

export default function ImageReveal({
  children,
  className = "",
  delay = 0,
  once = true,
  amount = 0.15,
}) {
  const reduced = useReducedMotion();
  const [ref, inView] = useScrollReveal({ once, amount });
  const visible = reduced || inView;

  return (
    <div ref={ref} className={`${styles.frame} ${className}`}>
      <div
        className={`${styles.reveal} ${visible ? styles.visible : ""}`}
        style={delay ? { transitionDelay: `${delay}s` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
