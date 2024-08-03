import { create } from "zustand";
import { IOffice } from "../types";

interface IOfficesStore {
  offices: IOffice[];
  setStoredOffices: (offices: IOffice[]) => void;
  updateStoredOffice: (id: string, updatedFields: Partial<IOffice>) => void;
  addStoredOffice: (office: IOffice) => void;
  removeStoredOffice: (id: string) => void;
}

const useOfficesStore = create<IOfficesStore>((set) => ({
  offices: [],
  setStoredOffices: (offices) => set({ offices }),
  updateStoredOffice: (id: string, updatedFields: Partial<IOffice>) =>
    set((state) => ({
      offices: state.offices.map((office) =>
        office.id === id ? { ...office, ...updatedFields } : office
      ),
    })),
  addStoredOffice: (office: IOffice) =>
    set((state) => ({ offices: [...state.offices, office] })),
  removeStoredOffice: (id: string) =>
    set((state) => ({
      offices: state.offices.filter((office) => office.id !== id),
    })),
}));

export { useOfficesStore };
