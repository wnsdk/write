import styles from "./Copying.module.scss";
import InputTextArea from "@/components/InputTextArea";

export default function Copying({ value, onChange, prompt }) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>{prompt.body}</div>
      <div className={styles.input}>
        <InputTextArea value={value} onChange={onChange} />
      </div>
    </div>
  );
}
