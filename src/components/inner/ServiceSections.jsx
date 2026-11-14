import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Quote } from "lucide-react";
import { testimonials, processSteps } from "../../data/content";
import { placeholderImages } from "../../data/placeholders";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import TestimonialCarousel from "../ui/TestimonialCarousel";
import styles from "./ServiceSections.module.css";

const ease = [0.16, 1, 0.3, 1];

const processImages = {
  Strategy: placeholderImages.processStrategy,
  Design: placeholderImages.processDesign,
  Develop: placeholderImages.processDevelopment,
  Marketing: placeholderImages.processMarketing,
  Creative: placeholderImages.processCreative,
};

const carouselItems = testimonials.map((item, index) => ({
  ...item,
  avatar: placeholderImages.testimonialAvatars[index % 4].src,
}));

export function ServiceStory({ service, subServices = [] }) {
  return (
    <section className={`section ${styles.story}`}>
      <Container className={styles.storyGrid}>
        <Reveal className={styles.storyAside} y={22}>
          <span className={styles.kicker}>Overview</span>
          <h2>{service.highlightsTitle || "What this looks like."}</h2>
          <p>{service.excerpt}</p>

          <div className={styles.storyTags}>
            <span>
              <Check size={13} strokeWidth={2.4} />
              Strategy-led
            </span>
            <span>
              <Check size={13} strokeWidth={2.4} />
              Built to last
            </span>
            <span>
              <Check size={13} strokeWidth={2.4} />
              Measured &amp; optimised
            </span>
          </div>
        </Reveal>

        <div className={styles.storyBody}>
          {service.body.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 36)} delay={index * 0.04} y={18}>
              <p className={index === 0 ? styles.lead : styles.paragraph}>
                {paragraph}
              </p>
            </Reveal>
          ))}

          {subServices.length ? (
            <Reveal className={styles.subServices} delay={0.08}>
              <span className={styles.subLabel}>Explore this service group</span>
              <div className={styles.subGrid}>
                {subServices.map((item, index) => (
                  <Link key={item.slug} to={item.to} className={styles.subLink}>
                    <span className={styles.subIndex}>0{index + 1}</span>
                    <span>{item.title}</span>
                    <ArrowUpRight size={15} strokeWidth={1.9} />
                  </Link>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function FeatureGrid({
  eyebrow = "What's included",
  title,
  description,
  items = [],
}) {
  const reduced = useReducedMotion();

  return (
    <section className={`section ${styles.features}`}>
      <Container>
        <div className={styles.featureHead}>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Button to="/contact" variant="outline">
            Talk to our team
          </Button>
        </div>

        <div className={styles.featureGrid}>
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className={styles.featureCard}
                initial={reduced ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: (index % 3) * 0.07,
                  ease,
                }}
              >
                <div className={styles.featureTop}>
                  <span className={styles.featureIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {Icon ? (
                    <span className={styles.featureIcon}>
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                  ) : null}
                </div>
                <h3>{item.title}</h3>
                {item.text ? <p>{item.text}</p> : null}
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className={`section ${styles.processSection}`}>
      <Container>
        <div className={styles.processPanel}>
          <div className={styles.processHead}>
            <SectionHeading
              eyebrow="How we work"
              title="From strategy to creative."
              description="A connected process that moves your brand from first thought to lasting impression."
              tone="dark"
            />
            <span className={styles.processCount}>05 connected stages</span>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step, index) => {
              const image = processImages[step.title];

              return (
                <Reveal
                  key={step.number}
                  className={styles.processCard}
                  delay={(index % 3) * 0.06}
                  y={24}
                >
                  <div className={styles.processMedia}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.processNumber}>{step.number}</span>
                  </div>
                  <div className={styles.processBody}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsBand() {
  return (
    <section className={`section ${styles.testimonialSection}`}>
      <Container className={styles.testimonialGrid}>
        <div className={styles.testimonialCopy}>
          <span className={styles.kicker}>Testimonials</span>
          <h2>What our clients say.</h2>
          <p>
            Real feedback, in their own words, from clients we have partnered
            with.
          </p>

          <div className={styles.quoteMark} aria-hidden="true">
            <Quote size={25} strokeWidth={1.7} />
          </div>

          <div className={styles.clientLine}>
            {carouselItems.map((item) => (
              <span key={item.name} title={item.name}>
                <img
                  src={item.avatar}
                  alt=""
                  width={82}
                  height={82}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            ))}
            <small>Trusted by brands across the Midlands and beyond.</small>
          </div>
        </div>

        <Reveal className={styles.testimonialCard} y={28}>
          <div className={styles.testimonialOrb} aria-hidden="true" />
          <TestimonialCarousel items={carouselItems} />
        </Reveal>
      </Container>
    </section>
  );
}
