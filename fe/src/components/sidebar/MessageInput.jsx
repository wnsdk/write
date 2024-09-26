import { useState } from "react";
import styles from "./MessageInput.module.scss";

const MessageInput = ({ onSend, isDisabled }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDisabled && inputValue.trim() !== "") {
      onSend(inputValue);
      setInputValue("");
    }
  };

  return (
    <form className={styles.messageInput} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="궁금한 영단어나 표현을 물어보세요"
        disabled={isDisabled} // 입력 비활성화 처리
      />
      <button type="submit" className={styles.button} disabled={isDisabled}>
        전송
      </button>
    </form>
  );
};

export default MessageInput;
