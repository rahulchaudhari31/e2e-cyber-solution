import { Mail, MapPin, Phone } from "lucide-react";
import { home, site } from "../../data/content";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <Reveal className={styles.panel} y={34}>
          <span className={styles.ghost} aria-hidden="true">
            e2e
          </span>
          <div className={styles.orbOne} aria-hidden="true" />
          <div className={styles.orbTwo} aria-hidden="true" />

          <div className={styles.content}>
            <span className={styles.eyebrow}>{home.cta.eyebrow}</span>
            <h2 className={styles.title}>{home.cta.title}</h2>
            <p className={styles.body}>{home.cta.body}</p>
            <p className={styles.body}>{home.cta.bodyTwo}</p>

            <div className={styles.actions}>
              <Button to="/contact" variant="light" size="lg">
                {home.cta.cta}
              </Button>
              <a href={site.phoneHref} className={styles.callLink}>
                <span className={styles.callIcon}>
                  <Phone size={16} strokeWidth={1.8} />
                </span>
                {site.phone}
              </a>
            </div>
          </div>

          <div className={styles.side}>
            <div className={styles.contactList}>
              <a href={site.phoneHref} className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <Phone size={16} strokeWidth={1.8} />
                </span>
                <span>
                  <span className={styles.contactLabel}>Call Us</span>
                  {site.phone}
                </span>
              </a>
              <a href={site.emailHref} className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <Mail size={16} strokeWidth={1.8} />
                </span>
                <span>
                  <span className={styles.contactLabel}>Write Us</span>
                  {site.email}
                </span>
              </a>
              <div className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <MapPin size={16} strokeWidth={1.8} />
                </span>
                <span>
                  <span className={styles.contactLabel}>Visit Us</span>
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.postcode}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
