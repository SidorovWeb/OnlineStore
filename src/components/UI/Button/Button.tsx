import React, { ButtonHTMLAttributes, FC } from 'react'
import style from './Button.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const MyButton: FC<Props> = ({ children, ...props }) => {
    return (
        <button className={style.btn} {...props}>
            {children}
        </button>
    )
}
