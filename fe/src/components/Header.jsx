import { Outlet } from "react-router-dom";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useLoginStore } from "@/store/loginStore";
import { authAxios } from "@/apis/authAxios";
import styles from "./Header.module.scss";
import { useGradientStore } from "@/store/gradientStore";

export default function Header() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { profile, accessToken, setLogout } = useLoginStore();
  const setIsFull = useGradientStore((state) => state.setIsFull);
  const location = useLocation();

  const logout = () => {
    authAxios.post(`/logout`).then(() => {
      setLogout(); // 스토어에서 로그인 정보 삭제
      navigate("/"); // 홈으로 이동
    });
  };

  useEffect(() => {
    const token = searchParams.get("accessToken");
    if (token) {
      // 액세스 토큰이 존재하면 디코딩하여 사용자 정보를 설정
      const base64Payload = token.split(".")[1];
      const payload = Buffer.from(base64Payload, "base64");
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

  const handleListNavigate = (mode) => {
    setIsFull(true); // 확장 상태로 설정
    if (location.pathname === "/") {
      setTimeout(() => {
        navigate("/list", { state: { mode: mode } });
      }, 500); // 애니메이션 시간과 맞추어 지연
    } else {
      navigate("/list", { state: { mode: mode } });
    }
  };

  // 로그인 상태에 따라 조건부 렌더링
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_container}>
          {/* <img className={styles.logo} src="/icon_circle.png" alt="logo" /> */}
          <span className={styles.title} onClick={() => navigate("/")}>
            write
          </span>
          <nav className={styles.nav}>
            <span onClick={() => navigate("/ServiceIntroduction")}>
              서비스 소개
            </span>
            <span onClick={() => handleListNavigate("writing")}>작문</span>
            <span onClick={() => handleListNavigate("copying")}>필사</span>
            <span onClick={() => handleListNavigate("translating")}>번역</span>
          </nav>
          {!accessToken && (
            <button className={styles.login} onClick={() => navigate("/login")}>
              로그인
            </button>
          )}
          {accessToken && (
            <div className={styles.login}>
              <div className={styles.hover_box}>
                <img
                  className={styles.profile}
                  src={profile}
                  alt="프로필 이미지"
                  onClick={() => navigate("/my")}
                />
                <div className={styles.tooltip}>
                  <div onClick={() => navigate("/my")}>마이페이지</div>
                  <div onClick={() => logout()}>로그아웃</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
