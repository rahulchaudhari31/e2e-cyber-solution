import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import Egg from "./Egg";
import styles from "./Hen.module.css";
import { useStory } from "./storyShared";

export default function Hen({ className = "" }) {
  const { ready, compact } = useStory();
  const reduced = useReducedMotion();
  const pointerFine = useMediaQuery("(pointer: fine)");
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const [cycle, setCycle] = useState(0);
  const started = useRef(false);
  const pointX = useMotionValue(0);
  const pointY = useMotionValue(0);
  const headX = useSpring(useTransform(pointX, [-1, 1], [-5, 5]), { stiffness: 120, damping: 16 });
  const headY = useSpring(useTransform(pointY, [-1, 1], [-4, 4]), { stiffness: 120, damping: 16 });
  const eyeX = useSpring(useTransform(pointX, [-1, 1], [-1.6, 1.6]), { stiffness: 160, damping: 14 });
  const eyeY = useSpring(useTransform(pointY, [-1, 1], [-1.2, 1.2]), { stiffness: 160, damping: 14 });
  const wingTurn = useSpring(useTransform(pointY, [-1, 1], [-5, 5]), { stiffness: 140, damping: 15 });
  const tailTurn = useSpring(useTransform(pointX, [-1, 1], [-6, 6]), { stiffness: 110, damping: 17 });
  const parallax = !reduced && !compact && pointerFine;

  useEffect(() => {
    if (ready && !started.current) {
      started.current = true;
      setCycle((value) => value + 1);
    }
  }, [ready]);

  const replay = () => setCycle((value) => value + 1);

  const onPointerMove = (event) => {
    if (!parallax || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const onPointerLeave = () => {
    pointX.set(0);
    pointY.set(0);
  };

  return (
    <motion.button
      type="button"
      className={`${styles.hen} ${className}`.trim()}
      onClick={replay}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-label="Replay the hen animation"
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 20, delay: reduced ? 0 : 0.12 }}
      whileHover={reduced ? undefined : { scale: 1.015 }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
    >
      <svg viewBox="0 0 320 260" width="100%" height="100%" role="presentation" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--yellow-2)" />
            <stop offset="60%" stopColor="var(--yellow)" />
            <stop offset="100%" stopColor="#efab1c" />
          </linearGradient>
          <linearGradient id={`${id}-wing`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe699" />
            <stop offset="100%" stopColor="#f6b92e" />
          </linearGradient>
        </defs>

        <ellipse cx="168" cy="230" rx="96" ry="13" fill="rgba(11,27,58,.13)" />

        <g stroke="#e0953b" strokeWidth="7" strokeLinecap="round">
          <path d="M141 198 L134 226" />
          <path d="M141 226 L125 230" />
          <path d="M141 226 L151 232" />
          <path d="M196 198 L201 226" />
          <path d="M201 226 L187 232" />
          <path d="M201 226 L213 230" />
        </g>

        <motion.g
          style={{ originX: 0.78, originY: 0.7, x: tailTurn }}
          animate={reduced ? undefined : { rotate: [0, 5, 0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M98 128 C60 112 48 80 58 55 C79 69 96 82 112 102 Z" fill="var(--yellow)" stroke="#e6a52f" strokeWidth="3" />
          <path d="M91 139 C48 134 29 111 25 85 C52 87 76 99 101 117 Z" fill="var(--yellow-2)" stroke="#e6a52f" strokeWidth="3" />
          <path d="M96 151 C54 158 29 148 15 128 C43 120 72 125 104 137 Z" fill="var(--clay)" stroke="#d76343" strokeWidth="3" />
        </motion.g>

        <motion.path
          d="M91 129 C91 82 127 58 174 58 C226 58 267 93 267 143 C267 190 226 215 174 215 C124 215 91 184 91 129 Z"
          fill={`url(#${id}-body)`}
          stroke="#e2a02d"
          strokeWidth="3"
          style={{ originX: 0.5, originY: 0.9 }}
          animate={reduced ? undefined : { scaleY: [1, 1.025, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.g style={{ originX: 0.35, originY: 0.4, rotate: wingTurn }}>
          <path d="M113 139 C121 113 151 103 180 114 C193 136 181 169 151 180 C127 177 113 160 113 139 Z" fill={`url(#${id}-wing)`} stroke="#e2a02d" strokeWidth="3" />
          <path d="M128 139 C140 129 158 128 172 136" fill="none" stroke="#e2a02d" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
          <path d="M130 153 C142 146 157 146 168 152" fill="none" stroke="#e2a02d" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        <motion.g style={{ x: headX, y: headY }}>
          <circle cx="219" cy="79" r="51" fill="var(--yellow)" stroke="#e2a02d" strokeWidth="3" />
          <path d="M190 39 C188 20 199 15 208 29 C214 12 229 12 233 31 C244 18 256 25 250 43 Z" fill="var(--clay)" stroke="#d76343" strokeWidth="3" />
          <path d="M262 74 L296 84 L262 95 Z" fill="var(--clay)" stroke="#d76343" strokeWidth="2.5" />
          <circle cx="235" cy="70" r="13" fill="#fffdf6" />
          <motion.g style={{ x: eyeX, y: eyeY }}>
            <motion.circle
              cx="238"
              cy="70"
              r="6"
              fill="var(--navy)"
              animate={reduced ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
              transition={{ duration: 3.6, times: [0, 0.72, 0.76, 0.8, 1], repeat: Infinity, repeatDelay: 1.2 }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
            <circle cx="240" cy="67" r="1.8" fill="#fff" />
          </motion.g>
          <ellipse cx="217" cy="91" rx="8" ry="4" fill="var(--clay)" fillOpacity="0.28" />
        </motion.g>
      </svg>

      <AnimatePresence>
        {cycle > 0 ? (
          <motion.span
            key={`bubble-${cycle}`}
            className={styles.bubble}
            initial={reduced ? false : { opacity: 0, scale: 0.62, y: 10, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.75, y: -6 }}
            transition={{ type: "spring", stiffness: 280, damping: 17 }}
          >
            Bok bok!
            <svg className={styles.bubbleTail} viewBox="0 0 30 22" aria-hidden="true">
              <path d="M2 2 L22 16 L8 18 Z" fill="currentColor" />
            </svg>
          </motion.span>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {cycle > 0 ? (
          <motion.span
            key={`egg-${cycle}`}
            className={styles.laidEgg}
            initial={reduced ? false : { opacity: 0, scaleY: 0.4, scaleX: 1.2, y: 36 }}
            animate={reduced ? { opacity: 1 } : { opacity: [0, 1, 1, 0], scaleY: [0.4, 1.16, 0.9, 1], scaleX: [1.2, 0.9, 1.05, 1], y: [36, 0, -9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 1.5, times: reduced ? undefined : [0, 0.3, 0.62, 1], ease: "easeOut" }}
          >
            <Egg shell="brown" size={26} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}
