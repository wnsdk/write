import styles from "./MainPage.module.scss";
import PromptBox from "@/components/PromptBox";

export default function MainPage() {
  return (
    <>
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
