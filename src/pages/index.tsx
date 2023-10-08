import Banner from '@/components/Banner/Banner'
import Trending from '@/components/Trending/Trending'
import WorthSeeing from '@/components/WorthSeeing/WorthSeeing'
import { ICategoriesData } from '@/interfaces/categories.interface'
import { IProductData } from '@/interfaces/products.interface'
import { StoreService } from '@/services/store.service'
import { GetStaticProps, NextPage } from 'next'

const HomePage: NextPage<IHomePageProps> = ({ categories, products }) => {
    return (
        <>
            {/* <Banner /> */}
            {/* <Trending products={products} title={'Trending'} />
            <WorthSeeing categories={categories} /> */}
        </>
    )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
    const categories = await StoreService.getCategories()
    const products = await StoreService.getProductsAll()

    if (!categories || !products) {
        return {
            notFound: true,
        }
    }
    return {
        props: { categories, products },
        revalidate: 60,
    }
}

export type IHomePageProps = ICategoriesData & IProductData
