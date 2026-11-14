import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ImageReveal from "./ImageReveal";
import Reveal from "./Reveal";
import styles from "./PageHero.module.css";

const ease = [0.16, 1, 0.3, 1];

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  imageWidth,
  imageHeight,
  breadcrumbs = [],
  accent = "blue",
  children,
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={`${styles.blob} ${styles[accent]}`} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          {breadcrumbs.length ? (
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {breadcrumbs.map((crumb) => (
                <span key={crumb.label}>
                  <span className={styles.sep}>/</span>
                  {crumb.to ? (
                    <Link to={crumb.to}>{crumb.label}</Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          {eyebrow ? (
            <Reveal>
              <span className={styles.eyebrow}>{eyebrow}</span>
            </Reveal>
          ) : null}

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
          >
            {title}
          </motion.h1>

          {subtitle ? (
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.16 }}
            >
              {subtitle}
            </motion.p>
          ) : null}

          {children ? (
            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.26 }}
            >
              {children}
            </motion.div>
          ) : null}
        </div>

        {image ? (
          <motion.div
            className={styles.media}
            initial={{ opacity: 0, scale: 0.96, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease, delay: 0.12 }}
          >
            <div className={`${styles.mediaAccent} ${styles[accent]}`} />
            <span className={styles.orbit} aria-hidden="true">
              e2e
            </span>
            <div className={styles.imageFrame}>
              <ImageReveal className={styles.imageReveal} delay={0.18}>
                <img
                  src={image}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </ImageReveal>
              <span className={styles.tag}>
                <ArrowUpRight size={15} strokeWidth={2} />
                e2e Cyber Solutions
              </span>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
