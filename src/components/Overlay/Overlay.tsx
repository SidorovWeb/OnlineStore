import { FC, useContext, useState } from 'react'
import style from './Overlay.module.scss'
import cn from 'classnames'
import { ModalContext } from '@/contex/ModalProvider'

const Overlay: FC = () => {
    const { modal, setModal } = useContext(ModalContext)

    return (
        <div
            className={cn([style.overlay, modal ? style.active : ''])}
            onClick={() => setModal(false)}
        ></div>
    )
}

export default Overlay
