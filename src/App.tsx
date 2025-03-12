import { Outlet } from "react-router"

function App() {

  return (
    <>
      <header>header</header>
      <main>
        <Outlet />
      </main>

    </>
  )
}

export default App
