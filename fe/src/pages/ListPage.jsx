import { useParams } from 'react-router-dom';

export default function ListPage() {
    const { mode } = useParams();

    return (
        <>
            {mode === 'writing' && <p>작문</p>}
            {mode === 'copying' && <p>필사</p>}주제 리스트
        </>
    );
}
