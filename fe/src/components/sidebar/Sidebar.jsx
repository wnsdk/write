import { motion } from 'framer-motion';
import styles from './Sidebar.module.scss';
import { useState } from 'react';
import Menu from './Menu';
import AiTutor from './AiTutor';
import History from './History';
import Memo from './Memo';

export default function Sidebar({ isOpen, toggleSidebar, promptId, article }) {
    const [activeComponent, setActiveComponent] = useState('AiTutor');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'AiTutor':
                return <AiTutor />;
            case 'History':
                return <History promptId={promptId} article={article} />;
            case 'Memo':
                return <Memo />;
            default:
                return <AiTutor />;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Menu
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    toggleSidebar={toggleSidebar}
                />
            </div>

            <motion.div
                className={styles.sidebar}
                initial={{ x: '-100%' }} // 시작 위치: 왼쪽 밖
                animate={{ x: isOpen ? 0 : '-100%' }} // 열릴 때와 닫힐 때 위치
                transition={{ duration: 0.3 }}
            >
                <div className={styles.toggle} onClick={toggleSidebar}>
                    <i class="fa-duotone fa-solid fa-chevron-left"></i>
                </div>

                {renderComponent()}
            </motion.div>
        </div>
    );
}
