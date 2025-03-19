import { create } from "zustand";
import { getEmployees, createEmployeeApi } from "../services/index";
import { produce } from "immer";
interface Department {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
}

interface EmployeeState {
  employees: Employee[];
  fetchEmployees: () => Promise<void>;
  createEmployee: (formData: FormData) => Promise<void>;
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
      set(
        produce((state) => {
          state.employees.push(newEmployee);
        })
      );
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },
}));
