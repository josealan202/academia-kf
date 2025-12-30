import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "@/lib/db";

async function getUserByEmail(email) {
  const client = await pool.connect();
  const res = await client.query(
    "SELECT id, nome, email, senha, sexo, id_turma, role FROM usuario WHERE email = $1",
    [email]
  );
  client.release();
  return res.rows[0] || null;
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "email", type: "email" },
        senha: { label: "senha", type: "password" },
      },
      async authorize(credentials) {
        const { email, senha } = credentials;

        const user = await getUserByEmail(email);
        if (!user || !user.senha) return null;

        const ok = await compare(senha, user.senha);
        if (!ok) return null;

        // ❌ NUNCA retornar senha
        return {
          id: user.id,
          name: user.nome,
          email: user.email,
          role: user.role,
          sexo: user.sexo,
          id_turma: user.id_turma ?? null,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Login Google (primeira vez)
      if (account?.provider === "google") {
        const existing = await getUserByEmail(profile.email);

        if (existing) {
          token.id = existing.id;
          token.role = existing.role;
          token.name = existing.nome;
          token.email = existing.email;
          token.sexo = existing.sexo;
          token.id_turma = existing.id_turma ?? null;
        } else {
          const client = await pool.connect();
          const res = await client.query(
            `
            INSERT INTO usuario (nome, email, sexo, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, role
            `,
            [
              profile.name ?? "Usuário",
              profile.email,
              null,
              "cliente",
            ]
          );
          client.release();

          token.id = res.rows[0].id;
          token.role = res.rows[0].role;
          token.name = profile.name ?? "Usuário";
          token.email = profile.email;
          token.sexo = null;
          token.id_turma = null;
        }
      }

      // Login por credenciais
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.sexo = user.sexo;
        token.id_turma = user.id_turma ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.sexo = token.sexo;
      session.user.id_turma = token.id_turma;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
