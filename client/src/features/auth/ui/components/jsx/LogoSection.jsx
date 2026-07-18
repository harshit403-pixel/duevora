import styles from "../css/LogoSection.module.css";
import logoImage from "../../../../../assets/logo/duevora-logo.png";

export default function LogoSection() {
  return (
    <div className={styles.logoSection}>
      <img
        src={logoImage}
        alt="DUEVORA"
        className={styles.logoImage}
        width={52}
        height={52}
      />
      <div className={styles.brandText}>
        <div className={styles.brandName}>DUEVORA</div>
        <div className={styles.brandTagline}>Build. Ship. Repeat.</div>
      </div>
    </div>
  );
}
