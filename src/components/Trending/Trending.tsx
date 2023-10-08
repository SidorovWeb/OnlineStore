import { FC, useEffect, useState } from 'react'
import style from './Trending.module.scss'
import { IProduct, IProductData } from '@/interfaces/products.interface'
import Link from 'next/link'
import { MyButton } from '../Button/Button'
import Card from '../Card/Card'

interface ITrending extends IProductData {
    title: string
}

const Trending: FC<ITrending> = ({ products, title }) => {
    const [randomProduct, setRandomProduct] = useState<IProduct[]>()
    const [tail, setTail] = useState<IProduct[]>()

    useEffect(() => {
        setRandomProduct(products)
    }, [products])

    function onHandlerSeeMore() {
        if (!tail?.length) {
            return
        }

        const mappingRandomElements = addsRandomElements(tail)

        if (mappingRandomElements) {
            setRandomProduct(randomProduct?.concat(mappingRandomElements))
            setTail(tail?.slice(5, tail.length))
        }
    }

    useEffect(() => {
        const randomElements = products.sort(() => 0.5 - Math.random())
        const mappingRandomElements = addsRandomElements(randomElements)

        setRandomProduct(mappingRandomElements)
        setTail(randomElements.slice(5, randomElements.length))
    }, [])

    function addsRandomElements(randomElements: IProduct[]) {
        return randomElements.slice(0, 5)
    }

    return (
        <div className={style.inner}>
            <h3 className={style.header}>{title}</h3>
            <div className={style.list}>
                {randomProduct &&
                    randomProduct.map((product) => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                            <Card product={product} />
                        </Link>
                    ))}
            </div>
            <div className={style.bottom}>
                {tail && tail.length > 0 && (
                    <MyButton onClick={onHandlerSeeMore}>See more</MyButton>
                )}
            </div>
        </div>
    )
}

export default Trending
