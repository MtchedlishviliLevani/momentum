import { create } from "zustand";
import { getStatuses } from "../services/index";

type Status = {
  id: number;
  name: string;
};

type StatusStore = {
  statuses: Status[];
  fetchStatuses: () => Promise<void>;
};
const useStatusStore = create<StatusStore>((set) => ({
  statuses: [],

  fetchStatuses: async () => {
    try {
      const data = await getStatuses();
      set({ statuses: data });
    } catch (error) {
      console.error("Failed to fetch statuses:", error);
    }
  },
}));

export default useStatusStore;
