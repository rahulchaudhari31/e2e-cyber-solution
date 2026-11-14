import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.25,
  });

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX: reduced ? scrollYProgress : smoothProgress }}
      aria-hidden="true"
    />
  );
}
