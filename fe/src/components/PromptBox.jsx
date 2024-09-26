import styles from "./PromptBox.module.scss";
import { useNavigate } from "react-router-dom";
import { categories, difficulties } from "@/constants/constants";

export default function PromptBox({ prompt, onClick, isKr }) {
  const navigate = useNavigate();

  return (
    <div className={styles.mainBox} onClick={() => onClick()}>
      <div className={styles.titleBox}>
        {isKr ? <div>{prompt.titleKr}</div> : <div>{prompt.title}</div>}
      </div>

      <hr />
      <div className={styles.metaDataBox}>
        <div className={styles.metaData}>
          <div>갈래</div>
          <div>{categories[prompt.category]}</div>
        </div>
        <div className={styles.metaData}>
          <div>태그</div>
          <div>{prompt.tags.join(", ")}</div>
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
        <div className={styles.popular}>
          <i class="fa-duotone fa-solid fa-people-group"></i>{" "}
          {prompt.usageCount}
        </div>
      </div>
    </div>
  );
}
