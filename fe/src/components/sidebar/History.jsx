import { useEffect, useState } from 'react';
import styles from './History.module.scss';
import { authAxios } from '@/apis/authAxios';
import Pagination from '@/components/Pagination';
import { useQuery } from '@tanstack/react-query';

export default function History({ promptId, article }) {
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const fetchArticles = async () => {
        const queryString = [`page=${currentPage - 1}`, `size=5`, `sort=latest`, `promptId=${promptId}`]
            .filter(Boolean)
            .join('&');

        const response = await authAxios.get(`/article?${queryString}`);
        return response.data;
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const {
        data: articles,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['history', article],
        queryFn: fetchArticles,
    });

    useEffect(() => {
        if (!isLoading) {
            setTotalPages(articles.totalPages);
        }
    }, [articles]);

    return (
        <>
            <h2>학습 기록</h2>
            {!isLoading && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>마지막 수정일</th>
                            <th>점수</th>
                            <th>제출일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.content.map((item, index) => (
                            <tr key={index}>
                                <td>{getFormattedDate(item.modifiedAt)}</td>
                                <td>{item.evaluatedAt == null ? '-' : `${item.score}점`}</td>
                                <td>{item.evaluatedAt == null ? '-' : `${item.evaluatedAt.substring(0, 10)}`}</td>
                                <td>
                                    {item.evaluatedAt == null ? (
                                        <button
                                            onClick={() => {
                                                navigate(`/writing/${item.articleId}`, {
                                                    state: { prompt: item.promptResDto },
                                                });
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );
}
