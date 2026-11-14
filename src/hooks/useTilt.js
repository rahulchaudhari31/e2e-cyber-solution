import { useCallback, useRef } from "react";

export default function useTilt({
  max = 7,
  scale = 1.012,
  disabled = false,
} = {}) {
  const ref = useRef(null);

  const onPointerMove = useCallback(
    (event) => {
      const node = ref.current;
      if (disabled || !node || event.pointerType !== "mouse") return;

      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - py) * max * 2;
      const rotateY = (px - 0.5) * max * 2;

      node.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`;
      node.style.setProperty("--tilt-x", `${(px * 100).toFixed(1)}%`);
      node.style.setProperty("--tilt-y", `${(py * 100).toFixed(1)}%`);
    },
    [disabled, max, scale],
  );

  const onPointerLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;

    node.style.transform = "";
    node.style.removeProperty("--tilt-x");
    node.style.removeProperty("--tilt-y");
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
