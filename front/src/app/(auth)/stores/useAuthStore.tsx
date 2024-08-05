import { IUserData } from "@/app/dashboard/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuthState {
  authToken: string | null;
  userData: IUserData | null;
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
  setUserData: (userData: IUserData) => void;
  removeUserData: () => void;
}

const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      authToken: null,
      userData: null,
      setAuthToken: (token) => set({ authToken: token }),
      removeAuthToken: () => set({ authToken: null }),
      setUserData: (userData) => set({ userData }),
      removeUserData: () => set({ userData: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useAuthStore };
