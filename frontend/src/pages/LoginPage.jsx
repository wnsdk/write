import { useLoginStore } from '@/store/loginStore';
import { $ } from '@/apis/axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    // 소셜 로그인
    function socialLogin(thirdPartyId) {
        window.location.href = `http://localhost:8080/oauth2/authorization/${thirdPartyId}?redirect_uri=http://localhost:5173/oauth/redirect`;
    }

    return (
        <div>
            <div>
                <button onClick={() => socialLogin('google')}>구글 로그인</button>
            </div>
        </div>
    );
}
