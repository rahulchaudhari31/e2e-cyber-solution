import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useCounter from "../../hooks/useCounter";
import { stats } from "../../data/content";
import Container from "../ui/Container";
import GradientBlobs from "../ui/GradientBlobs";
import SectionHeading from "../ui/SectionHeading";
import styles from "./StatsSection.module.css";

const ease = [0.16, 1, 0.3, 1];

function StatValue({ value, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : null;
  const display = useCounter(target ?? 0, {
    duration: 1450,
    enabled: inView && !reduced && target !== null,
  });

  if (target === null || reduced) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {Math.round(display).toLocaleString("en-GB")}
        {match[3]}
      </span>
    </span>
  );
}

export default function StatsSection() {
  const reduced = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Our numbers">
      <div className={styles.gridLines} aria-hidden="true" />
      <div className={styles.ring} aria-hidden="true" />
      <GradientBlobs />

      <Container className={styles.inner}>
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Proof, not promises"
            title="A decade of digital. One connected team."
            description="We have spent ten years joining the dots between design, development, marketing and creative — with real people and measurable outcomes."
            tone="dark"
            size="lg"
          />
          <a className={styles.headLink} href="#work">
            See the work
            <ArrowUpRight size={16} strokeWidth={2} />
          </a>
        </div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              className={styles.stat}
              key={stat.label}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease }}
            >
              <span className={styles.statIndex}>0{index + 1}</span>
              <strong className={styles.value}>
                <StatValue value={stat.value} reduced={reduced} />
              </strong>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className={styles.foot}>
          <span>Independent studio</span>
          <span>Birmingham, UK</span>
          <span>Design. Build. Grow.</span>
        </div>
      </Container>
    </section>
  );
}
