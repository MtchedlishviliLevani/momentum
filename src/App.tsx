import { Outlet } from "react-router"
import Modal from "./components/Modal/Modal"
import { useState } from "react"
import ColleagueAdd from "./components/CreateEmployee/CreateEmployee";
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
      <Modal isOpen={isOpenModal} onCloseModal={closeModal}>
        <ColleagueAdd onCloseModal={closeModal} />
      </Modal>
      <main>
        <Outlet context={{ openModal }} />
      </main>

    </>
  )
}

export default App
