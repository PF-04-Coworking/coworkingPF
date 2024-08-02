import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";
import { apiUsers } from "@/lib/api/auth/apiUsers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const promise = await apiUsers.login(credentials);
          const {
            token,
            userNoPassword: { id, email, name, role },
          } = promise;
          console.log("token");
          console.log(token);
          const user = { id, email, name, role };
          return user;
        } catch (error) {
          throw new Error("Credenciales incorrectas");
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
