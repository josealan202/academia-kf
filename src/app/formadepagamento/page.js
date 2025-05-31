import React from 'react';
import style from './page.module.css';

export default function formaDePagamento() {
  return (
    <>
    <div className={style.container}>
      <h1 className={style.title}>Escolha uma Forma de Pagamento</h1>
      <div className={style.paymentOptions}>
        <div className={style.paymentMethod}>
          <a href="./pagamentopix"><img src="https://cdn-icons-png.flaticon.com/512/5977/5977575.png" alt="Pix" /></a>
          <p>Pix</p>
        </div>
        <div className={style.paymentMethod}>
          <img src="https://cdn-icons-png.flaticon.com/512/1093/1093896.png" alt="Boleto" />
          <p>Boleto Bancário</p>
        </div>
        <div className={style.paymentMethod}>
          <img src="https://cdn-icons-png.flaticon.com/512/633/633611.png" alt="Cartão de Crédito" />
          <p>Cartão de Crédito</p>
        </div>
      </div>
    </div>
  </>);
}
