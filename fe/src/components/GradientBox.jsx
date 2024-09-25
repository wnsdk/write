import styles from "./GradientBox.module.scss";

export default function GradientBox({ gradientHeight }) {
  return (
    <div
      className={
        gradientHeight == 0
          ? `${styles.gradientBox} ${styles.height0}`
          : gradientHeight == 1
          ? `${styles.gradientBox} ${styles.height1}`
          : gradientHeight == 2
          ? `${styles.gradientBox} ${styles.height2}`
          : `${styles.gradientBox} ${styles.height3}`
      }
    ></div>
  );
}
