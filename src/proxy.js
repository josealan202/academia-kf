import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function Proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const precisaAuth =
    pathname.startsWith("/perfil") ||
    pathname.startsWith("/planos") ||
    pathname.startsWith("/turmas") ||
    pathname.startsWith("/formadepagamento") ||
    pathname.startsWith("/pagamentopix") ||
    pathname.startsWith("/pagamentodinheiroemespecie");

  if (precisaAuth && !token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/perfil/:path*",
    "/planos/:path*",
    "/turmas/:path*",
    "/formadepagamento/:path*",
    "/pagamentopix/:path*",
    "/pagamentodinheiroemespecie/:path*",
  ],
};
