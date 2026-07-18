import { FcGoogle } from "react-icons/fc";
import styles from "../css/GoogleButton.module.css";

export default function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
    >
      <span className={styles.googleIcon}>
        <FcGoogle size={20} />
      </span>
      <span>Continue with Google</span>
    </button>
  );
}
