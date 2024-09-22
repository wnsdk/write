import styles from "./PromptBox.module.scss";
import { useNavigate } from "react-router-dom";

const categories = {
  NOVEL: "소설",
  ESSAY: "에세이",
  DIALOGUE: "대화",
  INTERVIEW: "인터뷰",
  LETTER: "편지",
  DIARY: "일기",
  PLAY: "희곡",
  Editorial: "논설문",
};

export default function PromptBox({ prompt }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.main_box}
      onClick={() => {
        navigate(`/${prompt.mode}/${prompt.promptId}`);
      }}
    >
      <div className={styles.title_box}>
        <div>{prompt.title}</div>
        <div>{prompt.titleKr}</div>
      </div>
      <hr />
      <div className={styles.meta_data_box}>
        <div className={styles.meta_data}>
          <div>갈래</div>
          <div>{categories[prompt.category]}</div>
        </div>
        <div className={styles.meta_data}>
          <div>소재</div>
          <div>여행</div>
        </div>
        <div className={styles.meta_data}>
          <div>난이도</div>
          <div>{prompt.difficulty}</div>
        </div>
        {prompt.writer && (
          <div className={styles.meta_data}>
            <div>작가</div>
            <div>{prompt.writer}</div>
          </div>
        )}
      </div>
    </div>
  );
}
