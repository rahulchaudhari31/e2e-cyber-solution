import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "../../data/content";
import Button from "../ui/Button";
import Container from "../ui/Container";
import PillTabs from "../ui/PillTabs";
import SectionHeading from "../ui/SectionHeading";
import styles from "./PackagesSection.module.css";

const ease = [0.16, 1, 0.3, 1];
const MotionLink = motion.create(Link);

const groups = [
  {
    id: "design",
    label: "Design & Development",
    slugs: ["web-design", "web-development", "mobile-apps"],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    slugs: ["digital-marketing", "seo", "ppc-management"],
  },
  {
    id: "video",
    label: "Video",
    slugs: ["branding", "graphic-design", "videos"],
  },
];

const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
const tabItems = groups.map((group) => ({ label: group.label, value: group.id }));

function PackageCard({ service, index, reduced }) {
  const cardRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [5, -5]),
    { stiffness: 180, damping: 22 },
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-6, 6]),
    { stiffness: 180, damping: 22 },
  );

  const handlePointerMove = (event) => {
    if (reduced || event.pointerType !== "mouse" || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className={styles.cardReveal}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -18, scale: 0.98 }}
      transition={{ duration: 0.5, delay: index * 0.075, ease }}
    >
      <MotionLink
        ref={cardRef}
        to={service.route}
        className={styles.card}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        style={
          reduced
            ? undefined
            : {
                rotateX,
                rotateY,
                transformPerspective: 900,
              }
        }
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div className={styles.imageWrap}>
          <img
            src={service.image}
            alt={service.imageAlt || ""}
            loading="lazy"
            decoding="async"
          />
          <span className={styles.cardTag}>{service.groupTitle}</span>
        </div>

        <div className={styles.cardBody}>
          <h3>{service.title}</h3>
          <p>{service.excerpt}</p>
          <div className={styles.cardFoot}>
            <span>
              <Check size={13} strokeWidth={2.4} />
              Tailored to your goals
            </span>
            <span className={styles.cardLink}>
              Explore
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
}

export default function PackagesSection() {
  const [active, setActive] = useState("design");
  const reduced = useReducedMotion();
  const activeGroup = groups.find((group) => group.id === active) ?? groups[0];
  const activeServices = activeGroup.slugs
    .map((slug) => serviceBySlug.get(slug))
    .filter(Boolean);

  return (
    <section id="packages" className={styles.section}>
      <Container>
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Choose your route"
            title="Pick your package."
            description="Three ways to cross the gap. Every package is built around where your business is now and where you want it to go next."
            size="lg"
          />
          <PillTabs
            items={tabItems}
            value={active}
            onChange={setActive}
            ariaLabel="Service packages"
            className={styles.tabs}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeGroup.id}
            className={styles.grid}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeServices.map((service, index) => (
              <PackageCard
                key={service.slug}
                service={service}
                index={index}
                reduced={reduced}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className={styles.footer}>
          <p>Not sure which route fits? We will map it with you.</p>
          <Button to="/services" variant="outline" size="md">
            Compare all services
          </Button>
        </div>
      </Container>
    </section>
  );
}
