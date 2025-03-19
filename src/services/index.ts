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

/// Get statuses

export async function getStatuses() {
  try {
    const response = await api.get("/statuses");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
}

/// Get prioritaties
export async function getPriorities() {
  try {
    const response = await api.get("/priorities");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
}

/// POST create task

export async function createTask(formData: UseFormValues) {
  try {
    const response = await api.post("/tasks", formData, {
      headers: {
        "Content-Type": "application/json",
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
}

/// Get tasks
export async function getTasks() {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(message);
  }
}

/// get specific task
export async function getTask(taskId: string): Promise<DetailTask> {
  try {
    const response = await api.get(`tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

/// PUT change status
export async function changeStatus(id: number, statusId: number) {
  try {
    const response = await api.put(`tasks/${id}`, {
      status_id: statusId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

/// POST comment
export async function addComment(
  taskId: number,
  text: string,
  parentId: number | null = null
) {
  try {
    const response = await api.post(`/tasks/${taskId}/comments`, {
      text,
      parent_id: parentId,
    });

    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function getComments(taskId: number) {
  try {
    const response = await api.get(`tasks/${taskId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
