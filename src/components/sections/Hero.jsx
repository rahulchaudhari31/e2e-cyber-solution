import { motion } from "framer-motion";
import { ArrowDown, MoveUpRight, Sparkles } from "lucide-react";
import { assets, home } from "../../data/content";
import Button from "../ui/Button";
import Marquee from "../ui/Marquee";
import styles from "./Hero.module.css";

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease },
  }),
};

export default function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.orbOne} aria-hidden="true" />
        <div className={styles.orbTwo} aria-hidden="true" />

        <div className={`container ${styles.inner}`}>
          <div className={styles.content}>
            <motion.span
              className={styles.eyebrow}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.05}
            >
              <Sparkles size={14} strokeWidth={1.8} />
              {home.hero.eyebrow}
            </motion.span>

            <h1 className={styles.title}>
              <span className={styles.line}>
                <motion.span
                  className={styles.lineInner}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.12 }}
                >
                  Creative
                </motion.span>
              </span>
              <span className={`${styles.line} ${styles.outlineLine}`}>
                <motion.span
                  className={styles.lineInner}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.22 }}
                >
                  Chaos
                </motion.span>
              </span>
            </h1>

            <motion.div
              className={styles.subtitle}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.36}
            >
              <span className={styles.blueWord}>Disruptive Ideas</span>
              <span className={styles.amp}>&amp;</span>
              <span className={styles.tealWord}>Strategic</span>
              <span className={styles.orangeWord}>Execution</span>
            </motion.div>

            <motion.p
              className={styles.support}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.44}
            >
              {home.hero.support}
            </motion.p>

            <motion.div
              className={styles.actions}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.52}
            >
              <Button to="/contact" size="lg">
                {home.hero.primaryCta}
              </Button>
              <Button to="/services" variant="outline" size="lg">
                {home.hero.secondaryCta}
              </Button>
            </motion.div>

            <motion.div
              className={styles.badges}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.6}
            >
              {home.hero.badges.map((badge) => (
                <span key={badge} className={styles.badge}>
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
          >
            <div className={styles.mainFrame}>
              <img
                src={assets.webDesign}
                alt="Web design work by e2e Cyber Solutions"
                width="1400"
                height="1017"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <span className={styles.frameLabel}>Design · Develop · Grow</span>
            </div>

            <motion.div
              className={styles.floatCard}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={assets.digitalMarketing}
                alt=""
                width="1400"
                height="933"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.floatBody}>
                <span className={styles.floatKicker}>Digital Marketing</span>
                <span className={styles.floatTitle}>Strategy to conversion</span>
              </div>
              <span className={styles.floatArrow}>
                <MoveUpRight size={16} strokeWidth={2} />
              </span>
            </motion.div>

            <motion.div
              className={styles.badgeCircle}
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 120 120" className={styles.badgeSvg}>
                <defs>
                  <path
                    id="circlePath"
                    d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  />
                </defs>
                <text>
                  <textPath href="#circlePath">
                    e2e cyber solutions · digital at its core ·
                  </textPath>
                </text>
              </svg>
              <span className={styles.badgeCenter}>e2e</span>
            </motion.div>
          </motion.div>
        </div>

        <div className={`container ${styles.scrollRow}`}>
          <span className={styles.scrollCue}>
            <span className={styles.scrollIcon}>
              <ArrowDown size={15} strokeWidth={1.8} />
            </span>
            Scroll to explore
          </span>
          <span className={styles.heroNote}>Birmingham · United Kingdom</span>
        </div>
      </section>

      <Marquee items={home.marquee} />
    </>
  );
}
