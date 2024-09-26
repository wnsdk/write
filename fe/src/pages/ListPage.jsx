import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { $ } from '@/apis/axios';
import PromptBox from '@/components/PromptBox';
import SearchConditions from '@/components/SearchConditions';
import styles from './ListPage.module.scss';
import PromptIntroModal from '@/components/PromptIntroModal';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import debounce from 'lodash/debounce';

export default function ListPage() {
    const location = useLocation();
    const { state } = location;
    const [mode, setMode] = useState(state?.mode);
    // const [mode, setMode] = useState([state?.mode]);
    const [difficulty, setDifficulty] = useState([]);
    const [category, setCategory] = useState([]);
    const [writer, setWriter] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ content: [] });
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1); // 현재 페이지를 저장할 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수를 저장할 상태

    const [selectedPrompt, setSelectedPrompt] = useState(null);

    const fetchPrompts = async () => {
        setLoading(true); // 로딩 시작
        try {
            // 배열을 쿼리 문자열로 변환하는 함수
            const arrayToQueryString = (paramName, values) => {
                return values.map((value) => `${paramName}=${encodeURIComponent(value)}`).join('&');
            };

            // 각 상태에서 선택된 값들을 쿼리 문자열로 변환
            // const modeQuery = mode.length > 0 ? arrayToQueryString('mode', mode) : '';
            const difficultyQuery = difficulty.length > 0 ? arrayToQueryString('difficulty', difficulty) : '';
            const categoryQuery = category.length > 0 ? arrayToQueryString('category', category) : '';

            // 전체 쿼리 문자열 생성
            const queryString = [
                // modeQuery,
                `mode=${mode}`,
                difficultyQuery,
                categoryQuery,
                writer ? `writer=${writer.toUpperCase()}` : '',
                query ? `query=${query}` : '',
                `page=${page - 1}`,
                `size=6`,
            ]
                .filter(Boolean)
                .join('&'); // 빈 문자열을 필터링하여 제거

            const response = await $.get(`/prompt/prompts?${queryString}`);

            await setTotalPages(response.data.size);
            await setResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const debouncedFetchResults = debounce(fetchPrompts, 300);

    useEffect(() => {
        debouncedFetchResults();
        return debouncedFetchResults.cancel;
    }, [difficulty, category, writer, query, page]);

    useEffect(() => {
        setMode(location.state?.mode || ''); // location의 state에 따라 mode 업데이트
    }, [location.state]); // location.state가 변경될 때마다 실행

    // mode가 변경될 때마다 fetchPrompts 호출
    useEffect(() => {
        fetchPrompts();
    }, [mode]);

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
            <SearchConditions
                // mode={mode}
                setMode={setMode}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                category={category}
                setCategory={setCategory}
                writer={writer}
                setWriter={setWriter}
                query={query}
                setQuery={setQuery}
                handleSearch={fetchPrompts}
            />
            {loading ? (
                <div className={styles.loadingOverlay}>
                    <ClipLoader color={'#36d7b7'} loading={loading} size={50} />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeIn' }}
                >
                    <div className={styles.list}>
                        {results.content.map((item, index) => (
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

            <PromptIntroModal isOpen={isModalOpen} onClose={closeModal} prompt={selectedPrompt} />

            {/* 페이지네이션 버튼 */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>
                    Page {page} of {totalPages}
                </span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
}
