import { NextPage } from 'next'
import style from './cart.module.scss'
import { MyButton } from '@/components/Button/Button'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Delete from '../../../public/delete.svg'
import Add from '../../../public/add.svg'
import Minus from '../../../public/minus.svg'
import { IProduct } from '@/interfaces/products.interface'
import Link from 'next/link'
import { CartContext } from '@/contex/CartProvider'

interface ICartProduct extends IProduct {
    quantity: number
}

const CartPage: NextPage = () => {
    const [totalPrice, setTotalPrice] = useState(0)
    const { cartItems, setCartItems } = useContext(CartContext)
    const [cartItemsComplete, setCartItemsComplete] = useState<ICartProduct[]>()

    useEffect(() => {
        const cartItemsMap = cartItems.map((item) => {
            return { ...item, quantity: item.quantity ?? 1 }
        })

        setCartItemsComplete(cartItemsMap)

        setTotalPrice(
            sum(cartItemsMap.map((item) => item.quantity * item.price))
        )
    }, [cartItems])

    const onHandlerAdd = (product: ICartProduct) => {
        const newArray = cartItemsComplete?.map((item) => {
            if (item.id === product.id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })

        setCartItemsComplete(newArray)
        if (newArray) {
            setTotalPrice(
                sum(newArray.map((item) => item.quantity * item.price))
            )
        }

        localStorage.setItem('Tuff', JSON.stringify(newArray))
    }

    const onHandlerMinus = (product: ICartProduct) => {
        const newArray = cartItemsComplete?.map((item) => {
            if (item.id === product.id) {
                return { ...item, quantity: Math.max(1, item.quantity - 1) }
            }
            return item
        })

        setCartItemsComplete(newArray)
        if (newArray) {
            setTotalPrice(
                sum(newArray.map((item) => item.quantity * item.price))
            )
        }

        localStorage.setItem('Tuff', JSON.stringify(newArray))
    }

    function handlerDeleteFromCart(getCurrentItem: IProduct) {
        if (cartItemsComplete) {
            const newArray = cartItemsComplete.filter(
                (item) => item.id !== getCurrentItem.id
            )

            setCartItemsComplete(newArray)
            setCartItems(newArray)
            setTotalPrice(
                sum(newArray.map((item) => item.quantity * item.price))
            )
            localStorage.setItem('Tuff', JSON.stringify(newArray))
        }
    }

    const sum = (arr: number[]) =>
        arr.reduce((prev, current) => prev + current, 0)

    return (
        <div className={style.cartWrap}>
            <div className={style.title}>Your cart</div>
            <div className={style.list}>
                {!cartItemsComplete?.length && (
                    <div className={style.noFoundItems}>
                        Add products to cart
                    </div>
                )}
                {cartItemsComplete &&
                    cartItemsComplete.map((product) => (
                        <div className={style.cart} key={product.id}>
                            <Link
                                className={style.cartLeft}
                                href={`/products/${product.id}`}
                            >
                                <div className={style.cartImg}>
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={98}
                                        height={47}
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
                            <div className={style.cartCenter}>
                                <div className={style.cartPrice}>
                                    {product.price}$
                                </div>
                                <div className={style.cartCountWrap}>
                                    <div
                                        className={style.cartCountIconMinus}
                                        onClick={() => onHandlerMinus(product)}
                                    >
                                        <Image
                                            src={Minus}
                                            alt="Minus"
                                            width={19}
                                            height={19}
                                        />
                                    </div>
                                    <div className={style.cartCount}>
                                        {product.quantity}
                                    </div>
                                    <div
                                        className={style.cartCountIconAdd}
                                        onClick={() => onHandlerAdd(product)}
                                    >
                                        <Image
                                            src={Add}
                                            alt="Add"
                                            width={19}
                                            height={19}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={style.cartRight}>
                                <div className={style.cartTotalPrice}>
                                    {(product.price * product.quantity).toFixed(
                                        2
                                    )}
                                    $
                                </div>
                                <div
                                    className={style.cartDelete}
                                    onClick={() =>
                                        handlerDeleteFromCart(product)
                                    }
                                >
                                    <Image
                                        src={Delete}
                                        alt="Delete"
                                        width={19}
                                        height={19}
                                    />
                                </div>
                                <MyButton
                                    onClick={() =>
                                        handlerDeleteFromCart(product)
                                    }
                                >
                                    Delete to cart
                                </MyButton>
                            </div>
                        </div>
                    ))}
            </div>

            <div className={style.bottom}>
                <div className={style.total}>
                    TOTAL PRICE:{' '}
                    <div className={style.totalPrice}>
                        {totalPrice.toFixed(2)}$
                    </div>
                </div>
                <MyButton disabled={!cartItemsComplete?.length ? true : false}>
                    Proceed to checkout
                </MyButton>
            </div>
        </div>
    )
}

export default CartPage
