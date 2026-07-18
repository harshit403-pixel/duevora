import { useId } from "react";
import styles from "../css/ReceiptEdge.module.css";

const TOOTH_W = 17;
const TOOTH_H = 8;

const TOOTH_PATH = `M 0 ${TOOTH_H} C 3 ${TOOTH_H}, 5.5 0, ${TOOTH_W / 2} 0 C ${TOOTH_W - 5.5} 0, ${TOOTH_W - 3} ${TOOTH_H}, ${TOOTH_W} ${TOOTH_H} Z`;

export default function ReceiptEdge({ position = "top" }) {
  const id = useId();
  const cls = position === "top" ? styles.top : styles.bottom;

  return (
    <div className={`${styles.edge} ${cls}`} aria-hidden="true">
      <svg width="100%" height={TOOTH_H} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={id}
            width={TOOTH_W}
            height={TOOTH_H}
            patternUnits="userSpaceOnUse"
          >
            <path d={TOOTH_PATH} fill="var(--color-card)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
