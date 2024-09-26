import { useState } from "react";
import styles from "./SelectBox.module.scss";

const SortSelectBox = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className={styles.selectBoxContainer}>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className={styles.selectBox}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelectBox;
