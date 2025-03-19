import { create } from "zustand";
import { changeStatus, createTask, getTasks } from "../services/index";

interface TaskStore {
  tasks: Task[];
  addTask: (formData: Omit<UseFormValues, "id">) => Promise<void>;
  fetchTasks: () => Promise<void>;
  updateTaskStatus: (
    taskId: number,
    statusId: number,
    statusName: string
  ) => Promise<void>;
  updateTaskComments: (taskId: number, totalComments: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: async (formData: UseFormValues) => {
    try {
      const createdTask = await createTask(formData);
      set((state) => ({
        tasks: [...state.tasks, createdTask],
      }));
    } catch (error) {
      console.error("Failed to create task", error);
      throw error;
    }
  },
  fetchTasks: async () => {
    try {
      const fetchedTasks = await getTasks();
      set(() => ({
        tasks: fetchedTasks,
      }));
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      throw error;
    }
  },
  updateTaskStatus: async (taskId, statusId, statusName) => {
    try {
      await changeStatus(taskId, statusId);
      // Update local state
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? { ...task, status: { id: statusId, name: statusName } }
            : task
        ),
      }));
    } catch (error) {
      console.error("Failed to update task status", error);
      throw error;
    }
  },
  updateTaskComments: (taskId, totalComments) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, total_comments: totalComments } : task
      ),
    })),
}));
