import { FC, useEffect, useState } from 'react'
import style from './Sidebar.module.scss'
import { ICategoriesData } from '@/interfaces/categories.interface'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { StoreService } from '@/services/store.service'
import Menu from '../../../public/menu.svg'
import Image from 'next/image'

const Sidebar: FC = () => {
    const { query } = useRouter()
    const [categories, setCategories] = useState<ICategoriesData[]>()
    const [isMenu, setIsMenu] = useState(false)

    useEffect(() => {
        const getCategories = async () => {
            const cat = await StoreService.getCategories()
            setCategories(cat)
        }
        getCategories()
    }, [])

    function handlerMenu() {
        setIsMenu(!isMenu)
    }

    return (
        <div className={style.sidebarWrap}>
            <div className={cn(style.sidebar, isMenu ? style.menuActive : '')}>
                <h2 className={style.h2}>Categories</h2>
                <div className={style.list}>
                    {categories &&
                        categories.map((cat, idx) => (
                            <Link
                                href={`/products/categories/${cat}`}
                                key={idx}
                                onClick={() => setIsMenu(false)}
                            >
                                <h3
                                    className={cn(
                                        style.h3,
                                        query.id === String(cat)
                                            ? style.h3Active
                                            : ''
                                    )}
                                >
                                    {String(cat)}
                                </h3>
                            </Link>
                        ))}
                </div>
                <div className={style.bottom}>
                    <p>Help</p>
                    <a href="#">Terms & Conditions</a>
                </div>
            </div>
            <div className={style.menu} onClick={handlerMenu}>
                <Image src={Menu} alt="Menu" width={30} height={30} />
            </div>
        </div>
    )
}

export default Sidebar
