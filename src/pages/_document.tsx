import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;900&display=swap"
                    rel="preconnect"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
