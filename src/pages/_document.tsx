import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ru">
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
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
