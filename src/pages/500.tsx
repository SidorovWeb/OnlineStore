import { MyButton } from '@/components/UI/Button/Button'
import { NextPage } from 'next'
import Link from 'next/link'

const Custom500: NextPage = () => {
    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>
                500 - Server-side error occurred
            </h1>
            <Link href={'/'}>
                <MyButton>Go back to main page</MyButton>
            </Link>
        </div>
    )
}

export default 500
