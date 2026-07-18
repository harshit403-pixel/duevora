import styles from "../css/FooterSection.module.css";

export default function FooterSection() {
  return (
    <div className={styles.footer}>
      <div className={styles.info}>
        <span className={styles.thankYou}>Thank you for choosing DUEVORA.</span>
        <span className={styles.subText}>Let&apos;s manage your finances smarter.</span>
      </div>
      <div className={styles.total}>
        <span className={styles.totalLabel}>TOTAL</span>
        <span className={styles.totalValue}>Success Awaits</span>
      </div>
    </div>
  );
}
