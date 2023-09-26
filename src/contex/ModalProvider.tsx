import { Dispatch, createContext, useEffect, useState } from 'react'

interface IModalContext {
    modal: boolean
    setModal: Dispatch<React.SetStateAction<boolean>>
}

export const ModalContext = createContext({} as IModalContext)

function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modal, setModal] = useState(false)

    return (
        <ModalContext.Provider
            value={{
                modal,
                setModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider
