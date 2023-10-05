import { ChangeEvent, FC } from 'react'
import style from './MyInput.module.scss'

interface IMuInput {
    type: string
    id: string
    defaultValue?: string | number
    placeholder: string
    label?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
}

const MyInput: FC<IMuInput> = ({
    type,
    id,
    defaultValue,
    placeholder,
    label,
    onChange,
    onBlur,
}) => {
    return (
        <div
            className={typeof defaultValue === 'number' ? style.inputWrap : ''}
        >
            {label && typeof defaultValue === 'number' && (
                <label className={style.label} htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                name={id}
                value={defaultValue}
                onChange={onChange}
                className={style.input}
                placeholder={placeholder}
            />
        </div>
    )
}

export default MyInput
