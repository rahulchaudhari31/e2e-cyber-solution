import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Egg, { Chick } from "./Egg";
import styles from "./StoryThread.module.css";
import { STORY_CHAPTERS, useStory } from "./storyShared";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ANCHOR_NAMES = ["hero", "bridge", "packages", "process", "stats", "cta"];
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function shellForStage(stage) {
  if (stage === "candling") return "white";
  if (["painted", "incubating", "hatched", "cracked", "proof", "launch"].includes(stage)) return "brand";
  return "brown";
}

function stateForStage(stage) {
  if (stage === "candling") return "glow";
  if (stage === "painted") return "painted";
  if (stage === "incubating") return "incubating";
  return "whole";
}

function smoothPath(points, compact) {
  if (points.length < 2) return "";

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] || points[index];
    const current = points[index];
    const next = points[index + 1];
    const after = points[index + 2] || next;

    if (compact) {
      const middle = (current.y + next.y) / 2;
      d += ` C ${current.x.toFixed(1)} ${middle.toFixed(1)}, ${next.x.toFixed(1)} ${middle.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
      continue;
    }

    const cp1 = {
      x: current.x + (next.x - previous.x) / 6,
      y: current.y + (next.y - previous.y) / 6,
    };
    const cp2 = {
      x: next.x - (after.x - current.x) / 6,
      y: next.y - (after.y - current.y) / 6,
    };

    d += ` C ${cp1.x.toFixed(1)} ${cp1.y.toFixed(1)}, ${cp2.x.toFixed(1)} ${cp2.y.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
  }

  return d;
}

function measure(wrapper, compact) {
  const wrapperRect = wrapper.getBoundingClientRect();
  const scrollTop = window.scrollY || window.pageYOffset;
  const wrapperTop = wrapperRect.top + scrollTop;
  const wrapperHeight = wrapper.offsetHeight;
  const viewport = window.innerHeight;
  const span = Math.max(1, wrapperHeight - viewport);

  const anchors = ANCHOR_NAMES.map((name) => {
    const node = wrapper.querySelector(`[data-story-anchor="${name}"]`);
    return node ? { name, node, rect: node.getBoundingClientRect() } : null;
  }).filter(Boolean);

  if (anchors.length < 2) return null;

  const points = anchors.map(({ name, rect }) => {
    const x = rect.left - wrapperRect.left;
    const y = rect.top - wrapperRect.top;

    if (compact) {
      return { x: 26, y: y + rect.height * 0.36 };
    }

    const positions = {
      hero: { x: x + rect.width * 0.7, y: y + rect.height * 0.64 },
      bridge: { x: x + rect.width * 0.35, y: y + rect.height * 0.5 },
      packages: { x: x + rect.width * 0.2, y: y + rect.height * 0.5 },
      process: { x: x + rect.width * 0.78, y: y + rect.height * 0.48 },
      stats: { x: x + rect.width * 0.42, y: y + rect.height * 0.5 },
      cta: { x: x + rect.width * 0.68, y: y + rect.height * 0.44 },
    };

    return positions[name] || { x: x + rect.width * 0.5, y: y + rect.height * 0.5 };
  });

  let previousStop = 0;
  const stops = anchors.map(({ name, node, rect }) => {
    const pinSpacer = name === "process" ? node.querySelector(".pin-spacer") : null;
    const pinTarget = pinSpacer || (name === "process" ? node.querySelector("#process-pin") : null);
    const center = pinTarget
      ? pinTarget.getBoundingClientRect().top + scrollTop
      : rect.top + scrollTop + rect.height * 0.42 - viewport * 0.42;
    const stop = clamp((center - wrapperTop) / span, previousStop + 0.01, 1);
    previousStop = stop;
    return stop;
  });

  const cumulative = [0];
  for (let index = 1; index < points.length; index += 1) {
    const distance = Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y);
    cumulative.push(cumulative[index - 1] + distance);
  }

  const pathTotal = Math.max(1, cumulative[cumulative.length - 1]);
  const pathStops = cumulative.map((value) => value / pathTotal);

  return {
    width: Math.max(1, wrapperRect.width),
    height: wrapperHeight,
    stops,
    pathStops,
    d: smoothPath(points, compact),
  };
}

function stageAt(progress, stops, chapterRef) {
  if (progress < stops[0]) return "laid";
  if (progress < stops[1]) return "rolling";
  if (progress < stops[2]) return "boxed";
  if (progress < stops[3]) return "candling";
  if (progress < stops[4]) {
    return STORY_CHAPTERS[chapterRef.current] || "candling";
  }
  if (progress < stops[5]) return "proof";
  return "launch";
}

export default function StoryThread() {
  const overlayRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const glowRef = useRef(null);
  const eggRef = useRef(null);
  const contextRef = useRef(null);
  const rebuildingRef = useRef(false);
  const { stage, setStage, publishProgress, chapterRef, stopsRef, reduced, compact } = useStory();

  useEffect(() => {
    const wrapper = overlayRef.current?.parentElement;
    const path = pathRef.current;
    const glow = glowRef.current;
    const egg = eggRef.current;

    if (!wrapper || !path || !glow || !egg) return undefined;

    let disposed = false;
    let refreshFrame = 0;
    let resizeTimer = 0;

    const rebuild = () => {
      if (disposed || rebuildingRef.current) return;
      rebuildingRef.current = true;

      contextRef.current?.revert();
      contextRef.current = null;

      const data = measure(wrapper, compact);

      if (!data) {
        rebuildingRef.current = false;
        return;
      }

      stopsRef.current = data.stops;
      path.setAttribute("d", data.d);
      glow.setAttribute("d", data.d);

      svgRef.current?.setAttribute("viewBox", `0 0 ${data.width} ${data.height}`);

      const length = path.getTotalLength() || 1;
      [path, glow].forEach((node) => {
        node.style.strokeDasharray = `${length}`;
        node.style.strokeDashoffset = `${length}`;
      });

      const rawPath = MotionPathPlugin.getRawPath(path);

      if (!rawPath || !rawPath.length) {
        rebuildingRef.current = false;
        return;
      }

      const positionAt = (progress) =>
        MotionPathPlugin.getPositionOnPath(rawPath, clamp(progress), true) || { x: 0, y: 0 };

      const journeyToPath = (progress) => {
        if (progress <= data.stops[0]) return data.pathStops[0];
        if (progress >= data.stops[data.stops.length - 1]) return 1;

        for (let index = 0; index < data.stops.length - 1; index += 1) {
          const from = data.stops[index];
          const to = data.stops[index + 1];

          if (progress <= to) {
            const local = clamp((progress - from) / Math.max(0.001, to - from));
            return data.pathStops[index] + (data.pathStops[index + 1] - data.pathStops[index]) * local;
          }
        }

        return 1;
      };

      const placeEgg = (progress, wobble = 0) => {
        const position = positionAt(progress);
        gsap.set(egg, {
          x: position.x,
          y: position.y,
          xPercent: -50,
          yPercent: -50,
          rotation: wobble,
        });
      };

      const drawThread = (progress) => {
        const offset = length * (1 - clamp(progress));
        path.style.strokeDashoffset = `${offset}`;
        glow.style.strokeDashoffset = `${offset}`;
      };

      const context = gsap.context(() => {
        if (reduced) {
          drawThread(1);
          placeEgg(1);
          publishProgress(1);
          setStage("launch");
          return;
        }

        const driver = { progress: 0 };

        gsap.to(driver, {
          progress: 1,
          ease: "none",
          onUpdate: () => {
            const progress = clamp(driver.progress);
            const pathProgress = journeyToPath(progress);
            drawThread(pathProgress);
            placeEgg(pathProgress, Math.sin(progress * Math.PI * 14) * 6);
            publishProgress(progress);
            setStage(stageAt(progress, data.stops, chapterRef));
          },
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
      }, wrapper);

      contextRef.current = context;
      rebuildingRef.current = false;
    };

    const scheduleRebuild = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(rebuild);
    };

    const scheduleRefresh = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    rebuild();
    ScrollTrigger.addEventListener("refresh", scheduleRebuild);
    window.addEventListener("resize", scheduleRefresh);

    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleRefresh);
    observer?.observe(wrapper);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      window.clearTimeout(resizeTimer);
      ScrollTrigger.removeEventListener("refresh", scheduleRebuild);
      window.removeEventListener("resize", scheduleRefresh);
      observer?.disconnect();
      contextRef.current?.revert();
      contextRef.current = null;
    };
  }, [compact, reduced, chapterRef, stopsRef, publishProgress, setStage]);

  const hatchling = ["hatched", "cracked", "proof", "launch"].includes(stage);
  const eggSize = compact ? 30 : 42;

  return (
    <div className={styles.overlay} ref={overlayRef} aria-hidden="true">
      <svg className={styles.thread} ref={svgRef} preserveAspectRatio="none" role="presentation">
        <path ref={glowRef} className={styles.threadGlow} />
        <path ref={pathRef} className={styles.threadLine} />
      </svg>
      <div className={styles.traveler} ref={eggRef}>
        {hatchling ? (
          <Chick size={eggSize} crow={stage === "launch"} />
        ) : (
          <Egg
            size={eggSize}
            shell={shellForStage(stage)}
            state={stateForStage(stage)}
          />
        )}
      </div>
    </div>
  );
}
