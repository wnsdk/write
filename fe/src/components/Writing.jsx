import styles from "./Writing.module.scss";
import InputTextArea from "@/components/InputTextArea";

export default function Writing({ value, onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <InputTextArea value={value} onChange={onChange} />
      </div>
    </div>
  );
}
