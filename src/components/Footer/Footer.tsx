import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from '../../../public/logo.svg'
import style from './Footer.module.scss'

const Footer: FC = () => {
    const { asPath } = useRouter()

    return (
        <footer className={style.footerWrap}>
            <div className={style.footer}>
                <div className={style.container}>
                    <div className={style.wrapper}>
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
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
