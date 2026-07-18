import { MdArrowForward } from "react-icons/md";
import styles from "../css/LoginButton.module.css";

export default function LoginButton({ isLoading }) {
  return (
    <button
      type="submit"
      className={styles.button}
      disabled={isLoading}
    >
      <span>{isLoading ? "LOGGING IN..." : "LOGIN"}</span>
      {!isLoading && (
        <span className={styles.buttonIcon}>
          <MdArrowForward />
        </span>
      )}
    </button>
  );
}
