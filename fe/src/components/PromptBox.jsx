import styles from "./PromptBox.module.scss";
import { useNavigate } from "react-router-dom";
import { categories, difficulties } from "@/constants/constants";

export default function PromptBox({ prompt, onClick }) {
  const navigate = useNavigate();

  return (
    <div className={styles.mainBox} onClick={() => onClick()}>
      <div className={styles.titleBox}>
        <div>{prompt.title}</div>
        <div>{prompt.titleKr}</div>
      </div>
      <hr />
      <div className={styles.metaDataBox}>
        <div className={styles.metaData}>
          <div>갈래</div>
          <div>{categories[prompt.category]}</div>
        </div>
        <div className={styles.metaData}>
          <div>소재</div>
          <div>여행</div>
        </div>
        <div className={styles.metaData}>
          <div>난이도</div>
          <div>{difficulties[prompt.difficulty]}</div>
        </div>
        {prompt.writer && (
          <div className={styles.metaData}>
            <div>작가</div>
            <div>{prompt.writer}</div>
          </div>
        )}
      </div>
    </div>
  );
}
