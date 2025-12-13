"use client";

import style from "./page.module.css";
import { useEffect, useState } from "react";


export default function CardTurma({ id, titulo, horario, turno }) {
  const [entrou, setEntrou] = useState(false);

  useEffect(() => {
    const verificarInscricao = async () => {
      const response = await fetch(`/api/turma/alunos/${id}`);
      const data = await response.json();

      if (data.jaInscrito === true) {
        setEntrou(true);
      }
    };

    verificarInscricao();
  }, [id]);




  const entrarNaTurma = async () => {
    const response = await fetch(`/api/turma/alunos/${id}`, {
      method: "PUT",
    });

    if (response.ok) setEntrou(true);
  };

  const sairDaTurma = async () => {
    const confirmar = confirm("Tem certeza que deseja sair desta turma?");
    if (!confirmar) return;

    const response = await fetch(`/api/turma/alunos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setEntrou(false); // 👈 VOLTA PARA "Entrar"
    } else {
      alert("Erro ao sair da turma");
    }
  };


  return (
    <div className={style.box}>
      <div className={style.nome}>{titulo}</div>
      <div className={style.horario}>Horário: {horario}</div>
      <div className={style.turno}>Turno: {turno}</div>

      <div className={style.botao}>
        {!entrou ? (
          <button
            className={style.button}
            onClick={entrarNaTurma}
            disabled={entrou}
          >
            {entrou ? "Inscrito" : "Entrar"}
          </button>

        ) : (
          <button className={style.button} onClick={sairDaTurma}>
            Sair da turma
          </button>
        )}
      </div>

      {entrou && (
        <p className={style.sucesso}>
          <strong>Você está inscrito nesta turma!</strong>
        </p>
      )}
    </div>
  );
}
