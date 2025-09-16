'use client'
import React from 'react';
import style from './page.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function OnAddUser() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [sexo, setSexo] = useState('')
  const [periododopagamento, setPeriodoDoPagamento] = useState('')

  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {nome, email, senha, sexo, periododopagamento}

    console.log(user)
    try {
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })

      if (response.ok) {
        const data = await response.json()
        const id = data.id
        route.push('/login')
      } else {
        const errorData = await response.json()
        alert(`Erro ao cadastrar cliente: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Erro ao enviar formulário de cadastro:', error)
      alert('Erro de conexão com o servidor.')
    }
  }
  
  return (
    <>
    <br></br>
    <div className={style.container}>
      <div>
      <h2 className={style.title}>Registro</h2>
      <form id="registroForm" onSubmit={handleSubmit}>
        <label className={style.label} htmlFor="nome">Nome:</label>
        <input
          className={style.input}
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label className={style.label} htmlFor="email">Email:</label>
        <input
          className={style.input}
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={style.label} htmlFor="senha">Senha:</label>
        <input
          className={style.input}
          type="password"
          id="senha"
          name="senha"
          minLength={4}
          maxLength={8}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <div className={style.li}> 
            <span>A senha deve ter no mínimo 4 caracteres e no máximo 8 caracteres.</span>
        </div>
        
        <label className={style.label}>Sexo:</label>
        <select
          className={style.input}
          id="sexo"
          name="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
        >
          <option value="" disabled>Selecione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>

        <label className={style.label} htmlFor="pagamento">Período do pagamento:</label>
        <select
          className={style.input}
          id="periododopagamento"
          name="periododopagamento"
          value={periododopagamento}
          onChange={(e) => setPeriodoDoPagamento(e.target.value)}
          required
        >
          <option value="" disabled>Selecione as datas...</option>
          <option value="1 a 10">1 a 10</option>
          <option value="11 a 20">11 a 20</option>
          <option value="21 a 30/31">21 a 30/31</option>
        </select>

        <button className={style.button} type="submit">Registrar</button>
      </form>
    </div>
    </div>
    </>
  )
}

