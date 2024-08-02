import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  authToken: string | null;
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authToken: null,
      setAuthToken: (token) => set({ authToken: token }),
      removeAuthToken: () => set({ authToken: null }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export { useAuthStore };
