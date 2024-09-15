// import { Outlet } from 'react-router-dom';
// import { Buffer } from 'buffer';
// import { useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useLoginStore } from '@/store/loginStore';
// import { authAxios } from '@/apis/authAxios';

// export default function Header() {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     const { email, name, profile, role, accessToken, setAccessToken, setLogout } = useLoginStore();

//     const logout = () => {
//         authAxios.post(`/logout`).then(() => {
//             setLogout(); // store에 저장된 로그인 정보 없애기
//             navigate('/');
//         });
//     };

//     useEffect(() => {
//         const base64Payload = searchParams.get('accessToken').split('.')[1];
//         const payload = Buffer.from(base64Payload, 'base64');
//         const result = JSON.parse(payload.toString());

//         useLoginStore.setState({
//             email: result.email,
//             name: result.name,
//             profile: result.profile,
//             role: result.auth,
//             accessToken: searchParams.get('accessToken'),
//         });
//     }, []);

//     return (
//         <>
//             {' '}
//             <div>
//                 <h2>환영합니다</h2>
//                 <img src={profile} />
//                 <h3>{name} 님</h3>

//                 <table>
//                     <tbody>
//                         <tr>
//                             <th>이메일</th>
//                             <td>{email}</td>
//                         </tr>
//                         <tr>
//                             <th>권한</th>
//                             <td>{role}</td>
//                         </tr>

//                         <tr>
//                             <th>access token</th>
//                             <td>{accessToken}</td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 <button onClick={() => logout()}>로그아웃</button>
//             </div>
//             <Outlet />
//         </>
//     );
// }
import { Outlet } from "react-router-dom";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoginStore } from "@/store/loginStore";
import { authAxios } from "@/apis/authAxios";
import styles from "./Header.module.scss";

export default function Header() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { email, name, profile, role, accessToken, setAccessToken, setLogout } =
    useLoginStore();

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

  // 로그인 상태에 따라 조건부 렌더링
  if (!accessToken) {
    return (
      <>
        <div className={styles.header}>
          {/* <img className={styles.logo} src="/icon_circle.png" alt="logo" /> */}
          <span className={styles.title} onClick={() => navigate("/")}>
            write
          </span>
          <nav className={styles.nav}>
            <span onClick={() => navigate("/ServiceIntroduction")}>
              서비스 소개
            </span>
            <span
              onClick={() => navigate("/list", { state: { mode: "writing" } })}
            >
              작문
            </span>
            <span
              onClick={() => navigate("/list", { state: { mode: "copying" } })}
            >
              필사
            </span>
            <span
              onClick={() =>
                navigate("/list", { state: { mode: "translating" } })
              }
            >
              번역
            </span>
          </nav>
          <button className={styles.login} onClick={() => navigate("/login")}>
            로그인
          </button>
        </div>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h2>환영합니다</h2>
        <img src={profile} alt="프로필 이미지" />
        <h3>{name}님</h3>
        <button onClick={() => logout()}>로그아웃</button>
      </div>
      <Outlet />
    </>
  );
}
