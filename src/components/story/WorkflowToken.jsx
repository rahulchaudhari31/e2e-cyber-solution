import { AnimatePresence, motion } from "framer-motion";
import {
  ChartNoAxesCombined,
  CodeXml,
  Lightbulb,
  ListChecks,
  Palette,
  Rocket,
  Target,
  Waypoints,
} from "lucide-react";
import styles from "./WorkflowToken.module.css";

const tokens = {
  idea: { Icon: Lightbulb, label: "Idea" },
  strategy: { Icon: Waypoints, label: "Strategy" },
  scope: { Icon: ListChecks, label: "Scope" },
  discover: { Icon: Target, label: "Discover" },
  design: { Icon: Palette, label: "Design" },
  develop: { Icon: CodeXml, label: "Build" },
  grow: { Icon: ChartNoAxesCombined, label: "Grow" },
  proof: { Icon: ListChecks, label: "Proof" },
  launch: { Icon: Rocket, label: "Launch" },
};

export default function WorkflowToken({ stage, compact = false, reduced = false }) {
  const token = tokens[stage] || tokens.idea;
  const Icon = token.Icon;

  return (
    <span className={`${styles.token} ${compact ? styles.compact : ""}`.trim()}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={stage}
          className={styles.iconWrap}
          initial={reduced ? false : { opacity: 0, scale: 0.55, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.7, rotate: 12 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <Icon size={compact ? 15 : 18} strokeWidth={2} />
        </motion.span>
      </AnimatePresence>
      {compact ? null : <span className={styles.label}>{token.label}</span>}
    </span>
  );
}
