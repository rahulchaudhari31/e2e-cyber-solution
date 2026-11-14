import styles from "./Tag.module.css";

export default function Tag({
  as: TagName = "span",
  tone = "navy",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = [styles.tag, styles[tone], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <TagName className={classes} {...props}>
      {children}
    </TagName>
  );
}
