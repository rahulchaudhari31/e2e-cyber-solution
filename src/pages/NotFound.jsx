import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Button from "../components/ui/Button";
import Seo from "../components/seo/Seo";
import styles from "./NotFound.module.css";

const ease = [0.16, 1, 0.3, 1];

const quickLinks = [
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className={styles.section}>
      <Seo
        title="404 — Page not found"
        description="The page you are looking for could not be found."
        path={pathname}
        noIndex
      />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orb} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          404 — Page not found
        </motion.span>

        <motion.div
          className={styles.numberWrap}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.08 }}
        >
          <span className={styles.number}>404</span>
          <span className={styles.spark} aria-hidden="true">
            ✦
          </span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.16 }}
        >
          This page took a creative detour.
        </motion.h1>

        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.24 }}
        >
          The page you’re looking for doesn’t exist or has moved. Let’s get you
          back on track.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.32 }}
        >
          <Button to="/" size="lg">
            Back home
          </Button>
          <Button to="/services" variant="outline" size="lg">
            Explore services
          </Button>
        </motion.div>

        <div className={styles.quick}>
          {quickLinks.map((link) => (
            <Link key={link.label} to={link.to} className={styles.quickLink}>
              {link.label}
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
