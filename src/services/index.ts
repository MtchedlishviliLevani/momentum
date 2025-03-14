// services
import axios from "axios";

const URL = "https://momentum.redberryinternship.ge/api/";
const API_TOKEN = "9e6a67c9-72bb-44fb-8fcc-65b4c965ded8";

const api = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

// Get Employees
export async function getEmployees() {
  try {
    const response = await api.get(`/employees`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Something worng happened:", error);
    throw error;
  }
}

// POST add new Employees
export const createEmployeeApi = async (formData: FormData) => {
  try {
    const response = await api.post("/employees", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

// GET department
export async function getDepartments() {
  try {
    const response = await api.get(`/departments`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Something worng happened:", error);
    throw error;
  }
}
