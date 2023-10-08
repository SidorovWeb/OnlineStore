import Layout from '@/components/Layout/Layout'
import Modal from '@/components/Modal/Modal'
import Overlay from '@/components/Overlay/Overlay'
import MasterProvider from '@/contex/MasterProvider'
import type { AppProps } from 'next/app'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <MasterProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <Modal />
                <Overlay />
            </MasterProvider>
        </>
    )
}
