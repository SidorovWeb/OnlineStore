import Layout from '@/components/Layout/Layout'
import Modal from '@/components/Modal/Modal'
import Overlay from '@/components/Overlay/Overlay'
import MasterProvider from '@/contex/MasterProvider'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.scss'
import { Suspense } from 'react'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Suspense>
            <MasterProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <Modal />
                <Overlay />
            </MasterProvider>
        </Suspense>
    )
}
