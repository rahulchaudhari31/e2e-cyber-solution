import { useEffect, useRef, useState } from "react";

export default function useCounter(
  target,
  { duration = 1450, start = 0, enabled = true } = {},
) {
  const [value, setValue] = useState(start);
  const frame = useRef(0);

  useEffect(() => {
    if (!enabled || !Number.isFinite(target)) return undefined;

    let startTime;
    const from = start;
    const distance = target - from;

    const tick = (time) => {
      if (startTime === undefined) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(from + distance * eased);

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame.current);
  }, [duration, enabled, start, target]);

  return Number.isFinite(target) ? value : start;
}
