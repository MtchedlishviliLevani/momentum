import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.tsx'
import CreateTaskPage from './pages/CreateTaskPage.tsx'
import TaskDetailPage from './pages/TaskDetailPage.tsx'

const router = createBrowserRouter([{
  path: "/",
  element: <App />, // used as shared layout
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
  }
  ]

}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
