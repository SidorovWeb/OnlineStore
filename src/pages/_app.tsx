import Layout from '@/components/Layout/Layout'
import Modal from '@/components/Modal/Modal'
import Overlay from '@/components/Overlay/Overlay'
import MasterProvider from '@/contex/MasterProvider'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>$TUFF - Fake Store API</title>
                <meta
                    name="description"
                    content="Fake store rest api for your ecommerce or shopping website prototype"
                />
                <meta property="og:title" content="$TUFF - Fake Store API" />
                <meta
                    property="og:description"
                    content="Fake store rest api for your ecommerce or shopping website prototype"
                />
                <meta property="og:locale" content="en_EN" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
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
