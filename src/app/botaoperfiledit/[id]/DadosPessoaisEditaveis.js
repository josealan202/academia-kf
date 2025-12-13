"use client";

import { useState, useEffect } from "react";
import style from "./page.module.css";


export default function DadosPessoaisEditaveis({ dadosClientes }) {
  const [dados, setDados] = useState({
    id: dadosClientes.id,
    nome: dadosClientes.nome,
    senha: "",
    periododopagamento: dadosClientes.periododopagamento
  });

  const [houveModificacao, setHouveModificacao] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setHouveModificacao(
      dados.nome !== dadosClientes.nome ||
      dados.periododopagamento !== dadosClientes.periododopagamento ||
      dados.senha !== ""
    );
  }, [dados]);

  const salvarDados = async () => {
    const response = await fetch("/api/aluno/updateAluno", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (response.ok) {
      alert("Dados salvos com sucesso!");
      setDados((prev) => ({ ...prev, senha: "" }));
      setHouveModificacao(false);
    } else {
      alert("Erro ao salvar dados.");
    }
  };

  return (
    <div className={style.dadoseditaveis}>
      <h2>Editar perfil</h2>

      <input
        className={style.input}
        name="nome"
        value={dados.nome}
        onChange={handleChange}
        placeholder="Nome"
      />

      <input
        className={style.input}
        name="senha"
        type="password"
        value={dados.senha}
        onChange={handleChange}
        placeholder="Nova senha (opcional)"
      />

      <select
        className={style.input}
        name="periododopagamento"
        value={dados.periododopagamento}
        onChange={handleChange}
      >
        <option value="">Selecione...</option>
        <option value="Do dia 1 a 10">Do dia 1 a 10</option>
        <option value="Do dia 11 a 20">Do dia 11 a 20</option>
        <option value="Do dia 21 a 30/31">Do dia 21 a 30/31</option>
      </select>

      {houveModificacao && (
        <button className={style.botao} onClick={salvarDados}>
          Salvar alterações
        </button>
      )}
    </div>
  );
}
