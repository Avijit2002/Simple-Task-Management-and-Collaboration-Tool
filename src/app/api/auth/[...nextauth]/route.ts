import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2';
import { User } from 'next-auth';
const prisma = new PrismaClient()

import CredentialsProvider from "next-auth/providers/credentials";
providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            email: { label: "email", type: "text", placeholder: "abc@gmail.com" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied

            console.log(credentials)

            if (!credentials) {
                return null
            }
            const hashedPassword = await hash(credentials.password);

            const result = await prisma.user.findUnique({
                where: {
                    email: credentials.email,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    email: true
                }
            })


            //const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

            if (result) {
                // Any object returned will be saved in `user` property of the JWT

                // user object must contain id as string but in db schema id is number
                const user: { id: string, email: string } = {
                    id: String(result.id),
                    email: result.email
                }
                return user
            } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
        }
    })
]