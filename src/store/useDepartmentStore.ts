import { create } from "zustand";
import { getDepartments } from "../services";

interface Department {
  id: number;
  name: string;
}

interface DepartmentState {
  departments: Department[];
  fetchDepartments: () => Promise<void>;
}

export const useDepartmentStore = create<DepartmentState>((set) => ({
  departments: [],
  fetchDepartments: async () => {
    try {
      const data = await getDepartments();
      set({ departments: data });
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  },
}));
