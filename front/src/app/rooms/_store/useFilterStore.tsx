import { create } from "zustand";

interface IFilterStore {
  filters: {
    services: string[];
    location: string[];
  };
  setFilters: (filters: { services: string[]; location: string[] }) => void;
}

const useFilterStore = create<IFilterStore>((set) => ({
  filters: {
    services: [],
    location: [],
  },
  setFilters: (filters) => set({ filters }),
}));

export { useFilterStore };
