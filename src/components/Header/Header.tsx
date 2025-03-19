import { Link, useNavigate } from "react-router"
import Button from "../UI/Button"

function Header({ onOpenModal }: { onOpenModal: () => void }) {
    const navigate = useNavigate();
    function openCreateNewTask() {
        navigate("/create-task")
    }
    return (
        <header className="py-[31px]">
            <div className="flex justify-between items-center">
                <Link to={"/"}> <img src="/svg/logo1.svg" alt="page's logo" />   </Link>
                <div className="flex items-center gap-[40px]">
                    <Button variant="outline" shape="default" padding="compact" onClick={onOpenModal}>თანამშრომლის შექმნა</Button>
                    <Button variant="primary" shape="default" padding="compact" onClick={openCreateNewTask}><img src="/svg/addIcon.svg" alt="add Icon" /><span>შექმენი ახალი დავალება</span></Button>
                </div>
            </div>
        </header >
    )
}

export default Header
