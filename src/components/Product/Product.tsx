import { FC, useContext, useEffect, useState } from 'react'
import { MyButton } from '@/components/UI/Button/Button'
import Image from 'next/image'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import { FreeMode, Thumbs, Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/free-mode'
import 'swiper/scss/thumbs'
import 'swiper/scss/navigation'
import style from './Product.module.scss'
import { IProduct, IProductSingle } from '@/interfaces/products.interface'
import { CartContext } from '@/contex/CartProvider'

const Product: FC<IProductSingle> = ({ product }) => {
    const [isAddToCart, setIsAddToCart] = useState(false)
    const [isAddToFavorite, setIsAddToFavorite] = useState(false)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)
    const { cartItems, setCartItems, favoriteItems, setFavoriteItems } =
        useContext(CartContext)

    useEffect(() => {
        const cartItem = cartItems.find((p) => p.id === product.id)
        const favoriteItem = favoriteItems.find((p) => p.id === product.id)
        if (cartItem?.isCart || favoriteItem?.isFavorite) {
            if (cartItem?.isCart) {
                setIsAddToCart(true)
            }
            if (favoriteItem?.isFavorite) {
                setIsAddToFavorite(true)
            }
            return
        }

        setIsAddToCart(false)
        setIsAddToFavorite(false)
    }, [product])

    function handlerAddToCart(getCurrentItem: IProduct) {
        const newArray = [...cartItems, { ...getCurrentItem, isCart: true }]
        setCartItems(newArray)
        setIsAddToCart(true)
        localStorage.setItem('Tuff', JSON.stringify(newArray))
    }

    function handlerAddToFavorite(getCurrentItem: IProduct) {
        const newArray = [
            ...favoriteItems,
            { ...getCurrentItem, isFavorite: true },
        ]
        setFavoriteItems(newArray)
        setIsAddToFavorite(true)
        localStorage.setItem('Tuff-favorite', JSON.stringify(newArray))
    }

    function handlerDeleteFromCart(getCurrentItem: IProduct) {
        const newArray = cartItems.filter(
            (item) => item.id !== getCurrentItem.id
        )

        setCartItems(newArray)
        setIsAddToCart(false)
        localStorage.setItem('Tuff', JSON.stringify(newArray))
    }
    function handlerDeleteFromFavorite(getCurrentItem: IProduct) {
        const newArray = favoriteItems.filter(
            (item) => item.id !== getCurrentItem.id
        )

        setFavoriteItems(newArray)
        setIsAddToFavorite(false)
        localStorage.setItem('Tuff-favorite', JSON.stringify(newArray))
    }

    return (
        <div className={style.productWrap}>
            <div className={style.product}>
                <Swiper
                    navigation={true}
                    spaceBetween={10}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                    }}
                    modules={[FreeMode, Thumbs, Navigation]}
                    className="mySwiper"
                >
                    {[...Array(4)].map((_, idx) => {
                        return (
                            <SwiperSlide key={idx}>
                                <Image
                                    src={product.image}
                                    alt={product.description}
                                    width={380}
                                    height={380}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className="mySwiper2"
                >
                    {[...Array(4)].map((_, idx) => {
                        return (
                            <SwiperSlide key={idx}>
                                <Image
                                    src={product.image}
                                    alt={product.description}
                                    width={91}
                                    height={91}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            <div className={style.productInfo}>
                <div className={style.productTitle}>{product.title}</div>
                <div className={style.productPrice}>{product.price}$</div>
                <div className={style.productDesc}>{product.description}</div>
                <div className={style.rate}>
                    Rate: <div>{product.rating.rate}</div>
                </div>
                <div className={style.buttonWrap}>
                    {isAddToCart ? (
                        <MyButton
                            onClick={() => handlerDeleteFromCart(product)}
                        >
                            Delete to cart
                        </MyButton>
                    ) : (
                        <MyButton onClick={() => handlerAddToCart(product)}>
                            Add to cart
                        </MyButton>
                    )}
                    {isAddToFavorite ? (
                        <MyButton
                            onClick={() => handlerDeleteFromFavorite(product)}
                        >
                            Delete to favorites
                        </MyButton>
                    ) : (
                        <MyButton onClick={() => handlerAddToFavorite(product)}>
                            Add to favorites
                        </MyButton>
                    )}
                </div>
                <div className={style.count}>
                    {product.rating.count} items of this product left!
                </div>
            </div>
        </div>
    )
}

export default Product
