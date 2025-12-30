"use client"

import React from 'react';
import style from './page.module.css';
import { useRouter } from "next/navigation";

export default function FormaDePagamento() {

  const router = useRouter();

  return (
    <>
    <div className={style.container}>
      <h1 className={style.title}>Escolha uma forma de pagamento</h1>
      <div className={style.paymentOptions}>
        <div className={style.paymentMethod} onClick={() => router.push("/pagamentopix")}>
          <img width="50" height="50" src="https://img.icons8.com/ios/50/pix.png" alt="pix"/>
          <p>Pix</p>
        </div>
        <div className={style.paymentMethod} onClick={() => router.push("/pagamentodinheiroemespecie")}>
          <img width="50" height="50" src="https://img.icons8.com/ios/50/cash-in-hand.png" alt="cash-in-hand"/>
          <p>Dinheiro em espécie</p>
        </div>
      </div>
    </div>
  </>);
}
