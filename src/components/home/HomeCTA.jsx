import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { home, site } from "../../data/content";
import Container from "../ui/Container";
import GradientBlobs from "../ui/GradientBlobs";
import styles from "./HomeCTA.module.css";

const MotionLink = motion.create(Link);

export default function HomeCTA() {
  const reduced = useReducedMotion();

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.banner}>
          <GradientBlobs />
          <div className={styles.rings} aria-hidden="true">
            <span />
            <span />
          </div>

          <div className={styles.copy}>
            <span className={styles.eyebrow}>{home.cta.eyebrow}</span>
            <h2>Let’s get you started.</h2>
            <p>{home.cta.body}</p>
            <div className={styles.contactLine}>
              <a href={site.phoneHref}>
                <Phone size={14} strokeWidth={2} />
                {site.phoneDisplay}
              </a>
              <a href={site.emailHref}>{site.email}</a>
            </div>
          </div>

          <div className={styles.action}>
            <span className={`${styles.tag} ${styles.tagOne}`}>Your business</span>
            <span className={`${styles.tag} ${styles.tagTwo}`}>Your audience</span>
            <MotionLink
              to="/contact"
              className={styles.bigButton}
              whileHover={reduced ? undefined : { scale: 1.04, rotate: -2 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <span>Let’s talk</span>
              <ArrowUpRight size={24} strokeWidth={1.8} />
            </MotionLink>
            <span className={styles.note}>Usually replies within one working day</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
