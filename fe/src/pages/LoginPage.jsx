import { useLoginStore } from "@/store/loginStore";
import { $ } from "@/apis/axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import google_logo from "@/assets/svg/google-white.svg";
import apple_logo from "@/assets/svg/apple-white.svg";
import character from "@/assets/image/writing-with-a-big-pencil.png";
import { motion } from "framer-motion";

export default function LoginPage() {
  const navigate = useNavigate();

  // 소셜 로그인
  function socialLogin(thirdPartyId) {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/oauth2/authorization/${thirdPartyId}?redirect_uri=${
      import.meta.env.VITE_BASE_URL
    }/oauth/redirect`;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <div className={styles.fullscreen}>
        <span className={styles.logo} onClick={() => navigate("/")}>
          write
        </span>

        <section>
          <img className={styles.character} src={character} />

          <div className={styles.right}>
            <div className={styles.title}>
              지금 바로 <span className={styles.logo_inline}>write</span>를
              시작해 보세요!
            </div>
            <div className={styles.content}>
              영어 작문 연습의 시작점, 여기에서 경험하세요.
              <br /> AI 첨삭을 통해 글을 다듬고, 표현력을 키울 수 있습니다.
              <br /> 어디서도 경험하지 못한 새로운 학습 방법을 제공합니다.
              <br /> 지금 바로 로그인하고, 당신의 영어 실력을 한 단계
              업그레이드하세요.
            </div>

            <div className={styles.title}>
              로그인을 하면
              <br />더 다양한 서비스를 제공받을 수 있습니다.
            </div>
            <div className={styles.loginButtons}>
              <button onClick={() => socialLogin("google")}>
                <img src={google_logo} alt="google" /> Google 로그인
              </button>
              <button
                onClick={() =>
                  // socialLogin('google')
                  alert("아직 준비 중입니다")
                }
              >
                <img src={apple_logo} alt="apple" />
                Apple 로그인
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
