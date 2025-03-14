import { Outlet } from "react-router"
import Modal from "./components/Modal/Modal"
import { useState } from "react"
import ColleagueAdd from "./components/CreateEmployee/CreateEmployee";
import Button from "./components/UI/Button";
import Header from "./components/Header/Header";


function App() {

  const [isOpenModal, setIsOpenModal] = useState(false);

  function closeModal() {
    setIsOpenModal(false)
  }
  function openModal() {
    setIsOpenModal(true)
  }

  return (
    <>
      <Header onOpenModal={openModal} />
      <Button variant="primary" shape="default">
        შექმენი ახალი დავალება
      </Button>

      {/* 2️⃣ New Task Button */}
      <Button variant="outline" shape="default" >
        თანამშრომლის შექმნა
      </Button>

      {/* 3️⃣ Join Team Button */}
      <Button variant="primary" shape="pill">
        Join Team
      </Button>
      <header className="">header</header>
      <button onClick={() => setIsOpenModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Open Modal
      </button>
      <h2 className="text-[44px]">დავალებების გვერდი</h2>
      <Modal isOpen={isOpenModal} onCloseModal={closeModal}>
        <ColleagueAdd onCloseModal={closeModal} />
      </Modal>
      <main>
        <h1 className="text-5xl font-firaGo">FiraaaaaaaaG</h1>
        <Outlet />
      </main>

    </>
  )
}

export default App
