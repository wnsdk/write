import styles from "./MainPage.module.scss";
import PromptBox from "@/components/PromptBox";
import { useGradientStore } from "@/store/gradientStore";
import GradientBox from "@/components/GradientBox";
import { useEffect } from "react";

export default function MainPage() {
  const isFull = useGradientStore((state) => state.isFull);
  const setIsFull = useGradientStore((state) => state.setIsFull);

  useEffect(() => {
    setIsFull(false);
  }, []);

  return (
    <>
      {/* <div
        className={isFull ? styles.gradient_box_full : styles.gradient_box}
      ></div> */}
      <GradientBox isFull={isFull} />
      <div className={styles.container}>
        <span className={styles.main_title}>오늘의 글감</span>
        <PromptBox
          prompt={{
            title: "A Journey Through Time",
            titleKr: "시간을 넘는 여행",
            writer: "AI",
            difficulty: "BEGINNER",
            category: "NOVEL",
          }}
        />
      </div>
    </>
  );
}
