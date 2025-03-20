import { createPortal } from 'react-dom'

function Modal({ isOpen, onCloseModal, children }: ModalProps) {

    if (!isOpen) return null

    return createPortal(
        <div onClick={onCloseModal} className='fixed z-50 backdrop-blur-[4px]  top-0 left-0 w-full h-full bg-[#0D0F10]/15 flex justify-center '>
            <div onClick={(e) => e.stopPropagation()} className='absolute top-[118px] bg-white rounded-[10px] py-[40px] px-[50px]'>
                <img onClick={onCloseModal} className="block ml-auto cursor-pointer" src='/svg/closeIcon2.svg' alt="" />

                {children}
            </div>
        </div>,
        document.getElementById('modal') as HTMLElement
    )
}

export default Modal