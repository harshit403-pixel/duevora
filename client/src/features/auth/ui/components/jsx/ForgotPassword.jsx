import styles from "../css/ForgotPassword.module.css";

export default function ForgotPassword() {
  return (
    <a href="/forgot-password" className={styles.link}>
      Forgot password?
    </a>
  );
}
