import { useEmployeeStore } from "../store/useEmployeeStore";

export const useEmployee = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const fetchEmployees = useEmployeeStore((state) => state.fetchEmployees);
  const createEmployee = useEmployeeStore((state) => state.createEmployee);

  return {
    employees,
    fetchEmployees,
    createEmployee,
  };
};
