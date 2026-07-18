import { useRef, useEffect } from "react";
import styles from "../css/FallingReceipt.module.css";

const STEP_META = [
  { num: "01", title: "Business Details", desc: "Tell us about your business\nso we can personalize your experience." },
  { num: "02", title: "Contacts", desc: "Add your primary contacts" },
  { num: "03", title: "Business Setup", desc: "Configure your preferences" },
  { num: "04", title: "Review & Finish", desc: "Review your information" },
];

export default function FallingReceipt({ stepIndex, startX, startY, onComplete }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    import("gsap").then(({ gsap }) => {
      const el = ref.current;
      if (!el) return;

      gsap.set(el, { x: startX, y: startY, rotation: 0, opacity: 1 });

      gsap.to(el, {
        y: startY + 500,
        x: startX + 40,
        rotation: 12,
        opacity: 0,
        duration: 1.2,
        ease: "power2.in",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    });
  }, [startX, startY, onComplete]);

  const meta = STEP_META[stepIndex] || STEP_META[0];

  return (
    <div ref={ref} className={`${styles.fallingReceipt} ${styles.section}`}>
      <p className={styles.stepLabel}>STEP {String(stepIndex + 1).padStart(2, "0")} OF 04</p>
      <p className={styles.stepNumber}>{meta.num}</p>
      <p className={styles.stepTitle}>{meta.title}</p>
      <p className={styles.stepDesc}>{meta.desc}</p>
    </div>
  );
}
