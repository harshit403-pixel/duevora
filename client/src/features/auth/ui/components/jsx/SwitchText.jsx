import styles from "../css/SwitchText.module.css";

export default function SwitchText({ text, actionText, onSwitch }) {
  return (
    <p className={styles.switchText}>
      {text}{" "}
      <button type="button" className={styles.link} onClick={onSwitch}>
        {actionText}
      </button>
    </p>
  );
}
