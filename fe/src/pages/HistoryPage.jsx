import { useEffect, useState } from "react";
import styles from "./HistoryPage.module.scss";
import { authAxios } from "@/apis/authAxios";
import { categories, difficulties, modes } from "@/constants/constants";

export default function CorrectionPage() {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArticles = async () => {
    setLoading(true);
    try {
      authAxios.get(`/article`).then((response) => {
        setHistories(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <h2>학습 기록</h2>
      <div>
        {loading ? (
          "로딩중"
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>주제</th>
                <th>모드</th>
                <th>갈래</th>
                <th>난이도</th>
                <th>점수</th>
                <th>제출일</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((item, index) => (
                <tr key={index}>
                  <td>{item.promptResDto.title}</td>
                  <td>{modes[item.promptResDto.mode]}</td>
                  <td>{categories[item.promptResDto.category]}</td>
                  <td>{difficulties[item.promptResDto.difficulty]}</td>
                  <td>{item.score}점</td>
                  <td>{item.evaluatedAt.substring(0, 10)}</td>
                  <td>
                    <button
                      onClick={() => {
                        alert("준비 중입니다.");
                      }}
                    >
                      글 보기
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        alert("준비 중입니다.");
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
