import { create } from "zustand";
import { getPriorities } from "../services";
type Priority = {
  id: number;
  name: string;
  icon: string;
};

type PriorityStore = {
  priorities: Priority[];
  fetchPriorities: () => Promise<void>;
};

export const usePriorityStore = create<PriorityStore>((set) => ({
  priorities: [],
  fetchPriorities: async () => {
    try {
      const data = await getPriorities();
      set({ priorities: data });
    } catch (err) {
      console.error("Failed to fetch priorities:", err);
    }
  },
}));
