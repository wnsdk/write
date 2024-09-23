import { motion } from "framer-motion";
import styles from "./Sidebar.module.scss"; // 스타일을 위한 SCSS 파일

export default function Sidebar({ isOpen, toggleSidebar, onSubmit }) {
  return (
    <motion.div
      className={styles.sidebar}
      initial={{ x: "-100%" }} // 시작 위치: 왼쪽 밖
      animate={{ x: isOpen ? 0 : "-100%" }} // 열릴 때와 닫힐 때 위치
      transition={{ duration: 0.3 }} // 애니메이션 지속 시간
    >
      <div className={styles.toggle} onClick={toggleSidebar}>
        {isOpen ? (
          <i class="fa-duotone fa-solid fa-chevron-left"></i>
        ) : (
          <i class="fa-duotone fa-solid fa-chevron-right"></i>
        )}
      </div>
      {/* <button>저장하고 나가기</button> */}
      <button onClick={onSubmit}>제출하기</button>
    </motion.div>
  );
}
