import { PropsWithChildren } from 'react'
import CartProvider from './CartProvider'
import ModalProvider from './ModalProvider'
import { SessionProvider } from 'next-auth/react'

const MasterProvider = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>
            <ModalProvider>
                <CartProvider>{children}</CartProvider>
            </ModalProvider>
        </SessionProvider>
    )
}

export default MasterProvider
