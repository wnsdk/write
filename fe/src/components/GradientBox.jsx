import styles from "./GradientBox.module.scss";

export default function GradientBox({ isFull }) {
  return (
    <div
      className={
        isFull
          ? `${styles.gradient_box} ${styles.full_height}`
          : styles.gradient_box
      }
    ></div>
  );
}
