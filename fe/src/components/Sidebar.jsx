import { motion } from 'framer-motion';
import styles from './Sidebar.module.scss'; // 스타일을 위한 SCSS 파일
import { authAxios } from '@/apis/authAxios';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

export default function Sidebar({ isOpen, toggleSidebar, body, promptId, article }) {
    const navigate = useNavigate();

    const saveArticle = () => {
        const articleData = { body: body, promptId: promptId };

        // 첫 저장이 아니라면
        if (article != null) {
            articleData.articleId = article.articleId;
        }

        authAxios.post('/article/save', articleData);
    };

    const submitArticle = () => {
        saveArticle();
        navigate('/correction');
    };

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
            <Button onClick={() => saveArticle()} text="저장하기" width="80%" />
            <Button onClick={() => submitArticle()} text="제출하기" width="80%" />
        </motion.div>
    );
}
