import { IProductSingle } from '@/interfaces/products.interface'
import Image from 'next/image'
import { FC } from 'react'
import style from './Card.module.scss'

const Card: FC<IProductSingle> = ({ product }) => {
    return (
        <div className={style.card}>
            <div className={style.img}>
                <Image
                    src={product.image}
                    alt={product.description}
                    width={230}
                    height={320}
                />
            </div>
            <div className={style.desc}>
                <h4 className={style.title}>{product.title}</h4>
                <p className={style.card_desc}>{product.description}</p>
                <div className={style.card_bottom}>
                    <div className={style.block_price}>
                        <p className={style.price}>
                            {Math.floor(product.price)}$
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
