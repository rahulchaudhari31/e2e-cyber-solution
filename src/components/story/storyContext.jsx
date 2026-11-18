import { useCallback, useMemo, useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { usePageReady } from "../../hooks/usePageReady";
import { STORY_CHAPTERS, StoryContext } from "./storyShared";

export default function StoryProvider({ children }) {
  const [stage, setStageState] = useState("idea");
  const [chapter, setChapterState] = useState(0);
  const stageRef = useRef("idea");
  const chapterRef = useRef(0);
  const progressRef = useRef(0);
  const stopsRef = useRef([]);
  const progressListeners = useRef(new Set());
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 899px)");
  const ready = usePageReady();

  const setStage = useCallback((next) => {
    if (!next || stageRef.current === next) return;
    stageRef.current = next;
    setStageState(next);
  }, []);

  const setChapter = useCallback((next) => {
    const index = Math.max(0, Math.min(STORY_CHAPTERS.length - 1, Math.round(next)));
    if (chapterRef.current === index) return;
    chapterRef.current = index;
    setChapterState(index);
  }, []);

  const publishProgress = useCallback((value) => {
    progressRef.current = value;
    progressListeners.current.forEach((listener) => listener(value));
  }, []);

  const subscribeProgress = useCallback((listener) => {
    progressListeners.current.add(listener);
    listener(progressRef.current);

    return () => {
      progressListeners.current.delete(listener);
    };
  }, []);

  const value = useMemo(
    () => ({
      stage,
      stageRef,
      setStage,
      chapter,
      chapterRef,
      setChapter,
      progressRef,
      stopsRef,
      publishProgress,
      subscribeProgress,
      reduced,
      compact,
      ready,
    }),
    [
      stage,
      setStage,
      chapter,
      setChapter,
      publishProgress,
      subscribeProgress,
      reduced,
      compact,
      ready,
    ],
  );

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}
