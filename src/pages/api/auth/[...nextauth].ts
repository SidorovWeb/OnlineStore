import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import VkProvider from 'next-auth/providers/vk'
import NextAuth from 'next-auth'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
        }),

        VkProvider({
            clientId: process.env.VK_CLIENT_ID as string,
            clientSecret: process.env.VK_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: {
                    label: 'Password',
                    type: 'password',
                },
                name: {
                    label: 'Username',
                    type: 'text',
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) return null

                const user = {
                    id: '3',
                    email: credentials.email,
                    password: credentials.password,
                    name: credentials.name,
                }

                return user
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET as string,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },

        async session({ session, token }) {
            if (token.user) {
                session.user = token.user
                return session
            }

            return session
        },
    },
})
