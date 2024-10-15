import { create } from "zustand";

interface IUsersStore {
  users: any[];
  setUsers: (users: any[]) => void;
  toggleActivateUser: (userId: string) => void;
}

const useUsersStore = create<IUsersStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  toggleActivateUser: (userId) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, is_active: !user.is_active } : user
      ),
    })),
}));

export { useUsersStore };
