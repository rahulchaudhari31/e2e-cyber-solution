import { about, home, stats } from "../../data/content";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.top}>
          <Reveal className={styles.eyebrowCol}>
            <span className={styles.eyebrow}>{home.intro.eyebrow}</span>
          </Reveal>

          <Reveal className={styles.titleCol} delay={0.06}>
            <h2 className={styles.title}>{home.intro.title}</h2>
          </Reveal>
        </div>

        <div className={styles.bottom}>
          <Reveal className={styles.copy} delay={0.1}>
            <p className={styles.paragraph}>{home.intro.body}</p>
            <p className={styles.paragraphMuted}>
              {about.story.title}
            </p>
            <Button to="/about" variant="ghost">
              {home.intro.cta}
            </Button>
          </Reveal>

          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <Reveal
                key={stat.value}
                className={styles.stat}
                delay={0.08 * index}
                y={20}
              >
                <span className={styles.statIndex}>0{index + 1}</span>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
