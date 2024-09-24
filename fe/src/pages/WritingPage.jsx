import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import styles from './WritingPage.module.scss';
import { authAxios } from '@/apis/authAxios';
import InputTextArea from '@/components/InputTextArea';

export default function WritingPage() {
    const { promptId } = useParams();

    const [isOpen, setIsOpen] = useState(true);
    const [prompt, setPrompt] = useState(null);
    const [article, setArticle] = useState(null);
    const [text, setText] = useState('');

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const fetchPrompt = async (promptId) => {
        const response = await authAxios.get(`/prompt/${promptId}`);
        setPrompt(response.data);
    };

    const fetchArticle = async (promptId) => {
        const response = await authAxios.get(`/article/${promptId}`);
        setArticle(response.data);
        setText(response.data.body);
        console.log(response.data);

        return response.data;
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchPrompt(promptId);
            await fetchArticle(promptId);
        };

        fetchData();
    }, []);

    return (
        <div className={`${styles.container} ${isOpen ? styles.sidebarOpen : ''}`}>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} body={text} promptId={promptId} article={article} />
            {prompt != null && <div className={styles.title}>{prompt.title}</div>}
            <InputTextArea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
    );
}
