import Trending from '@/components/Trending/Trending'
import Product from '@/components/Product/Product'
import { IProductData, IProductSingle } from '@/interfaces/products.interface'
import { StoreService } from '@/services/store.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'

interface Params extends ParsedUrlQuery {
    id: string
}

const ProductsPage: NextPage<IProductsPage> = ({ product, products }) => {
    return (
        <>
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={product.description} />
                <meta property="og:title" content={product.title} />
                <meta property="og:description" content={product.description} />
                <meta property="og:type" content="article" />
            </Head>
            <Product product={product} />
            <Trending products={products} title={'Related products'} />
        </>
    )
}

export default ProductsPage

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
    const categories = await StoreService.getCategories()
    const product = await StoreService.getByIdProduct(String(params?.id))
    const products = await (await StoreService.getProductsAll())
        .filter((item) => item.category === product.category)
        .filter((item) => item.id !== product.id)

    if (!categories || !product || !products) {
        return {
            notFound: true,
        }
    }
    return {
        props: { categories, product, products },
        revalidate: 60,
    }
}

type IProductsPage = IProductData & IProductSingle
