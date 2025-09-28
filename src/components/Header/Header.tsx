import { FC } from 'react'
import CartsIcons from '../CartsIcons/CartsIcon'
import Logotype from '../Logotype/Logotype'
import User from '../User/User'
import style from './Header.module.scss'

const Header: FC = () => {
	return (
		<header className='header'>
			<div className={style.wrapper}>
				<div className={style.container}>
					<Logotype />
					<nav className={style.menu}>
						<User />
						<CartsIcons />
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
