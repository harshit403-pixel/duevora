import styles from "../css/BlueprintDecorations.module.css";
import SideLabel from "./SideLabel";
import VersionBadge from "./VersionBadge";
import PlusDecoration from "./PlusDecoration";
import StampDecoration from "./StampDecoration";
import DotPattern from "./DotPattern";

export default function BlueprintDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      <SideLabel position="top">
        DUEVORA
        <br />
        Smart Finance. Simplified.
      </SideLabel>

      <div className={`${styles.dotGrid} ${styles.dotGridLeft}`}>
        <DotPattern rows={6} cols={6} />
      </div>

      <VersionBadge />

      <PlusDecoration />

      <StampDecoration />

      <div className={`${styles.dotGrid} ${styles.dotGridRight}`}>
        <DotPattern rows={6} cols={6} />
      </div>

      <SideLabel position="bottom">
        THANK YOU FOR
        <br />
        CHOOSING DUEVORA
      </SideLabel>
    </div>
  );
}
