import styles from "../css/DotPattern.module.css";

export default function DotPattern({ rows = 6, cols = 6, className = "" }) {
  const dots = Array.from({ length: rows * cols });

  return (
    <div
      className={`${styles.grid} ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}
      aria-hidden="true"
    >
      {dots.map((_, i) => (
        <div key={i} className={styles.dot} />
      ))}
    </div>
  );
}
