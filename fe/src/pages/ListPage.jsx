import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ListPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/apis/axios";

export default function ListPage() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 호출

  const { state } = location;
  const mode = state?.mode;

  const [page, setPage] = useState(1); // 현재 페이지를 저장할 상태
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수를 저장할 상태

  const fetchPrompts = async (page) => {
    const response = await $.get(`/prompt/${mode}?page=${page - 1}&size=4`);
    setTotalPages(response.data.size - 1);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["prompts", page],
    queryFn: () => fetchPrompts(page),
    keepPreviousData: true, // 이전 데이터 유지
  });

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // 박스 클릭 시 페이지 이동
  const handleBoxClick = (id) => {
    navigate(`/${mode}/${id}`); // 클릭된 박스의 고유 ID로 페이지 이동
  };

  return (
    <>
      {mode === "writing" && <span>작문</span>}
      {mode === "copying" && <span>필사</span>}
      {mode === "translating" && <span>번역</span>}
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <>{error.message}</>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {data.content.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "200px",
                  height: "150px",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => handleBoxClick(item.promptId)} // 클릭 시 페이지 이동
              >
                <h3 style={{ fontSize: "16px", margin: "5px 0" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "12px", textAlign: "center" }}>
                  {item.body}
                </p>
              </div>
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
      </div>
    </>
  );
}
