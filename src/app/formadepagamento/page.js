"use client"

import React from 'react';
import style from './page.module.css';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FormaDePagamento() {

  const router = useRouter();

  return (
    <>
    <div className={style.container}>
      <h1 className={style.title}>Escolha uma forma de pagamento</h1>
      <div className={style.paymentOptions}>
        <div className={style.paymentMethod} onClick={() => router.push("/pagamentopix")}>
          <Image width="50" height="50" src="/pix.png" alt="pix"/>
          <p>Pix</p>
        </div>
        <div className={style.paymentMethod} onClick={() => router.push("/pagamentodinheiroemespecie")}>
          <Image width="50" height="50" src="/dinheironamao.png" alt="cash-in-hand"/>
          <p>Dinheiro em espécie</p>
        </div>
      </div>
    </div>
  </>);
}
