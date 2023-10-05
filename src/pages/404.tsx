import { MyButton } from '@/components/Button/Button'
import { NextPage } from 'next'
import Link from 'next/link'

const Custom404: NextPage = () => {
    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>404 - Page Not Found</h1>
            <Link href={'/'}>
                <MyButton>Go back to main page</MyButton>
            </Link>
        </div>
    )
}

export default Custom404
