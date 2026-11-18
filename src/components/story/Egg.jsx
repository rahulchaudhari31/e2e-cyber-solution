import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import styles from "./Egg.module.css";

const shells = {
  brown: { base: "#d89558", light: "#f6c894", dark: "#a85f34" },
  white: { base: "#fffaf0", light: "#ffffff", dark: "#d9cdb8" },
  brand: { base: "#ffc93c", light: "#ffe89a", dark: "#ef9f0a" },
};

const shellStates = ["whole", "glow", "painted", "incubating", "cracked"];

export default function Egg({
  shell = "brown",
  state = "whole",
  size = 46,
  className = "",
}) {
  const reduced = useReducedMotion();
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const palette = shells[shell] || shells.brown;
  const mode = shellStates.includes(state) ? state : "whole";
  const duration = reduced ? 0 : 0.5;

  return (
    <motion.span
      className={`${styles.egg} ${className}`.trim()}
      style={{ width: size, height: size * 1.3 }}
      animate={
        reduced
          ? undefined
          : {
              scaleX: [1, 1.04, 0.98, 1],
              scaleY: [1, 0.97, 1.03, 1],
            }
      }
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 130" width="100%" height="100%" role="presentation">
        <defs>
          <linearGradient id={`${id}-shell`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="52%" stopColor={palette.base} />
            <stop offset="100%" stopColor={palette.dark} />
          </linearGradient>
          <radialGradient id={`${id}-candle`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.95" />
            <stop offset="55%" stopColor="var(--yellow)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--yellow)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="50" cy="125" rx="31" ry="5" fill="rgba(11,27,58,.16)" />

        <AnimatePresence>
          {mode === "glow" ? (
            <motion.ellipse
              key="candle-glow"
              cx="50"
              cy="69"
              rx="48"
              ry="58"
              fill={`url(#${id}-candle)`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.96, 1.04, 0.96] }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: reduced ? 0 : 1.8, repeat: reduced ? 0 : Infinity }}
              style={{ originX: "50%", originY: "50%" }}
            />
          ) : null}
        </AnimatePresence>

        <path
          d="M50 6 C72 6 89 43 89 78 C89 108 72 124 50 124 C28 124 11 108 11 78 C11 43 28 6 50 6 Z"
          fill={`url(#${id}-shell)`}
          stroke={palette.dark}
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <path
          d="M30 40 C24 58 22 76 27 92"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <AnimatePresence>
          {mode === "painted" ? (
            <motion.g
              key="brand-paint"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration }}
              style={{ originX: "50%", originY: "50%" }}
            >
              <path
                d="M18 72 C34 61 61 61 82 72"
                fill="none"
                stroke="var(--blue)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M16 90 C34 80 63 80 84 90"
                fill="none"
                stroke="var(--meadow)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <circle cx="50" cy="42" r="6" fill="var(--clay)" />
              <circle cx="35" cy="52" r="3.5" fill="var(--blue)" />
              <circle cx="66" cy="52" r="3.5" fill="var(--blue)" />
            </motion.g>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {mode === "incubating" ? (
            <motion.g
              key="incubating-ring"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              <circle
                cx="50"
                cy="68"
                r="45"
                fill="none"
                stroke="rgba(11,27,58,.12)"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="68"
                r="45"
                fill="none"
                stroke="var(--yellow)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: reduced ? 0 : [283, 110, 283] }}
                transition={{ duration: reduced ? 0 : 2.4, repeat: reduced ? 0 : Infinity }}
                transform="rotate(-90 50 68)"
              />
            </motion.g>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {mode === "cracked" ? (
            <motion.g
              key="crack"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration }}
              style={{ originX: "50%", originY: "50%" }}
            >
              <path
                d="M22 62 L36 54 L31 68 L46 61 L42 76 L57 66 L53 82 L68 72 L63 88 L78 82"
                fill="none"
                stroke={palette.dark}
                strokeWidth="3.4"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="48" r="13" fill="var(--yellow-2)" />
              <path d="M50 48 L63 51 L50 55 Z" fill="var(--clay)" />
              <circle cx="46" cy="45" r="1.8" fill="var(--navy)" />
              <circle cx="55" cy="45" r="1.8" fill="var(--navy)" />
            </motion.g>
          ) : null}
        </AnimatePresence>
      </svg>
    </motion.span>
  );
}

export function Chick({ size = 46, className = "", crow = false, delay = 0 }) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={`${styles.chick} ${className}`.trim()}
      style={{ width: size, height: size }}
      initial={reduced ? false : { opacity: 0, scale: 0.4, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: reduced ? 0 : delay }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" width="100%" height="100%" role="presentation">
        <ellipse cx="40" cy="69" rx="24" ry="5" fill="rgba(11,27,58,.14)" />
        <circle cx="40" cy="43" r="25" fill="var(--yellow)" />
        <circle cx="40" cy="43" r="25" fill="none" stroke="var(--yellow-2)" strokeWidth="3" />
        <path d="M35 20 Q40 10 45 20" fill="none" stroke="var(--yellow)" strokeWidth="5" strokeLinecap="round" />
        <motion.path
          d="M60 43 L74 47 L60 52 Z"
          fill="var(--clay)"
          animate={reduced || !crow ? undefined : { scaleX: [1, 1.18, 1] }}
          transition={{ duration: 0.5, repeat: reduced ? 0 : Infinity, repeatDelay: 1.4 }}
          style={{ originX: "0%" }}
        />
        <circle cx="31" cy="38" r="3" fill="var(--navy)" />
        <circle cx="49" cy="38" r="3" fill="var(--navy)" />
        <path d="M27 54 Q34 60 41 54" fill="none" stroke="var(--navy)" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="22" cy="50" rx="5" ry="3" fill="var(--clay)" fillOpacity="0.35" />
        <ellipse cx="58" cy="50" rx="5" ry="3" fill="var(--clay)" fillOpacity="0.35" />
      </svg>
    </motion.span>
  );
}

export function Flock({ className = "" }) {
  const reduced = useReducedMotion();

  return (
    <span className={`${styles.flock} ${className}`.trim()} aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 17,
            delay: reduced ? 0 : 0.12 * index,
          }}
        >
          <Chick size={30 + index * 3} />
        </motion.span>
      ))}
    </span>
  );
}
