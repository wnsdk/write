import { useEffect, useState } from 'react';
import styles from './HistoryPage.module.scss';
import { authAxios } from '@/apis/authAxios';
import { categories, difficulties, modes } from '@/constants/constants';
import Pagination from '@/components/Pagination';
import SelectBox from '@/components/input/SelectBox';
import { useNavigate } from 'react-router-dom';

export default function CorrectionPage() {
    const isEvaluatedOptions = [
        { value: '', label: '전체' },
        { value: 'false', label: '미완성' },
        { value: 'true', label: '완성' },
    ];

    const sortOptions = [
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' },
    ];

    const navigate = useNavigate();

    const handleIsEvaluatedOptionsChange = (value) => {
        setIsEvaluated(value);
    };

    const handleSortOptionsChange = (value) => {
        setSort(value);
    };

    const [articles, setArticles] = useState([]);
    const [isEvaluated, setIsEvaluated] = useState('');
    const [sort, setSort] = useState('latest');

    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const queryString = [`isEvaluated=${isEvaluated}`, `page=${currentPage - 1}`, `size=5`, `sort=${sort}`]
                .filter(Boolean)
                .join('&');

            authAxios.get(`/article?${queryString}`).then((response) => {
                setArticles(response.data.content);
                setTotalPages(response.data.totalPages);
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteArticle = (articleId) => {
        const confirmSubmit = window.confirm('정말로 삭제하겠습니까?');
        if (confirmSubmit) {
            authAxios.delete(`/article/${articleId}`).then(() => fetchArticles());
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [isEvaluated, sort]);

    return (
        <div>
            <h2>학습 기록</h2>
            <SelectBox options={isEvaluatedOptions} onChange={handleIsEvaluatedOptionsChange} />
            <SelectBox options={sortOptions} onChange={handleSortOptionsChange} />
            <div>
                {loading ? (
                    '로딩중'
                ) : (
                    <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>주제</th>
                                    <th>모드</th>
                                    <th>갈래</th>
                                    <th>난이도</th>
                                    <th>점수</th>
                                    <th>제출일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article, index) => (
                                    <tr key={index}>
                                        <td>{article.promptResDto.title}</td>
                                        <td>{modes[article.promptResDto.mode]}</td>
                                        <td>{categories[article.promptResDto.category]}</td>
                                        <td>{difficulties[article.promptResDto.difficulty]}</td>
                                        <td>{article.evaluatedAt == null ? '-' : `${article.score}점`}</td>
                                        <td>
                                            {article.evaluatedAt == null
                                                ? '-'
                                                : `${article.evaluatedAt.substring(0, 10)}`}
                                        </td>
                                        <td>
                                            {article.evaluatedAt == null ? (
                                                <button
                                                    onClick={() => {
                                                        navigate(`/writing/${article.articleId}`, {
                                                            state: { prompt: article.promptResDto },
                                                        });
                                                        console.log(article);
                                                    }}
                                                >
                                                    쓰기
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        alert('준비 중입니다.');
                                                    }}
                                                >
                                                    보기
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => deleteArticle(article.articleId)}>삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </>
                )}
            </div>
        </div>
    );
}
