import styles from "./LogoMarquee.module.css";

const platforms = [
  "React",
  "WordPress",
  "Shopify",
  "Webflow",
  "HubSpot",
  "GA4",
  "Meta",
  "Google Ads",
  "Vercel",
  "Figma",
];

export default function LogoMarquee({
  label = "Platforms we build and market with",
}) {
  return (
    <section className={styles.section} aria-label={label}>
      <div className={`container ${styles.head}`}>
        <span>{label}</span>
        <span aria-hidden="true">No badges. Just the tools we use.</span>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1, 2].map((copy) => (
            <div className={styles.group} key={copy} aria-hidden={copy > 0}>
              {platforms.map((platform) => (
                <span className={styles.mark} key={`${copy}-${platform}`}>
                  <span className={styles.dot} aria-hidden="true" />
                  {platform}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
