import { CartContext } from '@/contex/CartProvider'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useContext } from 'react'
import Basket from '../../../public/basket.svg'
import Faiv from '../../../public/faiv.svg'
import style from './CartsIcons.module.scss'

const CartsIcons: FC = () => {
	const { cartItems, favoriteItems } = useContext(CartContext)

	return (
		<>
			<Link className={style.favorites} href={'/favorite'}>
				<Image
					className={style.faivIcon}
					src={Faiv}
					width={18}
					height={21}
					alt='favorites'
				/>
				{!favoriteItems.length ? (
					<></>
				) : (
					<span className={style.count}>{favoriteItems.length}</span>
				)}
			</Link>
			<Link className={style.basket} href={`/cart`}>
				<Image
					className={style.basketIcon}
					src={Basket}
					width={19}
					height={21}
					alt='basket'
				/>
				{!cartItems.length ? (
					<></>
				) : (
					<span className={style.count}>{cartItems.length}</span>
				)}
			</Link>
		</>
	)
}

export default CartsIcons
