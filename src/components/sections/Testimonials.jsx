import { testimonials } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import TestimonialCarousel from "../ui/TestimonialCarousel";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={`section ${styles.section}`} id="testimonials">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <SectionHeading
              eyebrow="Testimonials"
              title="What our clients say."
              description="Words from the businesses and brands we have worked with."
            />

            <Reveal className={styles.note} delay={0.12}>
              <span className={styles.noteLine} />
              <p>
                Real feedback, in their own words, from clients we have
                partnered with.
              </p>
            </Reveal>
          </div>

          <Reveal className={styles.right} delay={0.08} y={30}>
            <div className={styles.card}>
              <div className={styles.orb} aria-hidden="true" />
              <TestimonialCarousel items={testimonials} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
