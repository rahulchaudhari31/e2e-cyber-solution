import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import styles from "./TestimonialCarousel.module.css";

const ease = [0.16, 1, 0.3, 1];

export default function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const testimonial = items[index];

  const go = (direction) => {
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) return items.length - 1;
      if (next >= items.length) return 0;
      return next;
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <span className={styles.quoteIcon} aria-hidden="true">
          <Quote size={22} strokeWidth={1.6} />
        </span>
        <span className={styles.counter}>
          {String(index + 1).padStart(2, "0")}
          <span className={styles.slash}> / </span>
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={testimonial.name}
            className={styles.quote}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease }}
          >
            “{testimonial.quote}”
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className={styles.footer}>
        <div className={styles.person}>
          <img
            src={testimonial.avatar}
            alt=""
            className={styles.avatar}
            width="52"
            height="52"
            loading="lazy"
          />
          <div>
            <p className={styles.name}>{testimonial.name}</p>
            <p className={styles.role}>Client testimonial</p>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={() => go(1)}
            aria-label="Next testimonial"
          >
            <ArrowRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Testimonials">
        {items.map((item, dotIndex) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={dotIndex === index}
            aria-label={`Show testimonial from ${item.name}`}
            className={`${styles.dot} ${dotIndex === index ? styles.dotActive : ""}`}
            onClick={() => setIndex(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}
