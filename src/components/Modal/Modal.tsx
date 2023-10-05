import { FC, useContext } from 'react'
import Close from '../../../public/delete.svg'
import Image from 'next/image'
import style from './Modal.module.scss'
import cn from 'classnames'
import { ModalContext } from '@/contex/ModalProvider'
import Login from '../Login/Login'

const Modal: FC = () => {
    const { modal, setModal } = useContext(ModalContext)

    return (
        <div className={cn([style.modal, modal ? style.open : ''])}>
            <div className={style.close} onClick={() => setModal(false)}>
                <Image src={Close} width={78} height={32} alt="logo" />
            </div>
            <Login setModal={setModal} />
        </div>
    )
}

export default Modal
