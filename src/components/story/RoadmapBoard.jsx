import gsap from "gsap";
import { useEffect, useRef } from "react";
import { CodeXml, Palette, Rocket, Target } from "lucide-react";
import { useStory } from "./storyShared";
import styles from "./RoadmapBoard.module.css";

const milestones = [
  { label: "Discover", note: "Research", icon: Target },
  { label: "Design", note: "Experience", icon: Palette },
  { label: "Build", note: "Development", icon: CodeXml },
  { label: "Launch", note: "Go live", icon: Rocket },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function RoadmapBoard({ focus = "website", className = "" }) {
  const { subscribeProgress, stopsRef, reduced } = useStory();
  const cardRefs = useRef([]);
  const focusIndex = { brand: 1, website: 2, campaign: 3 }[focus] ?? 2;

  useEffect(() => {
    const setters = cardRefs.current.map((node) =>
      node
        ? {
            y: gsap.quickSetter(node, "y", "px"),
            opacity: gsap.quickSetter(node, "opacity"),
            scale: gsap.quickSetter(node, "scale"),
          }
        : null,
    );

    const update = (progress) => {
      const stops = stopsRef.current;
      const from = stops.length > 3 ? stops[2] : 0.34;
      const to = stops.length > 3 ? stops[3] : 0.53;
      const local = reduced ? 1 : clamp((progress - from) / Math.max(0.001, to - from), 0, 1);

      setters.forEach((setter, index) => {
        if (!setter) return;

        const raw = clamp(local * 4 - index, 0, 1);
        const eased = 1 - Math.pow(1 - raw, 3);
        setter.y((1 - eased) * -46);
        setter.opacity(raw <= 0 ? 0 : 1);
        setter.scale(0.9 + eased * 0.1);
      });
    };

    return subscribeProgress(update);
  }, [subscribeProgress, reduced, stopsRef]);

  return (
    <div className={`${styles.board} ${className}`.trim()}>
      <div className={styles.boardHead}>
        <span>Delivery roadmap</span>
        <span>04 milestones</span>
      </div>

      <div className={styles.milestones}>
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;

          return (
            <div
              key={milestone.label}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={`${styles.card} ${index === focusIndex ? styles.focused : ""}`}
            >
              <span className={styles.cardIcon}>
                <Icon size={15} strokeWidth={1.9} />
              </span>
              <span className={styles.cardText}>
                <strong>{milestone.label}</strong>
                <small>{milestone.note}</small>
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.rail} aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
