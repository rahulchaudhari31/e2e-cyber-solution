import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CodeXml,
  Palette,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { usePageReady } from "../../hooks/usePageReady";
import styles from "./ProjectHub.module.css";

const steps = [
  { label: "Discover", icon: Target, note: "Find the real problem." },
  { label: "Design", icon: Palette, note: "Shape the experience." },
  { label: "Build", icon: CodeXml, note: "Ship it properly." },
  { label: "Grow", icon: TrendingUp, note: "Keep improving." },
];

export default function ProjectHub({ className = "" }) {
  const ready = usePageReady();
  const reduced = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!ready || reduced) return undefined;

    const timer = window.setInterval(() => {
      setCycle((value) => (value + 1) % steps.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [ready, reduced]);

  const active = steps[cycle];
  const ActiveIcon = active.icon;

  return (
    <motion.div
      className={`${styles.hub} ${className}`.trim()}
      initial={reduced || !ready ? false : { opacity: 0, y: 26, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 17 }}
    >
      <div className={styles.head}>
        <span className={styles.kicker}>Project pathway</span>
        <button
          type="button"
          className={styles.replay}
          onClick={() => setCycle(0)}
          aria-label="Replay project pathway"
        >
          <RotateCcw size={13} strokeWidth={2} />
        </button>
      </div>

      <div className={styles.steps}>
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const state = index === cycle ? "active" : index < cycle ? "done" : "idle";

          return (
            <motion.div
              key={step.label}
              className={`${styles.step} ${styles[state]}`}
              animate={reduced ? undefined : { y: index === cycle ? -3 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <span className={styles.node}>
                <StepIcon size={15} strokeWidth={1.9} />
              </span>
              <span className={styles.stepText}>
                <small>0{index + 1}</small>
                <strong>{step.label}</strong>
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className={styles.track} aria-hidden="true">
        <motion.span
          animate={{ width: `${((cycle + 1) / steps.length) * 100}%` }}
          transition={{ duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={cycle}
          className={styles.status}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          <span className={styles.statusIcon}>
            <ActiveIcon size={14} strokeWidth={2} />
          </span>
          <span>{active.note}</span>
          <Sparkles className={styles.statusSpark} size={13} strokeWidth={1.8} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
