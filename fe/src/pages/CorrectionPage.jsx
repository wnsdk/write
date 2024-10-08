import { useLocation } from "react-router-dom";
import styles from "./CorrectionPage.module.scss";

export default function CorrectionPage() {
  const location = useLocation();
  const { correctionResult, prompt } = location.state || {};
  console.log(correctionResult);

  const highlight = (originalText) => {
    return originalText.replace(
      /\*\*(.*?)\*\*/g,
      '<span style="color: red;">$1</span>'
    );
  };

  return (
    <div>
      <h1>AI 첨삭 결과</h1>
      {Array.from({ length: correctionResult.originalTexts.length }).map(
        (item, index) => (
          <div key={index} className={styles.correction}>
            {prompt.mode === "TRANSLATING" && (
              <div>{correctionResult.koreanTexts[index]}</div>
            )}
            <div>{correctionResult.originalTexts[index]}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: highlight(correctionResult.correctedTexts[index]),
              }}
            />

            {prompt.mode !== "COPYING" && (
              <div>{correctionResult.explanations[index]}</div>
            )}
          </div>
        )
      )}
      <h3>종합 평가</h3>
      {prompt.mode !== "COPYING" && <div>{correctionResult.evaluation}</div>}
      <div>{correctionResult.score}점 / 100점</div>
    </div>
  );
}
