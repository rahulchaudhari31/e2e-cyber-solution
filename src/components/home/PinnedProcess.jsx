import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Sparkles } from "lucide-react";
import { processSteps } from "../../data/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import styles from "./PinnedProcess.module.css";

gsap.registerPlugin(ScrollTrigger);

const chapterLabels = ["Discover", "Design", "Develop", "Grow"];
const chapters = processSteps.slice(0, 4).map((step, index) => ({
  ...step,
  chapter: chapterLabels[index],
}));

export default function PinnedProcess() {
  const pinRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = chapters[active] ?? chapters[0];

  useEffect(() => {
    if (reduced) {
      gsap.set(progressRef.current, { scaleY: 1 });
      return undefined;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const pin = pinRef.current;
      if (!pin) return undefined;

      gsap.set(progressRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.35}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(
              chapters.length - 1,
              Math.floor(self.progress * chapters.length),
            );
            setActive((previous) => (previous === next ? previous : next));
          },
        },
      });

      timeline.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        duration: chapters.length,
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="process" className={styles.section} aria-label="Our process">
      <Container>
        <div id="process-pin" ref={pinRef} className={styles.pin}>
          <div className={styles.layout}>
            <div className={styles.copy}>
              <SectionHeading
                eyebrow="How we work"
                title="Your project, built with care."
                description="One connected process, from the first question to the final result. No hand-offs into thin air."
                tone="dark"
                size="lg"
                className={styles.processHeading}
              />

              <div className={styles.steps}>
                <div className={styles.track} aria-hidden="true">
                  <span className={styles.trackBase} />
                  <span ref={progressRef} className={styles.progressFill} />
                </div>

                <ol>
                  {chapters.map((step, index) => (
                    <li
                      key={step.chapter}
                      className={`${styles.step} ${
                        active === index ? styles.stepActive : ""
                      }`}
                      aria-current={active === index ? "step" : undefined}
                    >
                      <span className={styles.stepNumber}>{step.number}</span>
                      <div className={styles.stepText}>
                        <div className={styles.stepTop}>
                          <h3>{step.chapter}</h3>
                          <span>{step.title}</span>
                        </div>
                        <p>{step.text}</p>
                        <img
                          className={styles.stepThumb}
                          src={step.image}
                          alt=""
                          width="1400"
                          height="1400"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <Button to="/contact" variant="light" size="md">
                Start a project
              </Button>
            </div>

            <div className={styles.visual}>
              <div className={styles.media}>
                {chapters.map((step, index) => (
                  <motion.img
                    key={step.chapter}
                    src={step.image}
                    alt=""
                    width="1400"
                    height="1400"
                    className={styles.mediaImage}
                    animate={{
                      opacity: active === index ? 1 : 0,
                      scale: active === index ? 1 : 1.035,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
                <span className={styles.mediaShade} aria-hidden="true" />
                <div className={styles.chrome}>
                  <span className={styles.chromeDots} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.chromeUrl}>
                    e2e.studio / {current.chapter.toLowerCase()}
                  </span>
                  <span className={styles.chromeCount}>0{active + 1} / 04</span>
                </div>

                <motion.div
                  key={current.chapter}
                  className={styles.sticker}
                  initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -24 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 190, damping: 15 }}
                >
                  <Sparkles size={18} strokeWidth={1.8} />
                  <strong>Built with care</strong>
                  <span>e2e method</span>
                </motion.div>

                <div className={styles.mediaBottom}>
                  <span>{current.title}</span>
                  <span>
                    <ArrowDown size={14} strokeWidth={2} />
                    Keep scrolling
                  </span>
                </div>
              </div>

              <div className={styles.dots} aria-hidden="true">
                {chapters.map((step, index) => (
                  <span
                    key={step.chapter}
                    className={active === index ? styles.dotActive : ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
