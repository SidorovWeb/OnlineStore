import { PropsWithChildren } from 'react'
import CartProvider from './CartProvider'
import ModalProvider from './ModalProvider'
import UserProvider from './UserProvider'

const MasterProvider = ({ children }: PropsWithChildren) => {
    return (
        <UserProvider>
            <ModalProvider>
                <CartProvider>{children}</CartProvider>
            </ModalProvider>
        </UserProvider>
    )
}

export default MasterProvider
