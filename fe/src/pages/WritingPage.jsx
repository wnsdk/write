import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar';
import styles from './WritingPage.module.scss';
import { authAxios } from '@/apis/authAxios';
import Button from '@/components/input/Button';
import { correctWriting, correctCopying, correctTranslating } from '@/apis/openai';
import Copying from '@/components/writing/Copying';
import Writing from '@/components/writing/Writing';
import Translating from '@/components/writing/Translating';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';

// state로 받은 articleId의 글을 뿌려준다.
// 만일 articleId가 null이면, prompt로 쓴 제일 최신 글을 뿌려준다.
// 만일 prompt로 글을 쓴 적이 한 번도 없다면 빈 글을 저장한다.
export default function WritingPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { articleId, prompt } = location.state || {};

    const [isOpen, setIsOpen] = useState(true);
    const [article, setArticle] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    // articleId로 article 가져오기 (맨 처음에 뿌려주기 용)
    const fetchArticle = async (articleId) => {
        const response = await authAxios.get(`/article/${articleId}`);
        setArticle(response.data);
        setText(response.data.body);
        return response.data;
    };

    // promptId에 대해 유저가 쓴 모든 글 불러오기
    const fetchArticles = async () => {
        const queryString = [`sort=latest`, `promptId=${prompt.promptId}`].filter(Boolean).join('&');
        const response = await authAxios.get(`/article?${queryString}`);
        return response.data.content;
    };

    const { data: articles } = useQuery({
        queryKey: ['articles', article],
        queryFn: fetchArticles,
    });

    // 맨 처음에 실행되고 모든 글 목록을 가져오면
    useEffect(() => {
        if (article != null) {
            // articleId 값이 있다면
            if (articleId != null) {
                fetchArticle(article.articleId);
            }
            // 과거에 쓴 글이 있다면
            else if (articles.length() > 0) {
                setArticle(articles[0]);
            }
            // 첫 글이라면
            else {
                saveArticle();
            }
        }
    }, []);

    const saveArticle = async () => {
        const articleReqDto = { body: text, promptId: prompt.promptId };

        // 첫 저장이 아니라면
        if (article != null) {
            articleReqDto.articleId = article.articleId;
        }

        await authAxios.post('/article', articleReqDto).then((response) => setArticle(response.data));
    };

    const submitArticle = async () => {
        const confirmSubmit = window.confirm('정말로 제출하시겠습니까?');
        if (confirmSubmit) {
            setLoading(true);
            try {
                let structuredResponse;
                if (prompt.mode === 'WRITING') {
                    structuredResponse = await correctWriting(text, prompt.title);
                } else if (prompt.mode === 'COPYING') {
                    structuredResponse = await correctCopying(text, prompt.body);
                } else {
                    structuredResponse = await correctTranslating(text, prompt.body);
                }

                let correctionResult;
                try {
                    correctionResult = JSON.parse(structuredResponse);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }

                const articleData = {
                    body: text,
                    promptId: prompt.promptId,
                    score: correctionResult.score,
                    evaluation: correctionResult.evaluation,
                };

                authAxios.post(`/article`, articleData);

                navigate('/correction', {
                    state: {
                        correctionResult: correctionResult,
                        prompt: prompt,
                    },
                });
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const exit = () => {
        const confirmExit = window.confirm('정말로 나가시겠습니까?');
        if (confirmExit) {
            navigate('/history');
        }
    };

    return (
        <div className={`${styles.container} ${isOpen ? styles.sidebarOpen : ''}`}>
            {loading && (
                <div className={styles.loadingOverlay}>
                    <ClipLoader color={'#36d7b7'} loading={loading} size={50} />
                </div>
            )}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} promptId={prompt.promptId} article={article} />
            <div className={styles.subContainer}>
                <div className={styles.menus}>
                    <div className={styles.metaData}>
                        <div className={styles.title}>
                            {prompt.title}
                            <span>{prompt.titleKr}</span>
                        </div>
                        {prompt.mode === 'WRITING' ? (
                            <div className={styles.explanation}>
                                주제에 맞는 글을 영어로 작성해보세요! <br />
                                오로지 영어와 일부 특수문자, 숫자만 입력 가능합니다. 저장만 하고 나중에 다시 와서
                                작성하는 것도 가능합니다.
                            </div>
                        ) : prompt.mode === 'COPYING' ? (
                            <div className={styles.explanation}>
                                글을 따라쓰면서 영어 작문 실력을 길러보세요! <br />
                                오로지 영어와 일부 특수문자, 숫자만 입력 가능합니다. 저장만 하고 나중에 다시 와서
                                작성하는 것도 가능합니다.
                            </div>
                        ) : (
                            <div className={styles.explanation}>
                                한글로 된 글을 영어로 번역해보세요! <br />
                                오로지 영어와 일부 특수문자, 숫자만 입력 가능합니다. 저장만 하고 나중에 다시 와서
                                작성하는 것도 가능합니다.
                            </div>
                        )}
                    </div>

                    <div className={styles.buttons}>
                        <i
                            class="fa-duotone fa-solid fa-floppy-disk"
                            onClick={() => {
                                saveArticle();
                                alert('저장했습니다.');
                            }}
                        ></i>
                        <i class="fa-duotone fa-solid fa-door-open" onClick={() => exit()}></i>
                        <Button onClick={() => submitArticle()} text="제출" width="10rem" />
                    </div>
                </div>

                {prompt.mode === 'WRITING' ? (
                    <Writing value={text} onChange={(e) => setText(e.target.value)} />
                ) : prompt.mode === 'COPYING' ? (
                    <Copying value={text} onChange={(e) => setText(e.target.value)} prompt={prompt} />
                ) : (
                    <Translating value={text} onChange={(e) => setText(e.target.value)} prompt={prompt} />
                )}
            </div>
        </div>
    );
}
