"use client";  
import React, { useState, useEffect } from 'react';
import style from './page.module.css'; 

const DadosPessoaisEditaveis = ({ dadosClientes }) => {
  const [dados, setDados] = useState({
    id: dadosClientes.id || '',
    nome: dadosClientes.nome || '',
    senha: dadosClientes.senha || '',
    periododopagamento: dadosClientes.periododopagamento || ''
  });

  const [houveModificacao, setHouveModificacao] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const salvarDados = async () => {
    try {
      const response = await fetch('/api/aluno/updateAluno', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        alert('Dados salvos com sucesso!');
        setHouveModificacao(false);
      } else {
        alert('Erro ao salvar dados.');
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados.');
    }
  };

  const verificarAlteracoes = () => {
    const alterado = 
      dados.nome !== (dadosClientes.nome || '') ||
      dados.senha !== (dadosClientes.senha || '') ||
      dados.periododopagamento !== (dadosClientes.periododopagamento || '');
    
    setHouveModificacao(alterado);
  };

  useEffect(() => {
    verificarAlteracoes();
  }, [dados]);

  useEffect(() => {
    console.log('Dados atuais:', dados);
    console.log('Dados originais:', dadosClientes);
    console.log('Alterações?', houveModificacao);
  }, [dados, houveModificacao]);

  return (
    <div className={style.dadoseditaveis}>
      <div className={style.cabecalho}>
        <h2>Dados pessoais editáveis</h2>
      </div>

      <input
        className={style.input}
        type="text"
        name="nome"
        placeholder="Nome"
        value={dados.nome}
        onChange={handleChange}
      />
      <input
        className={style.input}
        type="text"
        name="senha"
        placeholder="senha"
        value={dados.senha}
        onChange={handleChange}
      />
      <select
        className={style.input}
        name="periododopagamento"
        value={dados.periododopagamento}
        onChange={handleChange}
      >
        <option value="" disabled>Selecione as datas...</option>
            <option value="Do dia 1 a 10">Do dia 1 a 10</option>
            <option value="Do dia 11 a 20"> Do dia 11 a 20</option>
            <option value="Do dia 21 a 30/31">Do dia 21 a 30/31</option>
      </select>

      {houveModificacao && (
        <button className={style.botao} onClick={salvarDados}>
          Salvar Alterações
        </button>
      )}
    </div>
  );
};

export default DadosPessoaisEditaveis;