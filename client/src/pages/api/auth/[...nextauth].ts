import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({

        name: "Credentials",

        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },

        async authorize(credentials, req) {
            const {username, password} = credentials as any;
            const res = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  username, 
                  password
                })
            });

            const user = await res.json();

            return res.ok && user ? user : null;



        }
      })
    
    ],

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/pages/auth/login",
    }
}
export default NextAuth(authOptions)