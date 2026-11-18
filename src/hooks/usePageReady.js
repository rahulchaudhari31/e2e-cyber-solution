import { useSyncExternalStore } from "react";

const READY_EVENT = "e2e:ready";
const listeners = new Set();
let ready = false;

function subscribe(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return ready;
}

function getServerSnapshot() {
  return false;
}

export function markPageReady() {
  if (ready || typeof window === "undefined") return;

  ready = true;
  window.dispatchEvent(new Event(READY_EVENT));
  listeners.forEach((listener) => listener());
}

export function usePageReady() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
