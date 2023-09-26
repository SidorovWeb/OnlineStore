import { IUser } from '@/interfaces/user.interface'
import { Dispatch, createContext, useEffect, useState } from 'react'

interface IUserContext {
    user: IUser | null
    setUser: Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = createContext({} as IUserContext)

function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        const userLS = localStorage.getItem('Tuff-user')

        if (userLS?.length) {
            setUser(JSON.parse(userLS))
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
