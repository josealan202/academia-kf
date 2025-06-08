'use client'
import React from 'react';
import style from './page.module.css';

import { useState } from 'react'

export default function UserForm({ onAddUser }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [sexo, setSexo] = useState('')
  const [periododopagamento, setPeriodoDoPagamento] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddUser({ nome, email, senha, sexo, periododopagamento })
    setNome('')
    setEmail('')
    setSenha('')
    setSexo('')
    setPeriodoDoPagamento('')
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
          <option value="">Selecione</option>
          <option value="1">Masculino</option>
          <option value="2">Feminino</option>
        </select>

        <label className={style.label} htmlFor="pagamento">Dia do pagamento:</label>
        <input
          className={style.input}
          type="date"
          id="periodopagamento"
          name="periodopagamento"
          value={periododopagamento}
          onChange={(e) => setPeriodoDoPagamento(e.target.value)}
          required
        />

        <button className={style.button} type="submit">Registrar</button>
      </form>
    </div>
    </div>
    </>
  )
}
