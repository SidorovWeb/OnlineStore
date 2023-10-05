import React, { ButtonHTMLAttributes, FC } from 'react'
import style from './Button.module.scss'
import cn from 'classnames'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const MyButton: FC<Props> = ({ children, className, ...props }) => {
    return (
        <button className={cn(style.btn, className)} {...props}>
            {children}
        </button>
    )
}
