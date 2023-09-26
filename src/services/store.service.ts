import { ICategoriesData } from '@/interfaces/categories.interface'
import { IProduct, IProductData } from '@/interfaces/products.interface'
import axios from 'axios'

export const API_URL = 'https://fakestoreapi.com'

axios.defaults.baseURL = API_URL

export const StoreService = {
    async getProductsAll() {
        const { data } = await axios.get<IProduct[]>('/products')
        return data
    },

    async getByIdProduct(id: string) {
        const { data } = await axios.get<IProduct>(`/products/${id}`)
        return data
    },

    async getCategories() {
        const { data } = await axios.get<ICategoriesData[]>(
            '/products/categories'
        )
        return data
    },

    async getSpecificCategory(id: string) {
        const { data } = await axios.get<IProductData[]>(
            `/products/category/${id}`
        )
        return data
    },
}
