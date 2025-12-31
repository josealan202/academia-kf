import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: true, // 🔥 ESSENCIAL NA VERCEL
  });

  const pathname = req.nextUrl.pathname;

  const protectedRoutes = [
    "/perfil",
    "/planos",
    "/turmas",
    "/formadepagamento",
    "/pagamentopix",
    "/pagamentodinheiroemespecie",
  ];

  const precisaAuth = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

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
