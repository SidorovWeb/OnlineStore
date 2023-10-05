import { FC } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IUser } from '@/interfaces/user.interface'
import { useSession, signOut, signIn } from 'next-auth/react'
import VK from '../../../public/vk.svg'
import Google from '../../../public/google.svg'
import { MyButton } from '../Button/Button'
import { useSearchParams } from 'next/navigation'
import MyInput from '../Input/MyInput'
import style from './Login.module.scss'
import Image from 'next/image'

interface ILogin {
    setModal: (isModal: boolean) => void
}

const Login: FC<ILogin> = ({ setModal }) => {
    const session = useSession()
    const searchParams = useSearchParams()

    const {
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<IUser>({
        defaultValues: {
            email: '',
            password: '',
            userName: '',
        },
    })

    const onSingIn: SubmitHandler<IUser> = (data) => {
        signIn('credentials', {
            name: data.userName,
            password: data.password,
            email: data.email,
        })
    }

    const singInOnGoogle = () => {
        signIn('google', {
            callbackUrl: searchParams.get('callbackUrl') || '/',
        })
    }

    const singInOnVK = () => {
        signIn('vk', {
            callbackUrl: searchParams.get('callbackUrl') || '/',
        })
    }

    function logOut() {
        signOut()
        setModal(false)
    }

    return (
        <>
            {session?.data ? (
                <MyButton onClick={logOut} className={style.logOutBtn}>
                    Log out
                </MyButton>
            ) : (
                <>
                    <div className={style.title}>Login to account</div>
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
                                    message: 'Enter a correct email',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
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
                            render={({ field: { onChange, value } }) => (
                                <MyInput
                                    type="password"
                                    id="userPassword"
                                    placeholder="Password"
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
                            render={({ field: { onChange, value } }) => (
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
                        <MyButton type="submit">Sing In</MyButton>
                    </form>
                    <p className={style.center}>or</p>
                    <button
                        type="button"
                        className={style.loginWithGoogle}
                        onClick={singInOnGoogle}
                    >
                        <Image
                            src={Google}
                            width={25}
                            height={24}
                            alt="VK icon"
                        />
                        <span>Sign in with Google</span>
                    </button>
                    <button
                        type="button"
                        className={style.vk}
                        onClick={singInOnVK}
                    >
                        <Image src={VK} width={25} height={24} alt="VK icon" />
                        <span>Sign in with VK</span>
                    </button>
                </>
            )}
        </>
    )
}

export default Login
