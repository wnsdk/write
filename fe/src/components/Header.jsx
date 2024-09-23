import { Outlet } from "react-router-dom";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useLoginStore } from "@/store/loginStore";
import { authAxios } from "@/apis/authAxios";
import styles from "./Header.module.scss";
import GradientBox from "@/components/GradientBox";

export default function Header() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { profile, accessToken, setLogout } = useLoginStore();
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
    navigate("/list", { state: { mode: mode } });
  };

  // 그라디언트 박스
  let gradientHeight = 0;

  switch (true) {
    case location.pathname === "/":
    case location.pathname === "/oauth/redirect":
      gradientHeight = 1;
      break;
    case location.pathname === "/list":
    case location.pathname === "/correction":
      gradientHeight = 2;
      break;
    case location.pathname === "/login":
    case location.pathname.startsWith("/writing"):
    case location.pathname.startsWith("/copying"):
    case location.pathname.startsWith("/translating"):
      gradientHeight = 3;
      break;
    default:
      gradientHeight = 0;
  }

  // 로그인 상태에 따라 조건부 렌더링
  return (
    <div className={styles.container}>
      <GradientBox gradientHeight={gradientHeight} />
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          {/* <img className={styles.logo} src="/icon_circle.png" alt="logo" /> */}
          <span className={styles.title} onClick={() => navigate("/")}>
            write
          </span>
          <nav className={styles.nav}>
            <span onClick={() => navigate("/service-introduction")}>
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
              <div className={styles.hoverBox}>
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
