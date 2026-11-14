import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import HomeCTA from "../components/home/HomeCTA";
import Seo from "../components/seo/Seo";
import {
  getServiceBySlug,
  home,
  serviceGroups,
  site,
} from "../data/content";
import { placeholderImages } from "../data/placeholders";
import styles from "./Services.module.css";

const ease = [0.16, 1, 0.3, 1];

const groupImages = {
  "design-and-development": placeholderImages.processDevelopment,
  "digital-marketing": placeholderImages.marketingDashboard,
  creative: placeholderImages.processCreative,
};

const groupAnchors = {
  "design-and-development": "design-and-development",
  "digital-marketing": "digital-marketing",
  creative: "creative",
};

const groupAccents = {
  "design-and-development": "blue",
  "digital-marketing": "clay",
  creative: "meadow",
};

export default function Services() {
  const reduced = useReducedMotion();
  const [openKey, setOpenKey] = useState("web-development");
  const [activeGroup, setActiveGroup] = useState(
    serviceGroups[0]?.slug || "",
  );
  const groupRefs = useRef({});

  useEffect(() => {
    const nodes = Object.entries(groupRefs.current).filter(
      ([, node]) => node,
    );

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveGroup(visible[0].target.id);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.12, 0.3, 0.55],
      },
    );

    nodes.forEach(([, node]) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Seo
        title="Services"
        description="Design, development, digital marketing and creative services from e2e Cyber Solutions."
        path="/services"
      />
      <PageHero
        eyebrow="What we do"
        title="Services"
        subtitle="Comprehensive digital and creative marketing strategies and services."
          image={placeholderImages.servicesHero.src}
          imageAlt={placeholderImages.servicesHero.alt}
          imageWidth={placeholderImages.servicesHero.width}
          imageHeight={placeholderImages.servicesHero.height}
        breadcrumbs={[{ label: "Services" }]}
      >
        <Button to="/contact">Start a project</Button>
        <Button to="/portfolio" variant="outline">
          See our work
        </Button>
      </PageHero>

      <section className={`section ${styles.intro}`}>
        <Container>
          <SectionHeading
            eyebrow={home.featured.eyebrow}
            title={home.featured.title}
            description={home.featured.description}
          />

          <div className={styles.overviewGrid}>
            {serviceGroups.map((group, index) => {
              const image = groupImages[group.slug];

              return (
                <motion.article
                  key={group.slug}
                  className={`${styles.overviewCard} ${styles[groupAccents[group.slug]]}`}
                  initial={reduced ? false : { opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease }}
                  whileHover={reduced ? undefined : { y: -5 }}
                >
                  <a
                    href={`#${groupAnchors[group.slug]}`}
                    className={styles.overviewLink}
                  >
                    <div className={styles.overviewMedia}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.overviewIndex}>
                        0{index + 1}
                      </span>
                    </div>
                    <div className={styles.overviewBody}>
                      <span className={styles.overviewCount}>
                        {group.services.length} services
                      </span>
                      <h2>{group.title}</h2>
                      <p>{group.description}</p>
                      <span className={styles.overviewArrow}>
                        Explore
                        <ArrowUpRight size={15} strokeWidth={1.9} />
                      </span>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={`section ${styles.directory}`}>
        <Container className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sticky}>
              <span className={styles.sideLabel}>Browse services</span>
              <nav className={styles.sideNav} aria-label="Service groups">
                {serviceGroups.map((group) => (
                  <a
                    key={group.slug}
                    href={`#${groupAnchors[group.slug]}`}
                    className={
                      activeGroup === groupAnchors[group.slug]
                        ? `${styles.sideLink} ${styles.sideLinkActive}`
                        : styles.sideLink
                    }
                  >
                    <span>{group.title}</span>
                    <small>{group.services.length}</small>
                  </a>
                ))}
              </nav>

              <div className={styles.sideCard}>
                <span>Need a hand?</span>
                <p>Talk to the team about the right mix for your business.</p>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
                <Button to="/contact" variant="light" size="sm">
                  Start a project
                </Button>
              </div>
            </div>
          </aside>

          <div className={styles.directoryMain}>
            {serviceGroups.map((group, groupIndex) => (
              <section
                key={group.slug}
                id={groupAnchors[group.slug]}
                ref={(node) => {
                  groupRefs.current[groupAnchors[group.slug]] = node;
                }}
                className={styles.group}
              >
                <div className={styles.groupHead}>
                  <span className={styles.groupIndex}>
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2>{group.title}</h2>
                    <p>{group.description}</p>
                  </div>
                </div>

                <div className={styles.accordion}>
                  {group.services.map((item, index) => {
                    const service = getServiceBySlug(item.slug);
                    const isOpen = openKey === item.slug;
                    const panelId = `service-panel-${item.slug}`;

                    return (
                      <article
                        key={item.slug}
                        className={
                          isOpen
                            ? `${styles.accordionItem} ${styles.accordionItemOpen}`
                            : styles.accordionItem
                        }
                      >
                        <button
                          type="button"
                          className={styles.trigger}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() =>
                            setOpenKey(isOpen ? "" : item.slug)
                          }
                        >
                          <span className={styles.itemIndex}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className={styles.itemTitle}>
                            {service?.title || item.title}
                          </span>
                          <span className={styles.itemIcon}>
                            {isOpen ? (
                              <Minus size={17} strokeWidth={1.9} />
                            ) : (
                              <Plus size={17} strokeWidth={1.9} />
                            )}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              id={panelId}
                              className={styles.panel}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease }}
                            >
                              <div className={styles.panelInner}>
                                <p>
                                  {service?.body[0] ||
                                    service?.excerpt ||
                                    group.description}
                                </p>
                                <Link
                                  to={item.to}
                                  className={styles.panelLink}
                                >
                                  Explore {service?.title || item.title}
                                  <ArrowUpRight
                                    size={15}
                                    strokeWidth={1.9}
                                  />
                                </Link>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <HomeCTA />
    </>
  );
}
