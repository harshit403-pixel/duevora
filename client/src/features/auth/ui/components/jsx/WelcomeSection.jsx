import styles from "../css/WelcomeSection.module.css";

export default function WelcomeSection() {
  return (
    <div className={styles.section}>
      <div className={styles.info}>
        <div className={styles.billTo}>BILL TO:</div>
        <h2 className={styles.heading}>Welcome Back!</h2>
        <p className={styles.description}>Please sign in to continue</p>
      </div>
    </div>
  );
}
