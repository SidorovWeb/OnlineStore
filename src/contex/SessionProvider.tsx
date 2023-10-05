import { PropsWithChildren, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

export const AuthProvider = ({ children }: PropsWithChildren) => {
    return <SessionProvider>{children}</SessionProvider>
}
