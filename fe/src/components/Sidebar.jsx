import { motion } from "framer-motion";
import styles from "./Sidebar.module.scss"; // 스타일을 위한 SCSS 파일

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <motion.div
      className={styles.sidebar}
      initial={{ x: "-100%" }} // 시작 위치: 왼쪽 밖
      animate={{ x: isOpen ? 0 : "-100%" }} // 열릴 때와 닫힐 때 위치
      transition={{ duration: 0.3 }}
    >
      <div className={styles.toggle} onClick={toggleSidebar}>
        {isOpen ? (
          <i class="fa-duotone fa-solid fa-chevron-left"></i>
        ) : (
          <i class="fa-duotone fa-solid fa-chevron-right"></i>
        )}
      </div>
    </motion.div>
  );
}
