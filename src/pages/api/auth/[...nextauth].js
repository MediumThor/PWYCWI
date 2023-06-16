import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createClient } from "@supabase/supabase-js"


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // Add your own logic here to find the user and compare password
                // If the credentials are valid, return the user object, else return null
            }
        })
    ],
    adapter: SupabaseAdapter(supabase),
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) token.id = user.id;
            return token;
        },
        async session(session, token) {
            session.user.id = token.id;
            return session;
        },
    },
})
