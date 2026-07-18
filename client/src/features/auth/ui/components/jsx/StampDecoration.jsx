import styles from "../css/StampDecoration.module.css";
import stampImage from "../../../../../assets/logo/duevora-stamp.png";

export default function StampDecoration() {
  return (
    <div className={styles.stamp} aria-hidden="true">
      <img src={stampImage} alt="" />
    </div>
  );
}
