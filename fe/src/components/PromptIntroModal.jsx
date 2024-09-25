import styles from "./PromptIntroModal.module.scss";
import { useNavigate } from "react-router-dom";
import { categories, difficulties, modes } from "@/constants/constants";
import Button from "@/components/Button";

export default function PromptIntroModal({ isOpen, onClose, prompt }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.show : styles.hide}`}
      onClick={onClose}
    >
      {isOpen && (
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <i class="fa-duotone fa-solid fa-circle-xmark" onClick={onClose}></i>
          <div className={styles.left}>
            <div className={styles.title}>{prompt.title}</div>
            <div className={styles.kr}>{prompt.titleKr}</div>
            <div className={styles.description}>{prompt.description}</div>
            <div className={styles.kr}>{prompt.descriptionKr}</div>
            {prompt.mode === "WRITING" ? (
              <div className={styles.noBody}>본문이 없는 글입니다.</div>
            ) : (
              <div className={styles.body}>{prompt.body}</div>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.mode}>{modes[prompt.mode]}하기</div>
            <div className={styles.modeDescription}>
              {prompt.mode === "WRITING"
                ? "주제에 대한 생각을 글로 표현하여 영어 실력을 강화하고 자신감을 높여보세요"
                : prompt.mode === "COPYING"
                ? "본격적으로 필사를 시작하기 전, 지문을 먼저 훑어보며 준비를 해봅시다"
                : "주어진 글을 영어로 번역해 보기 전, 지문을 먼저 훑어보며 준비를 해봅시다"}
            </div>

            <div className={styles.metaDataContainer}>
              <div className={styles.metaData}>
                <div>갈래</div>
                <div>{categories[prompt.category]}</div>
              </div>
              <div className={styles.metaData}>
                <div>난이도</div>
                <div>{difficulties[prompt.difficulty]}</div>
              </div>
              <div className={styles.metaData}>
                <div>작가</div>
                <div>{prompt.writer}</div>
              </div>
            </div>
            {/* <div className={styles.metaData}>
              <div>소재</div>
              <div>{prompt.}</div>
            </div> */}
            <Button
              onClick={() =>
                navigate(`/${prompt.mode.toLowerCase()}/${prompt.promptId}`, {
                  state: { prompt: prompt },
                })
              }
              text="시작하기"
              width={"100%"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
