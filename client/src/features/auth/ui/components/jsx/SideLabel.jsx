import styles from "../css/SideLabel.module.css";

export default function SideLabel({ position, children }) {
  const className =
    position === "top"
      ? `${styles.sideLabel} ${styles.sideLabelTop}`
      : `${styles.sideLabel} ${styles.sideLabelBottom}`;

  return (
    <div className={className}>
      {children}
      {position === "bottom" && <span className={styles.bottomLine} />}
    </div>
  );
}
