import styles from "../css/Separator.module.css";

export default function Separator({ text = "OR" }) {
  return (
    <div className={styles.separator}>
      <div className={styles.line} />
      <span className={styles.text}>{text}</span>
      <div className={styles.line} />
    </div>
  );
}
