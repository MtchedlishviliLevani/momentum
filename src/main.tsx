import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, LoaderFunctionArgs, RouterProvider } from 'react-router'
import Home from './pages/Home.tsx'
import CreateTaskPage from './pages/CreateTaskPage.tsx'
import TaskDetailPage from './pages/TaskDetailPage.tsx'
import { getTask } from './services/index.ts'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [{
    index: true,
    element: <Home />
  },
  {
    path: "create-task",
    element: <CreateTaskPage />
  },
  {
    path: "task/:taskId",
    element: <TaskDetailPage />,
    hydrateFallbackElement: <h1>Loading...</h1>,
    loader: async function fetchTaskDetail({ params }: LoaderFunctionArgs): Promise<DetailTask> {
      try {
        const { taskId } = params as { taskId: string };
        const response = await getTask(taskId);
        return response
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
      }
    }
  }
  ]

}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
