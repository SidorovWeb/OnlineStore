import { FC } from 'react'
import style from './Banner.module.scss'
import { MyButton } from '../Button/Button'
import Image from 'next/image'
import Comp from '../../../public/comp.png'
import Link from 'next/link'

const Banner: FC = () => {
    return (
        <div className={style.banner}>
            <h3 className={style.sale}>BIG SALE 20%</h3>
            <div className={style.wrapper}>
                <div className={style.desc}>the bestseller of 2022</div>
                <h4 className={style.title}>LENNON r2d2 with NVIDIA 5090 TI</h4>
                <div className={style.image}>
                    <Image
                        src={Comp}
                        alt="LENNON r2d2 with NVIDIA 5090 TI"
                        width={462}
                        height={359}
                    />
                </div>
                <Link href={`/products/categories/electronics`}>
                    <MyButton>Shop Now</MyButton>
                </Link>
            </div>
        </div>
    )
}

export default Banner
