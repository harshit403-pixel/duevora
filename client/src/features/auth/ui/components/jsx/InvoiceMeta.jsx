import styles from "../css/InvoiceMeta.module.css";

export default function InvoiceMeta() {
  return (
    <div className={styles.meta}>
      <div className={styles.row}>
        <span className={styles.label}>INVOICE #</span>
        <span className={styles.value}>DUEV-2024-001</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>DATE</span>
        <span className={styles.value}>17 MAY 2025</span>
      </div>
    </div>
  );
}
