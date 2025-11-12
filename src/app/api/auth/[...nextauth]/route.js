import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "@/lib/db";

//Fazer a busca do usuário para utilização futura
async function getUserByEmail(email) {
    const client = await pool.connect();
    const res = await client.query(
        "SELECT id, nome, email, senha, sexo, periododopagamento, role FROM usuario WHERE email = $1",
        [email]
    );
    client.release();
    return res.rows[0] || null;
}

//Criaremos a sessão que será um JWT assinado e que será guardado em cookie httpOnly
const authOptions = {
    session: { strategy: "jwt" },
    providers: [ // Trata-se de como o usuário pode entrar (Google, Facebook, e-mail/senha, entre outros).
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credenciais",
            credentials: {
                email: { label: "email", type: "email" },
                senha: { label: "senha", type: "password" }
            },
            async authorize(credentials) {
                const { email, senha } = credentials;
                const user = await getUserByEmail(email);
                if (!user || !user.senha) return null;
                const ok = await compare(senha, user.senha);
                if (!ok) return null;
                // O objeto que for retornado vai para o token/session
                return { id: user.id, name: user.nome, email: user.email, senha: user.senha, sexo: user.sexo, periododopagamento: user.periododopagamento, role: user.role };
            }
        })
    ],

    /*
    Callbacks são funções que o nextAuth utiliza em certos momentos do fluxo de autenticação, ous
    quais permitem personalizar o JWT, a sessão, como o login vai funcionar...
    */
    callbacks: {
        // Vamos colocar role e id no JWT para informar os papeis do usuário
        async jwt({ token, user, account, profile }) {
            // Primeira vez que loga por OAuth
            if (account && profile && !user) {
                // É preciso vincular ou auto-criar um usuário no banco (opcional)
                const existing = await getUserByEmail(profile.email);
                if (existing) {
                    token.role = existing.role;
                    token.id = existing.id;
                    token.name = existing.nome;
                    token.email = existing.email;
                    token.sexo = existing.sexo;
                    token.periododopagamento = existing.periododopagamento;
                } else {
                    // Exemplo: cria como "cliente"
                    const client = await pool.connect();
                    const res = await client.query(
                        "INSERT INTO usuario (nome, email, sexo, periododopagamento, id_turma, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, role",
                        [profile.name ?? "Usuário", profile.email, "cliente"]
                    );
                    client.release();
                    token.id = res.rows[0].id;
                    token.role = res.rows[0].role;
                    token.name = res.rows[0].nome;
                    token.email = res.rows[0].email;
                    token.sexo = res.rows[0].sexo;
                    token.periododopagamento = res.rows[0].periododopagamento;
                }
            }

            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.email = user.email;
                token.sexo = user.sexo;
                token.periododopagamento = user.periododopagamento;
            }
            return token;
        },
        // É necessário para coloca dados úteis na sessão (disponível no cliente)
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.name = token.name ?? session.user.name;
                session.user.email = token.email;
                session.user.sexo = token.sexo;
                session.user.periododopagamento = token.periododopagamento;
            }
            return session;
        }
    },
    pages: {
        // Aqui vc coloca a sua página de login customizada
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions }; // para usar em APIs protegidas