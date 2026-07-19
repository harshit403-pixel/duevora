import styles from "../css/NextButton.module.css";

export default function NextButton({ onClick, disabled, isLast, isLoading }) {
  return (
    <button
      type="button"
      className={`${isLast ? styles.submitButton : styles.button} ${isLoading ? styles.loading : ""}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <span className={styles.spinner} />}
      <span>{isLast ? (isLoading ? "Creating..." : "Finish") : "Next"}</span>
      {!isLast && !isLoading && <span className={styles.arrow}>&rarr;</span>}
    </button>
  );
}
