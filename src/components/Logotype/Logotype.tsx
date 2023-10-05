import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import LogoImg from '../../../public/logo.svg'
import style from './Logotype.module.scss'
import Link from 'next/link'

const Logo: FC = () => {
    const { asPath } = useRouter()

    return (
        <>
            {asPath === '/' ? (
                <Image
                    className={style.logo}
                    src={LogoImg}
                    width={78}
                    height={32}
                    alt="logo"
                />
            ) : (
                <Link href="/">
                    <Image
                        className={style.logo}
                        src={LogoImg}
                        width={78}
                        height={32}
                        alt="logo"
                    />
                </Link>
            )}
        </>
    )
}

export default Logo
