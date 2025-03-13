import Button from "../Button/Button"

function Header({ onOpenModal }: { onOpenModal: () => void }) {
    return (
        <header className="py-[31px]">
            <div className="flex justify-between items-center">
                <img src="/svg/logo1.svg" alt="page's logo" />
                <div className="flex items-center gap-[40px]">
                    <Button variant="outline" shape="default" onClick={onOpenModal}>თანამშრომლის შექმნა</Button>
                    <Button variant="primary" shape="default"><img src="/svg/addIcon.svg" alt="add Icon" /><span>შექმენი ახალი დავალება</span></Button>
                </div>
            </div>
        </header>
    )
}

export default Header
