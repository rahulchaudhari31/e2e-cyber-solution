import { useCallback, useRef } from "react";

export default function useMagnetic({ strength = 0.2, disabled = false } = {}) {
  const ref = useRef(null);

  const onPointerMove = useCallback(
    (event) => {
      const node = ref.current;
      if (disabled || !node || event.pointerType !== "mouse") return;

      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;

      node.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
      node.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
    },
    [disabled, strength],
  );

  const onPointerLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;

    node.style.setProperty("--magnet-x", "0px");
    node.style.setProperty("--magnet-y", "0px");
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
