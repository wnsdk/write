import styles from "./InputTextArea.module.scss";

const InputTextArea = ({ value, onChange }) => {
  function restrictInput(event) {
    const value = event.target.value;
    // 한글을 제외한 문자만 허용
    event.target.value = value.replace(
      /[^a-zA-Z0-9`~!@#$%^&*()-_=+[\]{};':"\\|,.<>\/? \n]/g,
      ""
    );
  }

  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={onChange}
      placeholder="Express your thoughts in English."
      onInput={(event) => restrictInput(event)}
    />
  );
};

export default InputTextArea;
