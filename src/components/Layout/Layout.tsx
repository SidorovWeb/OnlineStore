import { FC, PropsWithChildren } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import style from './Layout.module.scss'
import Sidebar from '../Sidebar/Sidebar'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <div className={style.layout}>
            {/* <Header /> */}
            <main className={style.main}>
                <Sidebar />
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
