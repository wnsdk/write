import styles from "./CheckBox.module.scss";

const CheckBox = ({ label, onChange, value, checked }) => {
  return (
    <label className={styles.checkboxContainer}>
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CheckBox;
