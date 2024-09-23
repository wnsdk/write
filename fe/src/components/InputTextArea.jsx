import styles from "./InputTextArea.module.scss";

const InputTextArea = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <textarea className={styles.textarea} value={value} onChange={onChange} />
    </div>
  );
};

export default InputTextArea;
