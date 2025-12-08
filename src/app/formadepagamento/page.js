"use client"

import React from 'react';
import style from './page.module.css';
import { useRouter } from "next/navigation";

export default function formaDePagamento() {

  const router = useRouter();

  return (
    <>
    <div className={style.container}>
      <h1 className={style.title}>Escolha uma Forma de Pagamento</h1>
      <div className={style.paymentOptions}>
        <div className={style.paymentMethod} onClick={() => router.push("/pagamentopix")}>
          <img width="50" height="50" src="https://img.icons8.com/ios/50/pix.png" alt="pix"/>
          <p>Pix</p>
        </div>
        <div className={style.paymentMethod}>
          <img width="50" height="50" src="https://img.icons8.com/ios/50/cash-in-hand.png" alt="cash-in-hand"/>
          <p>Dinheiro em espécie</p>
        </div>
        <div className={style.paymentMethod}>
          <img width="50" height="50" src="https://img.icons8.com/ios/50/bank-card-back-side--v1.png" alt="bank-card-back-side--v1"/>
          <p>Cartão de Crédito</p>
        </div>
      </div>
    </div>
  </>);
}
