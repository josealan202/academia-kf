import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    console.log("entrei aqui")
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    const precisaAuth =
        pathname.startsWith("/perfil") ||
        pathname.startsWith("/planos") ||
        pathname.startsWith("/turmas") ||
        pathname.startsWith("/formadepagamento") ||
        pathname.startsWith("/pagamentopix");

    //caso seja necessário autenticação e não se tenha um token
    //então se monta uma URL de redirecionamento para a página de login e depopis
    //adiciona callbackUrl para, após logar, você poder voltar o 
    // usuário para onde ele estava indo.
    if (precisaAuth && !token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    //para as suas rotas de admin
    //primeiramente se não estiver logado (!token), manda para fazer login.
    //Depois quando estiver logado mas não for admin (token.role !== "admin"), então redireciona 
    //para uma página de acesso negado (/nao-autorizado).
    /*
    if (pathname.startsWith("/admin")) {
        if (!token) return NextResponse.redirect(new URL("/novoLogin", req.url));
        if (token.role !== "admin")
            return NextResponse.redirect(new URL("/nao-autorizado", req.url));
    }
    */
    return NextResponse.next();
}

//O middleware vai interceptar essas rotas, sendo que o
// :path* significa: qualquer subrota.
export const config = {
    matcher: [
        "/perfil/:path*",
        "/planos/:path*",
        "/turmas/:path*",
        "/formadepagamento/:path*",
        "/pagamentopix/:path*",
    ],
};