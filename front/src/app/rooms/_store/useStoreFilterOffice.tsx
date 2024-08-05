import { IOffice } from "@/app/dashboard/admin/types";
import { create } from "zustand";

interface IOfficesRooms {
  offices: IOffice[];
  setStoredOffices: (offices: IOffice[]) => void;
}

const useOfficesRoomsStore = create<IOfficesRooms>((set) => ({
  offices: [],
  setStoredOffices: (offices) => set({ offices }),
}));

export { useOfficesRoomsStore };
