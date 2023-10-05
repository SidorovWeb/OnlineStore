import { FC } from 'react'
import style from './Footer.module.scss'
import Logotype from '../Logotype/Logotype'

const Footer: FC = () => {
    return (
        <footer className={style.footerWrap}>
            <div className={style.footer}>
                <div className={style.container}>
                    <div className={style.wrapper}>
                        <Logotype />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
