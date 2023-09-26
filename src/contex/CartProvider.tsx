import { IProduct } from '@/interfaces/products.interface'
import { Dispatch, createContext, useEffect, useState } from 'react'

interface ICartProduct extends IProduct {
    quantity?: number
}

interface ICartContext {
    cartItems: ICartProduct[]
    setCartItems: Dispatch<React.SetStateAction<IProduct[]>>
    favoriteItems: ICartProduct[]
    setFavoriteItems: Dispatch<React.SetStateAction<IProduct[]>>
}

export const CartContext = createContext({} as ICartContext)

function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<IProduct[]>([])
    const [favoriteItems, setFavoriteItems] = useState<IProduct[]>([])

    useEffect(() => {
        const cartLS = localStorage.getItem('Tuff')
        const favoriteLS = localStorage.getItem('Tuff-favorite')

        if (cartLS?.length) {
            setCartItems(JSON.parse(cartLS))
        }

        if (favoriteLS?.length) {
            setFavoriteItems(JSON.parse(favoriteLS))
        }
    }, [])

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                favoriteItems,
                setFavoriteItems,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
