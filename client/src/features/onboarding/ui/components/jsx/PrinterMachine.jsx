import styles from "../css/PrinterMachine.module.css";

export default function PrinterMachine() {
  return (
    <div className={styles.machine}>
      <div className={styles.machineBody}>
        <div className={styles.machineTop}>
          <span className={styles.machineIndicator} />
          <span className={styles.machineBrand}>DUEVORA</span>
        </div>
        <div className={styles.machineSlot} />
      </div>
      <span className={`${styles.roller} ${styles.rollerLeft}`} />
      <span className={`${styles.roller} ${styles.rollerRight}`} />
      <span className={`${styles.rollerKnob} ${styles.rollerKnobLeft}`} />
      <span className={`${styles.rollerKnob} ${styles.rollerKnobRight}`} />
      <div className={styles.paperExit} />
    </div>
  );
}
