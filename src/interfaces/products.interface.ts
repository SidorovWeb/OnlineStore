export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
    countPeople?: number
    isCart?: boolean
    isFavorite?: boolean
    // quantity?: number
}

export interface Rating {
    rate: number
    count: number
}

export interface IProductData {
    products: IProduct[]
}

export interface IProductSingle {
    product: IProduct
}
