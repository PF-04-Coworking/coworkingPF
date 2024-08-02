import { create } from "zustand";

interface IOfficesRooms {
    offices: IOffice1[];
    setStoredOffices: (offices: IOffice1[]) => void;
  }
  
  const useOfficesRoomsStore = create<IOfficesRooms>((set) => ({
    offices: [],
    setStoredOffices: (offices) => set({ offices }),
  }));

  export default useOfficesRoomsStore;