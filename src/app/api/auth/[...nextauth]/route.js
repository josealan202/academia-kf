import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "email@exemplo.com" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Exemplo de autenticação simples
        if (email === "teste@teste.com" && password === "123456") {
          return { id: "1" }; // 👈 só retorna o id
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // 🔹 No login inicial, 'user' existe. Depois, apenas 'token' é usado.
      if (user) {
        token.userId = user.id; // salva apenas o id no token
      }
      return token;
    },

    async session({ session, token }) {
      // 🔹 Inclui apenas o id na sessão disponível no frontend
      session.user = { id: token.userId };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
