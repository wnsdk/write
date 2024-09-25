import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import styles from "./WritingPage.module.scss";
import { authAxios } from "@/apis/authAxios";
import InputTextArea from "@/components/InputTextArea";
import Button from "@/components/Button";
import { correctWriting } from "@/apis/openai"; // API 함수 임포트

export default function WritingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prompt } = location.state || {};

  const [isOpen, setIsOpen] = useState(true);
  const [article, setArticle] = useState(null);
  const [text, setText] = useState("");

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const fetchArticle = async (promptId) => {
    const response = await authAxios.get(`/article/${promptId}`);
    setArticle(response.data);
    setText(response.data.body);
    console.log(response.data);

    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchArticle(prompt.promptId);
    };

    fetchData();
  }, []);

  const saveArticle = () => {
    const articleData = { body: text, promptId: prompt.promptId };

    // 첫 저장이 아니라면
    if (article != null) {
      articleData.articleId = article.articleId;
    }

    authAxios.post("/article/save", articleData);
  };

  const submitArticle = async () => {
    const confirmSubmit = window.confirm("정말로 제출하시겠습니까?");
    if (confirmSubmit) {
      saveArticle();
      try {
        const structuredResponse = await correctWriting(text, prompt.title);
        console.log(structuredResponse);

        let correctionResult;
        try {
          correctionResult = JSON.parse(structuredResponse);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        console.log(correctionResult);

        navigate("/correction", {
          state: { correctionResult: correctionResult },
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const exit = () => {
    const confirmExit = window.confirm("정말로 나가시겠습니까?");
    if (confirmExit) {
      navigate("/");
    }
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.sidebarOpen : ""}`}>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.subContainer}>
        <div className={styles.menus}>
          <div className={styles.metaData}>
            <div className={styles.title}>
              {prompt.title}
              <span>{prompt.titleKr}</span>
            </div>

            <div className={styles.explanation}>
              주제에 맞는 글을 영어로 작성해보세요! <br />
              오로지 영어와 일부 특수문자, 숫자만 입력 가능합니다. 저장만 하고
              나중에 다시 와서 작성하는 것도 가능합니다.
            </div>
          </div>

          <div className={styles.buttons}>
            <i
              class="fa-duotone fa-solid fa-floppy-disk"
              onClick={() => {
                saveArticle();
                alert("저장했습니다.");
              }}
            ></i>
            <i
              class="fa-duotone fa-solid fa-door-open"
              onClick={() => exit()}
            ></i>
            <Button onClick={() => submitArticle()} text="제출" width="10rem" />
          </div>
        </div>

        <InputTextArea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
}
