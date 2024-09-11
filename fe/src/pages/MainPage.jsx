import { useNavigate } from 'react-router-dom';

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate('/list', { mode: { type: 'writing' } })}>작문하기</button>
            <button onClick={() => navigate('/list', { mode: { type: 'copying' } })}>필사하기</button>
        </>
    );
}
