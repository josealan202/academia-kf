"use client";

import style from "./page.module.css";

export default function CardTurma({ id, titulo, horario, turno }) {

  const entrarNaTurma = async () => {
    const response = await fetch(`/api/turma/alunos/${id}`, {
     method: "PUT",
     headers: {
          "Content-Type": "application/json",
     },
     body: JSON.stringify({ id_turma: id }),
});

    if (response.ok) {
      alert("Você entrou na turma!");
    } else {
      alert("Erro ao entrar na turma");
    }
  };

  return (
    <>
      <div className={style.box}>
        <div className={style.nome}>
          {titulo}
        </div>

        <div className={style.horario}>
          Horário: {horario}
        </div>

        <div className={style.turno}>
          Turno: {turno}
        </div>

        <div className={style.botao}>
          <button
            className={style.button}
            onClick={entrarNaTurma}
          >
            Entrar
          </button>
        </div>
      </div>
    </>
  );
}
