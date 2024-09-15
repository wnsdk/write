import { useLocation } from "react-router-dom";

export default function ListPage() {
  const location = useLocation();
  const { state } = location;
  const mode = state?.mode;

  return (
    <>
      {mode === "writing" && <span>작문</span>}
      {mode === "copying" && <span>필사</span>}
      {mode === "translating" && <span>번역</span>} 주제 리스트
    </>
  );
}
