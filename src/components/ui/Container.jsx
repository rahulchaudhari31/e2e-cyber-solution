import styles from "./Container.module.css";

export default function Container({
  as: Tag = "div",
  size = "default",
  className = "",
  children,
  ...props
}) {
  const classes = [styles.base, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
