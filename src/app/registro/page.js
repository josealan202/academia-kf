import React from 'react';
import style from './page.module.css';

export default function Registro() {
  return (
    <>
    <br></br>
    <div className={style.container}>
      <h2 className={style.title}>Registro</h2>
      <form id="registroForm">
        <label className={style.label} htmlFor="nome">Nome:</label>
        <input
          className={style.input}
          type="text"
          id="nome"
          name="nome"
          required
        />

        <label className={style.label} htmlFor="email">Email:</label>
        <input
          className={style.input}
          type="email"
          id="email"
          name="email"
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
          required
        />
        <div className={style.li}> 
            <li>A senha deve ter no mínimo 4 caracteres e no máximo 8 caracteres.</li>
        </div>
        
        <label className={style.label}>Sexo:</label>
        <div className={style.sexoOpcoes}>
          <label className={style.sexoLabel}>
            <input type="radio" name="sexo" value="Masculino" required /> Masculino
          </label>
          <label className={style.sexoLabel}>
            <input type="radio" name="sexo" value="Feminino" /> Feminino
          </label>
        </div>

        <label className={style.label} htmlFor="pagamento">Momento do pagamento:</label>
        <select
          className={style.select}
          id="pagamento"
          name="pagamento"
          required
          defaultValue=""
        >
          <option value="" disabled>Escolha uma opção</option>
          <option value="inicio">Início do mês</option>
          <option value="meio">Meio do mês</option>
          <option value="final">Final do mês</option>
        </select>

        <button className={style.button} type="submit">Registrar</button>
      </form>
    </div>
    </>
  );
}
