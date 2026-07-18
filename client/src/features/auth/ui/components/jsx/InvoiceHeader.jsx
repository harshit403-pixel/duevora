import styles from "../css/InvoiceHeader.module.css";
import LogoSection from "./LogoSection";
import InvoiceMeta from "./InvoiceMeta";

export default function InvoiceHeader() {
  return (
    <div className={styles.header}>
      <LogoSection />
      <InvoiceMeta />
    </div>
  );
}
