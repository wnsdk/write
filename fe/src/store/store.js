import { create } from 'zustand';

const useTestStore = create((set) => ({
    counter: 0,
    plusCounter: () => set((state) => ({ counter: state.counter + 1 })),
    resetCounter: () => set({ counter: 0 }),
}));

export { useTestStore };
