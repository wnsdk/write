import { Outlet } from 'react-router-dom';
import { Buffer } from 'buffer';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoginStore } from '@/store/loginStore';
import { authAxios } from '@/apis/authAxios';

export default function Header() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { email, name, profile, role, accessToken, setAccessToken, setLogout } = useLoginStore();

    const logout = () => {
        authAxios.post(`/logout`).then(() => {
            setLogout(); // store에 저장된 로그인 정보 없애기
            navigate('/');
        });
    };

    useEffect(() => {
        const base64Payload = searchParams.get('accessToken').split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64');
        const result = JSON.parse(payload.toString());

        useLoginStore.setState({
            email: result.email,
            name: result.name,
            profile: result.profile,
            role: result.auth,
            accessToken: searchParams.get('accessToken'),
        });
    }, []);

    return (
        <>
            {' '}
            <div>
                <h2>환영합니다</h2>
                <img src={profile} />
                <h3>{name} 님</h3>

                <table>
                    <tbody>
                        <tr>
                            <th>이메일</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th>권한</th>
                            <td>{role}</td>
                        </tr>

                        <tr>
                            <th>access token</th>
                            <td>{accessToken}</td>
                        </tr>
                    </tbody>
                </table>

                <button onClick={() => logout()}>로그아웃</button>
            </div>
            <Outlet />
        </>
    );
}
