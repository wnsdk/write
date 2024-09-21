import { Outlet } from 'react-router-dom';
import { Buffer } from 'buffer';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoginStore } from '@/store/loginStore';
import { authAxios } from '@/apis/authAxios';
import styles from './Header.module.scss';

export default function Header() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { email, name, profile, role, accessToken, setAccessToken, setLogout } = useLoginStore();

    const logout = () => {
        authAxios.post(`/logout`).then(() => {
            setLogout(); // 스토어에서 로그인 정보 삭제
            navigate('/'); // 홈으로 이동
        });
    };

    useEffect(() => {
        const token = searchParams.get('accessToken');
        if (token) {
            // 액세스 토큰이 존재하면 디코딩하여 사용자 정보를 설정
            const base64Payload = token.split('.')[1];
            const payload = Buffer.from(base64Payload, 'base64');
            const result = JSON.parse(payload.toString());

            useLoginStore.setState({
                email: result.email,
                name: result.name,
                profile: result.profile,
                role: result.auth,
                accessToken: token,
            });
        }
    }, [searchParams]);

    // 로그인 상태에 따라 조건부 렌더링
    return (
        <>
            <div className={styles.header}>
                {/* <img className={styles.logo} src="/icon_circle.png" alt="logo" /> */}
                <span className={styles.title} onClick={() => navigate('/')}>
                    write
                </span>
                <nav className={styles.nav}>
                    <span onClick={() => navigate('/ServiceIntroduction')}>서비스 소개</span>
                    <span onClick={() => navigate('/list', { state: { mode: 'writing' } })}>작문</span>
                    <span onClick={() => navigate('/list', { state: { mode: 'copying' } })}>필사</span>
                    <span onClick={() => navigate('/list', { state: { mode: 'translating' } })}>번역</span>
                </nav>
                {!accessToken && (
                    <button className={styles.login} onClick={() => navigate('/login')}>
                        로그인
                    </button>
                )}
                {accessToken && (
                    <div className={styles.login}>
                        <div className={styles.hover_box}>
                            <img className={styles.profile} src={profile} alt="프로필 이미지" />
                            <div className={styles.tooltip}>
                                <div>마이페이지</div>
                                <div onClick={() => logout()}>로그아웃</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
}
