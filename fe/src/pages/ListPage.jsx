import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/apis/axios";
import PromptBox from "@/components/PromptBox";
import { useGradientStore } from "@/store/gradientStore";
import styles from "./ListPage.module.scss";
import GradientBox from "@/components/GradientBox";

export default function ListPage() {
  const location = useLocation();

  const { state } = location;
  const mode = state?.mode;

  const [page, setPage] = useState(1); // 현재 페이지를 저장할 상태
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수를 저장할 상태

  const isFull = useGradientStore((state) => state.isFull);

  const fetchPrompts = async (page, mode) => {
    const response = await $.get(`/prompt/${mode}?page=${page - 1}&size=4`);
    setTotalPages(response.data.size - 1);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["prompts", page, mode],
    queryFn: () => fetchPrompts(page, mode),
    keepPreviousData: true, // 이전 데이터 유지
  });

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      {/* {mode === "writing" && <span>작문</span>}
      {mode === "copying" && <span>필사</span>}
      {mode === "translating" && <span>번역</span>} */}
      <GradientBox isFull={isFull} />

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <>{error.message}</>
      ) : (
        <div className={styles.list}>
          {data.content.map((item, index) => (
            <PromptBox prompt={item} key={index} />
          ))}
        </div>
      )}

      {/* 페이지네이션 버튼 */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
