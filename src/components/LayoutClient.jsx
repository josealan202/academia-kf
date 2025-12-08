"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LayoutClient({ children }) {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <div className="espacamento-h1">
            <img src="/tcc-gladiadores.jpeg" height={100} width={100} />
            <h1 className="titulo">CT GLADIADORES</h1>
          </div>
        </Link>

        <div
          className="hamburguer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </div>

        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Página Inicial</Link>
          <Link href="/planos" onClick={() => setMenuOpen(false)}>Planos</Link>
          <Link href="/turmas" onClick={() => setMenuOpen(false)}>Turmas</Link>
        
          {status === "authenticated" && session?.user?.id && (
            <button
              className="botaoPerfil"
              onClick={() => {
                setMenuOpen(false);
                router.push(`/perfil/${session.user.id}`);
              }}
            >
            <img width="64" height="64" src="https://img.icons8.com/puffy-filled/64/FFFFFF/test-account.png" alt="test-account"/>
            </button>
          )}

          <button
            className="botao1"
            onClick={() => { setMenuOpen(false); router.push("/registro"); }}
          >
            Registro
          </button>

          {status === "authenticated" && session?.user?.id ? (
            <button className="botao2" onClick={() => signOut()}>Sair</button>
          ) : (
            <button
              className="botao3"
              onClick={() => { setMenuOpen(false); router.push("/login"); }}
            >
              Login
            </button>
          )}
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
    </>
  );
}
