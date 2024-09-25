import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLoginStore = create(
    persist(
        (set) => ({
            email: null,
            name: null,
            profile: null,
            role: null,
            accessToken: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            // setLogin: (email, name, profile, role, accessToken) => {
            //     set({ email, name, profile, role, accessToken });
            // },
            setLogout: () => set({ email: null, name: null, profile: null, role: null, accessToken: null }),
        }),
        {
            name: 'login-storage', // 로컬 스토리지 키 이름
            getStorage: () => localStorage, // 사용할 스토리지
        }
    )
);

export { useLoginStore };
