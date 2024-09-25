import { useLoginStore } from "@/store/loginStore";

export default function MyPage() {
  const { email, name, profile, role, accessToken } = useLoginStore();
  return (
    <>
      <div>
        <div>이메일</div>
        <div>{email}</div>
      </div>
      <div>
        <div>이름</div>
        <div>{name}</div>
      </div>
      <div>
        <div>프로필 사진 url</div>
        <div>{profile}</div>
      </div>
      <div>
        <div>권한</div>
        <div>{role}</div>
      </div>
      <div>
        <div>액세스 토큰</div>
        <div>{accessToken}</div>
      </div>
    </>
  );
}
