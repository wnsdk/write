import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ListPage() {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 호출

    const { state } = location;
    const mode = state?.mode;

    const [boxes, setBoxes] = useState([]); // API 데이터를 저장할 상태
    const [page, setPage] = useState(1); // 현재 페이지를 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수를 저장할 상태

    const sampleData = [
        { id: 51, title: 'The Joy of Writing', description: '글쓰기를 즐기는 방법에 대한 안내입니다.' },
        { id: 52, title: 'Creative Writing 101', description: '창의적인 글쓰기를 위한 기초를 다룹니다.' },
        { id: 53, title: 'Mastering English Essays', description: '영어 에세이를 마스터하는 방법을 소개합니다.' },
        { id: 54, title: 'Effective Storytelling', description: '효과적인 스토리텔링 기법을 배울 수 있습니다.' },
        { id: 55, title: 'Writing Persuasive Letters', description: '설득력 있는 편지를 작성하는 방법입니다.' },
        {
            id: 56,
            title: 'Business Writing for Beginners',
            description: '비즈니스 글쓰기를 처음 배우는 사람들을 위한 가이드입니다.',
        },
        { id: 57, title: 'Grammar Tips for Writing', description: '글쓰기에서 중요한 문법 팁을 제공합니다.' },
        { id: 58, title: 'Writing for the Web', description: '웹에서 글을 작성할 때 고려해야 할 사항입니다.' },
        { id: 59, title: 'Poetry and Prose', description: '시와 산문을 작성하는 기본 원칙을 다룹니다.' },
        { id: 60, title: 'Developing Writing Style', description: '자신만의 글쓰기 스타일을 발전시키는 방법입니다.' },
        { id: 61, title: 'Writing a Compelling Thesis', description: '논문 작성에서 중요한 요소를 다룹니다.' },
        { id: 62, title: 'Journalism Basics', description: '저널리즘 글쓰기의 기초를 소개합니다.' },
        {
            id: 63,
            title: 'Writing Engaging Introductions',
            description: '독자의 관심을 끄는 도입부를 쓰는 방법입니다.',
        },
        { id: 64, title: 'Editing for Clarity', description: '명확하게 편집하는 방법을 다룹니다.' },
        { id: 65, title: 'Advanced Writing Techniques', description: '고급 글쓰기 기법을 소개합니다.' },
        {
            id: 66,
            title: 'Writing for Social Media',
            description: '소셜 미디어에서 효과적인 글을 작성하는 방법입니다.',
        },
        { id: 67, title: 'Research Papers: A Guide', description: '리서치 페이퍼 작성에 대한 가이드입니다.' },
        { id: 68, title: 'Travel Writing Adventures', description: '여행기를 작성하는 즐거움에 대해 배웁니다.' },
        { id: 69, title: 'Writing Short Stories', description: '짧은 이야기 작성법을 다룹니다.' },
        { id: 70, title: 'Technical Writing Simplified', description: '기술적인 글쓰기를 쉽게 설명합니다.' },
        { id: 71, title: 'Memoir Writing for Beginners', description: '초보자를 위한 회고록 작성법을 안내합니다.' },
        { id: 72, title: 'Building Strong Arguments', description: '강력한 주장을 전개하는 방법을 소개합니다.' },
        { id: 73, title: 'The Power of Metaphors', description: '메타포를 효과적으로 사용하는 방법을 배웁니다.' },
        { id: 74, title: 'Crafting Effective Conclusions', description: '효과적인 결론을 작성하는 방법입니다.' },
        { id: 75, title: 'Writing for Children', description: '어린이를 위한 글쓰기 기법을 소개합니다.' },
        { id: 76, title: 'Essay Writing for Exams', description: '시험 대비 에세이 작성법을 다룹니다.' },
        { id: 77, title: 'Creative Nonfiction Writing', description: '창의적 논픽션 작성법을 배웁니다.' },
    ];

    // 페이지 변경 시 API 호출
    useEffect(() => {
        // const fetchBoxes = async () => {
        //     setLoading(true);
        //     try {
        //         // 예시 API 요청. 실제 API 경로와 쿼리 파라미터를 사용해야 함.
        //         const response = await fetch(`https://api.example.com/boxes?page=${page}&limit=9`);
        //         const data = await response.json();

        //         // API에서 가져온 데이터와 총 페이지 수 저장
        //         setBoxes(data.items); // items는 API의 데이터 배열로 가정
        //         setTotalPages(data.totalPages); // totalPages는 API에서 제공하는 총 페이지 수로 가정
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchBoxes();

        // 페이지당 보여줄 박스 수 설정
        const boxesPerPage = 9;
        // 전체 페이지 수 계산
        const totalPages = Math.ceil(sampleData.length / boxesPerPage);
        setTotalPages(totalPages);

        // 현재 페이지에 해당하는 박스 데이터 추출
        const startIndex = (page - 1) * boxesPerPage;
        const endIndex = startIndex + boxesPerPage;
        const pageData = sampleData.slice(startIndex, endIndex);

        // 박스 상태 업데이트
        setBoxes(pageData);
    }, [page]); // page가 변경될 때마다 호출

    // 페이지 변경 함수
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // 박스 클릭 시 페이지 이동
    const handleBoxClick = (id) => {
        navigate(`/${mode}/${id}`); // 클릭된 박스의 고유 ID로 페이지 이동
    };

    return (
        <>
            {mode === 'writing' && <span>작문</span>}
            {mode === 'copying' && <span>필사</span>}
            {mode === 'translating' && <span>번역</span>}
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {boxes.map((box, index) => (
                            <div
                                key={index}
                                style={{
                                    width: '200px',
                                    height: '150px',
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                                onClick={() => handleBoxClick(box.id)} // 클릭 시 페이지 이동
                            >
                                <h3 style={{ fontSize: '16px', margin: '5px 0' }}>{box.title}</h3>
                                <p style={{ fontSize: '12px', textAlign: 'center' }}>{box.description}</p>
                            </div>
                        ))}
                    </div>
                )}

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
            </div>
        </>
    );
}
