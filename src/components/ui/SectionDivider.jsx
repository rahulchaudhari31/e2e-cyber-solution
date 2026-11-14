import styles from "./SectionDivider.module.css";

const paths = {
  wave:
    "M0,72 C180,18 360,118 540,74 C720,30 900,116 1080,72 C1200,42 1320,66 1440,48 L1440,120 L0,120 Z",
  torn:
    "M0,96 L38,82 L76,100 L112,72 L158,92 L204,68 L246,88 L292,62 L338,84 L384,58 L430,82 L478,60 L522,90 L568,66 L614,86 L660,58 L706,80 L752,56 L798,84 L844,62 L890,92 L936,70 L982,88 L1028,60 L1074,84 L1120,66 L1166,90 L1212,64 L1258,86 L1304,58 L1350,82 L1396,66 L1440,84 L1440,120 L0,120 Z",
  curve:
    "M0,96 C240,14 480,118 720,68 C960,18 1200,112 1440,44 L1440,120 L0,120 Z",
};

export default function SectionDivider({
  from = "var(--cream)",
  to = "var(--navy)",
  variant = "wave",
  flip = false,
  height,
  className = "",
}) {
  const path = paths[variant] || paths.wave;
  const style = {
    background: from,
    ...(height
      ? {
          "--divider-height":
            typeof height === "number" ? `${height}px` : height,
        }
      : {}),
  };

  return (
    <div
      className={`${styles.divider} ${flip ? styles.flip : ""} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        focusable="false"
        role="presentation"
      >
        <path className={styles.underlay} d={path} fill={to} />
        <path d={path} fill={to} />
      </svg>
    </div>
  );
}
