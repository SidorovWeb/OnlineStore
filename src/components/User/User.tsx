import { FC, useContext } from 'react'
import { ModalContext } from '@/contex/ModalProvider'
import { useSession } from 'next-auth/react'
import { MyButton } from '../Button/Button'
import style from './User.module.scss'
import Image from 'next/image'

const User: FC = () => {
    const { setModal } = useContext(ModalContext)
    const session = useSession()
    console.log(session)

    return (
        <div className={style.user} onClick={() => setModal(true)}>
            {session?.data?.user?.image && (
                <div className={style.userIconWrap}>
                    <Image
                        className={style.userIcon}
                        src={session?.data?.user?.image ?? ''}
                        width={22}
                        height={19}
                        alt="user"
                    />
                </div>
            )}
            <p className={style.userName}>
                {session?.data ? (
                    session?.data.user?.name
                ) : (
                    <MyButton className={style.signInBtn}>Sign in</MyButton>
                )}
            </p>
        </div>
    )
}

export default User
