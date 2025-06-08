'use client'
import style from './page.module.css';
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function clienteLogin() {
    const [emailLog, setEmaillog] = useState('')
    const [senhaLog, setSenhalog] = useState('')

    const router = useRouter()

    const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/apiLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailLog, senhaLog })
      })

      if (response.ok) {
        const data = await response.json()
        const id = data.id
        router.push(`/perfil/${id}`)
      } else {
        const errorData = await response.json()
        alert(`Erro ao fazer login: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Erro de conexão com o servidor.')
    }
  }

  return (
    <>
        <br></br>
        <body>
            <div className={style.container}>
            <h2 className={style.title}>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email" className={style.label}>Email:</label>
                <input type="email" id="email" name="email" className={style.input} value={emailLog} onChange={(e) => setEmaillog(e.target.value)} required />

                <label htmlFor="senha" className={style.label}>Senha:</label>
            <div className={style.senhaContainer}>
                <input type="password" id="senha" name="senha" className={style.input} value={senhaLog} onChange={(e) => setSenhalog(e.target.value)} required />
                <button type="button" className={style.verSenha} onClick={
            function toggleSenha() {
                const senhaInput = document.getElementById("senha");
                senhaInput.type = senhaInput.type === "password" ? "text" : "password";
            }
        }><img src="olhoSenha.png" height="25px" width="25px" className={style.olhoSenha}></img></button>
            </div>
            <div>
                <Link href="#"><p>Esqueceu sua senha?</p></Link>
            </div>

            <label className={style.checkbox}>
            <input type="checkbox" id="salvarSenha" name="salvarSenha" />
                Salvar senha
            </label>

                <button type="submit" className={style.button}>Entrar</button>
            </form>
            </div>
        </body>
    </>
  );
}
