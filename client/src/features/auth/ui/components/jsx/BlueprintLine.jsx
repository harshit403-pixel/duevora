import styles from "../css/BlueprintLine.module.css";

export default function BlueprintLine({ position }) {
  const className =
    position === "left"
      ? `${styles.line} ${styles.lineLeft}`
      : `${styles.line} ${styles.lineRight}`;

  return <div className={className} aria-hidden="true" />;
}
