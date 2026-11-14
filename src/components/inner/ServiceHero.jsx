import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import styles from "./ServiceHero.module.css";

const ease = [0.16, 1, 0.3, 1];

export default function ServiceHero({
  service,
  group,
  visual,
  tags = [],
  accent = "blue",
}) {
  const reduced = useReducedMotion();

  return (
    <section className={`${styles.hero} ${styles[accent]}`}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.copy}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span aria-current="page">{service.title}</span>
          </nav>

          <motion.span
            className={styles.eyebrow}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <Sparkles size={13} strokeWidth={1.9} />
            {group.title}
          </motion.span>

          <motion.h1
            className={styles.title}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06, ease }}
          >
            {service.title}
          </motion.h1>

          <motion.p
            className={styles.tagline}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.15, ease }}
          >
            {service.tagline}
          </motion.p>

          <motion.p
            className={styles.excerpt}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.23, ease }}
          >
            {service.excerpt}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease }}
          >
            <Button to="/contact" size="lg">
              Start a project
            </Button>
            <Button to="/portfolio" variant="outline" size="lg">
              See our work
            </Button>
          </motion.div>

          {tags.length ? (
            <motion.ul
              className={styles.tags}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease }}
            >
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </motion.ul>
          ) : null}
        </div>

        <div className={styles.visual}>{visual}</div>
      </Container>
    </section>
  );
}
