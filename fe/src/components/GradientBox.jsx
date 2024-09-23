import styles from "./GradientBox.module.scss";

export default function GradientBox({ gradientHeight }) {
  return (
    <div
      className={
        gradientHeight == 0
          ? `${styles.gradient_box} ${styles.height_0}`
          : gradientHeight == 1
          ? `${styles.gradient_box} ${styles.height_1}`
          : gradientHeight == 2
          ? `${styles.gradient_box} ${styles.height_2}`
          : `${styles.gradient_box} ${styles.height_3}`
      }
    ></div>
  );
}
