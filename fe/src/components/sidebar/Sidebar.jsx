import { motion } from 'framer-motion';
import ChatWindow from '@/components/sidebar/ChatWindow';
import styles from './Sidebar.module.scss';

export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <motion.div
            className={styles.sidebar}
            initial={{ x: '-100%' }} // 시작 위치: 왼쪽 밖
            animate={{ x: isOpen ? 0 : '-100%' }} // 열릴 때와 닫힐 때 위치
            transition={{ duration: 0.3 }}
        >
            <div className={styles.toggle} onClick={toggleSidebar}>
                {isOpen ? (
                    <i class="fa-duotone fa-solid fa-chevron-left"></i>
                ) : (
                    <i class="fa-duotone fa-solid fa-chevron-right"></i>
                )}
            </div>
            <h2>AI 선생님</h2>
            <p>작문을 하다가 궁금한 게 생기면 AI 선생님에게 물어보세요!</p>
            <ChatWindow />
        </motion.div>
    );
}
