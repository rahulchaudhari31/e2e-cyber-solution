import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./PillTabs.module.css";

export default function PillTabs({
  items = [],
  value,
  defaultValue,
  onChange,
  ariaLabel = "Tabs",
  className = "",
}) {
  const id = useId();
  const reduced = useReducedMotion();
  const tabRefs = useRef([]);
  const normalized = items.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item,
  );

  const [internal, setInternal] = useState(
    defaultValue ?? normalized[0]?.value,
  );
  const current = value !== undefined ? value : internal;

  const select = (next) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleKeyDown = (event, index) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % normalized.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + normalized.length) % normalized.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = normalized.length - 1;
    }

    select(normalized[nextIndex].value);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={`${styles.tabs} ${className}`} role="tablist" aria-label={ariaLabel}>
      {normalized.map((item, index) => {
        const isActive = item.value === current;

        return (
          <button
            key={item.value}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => select(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {isActive ? (
              <motion.span
                className={styles.indicator}
                layoutId={`pill-tabs-${id}`}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
                aria-hidden="true"
              />
            ) : null}
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
