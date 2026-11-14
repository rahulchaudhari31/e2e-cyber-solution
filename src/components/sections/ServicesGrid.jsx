import { home } from "../../data/content";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "../ui/ServiceCard";
import styles from "./ServicesGrid.module.css";

export default function ServicesGrid() {
  return (
    <section className={`section ${styles.section}`} id="services">
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            eyebrow={home.featured.eyebrow}
            title={home.featured.title}
            description={home.featured.description}
          />
          <Button to="/services" variant="outline" className={styles.headCta}>
            {home.featured.cta}
          </Button>
        </div>

        <div className={styles.grid}>
          {home.featured.services.map((service, index) => (
            <Reveal
              key={service.title}
              className={styles.cell}
              delay={(index % 3) * 0.08}
              y={24}
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
