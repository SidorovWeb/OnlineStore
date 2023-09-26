import { FC, useContext, useState } from 'react'
import { MyButton } from '../UI/Button/Button'
import Close from '../../../public/delete.svg'
import Image from 'next/image'
import style from './Modal.module.scss'
import MyInput from '../UI/Input/MyInput'
import cn from 'classnames'
import { ModalContext } from '@/contex/ModalProvider'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { UserContext } from '@/contex/UserProvider'
import { IUser } from '@/interfaces/user.interface'

const Modal: FC = () => {
    const { modal, setModal } = useContext(ModalContext)
    const { user, setUser } = useContext(UserContext)
    const [isReg, setIsReg] = useState<boolean>(false)
    const [isMatches, setIsMatches] = useState(true)

    const {
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm<IUser>({
        defaultValues: {
            email: '',
            password: '',
            userName: '',
        },
    })

    const onSubmit: SubmitHandler<IUser> = (data) => {
        setUser({
            ...data,
            isRegister: true,
        })
        setModal(false)
        reset()
        localStorage.setItem(
            'Tuff-user',
            JSON.stringify({ ...data, isRegister: true })
        )
    }

    const onSingIn: SubmitHandler<IUser> = (data) => {
        const dataMatches =
            user?.email.toLowerCase() === data.email.toLowerCase() &&
            user?.password.toLowerCase() === data.password.toLowerCase()

        if (!dataMatches) {
            setIsMatches(false)
            return
        }

        if (user && dataMatches) {
            setUser({
                ...user,
                isRegister: true,
            })
            setModal(false)
            reset()
            localStorage.setItem(
                'Tuff-user',
                JSON.stringify({ ...user, isRegister: true })
            )
            setIsMatches(true)
        }
    }

    function logOut() {
        if (user) {
            setUser({ ...user, isRegister: false })
            setModal(false)
            localStorage.setItem(
                'Tuff-user',
                JSON.stringify({ ...user, isRegister: false })
            )
        }
    }

    return (
        <div className={cn([style.modal, modal ? style.open : ''])}>
            <>
                {user && user.isRegister ? (
                    <MyButton onClick={logOut}>Log out</MyButton>
                ) : (
                    <>
                        {isReg ? (
                            <>
                                <div className={style.title}>
                                    Login to account
                                </div>
                                <form
                                    className={style.form}
                                    onSubmit={handleSubmit(onSingIn)}
                                    autoComplete="off"
                                    noValidate
                                >
                                    <Controller
                                        control={control}
                                        name="email"
                                        rules={{
                                            required: 'Field required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    'Enter a correct email',
                                            },
                                        }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <MyInput
                                                type="email"
                                                id="userEmail"
                                                onChange={onChange}
                                                placeholder="Email"
                                                defaultValue={value.trim()}
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <p className={style.error}>
                                            {errors?.email?.message}
                                        </p>
                                    )}

                                    <Controller
                                        control={control}
                                        name="password"
                                        rules={{
                                            required: 'Field required',
                                            pattern: {
                                                value: /^\S*$/,
                                                message:
                                                    'The password must not leave spaces',
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Minimum 6 characters',
                                            },
                                        }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <MyInput
                                                type="password"
                                                id="userPassword"
                                                placeholder="password"
                                                onChange={onChange}
                                                defaultValue={value.trim()}
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <p className={style.error}>
                                            {errors?.password?.message}
                                        </p>
                                    )}
                                    {!isMatches && (
                                        <p className={style.error}>
                                            Wrong password or email
                                        </p>
                                    )}

                                    <MyButton type="submit">Sing In</MyButton>
                                </form>
                                <div
                                    className={style.haveAnAcc}
                                    onClick={() => setIsReg(false)}
                                >
                                    I don't have an account
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={style.title}>Register</div>
                                <form
                                    className={style.form}
                                    onSubmit={handleSubmit(onSubmit)}
                                    autoComplete="off"
                                    noValidate
                                >
                                    <Controller
                                        control={control}
                                        name="email"
                                        rules={{
                                            required: 'Field required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    'Enter a correct email',
                                            },
                                        }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <MyInput
                                                type="email"
                                                id="userEmail"
                                                onChange={onChange}
                                                placeholder="Email"
                                                defaultValue={value.trim()}
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <p className={style.error}>
                                            {errors?.email?.message}
                                        </p>
                                    )}

                                    <Controller
                                        control={control}
                                        name="password"
                                        rules={{
                                            required: 'Field required',
                                            pattern: {
                                                value: /^\S*$/,
                                                message:
                                                    'The password must not leave spaces',
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Minimum 6 characters',
                                            },
                                        }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <MyInput
                                                type="password"
                                                id="userPassword"
                                                placeholder="password"
                                                onChange={onChange}
                                                defaultValue={value.trim()}
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <p className={style.error}>
                                            {errors?.password?.message}
                                        </p>
                                    )}

                                    <Controller
                                        control={control}
                                        name="userName"
                                        rules={{
                                            required: 'Field required',
                                            minLength: {
                                                value: 6,
                                                message: 'Minimum 6 characters',
                                            },
                                        }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <MyInput
                                                type="text"
                                                id="userUsername"
                                                placeholder="Username"
                                                onChange={onChange}
                                                defaultValue={value}
                                            />
                                        )}
                                    />
                                    {errors.userName && (
                                        <p className={style.error}>
                                            {errors?.userName?.message}
                                        </p>
                                    )}
                                    <MyButton type="submit">Sing Up</MyButton>
                                </form>
                                <div
                                    className={style.haveAnAcc}
                                    onClick={() => setIsReg(true)}
                                >
                                    I have an account
                                </div>
                            </>
                        )}
                    </>
                )}
            </>

            <div className={style.close} onClick={() => setModal(false)}>
                <Image src={Close} width={78} height={32} alt="logo" />
            </div>
        </div>
    )
}

export default Modal
