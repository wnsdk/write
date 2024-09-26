import styles from "./Copying.module.scss";
import InputTextArea from "@/components/input/InputTextArea";

export default function Translating({ value, onChange, prompt }) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>{prompt.body}</div>
      <div className={styles.input}>
        <InputTextArea value={value} onChange={onChange} />
      </div>
    </div>
  );
}
