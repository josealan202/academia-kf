import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const precisaAuth =
    pathname.startsWith("/perfil") ||
    pathname.startsWith("/planos") ||
    pathname.startsWith("/turmas") ||
    pathname.startsWith("/formadepagamento") ||
    pathname.startsWith("/pagamentopix") ||
    pathname.startsWith("/pagamentodinheiroemespecie");

  if (precisaAuth && !token) {
    const url = new URL("/login", req.url);
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