import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ITokenStore {
  token: string;
  setToken: () => void;
  clearToken: () => void;
}

export const useTokenStore = create<ITokenStore>()(
  devtools(
    persist((set) => ({
      token: "",
      setToken: () => set((state) => ({ token: state.token })),
      clearToken: () => set(() => ({ token: "" })),
    }))
  )
);
