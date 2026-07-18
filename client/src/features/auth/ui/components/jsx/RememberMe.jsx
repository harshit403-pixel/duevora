import styles from "../css/RememberMe.module.css";

export default function RememberMe({ checked, onChange }) {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
      />
      <span className={styles.label}>Remember me</span>
    </label>
  );
}
