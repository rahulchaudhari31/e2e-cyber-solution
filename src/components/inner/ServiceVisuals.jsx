import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, BarChart3, MousePointerClick, Smartphone } from "lucide-react";
import styles from "./ServiceVisuals.module.css";

const ease = [0.16, 1, 0.3, 1];

export function BrowserMockup({ image }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 10%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2.4, -1.2]);

  return (
    <motion.div
      ref={ref}
      className={styles.browserStage}
      style={reduced ? undefined : { y, rotate }}
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease }}
    >
      <div className={styles.browser}>
        <div className={styles.browserBar}>
          <span />
          <span />
          <span />
          <small>e2ecybersolutions.com</small>
        </div>
        <div className={styles.browserScreen}>
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className={styles.browserOverlay}>
            <span className={styles.browserKicker}>Web design</span>
            <strong>Built around your brand.</strong>
            <span className={styles.browserLine} />
            <span className={styles.browserLineShort} />
          </div>
        </div>
      </div>

      <motion.div
        className={styles.floatingStat}
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className={styles.statIcon}>
          <MousePointerClick size={17} strokeWidth={1.9} />
        </span>
        <span>
          <small>User journey</small>
          <strong>Clear &amp; responsive</strong>
        </span>
      </motion.div>

      <span className={styles.floatingLabel}>Every screen. One brand.</span>
    </motion.div>
  );
}

export function PhoneMockup({ primary, secondary }) {
  const reduced = useReducedMotion();

  return (
    <div className={styles.phoneStage}>
      <motion.div
        className={`${styles.phone} ${styles.phoneBack}`}
        initial={reduced ? false : { opacity: 0, x: 42, rotate: 12 }}
        whileInView={{ opacity: 1, x: 0, rotate: 8 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, delay: 0.08, ease }}
      >
        <span className={styles.phoneNotch} />
        <img
          src={secondary.src}
          alt={secondary.alt}
          width={secondary.width}
          height={secondary.height}
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      <motion.div
        className={`${styles.phone} ${styles.phoneFront}`}
        initial={reduced ? false : { opacity: 0, y: 44, rotate: -8 }}
        whileInView={{ opacity: 1, y: 0, rotate: -4 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease }}
      >
        <span className={styles.phoneNotch} />
        <img
          src={primary.src}
          alt={primary.alt}
          width={primary.width}
          height={primary.height}
          loading="eager"
          decoding="async"
        />
      </motion.div>

      <motion.div
        className={styles.phoneTag}
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Smartphone size={17} strokeWidth={1.9} />
        Native, hybrid, responsive
      </motion.div>
    </div>
  );
}

const chart = [42, 68, 54, 86, 73, 96];

export function MarketingMockup({ image }) {
  const reduced = useReducedMotion();

  return (
    <div className={styles.marketingStage}>
      <motion.div
        className={styles.dashboard}
        initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease }}
      >
        <div className={styles.dashHead}>
          <span>
            <BarChart3 size={17} strokeWidth={1.9} />
            Campaign overview
          </span>
          <small>Live</small>
        </div>

        <div className={styles.kpis}>
          <div>
            <small>Reach</small>
            <strong>128k</strong>
            <span>+24%</span>
          </div>
          <div>
            <small>Engagement</small>
            <strong>8.6%</strong>
            <span>+3.1%</span>
          </div>
          <div>
            <small>Conversions</small>
            <strong>1,204</strong>
            <span>+18%</span>
          </div>
        </div>

        <div className={styles.chart}>
          {chart.map((height, index) => (
            <motion.span
              key={height}
              style={{ height: `${height}%` }}
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.07, ease }}
            />
          ))}
        </div>

        <div className={styles.channelRow}>
          <span>Organic search</span>
          <span className={styles.channelBar}>
            <i />
          </span>
          <strong>42%</strong>
        </div>
        <div className={styles.channelRow}>
          <span>Paid social</span>
          <span className={styles.channelBar}>
            <i className={styles.channelBarAlt} />
          </span>
          <strong>31%</strong>
        </div>
      </motion.div>

      <motion.figure
        className={styles.marketingPhoto}
        initial={reduced ? false : { opacity: 0, x: 26, rotate: 4 }}
        whileInView={{ opacity: 1, x: 0, rotate: 2 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, delay: 0.16, ease }}
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <span>Strategy in motion</span>
          <ArrowUpRight size={14} strokeWidth={2} />
        </figcaption>
      </motion.figure>
    </div>
  );
}

export function AbstractServiceVisual({ image, label }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={styles.abstract}
      initial={reduced ? false : { opacity: 0, scale: 0.95, rotate: 1.5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, ease }}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="eager"
        decoding="async"
      />
      <div className={styles.abstractShade} />
      <div className={styles.abstractCard}>
        <span>{label}</span>
        <strong>Designed, built and growing together.</strong>
      </div>
      <span className={styles.abstractBadge}>e2e</span>
    </motion.div>
  );
}
