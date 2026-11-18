import { createContext, useContext } from "react";

export const STORY_CHAPTERS = ["candling", "painted", "incubating", "hatched"];

export const StoryContext = createContext(null);

export function useStory() {
  const context = useContext(StoryContext);

  if (!context) {
    throw new Error("useStory must be used inside StoryProvider");
  }

  return context;
}
