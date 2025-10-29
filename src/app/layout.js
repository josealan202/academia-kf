'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { useState } from 'react';
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <header> 
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <div className="espacamento-h1">
                <img src="/tcc-gladiadores.jpeg" height={100} width={100}/>
                <h1 className="titulo">CT GLADIADORES</h1>
              </div>
            </Link>  
            <div className="hamburguer" onClick={() => setMenuOpen(!menuOpen)}>
              &#9776;
            </div>

            <div className={`menu ${menuOpen ? 'open' : ''}`}>
              <Link href="/" onClick={() => setMenuOpen(false)}>Página Inicial</Link>
              <Link href="/planos" onClick={() => setMenuOpen(false)}>Planos</Link>
              <Link href="/turmas" onClick={() => setMenuOpen(false)}>Turmas</Link>

            <button>
              <Link href="/registro" onClick={() => setMenuOpen(false)}>Registro</Link>
            </button>

            <button>
              <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </button>   
          </div>
        </header>
      
        <main>{children}</main>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <h3>CT Gladiadores</h3>
              <p>Treinamento profissional para atletas de todas as idades. Venha conhecer nossas turmas e planos.</p>
            </div>

            <div className="footer-section">
              <h4>Contato</h4>
                <p>
                  <img src="/whatsapp.png" alt="WhatsApp" className="footer-icon" />
                  <a href="https://wa.me/558386333543" target="_blank">+55 83 98633-3543</a>
                </p>
                <p>
                  <img src="/instagram.png" alt="Instagram" className="footer-icon" />
                  <a href="https://instagram.com/ctgladiadores" target="_blank">@ctgladiadores</a>
                </p>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2025 CT Gladiadores. Todos os direitos reservados.</p>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
