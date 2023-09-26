import {
    ICategoriesData,
    ISpecificCategory,
} from '@/interfaces/categories.interface'
import { FC, useEffect, useState } from 'react'
import style from './WorthSeeing.module.scss'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import myImage1 from '../../../public/1.jpg'
import myImage2 from '../../../public/2.jpg'
import myImage3 from '../../../public/3.jpg'
import myImage4 from '../../../public/4.jpg'

interface IWorthSeeingData extends ISpecificCategory {
    image: StaticImageData
}

const WorthSeeing: FC<ICategoriesData> = ({ categories }) => {
    const [newCategories, setNewCategories] = useState<IWorthSeeingData[]>()

    useEffect(() => {
        const newArray = categories.map((cat, idx) => {
            const category = cat
            let image = myImage3
            if (cat === 'electronics') {
                image = myImage3
            }
            if (cat === 'jewelery') {
                image = myImage4
            }
            if (cat.includes('men')) {
                image = myImage1
            }
            if (cat.includes('women')) {
                image = myImage2
            }

            return { category, image }
        })

        setNewCategories(newArray)
    }, [])

    return (
        <div className={style.inner}>
            <h3 className={style.header}>Categories</h3>
            <div className={style.list}>
                {newCategories &&
                    newCategories.map((cat, idx) => (
                        <Link
                            href={`/products/categories/${cat.category}`}
                            className={style.card}
                            key={idx}
                        >
                            <div className={style.img}>
                                <Image
                                    src={cat.image}
                                    alt={cat.category}
                                    width={292}
                                    height={230}
                                />
                            </div>
                            <h4 className={style.title}>{cat.category}</h4>
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default WorthSeeing
