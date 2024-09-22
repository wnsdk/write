import styles from "./PromptIntroModal.module.scss";
import { useNavigate } from "react-router-dom";
import { categories, difficulties, modes } from "@/constants/constants";

export default function PromptIntroModal({ isOpen, onClose, prompt }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.modal_overlay} ${
        isOpen ? styles.show : styles.hide
      }`}
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
            {!prompt.body ? (
              <div className={styles.no_body}>
                작성 중인 글이 없습니다. 작문을 시작해보세요
              </div>
            ) : (
              <div className={styles.body}>{prompt.body}</div>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.mode}>{modes[prompt.mode]}하기</div>
            <div className={styles.mode_description}>
              {prompt.mode === "WRITING"
                ? "주제에 대한 생각을 글로 표현하여 영어 실력을 강화하고 자신감을 높여보세요"
                : prompt.mode === "COPYING"
                ? "본격적으로 필사를 시작하기 전, 지문을 먼저 훑어보며 준비를 해봅시다"
                : "주어진 글을 영어로 번역해 보기 전, 지문을 먼저 훑어보며 준비를 해봅시다"}
            </div>

            <div className={styles.meta_data_container}>
              <div className={styles.meta_data}>
                <div>갈래</div>
                <div>{categories[prompt.category]}</div>
              </div>
              <div className={styles.meta_data}>
                <div>난이도</div>
                <div>{difficulties[prompt.difficulty]}</div>
              </div>
              <div className={styles.meta_data}>
                <div>작가</div>
                <div>{prompt.writer}</div>
              </div>
            </div>
            {/* <div className={styles.meta_data}>
              <div>소재</div>
              <div>{prompt.}</div>
            </div> */}
            <button
              onClick={() => navigate(`/${prompt.mode}/${prompt.promptId}`)}
            >
              시작하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
