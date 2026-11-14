import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { home, processSteps } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Process.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return undefined;

    const ctx = gsap.context(() => {
      if (lineRef.current && timelineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 72%",
              end: "bottom 78%",
              scrub: 0.6,
            },
          },
        );
      }

      const steps = Array.from(
        sectionRef.current.querySelectorAll("[data-process-step]"),
      );
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 54 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section dark-section ${styles.section}`}
      id="process"
    >
      <div className={styles.orb} aria-hidden="true" />
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            eyebrow={home.process.eyebrow}
            title={home.process.title}
            description={home.process.description}
            tone="dark"
          />
          <Reveal className={styles.headNote}>
            <span className={styles.headNumber}>05</span>
            <span className={styles.headLabel}>connected steps</span>
          </Reveal>
        </div>

        <div className={styles.timeline} ref={timelineRef}>
          <span className={styles.line} ref={lineRef} aria-hidden="true" />

          {processSteps.map((step) => (
            <article
              key={step.number}
              data-process-step
              className={`${styles.step} ${styles[step.accent]}`}
            >
              <div className={styles.marker}>
                <span>{step.number}</span>
              </div>

              <div className={styles.copy}>
                <span className={styles.stepKicker}>Step {step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>

              <div className={styles.media}>
                <img
                  src={step.image}
                  alt={`${step.title} at e2e Cyber Solutions`}
                  width="1400"
                  height="1400"
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.mediaNumber}>{step.number}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
