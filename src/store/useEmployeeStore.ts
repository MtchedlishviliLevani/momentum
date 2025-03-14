import { create } from "zustand";
import { getEmployees, createEmployeeApi } from "../services/index";

interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
}

interface EmployeeState {
  employees: Employee[];
  fetchEmployees: () => Promise<void>;
  createEmployee: (formData: FormData) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],

  fetchEmployees: async () => {
    try {
      const data = await getEmployees();
      set({ employees: data });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  },
  createEmployee: async (formData: FormData) => {
    try {
      const newEmployee = await createEmployeeApi(formData);
      set((state) => ({
        employees: [...state.employees, newEmployee],
      }));
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },
}));
