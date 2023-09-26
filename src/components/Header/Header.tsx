import { FC, useContext } from 'react'
import style from './Header.module.scss'
import Image from 'next/image'
import Logo from '../../../public/logo.svg'
import Basket from '../../../public/basket.svg'
import Faiv from '../../../public/faiv.svg'
import User from '../../../public/user.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CartContext } from '@/contex/CartProvider'
import { ModalContext } from '@/contex/ModalProvider'
import { UserContext } from '@/contex/UserProvider'

const Header: FC = () => {
    const { asPath } = useRouter()
    const { cartItems, favoriteItems } = useContext(CartContext)
    const { setModal } = useContext(ModalContext)
    const { user } = useContext(UserContext)

    return (
        <header className="header">
            <div className={style.wrapper}>
                <div className={style.container}>
                    {asPath === '/' ? (
                        <Image
                            className={style.logo}
                            src={Logo}
                            width={78}
                            height={32}
                            alt="logo"
                        />
                    ) : (
                        <Link href="/">
                            <Image
                                className={style.logo}
                                src={Logo}
                                width={78}
                                height={32}
                                alt="logo"
                            />
                        </Link>
                    )}

                    <nav className={style.menu}>
                        <div
                            className={style.user}
                            onClick={() => setModal(true)}
                        >
                            <div className={style.userIconWrap}>
                                <Image
                                    className={style.userIcon}
                                    src={User}
                                    width={22}
                                    height={19}
                                    alt="user"
                                />
                            </div>
                            <p className={style.userName}>
                                {user && user.isRegister
                                    ? user.userName
                                    : 'Enter'}
                            </p>
                        </div>
                        <Link className={style.favorites} href={'/favorite'}>
                            <Image
                                className={style.faivIcon}
                                src={Faiv}
                                width={18}
                                height={21}
                                alt="favorites"
                            />
                            {!favoriteItems.length ? (
                                <></>
                            ) : (
                                <span className={style.count}>
                                    {favoriteItems.length}
                                </span>
                            )}
                        </Link>
                        <Link className={style.basket} href={`/cart`}>
                            <Image
                                className={style.basketIcon}
                                src={Basket}
                                width={19}
                                height={21}
                                alt="basket"
                            />
                            {!cartItems.length ? (
                                <></>
                            ) : (
                                <span className={style.count}>
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
