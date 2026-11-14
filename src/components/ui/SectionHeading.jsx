import { motion, useReducedMotion } from "framer-motion";
import styles from "./SectionHeading.module.css";

const ease = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.06,
    },
  },
};

const word = {
  hidden: { y: "115%" },
  show: {
    y: 0,
    transition: { duration: 0.78, ease },
  },
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  size = "md",
  index,
  className = "",
  children,
}) {
  const reduced = useReducedMotion();
  const words = typeof title === "string" ? title.split(" ") : [];

  const classes = [
    styles.wrap,
    styles[align],
    styles[size],
    tone === "dark" ? styles.dark : tone === "yellow" ? styles.yellow : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className={styles.top}>
        {eyebrow ? (
          <motion.span
            className={styles.eyebrow}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease }}
          >
            {index ? <span className={styles.index}>{index}</span> : null}
            {eyebrow}
          </motion.span>
        ) : null}
      </div>

      {title ? (
        <h2
          className={styles.title}
          aria-label={typeof title === "string" ? title : undefined}
        >
          {typeof title === "string" ? (
            <motion.span
              className={styles.titleInner}
              variants={container}
              initial={reduced ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              {words.map((item, wordIndex) => (
                <span
                  className={styles.word}
                  key={`${item}-${wordIndex}`}
                  aria-hidden="true"
                >
                  <motion.span
                    className={styles.wordInner}
                    variants={reduced ? undefined : word}
                  >
                    {item}
                    {wordIndex < words.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          ) : (
            title
          )}
        </h2>
      ) : null}

      {description ? (
        <motion.p
          className={styles.description}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
        >
          {description}
        </motion.p>
      ) : null}

      {children ? <div className={styles.actions}>{children}</div> : null}
    </div>
  );
}
