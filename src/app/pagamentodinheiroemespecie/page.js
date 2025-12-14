import React from "react";
import style from "./page.module.css";

export default function Pagamento() {

  return (
    <div className={style.container}>
      <h2 className={style.title}>Pagamento em dinheiro em espécie</h2>
      <div className={style.frase}>
        <p>
          Para pagar, entregue o valor em dinheiro diretamente no local ou ao
          responsável.
        </p>
      </div>
    </div>
  );
}
