import { create } from "zustand";
import { IOffice } from "../app/dashboard/admin/types";

interface IOfficesStore {
  offices: IOffice[];
  setStoredOffices: (offices: IOffice[]) => void;
  updateStoredOffice: (
    id: string,
    updatedFields: Partial<IOffice>,
    imgUrl?: string
  ) => void;
  addStoredOffice: (office: IOffice) => void;
  toggleActivateOffice: (id: string) => void;
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
  toggleActivateOffice: (id: string) => {
    set((state) => ({
      offices: state.offices.map((office) =>
        office.id === id ? { ...office, is_active: !office.is_active } : office
      ),
    }));
  },
}));

export { useOfficesStore };
