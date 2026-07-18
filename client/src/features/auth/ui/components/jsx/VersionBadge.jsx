import styles from "../css/VersionBadge.module.css";

export default function VersionBadge() {
  return (
    <div className={styles.badge} aria-label="Version 1.0.0">
      VERSION 1.0.0
    </div>
  );
}
