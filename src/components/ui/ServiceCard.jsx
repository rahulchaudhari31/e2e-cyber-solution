import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useTilt from "../../hooks/useTilt";
import ServiceIcon from "./ServiceIcon";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ service }) {
  const { title, description, to, icon, accent = "blue", index } = service;
  const reduced = useReducedMotion();
  const {
    ref: cardRef,
    onPointerMove,
    onPointerLeave,
  } = useTilt({ disabled: reduced });

  return (
    <Link
      ref={cardRef}
      to={to}
      className={`${styles.card} ${styles[accent]}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={styles.top}>
        <span className={styles.icon}>
          <ServiceIcon name={icon} size={22} strokeWidth={1.8} />
        </span>
        {index ? <span className={styles.index}>{index}</span> : null}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <span className={styles.arrow} aria-hidden="true">
        <ArrowUpRight size={19} strokeWidth={1.8} />
      </span>
    </Link>
  );
}
