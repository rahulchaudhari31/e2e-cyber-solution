import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Globe2,
  Megaphone,
  Play,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { home } from "../../data/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import styles from "./StoryHero.module.css";

const ease = [0.16, 1, 0.3, 1];
const headline = "The missing link between your business and your audience";
const words = headline.split(" ");
const accentWords = new Set(["missing", "link", "audience"]);

const wordContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.062,
      delayChildren: 0.18,
    },
  },
};

const wordReveal = {
  hidden: { y: "112%", rotate: 2 },
  show: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.82, ease },
  },
};

function FloatShape({
  children,
  className = "",
  delay = 0,
  duration = 4.2,
  reduced,
  style,
}) {
  return (
    <motion.div
      className={`${styles.shape} ${className}`}
      style={style}
      initial={reduced ? false : { opacity: 0, y: -90, scale: 0.72, rotate: -8 }}
      animate={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, rotate: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 13,
        delay,
      }}
    >
      <motion.div
        className={styles.shapeFloat}
        animate={reduced ? undefined : { y: [0, -9, 0], rotate: [0, 1.4, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.3,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function StoryHero() {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.4 });
  const bridgeX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const bridgeY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const shapeX = useTransform(smoothX, [-1, 1], [22, -22]);
  const shapeY = useTransform(smoothY, [-1, 1], [16, -16]);

  const handlePointerMove = (event) => {
    if (reduced || event.pointerType !== "mouse" || !heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={heroRef}
      className={styles.section}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.copy}>
          <motion.span
            className={styles.eyebrow}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Sparkles size={14} strokeWidth={1.8} />
            {home.hero.eyebrow}
          </motion.span>

          <h1 className={styles.title} aria-label={headline}>
            <motion.span
              className={styles.titleInner}
              variants={wordContainer}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {words.map((word, index) => (
                <span
                  className={styles.wordMask}
                  key={`${word}-${index}`}
                  aria-hidden="true"
                >
                  <motion.span
                    className={`${styles.word} ${
                      accentWords.has(word) ? styles.accentWord : ""
                    }`}
                    variants={reduced ? undefined : wordReveal}
                  >
                    {word}
                    {index < words.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            className={styles.support}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease }}
          >
            {home.hero.support}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.86, ease }}
          >
            <Button to="/contact" size="lg">
              {home.hero.primaryCta}
            </Button>
            <Button to="/services" variant="outline" size="lg">
              {home.hero.secondaryCta}
            </Button>
          </motion.div>

          <motion.ul
            className={styles.badges}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.98, ease }}
            aria-label="What we do"
          >
            {home.hero.badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </motion.ul>
        </div>

        <div className={styles.visual}>
          <motion.div
            className={styles.bridgeStage}
            style={reduced ? undefined : { x: bridgeX, y: bridgeY }}
          >
            <svg
              className={styles.bridgeSvg}
              viewBox="0 0 620 620"
              role="presentation"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="heroBridgeStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--blue)" />
                  <stop offset="55%" stopColor="var(--blue-2)" />
                  <stop offset="100%" stopColor="var(--meadow)" />
                </linearGradient>
                <linearGradient id="heroBridgeDeck" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--navy)" />
                  <stop offset="100%" stopColor="var(--navy-3)" />
                </linearGradient>
              </defs>

              <motion.circle
                cx="472"
                cy="116"
                r="54"
                fill="var(--yellow)"
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.4 }}
                style={{ transformOrigin: "472px 116px" }}
              />
              <motion.circle
                cx="472"
                cy="116"
                r="82"
                fill="none"
                stroke="var(--navy)"
                strokeOpacity="0.16"
                strokeDasharray="4 10"
                initial={reduced ? false : { opacity: 0, rotate: -16 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.55, ease }}
                style={{ transformOrigin: "472px 116px" }}
              />

              <motion.path
                d="M34 430 C150 342 470 342 586 430"
                fill="none"
                stroke="var(--yellow)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeOpacity="0.5"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.45, ease }}
              />
              <motion.path
                d="M72 424 C175 232 445 232 548 424"
                fill="none"
                stroke="url(#heroBridgeStroke)"
                strokeWidth="16"
                strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.35, delay: 0.5, ease }}
              />
              <motion.path
                d="M50 430 H570"
                fill="none"
                stroke="url(#heroBridgeDeck)"
                strokeWidth="14"
                strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.15, delay: 0.65, ease }}
              />

              {[
                { x: 150, top: 346 },
                { x: 220, top: 302 },
                { x: 310, top: 280 },
                { x: 400, top: 302 },
                { x: 470, top: 346 },
              ].map(({ x, top }, index) => (
                <motion.path
                  key={x}
                  d={`M${x} 430 V${top}`}
                  fill="none"
                  stroke="var(--navy)"
                  strokeOpacity="0.38"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 1 + index * 0.08, ease }}
                />
              ))}

              <motion.rect
                x="100"
                y="286"
                width="20"
                height="148"
                rx="10"
                fill="var(--navy)"
                initial={reduced ? false : { scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.75 }}
                style={{ transformOrigin: "110px 434px" }}
              />
              <motion.rect
                x="500"
                y="286"
                width="20"
                height="148"
                rx="10"
                fill="var(--navy)"
                initial={reduced ? false : { scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.82 }}
                style={{ transformOrigin: "510px 434px" }}
              />

              {[0, 1, 2].map((index) => (
                <motion.path
                  key={index}
                  d={`M${98 + index * 42} ${492 + index * 18} C${190 + index * 30} ${
                    468 + index * 18
                  } ${280 + index * 30} ${520 + index * 18} ${360 + index * 34} ${
                    492 + index * 18
                  }`}
                  fill="none"
                  stroke="var(--blue)"
                  strokeOpacity={0.2 - index * 0.04}
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.1 + index * 0.08, ease }}
                />
              ))}

              <motion.circle
                cx="310"
                cy="286"
                r="12"
                fill="var(--yellow)"
                stroke="var(--navy)"
                strokeWidth="4"
                initial={reduced ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 12, delay: 1.2 }}
              />
            </svg>

            <FloatShape
              className={styles.browserShape}
              delay={0.65}
              duration={4.8}
              reduced={reduced}
              style={reduced ? undefined : { x: shapeX, y: shapeY }}
            >
              <div className={styles.browserCard}>
                <div className={styles.browserBar}>
                  <span />
                  <span />
                  <span />
                  <small>e2e / bridge</small>
                </div>
                <div className={styles.browserBody}>
                  <Globe2 size={22} strokeWidth={1.7} />
                  <div className={styles.browserLines}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </FloatShape>

            <FloatShape
              className={styles.phoneShape}
              delay={0.85}
              duration={5.2}
              reduced={reduced}
              style={reduced ? undefined : { x: shapeX, y: shapeY }}
            >
              <div className={styles.phoneCard}>
                <div className={styles.phoneNotch} />
                <div className={styles.phoneScreen}>
                  <Smartphone size={19} strokeWidth={1.8} />
                  <span className={styles.phoneBars}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <small>Ready to grow</small>
                </div>
              </div>
            </FloatShape>

            <FloatShape
              className={styles.megaphoneShape}
              delay={1}
              duration={4.5}
              reduced={reduced}
              style={reduced ? undefined : { x: shapeX, y: shapeY }}
            >
              <div className={styles.megaphoneCard}>
                <Megaphone size={24} strokeWidth={1.8} />
              </div>
              <span className={styles.shapeLabel}>Campaigns</span>
            </FloatShape>

            <FloatShape
              className={styles.playShape}
              delay={1.15}
              duration={5}
              reduced={reduced}
              style={reduced ? undefined : { x: shapeX, y: shapeY }}
            >
              <div className={styles.playCard}>
                <span className={styles.playButton}>
                  <Play size={16} fill="currentColor" strokeWidth={0} />
                </span>
                <span>
                  <small>Showreel</small>
                  <strong>Play the story</strong>
                </span>
              </div>
            </FloatShape>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
