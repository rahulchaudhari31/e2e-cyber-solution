import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./PageTransition.module.css";

const ease = [0.16, 1, 0.3, 1];

export default function PageTransition({ children }) {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className={styles.page}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: reduced ? 0 : 0.46, ease }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
