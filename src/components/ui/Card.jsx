import styles from "./Card.module.css";

export default function Card({
  as: Tag = "div",
  tone = "light",
  padding = "md",
  hover = false,
  className = "",
  children,
  ...props
}) {
  const classes = [
    styles.card,
    styles[tone],
    styles[padding],
    hover ? styles.hover : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
