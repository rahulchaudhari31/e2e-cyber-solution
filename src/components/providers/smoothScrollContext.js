import { createContext, useContext } from "react";

export const SmoothScrollContext = createContext(null);

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);

  if (!context) {
    throw new Error("useSmoothScroll must be used inside SmoothScrollProvider");
  }

  return context;
}
