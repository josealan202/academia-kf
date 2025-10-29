'use client'
import style from './page.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from "next-auth/react";


export default function ClienteLogin() {
  const [emailLog, setEmaillog] = useState('')
  const [senhaLog, setSenhalog] = useState('')

  const router = useRouter()

  const { data: session } = useSession();

  if (session) {
    router.replace("/perfil");
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
    const res = await signIn("credentials", {
        redirect: false,
        email: emailLog,
        senha: senhaLog
      });
        if (res?.ok) router.push("/perfil");
          else alert("Email e senha inválidos");
      } catch (error) {
        console.error(error)
        alert('Erro de conexão')
      }
    }      
  

  return (
    <div className={style.container}>
      <div className={style.leftContainer}>
        <div className={style.loginBox}>
          <h2 className={style.title}>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className={style.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className={style.input}
              value={emailLog}
              onChange={(e) => setEmaillog(e.target.value)}
              required
            />

            <label htmlFor="senha" className={style.label}>Senha:</label>
            <div className={style.senhaContainer}>
              <input
                type="password"
                id="senha"
                name="senha"
                className={style.input}
                value={senhaLog}
                onChange={(e) => setSenhalog(e.target.value)}
                required
              />
            </div>

            <div>
              <Link href="#"><p>Esqueceu sua senha?</p></Link>
            </div>

            <label className={style.checkbox}>
              <input type="checkbox" id="salvarSenha" name="salvarSenha" />
              Salvar senha
            </label>

            <button onClick={() => signIn("google")} className={style.btn}>
              Continuar com o Google
            </button>

            <button type="submit" className={style.button}>Entrar</button>
          </form>
        </div>
      </div>

      <div className={style.rightContainer}>
        <img
          src="/ivafundo.jpg"
          alt="Imagem decorativa"
          className={style.loginImage}
        />
      </div>
    </div>
  )
}