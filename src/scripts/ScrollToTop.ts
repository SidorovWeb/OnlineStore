import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ScrollToTop = () => {
    const { asPath } = useRouter()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [asPath])

    return null
}

export default ScrollToTop
