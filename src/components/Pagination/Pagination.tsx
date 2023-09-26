import { FC } from 'react'
import style from './Pagination.module.scss'
import { IProduct } from '@/interfaces/products.interface'

interface IPagination {
    items: number
    currentPage: number
    pageSize: number
    onPageChange: (page: number) => void
}

const Pagination: FC<IPagination> = ({
    items,
    currentPage,
    pageSize,
    onPageChange,
}) => {
    const pagesCount = Math.ceil(items / pageSize)

    if (pagesCount === 1) return null

    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)

    return (
        <div className={style.wrapper}>
            <ul className={style.pagination}>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage
                                ? style.pageItemActive
                                : style.pageItem
                        }
                    >
                        <a
                            className={style.pageLink}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination

export const paginate = (
    items: IProduct[],
    pageNumber: number,
    pageSize: number
) => {
    const startIndex = (pageNumber - 1) * pageSize
    return items.slice(startIndex, startIndex + pageSize)
}
