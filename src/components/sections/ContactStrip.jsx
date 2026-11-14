import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "../../data/content";
import Reveal from "../ui/Reveal";
import styles from "./ContactStrip.module.css";

const items = [
  {
    label: "Call Us",
    value: site.phone,
    href: site.phoneHref,
    icon: Phone,
  },
  {
    label: "Write Us",
    value: site.email,
    href: site.emailHref,
    icon: Mail,
  },
  {
    label: "Visit Us",
    value: `${site.address.line1}, ${site.address.city}, ${site.address.postcode}`,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`,
    icon: MapPin,
    external: true,
  },
];

export default function ContactStrip() {
  return (
    <section className={`section--tight ${styles.section}`} id="contact">
      <div className="container">
        <div className={styles.grid}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.label}
                className={styles.cell}
                delay={index * 0.08}
                y={22}
              >
                <a
                  href={item.href}
                  className={styles.card}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  <span className={styles.icon}>
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                  <span className={styles.body}>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.value}>{item.value}</span>
                  </span>
                  <span className={styles.arrow}>
                    <ArrowUpRight size={17} strokeWidth={1.8} />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
