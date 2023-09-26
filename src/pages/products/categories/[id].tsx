import Banner from '@/components/Banner/Banner'
import style from './singleCategories.module.scss'
import { IProduct, IProductData } from '@/interfaces/products.interface'
import { StoreService } from '@/services/store.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Pagination, { paginate } from '@/components/Pagination/Pagination'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Card from '@/components/UI/Card/Card'
import MyInput from '@/components/UI/Input/MyInput'

const CategoryPage: NextPage<IProductData> = ({ products }) => {
    const { query } = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const [filterByName, setFilterByName] = useState('')
    const [filterByPrice, setFilterByPrice] = useState(0)
    const [filter, setFilter] = useState<IProduct[]>([])
    const [paginatedProduct, setPaginatedProduct] = useState<IProduct[]>([])

    useEffect(() => {
        setFilter([...products])
        setPaginatedProduct(paginate([...products], 1, pageSize))
    }, [products])

    useEffect(() => {
        if (query.id) {
            setFilterByName('')
            setFilterByPrice(0)
            setCurrentPage(1)
        }
    }, [query.id])

    useEffect(() => {
        filteredProduct(filter)

        if (filterByName === '' && filterByPrice === 0) {
            setPaginatedProduct(paginate([...products], currentPage, pageSize))
            setFilter([...products])
        }

        if (!filter.length) {
            filteredProduct([...products])
        }
    }, [filterByName, filterByPrice])

    const onPageChange = (page: number) => {
        setCurrentPage(page)
        setPaginatedProduct(paginate(filter, page, pageSize))
    }

    function filteredProduct(array: IProduct[], value?: string | number) {
        const filteredProduct = array.filter((p) => {
            const str = filterByName ?? value
            const num = filterByPrice ?? value

            return (
                p.title.toLowerCase().includes(str.toLowerCase()) &&
                p.price >= num
            )
        })

        setFilter(filteredProduct)
        setPaginatedProduct(paginate(filteredProduct, 1, pageSize))
    }

    const onChange = (value: string | number) => {
        if (typeof value === 'string') setFilterByName(value)
        if (typeof value === 'number') setFilterByPrice(value)

        if (
            typeof value === 'string' &&
            filterByName.length > String(value).length
        ) {
            filteredProduct([...products], value)
        }

        if (typeof value === 'number' && value < filterByPrice) {
            filteredProduct([...products], value)
        }
    }

    return (
        <>
            <Banner />
            <div className={style.container}>
                <div className={style.inner}>
                    <h2 className={style.header}>{query.id}</h2>
                    <div className={style.filterLine}>
                        <MyInput
                            type={'search'}
                            id={'1'}
                            defaultValue={filterByName}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={'Product name'}
                        />
                        <MyInput
                            type={'text'}
                            id={'3'}
                            defaultValue={filterByPrice}
                            onChange={(e) => {
                                if (isNaN(Number(e.target.value))) {
                                    return false
                                }
                                onChange(Number(e.target.value))
                            }}
                            label={'Price from'}
                            placeholder={'Price from'}
                        />
                    </div>
                    <div className={style.list}>
                        {paginatedProduct.length > 0 ? (
                            paginatedProduct.map((products) => (
                                <Link
                                    href={`/products/${products.id}`}
                                    className={style.card}
                                    key={products.id}
                                >
                                    <Card product={products} />
                                </Link>
                            ))
                        ) : (
                            <p className={style.notFound}>Not found</p>
                        )}
                    </div>
                    <Pagination
                        items={filter.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </>
    )
}

export default CategoryPage

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const products = await StoreService.getProductsAll()

    return {
        paths: products.map((p) => ({
            params: {
                id: String(p.id),
            },
        })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const products = await StoreService.getSpecificCategory(String(params?.id))
    const categories = await StoreService.getCategories()

    if (!categories || !products) {
        return {
            notFound: true,
        }
    }

    return {
        props: { categories, products },
    }
}
