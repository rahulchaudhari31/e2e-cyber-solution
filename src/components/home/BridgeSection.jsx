import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, home } from "../../data/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import styles from "./BridgeSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const businessLabels = home.hero.badges;
const audienceLabels = home.marquee.slice(4, 8);

function FloatingLabel({ label, className, delay, reduced }) {
  return (
    <motion.div
      className={`${styles.label} ${className}`}
      initial={reduced ? false : { opacity: 0, scale: 0.68, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 190, damping: 16, delay }}
    >
      <motion.span
        className={styles.labelInner}
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: 4.4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.2,
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

export default function BridgeSection() {
  const sectionRef = useRef(null);
  const bridgeRef = useRef(null);
  const lineRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return undefined;

    const length = line.getTotalLength();
    gsap.set(line, {
      strokeDasharray: length,
      strokeDashoffset: reduced ? 0 : length,
    });

    if (reduced) return undefined;

    const tween = gsap.to(line, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: bridgeRef.current,
        start: "top 78%",
        end: "bottom 62%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section
      id="two-sides"
      ref={sectionRef}
      className={styles.section}
      aria-label="Two sides, one bridge"
    >
      <div className={styles.rings} aria-hidden="true">
        <span />
        <span />
      </div>

      <Container>
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Two sides, one bridge"
            title="Two sides. One bridge."
            description="We sit in the middle — joining business ambition with audience attention through strategy, design, technology and content."
            align="center"
            size="lg"
            tone="yellow"
          />
        </div>

        <div ref={bridgeRef} className={styles.bridge}>
          <div className={styles.side}>
            <motion.div
              className={`${styles.circle} ${styles.businessCircle}`}
              initial={reduced ? false : { opacity: 0, scale: 0.86, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 130, damping: 17 }}
            >
              <span className={styles.circleIndex}>01 / Business</span>
              <h3>Your Business</h3>
              <p>Your goals, your offer, and what makes you impossible to ignore.</p>
            </motion.div>

            <div className={styles.labels}>
              {businessLabels.map((label, index) => (
                <FloatingLabel
                  key={label}
                  label={label}
                  className={styles[`labelB${index}`]}
                  delay={index * 0.08}
                  reduced={reduced}
                />
              ))}
            </div>
          </div>

          <div className={styles.linkWrap} aria-hidden="true">
            <svg className={styles.linkSvg} viewBox="0 0 260 60">
              <path
                ref={lineRef}
                className={styles.linkPath}
                d="M0 30 C72 0 188 60 260 30"
              />
            </svg>
            <motion.span
              className={styles.ampOuter}
              initial={reduced ? false : { opacity: 0, scale: 0.45, rotate: -18 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 210, damping: 14, delay: 0.18 }}
            >
              <motion.span
                className={styles.amp}
                animate={reduced ? undefined : { rotate: [-4, 4, -4] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                &amp;
              </motion.span>
            </motion.span>
          </div>

          <div className={styles.side}>
            <motion.div
              className={`${styles.circle} ${styles.audienceCircle}`}
              initial={reduced ? false : { opacity: 0, scale: 0.86, rotate: 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 130, damping: 17, delay: 0.1 }}
            >
              <span className={styles.circleIndex}>02 / Audience</span>
              <h3>Your Audience</h3>
              <p>The people you need to reach, engage, convert and keep coming back.</p>
            </motion.div>

            <div className={styles.labels}>
              {audienceLabels.map((label, index) => (
                <FloatingLabel
                  key={label}
                  label={label}
                  className={styles[`labelA${index}`]}
                  delay={0.2 + index * 0.08}
                  reduced={reduced}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className={styles.foot}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>
            We connect the two with strategy, design, technology and content — the
            missing link between your business and its people.
          </p>
          <Button to="/contact" variant="dark" size="md">
            {about.story.cta}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
