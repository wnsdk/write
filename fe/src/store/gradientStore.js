import { create } from "zustand";

const useGradientStore = create((set) => ({
  isFull: false,
  setIsFull: (isFull) => set(() => ({ isFull })),
}));

export { useGradientStore };
