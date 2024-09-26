import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./WritingPage.module.scss";
import { authAxios } from "@/apis/authAxios";
import Button from "@/components/input/Button";
import {
  correctWriting,
  correctCopying,
  correctTranslating,
} from "@/apis/openai";
import Copying from "@/components/writing/Copying";
import Writing from "@/components/writing/Writing";
import Translating from "@/components/writing/Translating";
import { ClipLoader } from "react-spinners";

export default function WritingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prompt } = location.state || {};

  const [isOpen, setIsOpen] = useState(true);
  const [article, setArticle] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const fetchArticle = async (promptId) => {
    const response = await authAxios.get(`/article/${promptId}`);
    setArticle(response.data);
    setText(response.data.body);
    return response.data;
  };

  useEffect(() => {
    fetchArticle(prompt.promptId);
  }, [prompt]);

  const saveArticle = () => {
    const articleData = { body: text, promptId: prompt.promptId };

    // 첫 저장이 아니라면
    // if (article != null) {
    //   articleData.articleId = article.articleId;
    // }

    authAxios
      .post("/article/save", articleData)
      .then((response) => setArticle(response.data));
  };

  const submitArticle = async () => {
    const confirmSubmit = window.confirm("정말로 제출하시겠습니까?");
    if (confirmSubmit) {
      setLoading(true);
      await saveArticle();
      try {
        let structuredResponse;
        if (prompt.mode === "WRITING") {
          structuredResponse = await correctWriting(text, prompt.title);
        } else if (prompt.mode === "COPYING") {
          structuredResponse = await correctCopying(text, prompt.body);
        } else {
          structuredResponse = await correctTranslating(text, prompt.body);
        }

        let correctionResult;
        try {
          correctionResult = JSON.parse(structuredResponse);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }

        navigate("/correction", {
          state: {
            correctionResult: correctionResult,
            prompt: prompt,
          },
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const exit = () => {
    const confirmExit = window.confirm("정말로 나가시겠습니까?");
    if (confirmExit) {
      navigate("/history");
    }
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.sidebarOpen : ""}`}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <ClipLoader color={"#36d7b7"} loading={loading} size={50} />
        </div>
      )}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.subContainer}>
        <div className={styles.menus}>
          <div className={styles.metaData}>
            <div className={styles.title}>
              {prompt.title}
              <span>{prompt.titleKr}</span>
            </div>
            {prompt.mode === "WRITING" ? (
              <div className={styles.explanation}>
                주제에 맞는 글을 영어로 작성해보세요! <br />
                오로지 영어와 일부 특수문자, 숫자만 입력 가능합니다. 저장만 하고
                나중에 다시 와서 작성하는 것도 가능합니다.
              </div>
            ) : prompt.mode === "COPYING" ? (
              <div className={styles.explanation}>
                글을 따라쓰면서 영어 작문 실력을 길러보세요! <br />
                오로지 영어와 일부 특수문자, 숫자만 입력 가능합니다. 저장만 하고
                나중에 다시 와서 작성하는 것도 가능합니다.
              </div>
            ) : (
              <div className={styles.explanation}>
                한글로 된 글을 영어로 번역해보세요! <br />
                오로지 영어와 일부 특수문자, 숫자만 입력 가능합니다. 저장만 하고
                나중에 다시 와서 작성하는 것도 가능합니다.
              </div>
            )}
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

        {prompt.mode === "WRITING" ? (
          <Writing value={text} onChange={(e) => setText(e.target.value)} />
        ) : prompt.mode === "COPYING" ? (
          <Copying
            value={text}
            onChange={(e) => setText(e.target.value)}
            prompt={prompt}
          />
        ) : (
          <Translating
            value={text}
            onChange={(e) => setText(e.target.value)}
            prompt={prompt}
          />
        )}
      </div>
    </div>
  );
}
