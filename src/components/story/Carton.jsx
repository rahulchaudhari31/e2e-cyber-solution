import gsap from "gsap";
import { useEffect, useId, useRef } from "react";
import { useStory } from "./storyShared";
import styles from "./Carton.module.css";

const shells = {
  brown: { base: "#d89558", light: "#f6c894", dark: "#a85f34" },
  white: { base: "#fffaf0", light: "#ffffff", dark: "#d9cdb8" },
  brand: { base: "#ffc93c", light: "#ffe89a", dark: "#ef9f0a" },
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function Carton({
  shell = "brown",
  start = 0.34,
  end = 0.53,
  className = "",
}) {
  const { subscribeProgress, reduced } = useStory();
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const eggRefs = useRef([]);
  const palette = shells[shell] || shells.brown;

  useEffect(() => {
    const setters = eggRefs.current.map((node) =>
      node
        ? {
            y: gsap.quickSetter(node, "y", "px"),
            opacity: gsap.quickSetter(node, "opacity"),
            scale: gsap.quickSetter(node, "scale"),
          }
        : null,
    );

    const update = (progress) => {
      const local = reduced ? 1 : clamp((progress - start) / (end - start), 0, 1);

      setters.forEach((setter, index) => {
        if (!setter) return;

        const raw = clamp(local * 3 - index, 0, 1);
        const eased = 1 - Math.pow(1 - raw, 3);
        setter.y((1 - eased) * -74);
        setter.opacity(raw <= 0 ? 0 : 1);
        setter.scale(0.86 + eased * 0.14);
      });
    };

    return subscribeProgress(update);
  }, [subscribeProgress, reduced, start, end]);

  return (
    <svg
      className={`${styles.carton} ${className}`.trim()}
      viewBox="0 0 360 220"
      width="100%"
      height="100%"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-egg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="100%" stopColor={palette.base} />
        </linearGradient>
        <linearGradient id={`${id}-box`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9a56d" />
          <stop offset="100%" stopColor="#b87942" />
        </linearGradient>
      </defs>

      <ellipse cx="180" cy="203" rx="130" ry="10" fill="rgba(11,27,58,.12)" />

      <path d="M34 83 L326 83 L304 177 L56 177 Z" fill={`url(#${id}-box)`} stroke="#9e6335" strokeWidth="3" />
      <path d="M34 83 L61 44 L299 44 L326 83 Z" fill="#e4b77f" stroke="#9e6335" strokeWidth="3" />
      <path d="M61 44 L91 83" stroke="#c58a50" strokeWidth="3" />
      <path d="M299 44 L269 83" stroke="#c58a50" strokeWidth="3" />

      {[95, 180, 265].map((x, index) => (
        <g
          key={x}
          className={styles.dropEgg}
          ref={(node) => {
            eggRefs.current[index] = node;
          }}
        >
          <ellipse cx={x} cy="105" rx="30" ry="39" fill={`url(#${id}-egg)`} stroke={palette.dark} strokeOpacity="0.45" strokeWidth="2" />
          <ellipse cx={x - 9} cy="92" rx="7" ry="12" fill="#fff" fillOpacity="0.4" transform={`rotate(-20 ${x - 9} 92)`} />
        </g>
      ))}

      <path
        d="M46 126 C60 105 80 105 95 126 C110 105 130 105 145 126 C160 105 180 105 195 126 C210 105 230 105 245 126 C260 105 280 105 295 126 L304 177 L56 177 Z"
        fill="#c98d53"
        stroke="#9e6335"
        strokeWidth="3"
      />
      <path d="M56 177 L304 177" stroke="#8e552d" strokeWidth="5" strokeLinecap="round" />
      <rect x="143" y="145" width="74" height="28" rx="14" fill="var(--cream-2)" />
      <text
        x="180"
        y="164"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="14"
        fontWeight="700"
        fill="var(--navy)"
      >
        e2e
      </text>
    </svg>
  );
}
