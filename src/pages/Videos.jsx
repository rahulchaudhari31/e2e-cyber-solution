import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import ServiceHero from "../components/inner/ServiceHero";
import VideoModal, {
  DUMMY_VIDEO_SOURCE,
} from "../components/inner/VideoModal";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import HomeCTA from "../components/home/HomeCTA";
import Seo from "../components/seo/Seo";
import { getGroupBySlug, getServiceBySlug, site } from "../data/content";
import { placeholderImages } from "../data/placeholders";
import styles from "./Videos.module.css";

const ease = [0.16, 1, 0.3, 1];

const service = getServiceBySlug("videos");
const group = getGroupBySlug("creative");

const films = [
  {
    title: "Brand Story",
    category: "Brand film",
    description:
      "A brand-led film shaped to make your audience understand and feel your story.",
    poster: placeholderImages.videoPosters[0],
    note: "Placeholder film 01 — replace with an e2e brand film.",
  },
  {
    title: "Campaign Film",
    category: "Campaign",
    description:
      "Compelling video content built to hold attention and give your campaign a reason to be watched.",
    poster: placeholderImages.videoPosters[1],
    note: "Placeholder film 02 — replace with an e2e campaign film.",
  },
  {
    title: "Product Story",
    category: "Product",
    description:
      "Product-led storytelling that makes the value clear without losing the feeling.",
    poster: placeholderImages.videoPosters[2],
    note: "Placeholder film 03 — replace with an e2e product film.",
  },
  {
    title: "Social Cutdowns",
    category: "Social",
    description:
      "Short-form edits designed for the pace, format and behaviour of social platforms.",
    poster: placeholderImages.videoPosters[3],
    note: "Placeholder film 04 — replace with e2e social edits.",
  },
];

function VideoHeroVisual({ onPlay }) {
  const reduced = useReducedMotion();

  return (
    <div className={styles.showreelStage}>
      <motion.button
        type="button"
        className={styles.showreel}
        onClick={onPlay}
        initial={reduced ? false : { opacity: 0, scale: 0.94, rotate: 1.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease }}
        aria-label="Play the e2e showreel"
      >
        <img
          src={placeholderImages.videoPosters[0].src}
          alt={placeholderImages.videoPosters[0].alt}
          width={placeholderImages.videoPosters[0].width}
          height={placeholderImages.videoPosters[0].height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <span className={styles.showreelShade} />
        <span className={styles.playLarge}>
          <Play size={25} fill="currentColor" strokeWidth={0} />
        </span>
        <span className={styles.showreelLabel}>Showreel</span>
        <span className={styles.showreelCaption}>
          <span>Watch the work</span>
          <ArrowUpRight size={15} strokeWidth={2} />
        </span>
      </motion.button>

      <motion.div
        className={styles.reelCard}
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>Film &amp; video</span>
        <strong>Made to be felt.</strong>
        <small>Brand · Campaign · Social</small>
      </motion.div>
    </div>
  );
}

export default function Videos() {
  const [activeFilm, setActiveFilm] = useState(null);

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.groupTitle,
    description: service.excerpt,
    url: `${site.url}${service.route}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "City", name: site.address.city },
  };

  return (
    <>
      <Seo
        title="Videos"
        description={service.excerpt}
        path="/videos"
        jsonLd={videoSchema}
      />
      <ServiceHero
        service={service}
        group={group}
        accent="clay"
        visual={
          <VideoHeroVisual
            onPlay={() =>
              setActiveFilm({ ...films[0], src: DUMMY_VIDEO_SOURCE })
            }
          />
        }
        tags={["Concept development", "Brand storytelling", "Video content"]}
      />

      <section className={`section ${styles.intro}`}>
        <Container className={styles.introGrid}>
          <div className={styles.introCopy}>
            <SectionHeading
              eyebrow="Video marketing"
              title="Make your audience feel the story."
            />
            {service.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 30)} delay={index * 0.05} y={16}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.introCard} y={26}>
            <span className={styles.introLabel}>What we create</span>
            <ul>
              {service.highlights.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              A low-key focus for many businesses, but a valuable way to build
              loyalty that translates into sales.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className={`section ${styles.work}`}>
        <Container>
          <div className={styles.workHead}>
            <SectionHeading
              eyebrow="Selected work"
              title="Films made to be felt."
              description="Placeholder cards below stand in for the final e2e showreel, brand films and social edits."
            />
            <span className={styles.workCount}>04 placeholder films</span>
          </div>

          <div className={styles.videoGrid}>
            {films.map((film, index) => (
              <Reveal
                key={film.title}
                className={styles.videoCard}
                delay={(index % 2) * 0.08}
                y={24}
              >
                <button
                  type="button"
                  className={styles.videoButton}
                  onClick={() =>
                    setActiveFilm({ ...film, src: DUMMY_VIDEO_SOURCE })
                  }
                  aria-label={`Play ${film.title}`}
                >
                  <div className={styles.poster}>
                    <img
                      src={film.poster.src}
                      alt=""
                      width={film.poster.width}
                      height={film.poster.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className={styles.posterShade} />
                    <span className={styles.categoryChip}>
                      {film.category}
                    </span>
                    <span className={styles.playSmall}>
                      <Play
                        size={17}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    </span>
                    <span className={styles.cardNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={styles.videoBody}>
                    <div>
                      <h3>{film.title}</h3>
                      <p>{film.description}</p>
                    </div>
                    <span className={styles.videoArrow}>
                      <ArrowUpRight size={18} strokeWidth={1.8} />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <p className={styles.placeholderNote}>
            Placeholder media — every card opens a dummy player. Replace the
            posters and video source with the final client films before launch.
          </p>
        </Container>
      </section>

      <HomeCTA />

      <VideoModal
        video={activeFilm}
        onClose={() => setActiveFilm(null)}
      />
    </>
  );
}
