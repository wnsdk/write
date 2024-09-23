import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import styles from "./WritingPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { authAxios } from "@/apis/authAxios";
import InputTextArea from "@/components/InputTextArea";

export default function WritingPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const fetchPrompt = async (id) => {
    const response = await authAxios.get(`/prompt/${id}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["prompt"],
    queryFn: () => fetchPrompt(id),
    keepPreviousData: true, // 이전 데이터 유지
  });

  const [text, setText] = useState("");

  const handleSubmit = () => {
    navigate("/correction");
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.sidebarOpen : ""}`}>
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        onSubmit={handleSubmit}
      />
      {!isLoading && <div>{data.title}</div>}

      <InputTextArea value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}
