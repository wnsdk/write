import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/apis/axios";
import PromptBox from "@/components/PromptBox";
import styles from "./ListPage.module.scss";
import PromptIntroModal from "@/components/PromptIntroModal";
import { motion } from "framer-motion";

export default function ListPage() {
  const location = useLocation();

  const { state } = location;
  const mode = state?.mode;

  const [page, setPage] = useState(1); // 현재 페이지를 저장할 상태
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수를 저장할 상태

  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const fetchPrompts = async (page, mode) => {
    const response = await $.get(
      `/prompt/list/${mode}?page=${page - 1}&size=3`
    );
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

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* {mode === "writing" && <span>작문</span>}
      {mode === "copying" && <span>필사</span>}
      {mode === "translating" && <span>번역</span>} */}

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <>{error.message}</>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
        >
          <div className={styles.list}>
            {data.content.map((item, index) => (
              <PromptBox
                prompt={item}
                key={index}
                onClick={() => {
                  openModal();
                  setSelectedPrompt(item);
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      <PromptIntroModal
        isOpen={isModalOpen}
        onClose={closeModal}
        prompt={selectedPrompt}
      />

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
