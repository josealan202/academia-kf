"use client";
import { useEffect, useState } from "react";
import style from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Card({ id, titulo, checkins, valor }) {
  const [planoAtivo, setPlanoAtivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const buscarPlano = async () => {
      const res = await fetch("/api/aluno/viewPlanoAtual");
      const data = await res.json();
      setPlanoAtivo(data.plano);
      setLoading(false);
    };

    buscarPlano();
  }, []);

  const comprarPlano = async () => {
    const res = await fetch("/api/solicitacao-plano", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_plano: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Solicitação enviada para aprovação!");
    router.push("/formadepagamento");
  };

  if (loading) return null;

  if (planoAtivo && planoAtivo.id === id) {
    return (
      <div className={style.box}>
        <div className={style.nome}>Seu plano atual</div>
        <div>{planoAtivo.quantvezesnasemana}x por semana</div>
        <div>{planoAtivo.checkins} check-ins</div>
        <div>R$ {planoAtivo.valor}</div>

        <button className={style.button} disabled>
          Plano ativo
        </button>
      </div>
    );
  }

  if (planoAtivo) {
    return (
      <div className={style.box}>
        <div className={style.nome}>
          Quantidade de dias na semana: {titulo}
        </div>
        <div className={style.checkins}>
          Quantidade: {checkins} check-ins
        </div>
        <div className={style.valor}>
          Valor: R$ {valor}
        </div>

        <button className={style.button} disabled>
          Você já possui um plano
        </button>
      </div>
    );
  }

  return (
    <div className={style.box}>
      <div className={style.nome}>
        Quantidade de dias na semana: {titulo}
      </div>
      <div className={style.checkins}>
        Quantidade: {checkins} check-ins
      </div>
      <div className={style.valor}>
        Valor: R$ {valor}
      </div>
      <button className={style.button} onClick={comprarPlano}>
        Comprar
      </button>
    </div>
  );
}
