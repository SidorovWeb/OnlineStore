import style from '../cart/cart.module.scss'
import { NextPage } from 'next'
import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IProduct } from '@/interfaces/products.interface'
import { MyButton } from '@/components/Button/Button'
import { CartContext } from '@/contex/CartProvider'

const FavoritePage: NextPage = () => {
    const { favoriteItems, setFavoriteItems } = useContext(CartContext)

    function handlerDeleteFromFavorite(getCurrentItem: IProduct) {
        const newArray = favoriteItems.filter(
            (item) => item.id !== getCurrentItem.id
        )

        setFavoriteItems(newArray)
        localStorage.setItem('Tuff-favorite', JSON.stringify(newArray))
    }
    return (
        <div className={style.cartWrap}>
            <div className={style.title}>Favorites</div>
            <div className={style.favoriteList}>
                {!favoriteItems?.length && (
                    <div className={style.noFoundItems}>
                        Add products to favorites
                    </div>
                )}
                {favoriteItems &&
                    favoriteItems.map((product) => (
                        <div className={style.cart} key={product.id}>
                            <Link
                                className={style.cartLeft}
                                href={`/products/${product.id}`}
                            >
                                <div className={style.cartImg}>
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={230}
                                        height={320}
                                    />
                                </div>
                                <div className={style.cartInfo}>
                                    <div className={style.cartTitle}>
                                        {product.title}
                                    </div>
                                    <div className={style.cartDesc}>
                                        {product.category}
                                    </div>
                                </div>
                            </Link>
                            <div className={style.cartRight}>
                                <MyButton
                                    onClick={() =>
                                        handlerDeleteFromFavorite(product)
                                    }
                                >
                                    Delete to favorites
                                </MyButton>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default FavoritePage
