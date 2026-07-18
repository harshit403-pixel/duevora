import styles from "../css/PrinterScene.module.css";

const DOT_COUNT = 15;

export default function PrinterScene({ children }) {
  return (
    <div className={styles.scene}>
      <div className={styles.topBar}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>D</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>DUEVORA</span>
            <span className={styles.brandTag}>Smart Finance. Simplified.</span>
          </div>
        </div>
      </div>

      <div className={styles.plusDecoration}>+</div>

      <div className={`${styles.dotPattern} ${styles.dotPatternLeft}`}>
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </div>

      <div className={`${styles.dotPattern} ${styles.dotPatternRight}`}>
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </div>

      <div className={`${styles.accentLine} ${styles.accentLineLeft}`} />
      <div className={`${styles.accentLine} ${styles.accentLineRight}`} />

      {children}

      <div className={styles.helpText}>
        <p className={styles.helpTitle}>Here to help!</p>
        <p className={styles.helpDesc}>
          Our team is always here if you need any assistance.
        </p>
        <div className={styles.helpLine} />
      </div>
    </div>
  );
}
